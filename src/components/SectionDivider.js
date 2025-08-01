import React from 'react';

const SectionDivider = ({ variant = 'default' }) => {
  const variants = {
    default: 'section-divider',
    minimal: 'section-divider minimal',
    gradient: 'section-divider gradient'
  };

  return (
    <div className={variants[variant]}></div>
  );
};

export default SectionDivider; 