/**
 * Created by jyothi on 18/4/17.
 */

export default class Camera {

    constructor(options){

        this.streaming = false;

        this.defaultOptions = {
            video: null,
            canvas: null,
            photo: null,
            playButton: null,
            width: 360,
            height: 0
        };

        this.requiredFields = [ "video", "photo", "playButton" ];

        this.options = {};

        this.start(options);

    }

    start = (options) => {

        this.checkOptions(options);

        this.createDefaults(); //creating defaults

        this.init(); //initializing UserMedia

    };

    /**
     * options from user
     * @param options {Object}
     */
    checkOptions = (options) => {

        this.options = {...this.defaultOptions, ...options};
        const { root, ...restOptions } = this.options;
        for(let option in restOptions){
            if(restOptions.hasOwnProperty(option)){
                if(!restOptions[option] && this.requiredFields.includes(option)){
                    console.error(`Error in initializing., ${option} not defined..!`);
                    return;
                }else{
                    console.info("Options --> ", option);
                }
            }
        }

    };

    /**
     * creates defualts for camera
     */
    createDefaults = () => {
        let canvas = document.createElement("canvas"); //this is required default
        canvas.setAttribute("style", "display:none"); //hiding canvas by default
        document.body.appendChild(canvas);
        this.options.canvas = canvas;
    };

    /**
     * bootstrapping camera from browser
     */
    init = () => {

        const { video, photo, playButton, width, canvas } = this.options;

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = (constraints) => {
                let getUserMedia = (
                    navigator.getUserMedia ||
                    navigator.msGetUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia
                );
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        navigator.mediaDevices.getUserMedia({
            audio: true, //optional
            video: true
        }).then(stream => {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = (e) => {
                video.play();
                this.initialized = true;
            };
        }).catch(err => {
            console.log(err.name + ": " + err.message);
        });

        video.addEventListener('canplay', (e) => {
            if (!this.streaming) {

                let height = video.videoHeight / (video.videoWidth/width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4/3);
                }

                this.options.height = height;

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                this.streaming = true;
            }
        }, false);

        playButton.addEventListener('click', (e) => {
            this.takeSnapShot();
            e.preventDefault();
        }, false);

        this.clearImage();

    };

    /**
     * takes snapshot from stream
     */
    takeSnapShot = () => {

        const { video, photo, playButton, width, canvas, height } = this.options;

        let context = canvas.getContext('2d');

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            let imageData = canvas.toDataURL('image/png');
            photo.setAttribute('src', imageData);
        } else {
            this.clearImage();
        }
    };

    /**
     * clears existing image from photo
     */
    clearImage = () => {

        const { video, photo, playButton, width, canvas } = this.options;

        let context = canvas.getContext('2d');
        context.fillStyle = "#800080";
        context.fillRect(0, 0, canvas.width, canvas.height);

        let imageData = canvas.toDataURL('image/png');
        photo.setAttribute('src', imageData);

    };


}