import { Schema, model } from 'mongoose';
import { Vaccination } from '../types';

const vaccinationSchema = new Schema<Vaccination>({
  'vaccination-id': {
    type: String,
    unique: true,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  sourceBottle: {
    type: String,
    required: true
  },
  vaccinationDate: {
    type: Date,
    required: true
  },
});

export default model<Vaccination>('Vaccination', vaccinationSchema);