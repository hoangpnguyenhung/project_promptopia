import { connectToDB } from "@/libs/mongoose";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    return NextResponse.json("Failed to create a new prompt", { status: 500 });
  }
};
