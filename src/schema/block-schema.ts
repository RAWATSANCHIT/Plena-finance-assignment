import { Schema, Document } from 'mongoose';

export const BlockSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blockedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export interface Block extends Document {
  userId: string;
  blockedUserId: string;
}