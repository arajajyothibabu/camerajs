/**
 * Created by jyothi on 18/4/17.
 */

const ROOT_ELEMENT_KEY = "root";

export default class Camera {

    constructor(options){

        this.streaming = false;

        this.defaultOptions = {
            root: null,
            video: null,
            canvas: null,
            photo: null,
            playButton: null,
            width: 320,
            height: 0
        };

        this.requiredFields = [ "root", "video", "photo", "playButton" ];

        this.options = {};

        this.default = false;

    }

    checkOptions = (options) => {

        this.options = {...this.defaultOptions, ...options, canvas};
        if(this.options.root){
            console.info("Root Element Defined, neglecting remaining placeholders..!");
            this.createDefaults(true);
        }else{
            const { root, ...restOptions } = this.options;
            for(let option in restOptions){
                if(restOptions.hasOwnProperty(option)){
                    if(!restOptions[option] && this.requiredFields.includes(option)){
                        console.error(`Error in initializing., ${option} not defined..!`);
                        return;
                    }
                }
            }
            this.createDefaults(false);
        }
    };

    createDefaults = (isDefault) => {
        this.default = isDefault;
        let canvas = document.createElement("canvas"); //this is required default
        let { video,  } = this.options;
    };

    init = () => {



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
            audio: true,
            video: true
        }).then(stream => {
            let video = document.querySelector('video');
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

    }

}

(function(window){
    var Camera = window.Camera || {};

    Camera = function (options) {

    };

    Camera.prototype.init = function (element) {

        var _this = this;


    };
})(window);