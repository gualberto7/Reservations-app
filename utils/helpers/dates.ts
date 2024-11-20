// Date helpers

// Format date to string yyyy-mm-dd
export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

// Get current week range based on date
export const getWeekRange = (date: Date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { startDate: start, endDate: end };
};
