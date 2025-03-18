import { SchedulerItemClickData, SchedulerRowLabel } from "@/types/global";

export interface LeftColumnItemProps {
  id: string;
  item: SchedulerRowLabel;
  rows: number;
  onItemClick?: (data: { id: string; label: SchedulerRowLabel; projectID: string }) => void;
  projectID: string; // Add projectID property
}

export type StyledTextProps = {
  $ismain: boolean;
};

export type StyledLeftColumnItemWrapperProps = {
  rows: number;
  $clickable: boolean;
};
