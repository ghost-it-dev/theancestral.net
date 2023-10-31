import mongoose, { Schema, model, Types } from 'mongoose';
import { PostInterface } from '@/src/models/Post';
import { UserInterface } from '@/src/models/User';


export interface PostActivityInterface {
  action: 'update' | 'create' | 'delete';
  postId: Types.ObjectId;
  postTitle: PostInterface['title'];
  username: UserInterface['username'];
  publicPost: boolean;
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
    publicPost: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true, collection: 'postActivity' },
);

export default mongoose.models.postActivity || model<PostActivityInterface>('postActivity', postActivitySchema);
