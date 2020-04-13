// import { covid19ImpactEstimator } from '../estimator.js';

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  }
};

const form = document.getElementById('form');
const population = document.getElementById('population');
const timeToElapse = document.getElementById('timeToElapse');
const totalHospitalBeds = document.getElementById('totalHospitalBeds');
const reportedCases = document.getElementById('reportedCases');
const periodType = document.getElementById('periodType');

// let formData = new FormData();
// console.log(formData)
function getFormData() {
  data.periodType = periodType.value;
  data.timeToElapse = timeToElapse.value;
  data.reportedCases = reportedCases.value;
  data.population = population.value;
  data.totalHospitalBeds = totalHospitalBeds.value;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getFormData();
});
