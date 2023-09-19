## Description of the project structure

```
src/
├── api/
│   ├── api.test.ts
│   └── api.ts
├── batteryService
│   ├── batteryCalculation.test.ts
│   ├── batteryCalculation.ts
│   ├── batteryManagement.test.ts
│   └── batteryManagement.ts
├── main.tsx
└── style.css
```

- `main.ts` - The entry point of application
- `api.ts` - A module responsible for fetch JSON data from the file 
- `batteryCalculation.ts` - A module responsible for calculation battery consumption. The function takes a series of battery measurements, calculates the time and battery differences between intervals, and then computes the average battery consumption per day, ensuring that all intervals are equally weighted in the calculation. It handles cases where the battery level increases (e.g., due to charging) by excluding those intervals from the calculation.
- `batteryManagement.ts` - A module responsible for aggregation battery info per schools.
- `*.test.ts` - Unit tests for according modules
- `babel.config.cjs` , `tsconfig.json` - Configuration for TypeScript 


## External libraries
- Application created using Vite template Vanilla + TypeScript
- There are no dependencies that used in development mode
- For testing purposes Jest was chosen
- Other libraries were used to provide TypeScript and Jest work


## How to setup the project
- `npm install`

## How to run the application
- `npm run dev`
   
## How to run tests
- `npm run test`