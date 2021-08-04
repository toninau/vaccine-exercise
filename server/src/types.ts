export interface Order {
  id: string;
  healthCareDistrict: string;
  orderNumber: number;
  responsiblePerson: string;
  injections: number;
  arrived: Date;
  vaccine: string;
}

export interface Vaccination {
  'vaccination-id': string;
  sourceBottle: string;
  gender: string;
  vaccinationDate: Date;
}