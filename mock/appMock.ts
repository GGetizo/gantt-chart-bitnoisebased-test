import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { SchedulerData, SchedulerProjectData } from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

const secondsInWorkDay = 28800;

export const mockedOnRangeChange = (range: ParsedDatesRange, data: SchedulerData) => {
  console.log("Mocked on range change has been triggered. New range: ", range, data);
};

const getRandomWords = (amount?: number) =>
  amount ? faker.word.words(amount) : faker.word.noun();

const getRandomDates = (year: number) => {
  const startDate = faker.date.between({
    from: new Date(year, 0, 1),
    to: new Date(year + 1, 0, 1)
  });
  const endDate = faker.date.between({
    from: startDate,
    to: new Date(year + Math.ceil(Math.random() * 4), 0, 1)
  });
  return { startDate, endDate };
};

export const generateTasksForPhase = (
  years: number,
  maxTasksPerDay: number,
  amountOfDscWords = 5,
  phaseName: string
): SchedulerProjectData[] => {
  const startYear = dayjs().subtract(Math.floor(years / 2), "years").get("year");
  const endYear = dayjs().add(Math.floor(years / 2), "years").get("year");

  const data = [];
  const bgColor = `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(
    Math.random() * 200
  )},${Math.ceil(Math.random() * 200)})`;

  for (let yearIndex = startYear; yearIndex <= endYear; yearIndex++) {
    const tasksPerYear = Math.ceil(Math.random() * maxTasksPerDay);

    for (let taskIndex = 0; taskIndex < tasksPerYear; taskIndex++) {
      const { startDate, endDate } = getRandomDates(yearIndex);
      data.push({
        id: faker.string.uuid(),
        startDate,
        endDate,
        occupancy: Math.ceil(Math.random() * secondsInWorkDay),
        title: getRandomWords(3), // Task Name
        subtitle: `Phase: ${phaseName}`, // Phase Name
        description: getRandomWords(amountOfDscWords),
        bgColor
      });
    }
  }
  return data;
};

export const createMockData = (
  amountOfProjects: number, // Now represents projects, not people
  years: number,
  maxTasksPerDay: number, // Controls number of tasks per phase
  amountOfDscWords = 5
): SchedulerData => {
  const schedulerData: SchedulerData = [];

  const phaseNames = ["Planning", "Development", "Testing"];

  for (let i = 0; i < amountOfProjects; i++) {
    const projectName = `Project ${i + 1}`;
    
    for (const phase of phaseNames) {
      const data: SchedulerProjectData[] = generateTasksForPhase(
        years,
        maxTasksPerDay,
        amountOfDscWords,
        phase
      );

      const item = {
        id: faker.string.uuid(),
        projectID: projectName,
        label: {
          title: `${phase}`,
          subtitle: `Task for ${phase}`
        },
        data
      };

      schedulerData.push(item);
    }
  }
  return schedulerData;
};