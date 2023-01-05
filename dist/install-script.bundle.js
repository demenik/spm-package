// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: download;
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Spm"] = factory();
	else
		root["Spm"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers/Request.ts":
/*!********************************!*\
  !*** ./src/helpers/Request.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass _Request {\n    constructor(url, method = \"GET\", headers = {}) {\n        this.request = new Request(url);\n        this.request.method = method;\n        this.request.headers = headers;\n    }\n    checkStatus(req) {\n        const response = req.response;\n        if (response.statusCode >= 400) {\n            throw new Error(`Request failed with status code ${response.statusCode} for ${response.url}`);\n        }\n        else if (response.statusCode >= 300) {\n            throw new Error(`Request redirected with status code ${response.statusCode} for ${response.url}`);\n        }\n        else if (response.statusCode >= 200) {\n            return;\n        }\n        else {\n            throw new Error(`Request failed with unknown status code ${response.statusCode} for ${response.url}`);\n        }\n    }\n    async loadJSON() {\n        const req = this.request;\n        const response = await req.loadJSON();\n        this.checkStatus(req);\n        return response;\n    }\n    async loadString() {\n        const req = this.request;\n        const response = await req.loadString();\n        this.checkStatus(req);\n        return response;\n    }\n}\nexports[\"default\"] = _Request;\n\n\n//# sourceURL=webpack://Spm/./src/helpers/Request.ts?");

/***/ }),

/***/ "./src/install-script/index.ts":
/*!*************************************!*\
  !*** ./src/install-script/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Request_1 = __webpack_require__(/*! ../helpers/Request */ \"./src/helpers/Request.ts\");\nconst Console_1 = __webpack_require__(/*! ../utils/Console */ \"./src/utils/Console.ts\");\nasync function installWrapper() {\n    const url = `https://raw.githubusercontent.com/demenik/spm-package/main/dist/spm-wrapper.bundle.js`;\n    const fileData = await new Request_1.default(url).loadString();\n    const fm = FileManager.iCloud();\n    const spmPath = fm.joinPath(fm.documentsDirectory(), \"spm\");\n    const path = fm.joinPath(spmPath, \"spm-wrapper.js\");\n    if (!fm.fileExists(spmPath)) {\n        fm.createDirectory(spmPath);\n    }\n    fm.writeString(path, fileData);\n}\nfunction deleteSelf() {\n    const fm = FileManager.iCloud();\n    const path = fm.joinPath(fm.documentsDirectory(), \"install-spm.js\");\n    try {\n        fm.remove(path);\n    }\n    catch (_a) {\n        return;\n    }\n}\nasync function installScript(version) {\n    Console_1.default.warn(\"spm not found, installing...\");\n    await installWrapper();\n    Console_1.default.log(\"spm installed\");\n    deleteSelf();\n    return await importModule(\"spm/spm-wrapper\")(version);\n}\nexports[\"default\"] = installScript;\n\n\n//# sourceURL=webpack://Spm/./src/install-script/index.ts?");

/***/ }),

/***/ "./src/utils/Console.ts":
/*!******************************!*\
  !*** ./src/utils/Console.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = {\n    log(m) {\n        console.log(`[spm] ${m}`);\n    },\n    warn(m) {\n        console.warn(`[spm] ${m}`);\n    },\n    error(m) {\n        console.error(`[spm] ${m}`);\n    },\n};\n\n\n//# sourceURL=webpack://Spm/./src/utils/Console.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/install-script/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});