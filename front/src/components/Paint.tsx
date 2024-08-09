import React from 'react';

import { RiPaintFill } from 'react-icons/ri';

import '../styles/paint.scss';
import '../styles/variables.scss';
import '../styles/colors.scss';

import { colors } from '../utils/paletColors';

const Paint = () => {
  return (
    <div className="paint-container buttonIcon pb-2">
      <RiPaintFill size={30} className="mx-1 paint-icon" title="Pintar" />
      <div className="color-modal">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-circle bg-custom-color-${color} bg-custom-color-primary-blue`}
          />
        ))}
      </div>
    </div>
  );
};

export default Paint;
