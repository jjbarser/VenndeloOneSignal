const utils_web = {};

utils_web.getFromCamera = () => {
    let promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    let canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    let video = document.createElement('video');
    video.width = 200
    video.height = 200
    video.autoplay = true;
    video.id = "video"
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                return stream;
            }).then((dataAvailable) => {
                video.srcObject = dataAvailable;
                setTimeout(() => {
                    canvas.getContext('2d').drawImage(video, 0, 0, 200, 200);
                    resolve(canvas.toDataURL())
                    stopCamera(dataAvailable);
                }, 100)
            })
            .catch((error) => {
                reject(new Error("Algo falló en la captura " + error));
            });
    }
    else {
        reject(new Error('No fue posible obtener imagen desde la cámara'))
    }
    return promise;
}

utils_web.getFromGallery = () => {
    const type = 'image/png, .jpeg, .jpg, image/gif, .mp4'
    return new Promise((resolve, reject) => {
        input = document.createElement('input');
        input.type = 'file';
        input.accept = type;
        input.onchange = e => {
            let file = e.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = readerEvent => {
                    let content = readerEvent.target.result;
                    resolve(content)
                    console.log(content);
                }
            } else {
                reject(new Error('No fue posible acceder a los archivos de imágenes'));
            }
        }
        input.click();
    });
}

function stopCamera(stream) {
    stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}
