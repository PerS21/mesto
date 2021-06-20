class Section{
    constructor({data, renderer},selector ){
        this._initialArray = data;
        this._renderer = renderer;
        this._selector = selector;
        this._elements = document.querySelector(selector);
    }
    
    renderer(){
        this._initialArray.forEach(item => {
            this._renderer(item)
        })
    }

    addItem(element){
        this._elements.prepend(element);
    }
}

export default Section;