import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const authUrl = process.env.NEXT_API_URL;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { status: "fail", message: "You are not logged in" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${authUrl}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${session.user.accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Failed to fetch profile" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      status: "success",
      message: "Profile fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "An error occurred" },
      { status: 500 }
    );
  }
}