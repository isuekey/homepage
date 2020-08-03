import * as convert from 'layerconvert';
import SimpleDom from './lib/dom.js';
import './assets/css/style.css';
import icon from './assets/img/icon.svg';

class App extends SimpleDom{
  constructor(id) {
    super(id);
    if(!this.dom) {
      this.dom = document.body;
    }
    this.children = [];
  }
  display() {
    const element = document.createElement('div');
    element.innerHTML = '<span>Hello webpack</span>';
    element.classList.add('hello');
    const img = new Image();
    img.src = icon;
    this.dom.appendChild(element);
    this.dom.appendChild(img);
  }
}

export {
  App
}

