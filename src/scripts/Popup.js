class Popup{
    constructor(selector){
        this._selector = selector;
    }

    this_popup = document.querySelector(this._selector);
    
    open() {
        this_popup.classList.add("popup_is-opened");
        document.addEventListener("keydown", escClosePopup);
        this_popup.addEventListener("mousedown", clickClosePopup);
    };

    close() {
        this_popup.classList.remove("popup_is-opened");
        this_popup.removeEventListener("mousedown", clickClosePopup);
        document.removeEventListener("keydown", escClosePopup);
    };

    _handleEscClose(){
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(){
        
    }

      
}