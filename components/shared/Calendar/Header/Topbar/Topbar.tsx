"use client"

import * as React from "react"

import { useTheme } from "styled-components";
import { FC, MouseEventHandler } from "react";
import { useState } from "react";
import { Filter, X, MoveLeft, MoveRight } from 'lucide-react';
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
  Wrapper,
  Filters,
} from "./styles";
import { TopbarProps } from "./types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "@radix-ui/react-dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";

const Topbar: FC<TopbarProps> = ({ width}) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    changeZoom,
    handleFilterData,
    onClearFilterData
  } = useCalendar();
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;

  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClearFilterData?.();
  };

  const [position, setPosition] = useState("Months");
  return (
    <Wrapper width={width}>
      <Filters className="rounded-md border-2 border-black bg-white px-1 py-1 text-black shadow-xs hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        {}
        {filterButtonState >= 0 && (
          <Popover>
          <PopoverTrigger>
            <div className="grid grid-flow-col grid-rows-1 gap-2">
              <div>
                <Filter width="20" height="20" onClick={handleFilterData} >
                  {topbar.filters}
                  {!!filterButtonState && (
                    <span onClick={handleClearFilters}>
                      <X height="20" width="20" fill={colors.textSecondary} />
                    </span>
                  )}
                </Filter>
              </div>
              <div className="flex justify-center items-center text-center w-full font-normal">
                <span>:</span>
              </div>
              <div className="flex justify-center items-center text-center w-full font-norma">
                <span>{position}</span>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 absolute left-0 mt-2 z-50"> 
            <label>View</label>
            <Separator />
            <RadioGroup value={position} onValueChange={setPosition}>
              <div className="flex items-center space-x-2">
                {/* Days Zoom */}
                <RadioGroupItem 
                  onClick={() => changeZoom(2)}  // Zoom Level for Days
                  value="Days"
                  id="r1"
                />
                <Label htmlFor="r1">Days</Label>
              </div>
              
              <div className="flex items-center space-x-2">
              {/* Weeks Zoom */}
              <RadioGroupItem 
                onClick={() => changeZoom(1)}  // Zoom Level for Weeks
                value="Weeks"
                id="r2"
              />
              <Label htmlFor="r2">Weeks</Label>
              </div>

              <div className="flex items-center space-x-2">
              {/* Months Zoom */}
              <RadioGroupItem 
                value="Months"
                id="r3"
                onClick={() => changeZoom(0)}  // Zoom Level for Months
              />
                <Label htmlFor="r3">Months</Label>
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
        )}
      </Filters>
    </Wrapper>
  );
};
export default Topbar;
