import { PaginatedSchedulerData, SchedulerProjectData } from "@/types/global";
import { JSX } from "react";

export type TilesProps = {
  zoom: number;
  data: PaginatedSchedulerData;
  onTileClick?: (data: SchedulerProjectData) => void;
};

export type PlacedTiles = JSX.Element[];
