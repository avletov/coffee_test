import "../css/style.scss";

import {
    coffee_your_favorite,
    coffee_for_best_friend,
    coffee_personalized_coffee
} from './data';

import { array_chunks, priceFormatter } from './utils';

function cardSimple(data) {
    const { img, name, price, description } = data;

    return (
        `<div class="card card-simple">
            <img class="card-simple__img" src="${img}">
            <div class="card-simple__content">
                <span class="card-simple__price">${priceFormatter(price)}</span>
                <span class="card-simple__name">${name}</span>
                <span class="card-simple__description">${description}</span>
                <div class="card__button-group">
                    <button class="card__button-1">MUA NGAY</button>
                    <button class="card__button-2">CHI TIẾT</button>
                </div>
            </div>
        </div>`
    );
}

function cardGroup(data) {
    let card_group = '';

    data.forEach(card => card_group += cardSimple(card));

    return (
        `<div class="card-group">${card_group}</div>`
    )
}

//Слайдер 1
const sliderYouFavorite = document.getElementById('sliderYouFavorite');
const sliderYouFavoriteLeftArrow = document.getElementById('sliderYouFavoriteLeftArrow');
const sliderYouFavoriteRightArrow = document.getElementById('sliderYouFavoriteRightArrow');

let sliderYouFavorite_page = 0;
let sliderYouFavorite_page_max = 0;

function sliderYouFavoriteInit(data) {
    if (sliderYouFavorite_page === 0) {
        sliderYouFavoriteLeftArrow.style.display = 'none';
    }

    data = array_chunks(data, 2);
    sliderYouFavorite_page_max = data.length - 2;

    let slider_content = '';
    data.forEach(card_group => slider_content += cardGroup(card_group));

    sliderYouFavorite.innerHTML = slider_content;

    sliderYouFavoriteLeftArrow.addEventListener('click', sliderYouFavoriteUpdate);
    sliderYouFavoriteRightArrow.addEventListener('click', sliderYouFavoriteUpdate);
}

function sliderYouFavoriteUpdate(e) {
    const { id } = e.target;
    const id_arrow = e.target.parentNode.id;

    if (id === 'sliderYouFavoriteLeftArrow' || id_arrow === 'sliderYouFavoriteLeftArrow') {
        sliderYouFavorite_page -= 1;
    } else if (id === 'sliderYouFavoriteRightArrow' || id_arrow === 'sliderYouFavoriteRightArrow') {
        sliderYouFavorite_page += 1;
    }

    if (sliderYouFavorite_page === 0) {
        sliderYouFavoriteLeftArrow.style.display = 'none';
    } else {
        sliderYouFavoriteLeftArrow.style.display = 'flex';
    }

    if (sliderYouFavorite_page === sliderYouFavorite_page_max) {
        sliderYouFavoriteRightArrow.style.display = 'none';
    } else {
        sliderYouFavoriteRightArrow.style.display = 'flex';
    }

    sliderYouFavorite.style.left = -560 * sliderYouFavorite_page + 100 + 'px';
}

sliderYouFavoriteInit(coffee_your_favorite);

////Tabs
const bestFriendGiftsets = document.getElementById('bestFriendGiftsets');

function cardBestFriend(data) {
    const { img, price, name, description, sort, altitude_of_growth } = data;

    return (
        `<div class="card-best-friend card">
            <img class="card-best-friend__img" src="${img}">
            <div class="card-best-friend__content">
                <span class="card-best-friend__price">${priceFormatter(price)}</span>
                <span class="card-best-friend__name">${name}</span>
                <span class="card-best-friend__description">${description}</span>
                <div class="coffee-origin">
                    <div class="coffee-attribute">
                        <div class="coffee-sort-icon"></div>
                        <div class="coffee-description">
                            <div class="coffee-description__attribute">Loại hạt</div>
                            <div class="coffee-description__value">${sort}</div>
                        </div>
                    </div>
                    <div class="coffee-attribute">
                        <div class="coffee-altitude-of-growth-icon"></div>
                        <div class="coffee-description">
                            <div class="coffee-description__attribute">Độ cao</div>
                            <div class="coffee-description__value">${altitude_of_growth}</div>
                        </div>
                    </div>
                </div>
                <div class="card__button-group">
                    <button class="card__button-1">MUA NGAY</button>
                    <button class="card__button-2">CHI TIẾT</button>
                </div>
            </div>
            <div class="card-tabs"></div>
        </div>
        `
    );
}


