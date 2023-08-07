import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { author, title, blog_body } = await request.json();
  try {
    await connectToDB();
    const newBlog = new Blog({
      author,
      title,
      blog_body,
      date: new Date().toLocaleDateString(),
      image: Math.floor(Math.random() * 10000) + 1,
    });

    await newBlog.save();
    return NextResponse.json({ message: `blog recieved`, newBlog });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message:"Failed to create a new prompt", status: 500 });
  }
};
