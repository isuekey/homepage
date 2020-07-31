import * as convert from 'layerconvert';
import './assets/css/style.css';

const onload = function(){
  const container = document.getElementById('container');
  console.log('i got the door');
  console.log('my convert', convert);
  const element = document.createElement('div');
  element.innerHTML = '<span>Hello webpack</span>';
  element.classList.add('hello');
  document.body.appendChild(element);
};
const body = document.body;
body.onload = onload;


