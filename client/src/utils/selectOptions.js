import fitz1 from "../assets/images/fitz1.png";
import fitz2 from "../assets/images/fitz2.png";
import fitz3 from "../assets/images/fitz3.png";
import fitz4 from "../assets/images/fitz4.png";
import fitz5 from "../assets/images/fitz5.png";
import fitz6 from "../assets/images/fitz6.png";

export const options = [
  { value: "Primer", label: "Primer" },
  { value: "Foundation", label: "Foundation" },
  { value: "Concealer", label: "Concealer" },
  { value: "Eyeshadow", label: "Eyeshadow" },
  { value: "Mascara", label: "Mascara" },
  { value: "Eyeliner", label: "Eyeliner" },
  { value: "Lip Colors", label: "Lip Colors" },
  { value: "Highlighter", label: "Highlighter" },
  { value: "Bronzer", label: "Bronzer" },
  { value: "Blush", label: "Blush" },
  { value: "Eyebrow Pencil/Powder", label: "Eyebrow Pencil" },
  { value: "Eyebrow Gel", label: "Eyebrow Gel" },
];

export const uploadTypeOptions = [
  {
    value: "Kit",
    label: "Kit",
  },
  {
    value: "Video",
    label: "Video",
  },
];

export const hueOptions = [
  {
    value: "Fitz1",
    label: (
      <img
        src={fitz1}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 1 skin type"
      />
    ),
  },
  {
    value: "Fitz2",
    label: (
      <img
        src={fitz2}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 2 skin type"
      />
    ),
  },
  {
    value: "Fitz3",
    label: (
      <img
        src={fitz3}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 3 skin type"
      />
    ),
  },
  {
    value: "Fitz4",
    label: (
      <img
        src={fitz4}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 4 skin type"
      />
    ),
  },
  {
    value: "Fitz5",
    label: (
      <img
        src={fitz5}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 5 skin type"
      />
    ),
  },
  {
    value: "Fitz6",
    label: (
      <img
        src={fitz6}
        style={{ width: 200, height: 30 }}
        alt="fitzpatrick 6 skin type"
      />
    ),
  },
];

export const sortOptions = [
  { value: "Popularity", label: "Popularity" },
  { value: "Trending", label: "Trending" },
  { value: "New", label: "New" },
  // { value: "Yours", label: "Yours" },
];
