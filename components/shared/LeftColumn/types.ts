import { SchedulerData, SchedulerItemClickData } from "@/types/global";

export type LeftColumnProps = {
  data: SchedulerData;
  rows: number[];
  pageNum: number;
  pagesAmount: number;
  onLoadNext: () => void;
  onLoadPrevious: () => void;
  searchInputValue: string;
  onSearchInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onItemClick?: (data: SchedulerItemClickData) => void;
};

export type StyledInputWrapperProps = {
  $isfocused: boolean;
};
