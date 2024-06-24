// user.schema.ts
import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
});

export interface User extends Document {
  id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
}