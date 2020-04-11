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
  1w - 7ds
  4ws - 7 * 4 = 28

  1m - 30ds
  4ms = x =4*30
  toDays converter
*/
const covid19ImpactEstimator = (data) => {
  const inputData = data;
  let currentlyInfected;
  let impact = {};
  let servereImpact = {};
  /*
    check periodType: if days,weeks or months
  */
  let toDays = inputData.timeToElapse;
  if (inputData.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
    servereImpact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
  }
  if (inputData.periodType === 'weeks') {
    toDays = inputData.timeToElapse * 7;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
    servereImpact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
  }
  if (inputData.periodType === 'months') {
    toDays = inputData.timeToElapse * 30;
    impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
    servereImpact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** (toDays / 3));
  }
  /*
   impact Object
  */
  impact = {
    currentlyInfected: inputData.reportedCases * 10,
    infectionsByRequestedTime: currentlyInfected * (2 ** 10)
  };
  /*
   serverImpact Object
  */
  servereImpact = {
    currentlyInfected: inputData.reportedCases * 50,
    infectionsByRequestedTime: currentlyInfected * (2 ** 10)
  };
  return {
    inputData,
    impact,
    servereImpact
  };
};

export default covid19ImpactEstimator;
