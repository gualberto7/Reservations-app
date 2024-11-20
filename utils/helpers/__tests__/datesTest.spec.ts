// @vitest-environment node
import { describe, expect, it } from "vitest";
import { formatDate, getWeekRange } from "../dates";

describe("Dates helpers tests", () => {
  it("formatDate", () => {
    const date = new Date("2021-01-01");
    expect(formatDate(date)).toEqual("2021-01-01");
  });

  it("getWeekRange", () => {
    const date = new Date("2024-10-17");
    const weekRange = getWeekRange(date);
    expect(weekRange.startDate).toEqual(new Date("2024-10-14"));
    expect(weekRange.endDate).toEqual(new Date("2024-10-20"));
  });
});
