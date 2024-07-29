import { Schema, model } from 'mongoose';

const replacedPartsSchema = new Schema(
  {
    part: {
      type: Schema.Types.ObjectId,
      ref: 'Part',
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    _id: false,
  },
);

const serviceSchema = new Schema(
  {
    servicePackage: {
      type: Schema.Types.ObjectId,
      ref: 'ServicePackage',
      required: true,
    },
    motorcycleId: {
      type: Schema.Types.ObjectId,
      ref: 'Motorcycle',
      required: true,
    },
    dealership: {
      type: Schema.Types.ObjectId,
      ref: 'Dealership',
      required: true,
    },
    technician: {
      type: String,
      required: true,
    },
    serviceDate: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
    nama: {
      type: String,
      required: false,
    },
    replacedParts: [replacedPartsSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

export const Service = model('Service', serviceSchema);
