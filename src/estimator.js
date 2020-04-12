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
const serverPositiveCases = (infectionsByRequestedTime) => Math.trunc(
  0.15 * infectionsByRequestedTime
);
const numberAvailableOfHospitalBeds = (totalHospitalBeds) => totalHospitalBeds - (
  Math.trunc(0.65 * totalHospitalBeds)
);
const availableNumberOfBedsForSevereCases = (
  totalHospitalBeds, severeCasesByRequestedTime
) => numberAvailableOfHospitalBeds(totalHospitalBeds) - severeCasesByRequestedTime;

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
  impact.currentlyInfected = inputData.reportedCases * 10;
  severeImpact.currentlyInfected = inputData.reportedCases * 50;
  let toDays = inputData.timeToElapse;
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
  // console.log("Impact: ",impact)
  // console.log("severeImpact: ",severeImpact)
  return {
    inputData,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
// covid19ImpactEstimator(data);
