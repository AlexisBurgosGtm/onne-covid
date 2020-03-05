
var CACHE = 'mercadosefectivosv2';
const staticAssets = [
  './',
  './manifest.json',
  './favicon.png',
  './index.html',
   './sw.js',
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
  
	
});

self.addEventListener('fetch', async event => {
  /* 
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );

  await event.waitUntil(update(event.request));
*/
});

/*
self.addEventListener('fetch', function(evt) {
  let requestURL = new URL(evt.request.url);
  //console.log('host request: '+ requestURL.hostname);
  var req = evt.request.clone();
  if(req.method=='GET'){
    if(req.destination==''){}else{

          evt.waitUntil(update(evt.request));
          evt.respondWith(fromCache(evt.request));

    }
  }*/

  /*
  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  }
  */

  
});



function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    

