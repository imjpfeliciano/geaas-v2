import React, { ChangeEvent } from 'react';
import { StyledFieldset, StyledInputsWrapper } from '../Styles';
import Checkbox from './Checkbox';
import Text from './Text';
import RangeSlider from './RangeSlider';

interface FaceCustomizationFiltersProps {
  toggleGhost: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleGrayscale: (event: ChangeEvent<HTMLInputElement>) => void;
  setX: (value: number) => void;
  setY: (value: number) => void;
  setScale: (value: number) => void;
  x: number;
  y: number;
  scale: number;
  width: number;
  height: number;
  circularSelection?: boolean;
  toggleCircularSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  borderRadius: number;
  onChangeBorderRadius: (value: number) => void;
}

const FaceCustomizationFilters: React.FC<FaceCustomizationFiltersProps> = ({
  toggleGhost,
  toggleGrayscale,
  setX,
  setY,
  setScale,
  x,
  y,
  scale,
  width,
  height,
  circularSelection = false,
  toggleCircularSelection,
  borderRadius,
  onChangeBorderRadius,
}) => {
  return (
    <StyledFieldset>
      <Text fontWeight="bold">Step 2. Face customization</Text>
      <StyledInputsWrapper>
        <div className="flex flex-row gap-2 justify-center w-full pt-4">
          <Checkbox checked={true} onChange={toggleGhost} title="Ghost Face" />
          <Checkbox checked={true} onChange={toggleGrayscale} title="Grayscale" />
          <Checkbox checked={circularSelection} onChange={toggleCircularSelection} title="Circular Selection" />
        </div>

        <div className="flex flex-row gap-2 justify-center w-full">
          <RangeSlider
            value={x}
            min={-width}
            max={width}
            onChange={(event) => setX(parseInt(event.target.value))}
            label="Offset X"
          />

          <RangeSlider
            value={y}
            min={-height}
            max={height}
            onChange={(event) => setY(parseInt(event.target.value))}
            label="Offset Y"
          />

          <RangeSlider
            value={scale}
            min={0}
            max={1}
            onChange={(event) => setScale(parseFloat(event.target.value))}
            label="Scale"
            step={0.01}
          />
        </div>

        {circularSelection && (
          <div className="w-full flex justify-center">
            <RangeSlider
              value={borderRadius}
              min={0}
              max={100}
              onChange={(event) => onChangeBorderRadius(parseFloat(event.target.value))}
              label="Border radius"
            />

            <RangeSlider
              value={scale}
              min={0}
              max={1}
              onChange={(event) => setScale(parseFloat(event.target.value))}
              label="Rotate"
              step={0.01}
            />
          </div>
        )}
      </StyledInputsWrapper>
    </StyledFieldset>
  );
};

export default FaceCustomizationFilters;
