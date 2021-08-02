import { Schema, model } from 'mongoose';

//id

interface Order {
  healthCareDistrict: string;
  orderNumber: number;
  responsiblePerson: string;
  injections: number;
  arrived: Date;
  vaccine: string;
}

const orderSchema = new Schema<Order>({
  healthCareDistrict: String,
  orderNumber: Number,
  responsiblePerson: String,
  injections: Number,
  arrived: Date,
  vaccine: String
});

export default model<Order>('Order', orderSchema);