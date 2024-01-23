import dayjs from "dayjs";

export const dayFormat = (timeStr, formatType) =>
  dayjs(timeStr).format(formatType);
