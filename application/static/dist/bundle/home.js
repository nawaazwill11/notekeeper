/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/src/home-package.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/src/base-package.js":
/*!************************************!*\
  !*** ./static/src/base-package.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/base.scss */ \"./static/src/css/base.scss\");\n/* harmony import */ var _js_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/base */ \"./static/src/js/base.js\");\n/* harmony import */ var _js_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_base__WEBPACK_IMPORTED_MODULE_1__);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdGF0aWMvc3JjL2Jhc2UtcGFja2FnZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3N0YXRpYy9zcmMvYmFzZS1wYWNrYWdlLmpzPzdjOTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2Nzcy9iYXNlLnNjc3MnO1xuXG5pbXBvcnQgJy4vanMvYmFzZSc7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./static/src/base-package.js\n");

/***/ }),

/***/ "./static/src/css/base.scss":
/*!**********************************!*\
  !*** ./static/src/css/base.scss ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"1441a7909c087dbbe7ce59881b9df8b9.scss\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdGF0aWMvc3JjL2Nzcy9iYXNlLnNjc3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2Nzcy9iYXNlLnNjc3M/OTc2NCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMTQ0MWE3OTA5YzA4N2RiYmU3Y2U1OTg4MWI5ZGY4Yjkuc2Nzc1wiOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./static/src/css/base.scss\n");

/***/ }),

/***/ "./static/src/home-package.js":
/*!************************************!*\
  !*** ./static/src/home-package.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_package__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-package */ \"./static/src/base-package.js\");\n/* harmony import */ var _js_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/home */ \"./static/src/js/home.js\");\n/* harmony import */ var _js_home__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_home__WEBPACK_IMPORTED_MODULE_1__);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdGF0aWMvc3JjL2hvbWUtcGFja2FnZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3N0YXRpYy9zcmMvaG9tZS1wYWNrYWdlLmpzPzNhMjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2Jhc2UtcGFja2FnZSc7XG5cbmltcG9ydCAnLi9qcy9ob21lJzsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./static/src/home-package.js\n");

/***/ }),

/***/ "./static/src/js/base.js":
/*!*******************************!*\
  !*** ./static/src/js/base.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdGF0aWMvc3JjL2pzL2Jhc2UuanMuanMiLCJzb3VyY2VzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./static/src/js/base.js\n");

/***/ }),

/***/ "./static/src/js/home.js":
/*!*******************************!*\
  !*** ./static/src/js/home.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** \n * Service Worker\n */\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', function () {\n    navigator.serviceWorker.register('sw.js').then(function (registration) {\n      console.log('Service Worker is registered', registration);\n    })[\"catch\"](function (err) {\n      console.error('Registration failed:', err);\n    });\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdGF0aWMvc3JjL2pzL2hvbWUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2pzL2hvbWUuanM/ZDE2ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogXG4gKiBTZXJ2aWNlIFdvcmtlclxuICovXG5cbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc3cuanMnKVxuICAgICAgLnRoZW4ocmVnaXN0cmF0aW9uID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIGlzIHJlZ2lzdGVyZWQnLCByZWdpc3RyYXRpb24pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSZWdpc3RyYXRpb24gZmFpbGVkOicsIGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./static/src/js/home.js\n");

/***/ })

/******/ });