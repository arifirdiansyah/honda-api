import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const dealershipSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 250,
    },
    address: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

dealershipSchema.plugin(toJson);
export const Dealership = model('Dealership', dealershipSchema);
