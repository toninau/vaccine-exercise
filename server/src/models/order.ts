import { Schema, model } from 'mongoose';

//id

export interface Order {
  id: string;
  healthCareDistrict: string;
  orderNumber: number;
  responsiblePerson: string;
  injections: number;
  arrived: Date;
  vaccine: string;
}

const orderSchema = new Schema<Order>({
  id: String,
  healthCareDistrict: String,
  orderNumber: Number,
  responsiblePerson: String,
  injections: Number,
  arrived: Date,
  vaccine: String
});

export default model<Order>('Order', orderSchema);