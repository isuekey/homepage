import * as layer from 'layerconvert';
import SimpleDom from './lib/dom.js';
import './assets/css/style.css';
import icon from './assets/img/icon.svg';
import * as roller from './roller/index.js';
import { cube } from './lib/math.js';

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
    // console.log('display', layer, cube(9) );
    img.onclick=function(){
      console.log('I am clicked at app.js. added watching mode. add webpack-dev-server');
    };
    const rollerEle = new roller.numberExample.NumberRoller(this.dom);
    rollerEle.display();
  }
}

export {
  App
}

