class Popup{
    constructor(selector){
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
    }
    
    open() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        this._popup.addEventListener("mousedown", this.setEventListeners.bind(this));
    };

    close() {
        this._popup.classList.remove("popup_is-opened");
        this._popup.removeEventListener("mousedown", this._handleEscClose.bind(this));
        document.removeEventListener("keydown", this.setEventListeners.bind(this));
    };

    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(evt) {
        // if (
        //   evt.target === evt.currentTarget ||
        //   evt.target.classList.contains("popup__close-button")
        // ) {
        //     this.close();
        // }
    }

      
}

export default Popup;