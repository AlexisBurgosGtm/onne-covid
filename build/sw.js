
var CACHE = 'mercadosefectivosv1';
const staticAssets = [
  './',
  './manifest.json',
  './favicon.png',
  './index.html',
   './sw.js',
   './controllers/*',
   './css/*',
   './img/*',
   './js/*',
   './libs',
   './libs/*',
   './libs/leaflet',
   './libs/leaflet/*',
   './libs/leaflet/images/*',
   './models/*',
   './vendor',
   './views/*',
];

self.addEventListener('install', function(evt) {
  //console.log('Service worker instalado');
  /*evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));*/
  evt.waitUntil(
		caches.open(CACHE).then(cache => {
			return cache.addAll([
        './',
        './manifest.json',
        './favicon.png',
        './index.html',
         './sw.js',
         './controllers/*',
         './css/*',
         './img/*',
         './js/*',
         './libs',
         './libs/*',
         './libs/leaflet',
         './libs/leaflet/*',
         './libs/leaflet/images/*',
         './models/*',
         './vendor',
         './views/*',
      ])
		})
	);
});

self.addEventListener('fetch', function(evt) {
  let requestURL = new URL(evt.request.url);
  //console.log('host request: '+ requestURL.hostname);
  console.log(evt.request);
  
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
    

