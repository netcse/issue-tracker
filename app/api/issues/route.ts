import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = createIssueSchema.parse(body);
    if (!validation)
        return NextResponse.json({error: "Invalid request"}, {status: 400});

    const newIssue = await prisma.issue.create({
        data: {
            title: validation.title,
            description: validation.description,
        },
    });
    return NextResponse.json(newIssue, {status: 201});
}
