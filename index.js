import main from './script.js';
import Debug from './Debug.js';
import * as choosePicture from './choosePicture.js';
import * as WordImport from './WordImport/WordImport.js';

// External libs
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.mjs';
import WinBox from "https://unpkg.com/winbox@0.1.8/src/js/winbox.js";

window.main = main;
window.debugTest = Debug.fullTest
window.choosePicture1 = choosePicture.choosePicture1;
window.choosePicture2 = choosePicture.choosePicture2;
window.choosePicture3 = choosePicture.choosePicture3;
window.choosePicture4 = choosePicture.choosePicture4;
window.clearImage = choosePicture.clearPicture;
window.WordImport = WordImport;
window.Cookies = Cookies;
//window.WinBox = WinBox;