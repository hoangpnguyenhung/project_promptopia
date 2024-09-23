import { connectToDB } from "@/libs/mongoose";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator"); //res trả về thay trường creator bằng thông tin chi tiết của user tương ứng

    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    return NextResponse.json("Fail to fetch all prompts", { status: 500 });
  }
};
