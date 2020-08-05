import * as app from './app.js';

const onload = function(){
  const appElement = new app.App('container');
  appElement.display();
};
const body = document.body;
body.onload = onload;
