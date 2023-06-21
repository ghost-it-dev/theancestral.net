import mongoose, { Schema, model, Types } from 'mongoose';

export interface PostActivityInterface {
  action: 'delete' | 'update' | 'create';
  post: Types.ObjectId;
  user: Types.ObjectId;
}

const postSchema = new Schema<PostActivityInterface>(
  {
    action: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.models.PostActivity || model<PostActivityInterface>('PostActivity', postSchema);
