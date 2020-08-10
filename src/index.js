// import * as app from './app.js';

const onload = function(){
  import('./app.js').then(app => {
    new app.App('container').display();
  });
};
const body = document.body;
body.onload = onload;
