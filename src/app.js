import * as layer from 'layerconvert';
import SimpleDom from './lib/dom.js';
import './assets/css/style.css';
import icon from './assets/img/icon.svg';
import noteData from './assets/data/note.xml';

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
    console.log('display', layer);
    img.onclick=function(){
      console.log('I am clicked at app.js. added watching mode. add webpack-dev-server');
    };
  }
}

export {
  App
}

