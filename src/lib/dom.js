
class SimpleDom {
  constructor(id) {
    if(!id) {
      this.dom = undefined;
      return;
    }
    this.dom = document.getElementById(id);
    // console.log('single dom');
    return;
  }
}


export default SimpleDom;
export {
  SimpleDom
}
