import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(request: NextRequest, props: Props) {
    const params = await props.params;
    try {
        const { id } = params;
        const { link } = await request.json();

        if (!id || !link) {
            return NextResponse.json(
                { message: "Missing ID or link" },
                { status: 400 }
            );
        }

        const updatedLink = await db.link.update({
            where: { id },
            data: { link }
        });

        return NextResponse.json(updatedLink);

    } catch (error) {
        console.error("PATCH LINK ERROR:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params;
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { message: "ID is required" },
                { status: 400 }
            );
        }

        const deletedLink = await db.link.delete({
            where: { id }
        });

        return NextResponse.json(deletedLink);

    } catch (error) {
        console.error("DELETE LINK ERROR:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}