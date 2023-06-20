import mongoose, { Schema, model, Types } from 'mongoose';

export interface SessionInterface {
	userID: Types.ObjectId;
	sessionToken: string;
	expiresAt: Date;
	userAgent: string;
}


// When any of the following happen invalidate the session:
// 1. User logs out
// 2. User changes password
// 4. Account is deleted
// 5. User Agent changes
// 6. Session expires

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