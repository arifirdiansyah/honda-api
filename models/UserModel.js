import { Schema, model, ObjectId } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const userSchema = new Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: false,
      minlength: 1,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'CUSTOMER', 'DEALER_ADMIN'],
      default: 'CUSTOMER',
    },
    dealer: {
      type: ObjectId,
      ref: 'Dealership'
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'BLOCKED', 'DELETED', 'PENDING', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.plugin(toJson);
export const User = model('User', userSchema);
