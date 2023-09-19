import { fetchData, Measurement } from "./api";

export const mockResponse = [
  {
    academyId: 30006,
    batteryLevel: 0.68,
    employeeId: "T1007384",
    serialNumber: "1805C67HD02259",
    timestamp: "2019-05-17T07:47:25.833+01:00",
  },
];

describe("fetchData", () => {
  it("fetches data successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data: Measurement[] = await fetchData();

    expect(data).toEqual(mockResponse);
  });

  it("handles fetch error", async () => {
    // Mock the fetch function to return an error response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchData()).rejects.toThrow("Failed to fetch data.");
  });
});
