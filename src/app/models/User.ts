import argon2id from 'argon2';
import { Schema, Types, model } from 'mongoose';

export interface UserInterface {
	username: string;
	name: string;
	email: string;
	password: string;
	refreshToken: string[];
	role: 'user' | 'admin';
	postAmount: number;
	updatedAt: Date;
	createdAt: Date;
	_id: Types.ObjectId;
}

const userSchema = new Schema<UserInterface>(
	{
		username: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		refreshToken: { type: [String], required: true, default: [] },
		role: { type: String, required: false, default: 'user' },
		postAmount: { type: Number, required: true, default: 0 }
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await argon2id.hash(this.password)
	return next()
})

export default model<UserInterface>('User', userSchema);
