import { Schema, model } from 'mongoose';
import { Order } from '../types';

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

export default model<Order>('Order', orderSchema);