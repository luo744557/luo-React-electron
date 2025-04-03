import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import DataBoard from '../../component/data-board';
import SalePercent from '../../component/sale-percent';
// import TimeLine from './timeLine';

const DataBoardPage = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="data-board">
      <DataBoard loading={loading} />
      <SalePercent loading={loading} />
      {/* <TimeLine loading={loading} /> */}
    </div>
  );
};

export default DataBoardPage;
