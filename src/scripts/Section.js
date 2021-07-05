class Section{
    constructor(selector ){
        this._selector = selector;
        this._elements = document.querySelector(selector);
    }

    addItem(element){
        this._elements.prepend(element);
    }
}

export default Section;