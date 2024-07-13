import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const vehicleOwnershipSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    motorcycleId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Motorcycle',
        default: null,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

vehicleOwnershipSchema.plugin(toJson);

export const VehicleOwnerShip = model('VehicleOwnership', vehicleOwnershipSchema);
