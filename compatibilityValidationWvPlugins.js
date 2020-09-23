if (typeof window.wvPlugins === 'undefined') {
    window.wvPlugins = {}
}

window.wvPlugins = Object.assign(window.wvPlugins, {

    getPlatform: () => {
        if (window.hasOwnProperty("cordova")) {
            alert('Ingresando desde Cordova')
            return './cordova/index.html';
        }
        if (navigator.userAgent.includes('wv') || navigator.platform.substr(0, 2) === 'iP') {
            return './react/index.html';
        }
        else {
            alert('Ingresando desde Web')
            return './web/test.html';
        }
    },
});

const a = document.createElement('a');
a.href = wvPlugins.getPlatform();
a.click();

