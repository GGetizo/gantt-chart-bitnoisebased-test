import { outsideWrapperId, leftColumnWidth, screenWidthMultiplier } from "@/app/constants";

export const getCanvasWidth = () => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const width = (wrapperWidth - leftColumnWidth) * screenWidthMultiplier;
  return width;
};
