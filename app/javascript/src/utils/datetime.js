import dayjs from "dayjs";

export const formatDueDate = date => dayjs(date).format("DD/MM/YYYY");

export const isPastDate = date => dayjs().isAfter(dayjs(date), "d");

export const isPastDateBy = date => {
  const today = dayjs();
  const dayDiff = Math.abs(today.diff(date, "day"));

  if (today.isBefore(dayjs(date), "d")) {
    return `Task due in ${dayDiff} ${dayDiff === 1 ? "day" : "days"}.`;
  }

  return "Task Overdue!";
};
