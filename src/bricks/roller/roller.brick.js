import './roller.brick.css';

class ItemBrick {
  constructor(item) {
    this.item = item;
  }
  display() {
    const dom = document.createElement('div');
    this.dom = dom;
    dom.classList.add('roller-item');
    dom.classList.add(`item-${this.item}`);
    this.dom.innerHTML=`<span>${this.item}</span>`;
    return dom;
  }
}

class RollerBrick {
  constructor(parent, range=[]) {
    this.parent = parent;
    this.range = range;
    this.rangeIndexMapping = range.reduce((sum, cur, curIdx) => {
      sum[cur] = curIdx;
      return sum;
    }, new Map());
    this.children = new Set();
    this.index = 0;
    this.rotated = 0;
  }
  display(){
    this.dom = document.createElement('div');
    this.dom.classList.add('roller-brick');
    this.roller = document.createElement('div');
    this.dom.appendChild(this.roller);
    this.roller.classList.add('roller-container');
    const children = this.range.filter(ele => true).map(range => {
      const item = new ItemBrick(range);
      this.children.add(item);
      return item.display();
    });
    children.forEach(ele => {
      this.roller.appendChild(ele);
    });
    if(this.parent && this.parent.appendChild){
      this.parent.appendChild(this.dom);
    }
    this.rollTo(this.index);
    return this.dom;
  }
  rollTo(toIndex){
    if(toIndex - this.index < 0) {
      // this.rotated += 1;
      this.rotated = 0;
    }
    let rotate = 360 * this.rotated + toIndex * 36;
    console.log('rotate', rotate);
    this.roller.setAttribute('style', `transform: translateZ(-170px) rotateX(${rotate}deg);`);
    this.index = toIndex;
  }
};

export {
  RollerBrick
};
