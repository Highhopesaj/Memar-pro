import { NextRequest, NextResponse } from "next/server";
import {
  getAllFeatureFlags,
  createFeatureFlag,
  toggleFeatureFlag,
} from "@/lib/featureFlags";

export async function GET(request: NextRequest) {
  try {
    const flags = await getAllFeatureFlags();
    return NextResponse.json({ success: true, data: flags });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const flag = await createFeatureFlag(body);
    return NextResponse.json({ success: true, data: flag }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, enabled } = body;
    const flag = await toggleFeatureFlag(key, enabled);
    return NextResponse.json({ success: true, data: flag });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
