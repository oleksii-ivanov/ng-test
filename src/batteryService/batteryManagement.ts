import { fetchData, Measurement } from "../api/api";
import { calculateBatteryUsagePerDay } from "./batteryCalculation";

export interface SchoolBatteryInfo {
  academyId: number;
  unhealthyDevices: DeviceBatteryInfo[];
}

export interface DeviceBatteryInfo {
  serialNumber: string;
  batteryUsagePerDay: number;
}

export async function identifyBatteryIssues(): Promise<SchoolBatteryInfo[]> {
  try {
    const measurements = await fetchData();

    const schools: {
      [academyId: number]: { [serialNumber: string]: Measurement[] };
    } = {};

    // Group measurements by academyId and serialNumber
    measurements.forEach((measurement) => {
      if (!schools[measurement.academyId]) {
        schools[measurement.academyId] = {};
      }
      if (!schools[measurement.academyId][measurement.serialNumber]) {
        schools[measurement.academyId][measurement.serialNumber] = [];
      }

      schools[measurement.academyId][measurement.serialNumber].push(
        measurement
      );
    });

    // Calculate battery issues and unhealthy devices for each school
    const allSchoolsBatteryInfo: SchoolBatteryInfo[] = [];
    for (const academyId in schools) {
      const schoolBatteryInfo: SchoolBatteryInfo = {
        academyId: Number(academyId),
        unhealthyDevices: [],
      };
      for (const serialNumber in schools[academyId]) {
        const deviceMeasurements = schools[academyId][serialNumber];
        const batteryUsagePerDay =
          calculateBatteryUsagePerDay(deviceMeasurements);

        if (batteryUsagePerDay > 30) {
          schoolBatteryInfo.unhealthyDevices.push({
            serialNumber: serialNumber,
            batteryUsagePerDay,
          });
        }
      }
      if (schoolBatteryInfo.unhealthyDevices.length > 0) {
        if (schoolBatteryInfo.unhealthyDevices.length > 1) {
          schoolBatteryInfo.unhealthyDevices.sort(
            (a, b) => b.batteryUsagePerDay - a.batteryUsagePerDay
          );
        }

        allSchoolsBatteryInfo.push(schoolBatteryInfo);
      }
    }

    allSchoolsBatteryInfo.sort(
      (a, b) => b.unhealthyDevices.length - a.unhealthyDevices.length
    );
    
    return allSchoolsBatteryInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to identify battery issues.");
  }
}
