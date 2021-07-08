class Section{
    constructor(selector, renderer){
        this._selector = selector;
        this._elements = document.querySelector(selector);

        this._renderer = renderer;
    }

    addItem(element){
        this._elements.prepend(this._renderer(element));
    }
}

export default Section;