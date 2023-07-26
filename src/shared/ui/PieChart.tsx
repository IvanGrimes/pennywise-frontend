import { ReactGoogleChartProps, Chart } from 'react-google-charts';

export type PieChartProps = Pick<
  ReactGoogleChartProps,
  'data' | 'options' | 'width' | 'height'
>;

export const PieChart = (props: PieChartProps) => (
  <Chart chartType="PieChart" {...props} />
);
