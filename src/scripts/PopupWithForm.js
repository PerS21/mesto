import Popup from '../scripts/Popup.js';

export default class PopupWithForm extends Popup{
    constructor(selector, callBack){
        super (selector);

        this._callBack = callBack;
        this._form = this._popup.querySelector(".profile-edit-form");
    }

    open(){
        super.open()
    }

    close(){
        super.close()
        this._form.reset()
    }

    setEventListeners(){
        super.setEventListeners()
        function asdddd(){console.log(12345)}
        this._form.addEventListener('submit', this._callBack);
    }

    _getInputValues(){

    }
}