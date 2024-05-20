import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const addressSchema = new Schema(
  {
    provinces: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    subdistrict: {
      type: String,
      required: true,
    },
    urbanVillage: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const dealershipSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 250,
    },
    address: addressSchema,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

dealershipSchema.plugin(toJson);
export const DealershipModel = model('Dealership', dealershipSchema);
