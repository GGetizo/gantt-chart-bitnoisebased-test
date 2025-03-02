import { SchedulerItemClickData, SchedulerRowLabel } from "@/types/global";

export type LeftColumnItemProps = {
  id: string;
  item: SchedulerRowLabel;
  rows: number;
  onItemClick?: (data: SchedulerItemClickData) => void;
};

export type StyledTextProps = {
  $ismain: boolean;
};

export type StyledLeftColumnItemWrapperProps = {
  rows: number;
  $clickable: boolean;
};
