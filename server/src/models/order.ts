import { Schema, model } from 'mongoose';
import { Order } from '../types';

//id

const orderSchema = new Schema<Order>({
  id: Schema.Types.ObjectId,
  healthCareDistrict: String,
  orderNumber: Number,
  responsiblePerson: String,
  injections: Number,
  arrived: Date,
  vaccine: String
});

export default model<Order>('Order', orderSchema);