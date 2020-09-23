
const wvPlugins = {};
wvPlugins.getPicture =(options) => {
    if(options.source === 'camera'){
        utils_web.getFromCamera().then((data) => console.log(data)).catch((error) => console.log(error));
    } else if(options.source === 'gallery'){
        utils_web.getFromGallery().then((data) => console.log(data)).catch((error) => console.log(error));
    } else {
        return;
    }
}

wvPlugins.getCurrentPosition = () => {
    if (navigator.geolocation) {
        return new Promise(
            (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
        )
    } else {
        return new Promise(
            resolve => resolve({})
        )
    }
}