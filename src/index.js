// import * as app from './app.js';

if('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registrated:', registration);
    }).catch(error => {
      console.log('SW registrated failed', error);
    });
  });
}

const onload = function(){
  import('./app.js').then(app => {
    new app.App('container').display();
  });
};
const body = document.body;
body.onload = onload;
