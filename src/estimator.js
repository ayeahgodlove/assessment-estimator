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
  let currentlyInfected;
  /*
   impact Object
  */
  let impact = {};
  impact = {
    currentlyInfected: inputData.reportedCases * 10,
    infectionsByRequestedTime: currentlyInfected * (2 ** 10)
  };
  /*
   serverImpact Object
  */
  let servereImpact = {};
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
