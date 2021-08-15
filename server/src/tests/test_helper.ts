export const OrderToMatch = {
  id: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
  orderNumber: 1,
  responsiblePerson: 'Joonatan Siloma',
  healthCareDistrict: 'KYS',
  vaccine: 'Antiqua',
  injections: 4,
  arrived: '2021-01-11T08:59:28.642Z'
};

export const VaccinationToMatch = {
  'vaccination-id': '440ed0d1-5c6b-43f2-8927-fd11662c6407',
  sourceBottle: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
  gender: 'female',
  vaccinationDate: '2021-02-09T09:38:01.642Z'
};


export const ExpiredToMatch = [
  {
    expiredBottles: 10,
    injectionsInBottles: 40,
    usedInjections: 4,
    expiredInjections: 36,
    vaccine: 'Antiqua'
  },
  {
    expiredBottles: 10,
    injectionsInBottles: 50,
    usedInjections: 1,
    expiredInjections: 49,
    vaccine: 'Zerpfy'
  }
];