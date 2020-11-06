import './roller.brick.css';

class ItemBrick {
  constructor(item) {
    this.item = item;
  }
  display() {
    const dom = document.createElement('div');
    this.dom = dom;
    dom.classList.add('roller-item');
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
  }
  display(){
    this.dom = document.createElement('div');
    this.dom.classList.add('roller-container');
    const children = this.range.map(range => {
      const item = new ItemBrick(range);
      this.children.add(item);
      return item.display();
    });
    children.forEach(ele => {
      this.dom.appendChild(ele);
    });
    if(this.parent && this.parent.appendChild){
      this.parent.appendChild(this.dom);
    }
    return this.dom;
  }
};

export {
  RollerBrick
};
