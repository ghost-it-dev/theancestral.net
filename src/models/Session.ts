import mongoose, { Schema, model, Types } from 'mongoose';

export interface SessionInterface {
  userID: Types.ObjectId;
  sessionToken: string;
  expiresAt: Date;
  userAgent: string;
}

// When any of the following happen invalidate the session:
// 1. User logs out (function)
// 2. User changes password (function)
// 4. Account is deleted (function)
// 5. User Agent changes (verify session)
// 6. x Session expires (databse)

const sessionSchema = new Schema<SessionInterface>(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

// Create a TTL index on the expiresAt field
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Sessions || model<SessionInterface>('Sessions', sessionSchema);