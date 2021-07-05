export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        
        this._nameField = document.querySelector(this._nameSelector);
        this._aboutField = document.querySelector(this._aboutSelector);

        this._avatarSelector = avatarSelector;
        this._avatarImg = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            about: this._aboutField.textContent,
            avatar: this._avatarImg.src,
            id: this._id,
        }
    }

    setUserInfo(name, about, id) {
            this._nameField.textContent = name;
            this._aboutField.textContent = about;
            this._id = id;
    }

    setUserAvatar(avatar){
        this._avatarImg.src = avatar
    }

    setUserId(id){
        this._id = id
    }
}