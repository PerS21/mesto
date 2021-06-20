import Popup from '../scripts/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(cardImg, cardText) {
        super.open();
        const imgPopupImg = this._popup.querySelector(".imgPopup__img");
        const imgPopupText = this._popup.querySelector(".imgPopup__text");
        imgPopupImg.src = cardImg.src;
        const elementText = cardText.textContent;
        imgPopupText.textContent = elementText;
        imgPopupImg.alt = `картинка места - ${elementText}`;
    }
}