import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function ColorPaletteGenerator() {
  const [colors, setColors] = useState([]);
  const [showCopyAll, setShowCopyAll] = useState(false);

  const generatePalette = () => {
    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const newColors = [];
    for (let i = 0; i < 5; i++) {
      newColors.push({ color: randomColor(), copied: false });
    }
    setColors(newColors);
    setShowCopyAll(true);
  };

  const copyToClipboard = (index) => {
    navigator.clipboard.writeText(colors[index].color);
    const updatedColors = colors.map((colorObj, i) =>
      i === index ? { ...colorObj, copied: true } : colorObj
    );
    setColors(updatedColors);
  };

  const copyAllCode = () => {
    const code = colors.map((colorObj) => colorObj.color).join('\n');
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="root">
      <h1>
        <FontAwesomeIcon icon={faPalette} className="palette-icon" /> Color Palette Generator
      </h1>
      <div className="button-container">
        <button onClick={generatePalette} className="generate-button">
          Generate Palette
        </button>
          {showCopyAll && (
            <button onClick={copyAllCode} className="copy-all-button">
              Copy All
            </button>
          )}
      </div>
      <div className="color-palette-container">
        <div className="color-palette">
          {colors.map((colorObj, index) => (
            <div
              key={index}
              className={`color-box ${colorObj.copied ? 'copied' : ''}`}
              style={{ backgroundColor: colorObj.color }}
              onClick={() => copyToClipboard(index)}
            >
              {colorObj.copied ? 'Copied!' : colorObj.color}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
