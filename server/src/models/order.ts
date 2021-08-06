import { Schema, model, Document } from 'mongoose';
import { Order } from '../types';

type OrderDocument = Order & Document;

const orderSchema = new Schema<Order>({
  id: {
    type: String,
    unique: true,
    required: true
  },
  healthCareDistrict: {
    type: String,
    required: true
  },
  orderNumber: {
    type: Number,
    required: true
  },
  responsiblePerson: {
    type: String,
    required: true
  },
  injections: {
    type: Number,
    required: true
  },
  arrived: {
    type: Date,
    required: true
  },
  vaccine: {
    type: String,
    required: true
  }
});

orderSchema.set('toJSON', {
  transform: (_document: OrderDocument, returnedObject: OrderDocument) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<Order>('Order', orderSchema);