import "../css/style.scss";

import {
    coffee_your_favorite,
    coffee_for_best_friend,
    coffee_personalized_coffee
} from './data';

const youFavoriteSlider = document.getElementById('youFavoriteSlider');

function cardSimple(data) {
    const { img, name, price, description } = data;

    return (
        `<div class="card-simple">
            <img class="card-simple__img" src="${img}">
            <div class="card-simple__content">
                <span class="card-simple__price">${price}</span>
                <span class="card-simple__name">${name}</span>
                <span class="card-simple__description">${description}</span>
                <div class="card__button-group">
                    <button class="button__type1></button>
                    <button class="button__type2></button>
                </div
            </div>
        </div>`
    );
}

youFavoriteSlider.innerHTML = cardSimple(coffee_your_favorite[0])