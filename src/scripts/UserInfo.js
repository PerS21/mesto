export default class UserInfo{
    constructor(nameSelector, aboutSelector){
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._nameField = document.querySelector(this._nameSelector);
        this._aboutField = document.querySelector(this._aboutSelector);
    }

    getUserInfo(){
        return {
            name : this._nameField.value,
            about : this._aboutField.value,
        }
    }

    setUserInfo(name, about){
        this._nameField.value = name,
        this._aboutField.value = about
    }
}