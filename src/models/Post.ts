import mongoose, { Schema, model, Types } from 'mongoose';
import User from './User';

export interface PostInterface {
  title: string;
  description: string;
  tags: string[] | [];
  authorId: Types.ObjectId;
  authorName: string;
  publicPost: boolean;
  updatedAt: Date;
  createdAt: Date;
  _id: Types.ObjectId;
}

const postSchema = new Schema<PostInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String] || [], default: [], required: false },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    publicPost: { type: Boolean, default: false, required: true },
  },
  { versionKey: false, timestamps: true },
);

postSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  const user = await User.findById(this.authorId);
  if (!user) return next();
  user.postAmount += 1;
  await user.save();
});

export default mongoose.models.Post || model<PostInterface>('Post', postSchema);
