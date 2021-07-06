import Popup from './Popup.js';


export default class PopupСonfirm extends Popup {
    constructor(selector) {
        super(selector);

        this._form = this._popup.querySelector("form");
    }

    open = () => {
        super.open()
    }

    close = () => {
        super.close();
    }

    setEventListeners = () => {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callBack()
        });
    }

    setConfirmHandler = (callBack) => {
        this._callBack = callBack;
    }
}