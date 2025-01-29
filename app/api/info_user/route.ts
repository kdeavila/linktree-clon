import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({
                message: "Unauthorized",
                status: 401
            })
        }

        let existingUser = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                Links: true
            }
        })

        if (!existingUser) {
            existingUser = await db.user.create({
                data: {
                    id: userId,
                    name: "user",
                    username: `user_${Date.now()}`,
                    Links: {
                        create: []
                    }
                },
                include: {
                    Links: true
                }
            })
        }

        return NextResponse.json(existingUser)
    } catch (error) {
        console.log("GET_USER_FIRST_LOGIN", error);
        return NextResponse.json({
            message: "Error fetching user",
            status: 500
        })
    }
}
