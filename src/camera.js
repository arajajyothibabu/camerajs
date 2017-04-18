/**
 * Created by jyothi on 18/4/17.
 */
var Camera = window.Camera || {};

Camera = function (options) {
    this.initialized = false;
    this.defaultOptions = {
        element: null,

    }
};

Camera.prototype.init = function (element) {
    var _this = this;
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(function(stream) {
        var video = document.querySelector('video');
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
            video.play();
            _this.initialized = true;
        };
    }).catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
};