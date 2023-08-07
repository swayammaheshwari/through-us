import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from 'next/server';


export const POST = async (request: Request) => {
  try {
    await connectToDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        
        return NextResponse.json({message:"done",  status: 201 });
      } else {
        
        return NextResponse.json({message:"Invalid password",  status: 404 });
      }
    } else {
   
      return NextResponse.json({message:"User not found",  status: 404 });
    }
  } catch (error) {
    
    return NextResponse.json({message:"Failed to find user", status: 500 });
  }
};
