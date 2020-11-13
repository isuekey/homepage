import './roller.brick.css';

class MyDom {
  constructor(parent){
    this.mounted = false;
    this.parent = parent;
    this.children=[];
    this.inited= false;
  }
  initDom(){
    if(!this.inited) {
      this.dom = document.createElement('div');
      this.inited = true;
    }
    this.children.forEach(ele => {
      ele.initDom && ele.initDom();
    });
    return this.dom;
  }
  mount(){
    if(this.parent && this.dom && !this.dom.parentNode) {
      this.parent.appendChild(this.dom);
    }
    this.children.forEach(ele => {
      ele.mount && ele.mount();
    });
    this.mounted = true;
  }
  render(){
    this.children.forEach(ele => {
      ele.render && ele.render();
    });
  }
  display(){
    this.children.forEach(ele => {
      ele.display && ele.display();
    });
  }
  unmount(){
    if(this.parent && this.dom && this.dom.parenNode == this.parent) {
      this.parent.remove(this.dom);
    }
    this.children.forEach(ele => {
      ele.unmount && ele.unmount();
    });
    this.mounted = false;
  }
  addClass(className){
    if(!this.dom || !className) return;
    this.dom.classList.add(className);
  }
}

class ItemBrick extends MyDom{
  constructor(parent, item, distancePx='153.8841768587627px', rotateDeg='0deg') {
    super(parent);
    this.item = item;
    this.distancePx = distancePx;
    this.rotateDeg = rotateDeg;
  }
  initDom(){
    super.initDom();
    this.dom.classList.add('roller-item');
    this.dom.setAttribute('style', `transform: rotateX(${this.rotateDeg}) translateZ(${this.distancePx})`);
    this.dom.innerHTML=`<span>${this.item}</span>`;
  };
}

class RollerBrick extends MyDom{
  constructor(parent, range=[]) {
    super(parent);
    this.range = range;
    this.rangeIndexMapping = range.reduce((sum, cur, curIdx) => {
      sum[cur] = curIdx;
      return sum;
    }, new Map());
    this.children = new Set();
    this.index = 0;
    this.rotated = 0;
    this.width=100;
    this.height=100;
    this.distance=100;
  }
  initDom(){
    super.initDom();
    this.dom.classList.add('roller-brick');
    this.roller = document.createElement('div');
    this.dom.appendChild(this.roller);
    this.roller.classList.add('roller-container');
    this.initChild();
    console.log('init the brick');
    return this.dom;
  }
  initChild(){
    const deg2 = Math.floor(360/ (this.range.length || 1));
    const r1 = Math.PI * deg2/360;
    const ctg = Math.cos(r1)/Math.sin(r1);
    const distance = ctg * this.height/2;
    this.distance = distance;
    this.distanceBalance = Math.floor(this.distance * 1.1);
    const distancePx = `${distance}px`;
    const children = this.range.filter(ele => true).map((range,idx) => {
      const rotateDeg = `-${deg2*idx}deg`;
      const item = new ItemBrick(this.roller, range, distancePx, rotateDeg);
      item.initDom();
      item.mount();
      item.render();
      this.children.add(item);
    });
  }
  rollTo(toIndex){
    if(toIndex - this.index < 0) {
      this.rotated += 1;
      //this.rotated = 0;
    }
    const rotate = 360 * this.rotated + toIndex * 36;
    // console.log('rotate', rotate);
    this.roller.setAttribute('style', `transform: translateZ(-${this.distanceBalance}px) rotateX(${rotate}deg);`);
    this.index = toIndex;
  }
};
class Divider extends MyDom {
  constructor(parent, divider=",") {
    super(parent);
    this.divider = divider;
  }
  render(){
    this.dom.innerHTML=`<span>${this.divider}</span>`;
  }
  rollTo(){}
};
class NumberSign extends MyDom {
  constructor(parent, sign="") {
    super(parent);
    this.sign = sign;
  }
  render(){
    this.dom.innerHTML=`<span>${this.sign}</span>`;
  }
  rollTo(){}
};
class PrefixBrick extends MyDom {
  constructor(parent) {
    super(parent);
  }
}
class NumberRoller extends MyDom {
  constructor(parent, range=[], divider=",", initNumber=0) {
    super();
    this.range=range;
    this.parent=parent;
    this.children = [];
    this.value = 0;
    this.base = range.length || 10;
    this.divider=divider;
    this.number = initNumber;
    this.highIndex = 0;
    this.childrenMap = {};
  }
  initDom(){
    super.initDom();
    this.dom.classList.add('number-roller-container');
    this.prepareRoll(this.number);
  }
  rollTo(number){
    this.number = number;
    this.displayRollTo(this.prepareRoll(this.number));
  }
  prepareRoll(theNumber){
    const numberString = (Math.floor(theNumber)).toLocaleString('zh-Hans-CN', {currency:'CNY', minimumFractionDigits:0,maximumFractionDigits:0});
    const numberArray = numberString.split('').reverse();
    const length = numberArray.length;
    // number
    const itemArray = numberArray.map((numberItem, idx) => {
      let item = this.childrenMap[idx];
      // console.log(numberItem, idx);
      if(item) {
        if(idx > this.highIndex) {
          this.highIndex = idx;
          this.highItem = item;
        }
        item.rollTo(numberItem);
        return item;
      }
      switch(numberItem) {
      case ',':
        item= new Divider(this.dom, this.divider);
        break;
      case '+':
      case '-':
        item= new NumberSign(this.dom, numberItem);
        break;
      default:
        item= new RollerBrick(this.dom,[...this.range]);
        break;
      };
      item.initDom();
      this.highIndex = idx;;
      this.childrenMap[idx] = item;
      // console.log('item', item);
      this.dom.insertBefore(item.dom, this.highItem && this.highItem.dom);
      this.highItem = item;
      item.render();
      item.rollTo(numberItem);
      return item;
    });
    return numberArray;
  }
  displayRollTo(numberArray=[]){
    numberArray.forEach((numberItem, idx) => {
      const item = this.childrenMap[idx];
      item.rollTo(numberItem);
    });
  }
};

export {
  RollerBrick,
  NumberRoller
};
