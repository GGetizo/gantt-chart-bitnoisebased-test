import { FC } from "react";
import { dayWidth, weekWidth, zoom2ColumnWidth } from "@/app/constants";
import { useLanguage } from "@/context/LocaleProvider";
import { CalendarX2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TooltipProps } from "./types";
import {
  StyledContentWrapper,
  StyledInnerWrapper,
  StyledOvertimeWarning,
  StyledText,
  StyledTextWrapper
} from "./styles";
import { DialogTitle } from "@radix-ui/react-dialog";

const Tooltip: FC<TooltipProps> = ({ tooltipData, zoom }) => {
  const { taken, free, over } = useLanguage();
  const { coords, disposition } = tooltipData;

  let width = weekWidth;
  switch (zoom) {
    case 1:
      width = dayWidth;
      break;
    case 2:
      width = zoom2ColumnWidth;
      break;
  }

  return (
    <Dialog open={Boolean(coords)}>
      <DialogTrigger asChild>
        <div style={{ position: "absolute", left: coords.x, top: coords.y }} />
      </DialogTrigger>
      <DialogContent className="p-4 rounded-lg shadow-lg">
        <DialogTitle>
          <p>Test</p>
        </DialogTitle>
        <StyledContentWrapper>
          <StyledInnerWrapper>
            <CalendarX2 height="14" />
            <StyledTextWrapper>
              <StyledText>{`${taken}: ${disposition.taken.hours}h ${disposition.taken.minutes}m`}</StyledText>
              {(disposition.overtime.hours > 0 || disposition.overtime.minutes > 0) && (
                <StyledOvertimeWarning>
                  {` - ${disposition.overtime.hours}h ${disposition.overtime.minutes}m ${over}`}
                </StyledOvertimeWarning>
              )}
            </StyledTextWrapper>
          </StyledInnerWrapper>
          <StyledInnerWrapper>
            <Calendar height="14" />
            <StyledTextWrapper>
              <StyledText>{`${free}: ${disposition.free.hours}h ${disposition.free.minutes}m`}</StyledText>
            </StyledTextWrapper>
          </StyledInnerWrapper>
        </StyledContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default Tooltip;