function initCardTabs(count, active_tab = 1) {
    const cardTabs = document.querySelector('.card-tabs');

    for (let i = 1; i <= count; i++) {
        cardTabs.innerHTML += `<div class="card-tab${i === active_tab ? ' card-tab_active' : ''}" id="Tab_${i}">${i}</div>`;
    }

    for (let i = 1; i <= count; i++) {
        document.getElementById(`Tab_${i}`).addEventListener('click', updateBestFriendsTab);
    }
}

function initBestFriendsTab(data) {
    const { length } = data;

    bestFriendGiftsets.innerHTML = cardBestFriend(data[0]);
    initCardTabs(length);
}

function updateBestFriendsTab(e) {
    const { target } = e;
    const { id } = target;
    const { length } = coffee_for_best_friend;

    const tab = Number(id.split('_')[1]);

    bestFriendGiftsets.innerHTML = cardBestFriend(coffee_for_best_friend[tab - 1]);
    initCardTabs(length, tab);
}

initBestFriendsTab(coffee_for_best_friend);


//Слайдер комбо
const sliderCombo = document.getElementById('sliderCombo');
const sliderComboLeftArrow = document.getElementById('sliderComboLeftArrow');
const sliderComboRightArrow = document.getElementById('sliderComboRightArrow');

let sliderCombo_page = 0;
let sliderCombo_page_max = 0;

function cardCombo(data) {
    const { img, price, pre_price, name, description } = data;

    return (
        `<div class="card card-combo">
            <img class="card-combo__img" src="${img}">
            <div class="card-combo__content">
                <div class="card-combo__price-container">
                    <span class="card-combo__price">${priceFormatter(price)}</span>
                    <span class="card-combo__pre-price">${priceFormatter(pre_price)}</span>
                </div>                
                <span class="card-combo__name">${name}</span>
                <span class="card-combo__description">${description}</span>
                <div class="card__button-group">
                    <button class="card__button-1">MUA NGAY</button>
                    <button class="card__button-2">CHI TIẾT</button>
                </div>
            </div>
        </div>`
    );
}

function sliderComboInit(data) {
    if (sliderCombo_page === 0) {
        sliderComboLeftArrow.style.display = 'none';
    }

    sliderCombo_page_max = data.length - 3;

    let slider_content = '';
    data.forEach(card => slider_content += cardCombo(card));

    sliderCombo.innerHTML = slider_content;

    sliderComboLeftArrow.addEventListener('click', sliderComboUpdate);
    sliderComboRightArrow.addEventListener('click', sliderComboUpdate);
}

function sliderComboUpdate(e) {
    const { id } = e.target;
    const id_arrow = e.target.parentNode.id;

    if (id === 'sliderComboLeftArrow' || id_arrow === 'sliderComboLeftArrow') {
        sliderCombo_page -= 1;
    } else if (id === 'sliderComboRightArrow' || id_arrow === 'sliderComboRightArrow') {
        sliderCombo_page += 1;
    }

    if (sliderCombo_page === 0) {
        sliderComboLeftArrow.style.display = 'none';
    } else {
        sliderComboLeftArrow.style.display = 'flex';
    }

    if (sliderCombo_page === sliderCombo_page_max) {
        sliderComboRightArrow.style.display = 'none';
    } else {
        sliderComboRightArrow.style.display = 'flex';
    }

    sliderCombo.style.left = -370 * sliderCombo_page + 100 + 'px';
}

sliderComboInit(coffee_personalized_coffee);