import { merge, filter } from 'lodash';

import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BaseOptionChart } from '../../charts';

// redux
import { RootState } from '../../../redux/store';
import { TotalNumberOfAppointmentsModel } from '../../../@types/analyticsModel';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Randevu A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Randevu B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Randevu C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AnalyticsAppointmentVisits() {
  const { totalNumberOfAppointmentsList, total } = useSelector(
    (state: RootState) => state.analytics
  );

  const [filterName, setFilterName] = useState('');
  const [orderBy, setOrderBy] = useState('name');

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '12%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} ziyaretçi`;
          }
          return y;
        }
      }
    }
  });
  function applySortFilter(
    array: TotalNumberOfAppointmentsModel[],
    comparator: (a: any, b: any) => number,
    query: string
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) =>
          _user.numberOfAppointments
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  type Anonymous = Record<string | number, string>;

  function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: string, orderBy: string) {
    return order === 'desc'
      ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
      : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
  }

  return (
    <Card>
      <CardHeader title="Toplam Randevu Sayısı" subheader="Haftalık" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
