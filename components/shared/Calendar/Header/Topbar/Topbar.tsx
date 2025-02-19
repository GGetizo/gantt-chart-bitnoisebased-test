import { useTheme } from "styled-components";
import { FC, MouseEventHandler } from "react";
import { Filter, X, MoveLeft, MoveRight } from 'lucide-react';
import { CircleMinus as LucideCircleMinus, CirclePlus as LucideCirclePlus } from 'lucide-react';
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
  NavigationWrapper,
  Wrapper,
  NavBtn,
  Today,
  Zoom,
  Filters,
  OptionsContainer
} from "./styles";
import { TopbarProps } from "./types";

const Topbar: FC<TopbarProps> = ({ width}) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    zoomIn,
    zoomOut,
    isNextZoom,
    isPrevZoom,
    handleFilterData,
    onClearFilterData
  } = useCalendar();
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;

  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClearFilterData?.();
  };

  interface DisabledIconProps {
    isDisabled: boolean;
    onClick?: () => void;
    width: string;
  }

  const DisabledCircleMinus: FC<DisabledIconProps> = ({ isDisabled, onClick, width }) => (
    <LucideCircleMinus
      onClick={isDisabled ? undefined : onClick}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.5 : 1 }}
      width={width}
    />
  );

  const DisabledCirclePlus: FC<DisabledIconProps> = ({ isDisabled, onClick, width }) => (
    <LucideCirclePlus
      onClick={isDisabled ? undefined : onClick}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.5 : 1 }}
      width={width}
    />
  );

  return (
    <Wrapper width={width}>
      <Filters>
        {filterButtonState >= 0 && (
          <Filter
            width="16"
            height="16"
            onClick={handleFilterData}>
            {topbar.filters}
            {!!filterButtonState && (
              <span onClick={handleClearFilters}>
                <X height="16" width="16" fill={colors.textSecondary} />
              </span>
            )}
          </Filter>
        )}
      </Filters>
      <NavigationWrapper>
        <NavBtn disabled={!data?.length} onClick={handleGoPrev}>
          <MoveLeft height="15" fill={colors.textPrimary} />
          {topbar.prev}
        </NavBtn>
        <Today onClick={handleGoToday}>{topbar.today}</Today>
        <NavBtn disabled={!data?.length} onClick={handleGoNext}>
          {topbar.next}
          <MoveRight height="15" fill={colors.textPrimary} />
        </NavBtn>
      </NavigationWrapper>
      <OptionsContainer>
        <Zoom>
          {topbar.view}
          <DisabledCircleMinus
            isDisabled={!isPrevZoom}
            onClick={zoomOut}
            width="14"
          />
          <DisabledCirclePlus
            isDisabled={!isNextZoom}
            onClick={zoomIn}
            width="14"
          />
        </Zoom>
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
