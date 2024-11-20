import type { Reservation } from "~/utils/interfaces/Reservation";
import { formatDate, getWeekRange } from "~/utils/helpers/dates";

export const useReports = () => {
  const nuxtApp: any = useNuxtApp();
  const { restaurant } = useRestaurantStore();
  const currentDate = formatDate(new Date());

  const dailyReport = reactive<Reservation[]>([]);
  const weeklyReport = ref<Reservation[]>([]);
  const monthlyReport = reactive<Reservation[]>([]);

  const getDailyReport = async (date: string = currentDate) => {
    const { data } = await nuxtApp.$fetch(
      `api/dashboard/${restaurant!._id}?startDate=${date}&endDate=${date}`
    );
    Object.assign(dailyReport, data);
  };

  interface WeekRange {
    start: Date;
    end: Date;
  }

  const getWeeklyReport = async (weekRange: WeekRange) => {
    const start = formatDate(weekRange.start);
    const end = formatDate(weekRange.end);
    const { data } = await nuxtApp.$fetch(
      `api/dashboard/${restaurant!._id}?startDate=${start}&endDate=${end}`
    );
    weeklyReport.value = data;
  };

  const getMonthlyReport = async (date: string = currentDate) => {
    const fromDate = new Date(date);
    fromDate.setDate(fromDate.getDate() - 30);
    const startDate = formatDate(fromDate);
    const { data } = await nuxtApp.$fetch(
      `api/dashboard/${restaurant!._id}?startDate=${startDate}&endDate=${date}`
    );
    Object.assign(monthlyReport, data);
  };

  return {
    dailyReport,
    weeklyReport,
    monthlyReport,
    getDailyReport,
    getWeeklyReport,
    getMonthlyReport,
  };
};
