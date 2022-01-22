export function formatDate(date) {
 return new Intl.DateTimeFormat('en-CA', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date))
};

export function formatTimeslot(start, end) {
  return `${formatDate(start)} to ${getTime(end)}`
}

export function getTime(date) {
  return new Intl.DateTimeFormat('en-CA', { timeStyle: 'short' }).format(new Date(date))
}