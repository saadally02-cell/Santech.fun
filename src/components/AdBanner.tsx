import React from 'react';
import { NetworkAdBanner } from './NetworkAdBanner';

interface AdBannerProps {
  label?: string;
  variant?: 'horizontal' | 'card' | 'compact';
  placement?: 'header' | 'in-feed' | 'sidebar' | 'footer' | 'modal';
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement = 'in-feed',
}) => {
  return <NetworkAdBanner placement={placement} />;
};
