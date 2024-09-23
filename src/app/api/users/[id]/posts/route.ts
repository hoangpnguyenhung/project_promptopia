import { connectToDB } from "@/libs/mongoose";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const response = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json("Fail to fetch all prompts by useId", {
      status: 500,
    });
  }
};
