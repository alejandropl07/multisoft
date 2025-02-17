export const minutesPassed = (timestamp: number) => {
  const currentDate = new Date().valueOf();
  const inputDate = new Date(timestamp * 1000);
  const result = Math.round((currentDate - inputDate.valueOf()) / 1000 / 60);
  return result;
};

export const displayTimestamp = (timestamp: number): string => {
  if (typeof timestamp == "number") {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) {
      return formatTime(date);
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (isSameWeek(date, today)) {
      return formatDayOfWeek(date);
    } else {
      return formatDate(date);
    }
  } else if (typeof timestamp == "string") {
    //convert string to date
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) {
      return formatTime(date);
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (isSameWeek(date, today)) {
      return formatDayOfWeek(date);
    } else {
      return formatDate(date);
    }
  } else {
    return "loading";
  }
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isSameWeek = (date1: Date, date2: Date): boolean => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs((date1.getTime() - date2.getTime()) / oneDay)
  );
  return diffDays <= 7 && date1.getDay() >= date2.getDay();
};

const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}${ampm}`;
};

const formatDayOfWeek = (date: Date): string => {
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  return dayOfWeek;
};

const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const reminderDate = (timestamp?: number): string | null => {
  if (timestamp) {
    const dateObj = new Date(timestamp * 1000);
    const date = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const time = hours + ":" + minutes + ampm;
    return `${month}/${date}/${year} ~${time}`;
  } else {
    return null;
  }
};
