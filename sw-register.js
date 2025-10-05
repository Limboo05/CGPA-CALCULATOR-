// Place this script just before </body> or include as external file.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(reg) {
        console.log('ServiceWorker registration successful with scope: ', reg.scope);
      }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}