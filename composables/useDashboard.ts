import type { Reservation } from "~/utils/interfaces/Reservation";
import { totalRestaurantTables } from "~/utils/helpers/app";

export const useDashboard = (
  dailyReservations: Reservation[],
  monthlyReservations: Reservation[]
) => {
  const { restaurant } = useRestaurantStore();
  const dailyReport = reactive({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 735, name: "Occupied" },
          { value: 580, name: "Requested" },
          { value: 484, name: "Available" },
        ],
      },
    ],
    color: ["#ee6666", "#91cc75", "#fac858"],
  });

  const weeklyReport = reactive({
    animation: true,
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [10, 15, 12, 18, 20, 17, 15],
        type: "bar",
      },
    ],
  });

  const monthlyReport = reactive({
    xAxis: {
      type: "category",
      data: ["week 1", "week 2", "week 3", "week 4"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: "line",
      },
    ],
  });

  onMounted(() => {
    setDailyReport();
    setMonthlyReport();
  });

  const setDailyReport = () => {
    let occupiedCount = 0;
    let requestedCount = 0;
    let availableCount = totalRestaurantTables(restaurant!);

    dailyReservations.forEach((reservation) => {
      if (reservation.status === "active") occupiedCount++;
      if (reservation.status === "pending") requestedCount++;
    });

    availableCount -= occupiedCount + requestedCount;
    if (availableCount < 0) availableCount *= -1;

    dailyReport.series[0].data = [
      { value: occupiedCount, name: "Occupied" },
      { value: availableCount, name: "Available" },
      { value: requestedCount, name: "Requested" },
    ];
  };

  const setWeeklyReport = (weeklyReservations: Reservation[] = []) => {
    const weeklyReservationsData = [0, 0, 0, 0, 0, 0, 0];
    weeklyReservations.forEach((reservation) => {
      const day = new Date(reservation.date).getDay();
      weeklyReservationsData[day]++;
    });
    weeklyReport.series[0].data = weeklyReservationsData;
  };

  const setMonthlyReport = () => {
    const monthlyReservationsData = [0, 0, 0, 0, 0];
    monthlyReservations.forEach((reservation) => {
      const week = Math.ceil(new Date(reservation.date).getDate() / 7);
      monthlyReservationsData[week - 1]++;
    });
    monthlyReport.series[0].data = monthlyReservationsData;
  };

  return { dailyReport, weeklyReport, monthlyReport, setWeeklyReport };
};
