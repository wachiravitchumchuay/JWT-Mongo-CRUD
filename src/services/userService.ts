import { ObjectId } from "mongodb";
import { getDb } from "../config/db";
import { User } from "../models/userModel";

export async function getUsersService(): Promise<User[]> {
    const db = getDb();
    return db.collection<User>("users").find().toArray();
}

export async function createUserService(newUser: User): Promise<User> {
    const db = getDb();
    const now = new Date();
    const userToInsert: User = {
        ...newUser,
        createdAt: now,
        updatedAt: now,
    };
    const result = await db.collection<User>("users").insertOne(userToInsert);
    return { _id: result.insertedId, ...userToInsert };
}

export async function getUserByIdService(id: string): Promise<User | null> {
    const db = getDb();
    if (!ObjectId.isValid(id)) return null;
    return db.collection<User>("users").findOne({ _id: new ObjectId(id) });
}

export async function updateUserService(
    id: string,
    updates: Partial<User>
): Promise<boolean> {
    const db = getDb();
    if (!ObjectId.isValid(id)) return false;
    const result = await db
        .collection<User>("users")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updates, updatedAt: new Date() } }
        );
    return result.matchedCount > 0;
}

export async function deleteUserService(id: string): Promise<boolean> {
    const db = getDb();
    if (!ObjectId.isValid(id)) return false;
    const result = await db
        .collection<User>("users")
        .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}