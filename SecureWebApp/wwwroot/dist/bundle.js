(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bundle"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"ol {\\n  list-style-type: none;\\n  counter-reset: item;\\n  margin: 0;\\n  padding: 0; }\\n\\nol > li {\\n  display: table;\\n  counter-increment: item;\\n  margin-bottom: 0.6em; }\\n\\nol > li:before {\\n  content: counters(item, \\\".\\\") \\\". \\\";\\n  display: table-cell;\\n  padding-right: 0.6em; }\\n\\nli ol > li {\\n  margin: 0; }\\n\\nli ol > li:before {\\n  content: counters(item, \\\".\\\") \\\" \\\"; }\\n\\nnav.navbar {\\n  height: 6rem !important;\\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./styles/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./scripts/functions/common.js":
/*!*************************************!*\
  !*** ./scripts/functions/common.js ***!
  \*************************************/
/*! exports provided: ValidatePasswordField, PerformAjaxCall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ValidatePasswordField\", function() { return ValidatePasswordField; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PerformAjaxCall\", function() { return PerformAjaxCall; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./scripts/functions/helpers.js\");\n﻿// This module should not manipulate DOM\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction ValidatePasswordField(AValue)\r\n{\r\n\r\n    let LCheck = 0;\r\n\r\n    if (AValue.length < 8)                { LCheck++; };\r\n    if (_helpers__WEBPACK_IMPORTED_MODULE_0__[\"IsEmpty\"](AValue))         { LCheck++; };\r\n    if (!_helpers__WEBPACK_IMPORTED_MODULE_0__[\"HasLowerCase\"](AValue))   { LCheck++; };\r\n    if (!_helpers__WEBPACK_IMPORTED_MODULE_0__[\"HasUpperCase\"](AValue))   { LCheck++; };\r\n    if (!_helpers__WEBPACK_IMPORTED_MODULE_0__[\"HasSpecialChar\"](AValue)) { LCheck++; };\r\n\r\n    if (LCheck != 0)\r\n    {\r\n        return false;\r\n    }\r\n    else\r\n    {\r\n        return true;\r\n    }\r\n\r\n};\r\n\r\n\r\nfunction PerformAjaxCall(AMethod, AUrl, ACustomToken, AContentType, APayLoad, ACallback)\r\n{\r\n\r\n    let LRequest = new XMLHttpRequest();\r\n\r\n    LRequest.open(AMethod, AUrl, true);\r\n    LRequest.setRequestHeader(\"Content-Type\", AContentType);\r\n    LRequest.setRequestHeader(\"X-CSRF-TOKEN\", ACustomToken);\r\n\r\n    LRequest.onload = function ()\r\n    {\r\n\r\n        if (this.status >= 200 && this.status < 400)\r\n        {\r\n            ACallback(this.response, this.status);\r\n        }\r\n        else\r\n        {\r\n            ACallback(null, this.status);\r\n        }\r\n\r\n    };\r\n\r\n    LRequest.onerror = function ()\r\n    {\r\n        ACallback(null, this.status);\r\n    };\r\n\r\n    let LMethod = AMethod.toUpperCase();\r\n\r\n    if (LMethod === \"GET\" || LMethod === \"DELETE\")\r\n    {\r\n        LRequest.send();\r\n    }\r\n\r\n    if (LMethod === \"PUT\" || LMethod === \"POST\" || LMethod === \"PATCH\")\r\n    {\r\n        LRequest.send(APayLoad);\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/functions/common.js?");

/***/ }),

/***/ "./scripts/functions/helpers.js":
/*!**************************************!*\
  !*** ./scripts/functions/helpers.js ***!
  \**************************************/
/*! exports provided: FormatPhoneNumber, HasSpecialChar, HasLowerCase, HasUpperCase, IsNumeric, IsEmpty, ValidateEmail, CleanBaseUrl, ClearSelectElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FormatPhoneNumber\", function() { return FormatPhoneNumber; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HasSpecialChar\", function() { return HasSpecialChar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HasLowerCase\", function() { return HasLowerCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HasUpperCase\", function() { return HasUpperCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IsNumeric\", function() { return IsNumeric; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IsEmpty\", function() { return IsEmpty; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ValidateEmail\", function() { return ValidateEmail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CleanBaseUrl\", function() { return CleanBaseUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ClearSelectElement\", function() { return ClearSelectElement; });\n﻿// This module should not manipulate DOM\r\n\r\n\r\n\r\n\r\nfunction IsEmpty(AValue)\r\n{\r\n    return typeof AValue === 'string' && !AValue.trim() || typeof AValue === undefined || AValue === null;\r\n};\r\n\r\n\r\nfunction IsNumeric(AValue)\r\n{\r\n    return !isNaN(parseFloat(AValue)) && isFinite(AValue);\r\n};\r\n\r\n\r\nfunction ValidateEmail(AEmail)\r\n{\r\n    let LRegex = /\\S+@\\S+\\.\\S+/;\r\n    return LRegex.test(AEmail);\r\n};\r\n\r\n\r\nfunction FormatPhoneNumber(ANumber)\r\n{\r\n    ANumber = ANumber.replace(/[^\\d]+/g, '').replace(/(\\d{2})(\\d{3})(\\d{3})(\\d{3})/, '($1) $2 $3 $4');\r\n\r\n    if (isEmpty(ANumber))\r\n    {\r\n        return false;\r\n    }\r\n    else\r\n    {\r\n        return ANumber;\r\n    };\r\n\r\n};\r\n\r\n\r\nfunction HasLowerCase(AText)\r\n{\r\n    if (AText.toUpperCase() != AText)\r\n    {\r\n        return true;\r\n    }\r\n\r\n    return false;\r\n}\r\n\r\n\r\nfunction HasUpperCase(AText)\r\n{\r\n    if (AText.toLowerCase() != AText)\r\n    {\r\n        return true;\r\n    }\r\n\r\n    return false;\r\n}\r\n\r\n\r\nfunction HasSpecialChar(AText)\r\n{\r\n    let LFormat = /[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]/;\r\n\r\n    if (LFormat.test(AText))\r\n    {\r\n        return true;\r\n    }\r\n    else\r\n    {\r\n        return false;\r\n    }\r\n\r\n}\r\n\r\nfunction CleanBaseUrl()\r\n{\r\n\r\n    let LCurrentUrl = window.location.href;\r\n    let LCheck = 0;\r\n    let LBaseUrl = \"\";\r\n\r\n    for (let Index = 0; Index <= LCurrentUrl.length; Index++)\r\n    {\r\n        LBaseUrl = LCurrentUrl.charAt(Index);\r\n        if (LBaseUrl.charAt(Index) === \"/\")\r\n        {\r\n            LCheck++;\r\n            if (LCheck === 2)\r\n            {\r\n                break;\r\n            };\r\n        };\r\n    }\r\n\r\n    return LBaseUrl;\r\n\r\n}\r\n\r\n\r\nfunction ClearSelectElement(ASelectElement)\r\n{\r\n    let Index, Length = ASelectElement.options.length - 1;\r\n\r\n    for (Index = Length; Index >= 0; Index--)\r\n    {\r\n        ASelectElement.remove(Index);\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./scripts/functions/helpers.js?");

/***/ }),

