import React from 'react';
import { StyledBlockInput, StyledThirdLabel } from '../Styles';
import Text from './Text';

interface RangerSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  step?: number;
}

const RangeSlider: React.FC<RangerSliderProps> = ({ min, max, value, onChange, label, step = 1 }) => (
  <StyledThirdLabel>
    <Text fontWeight="bold">{label}</Text>
    <StyledBlockInput type="range" min={min} max={max} value={value} onChange={onChange} step={step} />
  </StyledThirdLabel>
);

export default RangeSlider;
