import { VariantType } from "@/types";

export const getStyleByVariant = (variant: VariantType) => {
  let style = "";
  switch (variant) {
    case "primary":
      style = "hover:bg-[#77cdd9] bg-[#5cc4b1]";
      break;
    case "secondary":
      style = "hover:bg-[#4b617a] bg-[#4b617a] text-[#000]";
      break;
    case "danger":
      style = "hover:bg-red-400 bg-[#d42a52] text-[#000]";
      break;
    case "warning":
      style = "hover:bg-[#93ba9a] bg-[#e8e22c]";
      break;
    case "active":
      style = "hover:bg-green-600 bg-green-500";
      break;
    default:
      style = "hover:bg-gray-400 bg-gray-500 text-[#000]";
      break;
  }

  return style;
};
