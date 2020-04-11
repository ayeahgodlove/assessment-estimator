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

const covid19ImpactEstimator = (data) => {
  const inputData = data;
  const impact = {};
  const severeImpact = {};
  /*
   impact Object
  */
  impact.currentlyInfected = inputData.reportedCases * 10;
  /*
    serverImpact Object
  */
  severeImpact.currentlyInfected = inputData.reportedCases * 50;
  /*
    check periodType: if days,weeks or months
  */
  let toDays = inputData.timeToElapse;
  if (inputData.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  if (inputData.periodType === 'weeks') {
    toDays = inputData.timeToElapse * 7;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  if (inputData.periodType === 'months') {
    toDays = inputData.timeToElapse * 30;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
    severeImpact.infectionsByRequestedTime = impact.currentlyInfected * (
      2 ** Math.trunc(toDays / 3)
    );
  }
  return {
    inputData,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
