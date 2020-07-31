import * as convert from 'layerconvert';
const onload = function(){
  const container = document.getElementById('container');
  console.log('i got the door');
  console.log('my convert', convert);
  let element = document.createElement('div');
  document.body.appendChild(element);
};
const body = document.body;
body.onload = onload;


