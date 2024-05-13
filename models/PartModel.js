import { Schema, model, ObjectId } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const partSchema = new Schema(
  {
    partName: {
      type: String,
      required: true,
    },
    partNumber: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    catalogs: [
      {
        type: ObjectId,
        ref: 'Catalog',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

partSchema.plugin(toJson);
export const Part = model('Part', partSchema);