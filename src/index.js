import * as convert from 'layerconvert';
import './assets/css/style.css';
import * as app from './app.js';

const onload = function(){
  const container = document.getElementById('container');
  console.log('i got the door');
  console.log('my convert', convert);
  const appElement = new app.App();
  const element = document.createElement('div');
  element.innerHTML = '<span>Hello webpack</span>';
  element.classList.add('hello');
  document.body.appendChild(app.getElement());
};
const body = document.body;
body.onload = onload;


