class Card {
  constructor(data, select, userInfo, api, openPopupWithImage, openPopupDeleteCard) {
    this._template = document.querySelector(select).content;
    this._data = data;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupDeleteCard = openPopupDeleteCard;

    this._userId = userInfo.getUserInfo().id;
    this._api = api;
  }

  _openImgPopup = () => {
    this._openPopupWithImage.open(this._cardImg, this._cardText);
  };

  _deleteCard = () => {
    this._openPopupDeleteCard(this._data._id, this._elementCard);
  };

  _checkLike() {
    const likeId = []
    this._data.likes.forEach((like) => {
      likeId.push(like._id)
    })
    if (likeId.includes(this._userId)) {
      this._cardHeart.classList.add('element__heart_active')
    }
  }

  _checkTrash() {
    console.log(this._data.owner._id, this._userId)
    if (this._data.owner._id === this._userId) {
      this._trash.classList.add('element__trash_visible')
    }
  }

  _likeToggle = () => {
    if (this._cardHeart.classList.contains("element__heart_active")) {
      this._api.deleteLike(this._data._id)
        .then((res) => {
          this._cardHeart.classList.remove("element__heart_active");
          this._heartQuantity.textContent = res.likes.length;
        })
        .catch(error => {
            console.log(error)
        })
    } else {
      this._api.putLike(this._data._id)
        .then((res) => {
          this._cardHeart.classList.add("element__heart_active");
          this._heartQuantity.textContent = res.likes.length;
        })
        .catch(error => {
            console.log(error)
        })
    }
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
    this._heartQuantity = this._card.querySelector(".element__heart-quantity");
    this._trash = this._card.querySelector(".element__trash");

    this._elementCard = this._cardTrash.closest(".element")

    this._cardText.textContent = this._data.name;
    this._heartQuantity.textContent = this._data.likes.length;
    this._cardImg.src = this._data.link;
    this._cardImg.alt = this._data.name;

    // console.log(this._data.name, this._data.owner._id, this._data._id, this._data.owner.name);

    this._checkTrash();
    this._checkLike();
    this._addListeners();
  };

  getCard = () => {
    this._createCard();
    return this._card;
  };
}

export default Card;