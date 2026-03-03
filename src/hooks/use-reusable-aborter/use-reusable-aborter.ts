import { useRef } from 'react';
import { ReusableAborter } from 'saborter';
import { ReusableAborterProps } from 'saborter/types';

export const useReusableAborter = (props: ReusableAborterProps = {}) => {
  const reusableAborter = useRef(new ReusableAborter(props));

  return reusableAborter.current;
};
