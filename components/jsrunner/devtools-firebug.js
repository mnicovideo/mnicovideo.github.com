(function() {
  var pan = document.getElementById('fbPanel1');
  var fbc = document.getElementById('fbConsole');
  new MutationObserver(function() {
    pan.scrollTop = fbc.offsetHeight;
  }).observe(fbc, {
    childList: true
  });
})();
