export function parseCustomDate(dateString: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [datePart, timePart, timeZone] = dateString.split(' ');

  const [day, month, year] = datePart.split('.').map(Number);

  const [hour, minute, second] = timePart.split(':').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  return date;
}

