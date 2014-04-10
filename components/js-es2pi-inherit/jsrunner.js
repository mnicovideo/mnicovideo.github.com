(function(global) {
    var i;
    var jsr = document.getElementsByClassName('jsrunner');
    var exc = document.getElementsByClassName('exc');
    var clr = document.getElementsByClassName('clr');
    var ifm = document.getElementsByClassName('ifm');
    var src = document.getElementsByClassName('src');
    var editor = [];
    for (i = 0; i < jsr.length; i++) {
        var s = src[i].innerHTML;
        editor[i] = ace.edit(src[i]);
        editor[i].getSession().setMode('ace/mode/javascript');
        (function(ii, ss) {
            editor[ii].commands.addCommand({
                name: 'myCommand',
                bindKey: {
                    win: 'Ctrl-E',
                    mac: 'Command-E'
                },
                exec: function(editor) {
                    exc[ii].click();
                },
                readOnly: false // false if this command should not apply in readOnly mode
            });
            ifm[ii].addEventListener('load', function() {
                new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].id === 'FirebugUI') {
                            var fUI = mutation.addedNodes[0];
                            fUI.addEventListener('load', function() {
                                var fUIDocument = fUI.contentWindow.document,
                                    fbCommandLine = fUIDocument.getElementById('fbCommandLine'),
                                    e,
                                    targetFocused = function() {
                                        this.blur();
                                        e = fUIDocument.createElement('link');
                                        e.rel = 'stylesheet';
                                        e.href = '../../../js-es2pi-inherit/devtools-firebug.css';
                                        fUIDocument.head.appendChild(e);
                                        e = fUIDocument.createElement('script');
                                        e.src = '../../../js-es2pi-inherit/devtools-firebug.js';
                                        fUIDocument.head.appendChild(e);
                                        fbCommandLine.removeEventListener('focus', targetFocused);
                                    };
                                fbCommandLine.addEventListener('focus', targetFocused);
                            });
                        }
                    });
                }).observe(ifm[ii].contentWindow.document.body, {
                    childList: true
                });
            });
            exc[ii].addEventListener('click', function(evt) {
                var e = ifm[ii].contentWindow.document.createElement('script');
                e.text = 'try {\n' + editor[ii].getValue() + '\n} catch (e) { console.error(e); }';
                ifm[ii].contentWindow.document.body.appendChild(e);
            });
            clr[ii].addEventListener('click', function(evt) {
                if (window.confirm('Are you sure?')) editor[ii].setValue(ss);
            });
        })(i, s);
    }
})(this);
