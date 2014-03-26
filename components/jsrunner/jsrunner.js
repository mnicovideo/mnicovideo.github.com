(function() {
  var exc = document.getElementById('exc');
  var rst = document.getElementById('rst');
  var ifm = document.getElementById('ifm');
  var src = document.getElementById('src').innerHTML;
  var editor = ace.edit('src');
  editor.getSession().setMode('ace/mode/javascript');
  ifm.addEventListener('load', function() {
    new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].id === 'FirebugUI') {
          var fUI = mutation.addedNodes[0];
          fUI.addEventListener('load', function() {
            var fUIDocument = fUI.contentWindow.document, e;
            e = fUIDocument.createElement('link');
            e.rel = 'stylesheet';
            e.href = '../../../jsrunner/devtools-firebug.css';
            fUIDocument.head.appendChild(e);
            e = fUIDocument.createElement('script');
            e.src = '../../../jsrunner/devtools-firebug.js';
            fUIDocument.head.appendChild(e);
          });
        }
      });
    }).observe(ifm.contentWindow.document.body, {
      childList: true
    });
  });
  exc.addEventListener('click', function(evt) {
    var e = ifm.contentWindow.document.createElement('script');
    e.text = 'try { ' + editor.getValue() + ' } catch (e) { console.error(e); }';
    ifm.contentWindow.document.body.appendChild(e);
  });
  rst.addEventListener('click', function(evt) {
    editor.setValue(src);
    ifm.contentWindow.location.reload();
  });
})();
