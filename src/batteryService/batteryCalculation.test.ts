import { calculateBatteryUsagePerDay } from "./batteryCalculation";

describe("calculateBatteryUsagePerDay", () => {
  it("should return 0 when there is only one measurement and consumption is unknown", () => {
    const measurements = [
      {
        academyId: 30006,
        batteryLevel: 0.68,
        employeeId: "T1007384",
        serialNumber: "1805C67HD02259",
        timestamp: "2019-05-17T07:47:25.833+01:00",
      },
    ];
    const result = calculateBatteryUsagePerDay(measurements);
    expect(result).toBe(0);
  });

  it("should return 0 when there are no changes in battery level", () => {
    const measurements = [
      {
        academyId: 30006,
        batteryLevel: 0.68,
        employeeId: "T1007384",
        serialNumber: "1805C67HD02259",
        timestamp: "2019-05-17T07:47:25.833+01:00",
      },
      {
        academyId: 30006,
        batteryLevel: 0.68,
        employeeId: "T1007384",
        serialNumber: "1805C67HD02259",
        timestamp: "2019-05-17T08:47:25.833+01:00",
      },
    ];
    const result = calculateBatteryUsagePerDay(measurements);
    expect(result).toBe(0);
  });

  it("should calculate the correct average battery usage per day", () => {
    const measurements = [
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T09:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.9,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.8,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T21:00:00.000+01:00",
      },
    ];
    const result = calculateBatteryUsagePerDay(measurements);
    expect(result).toBe(13.33); // 10% battery usage over 36 hours (24 hours + 12 hours)
  });

  it("should calculate data and drop charging measurement", () => {
    const measurements = [
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T09:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.9,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.8,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T22:00:00.000+01:00",
      },
    ];
    const result = calculateBatteryUsagePerDay(measurements);
    expect(result).toBe(13.33);
  });

  it("should calculate data and include measurement after charging", () => {
    const measurements = [
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T09:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.9,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.8,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T22:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.5,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-18T23:00:00.000+01:00",
      },
    ];
    const result = calculateBatteryUsagePerDay(measurements);
    expect(result).toBe(45.41);
  });
});
