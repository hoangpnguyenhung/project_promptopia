import { model, models, Schema } from "mongoose";

export interface IPrompt {
  _id: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId; // trường _Id được tạo ra với ObjectId thì creator cũng có type giống với _id
  prompt: string;
  tag: string;
}

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // creator sẽ tham chiếu _id của User
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model<IPrompt>("Prompt", PromptSchema);

export default Prompt;
