import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const servicePackageSchema = new Schema(
  {
    packageName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

servicePackageSchema.plugin(toJson);
export const ServicePackage = model('ServicePackage', servicePackageSchema);
