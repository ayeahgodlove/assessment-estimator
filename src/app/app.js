// Selecting form and form fields
import {covid19ImpactEstimator} from '../estimator';

const form = document.getElementById('form');
const population = document.getElementById('population');
const timeToElapse = document.getElementById('timeToElapse');
const totalHospitalBeds = document.getElementById('totalHospitalBeds');
const periodType = document.getElementById('periodType');

form.addEventListener('submit', event => {
    event.preventDefault();
});

function getInputs(population, timeToElapse, totalHospitalBeds, periodType) {
   
}

data = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
    }
}