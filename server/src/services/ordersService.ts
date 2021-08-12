import Order from '../models/order';

type ExpiredOrder = {
  vaccine: string;
  expiredBottles: number;
  injectionsInBottles: number;
  usedInjections: number;
  expiredInjections: number;
};

type OrderTotal = {
  bottles: number;
  injectionsInBottles: number;
};

const expiredFieldsFragment = [
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
      usedInjections: { $sum: { $size: '$vaccinations' } },
    },
  },
  {
    $addFields: {
      expiredInjections: { $subtract: ['$injectionsInBottles', '$usedInjections'] },
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
  },
  {
    $sort: {
      vaccine: 1
    }
  }
];

const expired = async (date: Date) => {
  const expiredOrders = await Order.aggregate([
    {
      $match: { arrived: { $lt: date } }
    },
    ...expiredFieldsFragment
  ]);
  return expiredOrders as ExpiredOrder[];
};

const expiring10d = async (startDate: Date, endDate: Date) => {
  const expiringOrders10d = await Order.aggregate([
    {
      $match: { arrived: { $gte: startDate, $lte: endDate, } }
    },
    ...expiredFieldsFragment
  ]);
  return expiringOrders10d as ExpiredOrder[];
};

const perProducer = async (startDate: Date, endDate: Date) => {
  const ordersPerProducer = await Order.aggregate([
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
    },
    {
      $sort: {
        vaccine: 1
      }
    }
  ]);
  return ordersPerProducer as OrderTotal & { vaccine: string }[];
};

const total = async (date: Date) => {
  const orderTotal = await Order.aggregate([
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
  if (orderTotal[0]) {
    return orderTotal[0] as OrderTotal;
  }
  return {
    bottles: 0,
    injectionsInBottles: 0
  };
};

export default {
  expired,
  expiring10d,
  perProducer,
  total
};