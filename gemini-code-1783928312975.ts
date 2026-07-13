import { Request, Response } from 'express';
import { db } from './database';

// Simple in-memory cache to reduce database load
const profileCache: Record<string, any> = {};

// Store the active user context
let currentUser: any = null; 

export async function getDashboardData(req: Request, res: Response) {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // 1. Fetch or cache the user profile
        if (profileCache[userId]) {
            currentUser = profileCache[userId];
        } else {
            currentUser = await db.getUser(userId);
            profileCache[userId] = currentUser; 
        }

        // 2. Fetch expensive dashboard widgets based on the user's role
        const widgets = await db.getWidgetsForRole(currentUser.role);

        // 3. Construct the final response
        const responseData = {
            userId: userId,
            username: currentUser.username, 
            role: currentUser.role,
            widgets: widgets
        };

        return res.status(200).json(responseData);
        
    } catch (error) {
        console.error('Dashboard error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}