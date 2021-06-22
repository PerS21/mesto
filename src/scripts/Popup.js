class Popup{
    constructor(selector){
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
        this._b = this._popup.querySelector('.popup__close-button')
    }
    
    open () {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    };

    close () {
        this._popup.classList.remove("popup_is-opened");
        this._popup.removeEventListener("mousedown", this._handleEscClose);
    };

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners () {
        this._popup.addEventListener("mousedown", (evt)=>{
            if (
                evt.target === evt.currentTarget ||
                evt.target.classList.contains("popup__close-button")
              ) {
                  this.close();
              }
        });
    }

      
}

export default Popup;