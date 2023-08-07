import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from 'next/server';


export const POST = async (request:Request) => {
    const { email, password } = await request.json();
    console.log(email, password )
    try {
        await connectToDB();
        const newUser = new User({ email , password});

        await newUser.save();
        return NextResponse.json({newUser, status: 201 })
    } catch (error) {
        return NextResponse.json({message:"Failed to create a new prompt",  status: 500 });
    }
}