<script setup lang="ts">
import { useReports } from "~/composables/useReports";
import { getWeekRange } from "~/utils/helpers/dates";

const { startDate, endDate } = getWeekRange(new Date());
const loading = ref(true);
const weekRange = reactive({
  start: startDate,
  end: endDate,
});
const {
  getDailyReport,
  dailyReport,
  getWeeklyReport,
  weeklyReport,
  getMonthlyReport,
  monthlyReport,
} = useReports();

onMounted(async () => {
  await getDailyReport();
  await getWeeklyReport(weekRange);
  await getMonthlyReport();
  loading.value = false;
});

const handlePrevWeek = async () => {
  weekRange.start.setDate(weekRange.start.getDate() - 7);
  weekRange.end.setDate(weekRange.end.getDate() - 7);
  await getWeeklyReport(weekRange);
};

const handleNextWeek = async () => {
  weekRange.start.setDate(weekRange.start.getDate() + 7);
  weekRange.end.setDate(weekRange.end.getDate() + 7);
  await getWeeklyReport(weekRange);
};
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <DashboardGraphs
      v-else
      :daily-data="dailyReport"
      :weekly-data="weeklyReport"
      :monthly-data="monthlyReport"
      :week-range-dates="weekRange"
      @prev:week="handlePrevWeek"
      @next:week="handleNextWeek"
    />
  </div>
</template>
