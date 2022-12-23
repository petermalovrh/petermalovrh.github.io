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
var lo_fullScreen = ""
var lo_showRulesSupplement  = ""
var lo_showRulesComplement  = ""
var lo_showRules3to1  = ""
var lo_showRules4to1 = ""
var lo_showGraphSinCos = true
var lo_showGraphTanCot = true

var lo_radijLevel  = -5 
const cv_radijFactor  = 1.07
const cv_maxRadijLevel  = 15
const cv_minRadijLevel  = -25

var lo_xCircleCenter, lo_yCircleCenter = 100
var lo_dragEnotskiKrogActive  = ""
var lo_dragEnotskiKrogAddX = 0, lo_dragEnotskiKrogAddY = 20
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
document.body.style.overflow = 'hidden'; // tole onemogo�i scrollBar-s
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

//https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
// � (U+00B0)   � (U+00B6)    ? (U+03B1)   ? (U+221A)
const scAlpha = String.fromCharCode(0x3B1)
const scOmega = String.fromCharCode(937)
const scKoren = String.fromCharCode(0x221A)
const scStopinj = String.fromCharCode(0xB0)
const scPI = String.fromCharCode(0xB6)
const scTch = String.fromCharCode(0x10C)
const scTchLow = String.fromCharCode(0x10D)
const scSch = String.fromCharCode(0x160)
const scSchLow = String.fromCharCode(0x161)
const scZh = String.fromCharCode(0x17D)
const scZLow = String.fromCharCode(0x17E)

//======== SET CHECKBOXES STATES
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
//document.getElementById("checkShowTeorija").addEventListener("click", checkShowTeorija_click);
//function checkShowTeorija_click() {
//    if (document.getElementById("checkShowTeorija").checked) { lo_showTeorija = true } else { lo_showTeorija = "" }
//    //console.log("showTeorija=" + lo_showTeorija)
//    //paint()
//}
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
}
document.getElementById("checkGraphTanCot").addEventListener("click", checkGraphTanCot_click);
function checkGraphTanCot_click() {
    if (document.getElementById("checkGraphTanCot").checked) { lo_showGraphTanCot = true } else { lo_showGraphTanCot = "" }
    //console.log("showGraphTanCot=" + lo_showGraphTanCot)
    if (lf_determineFunGroup()) {
        paint()
    }
}

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.
// Add the event listeners for mousedown, mousemove, and mouseup
elMyCanvas.addEventListener('mousedown', (e) => {
    lo_mousedownX = e.offsetX;
    lo_mouseDownY = e.offsetY;
});
elMyCanvas.addEventListener('mousemove', (e) => {
    lo_mouseMoveX = e.offsetX;
    lo_mouseMoveY = e.offsetY;
    paint()
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
        //mi�ko vrti znotraj ali v bli�nji okolici kroga
        lf_changeRadij(delta)
    }
});
//window.addEventListener('mouseup', (e) => {
    //drawLine(context, x, y, e.offsetX, e.offsetY);
    //x = 0;
    //y = 0;
    //isDrawing = false;
//});

resizeCanvas();
paint();