/***/ "./scripts/startup.js":
/*!****************************!*\
  !*** ./scripts/startup.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/login */ \"./scripts/views/login.js\");\n/* harmony import */ var _views_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/register */ \"./scripts/views/register.js\");\n// Startup module to cache DOM and bind events\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () =>\r\n{\r\n\r\n    const LoginPage    = document.getElementById(\"LoginForm\");\r\n    const RegisterPage = document.getElementById(\"RegisterForm\");\r\n\r\n    if (LoginPage)    { const LoginView    = new _views_login__WEBPACK_IMPORTED_MODULE_0__[\"LoginClass\"](LoginPage); }\r\n    if (RegisterPage) { const RegisterView = new _views_register__WEBPACK_IMPORTED_MODULE_1__[\"RegisterClass\"](RegisterPage); }\r\n\r\n});\r\n\n\n//# sourceURL=webpack:///./scripts/startup.js?");

/***/ }),

/***/ "./scripts/views/login.js":
/*!********************************!*\
  !*** ./scripts/views/login.js ***!
  \********************************/
/*! exports provided: LoginClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoginClass\", function() { return LoginClass; });\n﻿// View module to manipulate DOM\r\n\r\n\r\n\r\n\r\nclass LoginClass\r\n{\r\n\r\n    constructor(Container)\r\n    {\r\n\r\n        this.Container = Container;\r\n\r\n    } \r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./scripts/views/login.js?");

/***/ }),

/***/ "./scripts/views/register.js":
/*!***********************************!*\
  !*** ./scripts/views/register.js ***!
  \***********************************/
