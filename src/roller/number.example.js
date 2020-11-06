import * as bricks from '../bricks/index.js';

class NumberRoller {
  constructor(parent=document) {
    this.parent = parent;
    this.children = new Set();
  }
  display() {
    this.dom = document.createElement('div', { class:'roller-example' });
    this.parent.appendChild(this.dom);
    const roller = new bricks.roller.RollerBrick(this.dom);
    this.children.add(roller);
    const button = document.createElement('div', { class:'roller-example-button' });
    button.innerHTML="<span>rolling the roller</span>";
    this.children.add(button);
    this.children.forEach((ele) => {
      console.log('ele.display', ele.display);
      if(ele.display) {
        ele.display();
      } else {
        this.dom.appendChild(ele);
      }
    });
  }
}


export {
  NumberRoller
}
