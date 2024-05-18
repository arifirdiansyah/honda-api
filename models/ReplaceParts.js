import { Schema, model } from 'mongoose';

const replacedPartSchema = new Schema(
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

export const ReplacedPart = model('ReplacedPart', replacedPartSchema);
