(function() {
    var pan = document.getElementById('fbPanel1');
    var fbc = document.getElementById('fbConsole');
    var fcb = document.getElementById('fbConsoleButtons');
    var fcr = document.createElement('a');
    fcr.id = 'fbConsole_btReset';
    fcr.className = 'fbButton fbHover';
    fcr.title = 'Reset the console';
    fcr.appendChild(document.createTextNode('Reset'));
    fcr.addEventListener('click', function(evt) {
        window.parent.location.reload();
    });
    fcb.appendChild(fcr);
    new MutationObserver(function() {
        pan.scrollTop = fbc.offsetHeight;
    }).observe(fbc, {
        childList: true
    });
})();
