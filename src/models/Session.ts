import mongoose, { Schema, model, Types } from 'mongoose';

export interface SessionInterface {
  userID: Types.ObjectId;
  expiresAt: Date;
  userAgent: string;
  updatedAt: Date;
  createdAt: Date;
  _id: Types.ObjectId;
}

const sessionSchema = new Schema<SessionInterface>(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

// Create a TTL index on the expiresAt field
// Delete sessions after 30 days
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Sessions || model<SessionInterface>('Sessions', sessionSchema);
