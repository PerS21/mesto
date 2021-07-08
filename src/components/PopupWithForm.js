import Popup from './Popup.js';


export default class PopupWithForm extends Popup{
    constructor(selector, callBack){
        super (selector);

        this._callBack = callBack.bind(this);
        this._form = this._popup.querySelector("form");
    }

    close = () => {
        super.close();
        this._form.reset();
    }

    setEventListeners = () => {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callBack(this._getInputValues())
     });
    }

    _getInputValues = () => {
        this._formValues = {};

        this._form.querySelectorAll('input').forEach(input => {
            this._formValues[input.name] = input.value;
          });

        return this._formValues;
    }
}