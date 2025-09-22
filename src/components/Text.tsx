import React from 'react';
import clsx from 'clsx';

interface TextProps {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'legend';
  color?: 'primary' | 'accent';
  fontWeight?: 'normal' | 'bold';
}

const TextColorsClassNames = {
  primary: 'text-white',
  accent: 'text-gray-700',
};

const TextFontWeightsClassNames = {
  normal: 'font-normal',
  bold: 'font-bold',
};

const TextFontSizesClassNames = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
  p: 'text-base',
  legend: 'text-sm',
};

const Text: React.FC<TextProps> = ({ variant = 'p', color = 'primary', fontWeight = 'normal', children }) => {
  const Tag = variant;
  const TextClassNames = clsx(
    TextColorsClassNames[color],
    TextFontWeightsClassNames[fontWeight],
    TextFontSizesClassNames[variant],
  );

  return <Tag className={TextClassNames}>{children}</Tag>;
};

export default Text;
