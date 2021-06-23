class Card {
  constructor(data, select, openPopupWithImage) {
    this._template = document.querySelector(select).content;
    this._data = data;
    this._openPopupWithImage = openPopupWithImage
  }

  _openImgPopup = () => {
    this._openPopupWithImage(this._cardImg, this._cardText);
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