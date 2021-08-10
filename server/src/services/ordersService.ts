import Order from '../models/order';

type Return = {
  vaccine: string,
  expiredBottles: number,
  injectionsInBottles: number,
  usedInjections: number,
  expiredInjections: number,
};

type Return2 = {
  vaccine: string,
  bottles: number,
  injectionsInBottles: number
};

const expired = async (date: Date) => {
  const aggregate = await Order.aggregate([
    {
      $match: { arrived: { $lt: date } }
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

const perProducer = async (startDate: Date, endDate: Date) => {
  const aggregate = await Order.aggregate([
    {
      $match: { arrived: { $gte: startDate, $lte: endDate, } }
    },
    {
      $group: {
        _id: '$vaccine',
        bottles: { $sum: 1 },
        injectionsInBottles: { $sum: '$injections' },
      },
    },
    {
      $project: {
        _id: 0,
        vaccine: '$_id',
        bottles: 1,
        injectionsInBottles: 1
      }
    }
  ]);
  return aggregate as Return2[];
};

const total = async (date: Date) => {
  const aggregate = await Order.aggregate([
    {
      $match: { arrived: { $lte: date, } }
    },
    {
      $group: {
        _id: null,
        bottles: { $sum: 1 },
        injectionsInBottles: { $sum: '$injections' },
      },
    },
    {
      $project: {
        _id: 0,
        bottles: 1,
        injectionsInBottles: 1
      }
    }
  ]);
  return aggregate as { bottles: number, injectionsInBottles: number }[];
};

export default {
  expired,
  perProducer,
  total
};