/*! exports provided: RegisterClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RegisterClass\", function() { return RegisterClass; });\n/* harmony import */ var _functions_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/helpers */ \"./scripts/functions/helpers.js\");\n/* harmony import */ var _functions_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/common */ \"./scripts/functions/common.js\");\n﻿// View module to manipulate DOM\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass RegisterClass\r\n{\r\n\r\n    constructor(Container)\r\n    {\r\n\r\n        this.Container = Container;\r\n\r\n        this.BindDom();\r\n        this.AddEvents();\r\n        this.InitErrorCheck();\r\n\r\n        this.CountryListSelect.selectedIndex = 0;\r\n        this.CityListSelect.disabled = true;\r\n\r\n    }\r\n\r\n    BindDom()\r\n    {\r\n        this.FirstNameInput      = this.Container.querySelector(\"#Input_FirstName\");\r\n        this.LastNameInput       = this.Container.querySelector(\"#Input_LastName\");\r\n        this.NicknameInput       = this.Container.querySelector(\"#Input_Nickname\");\r\n        this.EmailAddressInput   = this.Container.querySelector(\"#Input_EmailAddress\");\r\n        this.PasswordInput       = this.Container.querySelector(\"#Input_Password\");\r\n        this.CountryListSelect   = this.Container.querySelector(\"#Select_CountryList\");\r\n        this.CityListSelect      = this.Container.querySelector(\"#Select_CityList\");\r\n        this.CreateAccountButton = this.Container.querySelector(\"#Button_CreateAccount\");\r\n        this.ModalWindowHandle   = this.Container.querySelector(\"#Handle_RegisterModal\");\r\n        this.TermsLink           = this.Container.querySelector(\"#Link_Terms\");\r\n        this.PrivacyLink         = this.Container.querySelector(\"#Link_Privacy\");\r\n    }\r\n\r\n    AddEvents()\r\n    {\r\n        this.FirstNameInput.addEventListener(\"change\", (Event) => { this.Input_FirstName(Event); });\r\n        this.LastNameInput.addEventListener(\"change\", (Event) => { this.Input_LastName(Event); });\r\n        this.NicknameInput.addEventListener(\"change\", (Event) => { this.Input_Nickname(Event); });\r\n        this.PasswordInput.addEventListener(\"change\", (Event) => { this.Input_Password(Event) });\r\n        this.CountryListSelect.addEventListener(\"change\", (Event) => { this.Select_CountryList(Event); });\r\n        this.CityListSelect.addEventListener(\"change\", (Event) => { this.Select_CityList(Event); });\r\n        this.CreateAccountButton.addEventListener(\"click\", (Event) => { this.Button_CreateAccount(Event); });\r\n        this.EmailAddressInput.onkeyup = () => { this.Input_EmailAddress(); };\r\n        this.TermsLink.addEventListener(\"click\", (Event) => { this.Link_Terms(Event) });\r\n        this.PrivacyLink.addEventListener(\"click\", (Event) => { this.Link_Privacy(Event) });\r\n    }\r\n\r\n    InitErrorCheck()\r\n    {\r\n        this.IsValidFirstName    = false;\r\n        this.IsValidLastName     = false;\r\n        this.IsValidNickname     = false;\r\n        this.IsValidEmailAddress = false;\r\n        this.IsValidPassword     = false;\r\n        this.IsValidCountryList  = false;\r\n        this.IsValidCityList     = false;\r\n    }\r\n\r\n    IsDataValid()\r\n    {\r\n\r\n        if (!this.IsValidFirstName || !this.IsValidLastName\r\n            || !this.IsValidNickname || !this.IsValidEmailAddress\r\n            || !this.IsValidPassword || !this.IsValidCountryList\r\n            || !this.IsValidCityList)\r\n        {\r\n            return false;\r\n        }\r\n        else\r\n        {\r\n            return true;\r\n        }\r\n\r\n    }\r\n\r\n    Input_FirstName(Event)\r\n    {\r\n\r\n        let Verified  = this.Container.querySelector(\"#OK_FirstName\");\r\n        let Malformed = this.Container.querySelector(\"#ERR_FirstName\");\r\n        let Info      = this.Container.querySelector(\"#Info_FirstName\");\r\n\r\n        if (_functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"IsEmpty\"](Event.target.value))\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"visible\";\r\n            Info.style.display         = \"inline-block\";\r\n            this.IsValidFirstName      = false;\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"visible\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display         = \"none\";\r\n            this.IsValidFirstName      = true;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Input_LastName(Event)\r\n    {\r\n\r\n        let Verified  = this.Container.querySelector(\"#OK_LastName\");\r\n        let Malformed = this.Container.querySelector(\"#ERR_LastName\");\r\n        let Info      = this.Container.querySelector(\"#Info_LastName\");\r\n\r\n        if (_functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"IsEmpty\"](Event.target.value))\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"visible\";\r\n            Info.style.display         = \"inline-block\";\r\n            this.IsValidLastName       = false;\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"visible\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display         = \"none\";\r\n            this.IsValidLastName       = true;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Input_Nickname(Event)\r\n    {\r\n\r\n        let Verified  = this.Container.querySelector(\"#OK_Nickname\");\r\n        let Malformed = this.Container.querySelector(\"#ERR_Nickname\");\r\n        let Info      = this.Container.querySelector(\"#Info_Nickname\");\r\n\r\n        if (_functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"IsEmpty\"](Event.target.value))\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"visible\";\r\n            Info.style.display         = \"inline-block\";\r\n            this.IsValidNickname       = false;\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"visible\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display         = \"none\";\r\n            this.IsValidNickname       = true;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Input_EmailAddress()\r\n    {\r\n\r\n        let Handler      = this.Container.querySelector(\"#Handle_EmailAddress\");\r\n        let Verified     = this.Container.querySelector(\"#OK_EmailAddress\");\r\n        let Malformed    = this.Container.querySelector(\"#ERR_EmailAddress\");\r\n        let Info         = this.Container.querySelector(\"#Info_EmailAddress\");\r\n        let EmailAddress = this.EmailAddressInput.value;\r\n        let Url          = encodeURI(window.location.origin + \"/api/v1/ajax/validation/\" + EmailAddress + \"/\");\r\n\r\n        Verified.style.display  = \"visibility\";\r\n        Malformed.style.display = \"visibility\";\r\n        Info.style.display      = \"visibility\";\r\n\r\n        Handler.classList.add(\"is-loading\");\r\n\r\n        if (!_functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"IsEmpty\"](EmailAddress) && _functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"ValidateEmail\"](EmailAddress))\r\n        {\r\n\r\n            _functions_common__WEBPACK_IMPORTED_MODULE_1__[\"PerformAjaxCall\"](\r\n                \"GET\",\r\n                Url,\r\n                this.Container.dataset.xsrf,\r\n                \"application/json; charset=UTF-8\",\r\n                null,\r\n                this.CheckEmailAddress_Callback.bind(this)\r\n            );\r\n\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display = \"inline-block\";\r\n            Info.innerHTML     = \"Valid email address is mandatory.\";\r\n            Handler.classList.remove(\"is-loading\");\r\n            this.IsValidEmailAddress = false;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    CheckEmailAddress_Callback(Response, StatusCode)\r\n    {\r\n\r\n        let Handler   = this.Container.querySelector(\"#Handle_EmailAddress\");\r\n        let Verified  = this.Container.querySelector(\"#OK_EmailAddress\");\r\n        let Malformed = this.Container.querySelector(\"#ERR_EmailAddress\");\r\n        let Info      = this.Container.querySelector(\"#Info_EmailAddress\");\r\n\r\n        Handler.classList.remove(\"is-loading\");\r\n\r\n        if (StatusCode === 200)\r\n        {\r\n\r\n            let ParsedResponse = JSON.parse(Response); \r\n            if (ParsedResponse.IsEmailValid)\r\n            {\r\n                Verified.style.visibility  = \"visible\";\r\n                Malformed.style.visibility = \"hidden\";\r\n                Info.style.display         = \"none\";\r\n                Info.innerHTML             = \"\";\r\n                this.IsValidEmailAddress   = true;\r\n            }\r\n            else\r\n            {\r\n                Verified.style.visibility  = \"hidden\";\r\n                Malformed.style.visibility = \"visible\";\r\n                Info.style.display         = \"inline-block\";\r\n                Info.innerHTML             = ParsedResponse.Error.ErrorDesc;\r\n                this.IsValidEmailAddress   = false;\r\n            }\r\n\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display = \"inline-block\";\r\n            Info.innerHTML     = \"An error has occured during the processing\";\r\n            alert(\"An error has occured during the processing. Returned status code: \" + StatusCode + \".\");\r\n            this.IsValidEmailAddress = false;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Input_Password(Event)\r\n    {\r\n\r\n        let Verified  = this.Container.querySelector(\"#OK_Password\");\r\n        let Malformed = this.Container.querySelector(\"#ERR_Password\");\r\n        let Info      = this.Container.querySelector(\"#Info_Password\");\r\n\r\n        if (!_functions_common__WEBPACK_IMPORTED_MODULE_1__[\"ValidatePasswordField\"](Event.target.value))\r\n        {\r\n            Verified.style.visibility  = \"hidden\";\r\n            Malformed.style.visibility = \"visible\";\r\n            Info.style.display         = \"inline-block\";\r\n            this.IsValidPassword       = false;\r\n        }\r\n        else\r\n        {\r\n            Verified.style.visibility  = \"visible\";\r\n            Malformed.style.visibility = \"hidden\";\r\n            Info.style.display         = \"none\";\r\n            this.IsValidPassword       = true;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Select_CountryList(Event)\r\n    {\r\n\r\n        let Handler    = this.Container.querySelector(\"#Handle_CityList\");\r\n        let SelectedId = Event.target.value;\r\n        let Url        = encodeURI(window.location.origin + \"/api/v1/ajax/cities/\" + SelectedId + \"/\");\r\n\r\n        Handler.classList.add(\"is-loading\");\r\n\r\n        _functions_common__WEBPACK_IMPORTED_MODULE_1__[\"PerformAjaxCall\"](\r\n            \"GET\",\r\n            Url,\r\n            this.Container.dataset.xsrf,\r\n            \"application/json; charset=UTF-8\",\r\n            null,\r\n            this.GetCountryList_Callback.bind(this)\r\n        );\r\n\r\n    }\r\n\r\n\r\n    GetCountryList_Callback(Response, StatusCode)\r\n    {\r\n\r\n        let Handler  = this.Container.querySelector(\"#Handle_CityList\");\r\n\r\n        Handler.classList.remove(\"is-loading\");\r\n\r\n        if (StatusCode == 200)\r\n        {\r\n\r\n            let ParsedResponse = JSON.parse(Response); \r\n            _functions_helpers__WEBPACK_IMPORTED_MODULE_0__[\"ClearSelectElement\"](this.CityListSelect);\r\n\r\n            for (let Index = 0; Index < ParsedResponse.Cities.length; Index++)\r\n            {\r\n\r\n                let City   = ParsedResponse.Cities[Index];\r\n                let Option = document.createElement(\"option\");\r\n\r\n                Option.value = City.id;\r\n                Option.innerHTML = City.name;\r\n                this.CityListSelect.appendChild(Option);\r\n\r\n            }\r\n\r\n            this.CityListSelect.removeAttribute(\"disabled\");\r\n            this.CityListSelect.selectedIndex = 0;\r\n            this.IsValidCountryList = true;\r\n\r\n        }\r\n        else\r\n        {\r\n            alert(\"An error has occured during the processing. Returned status code: \" + StatusCode + \".\");\r\n            this.IsValidCountryList = false;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    Select_CityList(Event)\r\n    {\r\n\r\n        if (Event.target.value === \"\")\r\n        {\r\n            this.IsValidCityList = false;\r\n        }\r\n        else\r\n        {\r\n            this.IsValidCityList = true;\r\n        }\r\n\r\n    }\r\n\r\n\r\n    async Link_Terms(Event) //refactor!\r\n    {\r\n\r\n        let Url = encodeURI(window.location.origin + \"/modals/terms.html\");\r\n        let Response = await fetch(Url);\r\n        let Content = await Response.text();\r\n\r\n        if (Response.ok)\r\n        {\r\n\r\n            this.ModalWindowHandle.innerHTML = Content;\r\n            this.ModalWindowHandle.classList.add(\"is-active\");\r\n\r\n            let Button_CloseTerms = this.Container.querySelector(\"#Close_TermsModal\");\r\n            Button_CloseTerms.addEventListener(\"click\", () =>\r\n            {\r\n                this.ModalWindowHandle.classList.remove(\"is-active\");\r\n            });\r\n\r\n        }\r\n        else\r\n        {\r\n            alert(\"An error has occured during the processing. Response: \" + Response.status);\r\n        }\r\n\r\n    }\r\n\r\n\r\n    async Link_Privacy(Event) //refactor!\r\n    {\r\n\r\n        let Url = encodeURI(window.location.origin + \"/modals/privacy.html\");\r\n        let Response = await fetch(Url);\r\n        let Content = await Response.text();\r\n\r\n        if (Response.ok)\r\n        {\r\n\r\n            this.ModalWindowHandle.innerHTML = Content;\r\n            this.ModalWindowHandle.classList.add(\"is-active\");\r\n\r\n            let Button_ClosePrivacy = this.Container.querySelector(\"#Close_PrivacyModal\");\r\n            Button_ClosePrivacy.addEventListener(\"click\", () =>\r\n            {\r\n                this.ModalWindowHandle.classList.remove(\"is-active\");\r\n            });\r\n\r\n        }\r\n        else\r\n        {\r\n            alert(\"An error has occured during the processing. Response: \" + Response.status);\r\n        }\r\n\r\n    }\r\n\r\n\r\n    async Button_CreateAccount(Event) //refactor!\r\n    {\r\n\r\n        if (!this.IsDataValid())\r\n        {\r\n\r\n            let Url = encodeURI(window.location.origin + \"/modals/ErrorCreateAccount.html\");\r\n            let Response = await fetch(Url);\r\n            let Content = await Response.text();\r\n\r\n            if (Response.ok)\r\n            {\r\n\r\n                this.ModalWindowHandle.innerHTML = Content;\r\n                this.ModalWindowHandle.classList.add(\"is-active\");\r\n\r\n                let Button_CloseError = this.Container.querySelector(\"#Close_ErrorCreateAccount\");\r\n                Button_CloseError.addEventListener(\"click\", () =>\r\n                {\r\n                    this.ModalWindowHandle.classList.remove(\"is-active\");\r\n                });\r\n\r\n            }\r\n            else\r\n            {\r\n                alert(\"An error has occured during the processing. Response: \" + Response.status);\r\n            }\r\n\r\n            return false;\r\n\r\n        }\r\n\r\n        let SerializedPayLoad = JSON.stringify(\r\n        {\r\n            FirstName:    this.FirstNameInput.value,\r\n            LastName:     this.LastNameInput.value,\r\n            NickName:     this.NicknameInput.value,\r\n            EmailAddress: this.EmailAddressInput.value,\r\n            Password:     this.PasswordInput.value,\r\n            CountryId:    Number(this.CountryListSelect.value),\r\n            CityId:       Number(this.CityListSelect.value)\r\n        });\r\n\r\n        let Url = encodeURI(window.location.origin + \"/api/v1/ajax/users/\");\r\n\r\n        _functions_common__WEBPACK_IMPORTED_MODULE_1__[\"PerformAjaxCall\"](\r\n            \"POST\",\r\n            Url,\r\n            this.Container.dataset.xsrf,\r\n            \"application/json; charset=UTF-8\",\r\n            SerializedPayLoad,\r\n            this.CreateAccount_Callback.bind(this)\r\n        );\r\n\r\n        return true;\r\n\r\n    }\r\n\r\n\r\n    async CreateAccount_Callback(Response, StatusCode) //refactor!\r\n    {\r\n\r\n        if (StatusCode === 200)\r\n        {\r\n\r\n            let ParsedResponse = JSON.parse(Response);\r\n\r\n            if (ParsedResponse.IsUserCreated)\r\n            {\r\n\r\n                let Url = encodeURI(window.location.origin + \"/modals/SuccessCreateAccount.html\");\r\n                let Response = await fetch(Url);\r\n                let Content = await Response.text();\r\n\r\n                if (Response.ok)\r\n                {\r\n\r\n                    this.ModalWindowHandle.innerHTML = Content;\r\n                    this.ModalWindowHandle.classList.add(\"is-active\");\r\n\r\n                    let Button_CloseError = this.Container.querySelector(\"#Close_SuccessCreateAccount\");\r\n                    Button_CloseError.addEventListener(\"click\", () =>\r\n                    {\r\n                        this.ModalWindowHandle.classList.remove(\"is-active\");\r\n                    });\r\n\r\n                }\r\n                else\r\n                {\r\n                    alert(\"An error has occured during the processing. Response: \" + Response.status);\r\n                }\r\n\r\n            }\r\n            else\r\n            {\r\n                alert(\"An error has occured during the processing. Error: \" + ParsedResponse.Error.ErrorDesc);\r\n            }\r\n\r\n        }\r\n        else\r\n        {\r\n            alert(\"An error has occured during the processing. Returned status code: \" + StatusCode + \".\");\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./scripts/views/register.js?");

/***/ }),

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./styles/main.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./styles/main.scss?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./styles/main.scss ./scripts/startup.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./styles/main.scss */\"./styles/main.scss\");\nmodule.exports = __webpack_require__(/*! ./scripts/startup.js */\"./scripts/startup.js\");\n\n\n//# sourceURL=webpack:///multi_./styles/main.scss_./scripts/startup.js?");

/***/ })

},[[0,"runtime","vendors"]]]);