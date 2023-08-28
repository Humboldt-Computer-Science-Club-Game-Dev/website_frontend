export function getProgressColor(ratio: any) {
  var startColor = "FF696A";
  var endColor = "50CE66";

  return interpolateColor(startColor, endColor, ratio);
}

export function interpolateColor(
  hex1: string,
  hex2: string,
  ratio: number
): string {
  // Remove the '#' from the start of the hex codes
  hex1 = hex1.substr(1);
  hex2 = hex2.substr(1);

  // Parse the hex codes into integers
  let rgb1 = [
    parseInt(hex1.substr(0, 2), 16),
    parseInt(hex1.substr(2, 2), 16),
    parseInt(hex1.substr(4, 2), 16),
  ];
  let rgb2 = [
    parseInt(hex2.substr(0, 2), 16),
    parseInt(hex2.substr(2, 2), 16),
    parseInt(hex2.substr(4, 2), 16),
  ];

  // Interpolate between the two colors
  let rgb3 = rgb1.map((val, idx) => {
    return Math.round(val * (1 - ratio) + rgb2[idx] * ratio);
  });

  // Convert the result back into a hex color code
  let hex = rgb3
    .map((val) => {
      let hex = val.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

  return "#" + hex;
}
