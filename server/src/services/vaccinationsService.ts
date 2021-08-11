import Vaccination from '../models/vaccination';
import Order from '../models/order';

const usedInjectionsCount = async (startDate: Date, endDate: Date) => {
  const vaccinationCount = await Vaccination.countDocuments({
    vaccinationDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    }
  });
  return vaccinationCount;
};

const usableInjectionsCount = async (startDate: Date, endDate: Date) => {
  const usableInjectionsData = await Order.aggregate([
    {
      $match: { arrived: { $lte: endDate, $gte: startDate } }
    },
    {
      $lookup: {
        from: 'vaccinations',
        localField: 'id',
        foreignField: 'sourceBottle',
        as: 'vaccinations'
      }
    },
    {
      $group: {
        _id: null,
        injectionsInBottles: { $sum: '$injections' },
        usedInjections: { $sum: { $size: '$vaccinations' } },
      },
    },
    {
      $addFields: {
        usableInjections: {
          $subtract: ['$injectionsInBottles', '$usedInjections'],
        },
      },
    },
    {
      $project: {
        _id: 0,
        injectionsInBottles: 1,
        usedInjections: 1,
        usableInjections: 1
      }
    }
  ]);
  const data = usableInjectionsData[0] as { usableInjections: number };
  return data ? data.usableInjections : 0;
};

export default {
  usedInjectionsCount,
  usableInjectionsCount
};