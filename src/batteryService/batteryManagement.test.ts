import { fetchData } from "../api/api";
import { identifyBatteryIssues } from "./batteryManagement";

jest.mock("../api/api");

describe("batteryManagement.ts", () => {
  it("should identify battery issues correctly", async () => {

    (fetchData as jest.Mock).mockResolvedValue([
      {
        academyId: 30015,
        batteryLevel: 1,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T09:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.7,
        employeeId: "T1001399",
        serialNumber: "TT-C67ML-A-0001-02522",
        timestamp: "2019-05-17T21:00:00.000+01:00",
      },
      {
        academyId: 30015,
        batteryLevel: 0.5,
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
    ]);

    // Call identifyBatteryIssues and ensure it returns the expected result
    const result = await identifyBatteryIssues();

    // Ensure the result is as expected
    expect(result).toEqual([
      {
        academyId: 30015,
        unhealthyDevices: [
          { batteryUsagePerDay: 33.33, serialNumber: "TT-C67ML-A-0001-02522" },
        ],
      },
    ]);
  });

  it("should handle errors gracefully", async () => {
    // Mock fetchData to simulate an error
    (fetchData as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    // Call identifyBatteryIssues and ensure it rejects with an error
    await expect(identifyBatteryIssues()).rejects.toThrow(
      "Failed to identify battery issues."
    );
  });
});
