//------------------------------------
const gl_versionNr = "v1.12"
const gl_versionDate = "26.12.2022"
const gl_versionNrDate = gl_versionNr + " " + gl_versionDate
//------------------------------------

//var cv_privateFormBorder  = 2
var lo_backgroundColor = "whiteSmoke"
//var lo_penFrg1 As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpPen As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpBrush As SolidBrush = New SolidBrush(Color.DarkSlateGray)

var lo_frmTitleBarHeight =0
var lo_frmBorderWidth =0
var lo_formLoaded  = ""

var lo_mouseMoveX  = 0
var lo_mouseMoveY  = 0 

var lo_mouseDown = ""
var lo_borderless = ""
var lo_lastMouseLocation 

var lo_repaintTimerActive  = ""
var lo_hasRepaintRequest  = ""

var lo_showTanCot  = "1"
var lo_showZnacilniKoti = "1"
var lo_showTeorija = ""
var lo_fullScreen = ""
var lo_showRulesSupplement  = ""
var lo_showRulesComplement  = ""
var lo_showRules3to1  = ""
var lo_showRules4to1 = ""
var lo_showGraphSinCos = true
var lo_showGraphTanCot = true
var lo_showCalculator = ""

var lo_radijLevel  = -5 
const cv_radijFactor  = 1.07
const cv_maxRadijLevel  = 15
const cv_minRadijLevel  = -25

var lo_xCircleCenter, lo_yCircleCenter = 100
var xCircleCenterDefault, yCircleCenterDefault
var circleCenterDefaultPositionDefined = ""
var lo_dragEnotskiKrogActive  = ""
var lo_dragEnotskiKrogAddX = 0, lo_dragEnotskiKrogAddY = 0
var lo_mouseAboveEnotskiKrogCenter  = ""
const cv_moveEnotskiKrogMarkerRadij  = 20

const cv_funGroup_none  = 0
const cv_funGroup_sinCos  = 1
const cv_funGroup_tanCot  = 2
const cv_funGroup_all  = 3
var lo_showFunGroup  = cv_funGroup_all

var vl_frmW, vl_frmH
var yCircleCenter, xCircleCenter, radij

//document.getElementById("checkShowZnacilniKoti").innerHTML = "XCVBRREE"
//document.getElementById("checkShowZnacilniKoti").textContent = "XCVBRREE"
document.body.style.overflow = 'hidden'; // tole onemogoèi scrollBar-s
var elMyCanvas = document.getElementById("myCanvas");
var ctxW = window.innerWidth - 18;
var ctxH = window.innerHeight - 10;
var ctx = elMyCanvas.getContext("2d");
const bckgColor = "#F4F8F8";

var elem = document.documentElement; //23.12.2022 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen2

//https://www.w3schools.com/tags/canvas_font.asp
const myFontMathLabels = "bold 11pt Cambria"
const myFontMathLabelsBig = "bold 14pt Cambria"
const myFontMathLabelsLargeItalic = "italic bold 14pt Cambria"
const myFontMathLabelsLargeBoldItalic = "italic bold 14pt Cambria"
const myFontMathValues = "bold 10pt Cambria"
const myFontMathValuesSmall = "normal 10pt Cambria"

const cv_fun_sin = 1
const cv_fun_cos = 2
const cv_fun_tan = 3
const cv_fun_cot = 4

var gl_showTeorija = true

const cv_descMode_tabelaKotnihFunkcij = 1
const cv_descMode_pravila01 = 2
const cv_descMode_pravila02 = 3
const cv_descMode_max = 2

//---- 26.12.2022 v1.12
var lo_calcAlpha = 0
var lo_calcAlphaDeg = 0
var lo_calcAlphaDegPrev = 0
var lo_calcKvadrant = 1
var lo_calcZnacilenKot = true

//https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
// ° (U+00B0)   ¶ (U+00B6)    ? (U+03B1)   ? (U+221A)
const scAlpha = String.fromCharCode(0x3B1)
const scOmega = String.fromCharCode(937)
const scKoren = String.fromCharCode(0x221A)
const scStopinj = String.fromCharCode(0xB0)
const scPI = String.fromCharCode(0xB6)
const scPower2 = String.fromCharCode(0xB2)
const scInfinity = String.fromCharCode(0x221E)
//----
const scTch = String.fromCharCode(0x10C)
const scTchLow = String.fromCharCode(0x10D)
const scSch = String.fromCharCode(0x160)
const scSchLow = String.fromCharCode(0x161)
const scZh = String.fromCharCode(0x17D)
const scZLow = String.fromCharCode(0x17E)
//----
const scCopyright = String.fromCharCode(0xA9)
const scDoubleQuote = String.fromCharCode(0x22)
const scSingleQuote = String.fromCharCode(0x27)

//---- 25.12.2022 na enem mestu zberem uporabljene fiziène barve
const cv_color_blue = "#0000FF"
const cv_color_dodgerBlue = "#1E90FF"
const cv_color_green = "#008000"
const cv_color_seaGreen = "#2E8B57"
const cv_color_salmon = "#FA8072"
const cv_color_darkKhaki = "#BDB76B"
const cv_color_mediumAquamarine = "#66CDAA"
const cv_color_mediumOrchid = "#BA55D3"
const cv_color_plum = "#DDA0DD"
const cv_color_goldenrod = "#DAA520"
const cv_color_wheat = "#F5DEB3"
//---- 25.12.2022 na enem mestu zbrane funkcionalne barve
const myColorSin = cv_color_blue + "FF"
const myColorSinLight = cv_color_dodgerBlue + "FF"
const myColorCos = cv_color_green + "FF"
const myColorCosLight = cv_color_seaGreen + "FF"
const myColorTan = cv_color_mediumOrchid + "FF"
const myColorTanLight = cv_color_plum + "FF"
const myColorCot = cv_color_goldenrod + "FF"
const myColorCotLight = cv_color_wheat + "FF"
const myColorAlphaEKrog = cv_color_salmon + "40"
const myColorAlphaGraph = cv_color_salmon + "60"
const myColorAlpha2eKrog = cv_color_mediumAquamarine + "40" //cv_color_darkKhaki + "40"
const myColorAlpha2graph = cv_color_mediumAquamarine + "60" //cv_color_darkKhaki + "60"

//---- 25.12.2022 iz neta snel funkcije za ugotavljanje komponent barve iz imena barve (https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes)
var cvsConvertColors = document.createElement('canvas');
cvsConvertColors.height = 1;
cvsConvertColors.width = 1;
var ctxConvertColors = cvsConvertColors.getContext('2d');
ctxConvertColors.willReadFrequently = true

//---- 26.12.2022
var tmCalcId

//======== SET CHECKBOXES 'ON' STATES
var checkBox 
checkBox = document.querySelector('#checkShowTanCot');
checkBox.checked = true
checkBox = document.querySelector('#checkShowZnacilniKoti');
checkBox.checked = true
checkBox = document.querySelector('#checkGraphSinCos');
checkBox.checked = true
checkBox = document.querySelector('#checkGraphTanCot');
checkBox.checked = true

//======== SET CANVAS MOUSE WHEEL EVENT LISTENER
document.getElementById("checkShowTanCot").addEventListener("click", checkShowTanCot_click);
function checkShowTanCot_click() {
    if (document.getElementById("checkShowTanCot").checked) { lo_showTanCot = true } else { lo_showTanCot = "" }
    //console.log("lo_showTanCot=" + lo_showTanCot)
    paint()
}

//======== SET CHECKBOXES CLICK EVENT LISTENERS
document.getElementById("checkShowTanCot").addEventListener("click", checkShowTanCot_click);
function checkShowTanCot_click() {
    if (document.getElementById("checkShowTanCot").checked) { lo_showTanCot = true } else { lo_showTanCot = "" }
    //console.log("lo_showTanCot=" + lo_showTanCot)
    paint()
}
document.getElementById("checkShowZnacilniKoti").addEventListener("click", checkShowZnacilniKoti_click);
function checkShowZnacilniKoti_click() {
    if (document.getElementById("checkShowZnacilniKoti").checked) { lo_showZnacilniKoti = true } else { lo_showZnacilniKoti = "" }
    //console.log("showZnacilniKoti=" + lo_showZnacilniKoti)
    paint()
}
document.getElementById("checkFullScreen").addEventListener("click", checkFullScreen_click);
function checkFullScreen_click() {
    if (document.getElementById("checkFullScreen").checked) { lo_fullScreen = true } else { lo_fullScreen = "" }
    //console.log("showZnacilniKoti=" + lo_showZnacilniKoti)
    if (lo_fullScreen) { openFullscreen() } else { closeFullscreen() }
    paint()
}
document.getElementById("checkShowTeorija").addEventListener("click", checkShowTeorija_click);
function checkShowTeorija_click() {
    if (document.getElementById("checkShowTeorija").checked) { lo_showTeorija = true } else { lo_showTeorija = "" }
    //console.log("showTeorija=" + lo_showTeorija)
    paint()
}
document.getElementById("checkRulesSupplement").addEventListener("click", checkRulesSupplement_click);
function checkRulesSupplement_click() {
    if (document.getElementById("checkRulesSupplement").checked) { lo_showRulesSupplement = true } else { lo_showRulesSupplement = "" }
    //console.log("showRulesSupplement=" + lo_showRulesSupplement)
    if (lo_showRulesSupplement) {
        lo_showRulesComplement = ""
        checkRulesComplement.checked = ""
        lo_showRules3to1 = ""
        checkRules3to1.checked = ""
        lo_showRules4to1 = ""
        checkRules4to1.checked = ""
    }
    paint()
}
document.getElementById("checkRulesComplement").addEventListener("click", checkRulesComplement_click);
function checkRulesComplement_click() {
    if (document.getElementById("checkRulesComplement").checked) { lo_showRulesComplement = true } else { lo_showRulesComplement = "" }
    //console.log("showRulesComplement=" + lo_showRulesComplement)
    if (lo_showRulesComplement) {
        lo_showRulesSupplement = ""
        checkRulesSupplement.checked = ""
        lo_showRules3to1 = ""
        checkRules3to1.checked = ""
        lo_showRules4to1 = ""
        checkRules4to1.checked = ""
    }
    paint()
}
document.getElementById("checkRules3to1").addEventListener("click", checkRules3to1_click);
function checkRules3to1_click() {
    if (document.getElementById("checkRules3to1").checked) { lo_showRules3to1 = true } else { lo_showRules3to1 = "" }
    //console.log("showRules3to1=" + lo_showRules3to1)
    if (lo_showRules3to1) {
        lo_showRulesSupplement = ""
        checkRulesSupplement.checked = ""
        lo_showRulesComplement = ""
        checkRulesComplement.checked = ""
        lo_showRules4to1 = ""
        checkRules4to1.checked = ""
    }
    paint()
}
document.getElementById("checkRules4to1").addEventListener("click", checkRules4to1_click);
function checkRules4to1_click() {
    if (document.getElementById("checkRules4to1").checked) { lo_showRules4to1 = true } else { lo_showRules4to1 = "" }
    //console.log("showRules4to1=" + lo_showRules4to1)
    if (lo_showRules4to1) {
        lo_showRulesSupplement = ""
        checkRulesSupplement.checked = ""
        lo_showRulesComplement = ""
        checkRulesComplement.checked = ""
        lo_showRules3to1 = ""
        checkRules3to1.checked = ""
    }
    paint()
}
document.getElementById("checkGraphSinCos").addEventListener("click", checkGraphSinCos_click);
function checkGraphSinCos_click() {
    if (document.getElementById("checkGraphSinCos").checked) { lo_showGraphSinCos = true } else { lo_showGraphSinCos = "" }
    //console.log("showGraphSinCos=" + lo_showGraphSinCos)
    if (lf_determineFunGroup()) {
        paint()
    }
    //console.log("call calculation ...")
}
document.getElementById("checkGraphTanCot").addEventListener("click", checkGraphTanCot_click);
function checkGraphTanCot_click() {
    if (document.getElementById("checkGraphTanCot").checked) { lo_showGraphTanCot = true } else { lo_showGraphTanCot = "" }
    //console.log("showGraphTanCot=" + lo_showGraphTanCot)
    if (lf_determineFunGroup()) {
        paint()
    }
}
document.getElementById("checkCalculator").addEventListener("click", checkCalculator_click);
function checkCalculator_click() {
    if (document.getElementById("checkCalculator").checked) { lo_showCalculator = true } else { lo_showCalculator = "" }
    //console.log("showCalculator=" + lo_showCalculator)

    switch (lo_showCalculator) {
        case true:
            tmCalcId = setInterval(tmCalc_tick, 200)
            break
        default:
            clearInterval(tmCalcId)
            break
    }
    lf_adjustControls()

    //console.log("hide calculator!")
    //.Visible=True ... "visible" or "block"
    //.Visible=False .. "hidden" or "none"
    //document.getElementById("checkCalculator").style.visibility = "hidden"; // or x.style.display = "none"; //https://social.msdn.microsoft.com/Forums/en-US/00faaaf0-0f96-4c33-a255-4c2ca2bdfb51/how-to-quothidequot-or-make-quotvisiblequot-in-javascript-when-i-quotcheck-or?forum=asphtmlcssjavascript
    //document.getElementById("labelCalculator").style.visibility = "hidden"; // or x.style.display = "none"; //https://social.msdn.microsoft.com/Forums/en-US/00faaaf0-0f96-4c33-a255-4c2ca2bdfb51/how-to-quothidequot-or-make-quotvisiblequot-in-javascript-when-i-quotcheck-or?forum=asphtmlcssjavascript

    //if (lf_determineFunGroup()) {
    //    paint()
    //}
}

function tmCalc_tick() {
    lf_calculate()
}
var radioCalcDeg = document.createElement('input');
radioCalcDeg.type = 'radio';
radioCalcDeg.name = 'calcMode'; //https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
radioCalcDeg.id = 'radioCalcDeg';
radioCalcDeg.value = 'Deg';
radioCalcDeg.style.left = "418px"
radioCalcDeg.style.top = "45px"
radioCalcDeg.style.visibility = "hidden"
var labelCalcDeg = document.createElement('label')
labelCalcDeg.htmlFor = 'radioCalcDeg';
labelCalcDeg.style.left = "440px"
labelCalcDeg.style.top = "47px"
labelCalcDeg.style.visibility = "hidden"
var descCalcDeg = document.createTextNode('Deg');
labelCalcDeg.appendChild(descCalcDeg);
document.body.appendChild(radioCalcDeg);
document.body.appendChild(labelCalcDeg);

var radioCalcSms = document.createElement('input');
radioCalcSms.type = 'radio';
radioCalcSms.name = 'calcMode';
radioCalcSms.id = 'radioCalcSms';
radioCalcSms.value = 'Sms';
radioCalcSms.style.left = "468px"
radioCalcSms.style.top = "45px"
radioCalcSms.style.visibility = "hidden"
var labelCalcSms = document.createElement('label')
labelCalcSms.htmlFor = 'radioCalcSms';
labelCalcSms.style.left = "490px"
labelCalcSms.style.top = "47px"
labelCalcSms.style.visibility = "hidden"
var descCalcSms = document.createTextNode('S/M/S');
labelCalcSms.appendChild(descCalcSms);
document.body.appendChild(radioCalcSms);
document.body.appendChild(labelCalcSms);

var radioCalcRad = document.createElement('input');
radioCalcRad.type = 'radio';
radioCalcRad.name = 'calcMode';
radioCalcRad.id = 'radioCalcRad';
radioCalcRad.value = 'Rad';
radioCalcRad.style.left = "533px"
radioCalcRad.style.top = "45px"
var labelCalcRad = document.createElement('label')
labelCalcRad.htmlFor = 'radioCalcRad';
labelCalcRad.style.left = "555px"
labelCalcRad.style.top = "47px"
labelCalcDeg.style.visibility = "hidden"
var descCalcRad = document.createTextNode('Rad');
labelCalcRad.appendChild(descCalcRad);
document.body.appendChild(radioCalcRad);
document.body.appendChild(labelCalcRad);

