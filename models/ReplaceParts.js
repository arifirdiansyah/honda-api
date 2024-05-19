import { Schema, model } from 'mongoose';

const replacePartSchema = new Schema(
  {
    servicePackage: {
      type: [{ type: Schema.Types.ObjectId, ref: 'ServicePackage' }],
      default: null,
    },
    parts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Parts' }],
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export const ReplacePart = model('ReplacePart', replacePartSchema);
