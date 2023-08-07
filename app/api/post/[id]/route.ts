import Blog from "@/models/blog";
import { connectToDB } from "@/utils/database";
import { NextResponse } from 'next/server';

export const GET = async (req: Request,{ params }: { params: { id: string } }, res: Response) => {
  try {
    await connectToDB();
    const id = params.id;

    const blog = await Blog.find({ _id: id });

    return NextResponse.json({ message: `blog recieved`, blog });
  } catch (error) {
    return NextResponse.json({ message: 'Verification failed' });
  }
};

