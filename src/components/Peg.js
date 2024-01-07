import React from 'react';

// Props might include color and any action handlers like onClick
const Peg = ({ color, scale = 2, onClick }) => {
  // Inline styles or className can be used to control the appearance
  const style = {
    fill: color, // Fill the circle with the peg color
    cursor: !onClick ? undefined : 'pointer', // Change cursor to pointer to indicate it's clickable
    borderRadius: 9999
  };

  const defaultSize = 30 * scale; // Default size of the peg

  return (
    <svg width={defaultSize} height={defaultSize} style={{borderRadius: 9999}} onClick={onClick}>
      <circle cx={defaultSize / 2} cy={(defaultSize / 2) + 2} r={(defaultSize / 2) - 5} style={{fill: 'black', borderRadius: 9999}} />
      <circle cx={defaultSize / 2} cy={defaultSize / 2}       r={(defaultSize / 2) - 5} style={style} />
      {/* cx and cy are the center of the circle, r is its radius */}
      {/* Modify these values or make them props if you want different sizes */}
    </svg>
  );
};

export default Peg;
