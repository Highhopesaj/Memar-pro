import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@/lib/aiAgent";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task, context } = body;

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task is required" },
        { status: 400 }
      );
    }

    // Create task record
    const agentTask = await prisma.agentTask.create({
      data: {
        type: task,
        status: "running",
        input: context || {},
      },
    });

    // Run agent
    const result = await runAgent({ task, context });

    // Update task record
    await prisma.agentTask.update({
      where: { id: agentTask.id },
      data: {
        status: result.success ? "completed" : "failed",
        output: result.result ? { response: result.result } : undefined,
        error: result.error,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
