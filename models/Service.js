import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    servicePackage: {
      type: [{ type: Schema.Types.ObjectId, ref: 'ServicePackage' }],
      default: null,
    },
    motorcycleId: {
      type: Schema.Types.ObjectId,
      ref: 'Motorcycle',
      default: null,
    },
    dealership: {
      type: Schema.Types.ObjectId,
      ref: 'Dealership',
      default: null,
    },
    technician: {
      type: String,
      default: null,
    },
    serviceDate: {
      type: Number,
      default: null,
    },
    mileage: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export const Service = model('Service', serviceSchema);
