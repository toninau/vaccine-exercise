import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonLoader = ({ height }: { height: number }) => {
  return (
    <Skeleton variant="rect" width="100%" height={height} />
  );
};

export default SkeletonLoader;