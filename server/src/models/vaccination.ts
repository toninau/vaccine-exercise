import { Schema, model, Document } from 'mongoose';
import { Vaccination } from '../types';

type VaccinationDocument = Vaccination & Document;

const vaccinationSchema = new Schema<Vaccination>({
  'vaccination-id': {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  sourceBottle: {
    type: String,
    required: true,
    index: true
  },
  vaccinationDate: {
    type: Date,
    required: true
  },
});

vaccinationSchema.set('toJSON', {
  transform: (_document: VaccinationDocument, returnedObject: VaccinationDocument) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<Vaccination>('Vaccination', vaccinationSchema);