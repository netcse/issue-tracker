import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = issueSchema.parse(body);
  if (!validation)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.title,
      description: validation.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
