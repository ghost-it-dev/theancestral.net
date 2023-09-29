import mongoose, { Schema, model, Types } from 'mongoose';

export interface SessionInterface {
  userID: Types.ObjectId;
  expiresAt: Date;
  userAgent: string;
  updatedAt: Date;
  createdAt: Date;
  _id: Types.ObjectId;
}

// When any of the following happen invalidate the session:
// 1. x User logs out (function)
// 2. User changes password (function)
// 4. Account is deleted (function)
// 5. x User Agent changes (verify session)
// 6. x Session expires (database)

const sessionSchema = new Schema<SessionInterface>(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String, required: true }
  },
  { versionKey: false, timestamps: true },
);

// Create a TTL index on the expiresAt field
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Sessions || model<SessionInterface>('Sessions', sessionSchema);
