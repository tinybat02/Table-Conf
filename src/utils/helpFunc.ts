import { Frame } from '../types';

export const processData = (series: Frame[]) => {
  return series[0].fields[0].values.buffer;
};
