import { Schema, model, ObjectId } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const servicePackageSchema = new Schema(
  {
    packageName: {
      type: String,
      default: null,
      required: true
    },
    description: {
      type: String,
      default: '',
    },
    parts: [{
      type: ObjectId,
      ref: 'Part',
    }],
    ownedByDealer: {
      type: ObjectId,
      ref: 'Dealership',
      required: false,
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

servicePackageSchema.plugin(toJson);
export const ServicePackage = model('ServicePackage', servicePackageSchema);
