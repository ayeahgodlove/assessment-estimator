/*
  data = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
*/
// Challenge two
// This is the estimated number of severe positive cases
const serverPositiveCases = (infectionsByRequestedTime) => Math.trunc(
  0.15 * infectionsByRequestedTime
);
// the number of available beds.
const numberAvailableOfHospitalBeds = (totalHospitalBeds) => totalHospitalBeds - (
  Math.trunc(0.65 * totalHospitalBeds)
);
// estimate the number of available hospital beds for severe COVID-19 positive patients.
const availableNumberOfBedsForSevereCases = (
  totalHospitalBeds, severeCasesByRequestedTime
) => numberAvailableOfHospitalBeds(totalHospitalBeds) - severeCasesByRequestedTime;

// challenge 3
// This is the estimated number of severe positive cases
const severePositiveCasesRequireICUcare = (infectionsByRequestedTime) => Math.trunc(
  0.05 * infectionsByRequestedTime
);

// This is the estimated number of severe positive
// cases that will require ventilators.
const severePositiveCasesRequireVentilator = (infectionsByRequestedTime) => Math.trunc(
  0.02 * infectionsByRequestedTime
);

const moneyLoseDaily = (infectionsByRequestedTime,
  avgDailyIncomePopulation, avgDailyIncomeInUSD, timeToElapse) => Math.trunc(
  (infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse
);

const covid19ImpactEstimator = (data) => {
  const inputData = data;
  /*
    initializing impact and severeImpact Objects
  */
  const impact = {};
  const severeImpact = {};
  /*
    Assigning reportedCases*10 or 50 to our objects
  */
  impact.currentlyInfected = Math.trunc(inputData.reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(inputData.reportedCases * 50);
  let toDays = inputData.timeToElapse;
  const period = inputData.periodType;
  /*
    Your estimator will be required to make estimations over periods in days
    , weeks and months and  Assigning infectionsByRequestTime to impact and severImpacts
  */
  if (inputData.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  if (inputData.periodType === 'weeks') {
    toDays = inputData.timeToElapse * 7;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  if (inputData.periodType === 'months') {
    toDays = inputData.timeToElapse * 30;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  /*
    estimating number of server positive cases challenge two
  */
  impact.severeCasesByRequestedTime = serverPositiveCases(
    impact.infectionsByRequestedTime
  );
  impact.hospitalBedsByRequestedTime = availableNumberOfBedsForSevereCases(
    inputData.totalHospitalBeds, impact.severeCasesByRequestedTime
  );
  severeImpact.severeCasesByRequestedTime = serverPositiveCases(
    severeImpact.infectionsByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = availableNumberOfBedsForSevereCases(
    inputData.totalHospitalBeds, severeImpact.severeCasesByRequestedTime
  );
  // challenge 3
  // estimated number of severe positive cases that will require ICU care.
  impact.casesForICUByRequestedTime = severePositiveCasesRequireICUcare(
    impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = severePositiveCasesRequireVentilator(
    impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = severePositiveCasesRequireICUcare(
    severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = severePositiveCasesRequireVentilator(
    severeImpact.infectionsByRequestedTime
  );
  // estimate how much money the economy is likely to lose daily,
  // over the said period of time.
  if (period === 'days') {
    impact.dollarsInFlight = moneyLoseDaily(
      impact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
    severeImpact.dollarsInFlight = moneyLoseDaily(
      severeImpact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
  }
  if (period === 'weeks') {
    inputData.timeToElapse *= 7;
    impact.dollarsInFlight = moneyLoseDaily(
      impact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
    severeImpact.dollarsInFlight = moneyLoseDaily(
      severeImpact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
  }
  if (period === 'months') {
    inputData.timeToElapse *= 30;
    impact.dollarsInFlight = moneyLoseDaily(
      impact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
    severeImpact.dollarsInFlight = moneyLoseDaily(
      severeImpact.infectionsByRequestedTime, inputData.region.avgDailyIncomePopulation,
      inputData.region.avgDailyIncomeInUSD, inputData.timeToElapse
    );
  }

  return {
    inputData,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
