import { openPopup } from "../utils/utils.js";

class Card {
  constructor(data, _select) {
    this._template = document.querySelector(_select).content;
    this._data = data;
  }

  _openImgPopup = (e) => {
    const imgPopup = document.querySelector(".imgPopup");
    const imgPopupImg = imgPopup.querySelector(".imgPopup__img");
    const imgPopupText = imgPopup.querySelector(".imgPopup__text");
    imgPopupImg.src = e.target.src;
    const elementText = e.target
      .closest(".element")
      .querySelector(".element__text").textContent;
    imgPopupText.textContent = elementText;
    imgPopupImg.alt = `картинка места - ${elementText}`;
    openPopup(imgPopup);
  };

  _deleteCard = (e) => {
    e.target.closest(".element").remove();
  };

  _likeToggle = (e) => {
    e.target.classList.toggle("element__heart_active");
  };

  _addListeners = () => {
    this._card
      .querySelector(".element__trash")
      .addEventListener("click", this._deleteCard);
    this._card
      .querySelector(".element__img")
      .addEventListener("click", this._openImgPopup);
    this._card
      .querySelector(".element__heart")
      .addEventListener("click", this._likeToggle);
  };

  _createCard = () => {
    this._card = this._template.cloneNode(true);
    this._card.querySelector(".element__text").textContent = this._data.name;
    this._card.querySelector(".element__img").src = this._data.link;

    this._addListeners();
  };

  getCard = () => {
    this._createCard();
    return this._card;
  };
}

export default Card;
