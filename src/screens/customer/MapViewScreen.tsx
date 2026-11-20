import React from 'react';
import { MockMapCanvas } from '../../components/MockMapCanvas';

export const MapViewScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-neutral-100 select-none">
      <MockMapCanvas />
    </div>
  );
};
