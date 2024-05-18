import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const addressSchema = new Schema(
  {
    provinces: {
      type: Number,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
    city: {
      type: Number,
      required: true,
    },
    subdistrict: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

addressSchema.plugin(toJson);
export const Address = model('Address', addressSchema);
