import Vaccination from '../models/vaccination';

const usedVaccinationCount = async (startDate: Date, endDate: Date) => {
  const vaccinationCount = await Vaccination.countDocuments({
    vaccinationDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    }
  });
  return vaccinationCount;
};

export default {
  usedVaccinationCount
};