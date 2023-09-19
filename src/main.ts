import {
  identifyBatteryIssues,
  SchoolBatteryInfo,
  DeviceBatteryInfo,
} from "./batteryService/batteryManagement";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const schoolInfoContainer: HTMLElement | null =
      document.getElementById("school-info");

    if (!schoolInfoContainer) {
      throw new Error("School info container not found.");
    }
    schoolInfoContainer.innerText = "Loading...";

    const schoolBatteryInfo: SchoolBatteryInfo[] =
      await identifyBatteryIssues();
    schoolInfoContainer.innerText = "";


    schoolBatteryInfo.forEach((school: SchoolBatteryInfo) => {
      const schoolDiv: HTMLDivElement = document.createElement("div");
      schoolDiv.classList.add("school");

      const schoolHeader: HTMLHeadingElement = document.createElement("h2");
      schoolHeader.textContent = `School ID: ${school.academyId} (${
        school.unhealthyDevices.length
      } device${school.unhealthyDevices.length > 1 ? `s` : ``})`;

      const deviceList: HTMLUListElement = document.createElement("ul");

      school.unhealthyDevices.forEach((device: DeviceBatteryInfo) => {
        const deviceItem: HTMLLIElement = document.createElement("li");
        deviceItem.textContent = `Serial Number: ${device.serialNumber} (${device.batteryUsagePerDay}% / per day)`;
        deviceList.appendChild(deviceItem);
      });

      schoolDiv.appendChild(schoolHeader);
      schoolDiv.appendChild(deviceList);

      schoolInfoContainer.appendChild(schoolDiv);
    });
  } catch (error) {
    console.error(
      "Failed to fetch or display school battery information:",
      error
    );
  }
});
