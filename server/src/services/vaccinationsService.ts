import Order from '../models/order';

type Return = {
  vaccine: string,
  expiredBottles: number,
  injectionsInBottles: number,
  usedInjections: number,
  expiredInjections: number,
};

const expired10 = async (startDate: Date, endDate: Date) => {
  const aggregate = await Order.aggregate([
    {
      $match: { arrived: { $gte: startDate, $lte: endDate, } }
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
        _id: '$vaccine',
        expiredBottles: { $sum: 1 },
        injectionsInBottles: { $sum: '$injections' },
        usedInjections: {
          $sum: { $size: '$vaccinations' },
        },
      },
    },
    {
      $addFields: {
        expiredInjections: {
          $subtract: ['$injectionsInBottles', '$usedInjections'],
        },
      },
    },
    {
      $project: {
        _id: 0,
        vaccine: '$_id',
        expiredBottles: 1,
        injectionsInBottles: 1,
        usedInjections: 1,
        expiredInjections: 1
      }
    }
  ]);
  return aggregate as Return[];
};

export default {
  expired10
};