var textCalcDeg = document.createElement('input');
textCalcDeg.type = 'text';
textCalcDeg.id = 'textCalcDeg';
textCalcDeg.value = '';
textCalcDeg.maxLength = 9
textCalcDeg.style.left = "424px"
textCalcDeg.style.top = "68px"
textCalcDeg.style.width = "80px"
textCalcDeg.style.visibility = "hidden"
document.body.appendChild(textCalcDeg);

var textCalcSmsDeg = document.createElement('input');
textCalcSmsDeg.type = 'text';
textCalcSmsDeg.id = 'textCalcSmsDeg';
textCalcSmsDeg.value = '';
textCalcSmsDeg.maxLength = 6
textCalcSmsDeg.style.left = "424px"
textCalcSmsDeg.style.top = "68px"
textCalcSmsDeg.style.width = "40px"
textCalcSmsDeg.style.visibility = "hidden"
document.body.appendChild(textCalcSmsDeg);

var textCalcSmsMin = document.createElement('input');
textCalcSmsMin.type = 'text';
textCalcSmsMin.id = 'textCalcSmsMin';
textCalcSmsMin.value = '';
textCalcSmsMin.maxLength = 6
textCalcSmsMin.style.left = "476px"
textCalcSmsMin.style.top = "68px"
textCalcSmsMin.style.width = "40px"
textCalcSmsMin.style.visibility = "hidden"
document.body.appendChild(textCalcSmsMin);

var textCalcSmsSec = document.createElement('input');
textCalcSmsSec.type = 'text';
textCalcSmsSec.id = 'textCalcSmsSec';
textCalcSmsSec.value = '';
textCalcSmsSec.maxLength = 6
textCalcSmsSec.style.left = "528px"
textCalcSmsSec.style.top = "68px"
textCalcSmsSec.style.width = "55px"
textCalcSmsSec.style.visibility = "hidden"
document.body.appendChild(textCalcSmsSec);

var textCalcRslt = document.createElement('input');
textCalcRslt.type = 'text';
textCalcRslt.id = 'textCalcRslt';
textCalcRslt.value = '';
textCalcRslt.maxLength = 1000
textCalcRslt.style.left = "584px"
textCalcRslt.style.top = "68px"
textCalcRslt.style.width = "220px"
textCalcRslt.style.background = "whiteSmoke"
textCalcRslt.style.visibility = "hidden"
textCalcRslt.readOnly = true
document.body.appendChild(textCalcRslt);

var checkCalcAlphaLive = document.createElement('input');
checkCalcAlphaLive.type = 'checkbox';
checkCalcAlphaLive.name = 'calcAlphaLive';
checkCalcAlphaLive.id = 'checkCalcAlphaLive';
checkCalcAlphaLive.value = 'On';
checkCalcAlphaLive.style.left = "620px"
checkCalcAlphaLive.style.top = "45px"
checkCalcAlphaLive.style.visibility = "hidden"
var labelCalcAlphaLive = document.createElement('label')
labelCalcAlphaLive.htmlFor = 'checkCalcAlphaLive';
labelCalcAlphaLive.style.left = "640px"
labelCalcAlphaLive.style.top = "47px"
labelCalcDeg.style.visibility = "hidden"
var descCalcAlphaLive = document.createTextNode('Prikaz v krogu');
labelCalcAlphaLive.appendChild(descCalcAlphaLive);
document.body.appendChild(checkCalcAlphaLive);
document.body.appendChild(labelCalcAlphaLive);

const cv_modeDeg = 1
const cv_modeSms = 2
const cv_modeRad = 3
var lo_mode
var lo_noChange = ""
var lo_alphaLive = "" // 26.12.2022 v1.12

//======== SET RADIOBOXES CLICK EVENT LISTENERS
document.getElementById("radioCalcDeg").addEventListener("click", radioCalcDeg_click);
function radioCalcDeg_click() {
    if (document.getElementById("radioCalcDeg").checked) { lf_calculator_changeMode(cv_modeDeg) }
    //console.log("lo_showTanCot=" + lo_showTanCot)
}
document.getElementById("radioCalcSms").addEventListener("click", radioCalcSms_click);
function radioCalcSms_click() {
    if (document.getElementById("radioCalcSms").checked) { lf_calculator_changeMode(cv_modeSms) }
    //console.log("lo_showTanCot=" + lo_showTanCot)
}
document.getElementById("radioCalcRad").addEventListener("click", radioCalcRad_click);
function radioCalcRad_click() {
    if (document.getElementById("radioCalcRad").checked) { lf_calculator_changeMode(cv_modeRad) }
    //console.log("lo_showTanCot=" + lo_showTanCot)
}
document.getElementById("checkCalcAlphaLive").addEventListener("click", checkCalcAlphaLive_click);
function checkCalcAlphaLive_click() {
    if (document.getElementById("checkCalcAlphaLive").checked) { lf_calculator_changeAlphaLive(true) } else { lf_calculator_changeAlphaLive("") }
    //console.log("lo_showTanCot=" + lo_showTanCot)
}

lf_calculator_changeMode(cv_modeDeg)



// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.
// Add the event listeners for mousedown, mousemove, and mouseup
elMyCanvas.addEventListener('mousedown', (e) => {
    lo_mousedownX = e.offsetX;
    lo_mouseDownY = e.offsetY;
    lo_mouseDown = true
    //10.12.2022 v1.0.0.0 Ali hoèe vleèi celotno sliko enotskega kroga?
    lo_dragEnotskiKrogActive = lo_mouseAboveEnotskiKrogCenter
    //console.log("dragEnotskiKrogActive: " + lo_dragEnotskiKrogActive)

});
elMyCanvas.addEventListener('mouseup', (e) => {
    lo_mouseDown = ""
    //10.12.2022 v1.0.0.0
    lo_dragEnotskiKrogActive = ""
    //console.log("dragEnotskiKrogActive: FALSE")
});
elMyCanvas.addEventListener('mousemove', (e) => {

    //console.log("mouse_move() enter")

    //Vleèenje okna / enotskega kroga
    if (lo_mouseDown) {
        switch (lo_dragEnotskiKrogActive) {
            case true:
                //let vl_yCircleCenter = yCircleCenterDefault //pb1.Height / 2
                //let vl_xCircleCenter = xCircleCenterDefault //vl_yCircleCenter
                let circleCenterPos = lf_setCircleCenterPos()
                let vl_xCircleCenter = circleCenterPos[0]
                let vl_yCircleCenter = circleCenterPos[1]
                lo_dragEnotskiKrogAddX = e.offsetX - vl_xCircleCenter
                lo_dragEnotskiKrogAddY = e.offsetY - vl_yCircleCenter
                paint()
                return
            default:
                //Me.Location = New Point((Me.Location.X - lo_lastMouseLocation.X) + e.X, (Me.Location.Y - lo_lastMouseLocation.Y) + e.Y)
                //Me.Update()
                //console.log("mouse_move-drag")
                //return
        }
    }

    //10.12.2022 v1.0.0.0 Je nad središèem enotskega kroga in bo možno vleèenje celotne slike enotskega kroga?
    lo_mouseAboveEnotskiKrogCenter = ""
    let diffX = e.offsetX - lo_xCircleCenter
    let diffY = e.offsetY - lo_yCircleCenter
    let dist = Math.sqrt(diffX * diffX + diffY * diffY)
    //console.log("dist=" + dist)
    //Je miška znotraj kroga doloèenega polmera okoli centra enotskega kroga?
    if (dist < cv_moveEnotskiKrogMarkerRadij) {
        //Miška je nekje nad centrom enostkega kroga ...
        lo_mouseAboveEnotskiKrogCenter = true
    }

    //Èe se miška v resnici ni premaknila ne naredim niè (že samo prikaz ToolTip-a sprovocira novo generiranje dogodka MouseMove() !!)
    if (e.offsetX == lo_mouseMoveX && e.offsetY == lo_mouseMoveY) {
        //console.log("mouse_no_move")
        return
    }

    //Miška se je zares premaknila
    //console.log("mouse_move_beforeExecute")
    lo_mouseMoveX = e.offsetX
    lo_mouseMoveY = e.offsetY
    //console.log(e.offsetX + "-" + e.offsetY)
    paint()
    //console.log("mouse_move exit")
});

//window.addEventListener("wheel", event, (passive = true) => {
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    //console.log("lo_mouseMoveX=" + lo_mouseMoveX + " lo_mouseMoveY=" + lo_mouseMoveY + " xCircleCenter=" + xCircleCenter + " yCircleCenter=" + yCircleCenter);
    let dx = Math.abs(lo_mouseMoveX - xCircleCenter).toFixed()
    let dy = Math.abs(lo_mouseMoveY - yCircleCenter).toFixed()
    let d = Math.sqrt(dx * dx + dy * dy).toFixed()
    //console.log("dx=" + dx + " dy=" + dy + " d=" + d + " radij=" + radij)
    if (d < (radij * 1.3)) {
        //miško vrti znotraj ali v bližnji okolici kroga
        lf_changeRadij(delta)
    }
});
//window.addEventListener('mouseup', (e) => {
    //drawLine(context, x, y, e.offsetX, e.offsetY);
    //x = 0;
    //y = 0;
    //isDrawing = false;
//});

//let zzzg = colorToHexRGB("plum")
//zzzg = colorToHexRGBA("plum")
//console.log(colorToHexRGB("plum"))
//console.log("plum=" + colorToHexRGBA("plum") + " plum(hexG)=" + colorHexG("plum") + " plum(decG)=" + colorDecG("plum"))
//console.log("plum=" + colorToHexRGBA("plum") + " plum(hexA)=" + colorHexA("plum") + " plum(decA)=" + colorDecA("plum"))
//console.log("colorFromARGB(32, 128, 64, 255)=" + colorFromARGB(32, 128, 64, 255))
//console.log("gf_alphaColor(20, darkOrchid)=" + gf_alphaColor(20, "darkOrchid"))

resizeCanvas();
paint();



// var elMainDate = document.getElementById("mainDate");
// elMainDate.width = 300     //
// elMainDate.height = 30 //
// elMainDate.style.left = "30px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.top = "1px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS

function lf_paint_pravila(ctx) {

    lf_paint_pravila01(ctx)
    lf_paint_pravila02(ctx)
    lf_paint_tabelaKotnihFunkcij(ctx)

}

function lf_paint_pravila01(ctx) {

    let x0, y0, x, y, w, h, d
    let tmpStr

    x0 = 6; y0 = 110; d=4
    w = 208; h = 151

    ctx.fillStyle = "#FFFFFFC0"//"#C0C0C020"
    ctx.fillRect(x0 - d, y0 - d, w + 2 * d, h + 2 * d)
    ctx.fillStyle = "#C0C0F018"
    ctx.fillRect(x0, y0, w, h)

    //==== PRAVILA
    x = 10
    let vStep = 24
    y = y0 + 20
    tmpStr = "180" + scStopinj + " = " + scPI + " rad" //"180° = ¶ rad"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep
    tmpStr = "1 rad = 180" + scStopinj + "/" + scPI + " = 57,3" + scStopinj //"1 rad = 180°/¶ = 57,3°"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep
    tmpStr = "sin" + scPower2 + scAlpha + " + cos" + scPower2 + scAlpha + " = 1" //"sin?? + cos?? = 1"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep
    tmpStr = "tan(" + scAlpha + ") = sin(" + scAlpha + ") / cos(" + scAlpha + ")" //"tan(?) = sin(?) / cos(?)"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep
    tmpStr = "cot(" + scAlpha + ") = cos(" + scAlpha + ") / sin(" + scAlpha + ")" //"cot(?) = cos(?) / sin(?)"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep
    tmpStr = "cot(" + scAlpha + ") = 1 / tan(" + scAlpha + ")" //"cot(?) = 1 / tan(?)"
    gText(tmpStr, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)

}

