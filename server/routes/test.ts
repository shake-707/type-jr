import express from "express";

import { Request, Response } from "express";

import db from "../config/db-connection";

const apiRouter = express.Router();
//

export const dbUsers = async (request: Request, response: Response) => {
    try {
        const users = await db.any('SELECT id, user_name FROM users');
        if (users.length === 0) {
            throw new Error('failed to get users');
        }
        response.json(users);
    } catch (err) {
        console.error(err);
    }
}

