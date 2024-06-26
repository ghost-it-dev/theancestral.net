import argon2id from 'argon2';
import mongoose, { Schema, Types, model } from 'mongoose';

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  postAmount: number;
  updatedAt: Date;
  createdAt: Date;
  _id: Types.ObjectId;
  // Image name in minio
  // profilePicture: string;
}

const userSchema = new Schema<UserInterface>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    postAmount: { type: Number, required: true, default: 0 },
    // profilePicture: { type: String, required: true, default: 'default.png' },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await argon2id.hash(this.password);
  return next();
});

export default mongoose.models.User || model<UserInterface>('User', userSchema);
