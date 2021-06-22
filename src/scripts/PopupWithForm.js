import Popup from '../scripts/Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, callBack){
        super (selector);

        this._callBack = callBack.bind(this);
        this._form = this._popup.querySelector("form");
    }

    open = () => {
        super.open()
    }

    close = () => {
        super.close()
        this._form.reset()
    }

    setEventListeners = () => {
        super.setEventListeners()
        this._form.addEventListener('submit', this._callBack);
    }

    _getInputValues = () => {
        this._formValues = {};

        this._form.querySelectorAll('input').forEach(input => {
            this._formValues[input.name] = input.value;
          });

        return this._formValues;
    }
}