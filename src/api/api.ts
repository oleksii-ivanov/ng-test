export interface Measurement {
    academyId: number;
    batteryLevel: number;
    employeeId: string;
    serialNumber: string;
    timestamp: string;
}
 
const apiUrl = './battery-data.json';

export async function fetchData(): Promise<Measurement[]> {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }
  return response.json();
}