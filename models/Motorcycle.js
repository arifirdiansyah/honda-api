import { Schema, model, ObjectId } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const motorCycleSchema = new Schema(
  {
    catalogId: {
      type: ObjectId,
      ref: 'Catalog',
      required: true,
    },
    buildDate: {
      type: Number,
      required: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

motorCycleSchema.plugin(toJson);
export const Motorcycle = model('Motorcycle', motorCycleSchema);