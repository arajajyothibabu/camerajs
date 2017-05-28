(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Camera"] = factory();
	else
		root["Camera"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by jyothi on 18/4/17.
 */

var Camera = function Camera(options) {
    _classCallCheck(this, Camera);

    _initialiseProps.call(this);

    this.streaming = false;

    this.defaultOptions = {
        video: null,
        canvas: null,
        photo: null,
        playButton: null,
        width: 360,
        height: 0
    };

    this.requiredFields = ["video", "photo", "playButton"];

    this.options = {};

    this.start(options);
}

/**
 * options from user
 * @param options {Object}
 */


/**
 * creates defualts for camera
 */


/**
 * bootstrapping camera from browser
 */


/**
 * takes snapshot from stream
 */


/**
 * clears existing image from photo
 */
;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.start = function (options) {

        _this.checkOptions(options);

        _this.createDefaults(); //creating defaults

        _this.init(); //initializing UserMedia
    };

    this.checkOptions = function (options) {

        _this.options = _extends({}, _this.defaultOptions, options);

        var _options = _this.options,
            root = _options.root,
            restOptions = _objectWithoutProperties(_options, ["root"]);

        for (var option in restOptions) {
            if (restOptions.hasOwnProperty(option)) {
                if (!restOptions[option] && _this.requiredFields.includes(option)) {
                    console.error("Error in initializing., " + option + " not defined..!");
                    return;
                } else {
                    console.info("Options --> ", option);
                }
            }
        }
    };

    this.createDefaults = function () {
        var canvas = document.createElement("canvas"); //this is required default
        canvas.setAttribute("style", "display:none"); //hiding canvas by default
        document.body.appendChild(canvas);
        _this.options.canvas = canvas;
    };

    this.init = function () {
        var _options2 = _this.options,
            video = _options2.video,
            photo = _options2.photo,
            playButton = _options2.playButton,
            width = _options2.width,
            canvas = _options2.canvas;


        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                var getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }

        navigator.mediaDevices.getUserMedia({
            audio: true, //optional
            video: true
        }).then(function (stream) {
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
                _this.initialized = true;
            };
        }).catch(function (err) {
            console.log(err.name + ": " + err.message);
        });

        video.addEventListener('canplay', function (e) {
            if (!_this.streaming) {

                var height = video.videoHeight / (video.videoWidth / width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                _this.options.height = height;

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                _this.streaming = true;
            }
        }, false);

        playButton.addEventListener('click', function (e) {
            _this.takeSnapShot();
            e.preventDefault();
        }, false);

        _this.clearImage();
    };

    this.takeSnapShot = function () {
        var _options3 = _this.options,
            video = _options3.video,
            photo = _options3.photo,
            playButton = _options3.playButton,
            width = _options3.width,
            canvas = _options3.canvas,
            height = _options3.height;


        var context = canvas.getContext('2d');

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var imageData = canvas.toDataURL('image/png');
            photo.setAttribute('src', imageData);
        } else {
            _this.clearImage();
        }
    };

    this.clearImage = function () {
        var _options4 = _this.options,
            video = _options4.video,
            photo = _options4.photo,
            playButton = _options4.playButton,
            width = _options4.width,
            canvas = _options4.canvas;


        var context = canvas.getContext('2d');
        context.fillStyle = "#800080";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var imageData = canvas.toDataURL('image/png');
        photo.setAttribute('src', imageData);
    };
};

exports.default = Camera;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by jyothi on 28/5/17.
 */
module.exports = __webpack_require__(0).default;

/***/ })
/******/ ]);
});