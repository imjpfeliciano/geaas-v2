import React, { ChangeEvent } from 'react';
import { StyledInput } from '../Styles';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, title }) => {
  return (
    <label className="flex whitespace-nowrap items-center">
      {title}:
      <StyledInput type="checkbox" defaultChecked={checked} onChange={onChange} />
    </label>
  );
};

export default Checkbox;
