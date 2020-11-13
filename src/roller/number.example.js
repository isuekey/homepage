import * as bricks from '../bricks/index.js';
import './number.example.css';

class NumberRoller {
  constructor(parent=document) {
    this.parent = parent;
    this.children = new Set();
    this.index = 0;
    // this.
    this.nextIndex = this.getNextIndex();
    this.handleRollingClick = () => {
      this.index = this.nextIndex;
      this.roller && this.roller.rollTo(this.index);
      this.nextIndex = this.getNextIndex();
      // console.log('rolling click', this.index);
      this.button.innerHTML=`<span>rolling the roller ${this.nextIndex}</span>`;
    };
  }
  getNextIndex(){
    return (this.index + Math.floor(Math.random() * 1000));
  }
  
  display() {
    this.dom = document.createElement('div');
    this.dom.classList.add('roller-example');
    this.parent.appendChild(this.dom);
    const roller = new bricks.roller.NumberRoller(this.dom, new Array(10).fill(0).map((ele,idx) => idx), ',');
    this.children.add(roller);
    this.roller = roller;
    const button = document.createElement('button');
    button.classList.add('roller-example-button');
    button.innerHTML=`<span>rolling the roller ${this.nextIndex}</span>`;
    button.onclick = this.handleRollingClick;
    this.button = button;
    this.children.add(button);
    this.roller.initDom();
    this.roller.mount();
    this.roller.render();
    this.children.forEach((ele) => {
      // console.log('ele.display', ele.display);
      if(ele.display) {
        // ele.display();
      } else {
        if(this.dom != ele.parentNode){
          this.dom.appendChild(ele);
        }
      }
    });
  }
}


export {
  NumberRoller
}
