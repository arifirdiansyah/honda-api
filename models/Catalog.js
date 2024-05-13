import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const CatalogSchema = new Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    engine: {
      type: Number,
      required: true,
    },
    frame: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      enum: ['AUTOMATIC', 'MANUAL'],
      default: 'AUTOMATIC',
      required: true,
    },
    picture: {
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

CatalogSchema.plugin(toJson);
export const Catalog = model('Catalog', CatalogSchema);