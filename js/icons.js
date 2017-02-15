// 'use strict';

// Select all `.panel--item i`
var icon = document.querySelectorAll('.panel--expert i');

icon.forEach(function(e){
  console.log('before click: '+ e.innerHTML);
  e.addEventListener('click', function (f) {
    f.preventDefault();
    console.log('click!');
    console.log(e);
    console.log('after click: '+ e.innerHTML);

    if (e.innerHTML = 'add_circle') {
        e.innerHTML = 'done'
        console.log('if');
      } else  {
        e.innerHTML = 'add_circle'
        console.log('else');
      }

  })
});
