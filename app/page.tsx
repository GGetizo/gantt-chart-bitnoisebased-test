"use client"

import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "../mock/appMock";
import { ParsedDatesRange, SchedulerProjectData } from "../types/global";
import Scheduler from "../components/shared/Scheduler/Scheduler";
import TaskList from "../components/shared/TaskList/TaskList";
import TaskModal from "../components/shared/TaskModal/TaskModal";

export default function Home() {
  const [values, setValues] = useState({
    peopleCount: 15,
    projectsPerYear: 3,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true
  });

  const { peopleCount, projectsPerYear, yearsCovered, maxRecordsPerPage } = values;

  const mocked = useMemo(
    () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
    [peopleCount, projectsPerYear, yearsCovered]
  );

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const filteredData = useMemo(
    () =>
      mocked.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      })),
    [mocked, range.endDate, range.startDate]
  );

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const [selectedTask, setSelectedTask] = useState<SchedulerProjectData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTileClick = (data: SchedulerProjectData) => {
    setSelectedTask(data);
    setShowModal(true);
  };

  return (
    <div>
      <Scheduler
        startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
        onRangeChange={handleRangeChange}
        data={filteredData}
        isLoading={false}
        onTileClick={handleTileClick}
        onFilterData={handleFilterData}
        config={{ zoom: 0, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true }}
        onItemClick={(data) => console.log("clicked: ", data)}
      />
      <TaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        task={selectedTask}
      />
    </div>
  );
}