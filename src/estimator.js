const covid19ImpactEstimator = (data) => {
  const inputData = data;
  let currentlyInfected;
  return {
    data: inputData,
    impact: {
      currentlyInfected: inputData.reportedCases * 10,
      infectionsByRequestedTime: currentlyInfected * (2 ** 10)

    },
    servereImpact: {
      currentlyInfected: inputData.reportedCases * 50,
      infectionsByRequestedTime: currentlyInfected * (2 ** 10)

    }
  };
};


export default covid19ImpactEstimator;
