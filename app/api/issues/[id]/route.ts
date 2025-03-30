import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Define the expected type for the parameters
interface Params {
  id: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Params } // Explicitly define the type here
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: validation.data,
  });

  return NextResponse.json(updatedIssue);
}
