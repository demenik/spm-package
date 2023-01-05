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

/***/ "./src/helpers/Package.ts":
/*!********************************!*\
  !*** ./src/helpers/Package.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Console_1 = __webpack_require__(/*! ../utils/Console */ \"./src/utils/Console.ts\");\nconst Request_1 = __webpack_require__(/*! ./Request */ \"./src/helpers/Request.ts\");\nclass Package {\n    constructor(author, name, version) {\n        this.packageId = `${author}>${name}>${version}`;\n        this.author = author;\n        this.name = name;\n        this.version = version;\n    }\n    async fetchPackageInfo() {\n        const url = `https://raw.githubusercontent.com/demenik/spm/main/packages/${this.author}/${this.name}/spm.json`;\n        const data = await new Request_1.default(url).loadJSON();\n        const version = data.versions[this.version];\n        if (!version) {\n            throw new Error(\"Version not found\");\n        }\n        this.url = `https://raw.githubusercontent.com/demenik/spm/main/packages/${this.author}/${this.name}/${version.file}`;\n        this.description = data.description;\n    }\n    async fetchFileData(force = false) {\n        if (this.fileData && !force) {\n            return this.fileData;\n        }\n        if (!this.url) {\n            await this.fetchPackageInfo();\n        }\n        this.fileData = await new Request_1.default(this.url).loadString();\n        return this.fileData;\n    }\n    async installFile() {\n        const fm = FileManager.iCloud();\n        const spmPath = fm.joinPath(fm.documentsDirectory(), \"spm\");\n        const path = fm.joinPath(spmPath, `${this.packageId}.js`);\n        if (!fm.fileExists(spmPath)) {\n            fm.createDirectory(spmPath);\n        }\n        // Check if file exists\n        if (fm.fileExists(path)) {\n            return path;\n        }\n        Console_1.default.log(`${this.author}>${this.name}>${this.version} : downloading...`);\n        await this.fetchFileData();\n        fm.writeString(path, this.fileData);\n        Console_1.default.log(`${this.author}>${this.name}>${this.version} : downloaded`);\n        return path;\n    }\n    async import() {\n        const path = await this.installFile();\n        return importModule(path);\n    }\n}\nexports[\"default\"] = Package;\n\n\n//# sourceURL=webpack://Spm/./src/helpers/Package.ts?");

/***/ }),

/***/ "./src/helpers/Request.ts":
/*!********************************!*\
  !*** ./src/helpers/Request.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass _Request {\n    constructor(url, method = \"GET\", headers = {}) {\n        this.request = new Request(url);\n        this.request.method = method;\n        this.request.headers = headers;\n    }\n    checkStatus(req) {\n        const response = req.response;\n        if (response.statusCode >= 400) {\n            throw new Error(`Request failed with status code ${response.statusCode} for ${response.url}`);\n        }\n        else if (response.statusCode >= 300) {\n            throw new Error(`Request redirected with status code ${response.statusCode} for ${response.url}`);\n        }\n        else if (response.statusCode >= 200) {\n            return;\n        }\n        else {\n            throw new Error(`Request failed with unknown status code ${response.statusCode} for ${response.url}`);\n        }\n    }\n    async loadJSON() {\n        const req = this.request;\n        const response = await req.loadJSON();\n        this.checkStatus(req);\n        return response;\n    }\n    async loadString() {\n        const req = this.request;\n        const response = await req.loadString();\n        this.checkStatus(req);\n        return response;\n    }\n}\nexports[\"default\"] = _Request;\n\n\n//# sourceURL=webpack://Spm/./src/helpers/Request.ts?");

/***/ }),

/***/ "./src/spm-wrapper/index.ts":
/*!**********************************!*\
  !*** ./src/spm-wrapper/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Package_1 = __webpack_require__(/*! ../helpers/Package */ \"./src/helpers/Package.ts\");\nasync function wrapper(version) {\n    const _package = new Package_1.default(\"spm-team\", \"spm\", version);\n    return await _package.import();\n}\nexports[\"default\"] = wrapper;\n\n\n//# sourceURL=webpack://Spm/./src/spm-wrapper/index.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/spm-wrapper/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});