(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactCountdownClock"] = factory(require("react"));
	else
		root["ReactCountdownClock"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React;
	
	React = __webpack_require__(1);
	
	module.exports = React.createClass({
	  _seconds: 0,
	  _radius: null,
	  _fraction: null,
	  _content: null,
	  _canvas: null,
	  _timeoutIds: [],
	  displayName: 'ReactCountdownClock',
	  propTypes: {
	    seconds: React.PropTypes.number,
	    size: React.PropTypes.number,
	    weight: React.PropTypes.number,
	    color: React.PropTypes.string,
	    fontSize: React.PropTypes.string,
	    font: React.PropTypes.string,
	    alpha: React.PropTypes.number,
	    timeFormat: React.PropTypes.string,
	    onComplete: React.PropTypes.func,
	    showMilliseconds: React.PropTypes.bool
	  },
	  getDefaultProps: function() {
	    return {
	      seconds: 60,
	      size: 300,
	      color: '#000',
	      alpha: 1,
	      timeFormat: 'hms',
	      fontSize: 'auto',
	      font: 'Arial',
	      showMilliseconds: true
	    };
	  },
	  componentWillReceiveProps: function(props) {
	    this._seconds = props.seconds;
	    return this._setupTimer();
	  },
	  componentDidMount: function() {
	    this._seconds = this.props.seconds;
	    return this._setupTimer();
	  },
	  componentWillUnmount: function() {
	    return this._cancelTimer();
	  },
	  _setupTimer: function() {
	    this._cancelTimer();
	    this._setScale();
	    this._setupCanvas();
	    this._drawTimer();
	    return this._startTimer();
	  },
	  _updateCanvas: function() {
	    this._clearTimer();
	    return this._drawTimer();
	  },
	  _setScale: function() {
	    this._radius = this.props.size / 2;
	    this._fraction = 2 / this._seconds;
	    this._tickPeriod = this._calculateTick();
	    return this._innerRadius = this.props.weight ? this._radius - this.props.weight : this._radius / 1.8;
	  },
	  _calculateTick: function() {
	    var tick, tickScale;
	    tickScale = 1.8;
	    tick = this._seconds * tickScale;
	    if (tick > 1000) {
	      return 1000;
	    } else {
	      return tick;
	    }
	  },
	  _setupCanvas: function() {
	    this._canvas = this.refs.canvas;
	    this._context = this._canvas.getContext('2d');
	    this._context.textAlign = 'center';
	    return this._context.textBaseline = 'middle';
	  },
	  _startTimer: function() {
	    return this._timeoutIds.push(setTimeout(((function(_this) {
	      return function() {
	        return _this._tick();
	      };
	    })(this)), 200));
	  },
	  _cancelTimer: function() {
	    var i, len, ref, results, timeout;
	    ref = this._timeoutIds;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      timeout = ref[i];
	      results.push(clearTimeout(timeout));
	    }
	    return results;
	  },
	  _tick: function() {
	    var start;
	    start = Date.now();
	    return this._timeoutIds.push(setTimeout(((function(_this) {
	      return function() {
	        var duration;
	        duration = (Date.now() - start) / 1000;
	        _this._seconds -= duration;
	        if (_this._seconds <= 0) {
	          _this._seconds = 0;
	          _this._handleComplete();
	          return _this._clearTimer();
	        } else {
	          _this._updateCanvas();
	          return _this._tick();
	        }
	      };
	    })(this)), this._tickPeriod));
	  },
	  _handleComplete: function() {
	    if (this.props.onComplete) {
	      return this.props.onComplete();
	    }
	  },
	  _clearTimer: function() {
	    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	    return this._drawBackground();
	  },
	  _drawBackground: function() {
	    this._context.beginPath();
	    this._context.globalAlpha = this.props.alpha / 3;
	    this._context.arc(this._radius, this._radius, this._radius, 0, Math.PI * 2, false);
	    this._context.arc(this._radius, this._radius, this._innerRadius, Math.PI * 2, 0, true);
	    return this._context.fill();
	  },
	  _formattedTime: function() {
	    var decimals, hours, minutes, ref, seconds, timeParts;
	    decimals = (ref = this._seconds <= 9.9 && this.props.showMilliseconds) != null ? ref : {
	      1: 0
	    };
	    if (this.props.timeFormat === 'hms') {
	      hours = parseInt(this._seconds / 3600) % 24;
	      minutes = parseInt(this._seconds / 60) % 60;
	      seconds = (this._seconds % 60).toFixed(decimals);
	      if (hours < 10) {
	        hours = "0" + hours;
	      }
	      if (minutes < 10) {
	        minutes = "0" + minutes;
	      }
	      if (seconds < 10 && minutes >= 1) {
	        seconds = "0" + seconds;
	      }
	      timeParts = [];
	      if (hours > 0) {
	        timeParts.push(hours);
	      }
	      if (minutes > 0) {
	        timeParts.push(minutes);
	      }
	      timeParts.push(seconds);
	      return timeParts.join(':');
	    } else {
	      return this._seconds.toFixed(decimals);
	    }
	  },
	  _fontSize: function(timeString) {
	    var scale, size;
	    if (this.props.fontSize === 'auto') {
	      scale = (function() {
	        switch (timeString.length) {
	          case 8:
	            return 4;
	          case 5:
	            return 3;
	          default:
	            return 2;
	        }
	      })();
	      size = this._radius / scale;
	      return size + "px";
	    } else {
	      return this.props.fontSize;
	    }
	  },
	  _drawTimer: function() {
	    var formattedTime, percent;
	    percent = this._fraction * this._seconds + 1.5;
	    formattedTime = this._formattedTime();
	    this._context.globalAlpha = this.props.alpha;
	    this._context.fillStyle = this.props.color;
	    this._context.font = "bold " + (this._fontSize(formattedTime)) + " " + this.props.font;
	    this._context.fillText(formattedTime, this._radius, this._radius);
	    this._context.beginPath();
	    this._context.arc(this._radius, this._radius, this._radius, Math.PI * 1.5, Math.PI * percent, false);
	    this._context.arc(this._radius, this._radius, this._innerRadius, Math.PI * percent, Math.PI * 1.5, true);
	    return this._context.fill();
	  },
	  render: function() {
	    return React.createElement("canvas", {
	      "ref": 'canvas',
	      "className": "react-countdown-clock",
	      "width": this.props.size,
	      "height": this.props.size
	    });
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-countdown-clock.js.map