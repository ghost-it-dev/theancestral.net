import mongoose, { Schema, model, Types } from 'mongoose';
import { PostInterface } from './Post';
import { UserInterface } from './User';

export interface PostActivityInterface {
  action: 'update' | 'create' | 'delete';
  postId: Types.ObjectId;
  postTitle: PostInterface['title'];
  username: UserInterface['username'];
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}

const postActivitySchema = new Schema<PostActivityInterface>(
  {
    action: { type: String, enum: ['delete', 'update', 'create'], required: true },
    postTitle: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    username: { type: String, required: true },
  },
  { versionKey: false, timestamps: true, collection: 'postActivity' },
);

export default mongoose.models.postActivity || model<PostActivityInterface>('postActivity', postActivitySchema);
