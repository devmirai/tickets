import React from 'react';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large', tip = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default LoadingSpinner;