import { openPopup } from "../utils/utils.js";

class Card {
  constructor(data, select) {
    this._template = document.querySelector(select).content;
    this._data = data;
  }

  _openImgPopup = () => {
    const imgPopup = document.querySelector(".imgPopup");
    const imgPopupImg = imgPopup.querySelector(".imgPopup__img");
    const imgPopupText = imgPopup.querySelector(".imgPopup__text");
    imgPopupImg.src = this._cardImg.src;
    const elementText = this._cardText.textContent;
    imgPopupText.textContent = elementText;
    imgPopupImg.alt = `картинка места - ${elementText}`;
    openPopup(imgPopup);
  };

  _deleteCard = (e) => {
    this._elementCard.remove();
    this._elementCard = null;
  };

  _likeToggle = (e) => {
    this._cardHeart.classList.toggle("element__heart_active");
  };

  _addListeners = () => {
    this._cardTrash.addEventListener("click", this._deleteCard);
    this._cardImg.addEventListener("click", this._openImgPopup);
    this._cardHeart.addEventListener("click", this._likeToggle);
  };

  _createCard = () => {
    this._card = this._template.cloneNode(true);
    this._cardImg = this._card.querySelector(".element__img");
    this._cardText = this._card.querySelector(".element__text");
    this._cardTrash = this._card.querySelector(".element__trash");
    this._cardHeart = this._card.querySelector(".element__heart");
    this._elementCard = this._cardTrash.closest(".element")

    this._cardText.textContent = this._data.name;
    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;

    this._addListeners();
  };

  getCard = () => {
    this._createCard();
    return this._card;
  };
}

export default Card;
