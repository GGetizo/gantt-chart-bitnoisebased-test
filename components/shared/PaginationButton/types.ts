export type PaginationButtonProps = {
  intent: "previous" | "next";
  $isvisible: boolean;
  onClick: () => void;
  pageNum: number;
  pagesAmount: number;
  icon?: React.ReactNode;
};

export type StyledPaginationButton = {
  $isvisible: boolean;
};