function lf_paint_pravila02(ctx) {

    let x0, y0, x, y, w, h, d
    let tmpStr

    x0 = 6; y0 = 281; d = 4 // 281 = (110+151) + 20 ... prejšnji blok pravil + 20
    w = 295; h = 440

    ctx.fillStyle = "#FFFFFFC0"//"#C0C0C020"
    ctx.fillRect(x0 - d, y0 - d, w + 2 * d, h + 2 * d)
    ctx.fillStyle = "#C0C0F018"
    ctx.fillRect(x0, y0, w, h)
       
    //==== PRAVILA
    x = 10
    let vStep = 24
    y = y0 +20; gText("-------- komplementarni", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(90" + scStopinj + "-" + scAlpha + ") = cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(90" + scStopinj + "-" + scAlpha + ") = sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    //----
    y += vStep; gText("-------- IV -> I", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(-" + scAlpha + ") = -sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(-" + scAlpha + ") = cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    //----
    y += vStep; gText("-------- II -> I", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(90" + scStopinj + "+" + scAlpha + ") = sin(90" + scStopinj + "-" + scAlpha + ") = cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(90" + scStopinj + "+" + scAlpha + ") = -cos(90" + scStopinj + "-" + scAlpha + ") = -sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    //----
    y += vStep; gText("-------- III -> I", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(180" + scStopinj + "+" + scAlpha + ") = -sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(180" + scStopinj + "+" + scAlpha + ") = -cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    //----
    y += vStep; gText("-------- suplementarni", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(180" + scStopinj + "-" + scAlpha + ") = sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(180" + scStopinj + "-" + scAlpha + ") = -cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    //----
    y += vStep; gText("-------- periodi" + scTchLow + "nost na 2" +scPI, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("sin(360" + scStopinj + "+" + scAlpha + ") = sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("cos(360" + scStopinj + "+" + scAlpha + ") = cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
}

function lf_paint_tabelaKotnihFunkcij(ctx) {

    let x0, y0, x, y, w, h, d
    let tmpStr

    x0 = 6; y0 = 731; d = 4 // 731 = (281+440) + 20 ... prejšnji blok pravil + 20
    w = 343; h = 155

    ctx.fillStyle = "#FFFFFFC0"//"#C0C0C020"
    ctx.fillRect(x0 - d, y0 - d, w + 2 * d, h + 2 * d)
    ctx.fillStyle = "#C0C0F018"
    ctx.fillRect(x0, y0, w, h)

    //==== PRAVILA
    const vStepAdd = 6
    const hStep = 70
    let vStep = 24
    x = 10
    y = y0 + 20; gText(scAlpha, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += (vStep + vStepAdd); gText("0" + scStopinj, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("30" + scStopinj, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("45" + scStopinj, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("60" + scStopinj, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("90" + scStopinj, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)

    gLine(x, y0 + 27, w - 10, y0 + 27, 1, "gray", [])
    gLine(60, y0+3, 60, y0+h - 8, 1, "gray", [])

    x += hStep
    y = y0 + 20; gText("sin(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep + vStepAdd; gText("0", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("1/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "2/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("1", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)

    x += hStep
    y = y0 + 20; gText("cos(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep + vStepAdd; gText("1", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "2/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("1/2", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("0", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)

    x += hStep
    y = y0 + 20; gText("tan(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep + vStepAdd; gText("0", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3/3", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("1", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scInfinity, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)

    x += hStep
    y = y0 + 20; gText("cot(" + scAlpha + ")", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep + vStepAdd; gText(scInfinity, myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("1", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText(scKoren + "3/3", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
    y += vStep; gText("0", myFontMathLabelsLargeItalic, "darkSlateGray", x, y)
}


function lf_changeRadij(vp_change) {

    //console.log("radijLevel=" + lo_radijLevel)

    let tmpParamValue = 0
    let oldParamValue = lo_radijLevel

    tmpParamValue = lo_radijLevel
    tmpParamValue += vp_change

    //Check margins
    if (tmpParamValue > cv_maxRadijLevel) {
        tmpParamValue = cv_maxRadijLevel
    }
    if (tmpParamValue < cv_minRadijLevel) {
        tmpParamValue = cv_minRadijLevel
    }

    //Have new parameter value
    lo_radijLevel = tmpParamValue
    //console.log("radijLevel=" + lo_radijLevel)
    //Has parameter changed?
    if ((lo_radijLevel != oldParamValue)) { paint() }
}


function resizeCanvas() {
    //dimenzioniranje in pozicioniranje canvas-a
    ctxW = window.innerWidth - 6;
    ctxH = window.innerHeight - 6;
    elMyCanvas.width = ctxW     //da je na obeh straneh minimalen rob
    elMyCanvas.height = ctxH //da je na obeh straneh minimalen rob
    elMyCanvas.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
    elMyCanvas.style.left = "2px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
    elMyCanvas.style.top = "2px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS

    //if (window.innerHeight == screen.height) {
        // browser is fullscreen
    //}
    if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
        // browser is almost certainly fullscreen
    } else {
        // browser almost certainly isn't in fullscreen
        if (lo_fullScreen) {
            lo_fullScreen = ""
            checkFullScreen.checked = ""
        }
    }

}

function paint() {

    //console.log("paint()")
    //elMyCanvas = document.getElementById("myCanvas");
    //ctx = elMyCanvas.getContext("2d");
    //ctx.fillStyle = "red";
    //ctx.fillRect(0, 0, 300, 150);
    //ctx.clearRect(20, 20, 100, 50);

    ctx.fillStyle = bckgColor; // "lightGray";
    //ctx.clearRect(0, 0, ctxW, ctxH);
    //ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, ctxW, ctxH);

    vl_frmW = window.width
    vl_frmH = window.height

    yCircleCenter = ctxH / 2
    xCircleCenter = yCircleCenter

    //console.log("paint().beforeAddDrag.xCircleCenter: " + xCircleCenter)

    xCircleCenter += lo_dragEnotskiKrogAddX
    yCircleCenter += lo_dragEnotskiKrogAddY

    //console.log("paint().lo_dragEnotskiKrogAddX: " + lo_dragEnotskiKrogAddX)
    //console.log("paint().lo_dragEnotskiKrogAddY: " + lo_dragEnotskiKrogAddY)
    //console.log("paint().afterAddDrag.xCircleCenter: " + xCircleCenter)
    //console.log("lo_dragEnotskiKrogAddY=" + lo_dragEnotskiKrogAddY + " yCircleCenter=" + yCircleCenter)

    lo_xCircleCenter = xCircleCenter
    lo_yCircleCenter = yCircleCenter
       


    //tmpStr = "velikost enotskega kroga spremeniš z vrtenjem kolešèka miške"
    tmpStr = "velikost enotskega kroga spremeni" + scSchLow + " z vrtenjem kole" + scSchLow + scTchLow + "ka mi" + scSchLow + "ke nad krogom"
    gText(tmpStr, "italic 11pt cambria", "gray", 6, ctxH - 22)
    tmpStr = "enotski krog lahko pri sredi" + scSchLow + scTchLow  + "u prime" + scSchLow + " z mi" + scSchLow + "ko in ga premakne" + scSchLow 
    gText(tmpStr, "italic 11pt cambria", "gray", 6, ctxH - 8)

    paint_eKrog();

    if (lo_showTeorija) { lf_paint_pravila(ctx) }

    paint_author();
    paint_version();
}

function paint_author() {

    //======== AVTOR
    let tmpStr = "Peter Malovrh, 2022"
    let font = "italic bold 18px cambria"
    let wh = gMeasureText(tmpStr, font);
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    let topMargin = 6
    let rightMargin = 6
    //----
    let dd = 9
    let x1 = ctxW - rightMargin - dd
    let x0 = x1 - wh[0]
    let y0 = topMargin + dd
    let y1 = y0 + wh[1]
    //----
    gBannerRectWithText(x0, y0, x1, y1, dd, "white", 1, "lightGray", font, "gray", tmpStr, "#D0D0D040", 4, 4)
}

function paint_version() {

    //======== VERZIJA APLIKACIJE
    let tmpStr = gl_versionNr
    let font = "italic bold 14px cambria"
    let wh = gMeasureText(tmpStr, font);
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    let topMargin = 33
    let rightMargin = 78
    //----
    let dd = 5
    let x1 = ctxW - rightMargin - dd
    let x0 = x1 - wh[0]
    let y0 = topMargin + dd
    let y1 = y0 + wh[1]
    //----
    gBannerRectWithText(x0, y0, x1, y1, dd, "#FFF800B0", 1, "lightGray", font, "blue", tmpStr, "#D0D0D040", 3, 3)

    //======== DATUM APLIKACIJE
    tmpStr = gl_versionDate
    font = "italic bold 12px cambria"
    wh = gMeasureText(tmpStr, font);
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    topMargin = 35
    rightMargin = 6
    //----
    dd = 5
    x1 = ctxW - rightMargin - dd
    x0 = x1 - wh[0]
    y0 = topMargin + dd
    y1 = y0 + wh[1]
    gBannerRectWithText(x0, y0, x1, y1, dd, "white", 1, "lightGray", "italic 12px cambria", "gray", tmpStr, "", 3, 3)
}

function paint_eKrog() {

    let kRadij = 1.7
    if (lo_radijLevel != 0) {
        let tmpZoomY = cv_radijFactor ** Math.abs(lo_radijLevel);
        //console.log("tmpZoomY=" + tmpZoomY)
        if (lo_radijLevel > 0) {
            kRadij /= tmpZoomY;
        } else { 
            kRadij *= tmpZoomY;
        }
    }
    //console.log("lo_radijLevel=" + lo_radijLevel + " kRadij=" + kRadij)

    let vl_outPart = ctxH / 2 * 0.15 * kRadij
    if (vl_outPart < 30) { vl_outPart = 30 }
    radij = ctxH / 2 - vl_outPart
    if (radij < 10) { radij = 10 }
    //xCircleCenter = 70 + radij
    //yCircleCenter = ctxH - 100 - radij
    let circleCenterPos = lf_setCircleCenterPos()
    xCircleCenter = circleCenterPos[0]; yCircleCenter = circleCenterPos[1]
    xCircleCenter += lo_dragEnotskiKrogAddX
    yCircleCenter += lo_dragEnotskiKrogAddY
    lo_xCircleCenter = xCircleCenter
    lo_yCircleCenter = yCircleCenter
    let xCircleLeft = xCircleCenter - radij
    let xCircleRight = xCircleCenter + radij
    let yCircleTop = yCircleCenter - radij
    let yCircleBottom = yCircleCenter + radij

    //ctx.fillStyle = "#FF00DD";
    //ctx.fillRect(20, 20, 150, 100);
    //gArc(1100, 200, 100, 0, 5, "#FA8072", 0, "")

    //==== KROŽNICA
    //lo_penFrg1.Width = 3
    //lo_penFrg1.Color = Color.DarkGray
    //g.FillEllipse(lf_mySolidBrush(Color.GhostWhite), xCircleCenter - radij + 1, yCircleCenter - radij + 1, 2 * radij - 1, 2 * radij - 1)
    //g.DrawEllipse(lo_penFrg1, xCircleCenter - radij, yCircleCenter - radij, 2 * radij + 1, 2 * radij + 1)
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
    gEllipse(xCircleCenter, yCircleCenter, radij, radij, 0, "white", 1, "darkslateGray")
    //console.log("xCircleCenter=" + xCircleCenter + ", yCircleCenter=" + yCircleCenter + ", radij=" + radij )

    ////==== MARKER V SREDIŠÈU KROŽNICE ZA PREMIKANJE ENOTSKEGA KROGA PO OKNU SEM IN TJA ...  10.12.2022 v1.0.0.0
    if (lo_mouseAboveEnotskiKrogCenter || lo_dragEnotskiKrogActive) {
        gEllipse(xCircleCenter, yCircleCenter, cv_moveEnotskiKrogMarkerRadij, cv_moveEnotskiKrogMarkerRadij, 0, "#64B89680", 2, "#64B896A0")
    }

    //==== MARKERJI NA KROŽNICI ZA ZNAÈILNE KOTE
    checkBox = document.querySelector('#checkShowZnacilniKoti');
    lo_showZnacilniKoti = checkBox.checked
    if (lo_showZnacilniKoti) {
        x = xCircleCenter + radij * Math.cos(0 * Math.PI / 180)
        y = yCircleCenter - radij * Math.sin(0 * Math.PI / 180)
        gEllipse(x, y, 4, 4, 0, "gray", 0, "")
        x = xCircleCenter + radij * Math.cos(30 * Math.PI / 180)
        y = yCircleCenter - radij * Math.sin(30 * Math.PI / 180)
        gEllipse(x, y, 4, 4, 0, "gray", 0, "")
        x = xCircleCenter + radij * Math.cos(45 * Math.PI / 180)
        y = yCircleCenter - radij * Math.sin(45 * Math.PI / 180)
        gEllipse(x, y, 4, 4, 0, "gray", 0, "")
        x = xCircleCenter + radij * Math.cos(60 * Math.PI / 180)
        y = yCircleCenter - radij * Math.sin(60 * Math.PI / 180)
        gEllipse(x, y, 4, 4, 0, "gray", 0, "")
        x = xCircleCenter + radij * Math.cos(90 * Math.PI / 180)
        y = yCircleCenter - radij * Math.sin(90 * Math.PI / 180)
        gEllipse(x, y, 4, 4, 0, "gray", 0, "")
    }

    //======== KOORDINATNI OSI
    const cv_axisDiff = 10
    gLine(xCircleCenter, yCircleCenter - radij - cv_axisDiff, xCircleCenter, yCircleCenter + radij + cv_axisDiff, 1, "darkSlateGray", [])
    gLine(xCircleCenter - radij - cv_axisDiff, yCircleCenter, xCircleCenter + radij + cv_axisDiff, yCircleCenter, 1, "darkSlateGray", [])

    //======== ENKE NA 4 KONCIH KROŽNICE
    let tmpStr = "1"
    let font = "18px cambria"
    let wh = gMeasureText(tmpStr, font);
    let color = "darkSlateGray"
    gText(tmpStr, font, color, xCircleLeft - wh[0] - 1, yCircleCenter - 3)
    gText(tmpStr, font, color, xCircleRight + 1, yCircleCenter - 3)
    gText(tmpStr, font, color, xCircleCenter + 2, yCircleTop - 3)
    gText(tmpStr, font, color, xCircleCenter + 2, yCircleBottom + wh[1] + 3)

    //======== ALFA
    //---- 26.12.2022 doloèanje kota in ostalih parametrov preseljeno v svojo funkcijo
    let alpha, alphaDeg, kvadrant, vl_znacilenKot
    if (lo_showCalculator && lo_alphaLive) {
        //console.log("alpha goes live!")
        alpha = lo_calcAlpha
        alphaDeg = lo_calcAlphaDeg
        kvadrant = lo_calcKvadrant
        vl_znacilenKot = lo_calcZnacilenKot
    } else {
        //console.log("mouse alpha mode")
        let aData = lf_getAlphaFromCurrentMousePosition()
        alpha = aData[0]; alphaDeg = aData[1]; kvadrant = aData[2]; vl_znacilenKot = aData[3]; 
    }
    
    //alphaDeg = 90
    //alpha = Math.PI / 2
    //vl_znacilenKot = true

    //======== IZRAÈUN ŠTEVILÈNE VREDNOSTI KOTA KOT STRINGA V STOPINJAH IN RADIANIH
    let drrr = lf_getAlphaStrings(alpha, alphaDeg, vl_znacilenKot)
    let alphaStrDeg = drrr[0]
    let alphaStrRad = drrr[1]
    let alphaStrRad2 = drrr[2]
    let alphaStrRad3 = drrr[3]
    //console.log("alphaStrDeg=" + alphaStrDeg + " alphaStrRad=" + alphaStrRad + " alphaStrRad2=" + alphaStrRad2 + " alphaStrRad3=" + alphaStrRad3)

    //let vl_color = "#FFFFFFFF";// "gold"
    //var myRgbColor = vl_color.r
    //console.log(myRgbColor)

    //======== TRIKOTNIK SIN/COS/1 V ENOTSKEM KROGU
    lf_paint_eKrog_sinCos(ctx, true, xCircleCenter, yCircleCenter, radij, scAlpha, alpha, alphaDeg, alphaStrDeg, alphaStrRad3, vl_znacilenKot, kvadrant)

    //======== TAN/COT V ENOTSKEM KROGU
    lf_paint_eKrog_tanCot(ctx, true, xCircleCenter, yCircleCenter, radij, scAlpha, alpha, alphaDeg, alphaStrDeg, alphaStrRad3, vl_znacilenKot, kvadrant)

    //======= PRAVILA
    let alpha2 = alpha
    let alpha2Deg = alphaDeg
    let alpha2StrDeg, alpha2StrRad, alpha2StrRad2, alpha2StrRad3

    //======== PRAVILA: 1) SUPLEMENTARNI KOTI
    if (lo_showRulesSupplement) {
        if (alphaDeg > 0 && alphaDeg < 90) {
            alpha2 = Math.PI - alpha
            alpha2Deg = 180 - alphaDeg
            //lf_getAlphaStrings(alpha2, alpha2Deg, False, alpha2StrDeg, alpha2StrRad, alpha2StrRad2, alpha2StrRad3)
            drrr = lf_getAlphaStrings(alpha2, alpha2Deg, "")
            alphaStrDeg = drrr[0]
            alphaStrRad = drrr[1]
            alphaStrRad2 = drrr[2]
            alphaStrRad3 = drrr[3]
            lf_paint_eKrog_sinCos(ctx, "", xCircleCenter, yCircleCenter, radij, "180" + scStopinj + "-" + scAlpha, alpha2, alpha2Deg, alpha2StrDeg, alpha2StrRad3, "", 2)
            //GoTo labAfterRules
        }
    }
    //==== PRAVILA: 2) KOMPLEMENTARNI KOTI
    else if (lo_showRulesComplement) {
        if (alphaDeg > 0 && alphaDeg < 90) {
            alpha2 = Math.PI / 2 - alpha
            alpha2Deg = 90 - alphaDeg
            //lf_getAlphaStrings(alpha2, alpha2Deg, False, alpha2StrDeg, alpha2StrRad, alpha2StrRad2, alpha2StrRad3)
            drrr = lf_getAlphaStrings(alpha2, alpha2Deg, "")
            alphaStrDeg = drrr[0]
            alphaStrRad = drrr[1]
            alphaStrRad2 = drrr[2]
            alphaStrRad3 = drrr[3]
            lf_paint_eKrog_sinCos(ctx, "", xCircleCenter, yCircleCenter, radij, "90" + scStopinj + "-" + scAlpha, alpha2, alpha2Deg, alpha2StrDeg, alpha2StrRad3, "", 1)
        }
    }
    //==== PRAVILA: 3) PREHOD III -> I
    else if (lo_showRules3to1) {
        if (alphaDeg > 0 && alphaDeg < 90) {
            alpha2 = Math.PI + alpha
            alpha2Deg = 180 + alphaDeg
            //lf_getAlphaStrings(alpha2, alpha2Deg, False, alpha2StrDeg, alpha2StrRad, alpha2StrRad2, alpha2StrRad3)
            drrr = lf_getAlphaStrings(alpha2, alpha2Deg, "")
            alphaStrDeg = drrr[0]
            alphaStrRad = drrr[1]
            alphaStrRad2 = drrr[2]
            alphaStrRad3 = drrr[3]
            lf_paint_eKrog_sinCos(ctx, "", xCircleCenter, yCircleCenter, radij, "180" + scStopinj + "+" + scAlpha, alpha2, alpha2Deg, alpha2StrDeg, alpha2StrRad3, "", 3)
        }
    }
    //==== PRAVILA: 4) PREHOD IV -> I
    else if (lo_showRules4to1) {
        if (alphaDeg > 0 && alphaDeg < 90) {
            alpha2 = 2 * Math.PI - alpha
            alpha2Deg = 360 + alphaDeg
            //lf_getAlphaStrings(alpha2, alpha2Deg, False, alpha2StrDeg, alpha2StrRad, alpha2StrRad2, alpha2StrRad3)
            drrr = lf_getAlphaStrings(alpha2, alpha2Deg, "")
            alphaStrDeg = drrr[0]
            alphaStrRad = drrr[1]
            alphaStrRad2 = drrr[2]
            alphaStrRad3 = drrr[3]
            lf_paint_eKrog_sinCos(ctx, "", xCircleCenter, yCircleCenter, radij, "-" + scAlpha, alpha2, alpha2Deg, alpha2StrDeg, alpha2StrRad3, "", 4)
        }
    }

    //==== RISANJE KRIVULJ SIN/COS IN/ALI TAN/COT
    //---- TOP
    let vl_graphTop = 50
    //---- LEFT
    let vl_graphLeft = lf_getGraphAreaLeft() //xCircleRight + 100
    //---- WIDTH
    const cv_marginRight = 20
    const cv_graphMidGapH = 60
    const cv_minGraphWidth = 100
    let vl_graphWidth = ctxW - vl_graphLeft - cv_marginRight
    if (lo_showFunGroup == cv_funGroup_all) { vl_graphWidth = (vl_graphWidth - cv_graphMidGapH) / 2 }
    if (vl_graphWidth < cv_minGraphWidth) { vl_graphWidth = cv_minGraphWidth }
    //---- HEIGHT
    const cv_marginBottom = 30
    const cv_graphMidGapV = 80
    const cv_minGraphHeight = 50
    let vl_graphHeight = (ctxH - vl_graphTop - cv_graphMidGapV - cv_marginBottom) / 2
    if (vl_graphHeight < cv_minGraphHeight) { vl_graphHeight = cv_minGraphHeight }

    //console.log("alphaStrRad2=" + alphaStrRad2)

    //---- Prikaz zahtevanih grafov
    switch (lo_showFunGroup) {
        case cv_funGroup_sinCos:
            //console.log("cv_funGroup_sinCos")
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop, vl_graphWidth, vl_graphHeight, cv_fun_sin, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop + vl_graphHeight + cv_graphMidGapV, vl_graphWidth, vl_graphHeight, cv_fun_cos, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            break
        case cv_funGroup_tanCot:
            //console.log("cv_funGroup_tanCot")
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop, vl_graphWidth, vl_graphHeight, cv_fun_tan, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop + vl_graphHeight + cv_graphMidGapV, vl_graphWidth, vl_graphHeight, cv_fun_cot, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            break
        case cv_funGroup_all:
            //console.log("cv_funGroup_all")
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop, vl_graphWidth, vl_graphHeight, cv_fun_sin, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            lf_paint_graph_single(ctx, vl_graphLeft, vl_graphTop + vl_graphHeight + cv_graphMidGapV, vl_graphWidth, vl_graphHeight, cv_fun_cos, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            lf_paint_graph_single(ctx, vl_graphLeft + vl_graphWidth + cv_graphMidGapH, vl_graphTop, vl_graphWidth, vl_graphHeight, cv_fun_tan, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            lf_paint_graph_single(ctx, vl_graphLeft + vl_graphWidth + cv_graphMidGapH, vl_graphTop + vl_graphHeight + cv_graphMidGapV, vl_graphWidth, vl_graphHeight, cv_fun_cot, alpha, alphaDeg, alphaStrRad2, lo_showZnacilniKoti, vl_znacilenKot, alpha2, alpha2Deg, alpha2StrRad2)
            break
    }

}

function lf_getAlphaFromCurrentMousePosition() {

    //======== ALFA
    //---- najprej X in Y koordinati miške v okviru pictureBox-a
    //let currentXpb = Cursor.Position.X - Me.Left - lo_frmBorderWidth - cv_privateFormBorder
    //let currentYpb = Cursor.Position.Y - Me.Top - lo_frmTitleBarHeight - cv_privateFormBorder //- lo_frmBorderWidth ... zgornji border je že vsebovan v lo_frmTitleBarHeight
    let currentXpb = lo_mouseMoveX
    let currentYpb = lo_mouseMoveY
    //---- razdalja miške od središèa enotskega kroga po X in po Y
    let kvadrant
    let dx, dy, alpha, alphaDeg
    dx = (currentXpb - xCircleCenter)
    dy = -(currentYpb - yCircleCenter)
    //console.log("dx=" + dx + " dy=" + dy)
    //if (dx > 0) {console.log("dx>0") }
    //g.DrawString(dx.ToString & " " & dy.ToString, mdSignFont10, Brushes.Black, currentXpb + 5, currentYpb - 8)
    //---- doloèanje kota alpha[rad] in kvadranta
    if (dx == 0) { //---- NAVPIÈNO
        if (dy >= 0) {
            kvadrant = 1
            alpha = Math.PI / 2
            //console.log("alpha11=" + alpha + "rad")
        }
        else {
            kvadrant = 3
            alpha = 3 * Math.PI / 2
            //console.log("alpha12=" + alpha + "rad")
        }
    }
    else if (dx > 0) { //---- DESNO
        if (dy >= 0) {
            kvadrant = 1
            alpha = Math.atan(dy / dx)
            //console.log("alpha21=" + alpha + "rad")
        }
        else {
            kvadrant = 4
            alpha = 2 * Math.PI + Math.atan(dy / dx)
            //console.log("alpha22=" + alpha + "rad")
        }
    }
    else { //---- LEVO
        if (dy >= 0) {
            kvadrant = 2
            alpha = Math.PI + Math.atan(dy / dx)
            //console.log("alpha31=" + alpha + "rad")
        }
        else {
            kvadrant = 3
            alpha = Math.PI + Math.atan(dy / dx)
            //console.log("alpha32=" + alpha + "rad")
        }
    }
    alphaDeg = alpha * 180 / Math.PI
    // ° ¶ ? ?
    //console.log("alphaDeg=" + alphaDeg + "°")

    //======== PREVERJANJE ZNAÈILNIH KOTOV 0,30,45,60,90
    let vl_znacilenKot = ""
    if (true) { //if (!window.event.ctrlKey) { ... test èe drži pritisnjeno tipko CTRL ... !TODO!
        if (lo_showZnacilniKoti) {
            vl_znacilenKot = true
            //console.log("vl_znacilenKot=" + vl_znacilenKot)
            let tmpAlphaDeg = 10 * Math.round((alphaDeg + 5) / 10)
            //console.log("tmpAlphaDeg=" + tmpAlphaDeg)
            if (tmpAlphaDeg == 50) {
                alphaDeg = tmpAlphaDeg - 5
                //console.log("tmpAlphaDeg=" + tmpAlphaDeg + " alphaDeg=" + alphaDeg)
            }
            else {
                tmpAlphaDeg = 10 * Math.round(alphaDeg / 10)
                switch (tmpAlphaDeg) {
                    case 0:
                        alphaDeg = tmpAlphaDeg
                        break
                    case 30:
                        alphaDeg = tmpAlphaDeg
                        break
                    case 60:
                        alphaDeg = tmpAlphaDeg
                        break
                    case 90:
                        alphaDeg = tmpAlphaDeg
                        break
                    default:
                        vl_znacilenKot = ""
                    //console.log("-- vl_znacilenKot=" + vl_znacilenKot)
                }
                //console.log("alphaDeg=" + alphaDeg)
            }
            alpha = alphaDeg * Math.PI / 180
            //console.log("alpha=" + alpha)
            //console.log("----")
        }
    }
    return [alpha, alphaDeg, kvadrant, vl_znacilenKot]
}

function lf_getGraphAreaLeft() { //xCircleRight + 100

    let vl_graphLeft = lo_xCircleCenter + radij + 100
    if (vl_graphLeft < 2 * radij + 100) { vl_graphLeft = 2 * radij + 100 }
    if (vl_graphLeft < 800) { vl_graphLeft = 800 }
    return vl_graphLeft

}

function lf_setCircleCenterPos() {
    let x = 70 + radij
    let y = ctxH - 100 - radij
    return [x, y]
}

function lf_paint_graph_single(ctx, vp_left, vp_top, vp_width, vp_height, vp_function, vp_alpha, vp_alphaDeg, vp_alphaStrRad, vp_showZnacilniKoti, vp_znacilenKot, vp_alpha2, vp_alpha2Deg, vp_alpha2StrRad) {

    //On Error GoTo labErr

    // èe se je COT() od enotskega kroga narisal daleè na desno v podroèje teh krivulj, potem tisto, kar je pod krivuljami, posivim
    if (vp_alpha <= Math.PI / 4 || vp_alpha > 7 * Math.PI / 4) {
        ctx.fillStyle = "#F5F5F5D0"
        ctx.fillRect(vp_left - 25, vp_top, vp_width + 60, vp_height)
        //console.log("posivljeno")
    } else {
        //console.log("ni posivljeno")
    }

    let vl_alpha0 = 0
    let vl_maxFunValue = 1
    switch (vp_function) {
        case cv_fun_sin:
            vl_alpha0 = 0
            vl_maxFunValue = 1
            break
        case cv_fun_cos:
            vl_alpha0 = 90
            vl_maxFunValue = 1
            break
        case cv_fun_tan:
            vl_alpha0 = 0
            vl_maxFunValue = 7
            break
        case cv_fun_cot:
            vl_alpha0 = 90
            vl_maxFunValue = 7
            break
    }
    let vl_alpha0rad = vl_alpha0 * Math.PI / 180
    let vl_xRight = vp_left + vp_width
    let vl_yXos = vp_top + vp_height / 2
    let vl_xYos = vp_left + 10
    const cv_marginUpDown = 5
    let vl_amplitude = vp_height / 2 - cv_marginUpDown
    let ky = vl_amplitude / vl_maxFunValue
    let vl_xDataEnd = vp_left + vp_width - 20
    let vl_xDataRange = vl_xDataEnd - vl_xYos
    let xData, yData, x, y

    //======== IZPIS FUNKCIJE
    switch (vp_function) {
        case cv_fun_sin: //SINUS
            gText("SIN(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, myColorSin, vp_left - 25, vp_top - 27)
            break
        case cv_fun_cos: //COSINUS
            gText("COS(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, myColorCos, vp_left - 25, vp_top - 27)
            break
        case cv_fun_tan: //TANGENS
            gText("TAN(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, myColorTan, vp_left - 25, vp_top - 27)
            break
        case cv_fun_cot: //KOTANGENS
            gText("COT(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, myColorCot, vp_left - 25, vp_top - 27)
            break
    }

    //======== KOT ALFA NA X OSI
    let vl_color = myColorAlphaGraph
    x = vl_xYos + vl_xDataRange * vp_alpha / 2 / Math.PI
    gLine(vl_xYos, vl_yXos, x, vl_yXos, 9, vl_color, [])
    if (vp_alpha2 != vp_alpha) {
        vl_color = myColorAlpha2graph
        x = vl_xYos + vl_xDataRange * vp_alpha2 / 2 / Math.PI
        gLine(vl_xYos, vl_yXos + 3, x, vl_yXos + 3, 9, vl_color, [])
    }

    //======== OSI
    gLine(vl_xYos, vl_yXos, vl_xRight, vl_yXos, 1, "darkSlateGray", [])
    gLine(vl_xYos, vl_yXos - vl_amplitude, vl_xYos, vl_yXos + vl_amplitude, 1, "darkSlateGray", [])

    //======== OZNAKA X OSI
    gText(scAlpha, myFontMathLabelsLargeBoldItalic, "darkSlateGray", vl_xRight - 9, vl_yXos + 12)


    //==== POMOŽNE LINIJE VREDNOSTI (SKUPNO ZA VSE 4 FUNCIJE)
    gLine(vl_xYos, vl_yXos - ky * 1, vl_xDataEnd, vl_yXos - ky * 1, 1, "lightGray", [5, 2])
    gLine(vl_xYos, vl_yXos + ky * 1, vl_xDataEnd, vl_yXos + ky * 1, 1, "lightGray", [5, 2])
    //==== OZNAKE VREDNOSTI NA Y OSI (SKUPNO ZA VSE 4 FUNCIJE)
    gLine(vl_xYos - 2, vl_yXos - ky * 1, vl_xYos + 2, vl_yXos - ky * 1, 1, "darkSlateGray", [])
    gLine(vl_xYos - 2, vl_yXos + ky * 1, vl_xYos + 2, vl_yXos + ky * 1, 1, "darkSlateGray", [])
    //==== VREDNOSTI NA Y OSI (SKUPNO ZA VSE 4 FUNCIJE)
    if ((vp_function == cv_fun_cos) && vp_showZnacilniKoti) {
        gText("1", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 14, vl_yXos - ky * 1 - 7)
    } else {
        gText("1", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 11, vl_yXos - ky * 1 - 7)
    }
    gText("-1", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 15, vl_yXos + ky * 1 - 7)
    if (vp_showZnacilniKoti && ((vp_function == cv_fun_sin) || (vp_function == cv_fun_tan))) {
        gText("0", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 14, vl_yXos - 7)
    } else {
        gText("0", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 11, vl_yXos - 7)
    }

    switch (vp_function) {

        case cv_fun_sin: case cv_fun_cos:
            //==== POMOŽNE LINIJE VREDNOSTI
            gLine(vl_xYos, Math.round(vl_yXos - ky * 0.5), vl_xDataEnd, Math.round(vl_yXos - ky * 0.5), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * 0.5), vl_xDataEnd, Math.round(vl_yXos + ky * 0.5), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos - ky * Math.sqrt(2) / 2), vl_xDataEnd, Math.round(vl_yXos - ky * Math.sqrt(2) / 2), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * Math.sqrt(2) / 2), vl_xDataEnd, Math.round(vl_yXos + ky * Math.sqrt(2) / 2), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos - ky * Math.sqrt(3) / 2), vl_xDataEnd, Math.round(vl_yXos - ky * Math.sqrt(3) / 2), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * Math.sqrt(3) / 2), vl_xDataEnd, Math.round(vl_yXos + ky * Math.sqrt(3) / 2), 1, "lightGray", [5, 2])
            //==== OZNAKE VREDNOSTI NA Y OSI
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * 0.5), vl_xYos + 2, Math.round(vl_yXos - ky * 0.5), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * 0.5), vl_xYos + 2, Math.round(vl_yXos + ky * 0.5), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * Math.sqrt(2) / 2), vl_xYos + 2, Math.round(vl_yXos - ky * Math.sqrt(2) / 2), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * Math.sqrt(2) / 2), vl_xYos + 2, Math.round(vl_yXos + ky * Math.sqrt(2) / 2), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * Math.sqrt(3) / 2), vl_xYos + 2, Math.round(vl_yXos - ky * Math.sqrt(3) / 2), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * Math.sqrt(3) / 2), vl_xYos + 2, Math.round(vl_yXos + ky * Math.sqrt(3) / 2), 1, "darkSlateGray", [])
            //==== VREDNOSTI NA Y OSI
            gText("1/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 24, vl_yXos - ky * 0.5 - 7)
            gText("-1/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 28, vl_yXos + ky * 0.5 - 7)
            gText(scKoren + "2/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 33, vl_yXos - ky * Math.sqrt(2) / 2 - 7)
            gText("-" + scKoren + "2/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 37, vl_yXos + ky * Math.sqrt(2) / 2 - 7)
            gText(scKoren + "3/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 33, vl_yXos - ky * Math.sqrt(3) / 2 - 7)
            gText("-" + scKoren + "3/2", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 37, vl_yXos + ky * Math.sqrt(3) / 2 - 7)
            break

        case cv_fun_tan: case cv_fun_cot:
            //==== POMOŽNE LINIJE VREDNOSTI
            gLine(vl_xYos, Math.round(vl_yXos - ky * Math.sqrt(3) / 3), vl_xDataEnd, Math.round(vl_yXos - ky * Math.sqrt(3) / 3), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * Math.sqrt(3) / 3), vl_xDataEnd, Math.round(vl_yXos + ky * Math.sqrt(3) / 3), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos - ky * Math.sqrt(3)), vl_xDataEnd, Math.round(vl_yXos - ky * Math.sqrt(3)), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * Math.sqrt(3)), vl_xDataEnd, Math.round(vl_yXos + ky * Math.sqrt(3)), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos - ky * 5), vl_xDataEnd, Math.round(vl_yXos - ky * 5), 1, "lightGray", [5, 2])
            gLine(vl_xYos, Math.round(vl_yXos + ky * 5), vl_xDataEnd, Math.round(vl_yXos + ky * 5), 1, "lightGray", [5, 2])
            //==== OZNAKE VREDNOSTI NA Y OSI
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * Math.sqrt(3) / 3), vl_xYos + 2, Math.round(vl_yXos - ky * Math.sqrt(3) / 3), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * Math.sqrt(3) / 3), vl_xYos + 2, Math.round(vl_yXos + ky * Math.sqrt(3) / 3), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * Math.sqrt(3)), vl_xYos + 2, Math.round(vl_yXos - ky * Math.sqrt(3)), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * Math.sqrt(3)), vl_xYos + 2, Math.round(vl_yXos + ky * Math.sqrt(3)), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos - ky * 5), vl_xYos + 2, Math.round(vl_yXos - ky * 5), 1, "darkSlateGray", [])
            gLine(vl_xYos - 2, Math.round(vl_yXos + ky * 5), vl_xYos + 2, Math.round(vl_yXos + ky * 5), 1, "darkSlateGray", [])
            //==== VREDNOSTI NA Y OSI
            gText(scKoren + "3/3", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 33, vl_yXos - ky * Math.sqrt(3) / 3 - 7)
            gText("-" + scKoren + "3/3", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 37, vl_yXos + ky * Math.sqrt(3) / 3 - 7)
            gText(scKoren + "3", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 24, vl_yXos - ky * Math.sqrt(3) - 7)
            gText("-" + scKoren + "3", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 28, vl_yXos + ky * Math.sqrt(3) - 7)
            gText("5", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 12, vl_yXos - ky * 5 - 7)
            gText("-5", myFontMathValuesSmall, "darkSlateGray", vl_xYos - 16, vl_yXos + ky * 5 - 7)
            break
    }


    //======== SIMETRALE ZA TAN/COT
    switch (vp_function) {
        case cv_fun_tan:
            x = vl_xYos + vl_xDataRange * 1 / 4 //**** simetrala pri 90 stopnj
            gLine(x, vl_yXos - vl_amplitude, x, vl_yXos + vl_amplitude, 1, "darkSlateGray", [6, 2])
            x = vl_xYos + vl_xDataRange * 3 / 4 //**** simetrala pri 270 stopnj
            gLine(x, vl_yXos - vl_amplitude, x, vl_yXos + vl_amplitude, 1, "darkSlateGray", [6, 2])
            break
        case cv_fun_cot:
            x = vl_xYos + vl_xDataRange / 2    //**** simetrala pri 180 stopnj
            gLine(x, vl_yXos - vl_amplitude, x, vl_yXos + vl_amplitude, 1, "darkSlateGray", [6, 2])
            x = vl_xYos + vl_xDataRange        //**** simetrala pri 360 stopnj
            gLine(x, vl_yXos - vl_amplitude, x, vl_yXos + vl_amplitude, 1, "darkSlateGray", [6, 2])
            break
    }
  
    //======== OZNAKE VREDNOSTI NA X OSI
    x = vl_xYos + vl_xDataRange * 1 / 4
    y = vl_yXos - 8
    gLine(x, vl_yXos - 2, x, vl_yXos + 2, 1, "darkSlateGray", [])
    if (vp_function == cv_fun_cos) {
        gText(scPI + "/2", myFontMathValuesSmall, "darkSlateGray", x - 2, y)
    } else {
        gText(scPI + "/2", myFontMathValuesSmall, "darkSlateGray", x - 11, y)
    }
    x = vl_xYos + vl_xDataRange / 2
    gLine(x, vl_yXos - 2, x, vl_yXos + 2, 1, "darkSlateGray", [])
    if (vp_function == cv_fun_cos) {
        gText(scPI, myFontMathValuesSmall, "darkSlateGray", x - 5, y)
    } else {
        gText(scPI, myFontMathValuesSmall, "darkSlateGray", x, y)
    }
    x = vl_xYos + vl_xDataRange * 3 / 4
    gLine(x, vl_yXos - 2, x, vl_yXos + 2, 1, "darkSlateGray", [])
    if (vp_function == cv_fun_cos) {
        gText("3" + scPI +"/2", myFontMathValuesSmall, "darkSlateGray", x - 28, y)
    } else {
        gText("3" + scPI + "/2", myFontMathValuesSmall, "darkSlateGray", x - 15, y)
    }
    x = vl_xYos + vl_xDataRange
    gLine(x, vl_yXos - 2, x, vl_yXos + 2, 1, "darkSlateGray", [])
    gText("2" + scPI, myFontMathValuesSmall, "darkSlateGray", x - 10, y)

    //======== RISANJE KRIVULJE GRAFA
    lf_paint_graph_single_graph(ctx, vp_function, vl_xDataRange, vl_xYos, vl_yXos, ky, vl_maxFunValue, vl_alpha0rad)

    //==== MARKERJI NA KROŽNICI ZA ZNAÈILNE KOTE
    if (lo_showZnacilniKoti) {
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 0, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 30, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 45, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 60, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 90, vl_xYos, vl_yXos, ky, vl_xDataRange)
    }

    //==== OZNAÈENA VELIKOST KOTNE FUNKCIJE ZA GLAVNI KOT ALFA
    let ret01 // v tej strukturi bo funkcija vrnila koordinate
    ret01 = lf_paint_graph_single_markFunValue(ctx, vl_xDataRange, vl_xYos, vl_yXos, ky, vp_function, vl_alpha0, vl_alpha0rad, vp_alpha, vp_alphaDeg, vp_showZnacilniKoti, vp_znacilenKot)
    xData = ret01[0]; yData = ret01[1]; x = ret01[2]; y = ret01[3]; 

    //==== Z DEBELO RDEÈO PIKO POUDAREK, DA SMO NA ZNAÈILNEM KOTU 0, 30, 45, 60 ali 90 STOPINJ, SICER NAVADEN SIV KROGEC
    if (vp_showZnacilniKoti && vp_znacilenKot) {
        //---- rdeè marker
        switch (vp_function) {
            case cv_fun_sin: case cv_fun_cos:
                gEllipse(x, y, 5, 5, 0, "", 3, "red")
                break;
            case cv_fun_tan:
                //console.log("vp_alphaDeg=" + vp_alphaDeg)
                switch (vp_alphaDeg) {
                    case 90: case 270:
                        //console.log("--vp_alphaDeg=" + vp_alphaDeg) ... problem je bil spet en manjkajoèi Break
                        break;
                    default:
                        gEllipse(x, y, 5, 5, 0, "", 3, "red")
                        break
                }
                break
            case cv_fun_cot:
                switch (vp_alphaDeg) {
                    case 0: case 180:
                        break
                    default:
                        gEllipse(x, y, 5, 5, 0, "", 3, "red")
                        break
                }
                break
        }
        //---- izpisana vrednost kota tik pod X osjo
        switch (vp_alphaDeg) {
            case 30: case 45: case 60:
                gText(vp_alphaStrRad, myFontMathValuesSmall, "darkSlateGray", x - 10, vl_yXos + 15)
                break
        }
    } else {
        //---- izpisana vrednost kota tik pod/nad X osjo
        if (yData >= 0) {
            gText(vp_alpha.toFixed(3), myFontMathValuesSmall, "darkSlateGray", x - 15, vl_yXos + 14)
        } else {
            gText(vp_alpha.toFixed(3), myFontMathValuesSmall, "darkSlateGray", x - 15, vl_yXos - 6)
        }
    }

    //==== OZNAÈEN SINUS/COSINUS ZA PRIMER KAKŠNEGA DODATNO VKLOPLJENEGA PRIKAZA PRAVILA
    if (vp_alpha2 != vp_alpha) {
        ret01 = lf_paint_graph_single_markFunValue(ctx, vl_xDataRange, vl_xYos, vl_yXos, ky, vp_function, vl_alpha0, vl_alpha0rad, vp_alpha2, vp_alpha2Deg, "", "")
        xData = ret01[0]; yData = ret01[1]; x = ret01[2]; y = ret01[3]; 
    }


    //Exit Sub
//labErr:
    //Exit Sub
    //Resume Next
}

function lf_paint_graph_single_markFunValue(ctx, vp_xDataRange, vp_xYos, vp_yXos, vp_ky, vp_function, vp_alpha0, vp_alpha0rad, vp_alpha, vp_alphaDeg, vp_showZnacilniKoti, vp_znacilenKot) { 

    let x, y, xData, yData

    //==== OZNAÈEN SINUS/COSINUS
    xData = vp_xDataRange * vp_alpha / 2 / Math.PI
    x = vp_xYos + xData
    //----
    let vl_funValue  //vrednost kotne funkcije
    switch (vp_function) {
        case cv_fun_sin: case cv_fun_cos:
            vl_funValue = Math.sin(vp_alpha + vp_alpha0rad)
            break
        case cv_fun_tan:
            switch (vp_alphaDeg) {
                case 90: case 270:
                    return [xData, 0, x, 0]
                default:
                    vl_funValue = Math.tan(vp_alpha)
            }
            break
        case cv_fun_cot:
            switch (vp_alphaDeg) {
                case 0: case 180:
                    return [xData, 0, x, 0]
                default:
                    vl_funValue = 1 / Math.tan(vp_alpha)
            }
    }
    yData = vp_ky * vl_funValue //za toliko gor ali dol od X osi
    y = vp_yXos - yData //y koordinata v oknu
    //----
    let tmpColor = "darkSlateGray"
    switch (vp_function) {
        case cv_fun_sin: //SINUS
            gLine(vp_xYos - 2, y, x + 2, y, 1, myColorSinLight, [2, 5])
            gLine(x, vp_yXos, x, y, 7, myColorSin, [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, myColorSinLight, [])
            tmpColor = myColorSin
            break
        case cv_fun_cos: //COSINUS
            gLine(vp_xYos - 2, y, x + 2, y, 1, myColorCosLight, [2, 5])
            gLine(x, vp_yXos, x, y, 7, myColorCos, [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, myColorCosLight, [])
            tmpColor = myColorCos
            break
        case cv_fun_tan: //TANGENS
            gLine(vp_xYos - 2, y, x + 2, y, 1, myColorTanLight, [2, 5])
            gLine(x, vp_yXos, x, y, 7, myColorTan, [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, myColorTanLight, [])
            tmpColor = myColorTan
            break
        case cv_fun_cot: //KOTANGENS
            gLine(vp_xYos - 2, y, x + 2, y, 1, myColorCotLight, [2, 5])
            gLine(x, vp_yXos, x, y, 7, myColorCot, [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, myColorCotLight, [])
            tmpColor = myColorCot
            break
    }
    if (yData >= 0) {
        if (vp_showZnacilniKoti && vp_znacilenKot) {
            gText(vl_funValue.toFixed(3), myFontMathValuesSmall, tmpColor, x - 17, y - 7)
        } else {
            gText(vl_funValue.toFixed(3), myFontMathValuesSmall, tmpColor, x - 17, y - 4)
        }
    } else {
        if (vp_showZnacilniKoti && vp_znacilenKot) {
            gText(vl_funValue.toFixed(3), myFontMathValuesSmall, tmpColor, x - 17, y + 17)
        } else {
            gText(vl_funValue.toFixed(3), myFontMathValuesSmall, tmpColor, x - 17, y + 14)
        }
    }
    return [xData, yData, x, y]
}


function lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vp_alpha0rad, vp_alphaDeg, vp_xYos, vp_yXos, vp_ky, vp_xDataRange) {

    let vl_alpha = vp_alphaDeg * Math.PI / 180
    let x = vp_xYos + vp_xDataRange * vl_alpha / 2 / Math.PI
    let y
    let draw = true
    //console.log("vp_function=" + vp_function + " alphaDeg=" + alphaDeg)
    switch (vp_function) {
        case cv_fun_sin:
            y = vp_yXos - vp_ky * Math.sin(vl_alpha + vp_alpha0rad)
            break
        case cv_fun_cos:
            y = vp_yXos - vp_ky * Math.sin(vl_alpha + vp_alpha0rad)
            break
        case cv_fun_tan:
            //console.log("alphaDeg=" + alphaDeg)
            if (vp_alphaDeg == 90) {
                draw = ""
                break
            }
            y = vp_yXos - vp_ky * Math.tan(vl_alpha)
            break
        case cv_fun_cot:
            if (vp_alphaDeg == 0) {
                draw = ""
                break
            }
            y = vp_yXos - vp_ky / Math.tan(vl_alpha)
            break
    }
    if (draw) { gEllipse(x, y, 5, 5, 0, "gray", 0, "" ) }
}

function lf_paint_graph_single_graph(ctx, vp_function, vp_xDataRange, vp_xYos, vp_yXos, vp_ky, vp_maxFunValue, vp_alpha0rad) {

    let alpha, xData, yData, vl_funValue
    let x0, y0, x, y
    let vl_funValueValid0, vl_funValueValid

    //==== SINUSOIDA
    let nrSteps = vp_xDataRange
    if (nrSteps < 100) { nrSteps = 100 }
    for (let vl_step = 0; vl_step <= nrSteps; vl_step++) {
        alpha = 2 * Math.PI * vl_step / nrSteps
        xData = vp_xDataRange * vl_step / nrSteps
        x = vp_xYos + xData
        switch (vp_function) {
            case cv_fun_sin: case cv_fun_cos:
                //console.log(x)
                vl_funValue = Math.sin(alpha + vp_alpha0rad)
                vl_funValueValid = true
                break
            case cv_fun_tan:
                switch (alpha) {
                    case (Math.PI / 2): case (3 * Math.PI / 2):
                        vl_funValue = 1000
                        vl_funValueValid = ""
                        break
                    default:
                        vl_funValue = Math.tan(alpha)
                        vl_funValueValid = true
                        if (Math.abs(vl_funValue) > vp_maxFunValue) { vl_funValueValid = "" }
                        break
                }
                break
            case cv_fun_cot:
                switch (alpha) {
                    case 0: case Math.PI:
                        vl_funValue = 1000
                        vl_funValueValid = ""
                        break
                    default:
                        vl_funValue = 1 / Math.tan(alpha)
                        vl_funValueValid = true
                        if (Math.abs(vl_funValue) > vp_maxFunValue) { vl_funValueValid = "" }
                        break
                }
                break
        }
        yData = vp_ky * vl_funValue
        y = vp_yXos - yData
        if (vl_step > 0) {
            if (vl_funValueValid0 && vl_funValueValid) {
                gLine(x0, y0, x, y, 1, "darkSlateGray", [])
            }
        }
        x0 = x
        y0 = y
        vl_funValueValid0 = vl_funValueValid
    }
}


function lf_determineFunGroup() {

    let vl_oldShowFunGroup = lo_showFunGroup
    let vl_funGroupChanged = ""

    //if (checkFunGroupSinCos.Checked) {
    if (lo_showGraphSinCos) {
        //if (checkFunGroupTanCot.Checked) {
        if (lo_showGraphTanCot) {
            lo_showFunGroup = cv_funGroup_all
        }
        else {
            lo_showFunGroup = cv_funGroup_sinCos
        }
    }
    else {
        //if (checkFunGroupTanCot.Checked) {
        if (lo_showGraphTanCot) {
            lo_showFunGroup = cv_funGroup_tanCot
        }
        else {
            lo_showFunGroup = cv_funGroup_none
        }
    }
    if (lo_showFunGroup != vl_oldShowFunGroup) { vl_funGroupChanged = true }
    //console.log("old=" + vl_oldShowFunGroup + " new=" + lo_showFunGroup + " changed=" + vl_funGroupChanged + " sinCos=" + lo_showGraphSinCos + " tanCot=" + lo_showGraphTanCot)
    return vl_funGroupChanged
}

function lf_paint_eKrog_sinCos(ctx, vp_basicChart, xCircleCenter, yCircleCenter, radij, vp_alphaLabel, alpha, alphaDeg, alphaStrDeg, alphaStrRad3, vl_znacilenKot, kvadrant) {

    let tmpStr, tmpValueStr
    let tmpWidth, tmpHeight
    let x, y
    let vl_color
    let xPointOnCircle, yPointOnCircle
    let font, wh, wh2

    //console.log("alpha=" + alpha )

    xPointOnCircle = xCircleCenter + radij * Math.cos(alpha)
    yPointOnCircle = yCircleCenter - radij * Math.sin(alpha)

    //======== POSIVITEV TRIKOTNIKA
    if (vp_basicChart) {
        //let x = vl_color.red
        //console.log(x)
        //vl_color = gf_alphaColor(32, Color.Gold) '!TODO!
        ctx.fillStyle = "#FFD70020"//"gold" ... gold with alpha=32
        ctx.beginPath()
        //console.log("xCircleCenter=" + xCircleCenter + " yCircleCenter=" + yCircleCenter + " xPointOnCircle=" + xPointOnCircle + " yPointOnCircle=" + yPointOnCircle)
        ctx.moveTo(xCircleCenter, yCircleCenter)
        ctx.lineTo(xPointOnCircle, yCircleCenter)
        ctx.lineTo(xPointOnCircle, yPointOnCircle)
        ctx.fill() //oklepaja obvezna!!!
        ctx.closePath()
    }

    //======== IZPIS ŠTEVILÈNE VREDNOSTI KOTA
    if (vp_basicChart) {
        font = "bold 11pt cambria"
        vl_color = "darkSlateGray"
        gText(alphaStrDeg, font, vl_color, xCircleCenter + 3, yCircleCenter - 6)
        gText(alphaStrRad3, font, vl_color, xCircleCenter + 3, yCircleCenter - 24)
        tmpStr = scAlpha + ":    " + alphaStrDeg + "    " + alphaStrRad3 // !DONE! printanje posebnih znakov alfa pi koren stopinje
        font = "bold 16pt cambria"
        gText(tmpStr, font, vl_color, 420, 30)
    }

    //======== PIZZA SLICE ZA KOT
    if (vp_basicChart) { vl_color = myColorAlphaEKrog } else { vl_color = myColorAlpha2eKrog } //lightSalmon ali darkKhaki
    let radijKot = 0.45 * radij
    if (radijKot > 120) { radijKot = 120 }
    if ((radijKot > 40) && (!vp_basicChart)) { radijKot -= 30 }
    gArc(xCircleCenter, yCircleCenter, radijKot, 0, alpha, vl_color, 0, "")

    //======== ÈRTA KOTA
    if (vp_basicChart && lo_showTanCot) {
        let kExtra = 1.05
        if (alphaDeg == 360 || alphaDeg == 0) {
            x = xCircleCenter + kExtra * radij
            y = yCircleCenter
        }
        else if (alphaDeg == 90) {
            x = xCircleCenter
            y = yCircleCenter - kExtra * radij
        }
        else if (alphaDeg == 180) {
            x = xCircleCenter - kExtra * radij
            y = yCircleCenter
        }
        else if (alphaDeg == 270) {
            x = xCircleCenter
            y = yCircleCenter + kExtra * radij
        }
        else if (alphaDeg > 0 && alphaDeg <= 45) {
            x = xCircleCenter + kExtra * radij / Math.tan(alpha)
            y = yCircleCenter - kExtra * radij
        }
        else if (alphaDeg > 45 && alphaDeg < 90) {
            x = xCircleCenter + kExtra * radij
            y = yCircleCenter - radij * kExtra * Math.tan(alpha)
        }
        else if (alphaDeg > 90 && alphaDeg <= 135) {
            x = xCircleCenter - kExtra * radij
            y = yCircleCenter + radij * kExtra * Math.tan(alpha)
        }
        else if (alphaDeg > 135 && alphaDeg < 180) {
            x = xCircleCenter + kExtra * radij / Math.tan(alpha)
            y = yCircleCenter - radij * kExtra
        }
        else if (alphaDeg > 180 && alphaDeg <= 225) {
            x = xCircleCenter - kExtra * radij / Math.tan(alpha)
            y = yCircleCenter + kExtra * radij
        }
        else if (alphaDeg > 225 && alphaDeg < 270) {
            x = xCircleCenter - kExtra * radij
            y = yCircleCenter + radij * kExtra * Math.tan(alpha)
        }
        else if (alphaDeg > 270 && alphaDeg <= 315) {
            x = xCircleCenter + kExtra * radij
            y = yCircleCenter - radij * kExtra * Math.tan(alpha)
        }
        else if (alphaDeg > 315 && alphaDeg <= 360) {
            x = xCircleCenter - kExtra * radij / Math.tan(alpha)
            y = yCircleCenter + radij * kExtra
        }
    }
    else {
        x = xCircleCenter + 1.15 * radij * Math.cos(alpha)
        y = yCircleCenter - 1.15 * radij * Math.sin(alpha)
    }
    //gLine(lf_myPen(Color.Gray, 1), xCircleCenter, yCircleCenter, x, y)
    gLine(xCircleCenter, yCircleCenter, x, y, 1, "gray", [])

    //======== OZNAÈBA PRAVEGA KOTA
    if ((alphaDeg >= 4 && alphaDeg <= 86) || (alphaDeg >= 94 && alphaDeg <= 176) || (alphaDeg >= 184 && alphaDeg <= 266) || (alphaDeg >= 274 && alphaDeg <= 356)) { 
        let signCos, signSin 
        signCos = Math.cos(alpha) / Math.abs(Math.cos(alpha))
        signSin = Math.sin(alpha) / Math.abs(Math.sin(alpha))
        gLine(xPointOnCircle - signCos * 10, yCircleCenter - signSin * 18, xPointOnCircle, yCircleCenter - signSin * 18, 2, "gray", [])
        gLine(xPointOnCircle - signCos * 10, yCircleCenter, xPointOnCircle - signCos * 10, yCircleCenter - signSin * 18, 2, "gray", [])
    }

    //======== POUDARJENA SINUS IN COSINUS KRAKA TRIKOTNIKA
    gLine(xCircleCenter, yCircleCenter, xPointOnCircle, yCircleCenter, 5, myColorCos, [])
    gLine(xCircleCenter, yPointOnCircle, xPointOnCircle, yPointOnCircle, 1, myColorCosLight, [3, 3])
    //----
    gLine(xCircleCenter, yCircleCenter, xCircleCenter, yPointOnCircle, 2, myColorSin, [])
    gLine(xPointOnCircle, yCircleCenter, xPointOnCircle, yPointOnCircle, 5, myColorSin, [])

    //======== Z DEBELO RDEÈO PIKO POUDAREK, DA SMO NA ZNAÈILNEM KOTU 0, 30, 45, 60 ali 90 STOPINJ, SICER NAVADEN SIV KROGEC
    if (vl_znacilenKot) {
        gEllipse(xPointOnCircle, yPointOnCircle, 5, 5, 0, "", 4, "red")
    }
    else {
        gEllipse(xPointOnCircle, yPointOnCircle, 4, 4, 0, "", 4, "darkSlategray")
    }

    //======== OZNAKA DOLŽINE RADIJA 1 NA ÈRTI KOTA
    let alpha2 
    if (kvadrant == 1 || kvadrant == 3) {
        alpha2 = alpha + 3 * Math.PI / 180
    }
    else {
        alpha2 = alpha - 3 * Math.PI / 180
    }
    x = xCircleCenter + 0.53 * radij * Math.cos(alpha2)
    y = yCircleCenter - 0.53 * radij * Math.sin(alpha2)
    gText("1", "bold 11pt cambria", "darkSlateGray", x - 6, y + 3)

    //======== IZPIS "SIN" in "COS", TER VREDNOSTI KOTNIH FUNKCIJ NA OSEH IN NA ODEBELJENIH KRAKIH TRIKOTNIKA
    let tmpWidth2, tmpHeight2
    x = xCircleCenter + radij * Math.cos(alpha)
    y = yCircleCenter - 0.5 * radij * Math.sin(alpha)
    tmpStr = "SIN (" + vp_alphaLabel + ")"
    wh = gMeasureText(tmpStr, "bold 11pt cambria");
    tmpWidth = wh[0]; tmpHeight = wh[1]; 
    tmpValueStr = Math.sin(alpha).toFixed(3) //Format(Math.sin(alpha), "0.000")
    if (vl_znacilenKot) {
        switch (alphaDeg) {
            case 0:
                tmpValueStr = "0"
                break
            case 30:
                tmpValueStr = "1/2"
                break
            case 45:
                tmpValueStr = scKoren + "2/2"
                break
            case 60:
                tmpValueStr = scKoren + "3/2"
                break
            case 90:
                tmpValueStr = "1"
                break
        }
    }
    wh2 = gMeasureText(tmpValueStr, "normal 10pt cambria");
    tmpWidth2 = wh2[0]; tmpHeight2 = wh2[1]; 
    if (kvadrant == 1 || kvadrant == 4) {
        gText(tmpStr, myFontMathLabels, myColorSin, x + 4, y - 6)
        gText("= " + tmpValueStr, myFontMathValues, myColorSin, x + 4, y + 11)
        if (vp_basicChart) {
            gText(tmpValueStr, myFontMathValuesSmall, myColorSin, xCircleCenter - tmpWidth2 - 3, yPointOnCircle - tmpHeight2 / 2)
        }
    }
    else {
        gText(tmpStr, myFontMathLabels, myColorSin, x - 3 - tmpWidth, y - 8)
        gText("= " + tmpValueStr, myFontMathValues, myColorSin, x - 3 - tmpWidth - 6, y + 9)
        if (vp_basicChart) {
            gText(tmpValueStr, myFontMathValuesSmall, myColorSin, xCircleCenter + 3, yPointOnCircle - tmpHeight2 / 2)
        }
    }
    //----
    x = xCircleCenter + 0.5 * radij * Math.cos(alpha)
    y = yCircleCenter
    tmpStr = "COS (" + vp_alphaLabel + ")"
    wh = gMeasureText(tmpStr, myFontMathLabels);
    tmpWidth = wh[0]; tmpHeight = wh[1]; 
    tmpValueStr = Math.cos(alpha).toFixed(3) //Format(Math.Cos(alpha), "0.000")
    if (vl_znacilenKot) {
        switch (alphaDeg) {
            case 0:
                tmpValueStr = "1"
                break
            case 30:
                tmpValueStr = scKoren + "3/2"
                break
            case 45:
                tmpValueStr = scKoren + "2/2"
                break
            case 60:
                tmpValueStr = "1/2"
                break
            case 90:
                tmpValueStr = "0"
                break
        }
    }
    wh2 = gMeasureText(tmpValueStr, myFontMathValuesSmall);
    tmpWidth2 = wh2[0]; tmpHeight2 = wh2[1]; 
    if (kvadrant == 1 || kvadrant == 2) {
        gText(tmpStr, myFontMathLabels, myColorCos, x - tmpWidth / 2, y + 17)
        gText("= " + tmpValueStr, myFontMathValues, myColorCos, x - tmpWidth / 2, y + 34)
        gText(tmpValueStr, myFontMathValuesSmall, myColorCos, xPointOnCircle - tmpWidth2 / 2, yCircleCenter + 15)
    }
    else {
        gText(tmpStr, myFontMathLabels, myColorCos, x - tmpWidth / 2, y - 3 - tmpHeight)
        gText(tmpValueStr, myFontMathValuesSmall, myColorCos, xPointOnCircle - tmpWidth2 / 2, yCircleCenter - tmpHeight2 )
    }




    //myFontMathLabels = New Drawing.Font("Cambria", 11, FontStyle.Bold)
    //myFontMathLabelsBig = New Drawing.Font("Cambria", 14, FontStyle.Bold)
    //myFontMathLabelsLargeItalic = New Drawing.Font("Cambria", 14, FontStyle.Italic)
    //myFontMathValues = New Drawing.Font("Cambria", 10, FontStyle.Bold)
    //myFontMathValuesSmall = New Drawing.Font("Cambria", 10, FontStyle.Regular)


}

function lf_paint_eKrog_tanCot(ctx, vp_basicChart, xCircleCenter, yCircleCenter, radij, vp_alphaLabel, alpha, alphaDeg, alphaStrDeg, alphaStrRad3, vl_znacilenKot, kvadrant) {

    let tmpStr, tmpValueStr
    let tmpWidth, tmpHeight, tmpWidth2, tmpHeight2
    let x, y
    let vl_color
    let xPointOnCircle, yPointOnCircle
    let font, wh, wh2
    let xCircleRight = xCircleCenter + radij
    let xCircleLeft = xCircleCenter - radij
    let yCircleTop = yCircleCenter - radij
    let yCircleBottom = yCircleCenter + radij
    let kTmp, tmpVal

    //======== TANGENS
    if (lo_showTanCot) {
        let xPointTan, yPointTan, vDiff, signTan
        if (alphaDeg == 90 || alphaDeg == 270) { }
        else {
            signTan = 1
            if (alphaDeg != 0) { signTan = Math.tan(alpha) / Math.abs(Math.tan(alpha)) }
            //---- labela
            tmpStr = "TAN (" + scAlpha + ")"
            wh = gMeasureText(tmpStr, myFontMathLabels);
            tmpWidth = wh[0]; tmpHeight = wh[1];
            tmpVal = Math.abs(Math.tan(alpha))
            if (tmpVal >= 0 && tmpVal <= 0.6) {
                kTmp = (1 - tmpVal / 0.6)
                vDiff = 0.5 * radij * Math.tan(alpha) * (1 + kTmp) + kTmp * 28 * signTan
            }
            else {
                vDiff = 0.5 * radij * Math.tan(alpha)
            }
            if (Math.abs(vDiff) > 0.9 * radij) { vDiff = 0.9 * radij * signTan }
            //---- vrednost
            tmpValueStr = Math.tan(alpha).toFixed(3); // Format(Math.Tan(alpha), "##0.000")
            if (vl_znacilenKot) {
                tmpValueStr = "= "
                switch (alphaDeg) {
                    case 0:
                        tmpValueStr += "0"
                        break
                    case 30:
                        tmpValueStr += (scKoren + "3/3")
                        break
                    case 45:
                        tmpValueStr += "1"
                        break
                    case 60:
                        tmpValueStr += (scKoren + "3")
                        break
                }
            }
            wh2 = gMeasureText(tmpValueStr, myFontMathValuesSmall);
            tmpWidth2 = wh2[0]; tmpHeight2 = wh2[1];
            if (kvadrant == 1 || kvadrant == 4) {
                xPointTan = xCircleRight + 1
                yPointTan = yCircleCenter - radij * Math.tan(alpha)
                gLine(xCircleRight + 1, yCircleCenter, xPointTan, yPointTan, 5, myColorTan, [])
                y = yCircleCenter - vDiff
                gText(tmpStr, myFontMathLabels, myColorTan, xPointTan + 7, y - 7)
                gText(tmpValueStr, myFontMathValues, myColorTan, xPointTan + 7, y + 10)
            }
            else {
                xPointTan = xCircleLeft
                yPointTan = yCircleCenter + radij * Math.tan(alpha)
                gLine(xCircleLeft, yCircleCenter, xPointTan, yPointTan, 5, myColorTan, [])
                y = yCircleCenter + vDiff
                gText(tmpStr, myFontMathLabels, myColorTan, xPointTan - tmpWidth - 7, y - 7)
                gText(tmpValueStr, myFontMathValues, myColorTan, xPointTan - tmpWidth2 - 11, y + 10)
            }
        }
    }

    //======== KOTANGENS
    if (lo_showTanCot) {
        let xPointCtg, yPointCtg, hDiff, signCtg
        if (alphaDeg == 0 || alphaDeg == 180 || alphaDeg == 360) { }
        else { 
            signCtg = 1
            if (alphaDeg != 90 && alphaDeg != 270) { signCtg = Math.tan(alpha) / Math.abs(Math.tan(alpha)) }
            //---- labela
            tmpStr = "COT (" + scAlpha + ")"
            wh = gMeasureText(tmpStr, myFontMathLabels);
            tmpWidth = wh[0]; tmpHeight = wh[1];
            hDiff = radij / Math.tan(alpha) / 2
            if (Math.abs(hDiff) > 0.9 * radij) { hDiff = 0.9 * radij * signCtg }
            //---- vrednost
            tmpValueStr = (1/Math.tan(alpha)).toFixed(3); //Format(1 / Math.tan(alpha), "0.000")
            if (vl_znacilenKot) {
                switch (alphaDeg) {
                    case 30:
                        tmpValueStr = scKoren + "3"
                        break
                    case 45:
                        tmpValueStr = "1"
                        break
                    case 60:
                        tmpValueStr = scKoren + "3/3"
                        break
                    case 90:
                        tmpValueStr = "0"
                        break
                }
            }
            wh2 = gMeasureText(tmpValueStr, myFontMathValuesSmall);
            tmpWidth2 = wh2[0]; tmpHeight2 = wh2[1];
            //----
            tmpStr = "COT (" + scAlpha + ") = " + tmpValueStr
            wh = gMeasureText(tmpStr, myFontMathLabels);
            tmpWidth = wh[0]; tmpHeight = wh[1];
            hDiff = radij / Math.tan(alpha) / 2
            if (Math.abs(hDiff) > 0.9 * radij) { hDiff = 0.9 * radij * (Math.tan(alpha) / Math.abs(Math.tan(alpha))) }
            //let graphAreaLeft = lf_getGraphAreaLeft()
            //console.log("graphAreaLeft=" + graphAreaLeft)
            //let kTmp
            if (kvadrant == 1 || kvadrant == 2) {
                xPointCtg = xCircleCenter + radij / Math.tan(alpha)
                yPointCtg = yCircleTop - 1
                //if (xPointCtg > graphAreaLeft) {
                    //kTmp = (graphAreaLeft - xCircleCenter) / (xPointCtg - xCircleCenter)
                    //gLine(xCircleCenter, yCircleTop - 1, graphAreaLeft, yCircleTop - 1 , 5, myColorCot, [])
                    //gLine(graphAreaLeft, yCircleTop - 1, xPointCtg, yCircleTop - 1, 25, "#05F5F5C0", [])
                    //gLine(graphAreaLeft, yCircleTop - 1, xPointCtg, yCircleTop - 1, 5, myColorCot, [])
                //} else {
                    //gLine(xCircleCenter, yCircleTop - 1, xPointCtg, yPointCtg, 5, myColorCot, [])
                //}
                gLine(xCircleCenter, yCircleTop - 1, xPointCtg, yPointCtg, 5, myColorCot, [])
                x = xCircleCenter + hDiff - tmpWidth / 2
                y = yCircleTop - tmpHeight - 3
                gText(tmpStr, myFontMathLabels, myColorCot, x, y+2)
            }
            else {
                xPointCtg = xCircleCenter - radij / Math.tan(alpha)
                yPointCtg = yCircleBottom + 1
                gLine(xCircleCenter, yCircleBottom + 1, xPointCtg, yPointCtg, 5, myColorCot, [])
                x = xCircleCenter - hDiff - tmpWidth / 2
                y = yCircleBottom + 4
                gText(tmpStr, myFontMathLabels, myColorCot, x, y+15)
            }
        }
    }

}

function gf_alphaColor(vp_alpha, vp_color) {
    return colorToHexRGB(vp_color) + byteToHex(vp_alpha)
}


//function lf_getAlphaStrings(alpha, alphaDeg, vp_znacilenKot, alphaStrDeg, alphaStrRad, alphaStrRad2, alphaStrRad3)
function lf_getAlphaStrings(alpha, alphaDeg, vp_znacilenKot) {

    //let alphaStrDeg = Format(alphaDeg, "###0.0") & "°"
    let alphaStrDeg = alphaDeg.toFixed(2) + scStopinj //"°"
    //let alphaStrRad = Format(alpha, "##0.00") & " rad"
    let alphaStrRad = alpha.toFixed(3) + " rad"
    let alphaStrRad2 = alphaStrRad
    let alphaStrRad3 = alphaStrRad
    // ° ? ? 
    if (vp_znacilenKot) {
        switch (alphaDeg) {
            case 0:
                alphaStrDeg = "0" + scStopinj
                alphaStrRad2 = "0 rad"
                alphaStrRad3 = "0 rad"
                break
            case 30:
                alphaStrDeg = "30" + scStopinj
                alphaStrRad2 = scPI + "/6"
                break
            case 45:
                alphaStrDeg = "45" + scStopinj
                alphaStrRad2 = scPI + "/4"
                break
             case 60:
                alphaStrDeg = "60" + scStopinj
                alphaStrRad2 = scPI + "/3"
                break
             case 90:
                alphaStrDeg = "90" + scStopinj
                alphaStrRad2 = scPI + "/2"
                break
        }
        if (alphaDeg > 0) {
            alphaStrRad3 = alphaStrRad + " = " + alphaStrRad2
        }
    }
    return [alphaStrDeg, alphaStrRad, alphaStrRad2, alphaStrRad3]
}

window.onresize = function (event) {
    resizeCanvas();
    paint();
};

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function colorToRGBA(color) {
    //https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // colorToRGBA('red')  -> [255, 0, 0, 255]
    // colorToRGBA('#f00') -> [255, 0, 0, 255]
    ctxConvertColors.fillStyle = color;
    ctxConvertColors.fillRect(0, 0, 1, 1);
    return ctxConvertColors.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
    // Turns a number (0-255) into a 2-character hex number (00-FF)
    return ('0' + num.toString(16)).slice(-2).toUpperCase();
}

function colorToHexRGB(color) {
    //https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
    // Convert any CSS color to a hex representation
    // colorToHexRGB('red')            # '#FF0000'
    // colorToHexRGB('rgb(255, 0, 0)') # '#FF0000'
    let rgba = colorToRGBA(color);
    let hex = [0, 1, 2].map(function (idx) { return byteToHex(rgba[idx]); }).join('');
    //console.log("color=" + color + " -> rgba=" + rgba + " -> " + ("#" + hex))
    return "#" + hex;
}

function colorToHexRGBA(color) {
    //https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
    // Convert any CSS color to a hex representation
    // colorToHexRGB('red')            # '#FF0000'
    // colorToHexRGB('rgb(255, 0, 0)') # '#FF0000'
    let rgba = colorToRGBA(color);
    let hex = [0, 1, 2, 3].map( function (idx) { return byteToHex(rgba[idx]); }).join('');
    //console.log("color=" + color + " -> rgba=" + rgba + " -> " + ("#" + hex))
    return "#" + hex;
}

function colorDecR(color) {
    let rgba = colorToRGBA(color);
    return rgba[0]
}
function colorDecG(color) {
    let rgba = colorToRGBA(color);
    return rgba[1]
}
function colorDecB(color) {
    let rgba = colorToRGBA(color);
    return rgba[2]
}
function colorDecA(color) {
    let rgba = colorToRGBA(color);
    return rgba[3]
}

function colorHexR(color) {
    let rgba = colorToRGBA(color);
    return byteToHex(rgba[0])
}
function colorHexG(color) {
    let rgba = colorToRGBA(color);
    return byteToHex(rgba[1])
}
function colorHexB(color) {
    let rgba = colorToRGBA(color);
    return byteToHex(rgba[2])
}
function colorHexA(color) {
    let rgba = colorToRGBA(color);
    return byteToHex(rgba[3])
}

function colorFromARGB(A, R, G, B) {
    return "#" + byteToHex(R) + byteToHex(G) + byteToHex(B) + byteToHex(A)
}



function gEllipse(x, y, radiusX, radiusY, rotation, fillColor, strokeWidth, strokeColor) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI, true);
    if (fillColor != "") {
        ctx.fillStyle = fillColor;
        ctx.fill(); //sedaj pa jo nafilaj tako
    }
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
}

function gArc(x, y, radius, startAngle, endAngle, fillColor, strokeWidth, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, -startAngle, -endAngle, true);
    if (fillColor != "") {
        ctx.fillStyle = fillColor;
        ctx.fill(); //sedaj pa jo nafilaj tako, oklepaja tukaj obvezna!!!
    }
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
    ctx.closePath();
}

function gLine(x0, y0, x1, y1, width, color, dash) {
    //ctx.setLineDash([5, 5]); //dashed    ctx.setLineDash([]); //solid  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    //if (dash2 == 0) { ctx.setLineDash([]); } else { ctx.setLineDash([3, 3]); }
    ctx.setLineDash(dash);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
}

function gText(text, font, color, x, y) {
    ctx.font = font
    ctx.fillStyle = color
    ctx.fillText(text, x, y)
}

function gMeasureText(text, font) {
    ctx.font = font
    let msrText = ctx.measureText(text);
    //let tmpWidth = msrText.width;
    //let tmpHeight = msrText.actualBoundingBoxAscent;
    return [msrText.width, msrText.actualBoundingBoxAscent]
}

function gBannerRectWithText(x0, y0, x1, y1, dd, fillColor, strokeWidth, strokeColor, font, fontColor, tmpStr, shaddowColor, xShaddow, yShaddow) {

    let top = y0 - dd
    let left = x0 - dd
    let bottom = y1 + dd
    let right = x1 + dd
    //----
    if (shaddowColor != "") {
        ctx.beginPath()
        ctx.moveTo(x0 + xShaddow, top + yShaddow)
        ctx.lineTo(left + xShaddow, y0 + yShaddow)
        ctx.lineTo(left + xShaddow, y1 + yShaddow)
        ctx.lineTo(x0 + xShaddow, bottom + yShaddow)
        ctx.lineTo(x1 + xShaddow, bottom + yShaddow)
        ctx.lineTo(right + xShaddow, y1 + yShaddow)
        ctx.lineTo(right + xShaddow, y0 + yShaddow)
        ctx.lineTo(x1 + xShaddow, top + yShaddow)
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleèi èrte, ampak samo zapreš pot
        ctx.fillStyle = shaddowColor
        ctx.fill()
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        ctx.beginPath()
        ctx.moveTo(x0, top)
        ctx.lineTo(left, y0)
        ctx.lineTo(left, y1)
        ctx.lineTo(x0, bottom)
        ctx.lineTo(x1, bottom)
        ctx.lineTo(right, y1)
        ctx.lineTo(right, y0)
        ctx.lineTo(x1, top)
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleèi èrte, ampak samo zapreš pot
    }
    //----
    if (fillColor != "") {
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    //----
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.stroke();
    }
    //gText(tmpStr, font, "lightYellow", x0 + 2, y1 +2)
    if (tmpStr != "") {
        gText(tmpStr, font, fontColor, x0, y1)
    }
}

//===========================================================================================================

function lf_calculator_changeMode(vp_mode) {

    lo_mode = vp_mode
    //console.log("newMode=" + lo_mode)

    lo_noChange = true
    switch (lo_mode) {
        case cv_modeDeg:
            radioCalcSms.checked = ""
            radioCalcRad.checked = ""
            radioCalcDeg.checked = true
            //console.log("newMode=" + lo_mode)
            break
        case cv_modeSms:
            radioCalcDeg.checked = ""
            radioCalcRad.checked = ""
            radioCalcSms.checked = true
            break
        case cv_modeRad:
            radioCalcDeg.checked = ""
            radioCalcSms.checked = ""
            radioCalcRad.checked = true
            break
    }
    lo_noChange = ""

    lf_adjustControls()

}

function lf_calculator_changeAlphaLive(vp_live) {

    lo_alphaLive = vp_live
    //console.log("newAlphaLive=" + lo_alphaLive)
    paint()

    //switch (lo_alphaLive) {
    //    case true:
    //        lo_alphaLive = ""
    //        //console.log("newMode=" + lo_mode)
    //        break
    //    default:
    //        lo_alphaLive = true
    //        break
    //}
    //let value
    //if (lo_showCalculator && lo_alphaLive) { value = "visible" } else { value = "hidden" }
    //checkCalcAlphaLive.style.visibility = value
    //labelCalcAlphaLive.style.visibility = value
}


function lf_adjustControls() {

    let value
    if (lo_showCalculator) { value = "visible" } else { value = "hidden" }
    radioCalcDeg.style.visibility = value
    labelCalcDeg.style.visibility = value
    radioCalcSms.style.visibility = value
    labelCalcSms.style.visibility = value
    radioCalcRad.style.visibility = value
    labelCalcRad.style.visibility = value
    checkCalcAlphaLive.style.visibility = value
    labelCalcAlphaLive.style.visibility = value

    textCalcRslt.style.visibility = value
    switch (lo_mode) {
        case cv_modeDeg: case cv_modeRad:
            textCalcDeg.style.visibility = value
            textCalcSmsDeg.style.visibility = "hidden"
            textCalcSmsMin.style.visibility = "hidden"
            textCalcSmsSec.style.visibility = "hidden"
            textCalcRslt.style.left = "520px" //textDeg.Left + textDeg.Width + 8
            break
        case cv_modeSms:
            textCalcDeg.style.visibility = "hidden"
            textCalcSmsDeg.style.visibility = value
            textCalcSmsMin.style.visibility = value
            textCalcSmsSec.style.visibility = value
            textCalcRslt.style.left = "601px" //textSmsSec.Width + textSmsSec.Width + 8
            break
    }
    //textCalcRslt.Width = Me.ClientSize.Width - textRslt.Left - 8

}

function lf_calculate() {

    //console.log("lo_mode=" + lo_mode)
    switch (lo_mode) {
        case cv_modeDeg:
            lf_calculate_deg()
            break
        case cv_modeSms:
            lf_calculate_sms()
            break
        case cv_modeRad:
            lf_calculate_rad()
            break
    }
}

function lf_calculate_deg() {
    //------------------------------
    //120  -> 120° 0// 0" = 2,094 rad = 2¶/3
    //43.5 -> 43° 30// 0" = 0,7592 rad
    // ¶ ? ° ?
    //ASCII CODE PAGE: https://www.ascii-code.com/
    //------------------------------
        
    let vl_oldRsltText = textCalcRslt.value
    //console.log("vl_oldRsltText=" + vl_oldRsltText)

    let alphaDegStr = textCalcDeg.value
    //console.log("alphaDegStr=" + alphaDegStr)

    let outStr = lf_calcultate_filterStrDigitMinusDotComma(alphaDegStr)
    if (outStr != alphaDegStr) {
        alphaDegStr = outStr
        textCalcDeg.value = alphaDegStr
    }
     
    // //zamenjam vejice v pike zaradi univerzalnosti raèunanja
    // alphaDegStr = alphaDegStr.replace(/,/g, ".") // !TODO! replace() DONE kje.Replace(kaj,kam) --> kje.replace(rEx-kaj,kam) ... https://www.tutorialrepublic.com/faq/how-to-replace-character-inside-a-string-in-javascript.php
    //console.log("alphaDegStr=" + alphaDegStr)
    // //Èe ima vmes minus in ta minus ni na zaèetku, potem ta minus pobrišem
    // let tmpPos = alphaDegStr.indexOf("-") // InStr(kje,kaj) --> kje.indexOf(kaj, start) !TODO! DONE
    // if (tmpPos > 0) {
    //     alphaDegStr = alphaDegStr.replace("-", "")
    //     textCalcDeg.value = alphaDegStr
    // }

    //======== 1) KOT V STOPINJAH/MINUTAH/SEKUNDAH

    let alphaDeg = Number(alphaDegStr) //Val(alphaDegStr) !TODO! DONE
    let vl_negative = ""
    if (alphaDeg < 0) {
        alphaDeg = -alphaDeg
        vl_negative = true
    }
    let kotSmsStr = lf_getKotSms(alphaDeg)
    //console.log("kotSmsStr=" + kotSmsStr)
    if (vl_negative) {
        kotSmsStr = "-" + kotSmsStr
    }

    //======== 2) KOT V RADIANIH

    let kotRad = alphaDeg * Math.PI / 180
    let kotRadStr = kotRad.toFixed(4)
    if (vl_negative) {
        kotRadStr = "-" + kotRadStr
    }

    //======== 3) POSEBNI PRIMERI KOTA V RADIANIH

    let kotRadSpecStr = lf_getKotRadSpec(alphaDeg)
    if (vl_negative && kotRadSpecStr != "") {
        kotRadSpecStr = "-" + kotRadSpecStr
    }

    //======== REZULTAT 

    let rsltStr = kotSmsStr + " = " + kotRadStr + " rad"
    if (kotRadSpecStr != "") {
        rsltStr += "  =  " + kotRadSpecStr
    }

    if (rsltStr != vl_oldRsltText) {
        textCalcRslt.value = rsltStr
    }
    if (vl_negative) { alphaDeg = -alphaDeg }
    lf_calculate_setAlphaData(alphaDeg, alphaDegStr) //26.12.2022 v1.12
}

function lf_calculate_sms() {
    //------------------------------
    //120  -> 120° 0// 0" = 2,094 rad = 2¶/3
    //43.5 -> 43° 30// 0" = 0,7592 rad
    // ¶ ? ° ?
    //ASCII CODE PAGE: https://www.ascii-code.com/
    //------------------------------

    let vl_oldRsltText = textCalcRslt.value

    let alphaSmsDegStr = textCalcSmsDeg.value
    let outStr = lf_calcultate_filterStrDigitMinus(alphaSmsDegStr)
    if (outStr != alphaSmsDegStr) {
        alphaSmsDegStr = outStr
        textCalcSmsDeg.value = alphaSmsDegStr
    }

    let alphaSmsMinStr = textCalcSmsMin.value
    outStr = lf_calcultate_filterStrDigit(alphaSmsMinStr)
    if (outStr != alphaSmsMinStr) {
        alphaSmsMinStr = outStr
        textCalcSmsMin.value = alphaSmsMinStr
    }

    let alphaSmsSecStr = textCalcSmsSec.value
    outStr = lf_calcultate_filterStrDigitDotComma(alphaSmsSecStr)
    if (outStr != alphaSmsSecStr) {
        alphaSmsSecStr = outStr
        textCalcSmsSec.value = alphaSmsSecStr
    }

    let alphaSmsDeg = Number(alphaSmsDegStr)
    let vl_negative = ""
    if (alphaSmsDeg < 0) {
        alphaSmsDeg = -alphaSmsDeg
        vl_negative = true
    }
    let alphaSmsMin = Number(alphaSmsMinStr)
    let alphaSmsSec = Number(alphaSmsSecStr)

    //======== 1) KOT V STOPINJAH DECIMALNO

    let alphaDeg = alphaSmsDeg + alphaSmsMin / 60 + alphaSmsSec / 3600
    let alphaDegStr = alphaDeg.toFixed(5) + scStopinj
    if (vl_negative) {
        alphaDegStr = "-" + alphaDegStr
    }

    //======== 2) KOT V RADIANIH

    let kotRad = alphaDeg * Math.PI / 180
    let kotRadStr = kotRad.toFixed(4)
    if (vl_negative) {
        kotRadStr = "-" + kotRadStr
    }

    //======== 3) POSEBNI PRIMERI KOTA V RADIANIH

    let kotRadSpecStr = lf_getKotRadSpec(alphaDeg)
    if (vl_negative && kotRadSpecStr != "") {
        kotRadSpecStr = "-" + kotRadSpecStr
    }

    //======== REZULTAT 

    let rsltStr = alphaDegStr + "  =  " + kotRadStr + " rad"
    if (kotRadSpecStr != "") {
        rsltStr += "  =  " + kotRadSpecStr
    }

    if (rsltStr != vl_oldRsltText) {
        textCalcRslt.value = rsltStr
    }
    if (vl_negative) { alphaDeg = -alphaDeg }
    lf_calculate_setAlphaData(alphaDeg, alphaDegStr) //26.12.2022 v1.12
}


function lf_calculate_rad() {
    //------------------------------
    //2,094 -> 120° = 120° 0// 0" = 2¶/3 
    //1.5 -> 85,94367°  =  85° 56// 37,22"
    //3.1415926 -> 180,00000°  =  179° 59// 59,95"
    // ¶ ? ° ?
    //ASCII CODE PAGE: https://www.ascii-code.com/
    //------------------------------

    let vl_oldRsltText = textCalcRslt.value
    //console.log("vl_oldRsltText=" + vl_oldRsltText)

    let alphaRadStr = textCalcDeg.value
    //console.log("alphaRadStr=" + alphaRadStr)
    let outStr = lf_calcultate_filterStrDigitMinusDotComma(alphaRadStr)
    if (outStr != alphaRadStr) {
        alphaRadStr = outStr
        textCalcDeg.value = alphaRadStr
    }

    //======== 1) KOT V RADIANIH

    let alphaRad = Number(alphaRadStr)
    let vl_negative = ""
    if (alphaRad < 0) {
        alphaRad = -alphaRad
        vl_negative = true
    }

    //======== 2) KOT V STOPINJAH

    let alphaDeg = alphaRad * 180 / Math.PI
    let alphaDegStr = ""
    if ((alphaDeg - Math.trunc(alphaDeg)) * 360000 < 1) {
        alphaDegStr = (Math.trunc(alphaDeg)).toString() + scStopinj
    } else {
        alphaDegStr = alphaDeg.toFixed(5) + scStopinj
    }
    if (vl_negative) {
        alphaDegStr = "-" + alphaDegStr
    }

    //======== 3) KOT V STOPINJAH/MINUTAH/SEKUNDAH

    let kotSmsStr = lf_getKotSms(alphaDeg)
    if (vl_negative) {
        kotSmsStr = "-" + kotSmsStr
    }

    //======== 4) POSEBNI PRIMERI KOTA V RADIANIH

    let kotRadSpecStr = lf_getKotRadSpec(alphaDeg)
    if (vl_negative && kotRadSpecStr != "") {
        kotRadSpecStr = "-" + kotRadSpecStr
    }

    //======== REZULTAT 

    let rsltStr = alphaDegStr + "  =  " + kotSmsStr
    if (kotRadSpecStr != "") {
        rsltStr += "  =  " + kotRadSpecStr
    }

    if (rsltStr != vl_oldRsltText) {
        textCalcRslt.value = rsltStr
    }
    if (vl_negative) { alphaDeg = -alphaDeg }
    lf_calculate_setAlphaData(alphaDeg, alphaDegStr) //26.12.2022 v1.12
}

function lf_calculate_setAlphaData(vp_alphaDeg, vp_alphaDegStr) {
    //26.12.2022 v1.12
    //console.log("lf_calculate_setAlphaData()")
    
    let alphaDeg = vp_alphaDeg
    //console.log("vp_alphaDeg=" + vp_alphaDeg + " alphaDeg=" + alphaDeg)
    //Èe je kot negativen, ga najprej spravim v prvi kvadrant
    if (alphaDeg < 0) {
        //console.log("vp_alphaDeg=" + vp_alphaDeg + " alphaDeg=" + alphaDeg)
        alphaDeg = alphaDeg + (1 + Math.trunc(-alphaDeg / 360)) * 360
        //console.log("vp_alphaDeg=" + vp_alphaDeg + " -> alphaDeg=" + alphaDeg)
    } else if (alphaDeg>=360) { 
        alphaDeg = alphaDeg - (Math.trunc(alphaDeg / 360)) * 360
        //console.log("vp_alphaDeg=" + vp_alphaDeg + " -> alphaDeg=" + alphaDeg)
    }

    //---- doloèanje kvadranta
    let vl_kvadrant = Math.trunc(alphaDeg / 90) + 1
    if (vl_kvadrant > 4) { vl_kvadrant = 4 }
    //console.log("kvadrant==" + vl_kvadrant)

    let vl_znacilenKot = ""
    switch (alphaDeg) {
        case 0: case 30: case 45: case 60: case 90:
            vl_znacilenKot = true
    }
    lo_calcAlpha = alphaDeg * Math.PI / 180
    lo_calcAlphaDeg = alphaDeg
    lo_calcKvadrant = vl_kvadrant
    lo_calcZnacilenKot = vl_znacilenKot
    if (lo_calcAlphaDeg != lo_calcAlphaDegPrev) {
        paint()
    }
    lo_calcAlphaDegPrev = lo_calcAlphaDeg
}

function lf_calcultate_filterStrDigitMinusDotComma(alphaStr) {

    let vl_haveDot = ""
    let vl_char = ""
    let vl_code = 0
    let vl_takeIt = ""
    let outStr = ""
    for (let index = 0; index <= (alphaStr.length - 1); index++) {
        vl_char = alphaStr.substring(index, index + 1)
        vl_code = vl_char.charCodeAt(0)
        //console.log("char=" + vl_char + " code=" + vl_code)
        vl_takeIt = ""
        switch (vl_char) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
                vl_takeIt = true
                //console.log("take digit")
                break
            case ".":
                if (!vl_haveDot) {
                    vl_takeIt = true
                    //console.log("take dot")
                    vl_haveDot = true
                }
                break
            case ",":
                if (!vl_haveDot) {
                    vl_char = "."
                    vl_takeIt = true
                    //console.log("take comma as dot")
                    vl_haveDot = true
                }
                break
            case "-":
                if (index == 0) {
                    vl_takeIt = true
                    //console.log("take minus")
                }
                break
        }
        if (vl_takeIt) {
            outStr += vl_char
            //console.log("outStr=" + outStr)
        }
    }
    return outStr
}

function lf_calcultate_filterStrDigitDotComma(alphaStr) {

    let vl_haveDot = ""
    let vl_char = ""
    let vl_code = 0
    let vl_takeIt = ""
    let outStr = ""
    for (let index = 0; index <= (alphaStr.length - 1); index++) {
        vl_char = alphaStr.substring(index, index + 1)
        vl_code = vl_char.charCodeAt(0)
        //console.log("char=" + vl_char + " code=" + vl_code)
        vl_takeIt = ""
        switch (vl_char) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
                vl_takeIt = true
                //console.log("take digit")
                break
            case ".":
                if (!vl_haveDot) {
                    vl_takeIt = true
                    //console.log("take dot")
                    vl_haveDot = true
                }
                break
            case ",":
                if (!vl_haveDot) {
                    vl_char = "."
                    vl_takeIt = true
                    //console.log("take comma as dot")
                    vl_haveDot = true
                }
                break
        }
        if (vl_takeIt) {
            outStr += vl_char
            //console.log("outStr=" + outStr)
        }
    }
    return outStr
}

function lf_calcultate_filterStrDigitMinus(alphaStr) {

    let vl_char = ""
    let vl_code = 0
    let vl_takeIt = ""
    let outStr = ""
    for (let index = 0; index <= (alphaStr.length - 1); index++) {
        vl_char = alphaStr.substring(index, index + 1)
        vl_code = vl_char.charCodeAt(0)
        //console.log("char=" + vl_char + " code=" + vl_code)
        vl_takeIt = ""
        switch (vl_char) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
                vl_takeIt = true
                //console.log("take digit")
                break
            case "-":
                if (index == 0) {
                    vl_takeIt = true
                    //console.log("take minus")
                }
                break
        }
        if (vl_takeIt) {
            outStr += vl_char
            //console.log("outStr=" + outStr)
        }
    }
    return outStr
}

function lf_calcultate_filterStrDigit(alphaStr) {

    let vl_char = ""
    let vl_code = 0
    let vl_takeIt = ""
    let outStr = ""
    for (let index = 0; index <= (alphaStr.length - 1); index++) {
        vl_char = alphaStr.substring(index, index + 1)
        vl_code = vl_char.charCodeAt(0)
        //console.log("char=" + vl_char + " code=" + vl_code)
        vl_takeIt = ""
        switch (vl_char) {
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
                vl_takeIt = true
                //console.log("take digit")
                break
        }
        if (vl_takeIt) {
            outStr += vl_char
            //console.log("outStr=" + outStr)
        }
    }
    return outStr
}

function lf_getKotSms(alphaDeg) {

    let kotDeg, kotMin
    let kotSec, kotRest
    let kotDegStr, kotMinStr, kotSecStr, kotSmsStr

    kotDeg = Math.trunc(alphaDeg)
    //console.log("kotDeg=" + kotDeg)
    kotRest = alphaDeg - kotDeg
    kotMin = Math.trunc(kotRest * 60 + 0.0000001)
    //console.log("kotMin=" + kotMin)
    kotRest = alphaDeg - kotDeg - kotMin / 60
    kotSec = kotRest * 3600
    //console.log("kotSec=" + kotSec)

    kotDegStr = kotDeg
    kotMinStr = kotMin
    if (((kotSec - Math.trunc(kotSec)) * 200) < 1) {
        kotSecStr = (Math.trunc(kotSec)).toString()
    } else {
        kotSecStr = kotSec.toFixed(2)
    }

    //----
    kotSmsStr = kotDegStr + scStopinj + " " + kotMinStr + scSingleQuote + " " + kotSecStr + scDoubleQuote
    return kotSmsStr
}

function lf_getKotRadSpec(alphaDeg) {

    switch (alphaDeg) {
        case 30:
            return scPI + "/6"
        case 45:
            return scPI + "/4"
        case 60:
            return scPI + "/3"
        case 90:
            return scPI + "/2"
        case 120:
            return "2" + scPI  + "/3"
        case 135:
            return "3" + scPI + "/4"
        case 150:
            return "5" + scPI + "/6"
        case 180:
            return scPI 
        case 210:
            return "7" + scPI + "/6"
        case 225:
            return "5" + scPI + "/4"
        case 240:
            return "4" + scPI + "/3"
        case 270:
            return "3" + scPI + "/2"
        case 300:
            return "5" + scPI + "/3"
        case 315:
            return "7" + scPI + "/4"
        case 330:
            return "11" + scPI + "/6"
        case 360:
            return "2" + scPI + ""
            break
        default:
            return ""
    }

}



