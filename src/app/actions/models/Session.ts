import mongoose, { Schema, model, Types } from 'mongoose';

export interface SessionInterface {
	userID: Types.ObjectId;
	sessionToken: string;
	expiresAt: Date;
	userAgent: string;
}

const sessionSchema = new Schema<SessionInterface>(
	{
		userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		sessionToken: { type: String, required: true },
		expiresAt: { type: Date, required: true },
		userAgent: { type: String, required: true }
	},
	{ versionKey: false, timestamps: true }
);

export default mongoose.models.Session || model<SessionInterface>('Sessions', sessionSchema);