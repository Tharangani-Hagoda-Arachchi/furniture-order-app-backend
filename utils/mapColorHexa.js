import { colorMap } from './colorMap';
import ntcjs from "ntcjs"

function mapColorNameToHex(name) {
  const trimmed = name.trim();

  // Check custom map first
  if (colorMap[trimmed]) return colorMap[trimmed];

  // Use ntcjs for standard colors
  const match = ntcjs.name(trimmed);
  const hex = match[0];

  // Fallback to gray if unknown
  return (!hex || hex.toLowerCase() === "#000000") ? "#ccc" : hex;
}

module.exports = mapColorNameToHex;
