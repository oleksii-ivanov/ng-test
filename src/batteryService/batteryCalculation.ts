import { Measurement } from "../api/api";

export function calculateBatteryUsagePerDay(
  deviceMeasurements: Measurement[]
): number {
  if (deviceMeasurements.length <= 1) {
    return 0;
  }
  let totalBatteryUsage = 0;
  let totalTime = 0;
  for (let i = 1; i < deviceMeasurements.length; i++) {
    const prevMeasurement = deviceMeasurements[i - 1];
    const currentMeasurement = deviceMeasurements[i];
    const timeDiff =
      new Date(currentMeasurement.timestamp).getTime() -
      new Date(prevMeasurement.timestamp).getTime();
    const batteryDiff =
      prevMeasurement.batteryLevel - currentMeasurement.batteryLevel;

    // if the battery level increases between measurements, change should be excluded from the calculation.
    if (batteryDiff < 0) {
      continue;
    }

    // weighting mechanism all intervals equally weighted
    totalBatteryUsage += batteryDiff;
    totalTime += timeDiff;
  }

  if (totalTime === 0) {
    return 0;
  }

  const averageBatteryUsagePerMinute =
    totalBatteryUsage / (totalTime / 1000 / 60);
  const averageBatteryUsagePerDay = averageBatteryUsagePerMinute * 24 * 60;

  return Math.round(averageBatteryUsagePerDay * 10000) / 100;
}
