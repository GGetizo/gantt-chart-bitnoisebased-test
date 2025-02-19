import { FC, useState } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import PaginationButton from "../PaginationButton/PaginationButton";
import { StyledInput, StyledInputWrapper, StyledLeftColumnHeader, StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({
  data,
  rows,
  onLoadNext,
  onLoadPrevious,
  pageNum,
  pagesAmount,
  searchInputValue,
  onSearchInputChange,
  onItemClick
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { search } = useLanguage();

  const toggleFocus = () => setIsInputFocused((prev) => !prev);

  return (
    <StyledWrapper>
      <StyledLeftColumnHeader>
        <StyledInputWrapper $isFocused={isInputFocused}>
          <StyledInput
            placeholder={search}
            value={searchInputValue}
            onChange={onSearchInputChange}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
          />
          <Search />
        </StyledInputWrapper>
        <PaginationButton
          intent="previous"
          $isVisible={pageNum !== 0}
          onClick={onLoadPrevious}
          icon={<ArrowUp width="16" height="16" />}
          pageNum={pageNum}
          pagesAmount={pagesAmount}
        />
      </StyledLeftColumnHeader>
      {data.map((item, index) => (
        <LeftColumnItem
          id={item.id}
          item={item.label}
          key={item.id}
          rows={rows[index]}
          onItemClick={onItemClick}
        />
      ))}
      <PaginationButton
        intent="next"
        $isVisible={pageNum !== pagesAmount - 1}
        onClick={onLoadNext}
        icon={<ArrowDown width="16" height="16" />}
        pageNum={pageNum}
        pagesAmount={pagesAmount}
      />
    </StyledWrapper>
  );
};

export default LeftColumn;
