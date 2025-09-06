import { getUsersService, createUserService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService';
import { Request, Response } from "express";

export async function getUsersController(req: Request, res: Response): Promise<void> {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
}

export async function createUserController(req: Request, res: Response): Promise<void> {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

export async function getUserByIdController(req: Request, res: Response): Promise<void> {
    try {
        const user = await getUserByIdService(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user", error });
    }
}

export async function updateUserController(req: Request, res: Response): Promise<void> {
    try {
        const updated = await updateUserService(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user", error });
    }
}

export async function deleteUserController(req: Request, res: Response): Promise<void> {
    try {
        const deleted = await deleteUserService(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user", error });
    }
}