<script setup lang="ts">
import type { Reservation } from "~/utils/interfaces/Reservation";
import type { VChart } from "#components";
import { useDashboard } from "~/composables/useDashboard";

const props = defineProps({
  dailyData: {
    type: Array as PropType<Reservation[]>,
    required: true,
  },
  weeklyData: {
    type: Array as PropType<Reservation[]>,
    required: true,
  },
  weekRangeDates: {
    type: Object as PropType<{ start: Date; end: Date }>,
    required: true,
  },
  monthlyData: {
    type: Array as PropType<Reservation[]>,
    required: true,
  },
});

const { dailyReport, weeklyReport, monthlyReport, setWeeklyReport } =
  useDashboard(props.dailyData, props.monthlyData);

watchEffect(() => {
  setWeeklyReport(props.weeklyData);
});

defineEmits(["prev:week", "next:week"]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
    <div class="border p-3">
      <h2>Daily Report</h2>
      <VChart ref="chart" :option="dailyReport" class="chart" />
    </div>
    <div class="border p-3">
      <div class="flex justify-between">
        <h2>
          Weekly Report: {{ weekRangeDates.start.getMonth() }}
          {{ weekRangeDates.start.getDate() }} /
          {{ weekRangeDates.end.getDate() }}
        </h2>
        <div class="flex gap-2">
          <Button @click="$emit('prev:week')" size="sm">prev</Button>
          <Button
            @click="$emit('next:week')"
            size="sm"
            :disabled="new Date().getDate() < weekRangeDates.end.getDate()"
          >
            next
          </Button>
        </div>
      </div>
      <VChart ref="chart" :option="weeklyReport" class="chart" />
    </div>
    <div class="border p-3">
      <h2>Monthly Report</h2>
      <VChart ref="chart" :option="monthlyReport" class="chart" />
    </div>
  </div>
</template>

<style scoped>
.chart {
  min-height: 300px;
  min-width: 300px;
}
</style>
