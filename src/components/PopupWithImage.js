import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._imgPopupImg = this._popup.querySelector(".imgPopup__img");
        this._imgPopupText = this._popup.querySelector(".imgPopup__text");
    }

    open = (cardImg, cardText) => {
        super.open();
        this._imgPopupImg.src = cardImg.src;
        const elementText = cardText.textContent;
        this._imgPopupText.textContent = elementText;
        this._imgPopupImg.alt = `картинка места - ${elementText}`;
    }

    setEventListeners = () => {
        super.setEventListeners()
    }
}