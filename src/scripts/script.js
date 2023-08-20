'use strict';

import data from '../data.json';

const citiesDiv = document.getElementById('cities');
const country = document.querySelector('span');
const nextButton = document.querySelector('.next');
const game = document.getElementById('game');
const result = document.getElementById('result');

let dataIndex;
let counter;

const cleanStartDiv = () => {
    result.style.display = 'none';
    game.style.display = 'block';
    citiesDiv.innerHTML = '';
}

const defaultValues = () => {
dataIndex = 0;
counter = 0;
cleanStartDiv();
country.textContent = data[dataIndex].country;

for (let i = 0; i < data[dataIndex].cities.length; i++){
    citiesDiv.innerHTML += `<div class="city__button">
    <input id="radio-${i}" type="radio" name="radio" value="${data[dataIndex].cities[i].isCapital}" />
    <label for="radio-${i}">${data[dataIndex].cities[i].city}</label>
   </div>`;
}
}

defaultValues();

const nextCity = () => {
    dataIndex++;
    citiesDiv.innerHTML = '';
    country.textContent = data[dataIndex].country;
    for (let i = 0; i < data[dataIndex].cities.length; i++){
        citiesDiv.innerHTML += `<div class="city__button">
        <input id="radio-${i}" type="radio" name="radio" value="${data[dataIndex].cities[i].isCapital}" />
        <label for="radio-${i}">${data[dataIndex].cities[i].city}</label>
      </div>`;
    }
}

const count = () => {
    const citiesValue = document.querySelectorAll('.city__button input');
    citiesValue.forEach(el => {
        if (el.checked && el.value === 'true'){
            counter += 1;
            const label = el.nextElementSibling;
            if (el.value === 'true') {
                label.classList.add('correct');
            }
        }
        else if (el.checked && el.value !== 'true'){
            const label = el.nextElementSibling;
            label.classList.add('wrong');
        }
    })
}

const cleanEndDiv = () => {
    game.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = '';
}

const createEndDiv = () => {
    const headlineEndGane = document.createElement('h3');
    headlineEndGane.textContent = `Your score is ${counter} out of 10`;
    result.appendChild(headlineEndGane);
    const tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = 'Try again';
    tryAgainButton.classList.add('again');
    tryAgainButton.addEventListener('click', defaultValues);
    result.appendChild(tryAgainButton);
}

const endGame = () => {
    cleanEndDiv();
    createEndDiv();
}

nextButton.addEventListener('click', () => {
    count();
    if (dataIndex < 9) {
        setTimeout(nextCity, 500);
    }
    else {
        setTimeout(endGame, 500);
    }
})