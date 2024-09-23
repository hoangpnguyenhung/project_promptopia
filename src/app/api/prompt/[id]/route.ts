import { connectToDB } from "@/libs/mongoose";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

//GET
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator"); //res trả về thay trường creator bằng thông tin chi tiết của user tương ứng

    if (!prompt) return NextResponse.json("Prompt not found", { status: 404 });

    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    return NextResponse.json("Fail to fetch all prompts", { status: 500 });
  }
};

//PATCH
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return NextResponse.json("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (error) {
    return NextResponse.json("Fail to update prompt", { status: 500 });
  }
};

//DELETE
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return NextResponse.json("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Fail to delete prompt", { status: 500 });
  }
};