// var elMainDate = document.getElementById("mainDate");
// elMainDate.width = 300     //
// elMainDate.height = 30 //
// elMainDate.style.left = "30px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.top = "1px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS

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
       
    paint_author();
    //tmpStr = "velikost enotskega kroga spremeni� z vrtenjem kole��ka mi�ke"
    tmpStr = "velikost enotskega kroga spremeni" + scSchLow + " z vrtenjem kole" + scSchLow + scTchLow + "ka mi" + scSchLow + "ke"
    gText(tmpStr, "italic 11pt cambria", "gray", 6, ctxH - 8)
    paint_eKrog();
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
    xCircleCenter = 70 + radij
    yCircleCenter = ctxH - 100 - radij
    let xCircleLeft = xCircleCenter - radij
    let xCircleRight = xCircleCenter + radij
    let yCircleTop = yCircleCenter - radij
    let yCircleBottom = yCircleCenter + radij

    //ctx.fillStyle = "#FF00DD";
    //ctx.fillRect(20, 20, 150, 100);
    //gArc(1100, 200, 100, 0, 5, "#FA8072", 0, "")

    //==== KRO�NICA
    //lo_penFrg1.Width = 3
    //lo_penFrg1.Color = Color.DarkGray
    //g.FillEllipse(lf_mySolidBrush(Color.GhostWhite), xCircleCenter - radij + 1, yCircleCenter - radij + 1, 2 * radij - 1, 2 * radij - 1)
    //g.DrawEllipse(lo_penFrg1, xCircleCenter - radij, yCircleCenter - radij, 2 * radij + 1, 2 * radij + 1)
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
    gEllipse(xCircleCenter, yCircleCenter, radij, radij, 0, "white", 1, "darkslateGray")
    //console.log("xCircleCenter=" + xCircleCenter + ", yCircleCenter=" + yCircleCenter + ", radij=" + radij )

    //==== MARKERJI NA KRO�NICI ZA ZNA�ILNE KOTE
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

    //======== ENKE NA 4 KONCIH KRO�NICE
    let tmpStr = "1"
    let font = "18px cambria"
    let wh = gMeasureText(tmpStr, font);
    let color = "darkSlateGray"
    gText(tmpStr, font, color, xCircleLeft - wh[0] - 1, yCircleCenter - 3)
    gText(tmpStr, font, color, xCircleRight + 1, yCircleCenter - 3)
    gText(tmpStr, font, color, xCircleCenter + 2, yCircleTop - 3)
    gText(tmpStr, font, color, xCircleCenter + 2, yCircleBottom + wh[1] + 3)

    //======== ALFA
    //---- najprej X in Y koordinati mi�ke v okviru pictureBox-a
    //let currentXpb = Cursor.Position.X - Me.Left - lo_frmBorderWidth - cv_privateFormBorder
    //let currentYpb = Cursor.Position.Y - Me.Top - lo_frmTitleBarHeight - cv_privateFormBorder //- lo_frmBorderWidth ... zgornji border je �e vsebovan v lo_frmTitleBarHeight
    let currentXpb = lo_mouseMoveX
    let currentYpb = lo_mouseMoveY
    //---- razdalja mi�ke od sredi��a enotskega kroga po X in po Y
    let kvadrant
    let dx, dy, alpha, alphaDeg
    dx = (currentXpb - xCircleCenter)
    dy = -(currentYpb - yCircleCenter)
    //console.log("dx=" + dx + " dy=" + dy)
    //if (dx > 0) {console.log("dx>0") }
    //g.DrawString(dx.ToString & " " & dy.ToString, mdSignFont10, Brushes.Black, currentXpb + 5, currentYpb - 8)
    //---- dolo�anje kota alpha[rad] in kvadranta
    if (dx == 0) { //---- NAVPI�NO
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
    // � � ? ?
    //console.log("alphaDeg=" + alphaDeg + "�")

    //======== PREVERJANJE ZNA�ILNIH KOTOV 0,30,45,60,90
    let vl_znacilenKot = ""
    if (true) { //if (!window.event.ctrlKey) { ... test �e dr�i pritisnjeno tipko CTRL ... !TODO!
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

    //alphaDeg = 90
    //alpha = Math.PI / 2
    //vl_znacilenKot = true

    //======== IZRA�UN �TEVIL�NE VREDNOSTI KOTA KOT STRINGA V STOPINJAH IN RADIANIH
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
    let vl_graphLeft = xCircleRight + 100
    if (vl_graphLeft < 2 * radij + 100) { vl_graphLeft = 2 * radij + 100 }
    if (vl_graphLeft < 800) { vl_graphLeft = 800 }
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

function lf_paint_graph_single(ctx, vp_left, vp_top, vp_width, vp_height, vp_function, vp_alpha, vp_alphaDeg, vp_alphaStrRad, vp_showZnacilniKoti, vp_znacilenKot, vp_alpha2, vp_alpha2Deg, vp_alpha2StrRad) { 

    //On Error GoTo labErr

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
            gText("SIN(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, "blue", vp_left - 25, vp_top - 27)
            break
        case cv_fun_cos: //COSINUS
            gText("COS(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, "green", vp_left - 25, vp_top - 27)
            break
        case cv_fun_tan: //TANGENS
            gText("TAN(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, "mediumOrchid", vp_left - 25, vp_top - 27)
            break
        case cv_fun_cot: //KOTANGENS
            gText("COT(" + scAlpha + ")", myFontMathLabelsLargeBoldItalic, "goldenrod", vp_left - 25, vp_top - 27)
            break
    }

    //======== KOT ALFA NA X OSI
    let vl_color = "#FA807260" //gf_alphaColor(96, Color.Salmon)
    x = vl_xYos + vl_xDataRange * vp_alpha / 2 / Math.PI
    gLine(vl_xYos, vl_yXos, x, vl_yXos, 9, vl_color, [])
    if (vp_alpha2 != vp_alpha) {
        vl_color = "#BD876860" //gf_alphaColor(96, Color.DarkKhaki)
        x = vl_xYos + vl_xDataRange * vp_alpha2 / 2 / Math.PI
        gLine(vl_xYos, vl_yXos + 3, x, vl_yXos + 3, 9, vl_color, [])
    }

    //======== OSI
    gLine(vl_xYos, vl_yXos, vl_xRight, vl_yXos, 1, "darkSlateGray", [])
    gLine(vl_xYos, vl_yXos - vl_amplitude, vl_xYos, vl_yXos + vl_amplitude, 1, "darkSlateGray", [])

    //======== OZNAKA X OSI
    gText(scAlpha, myFontMathLabelsLargeBoldItalic, "darkSlateGray", vl_xRight - 9, vl_yXos + 12)


    //==== POMO�NE LINIJE VREDNOSTI (SKUPNO ZA VSE 4 FUNCIJE)
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
            //==== POMO�NE LINIJE VREDNOSTI
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
            //==== POMO�NE LINIJE VREDNOSTI
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

    //==== MARKERJI NA KRO�NICI ZA ZNA�ILNE KOTE
    if (lo_showZnacilniKoti) {
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 0, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 30, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 45, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 60, vl_xYos, vl_yXos, ky, vl_xDataRange)
        lf_paint_graph_single_markerZnacilniKot(ctx, vp_function, vl_alpha0rad, 90, vl_xYos, vl_yXos, ky, vl_xDataRange)
    }

    //==== OZNA�ENA VELIKOST KOTNE FUNKCIJE ZA GLAVNI KOT ALFA
    let ret01 // v tej strukturi bo funkcija vrnila koordinate
    ret01 = lf_paint_graph_single_markFunValue(ctx, vl_xDataRange, vl_xYos, vl_yXos, ky, vp_function, vl_alpha0, vl_alpha0rad, vp_alpha, vp_alphaDeg, vp_showZnacilniKoti, vp_znacilenKot)
    xData = ret01[0]; yData = ret01[1]; x = ret01[2]; y = ret01[3]; 

    //==== Z DEBELO RDE�O PIKO POUDAREK, DA SMO NA ZNA�ILNEM KOTU 0, 30, 45, 60 ali 90 STOPINJ, SICER NAVADEN SIV KROGEC
    if (vp_showZnacilniKoti && vp_znacilenKot) {
        //---- rde� marker
        switch (vp_function) {
            case cv_fun_sin: case cv_fun_cos:
                gEllipse(x, y, 5, 5, 0, "", 3, "red")
                break;
            case cv_fun_tan:
                //console.log("vp_alphaDeg=" + vp_alphaDeg)
                switch (vp_alphaDeg) {
                    case 90: case 270:
                        //console.log("--vp_alphaDeg=" + vp_alphaDeg) ... problem je bil spet en manjkajo�i Break
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
            gText(vp_alpha.toFixed(3), myFontMathValuesSmall, "darkSlateGray", x - 15, vl_yXos - 3)
        }

    }

    //==== OZNA�EN SINUS/COSINUS ZA PRIMER KAK�NEGA DODATNO VKLOPLJENEGA PRIKAZA PRAVILA
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

    //==== OZNA�EN SINUS/COSINUS
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
            gLine(vp_xYos - 2, y, x + 2, y, 1, "dodgerBlue", [2, 5])
            gLine(x, vp_yXos, x, y, 7, "blue", [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, "dodgerBlue", [])
            tmpColor = "blue"
            break
        case cv_fun_cos: //COSINUS
            gLine(vp_xYos - 2, y, x + 2, y, 1, "seaGreen", [2, 5])
            gLine(x, vp_yXos, x, y, 7, "green", [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, "seaGreen", [])
            tmpColor = "green"
            break
        case cv_fun_tan: //TANGENS
            gLine(vp_xYos - 2, y, x + 2, y, 1, "plum", [2, 5])
            gLine(x, vp_yXos, x, y, 7, "mediumOrchid", [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, "plum", [])
            tmpColor = "mediumOrchid"
            break
        case cv_fun_cot: //KOTANGENS
            gLine(vp_xYos - 2, y, x + 2, y, 1, "wheat", [2, 5])
            gLine(x, vp_yXos, x, y, 7, "goldenrod", [])
            gLine(vp_xYos, vp_yXos, vp_xYos, y, 2, "wheat", [])
            tmpColor = "goldenrod"
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

    //======== IZPIS �TEVIL�NE VREDNOSTI KOTA
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
    if (vp_basicChart) { vl_color = "#FA807240" } else { vl_color = "#BD876B40" }
    let radijKot = 0.45 * radij
    if (radijKot > 120) { radijKot = 120 }
    if ((radijKot > 40) && (!vp_basicChart)) { radijKot -= 30 }
    gArc(xCircleCenter, yCircleCenter, radijKot, 0, alpha, vl_color, 0, "")

    //======== �RTA KOTA
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

    //======== OZNA�BA PRAVEGA KOTA
    if ((alphaDeg >= 4 && alphaDeg <= 86) || (alphaDeg >= 94 && alphaDeg <= 176) || (alphaDeg >= 184 && alphaDeg <= 266) || (alphaDeg >= 274 && alphaDeg <= 356)) { 
        let signCos, signSin 
        signCos = Math.cos(alpha) / Math.abs(Math.cos(alpha))
        signSin = Math.sin(alpha) / Math.abs(Math.sin(alpha))
        gLine(xPointOnCircle - signCos * 10, yCircleCenter - signSin * 18, xPointOnCircle, yCircleCenter - signSin * 18, 2, "gray", [])
        gLine(xPointOnCircle - signCos * 10, yCircleCenter, xPointOnCircle - signCos * 10, yCircleCenter - signSin * 18, 2, "gray", [])
    }

    //======== POUDARJENA SINUS IN COSINUS KRAKA TRIKOTNIKA
    gLine(xCircleCenter, yCircleCenter, xPointOnCircle, yCircleCenter, 5, "green", [])
    gLine(xCircleCenter, yPointOnCircle, xPointOnCircle, yPointOnCircle, 1, "lightGray", [])
    //----
    gLine(xCircleCenter, yCircleCenter, xCircleCenter, yPointOnCircle, 2, "blue", [])
    gLine(xPointOnCircle, yCircleCenter, xPointOnCircle, yPointOnCircle, 5, "blue", [])

    //======== Z DEBELO RDE�O PIKO POUDAREK, DA SMO NA ZNA�ILNEM KOTU 0, 30, 45, 60 ali 90 STOPINJ, SICER NAVADEN SIV KROGEC
    if (vl_znacilenKot) {
        gEllipse(xPointOnCircle, yPointOnCircle, 5, 5, 0, "", 4, "red")
    }
    else {
        gEllipse(xPointOnCircle, yPointOnCircle, 4, 4, 0, "", 4, "darkSlategray")
    }

    //======== OZNAKA DOL�INE RADIJA 1 NA �RTI KOTA
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
        gText(tmpStr, myFontMathLabels, "blue", x + 4, y - 6)
        gText("= " + tmpValueStr, myFontMathValues, "blue", x + 4, y + 11)
        if (vp_basicChart) {
            gText(tmpValueStr, myFontMathValuesSmall, "blue", xCircleCenter - tmpWidth2 - 3, yPointOnCircle - tmpHeight2 / 2)
        }
    }
    else {
        gText(tmpStr, myFontMathLabels, "blue", x - 3 - tmpWidth, y - 8)
        gText("= " + tmpValueStr, myFontMathValues, "blue", x - 3 - tmpWidth - 6, y + 9)
        if (vp_basicChart) {
            gText(tmpValueStr, myFontMathValuesSmall, "blue", xCircleCenter + 3, yPointOnCircle - tmpHeight2 / 2)
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
        gText(tmpStr, myFontMathLabels, "green", x - tmpWidth / 2, y + 17)
        gText("= " + tmpValueStr, myFontMathValues, "green", x - tmpWidth / 2, y + 34)
        gText(tmpValueStr, myFontMathValuesSmall, "green", xPointOnCircle - tmpWidth2 / 2, yCircleCenter + 15)
    }
    else {
        gText(tmpStr, myFontMathLabels, "green", x - tmpWidth / 2, y - 3 - tmpHeight)
        gText(tmpValueStr, myFontMathValuesSmall, "green", xPointOnCircle - tmpWidth2 / 2, yCircleCenter - tmpHeight2 )
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
                gLine(xCircleRight + 1, yCircleCenter, xPointTan, yPointTan, 5, "mediumOrchid", [])
                y = yCircleCenter - vDiff
                gText(tmpStr, myFontMathLabels, "mediumOrchid", xPointTan + 7, y - 7)
                gText(tmpValueStr, myFontMathValues, "mediumOrchid", xPointTan + 7, y + 10)
            }
            else {
                xPointTan = xCircleLeft
                yPointTan = yCircleCenter + radij * Math.tan(alpha)
                gLine(xCircleLeft, yCircleCenter, xPointTan, yPointTan, 5, "mediumOrchid", [])
                y = yCircleCenter + vDiff
                gText(tmpStr, myFontMathLabels, "mediumOrchid", xPointTan - tmpWidth - 7, y - 7)
                gText(tmpValueStr, myFontMathValues, "mediumOrchid", xPointTan - tmpWidth2 - 11, y + 10)
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
            if (kvadrant == 1 || kvadrant == 2) {
                xPointCtg = xCircleCenter + radij / Math.tan(alpha)
                yPointCtg = yCircleTop - 1
                gLine(xCircleCenter, yCircleTop - 1, xPointCtg, yPointCtg, 5, "goldenrod", [])
                x = xCircleCenter + hDiff - tmpWidth / 2
                y = yCircleTop - tmpHeight - 3
                gText(tmpStr, myFontMathLabels, "goldenrod", x, y+2)
            }
            else {
                xPointCtg = xCircleCenter - radij / Math.tan(alpha)
                yPointCtg = yCircleBottom + 1
                gLine(xCircleCenter, yCircleBottom + 1, xPointCtg, yPointCtg, 5, "goldenrod", [])
                x = xCircleCenter - hDiff - tmpWidth / 2
                y = yCircleBottom + 4
                gText(tmpStr, myFontMathLabels, "goldenrod", x, y+15)
            }
        }
    }



}

function gf_alphaColor(vp_alpha, vp_color) {

    //R: parseInt(this.substring(0, 2), 16),
    //G : parseInt(this.substring(2, 4), 16),
    //B : parseInt(this.substring(4, 6), 16),

        //Return Color.FromArgb(vp_alpha, vp_color.R, vp_color.G, vp_color.B)

}


//function lf_getAlphaStrings(alpha, alphaDeg, vp_znacilenKot, alphaStrDeg, alphaStrRad, alphaStrRad2, alphaStrRad3)
function lf_getAlphaStrings(alpha, alphaDeg, vp_znacilenKot) {

    //let alphaStrDeg = Format(alphaDeg, "###0.0") & "�"
    let alphaStrDeg = alphaDeg.toFixed(1) + scStopinj //"�"
    //let alphaStrRad = Format(alpha, "##0.00") & " rad"
    let alphaStrRad = alpha.toFixed(2) + " rad"
    let alphaStrRad2 = alphaStrRad
    let alphaStrRad3 = alphaStrRad
    // � ? ? 
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
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vle�i �rte, ampak samo zapre� pot
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
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vle�i �rte, ampak samo zapre� pot
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