import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const blogs = await Blog.find({ author: ["swayam maheshwari", "Swayam Maheshwari"] });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch prompts created by user", status: 500 });
  }
}
