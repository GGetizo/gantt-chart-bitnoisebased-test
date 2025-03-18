import { FC, useState } from "react";
import { useLanguage } from "@/context/LocaleProvider";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import PaginationButton from "../PaginationButton/PaginationButton";
import { StyledInput, StyledInputWrapper, StyledLeftColumnHeader, StyledPhaseTitle, StyledWrapper } from "./styles";
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

  // Group tasks by phase
  const phaseGroups = new Map<string, typeof data>(); // Map to store grouped phases
  
  data.forEach((project) => {
    const phaseTitle = project.label.title; // Phase name (Planning, Development, Testing)
    
    if (!phaseGroups.has(phaseTitle)) {
      phaseGroups.set(phaseTitle, []);
    }
    
    phaseGroups.get(phaseTitle)?.push(project);
  });

  return (
    <StyledWrapper>
        <StyledInputWrapper $isfocused={isInputFocused} className="mt-6">
          <StyledInput
            placeholder={search}
            value={searchInputValue}
            onChange={onSearchInputChange}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
          />
          <Search />
        </StyledInputWrapper>

      {/* Render Phases and their respective tasks */}
      {[...phaseGroups.entries()].map(([phaseTitle, tasks]) => (
        <div key={phaseTitle}>
          <StyledPhaseTitle>{phaseTitle}</StyledPhaseTitle>
          {tasks.map((item, index) => (
            <LeftColumnItem
              id={item.id}
              item={item.label}
              projectID={item.projectID}
              key={item.id}
              rows={rows[index]}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      ))}

      <PaginationButton
        intent="next"
        $isvisible={pageNum !== pagesAmount - 1}
        onClick={onLoadNext}
        icon={<ArrowDown width="16" height="16" />}
        pageNum={pageNum}
        pagesAmount={pagesAmount}
      />
    </StyledWrapper>
  );
};


export default LeftColumn;
