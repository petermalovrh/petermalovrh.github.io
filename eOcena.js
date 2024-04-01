//===========================================
//                                          =
//        ##1  __COMMON                     =
//                                          =
//===========================================

//------------------------------------
//---- pričetek razvoja 31.3.2024
const gl_versionNr = "v1.0"
const gl_versionDate = "1.4.2024"
const gl_versionNrDate = gl_versionNr + " " + gl_versionDate
//------------------------------------
var gl_appStart = true;      // 19.12.2023

//https://www.w3schools.com/charsets/ref_utf_basic_latin.asp
//https://www.toptal.com/developers/keycode/table
//https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
// � (U+00B0)   � (U+00B6)    ? (U+03B1)   ? (U+221A)
const scAlpha = String.fromCharCode(0x3B1)
const scOmega = String.fromCharCode(937)
const scKoren = String.fromCharCode(0x221A)
const scStopinj = String.fromCharCode(0xB0)
const scPI = String.fromCharCode(0xB6)
const scPower2 = String.fromCharCode(0xB2)
const scInfinity = String.fromCharCode(0x221E)
const scDelta = String.fromCharCode(0x0394)
const scCopyR = String.fromCharCode(0x00A9)
//----
const scTch = String.fromCharCode(0x10C)
const scTchLow = String.fromCharCode(0x10D)
const scSch = String.fromCharCode(0x160)
const scSchLow = String.fromCharCode(0x161)
const scZh = String.fromCharCode(0x17D)
const scZhLow = String.fromCharCode(0x17E)
//----
const scCopyright = String.fromCharCode(0xA9)
const scDoubleQuote = String.fromCharCode(0x22)
const scSingleQuote = String.fromCharCode(0x27)

function mouseInsideRect(vp_mouseX, vp_mouseY, x0, y0, x1, y1) {
    if (valueBetween(vp_mouseX, x0, x1) && valueBetween(vp_mouseY, y0, y1)) { return true } else { return false };
}

function fixForRange(value, minValue, maxValue) {

    if (value < minValue) { return minValue };
    if (value > maxValue) { return maxValue };
    return value;
}

function valueBetween(value, minValue, maxValue) {

    if (value < minValue) { return false };
    if (value > maxValue) { return false };
    return true;
}

function pointInsideRect(x, y, x0, y0, x1, y1) {

    if (!valueBetween(x, x0, x1)) { return false };
    if (!valueBetween(y, y0, y1)) { return false };
    return true;
}

function lf_mesecNameLongENG(vp_mesec) {

    switch (vp_mesec) {
        case 1: return "January"
        case 2: return "February"
        case 3: return "March"
        case 4: return "April"
        case 5: return "May"
        case 6: return "June"
        case 7: return "July"
        case 8: return "August"
        case 9: return "September"
        case 10: return "October"
        case 11: return "November"
        case 12: return "December"
    }
    return "?"

}

function lf_mesecNameLongSLO(vp_mesec) {

    switch (vp_mesec) {
        case 1: return "Januar"
        case 2: return "Februar"
        case 3: return "Marec"
        case 4: return "April"
        case 5: return "Maj"
        case 6: return "Junij"
        case 7: return "Julij"
        case 8: return "Avgust"
        case 9: return "September"
        case 10: return "Oktober"
        case 11: return "November"
        case 12: return "December"
    }
    return "?"

}

function lf_mesecName(vp_mesec) {

    switch (vp_mesec) {
        case 1: return "jan"
        case 2: return "feb"
        case 3: return "mar"
        case 4: return "apr"
        case 5: return "may"
        case 6: return "jun"
        case 7: return "jul"
        case 8: return "aug"
        case 9: return "sep"
        case 10: return "oct"
        case 11: return "nov"
        case 12: return "dec"
    }
    return "?"

}

function lf_mesecNameM(vp_mesec) {

    switch (vp_mesec) {
        case 1: return "J"
        case 2: return "F"
        case 3: return "M"
        case 4: return "A"
        case 5: return "M"
        case 6: return "J"
        case 7: return "J"
        case 8: return "A"
        case 9: return "S"
        case 10: return "O"
        case 11: return "N"
        case 12: return "D"
    }
    return "?"

}

function lf_dateStrMMMsepYY(vp_month, vp_year, vp_sep, vp_monthSpec, vp_yearSpec, vp_strSpec) {
    // format: "sep/21"
    
    //---- če je specialen primer, potem vrnem za to definiran rezultat
    if (vp_month == vp_monthSpec && vp_year == vp_yearSpec) {
        return vp_strSpec
    };

    //---- sicer pa pač sestavim skupaj mesec in leto
    return lf_mesecName(vp_month) + vp_sep + vp_year.toString();

}

function lf_resizeWindowToFullHD(vp_paint) {
    //18.11.2023 ... zadeva v Chrome žal ne dela, ker Chrome tega ne pusti. Dovoli le v popup oknih!!!
    window.resizeTo(1920, 1080);
    if (vp_paint) { paint() }
}

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

function gf_alphaColor(vp_alpha, vp_color) {
    return colorToHexRGB(vp_color) + byteToHex(vp_alpha)
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

function lf_changeVar(vp_var, vp_change, vp_min, vp_max) {
    vp_var += vp_change;
    if (vp_var > vp_max) { vp_var = vp_max };
    if (vp_var < vp_min) { vp_var = vp_min };
    return vp_var
}

function cookie_set(cname, cvalue, exdays) {
    // če lokalno poganjaš .html file, potem se cookie ne shrani, ker so pištotki po standardu izključno stvar HTTP protokola, ne pa file:///
    // zato sem za test cookijev moral zadevo dati na server (jaz konkretno na petermalovrh.github.io) in tam potem gledati konzolo Date();
    // v cookie-u je shrajenih več podatkov v obliki podatek=vrednost, shranjuješ posameznega, pri branju pa dobiš vse in jih moraš parsati
    // ali je "expires" vezan na posamezen podatek ali na celoten document.cookie mi pa še ni jasno, podobno tudi za pot. Občutek imam, da na posamezen podatek, ker se poda vedno pri shranjevanju vsakega posameznega podatka
    // glej https://javascript.info/cookie
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    let cookieStr = cname + "=" + cvalue + "; " + expires + "; path=/";
    console.log("cookie string: " + cookieStr);
    document.cookie = cookieStr;
    //console.log("cookie:: " + document.cookie)
    let cookies = document.cookie;
    //console.log("document.cookie: " + cookies);
    //const cookieList = document.cookie.split('; ');
    //console.log("cookie[0] " + cookieList[0] + ", cookie[1] " + cookieList[1])
  }
  
  function cookie_get(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function cookie_check() {
    let user = cookie_get("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         cookie_set("username", user, 30);
       }
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
    ctx.closePath();
    if (fillColor != "") {
        ctx.fillStyle = fillColor;
        ctx.fill(); //sedaj pa jo nafilaj tako, oklepaja tukaj obvezna!!!
    }
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
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
    
    //----------------------------------------
    // https://stackoverflow.com/questions/46949891/html5-canvas-fontboundingboxascent-vs-actualboundingboxascent
    // fontBoundingBoxAscent ... The distance from the horizontal line indicated by the textBaseline attribute to the top of the highest bounding rectangle of all the fonts used to render the text, in CSS pixels; positive numbers indicating a distance going up from the given baseline.'
    // fontBoundingBoxDescent ... The distance from the horizontal line indicated by the textBaseline attribute to the bottom of the lowest bounding rectangle of all the fonts used to render the text, in CSS pixels; positive numbers indicating a distance going down from the given baseline.
    // actualBoundingBoxAscent ... The distance from the horizontal line indicated by the textBaseline attribute to the top of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going up from the given baseline.
    // actualBoundingBoxDescent ... The distance from the horizontal line indicated by the textBaseline attribute to the bottom of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going down from the given baseline.
    // To calculate the text height you can do the following:
    //     fontHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
    //     actualHeight = actualBoundingBoxAscent + actualBoundingBoxDescent;
    // fontHeight is the bounding box height regardless of the string being rendered. actualHeight is specific to the string being rendered.    
    //----------------------------------------
    
    ctx.font = font
    let msrText = ctx.measureText(text);
    //if (text == gl_versionDate) { console.log("msrText.width=" + msrText.width) }
    return [msrText.width, msrText.actualBoundingBoxAscent]; // The distance from the horizontal line indicated by the textBaseline attribute to the top of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going up from the given baseline.
}

function gBannerRectWithText(x0, y0, x1, y1, ddx, ddy, fillColor, strokeWidth, strokeColor, font, fontColor, tmpStr, shaddowColor, xShaddow, yShaddow) {
    //-------------------------------
    // x0,y0,x1,y1 ... notranji nevidni okvir, tudi tekst se spodaj izpisuje na y1 (nad y1)
    // dd          ... toliko od notranjega okvirja od zunanjega izrisanega okvirja
    // x(y)Shaddow ... kako daleč pade senca desno in navzdol
    //-------------------------------
    let top = y0 - ddy
    let left = x0 - ddx
    let bottom = y1 + ddy
    let right = x1 + ddx
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
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
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
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
    }
    //----
    if (fillColor != "") {
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    //----
    if (strokeWidth > 0) {
        ctx.setLineDash([]);
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.stroke();
    }
    //gText(tmpStr, font, "lightYellow", x0 + 2, y1 +2)
    if (tmpStr != "") {
        gText(tmpStr, font, fontColor, x0, y1)
    }
}

function gBannerRectWithText2(text, xiLeft, yiTop, font, xGap, yGap, ddx, ddy, fillColor, strokeWidth, strokeColor, fontColor, shaddowColor, xShaddow, yShaddow) {
    //-------------------------------
    // xiLeft,yiTop,x1,y1 ... notranji nevidni okvir, tudi tekst se spodaj izpisuje na y1 (nad y1)
    // dd          ... toliko od notranjega okvirja od zunanjega izrisanega okvirja
    // x(y)Shaddow ... kako daleč pade senca desno in navzdol
    //-------------------------------
    let w, h;

    //;[w, h] = gMeasureText("jgP", font); console.log("jgP-" + h); // 11
    //;[w, h] = gMeasureText("PP", font); console.log("PP-" + h);   // 10
    //;[w, h] = gMeasureText("jg", font); console.log("jg-" + h);   // 11
    //;[w, h] = gMeasureText("aa", font); console.log("aa-" + h);   //  7

    ;[w, h] = gMeasureText(text, font);
    let xiRight = xiLeft + w; let yiBottom = yiTop + h;
    let top = yiTop - yGap;
    let left = xiLeft - xGap;
    //let bottom = yiBottom + yGap;
    let bottom = yiBottom + yGap + 0; // tole 1 na koncu dodal 15.12.2023, ker se mi je zdelo, da je zgoraj nad tekstom do okvirja bannerja nekaj več lufta kot spodaj / vpliva na HELP in listo postaj
    let right = xiRight + xGap;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = left; x2 = left + ddx; x3 = right - ddx; x4 = right;
    y1 = top; y2 = top + ddy; y3 = bottom - ddy; y4 = bottom;
    //----
    if (shaddowColor != "") {
        ctx.beginPath()
        ctx.moveTo(x2 + xShaddow, y1 + yShaddow)
        ctx.lineTo(x3 + xShaddow, y1 + yShaddow)
        ctx.lineTo(x4 + xShaddow, y2 + yShaddow)
        ctx.lineTo(x4 + xShaddow, y3 + yShaddow)
        ctx.lineTo(x3 + xShaddow, y4 + yShaddow)
        ctx.lineTo(x2 + xShaddow, y4 + yShaddow)
        ctx.lineTo(x1 + xShaddow, y3 + yShaddow)
        ctx.lineTo(x1 + xShaddow, y2 + yShaddow)
        ctx.closePath()  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = shaddowColor
        ctx.fill()
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        ctx.beginPath()
        ctx.moveTo(x2, y1)
        ctx.lineTo(x3, y1)
        ctx.lineTo(x4, y2)
        ctx.lineTo(x4, y3)
        ctx.lineTo(x3, y4)
        ctx.lineTo(x2, y4)
        ctx.lineTo(x1, y3)
        ctx.lineTo(x1, y2)
        ctx.closePath()  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
    }
    //----
    if (fillColor != "") {
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    //----
    if (strokeWidth > 0) {
        ctx.setLineDash([]);
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.stroke();
    }
    //gText(text, font, "lightYellow", xiLeft + 2, y1 +2)
    if (text != "") {
        gText(text, font, fontColor, xiLeft, yiBottom)
    }
}

function gBannerRectWithText3(text, xiLeft, yiTop, font, xGap, yGapTop, yGapBottom, ddx, ddy, fillColor, strokeWidth, strokeColor, fontColor, shaddowColor, xShaddow, yShaddow) {
    //-------------------------------
    // xiLeft,yiTop,x1,y1 ... notranji nevidni okvir, tudi tekst se spodaj izpisuje na y1 (nad y1)
    // dd          ... toliko od notranjega okvirja od zunanjega izrisanega okvirja
    // x(y)Shaddow ... kako daleč pade senca desno in navzdol
    //-------------------------------
    let w, h;

    //;[w, h] = gMeasureText("jgP", font); console.log("jgP-" + h); // 11
    //;[w, h] = gMeasureText("PP", font); console.log("PP-" + h);   // 10
    //;[w, h] = gMeasureText("jg", font); console.log("jg-" + h);   // 11
    //;[w, h] = gMeasureText("aa", font); console.log("aa-" + h);   //  7

    ;[w, h] = gMeasureText(text, font);
    let xiRight = xiLeft + w; let yiBottom = yiTop + h - 1;
    let top = yiTop - yGapTop;
    let left = xiLeft - xGap;
    let bottom = yiBottom + yGapBottom; 
    let right = xiRight + xGap;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = left; x2 = left + ddx; x3 = right - ddx; x4 = right;
    y1 = top; y2 = top + ddy; y3 = bottom - ddy; y4 = bottom;
    //----
    if (shaddowColor != "") {
        ctx.beginPath()
        ctx.moveTo(x2 + xShaddow, y1 + yShaddow)
        ctx.lineTo(x3 + xShaddow, y1 + yShaddow)
        ctx.lineTo(x4 + xShaddow, y2 + yShaddow)
        ctx.lineTo(x4 + xShaddow, y3 + yShaddow)
        ctx.lineTo(x3 + xShaddow, y4 + yShaddow)
        ctx.lineTo(x2 + xShaddow, y4 + yShaddow)
        ctx.lineTo(x1 + xShaddow, y3 + yShaddow)
        ctx.lineTo(x1 + xShaddow, y2 + yShaddow)
        ctx.closePath()  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = shaddowColor
        ctx.fill()
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        ctx.beginPath()
        ctx.moveTo(x2, y1)
        ctx.lineTo(x3, y1)
        ctx.lineTo(x4, y2)
        ctx.lineTo(x4, y3)
        ctx.lineTo(x3, y4)
        ctx.lineTo(x2, y4)
        ctx.lineTo(x1, y3)
        ctx.lineTo(x1, y2)
        ctx.closePath()  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
    }
    //----
    if (fillColor != "") {
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    //----
    if (strokeWidth > 0) {
        ctx.setLineDash([]);
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.stroke();
    }
    //gText(text, font, "lightYellow", xiLeft + 2, y1 +2)
    if (text != "") {
        gText(text, font, fontColor, xiLeft, yiBottom)
    }
}

function gBannerRoundRect(left, top, width, height, radius,  fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll) {
    //-------------------------------
    // funkcija nariše pobarvan (opcija), osenčen (opcija), obkrožen (opcija), in zaobljen (nastavljiv radius) okvir
    // left, top, width, height ... okvir
    // radius                   ... vogali zaoljeni s krogom tega polmera
    // fillColor                ... notranja barva (če je "" potem se ne polni)
    // strokeWidth              ... debelina črte okoli okvirja (če je 0, potem se črte ne riše)
    // strokeColor              ... barva črte okoli okvirja
    // shaddowColor             ... barva senčenja okvirja
    // xShaddow, yShaddow       ... kako daleč pade senca desno in navzdol
    // shaddowAll               ... ali mora biti senčeno okoli in okoli (=true), ali pač desno navzdol (=false)
    //-------------------------------

    let right = left + width;
    let bottom = top + height;
    let ddx = radius; let ddy = radius;
    //----
    if (shaddowColor != "") {
        ctx.save(); //zapomnim si ctx brez clipping region-a
        switch (shaddowAll) {
            case true:  gBannerRoundRectPath(left, top, right, bottom, ddx, ddy, radius, -xShaddow, xShaddow, -yShaddow, yShaddow); break;
            case false: gBannerRoundRectPath(left, top, right, bottom, ddx, ddy, radius, xShaddow, xShaddow, yShaddow, yShaddow); break;
        }
        ctx.fillStyle = shaddowColor;
        ctx.fill();
        ctx.restore(); //s tem se znebim clipping region-a na ctx-u
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        gBannerRoundRectPath(left, top, right, bottom, ddx, ddy, radius, 0, 0, 0, 0);
        //----
        if (fillColor != "") {
            if (lo_linearGradientFill) {
                const gradient = ctx.createLinearGradient(left, top, left + width, top + height);
                gradient.addColorStop(rgfcs1, rgfc1);
                gradient.addColorStop(rgfcs2, rgfc2);
                if (rgfc3 != "") { gradient.addColorStop(rgfcs3, rgfc3); }
                ctx.fillStyle = gradient;
            } else if (lo_radialGradientFill) {
                const gradient = ctx.createRadialGradient(left + 0.7 * width, top + 0.3 * height, 0.5 * height, left + 0.7 * width, top + 0.7 * height, Math.max(width, height));
                gradient.addColorStop(rgfcs1, rgfc1);
                gradient.addColorStop(rgfcs2, rgfc2);
                if (rgfc3 != "") { gradient.addColorStop(rgfcs3, rgfc3); }
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = fillColor;
            }
            ctx.fill();
            lo_linearGradientFill = false;
            lo_radialGradientFill = false;
        }
        //----
        if (strokeWidth > 0) {
            ctx.setLineDash([]);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }
    }
}

function gBannerRoundRectPath(left, top, right, bottom, ddx, ddy, radius, xShaddowLeft, xShaddowRight, yShaddowTop, yShaddowBottom) {

    ctx.beginPath();

    // Create clipping path (15.2.2023 v1.16) https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
    if (xShaddowLeft != 0 || xShaddowRight != 0 || yShaddowTop != 0 || yShaddowBottom != 0) {
        let region = new Path2D();
        region.rect(left + xShaddowLeft, top + yShaddowTop, right + xShaddowRight - left - xShaddowLeft, bottom + yShaddowBottom - top - yShaddowTop);
        //region.rect(left, top, right - left, bottom - top);
        region.moveTo(left + ddx, top);
        region.arcTo(right, top, right, top + ddy, radius);       // naredi linijo do desne zgornje strani in potem četrt kroga navzdol proti navpičnici
        region.arcTo(right, bottom, right - ddx, bottom, radius); // naredi linijo do desne spodnje strani in potem četrt kroga levo proti vodoravnici
        region.arcTo(left, bottom, left, bottom - ddy, radius);   // naredi linijo do leve spodnje strani in potem četrt kroga navzgor proti navpičnici
        region.arcTo(left, top, left + ddx, top, radius);         // naredi linijo do leve zgornje strani in potem četrt kroga desno proti vodoravnici
        ctx.clip(region, "evenodd");
    }

    ctx.moveTo(left + ddx + xShaddowLeft, top + yShaddowTop);
    ctx.arcTo(right + xShaddowRight, top + yShaddowTop, right + xShaddowRight, top + ddy + yShaddowTop, radius);             // naredi linijo do desne zgornje strani in potem četrt kroga navzdol proti navpičnici
    ctx.arcTo(right + xShaddowRight, bottom + yShaddowBottom, right - ddx + xShaddowRight, bottom + yShaddowBottom, radius); // naredi linijo do desne spodnje strani in potem četrt kroga levo proti vodoravnici
    ctx.arcTo(left + xShaddowLeft, bottom + yShaddowBottom, left + xShaddowLeft, bottom - ddy + yShaddowBottom, radius);     // naredi linijo do leve spodnje strani in potem četrt kroga navzgor proti navpičnici
    ctx.arcTo(left + xShaddowLeft, top + yShaddowTop, left + ddx + xShaddowLeft, top + yShaddowTop, radius);                 // naredi linijo do leve zgornje strani in potem četrt kroga desno proti vodoravnici

    ctx.closePath();  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
}
    
function gBannerRoundRectWithText(left, top, width, height, font, fontColor, text, ddx, ddy, radius,  fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll) {
    //-------------------------------
    // funkcija nariše pobarvan (opcija), osenčen (opcija), obkrožen (opcija), in zaobljen (nastavljiv radius) okvir s tekstom (opcija)
    // left, top, width, height ... okvir
    // font, fontColor          ... parametri za tekst
    // text                     ... tekst za izpis (če je prazen se ne izpiše nič)
    // ddx, ddy                 ... koliko praznega prostora po X in Y je okoli virtualnega okvirja teksta
    // radius                   ... vogali zaoljeni s krogom tega polmera
    // fillColor                ... notranja barva (če je "" potem se ne polni)
    // strokeWidth              ... debelina črte okoli okvirja (če je 0, potem se črte ne riše)
    // strokeColor              ... barva črte okoli okvirja
    // shaddowColor             ... barva senčenja okvirja
    // xShaddow, yShaddow       ... kako daleč pade senca desno in navzdol
    // shaddowAll               ... ali mora biti senčeno okoli in okoli (=true), ali pač desno navzdol (=false)
    //-------------------------------

    //---- banner
    gBannerRoundRect(left - ddx, top - ddy, width + 2 * ddx, height + 2 * ddy, radius, fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll);
    //---- text
    if (text != "") {
        gText(text, font, fontColor, left, top + height)
    }
}

function gBannerRect(left, top, width, height, ddx, ddy, fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll) {
    //-------------------------------
    // left, top, width, height ... okvir
    // ddx, ddy                 ... koliko poreže vogale
    // xShaddow, yShaddow       ... kako daleč pade senca desno in navzdol
    // shaddowAll               ... ali mora biti senčeno okoli in okoli (boolean)
    //-------------------------------
    let w, h;

    let right = left + width; let bottom = top + height;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = left; x2 = left + ddx; x3 = right - ddx; x4 = right;
    y1 = top; y2 = top + ddy; y3 = bottom - ddy; y4 = bottom;
    //----
    if (shaddowColor != "") {
        ctx.beginPath()
        switch (shaddowAll) {
            case true:
                ctx.moveTo(x2 - xShaddow, y1 - yShaddow);
                ctx.lineTo(x3 + xShaddow, y1 - yShaddow);
                ctx.lineTo(x4 + xShaddow, y2 - yShaddow);
                ctx.lineTo(x4 + xShaddow, y3 + yShaddow);
                ctx.lineTo(x3 + xShaddow, y4 + yShaddow);
                ctx.lineTo(x2 - xShaddow, y4 + yShaddow);
                ctx.lineTo(x1 - xShaddow, y3 + yShaddow);
                ctx.lineTo(x1 - xShaddow, y2 - yShaddow);
                break;
            case false:
                ctx.moveTo(x2 + xShaddow, y1 + yShaddow);
                ctx.lineTo(x3 + xShaddow, y1 + yShaddow);
                ctx.lineTo(x4 + xShaddow, y2 + yShaddow);
                ctx.lineTo(x4 + xShaddow, y3 + yShaddow);
                ctx.lineTo(x3 + xShaddow, y4 + yShaddow);
                ctx.lineTo(x2 + xShaddow, y4 + yShaddow);
                ctx.lineTo(x1 + xShaddow, y3 + yShaddow);
                ctx.lineTo(x1 + xShaddow, y2 + yShaddow);
                break;
        }
        ctx.closePath();  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = shaddowColor;
        ctx.fill();
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        ctx.beginPath()
        ctx.moveTo(x2, y1)
        ctx.lineTo(x3, y1)
        ctx.lineTo(x4, y2)
        ctx.lineTo(x4, y3)
        ctx.lineTo(x3, y4)
        ctx.lineTo(x2, y4)
        ctx.lineTo(x1, y3)
        ctx.lineTo(x1, y2)
        ctx.closePath()  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
    }
    //----
    if (fillColor != "") {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    //----
    if (strokeWidth > 0) {
        ctx.setLineDash([]);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
}

function test_rotate() {

    // Non-rotated rectangle
    ctx.fillStyle = 'gray';
    ctx.fillRect(80, 60, 140, 30);

    // Matrix transformation
    ctx.translate(150, 75);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-150, -75);

    // Rotated rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(80, 60, 140, 30);
    ctx.rotate(3*Math.PI / 2);

}

function test_bezierCurveTo() {

    // Define the points as {x, y}
    //let start = { x: 50, y: 20 };
    //let cp1 = { x: 230, y: 30 };
    //let cp2 = { x: 150, y: 80 };
    //let end = { x: 250, y: 100 };

    let start = { x: 100, y: 100 };
    let cp1 = { x: 120, y: 130 };
    let cp2 = { x: 120, y: 170 };
    let end = { x: 100, y: 200 };

    // Cubic Bézier curve
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "orchid";
    ctx.stroke();

    // Start and end points
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
    ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
    ctx.fill();

    // Control points
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  // Control point one
    ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  // Control point two
    ctx.fill();
}

function test_arcTo() {
    // Tangential lines
ctx.beginPath();
ctx.strokeStyle = 'gray';
ctx.moveTo(200, 20);
ctx.lineTo(200, 330);
ctx.lineTo(50, 20);
ctx.stroke();

// Arc
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.moveTo(200, 20);
ctx.arcTo(200,330, 50,20, 40);
ctx.stroke();

// Start point
ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.arc(200, 20, 5, 0, 2 * Math.PI);
ctx.fill();

// Control points
ctx.beginPath();
ctx.fillStyle = 'red';
ctx.arc(200, 330, 5, 0, 2 * Math.PI); // Control point one
ctx.arc(50, 20, 5, 0, 2 * Math.PI);   // Control point two
ctx.fill();
}

class slider {
    constructor(left, bodyMiddle, width, items, value, minItemValue, step, enabled, color, disabledColor, bodyWidth, selWidth, selHeight, selShaddowColor, text, font, gap, posAlign, textColor, disabledTextColor, valueFont, valueColor, valueGap, addZoneUp, addZoneDown, visible) {
        this.left = left;
        this.bodyMiddle = bodyMiddle;
        this.width = width;
        this.items = items;
        this.value = value;
        this.minItemValue = minItemValue;
        this.step = step;
        this.enabled = enabled;
        this.color = color;
        this.disabledColor = disabledColor;
        this.bodyWidth = bodyWidth;
        this.selWidth = selWidth;
        this.selHeight = selHeight;
        this.selShaddowColor = selShaddowColor;
        this.text = text;
        this.font = font;
        this.gap = gap;
        this.posAlign = posAlign;
        this.textColor = textColor;
        this.disabledTextColor = disabledTextColor;
        this.valueFont = valueFont;
        this.valueColor = valueColor;
        this.valueGap = valueGap;
        this.addZoneUp = addZoneUp;
        this.addZoneDown = addZoneDown;
        this.visible = visible;
    }
    paint() {
        if (!this.visible) { return };
        let myColor = this.enabled ? this.color : this.disabledColor;
        let selStrokeColor = this.enabled ? this.selShaddowColor : this.disabledColor;
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
        let itemWidth = this.width / this.items;
        let itemWidthHalf = itemWidth / 2
        const chooserWidthHalf = Math.trunc(this.selWidth / 2)
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        if (focused) {
            let addM = 5; gBannerRect(this.left - addM, bodyTop - addM, this.width + 2 * addM, this.bodyWidth + 2 * addM, 3, 3, focusedColor, 0, "", "", 0, 0, false);
        }
        gLine(this.left, this.bodyMiddle, this.left + this.width, this.bodyMiddle, this.bodyWidth, myColor, [])
        let step, x, tmpStr, tmpStr2, tmpW, tmpH, vl_value, x1, x2, y1, myTextColor;
        for (step = 1; step <= this.items; step++) {
            vl_value = this.minItemValue + (step - 1) * this.step
            x = this.left + itemWidthHalf + (step - 1) * itemWidth
            gLine(x, bodyBottom + 2, x, bodyBottom + 4, 3, myColor, [])
            if (step == valueItem) {
                //---- risanje trikotnega selektorja v to vrednost
                x1 = x - chooserWidthHalf;
                x2 = x + chooserWidthHalf;
                y1 = bodyBottom + this.selHeight
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y1)
                ctx.lineTo(x, bodyBottom)
                ctx.closePath()  // ... zadnjo ni treba vleči črte, ampak samo zapreš pot
                ctx.fillStyle = myColor
                ctx.fill()
                ctx.setLineDash([]);
                ctx.strokeStyle = selStrokeColor;
                ctx.lineWidth = 1;
                ctx.stroke();
                //gLine(x1 + 1, y1 + 1, x2 + 1, y1 + 1, 1, "gray", [])
                //gLine(x2 + 1, y1 + 1, x + 1, bodyBottom + 1, 1, "gray", [])
            }
            else if (step == 1 || step == this.items) {
                tmpStr = vl_value.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, this.valueFont);
                myTextColor = this.enabled ? this.valueColor : this.disabledTextColor;
                gText(tmpStr, this.valueFont, myTextColor, x - tmpW / 2, bodyBottom + this.valueGap + tmpH)
            }
        }
        //---- izpis teksta
        switch (this.posAlign) {
            case "above-left":
                ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
                myTextColor = this.enabled ? this.textColor : this.disabledTextColor;
                gText(this.text, this.font, myTextColor, this.left, bodyTop - this.gap);
        }
    }
    eventClick(mouseX, mouseY) {
        //console.log("slider->eventClick()")
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
        let itemWidth = this.width / this.items;
        let itemWidthHalf = itemWidth / 2
        const chooserWidthHalf = Math.trunc(this.selWidth / 2)
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let step, x, x0, x1, y0, y1, vl_value;
        for (step = 1; step <= this.items; step++) {
            vl_value = this.minItemValue + (step - 1) * this.step;
            x = this.left + itemWidthHalf + (step - 1) * itemWidth;
            x0 = x - itemWidthHalf; x1 = x + itemWidthHalf;
            y0 = bodyTop - 8 - this.addZoneUp; y1 = bodyBottom + 10 + this.addZoneDown
            if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) {
                this.value = vl_value;
                return this.value
            }
        }
        return (this.minItemValue - 1)
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let x0, x1, y0, y1;
        x0 = this.left; x1 = x0 + this.width;
        y0 = bodyTop - 8; y1 = bodyBottom + this.selHeight;
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) {
            return true;
        } else { return false; };
    }
    setAddZone(addZoneUp, addZoneDown) {
        this.addZoneUp = addZoneUp;
        this.addZoneDown = addZoneDown;
    }
}

class slider2 {
    constructor(left, bodyMiddle, width, items, value0, useValue0, value, minItemValue, step, enabled, color, disabledColor, bodyWidth, selWidth, selHeight, selShaddowColor, text, font, gap, posAlign, textColor, disabledTextColor, valueFont, valueColor, valueGap, addZoneUp, addZoneDown, visible) {
        this.left = left;
        this.bodyMiddle = bodyMiddle;
        this.width = width;
        this.items = items;
        this.value0 = value0; this.useValue0 = useValue0; this.value = value; this.minItemValue = minItemValue; this.step = step;
        this.enabled = enabled;
        this.color = color; this.disabledColor = disabledColor;
        this.bodyWidth = bodyWidth;
        this.selWidth = selWidth; this.selHeight = selHeight; this.selShaddowColor = selShaddowColor;
        this.text = text; this.font = font; this.gap = gap; this.posAlign = posAlign; this.textColor = textColor; this.disabledTextColor = disabledTextColor;
        this.valueFont = valueFont; this.valueColor = valueColor; this.valueGap = valueGap;
        this.addZoneUp = addZoneUp; this.addZoneDown = addZoneDown;
        this.visible = visible;
        //---- additional object properties
        this.itemWidth = width / items; //13.12.2023
    }
    paint() {
        if (!this.visible) { return };
        let myColor = this.enabled ? this.color : this.disabledColor;
        let selStrokeColor = this.enabled ? this.selShaddowColor : this.disabledColor;
        const useValue0 = true;
        let valueItem0 = useValue0 ? (Math.round((this.value0 - this.minItemValue) / this.step) + 1) : 1;
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
        let itemWidth = this.width / this.items;
        let itemWidthHalf = itemWidth / 2
        const chooserWidthHalf = Math.trunc(this.selWidth / 2)
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        if (focused) {
            let addM = 5; gBannerRect(this.left - addM, bodyTop - addM, this.width + 2 * addM, this.bodyWidth + 2 * addM, 3, 3, focusedColor, 0, "", "", 0, 0, false);
        }
        let x, x0, x1, x2, xx, y1;
        if (this.useValue0) {
            x0 = this.left + (this.value0 - this.minItemValue) / this.step * itemWidth;
            x = this.left + (this.value +1 - this.minItemValue) / this.step * itemWidth;
            gLine(this.left, this.bodyMiddle, x0, this.bodyMiddle, this.bodyWidth, this.disabledColor, []);
            gLine(x0, this.bodyMiddle, x, this.bodyMiddle, this.bodyWidth, myColor, []);
            gLine(x, this.bodyMiddle, this.left + this.width, this.bodyMiddle, this.bodyWidth, this.disabledColor, []);
            if (this.value0 == this.value) {
                gLine(x0 - 2, this.bodyMiddle, x0 + 2, this.bodyMiddle, this.bodyWidth, myColor, []);
            }
        } else { gLine(this.left, this.bodyMiddle, this.left + this.width, this.bodyMiddle, this.bodyWidth, myColor, []) }
        let step, tmpStr, tmpStr2, tmpW, tmpH, vl_value, myTextColor, addX;
        for (step = 1; step <= this.items; step++) {
            vl_value = this.minItemValue + (step - 1) * this.step
            x = this.left + itemWidthHalf + (step - 1) * itemWidth
            gLine(x, bodyBottom + 2, x, bodyBottom + 4, 3, myColor, [])
            //---- risanje začetnega in končnega selektorja
            //     če je končna vrednost enaka začetni, naj bo selektor začetne vrednosti malce zamaknjen levo, selektor končne vrednosti pa v desno
            if (this.useValue0) { addX = (valueItem == valueItem0) ? (itemWidth / 4) : 0; } else { addX = 0 };
            if (this.useValue0 && step == valueItem0) {
                this.paint_selector(x - addX, chooserWidthHalf, bodyBottom, myColor, selStrokeColor);
            }
            if (step == valueItem) {
                this.paint_selector(x + addX, chooserWidthHalf, bodyBottom, myColor, selStrokeColor);
            }
            if ((step == 1 || step == this.items) && step!=valueItem0 && step!=valueItem) {
                tmpStr = vl_value.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, this.valueFont);
                myTextColor = this.enabled ? this.valueColor : this.disabledTextColor;
                gText(tmpStr, this.valueFont, myTextColor, x - tmpW / 2, bodyBottom + this.valueGap + tmpH)
            }
        }
        //---- izpis teksta meseca oziroma obdobja
        switch (this.posAlign) {
            case "above-left":
                ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
                myTextColor = this.enabled ? this.textColor : this.disabledTextColor;
                gText(this.text, this.font, myTextColor, this.left, bodyTop - this.gap);
        }
    }
    paint_selector(xx, chooserWidthHalf, bodyBottom, myColor, selStrokeColor) {
        //console.log("      slider2.paint_selector(): xx=" + xx.toString() + " chooserWidthHalf=" + chooserWidthHalf.toString() + " bodyBottom=" + bodyBottom.toString());
        let x1, x2, y1
        x1 = xx - chooserWidthHalf;
        x2 = xx + chooserWidthHalf;
        y1 = bodyBottom + this.selHeight
        //console.log("        x1=" + x1.toString() + " x2=" + x2.toString() + " y1=" + y1.toString());
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y1)
        ctx.lineTo(xx, bodyBottom)
        ctx.closePath()  // ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = myColor
        ctx.fill()
        ctx.setLineDash([]);
        ctx.strokeStyle = selStrokeColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    eventClick(mouseX, mouseY) {
        //console.log("slider2->eventClick()")
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
        let itemWidth = this.width / this.items;
        let itemWidthHalf = itemWidth / 2
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let step, x, x0, x1, y0, y1, vl_value;
        //---- če je po Y izven obsega, potem lahko takoj zaključimo
        y0 = bodyTop - 8 - this.addZoneUp; y1 = bodyBottom + 10 + this.addZoneDown
        if (mouseY < y0 || mouseY > y1) { return [this.minItemValue - 1, this.minItemValue - 1]; }
        //---- če je po X izven obsega, potem lahko takoj zaključimo
        x0 = this.left; x1 = this.left + this.width;
        if (mouseX < x0 || mouseX > x1) { return [this.minItemValue - 1, this.minItemValue - 1]; }
        //---- miška je znotraj območja možnega klika
        vl_value = Math.round(this.minItemValue + (mouseX - this.left - itemWidthHalf) / itemWidth);
        vl_value = fixForRange(vl_value, this.minItemValue, this.minItemValue + (this.items - 1) * this.step);
        //console.log("  clicked value=" + vl_value);
        switch (this.useValue0) {
            case true:
                //---- če je klik bil ravno na začetno ali končno vrednost, potem samo vrnem trenutne vrednosti
                if (vl_value == this.value0 || vl_value == this.value) { return [this.value0, this.value] }
                //---- če je klik bil levo od začetne vrednosti, potem je to sprememba začetne vrednosti
                if (vl_value < this.value0) { return [vl_value, this.value] };
                //---- če je klik bil desno od končne vrednosti, potem je to sprememba končne vrednosti
                if (vl_value > this.value) { return [this.value0, vl_value] };
                //---- klik je bil vmes med začetno in končno izbrano vrednostjo - popravimo tisto, ki je bližje
                if ((vl_value - this.value0) < (this.value - vl_value)) {
                    return [vl_value, this.value]; // klik je bil bližje začetni izbrani vrednosti
                } else {
                    return [this.value0, vl_value]; // klik je bil bližje končni izbrani vrednosti
                }
            case false:
                return [this.value0, vl_value];
        }
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let x0, x1, y0, y1;
        x0 = this.left; x1 = x0 + this.width;
        //---- če je trikotnik selektorja širši od razmika med dvema vrednostima (itemWidth), potem je območje detekcije potrebno razširiti še za polovico te razlike
        if (this.selWidth > this.itemWidth) {
            x0 -= (this.selWidth - this.itemWidth) / 2;
            x1 += (this.selWidth - this.itemWidth) / 2;
        }
        y0 = bodyTop - 8; y1 = bodyBottom + this.selHeight;
        //console.log("      slider2.eventMouseWithin(): x0=" + x0.toString() + " x1=" + x1.toString() + " y0=" + y0.toString() + " y1=" + y1.toString());
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) {
            return true;
        } else { return false; };
    }
    setAddZone(addZoneUp, addZoneDown) {
        this.addZoneUp = addZoneUp;
        this.addZoneDown = addZoneDown;
    }
    eventMouseOverValue(mouseX, mouseY) {
        //console.log("slider2->eventMouseOverValue()")
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
        let itemWidth = this.width / this.items;
        let itemWidthHalf = itemWidth / 2
        const bodyHeightHalf = Math.trunc(this.bodyWidth / 2);
        const bodyBottom = this.bodyMiddle + bodyHeightHalf;
        const bodyTop = this.bodyMiddle - bodyHeightHalf
        let x0, x1, y0, y1, vl_value;
        //---- če je po Y izven obsega, potem lahko takoj zaključimo
        y0 = bodyTop - 8 - this.addZoneUp; y1 = bodyBottom + 10 + this.addZoneDown
        if (mouseY < y0 || mouseY > y1) { return (this.minItemValue - 1); }
        //---- če je po X izven obsega, potem lahko takoj zaključimo
        //x0 = this.left; x1 = this.left + this.width;
        x0 = this.left - this.addZoneUp; x1 = this.left + this.width + this.addZoneDown; // 20.12.2023 pri velikem razponu vrednosti na sliderju je težko zadeti zadnjo ali prvo vrdnost. Zato še po X razširim tako, kot je bilo že prej po Y, in če je izven, postavim na zadnjo/prvo vrednost
        if (mouseX < x0 || mouseX > x1) {
            return (this.minItemValue - 1);
        }
        if (valueBetween(mouseX), x0, x1) {
            if (mouseX < x0) { mouseX = x0 }; // 20.12.2023 postavim na prvo vrednost, če je vlekel še nekoliko bolj levo od prve
            if (mouseX > x1) { mouseX = x1 }; // 20.12.2023 postavim na zadnjo vrednost, če je vlekel še nekoliko bolj desno od prve
            //---- miška je znotraj območja možnega klika
            vl_value = Math.round(this.minItemValue + (mouseX - this.left - itemWidthHalf) / itemWidth);
            vl_value = fixForRange(vl_value, this.minItemValue, this.minItemValue + (this.items - 1) * this.step);
            //console.log("  mouse over value=" + vl_value);
        } else {
            return (this.minItemValue - 1)
        };
 
        return vl_value;
    }
}

class intChooser {
    constructor(left, top, width, items, value, minItemValue, step, allowExceedValues, color, fillColor, crossColor, exceedCrossColor, outRadij, inRadij, selRadij, bodyWidth, text, font, gap, posAlign, textColor, clickGap, enabled, disabledColor, disabledTextColor, visible, toolTipText, keyStroke) {
        this.left = left; this.top = top; this.width = width; // top: zgornji rob krogcev
        this.items = items; this.value = value; this.minItemValue = minItemValue; this.step = step; this.allowExceedValues = allowExceedValues;
        this.color = color;
        this.fillColor = fillColor;
        this.crossColor = crossColor; this.exceedCrossColor = exceedCrossColor;
        this.outRadij = outRadij;
        this.inRadij = inRadij;
        this.selRadij = selRadij;
        this.bodyWidth = bodyWidth;
        this.text = text;
        this.font = font;
        this.gap = gap;
        this.posAlign = posAlign;
        this.textColor = textColor;
        this.clickGap = clickGap;
        this.enabled = enabled; this.disabledColor = disabledColor; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
        this.toolTipText = toolTipText; // 24.12.2023
        this.keyStroke = keyStroke;     // 24.12.2023
    }
    paint() {
        if (!this.visible) { return };
        let myColor = this.color; let myCrossColor = this.crossColor; let myExceedCrossColor = this.exceedCrossColor;
        if (!this.enabled) { myColor = this.disabledColor; myCrossColor = this.disabledColor, myExceedCrossColor = this.disabledColor }
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let maxRegularValue = this.minItemValue + (this.items - 1) * this.step;
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1; //začnejo se z 1
        if (this.allowExceedValues && valueItem > this.items) { valueItem = this.items }; //12.12.2023
        const cv_bodyWidthHalf = Math.trunc(this.bodyWidth / 2);
        let yBodyMiddle = this.top + this.outRadij;
        if (focused) {
            let addM = 3; gBannerRect(this.left - addM, this.top - addM, this.width + 2 * addM, 2 * this.outRadij + 2 * addM, 3, 3, focusedColor, 0, "", "", 0, 0, false);
            //gLine(this.left + 2 * this.outRadij - 2, yBodyMiddle, this.left + this.width - 2 * this.outRadij + 2, yBodyMiddle, this.bodyWidth + 2, "limeGreen", []);
        }
        gLine(this.left + 2 * this.outRadij - 2, yBodyMiddle, this.left + this.width - 2 * this.outRadij + 2, yBodyMiddle, this.bodyWidth, myColor, []);
        let xStep = (this.width - 2 * this.outRadij) / (this.items - 1);
        let step, x, tmpStr, tmpStr2, tmpW, tmpH
        //let font = "normal verdana 10pt"
        let font = "italic Cambria 20pt";
        for (step = 1; step <= this.items; step++) {
            x = this.left + this.outRadij + (step - 1) * xStep
            //---- prazen krogec za vsako opcijo
            gEllipse(x, yBodyMiddle, this.outRadij, this.outRadij, 0, myColor, 0, "")
            gEllipse(x, yBodyMiddle, this.inRadij, this.inRadij, 0, this.fillColor, 0, "")
            //---- poln krogec za vsako opcijo
            if (step == valueItem) {
                //gEllipse(x, yBodyMiddle, this.selRadij, this.selRadij, 0, myCrossColor, 0, "")
                if (this.allowExceedValues && this.value > maxRegularValue) {
                    gEllipse(x + 1, yBodyMiddle, this.selRadij, this.selRadij, 0, myExceedCrossColor, 0, "")
                } else {
                    gEllipse(x, yBodyMiddle, this.selRadij, this.selRadij, 0, myCrossColor, 0, "")
                }
            }
        }
        //---- izpis teksta
        switch (this.posAlign) {
            case "above-left":
                ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
                let myTextColor = this.enabled ? this.textColor : this.disabledTextColor;
                gText(this.text, this.font, myTextColor, this.left, yBodyMiddle - this.outRadij - this.gap);
        }
        // toolTip (24.12.2023)
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
        }
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
        let tmpItemValue = this.eventMouseOverOption(mouseX, mouseY, true);
        if (tmpItemValue >= this.minItemValue) {
            this.value = tmpItemValue
            return this.value  
            //return 24; //19.11.2023 če bi hotel da se dela povprečje po drugačnem številu zadnjih mesecev, ne le med 1 in 5. Konkretno sem rabil narediti za 24
        } else { return (this.minItemValue - 1) }  //manj od minimuma, da se potem tam izven ve, da ni bilo klika na to komponento
    }
    eventMouseWithin(mouseX, mouseY) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let x0 = this.left;
        let x1 = this.left + this.width;
        let y0 = this.top;
        let y1 = this.top + 2 * this.outRadij;
        //console.log("x0=" + x0 + " x1=" + x1 + " y0=" + y0 + " y1=" + y1);
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) { return true; } else { return false; }
    }
    eventMouseOverOption(mouseX, mouseY, returnItem) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) {
            //return (this.minItemValue - 1);
            if (returnItem) { return (this.minItemValue - 1) } else { return false };            
        };
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
        if (this.allowExceedValues && valueItem > this.items) { valueItem = this.items }; //12.12.2023
        let yBodyMiddle = this.top + this.outRadij;
        let xStep = (this.width - 2 * this.outRadij) / (this.items - 1)
        let step, x, dx, dy, dist
        let y = yBodyMiddle
        for (step = 1; step <= this.items; step++) {
            x = this.left + this.outRadij + (step - 1) * xStep;
            dx = x - mouseX;
            dy = y - mouseY; 
            dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= (this.outRadij + this.clickGap)) {
                //this.value = this.minItemValue + (step - 1) * this.step
                if (returnItem) { return (this.minItemValue + (step - 1) * this.step) } else { return true };
            }
        }
        if (returnItem) { return (this.minItemValue - 1) } else { return false }; //manj od minimuma, da se potem tam izven ve, da ni bilo klika na to komponento
    }
}
    
class intChooser2H {
    constructor(left, top, items, value, addString, minItemValue, step, focusMargin, arrowWidth, arrowHeight, arrowGap, arrowColor, color, fillColor, crossColor, text, font, gap, posAlign, textColor, clickGap, enabled, disabledColor, disabledTextColor, visible) {
        this.left = left; this.top = top;
        this.items = items; this.value = value; this.addString = addString; this.minItemValue = minItemValue; this.step = step;
        this.focusMargin = focusMargin;
        this.arrowWidth = arrowWidth; this.arrowHeight = arrowHeight; this.arrowGap = arrowGap; this.arrowColor = arrowColor;
        this.color = color;
        this.fillColor = fillColor;
        this.crossColor = crossColor;
        this.text = text;
        this.font = font;
        this.gap = gap;
        this.posAlign = posAlign;
        this.textColor = textColor;
        this.clickGap = clickGap;
        this.enabled = enabled; this.disabledColor = disabledColor; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
        //---- additional object properties
        this.width = 100;
        this.height = 30;
    }
    paint() {
        if (!this.visible) { return };
        let myColor = this.color; let myCrossColor = this.crossColor;
        if (!this.enabled) { myColor = this.disabledColor; myCrossColor = this.disabledColor }
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
        let x, tmpStr, tmpStr2, tmpW, tmpH, vl_value, x1, x2, y1, y2, y3, myTextColor;
        tmpStr = this.value.toString() + this.addString;
        ;[tmpW, tmpH] = gMeasureText(tmpStr, this.font);
        //----
        let textWidth = tmpW;
        let textHeight = tmpH;
        let textLeft = this.left + this.focusMargin + this.arrowWidth + this.arrowGap + this.gap;
        let textTop = this.top + this.focusMargin + this.gap;
        //----
        let bannerWidth = textWidth + 2 * this.gap;
        let bannerHeight = textHeight + 2 * this.gap;
        let bannerLeft = textLeft - this.gap;
        let bannerTop = textTop - this.gap;
        //----
        let completeWidth = 2 * this.focusMargin + 2 * this.arrowWidth + 2 * this.arrowGap + bannerWidth;
        let completeHeight = 2 * this.focusMargin + bannerHeight;
        this.width = completeWidth;
        this.height = completeHeight;
        //----
        if (focused) {
            gBannerRect(this.left, this.top, completeWidth, completeHeight, 3, 3, focusedColor, 0, "", "", 0, 0, false);
        }

        //---- risanje levega trikotnika za zmanjšanje vrednosti
        x1 = this.left + this.focusMargin;
        x2 = x1 + this.arrowWidth;
        y2 = this.top + this.focusMargin + bannerHeight / 2;
        y1 = y2 - this.arrowHeight / 2;
        y3 = y2 + this.arrowHeight / 2;
        ctx.beginPath();
        ctx.moveTo(x1, y2);
        ctx.lineTo(x2, y3);
        ctx.lineTo(x2, y1);
        ctx.closePath();  // ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = this.arrowColor;
        ctx.fill();
        ctx.setLineDash([]);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();

        //---- risanje desnega trikotnika za povečanje vrednosti
        x1 = bannerLeft + bannerWidth + this.arrowGap;
        x2 = x1 + this.arrowWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y3);
        ctx.lineTo(x2, y2);
        ctx.closePath();  // ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        ctx.fillStyle = this.arrowColor;
        ctx.fill();
        ctx.setLineDash([]);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();

        //---- risanje bannerja
        gBannerRoundRectWithText(textLeft, textTop, textWidth, textHeight, this.font, this.color, this.value.toString() + this.addString, this.gap, this.gap, 7, "white", 1, "lightGray", "#D0D0D040", 2, 2, true)
        //ctx.beginPath(); ctx.rect(bannerLeft, bannerTop, bannerWidth, bannerHeight); ctx.closePath(); ctx.setLineDash([]); ctx.strokeStyle = "gray"; ctx.strokeWidth = 1; ctx.stroke();
        //ctx.beginPath(); ctx.rect(textLeft, textTop, textWidth, textHeight); ctx.closePath(); ctx.setLineDash([]); ctx.strokeStyle = "gray"; ctx.strokeWidth = 1; ctx.stroke();
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        //----
        if (this.eventMouseOverDecrease(mouseX, mouseY, false)) { return this.value - this.step; }
        else { if (this.eventMouseOverIncrease(mouseX, mouseY, false)) { return this.value + this.step; } };
        return false;
    }
    eventMouseWithin(mouseX, mouseY) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let x0 = this.left;
        let x1 = this.left + this.width;
        let y0 = this.top;
        let y1 = this.top + this.height;
        //console.log("x0=" + x0 + " x1=" + x1 + " y0=" + y0 + " y1=" + y1);
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) { return true; } else { return false; }
    }
    eventMouseOverOption(mouseX, mouseY, returnItem) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let x1, x2, y1, y2, y3;
        //---- klik na levi trikotnik za zmanjšanje vrednosti
        x1 = this.left + this.focusMargin;
        x2 = x1 + this.arrowWidth;
        y1 = this.top + this.arrowGap;
        y2 = y1 + this.arrowHeight / 2;
        y3 = y1 + this.arrowHeight;
        if (valueBetween(mouseX, x1, x2) && valueBetween(mouseY, y1, y3)) { return (this.value + 1) }
        
        //---- klik na desni trkotnik za povečanje vrednosti
        x2 = this.left + this.width;
        x1 = x2 - this.arrowWidth;
        if (valueBetween(mouseX, x1, x2) && valueBetween(mouseY, y1, y3)) { return (this.value - 1) }
        
        return false;

    }
    eventMouseOverDecrease(mouseX, mouseY, returnItem) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let x1, x2, y1, y2, y3;
        //---- miška nad levim trikotnikom za zmanjšanje vrednosti
        x1 = this.left + this.focusMargin;
        x2 = x1 + this.arrowWidth;
        y1 = this.top + this.arrowGap;
        y2 = y1 + this.arrowHeight / 2;
        y3 = y1 + this.arrowHeight;
        if (valueBetween(mouseX, x1, x2) && valueBetween(mouseY, y1, y3)) {
            if (returnItem) { return this.value } else { return true };
        }
        return false;
    }
    eventMouseOverIncrease(mouseX, mouseY, returnItem) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let x1, x2, y1, y2, y3;
        //---- miška nad desnim trikotnikom za povečanje vrednosti
        x2 = this.left + this.width - this.focusMargin;
        x1 = x2 - this.arrowWidth;
        y1 = this.top + this.arrowGap;
        y2 = y1 + this.arrowHeight / 2;
        y3 = y1 + this.arrowHeight;
        if (valueBetween(mouseX, x1, x2) && valueBetween(mouseY, y1, y3)) {
            if (returnItem) { return this.value } else { return true };
        }
        return false;
    }
    eventMouseOverIncreaseDecrease(mouseX, mouseY, returnItem) {
        //---- če je miška nad, potem glede na parameter returnItem vrne ali "true" ali vrednost kontrolerja, če pa ni, potem vrne "false"
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return false; };
        let rslt;
        rslt = this.eventMouseOverDecrease(mouseX, mouseY, returnItem);
        if (rslt !== false) {
            if (returnItem) { return rslt } else { return true };
        };
        rslt = this.eventMouseOverIncrease(mouseX, mouseY, returnItem);
        if (rslt !== false) {
            if (returnItem) { return rslt } else { return true };
        };
        return false;
    }
}

class checkBox {
    constructor(left, top, width, lineWidth, smoothPx, text, textColor, font, gap, posAlign, value, color, fillColor, crossColor, enabled, disabledLineColor, disabledFillColor, disabledTextColor, visible, toolTipText, keyStroke) {
        this.left = left; this.top = top; this.width = width;
        this.lineWidth = lineWidth;
        this.smoothPx = smoothPx;
        this.text = text; this.textColor = textColor; this.font = font;
        this.gap = gap;
        this.posAlign = posAlign;
        this.value = value;
        this.color = color;
        this.fillColor = fillColor;
        this.crossColor = crossColor;
        this.enabled = enabled; this.disabledLineColor = disabledLineColor, this.disabledFillColor = disabledFillColor; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
        this.toolTipText = toolTipText; // 24.12.2023
        this.keyStroke = keyStroke;     // 24.12.2023
    }
    paint() {
        if (!this.visible) { return };
        let tmpW, tmpH
        let x1 = this.left; let x2 = x1 + this.smoothPx; let x3 = this.left + this.width - this.smoothPx; let x4 = this.left + this.width;
        let y1 = this.top; let y2 = y1 + this.smoothPx; let y3 = this.top + this.width - this.smoothPx; let y4 = this.top + this.width;
        //---- če je miška nad njim, je treba to v GUI označiti
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        if (focused) { let addM = 5; gBannerRect(x1 - addM, y1 - addM, this.width + 2 * addM, this.width + 2 * addM, 3, 3, focusedColor, 0, "", "", 0, 0, false); }
        //---- risanje okvirčka
        ctx.beginPath()
        ctx.moveTo(x2, y1)
        ctx.lineTo(x3, y1)
        ctx.lineTo(x4, y2)
        ctx.lineTo(x4, y3)
        ctx.lineTo(x3, y4)
        ctx.lineTo(x2, y4)
        ctx.lineTo(x1, y3)
        ctx.lineTo(x1, y2)
        ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
        //ctx.fillStyle = this.fillColor
        ctx.fillStyle = this.enabled ? this.fillColor : this.disabledFillColor
        ctx.fill()
        ctx.setLineDash([]);
        ctx.strokeStyle = this.enabled ? this.color : this.disabledLineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        //---- izpis teksta
        let textColor;
        textColor = this.enabled ? this.textColor : this.disabledTextColor;
        ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
        switch (this.posAlign) {
            case "above-middle": //above-middle
                gText(this.text, this.font, textColor, this.left + (this.width - tmpW) / 2, this.top - this.gap);
                break;
            case "right-middle": //right-middle
                gText(this.text, this.font, textColor, this.left + this.width + 5, this.top + this.width / 2 + tmpH / 2);
                break;
        }
        //---- križec glede na vrednost
        if (this.value) {
            let vl_gap = this.lineWidth / 2 + 0.25 * (this.width - this.lineWidth); // 20% naj bo znotraj še praznega roba do križca
            x1 = this.left + vl_gap; x2 = this.left + this.width - vl_gap;
            y1 = this.top + vl_gap; y2 = this.top + this.width - vl_gap;
            gLine(x1, y1, x2, y2, this.lineWidth + 1, this.crossColor, []);
            gLine(x1, y2, x2, y1, this.lineWidth + 1, this.crossColor, []);
        }
        // toolTip (24.12.2023)
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
        }        
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return this.value; };
        if (this.eventMouseWithin(mouseX, mouseY)) { this.value = !this.value }
        return (this.value);
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        let x0 = this.left - this.lineWidth / 2;
        let x1 = this.left + this.width + this.lineWidth / 2;
        let y0 = this.top - this.lineWidth / 2;
        let y1 = this.top + this.width + this.lineWidth / 2;
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) 
             { return true; }
        else { return false; }
    }
}

class button {
    constructor(left, top, width, height, text, font, textColor, focusedTextColor, lineWidth, lineColor, focusedLineColor, fillColor, smoothPx, gapLeft, gapTop, gapRight, gapBottom, hAlign, vAlign, shaddowColor, xShaddow, yShaddow, shaddowAll, enabled, disabledFillColor, disabledTextColor, visible) {
        this.left = left; this.top = top; this.width = width; this.height = height;
        this.text = text; this.font = font; this.textColor = textColor; this.focusedTextColor = focusedTextColor;
        this.lineWidth = lineWidth; this.lineColor = lineColor; this.focusedLineColor = focusedLineColor;
        this.fillColor = fillColor;
        this.smoothPx = smoothPx;
        this.gapLeft = gapLeft; this.gapTop = gapTop; this.gapRight = gapRight; this.gapBottom = gapBottom;
        this.hAlign = hAlign; this.vAlign = vAlign;
        this.shaddowColor = shaddowColor; this.xShaddow = xShaddow; this.yShaddow = yShaddow; this.shaddowAll = shaddowAll;
        this.enabled = enabled; this.disabledFillColor = disabledFillColor; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
    }
    paint() {
        if (!this.visible) { return };
        //---- pravokotnik
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let lineColor = focused ? this.focusedLineColor : this.lineColor;
        let fillColor = this.enabled ? this.fillColor : this.disabledFillColor;
        gBannerRect(this.left, this.top, this.width, this.height, this.smoothPx, this.smoothPx, fillColor, this.lineWidth, lineColor, this.shaddowColor, this.xShaddow, this.yShaddow, this.shaddowAll);
        //---- text
        let tmpW, tmpH, x, y;
        ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
        let x0 = this.left + this.gapLeft; let x1 = this.left + this.width - this.gapRight;
        switch (this.hAlign) {
            case "left": x = x0; break;
            case "top": x = x1 - tmpW; break;
            case "middle": x = x0 + (x1 - x0) / 2 - tmpW / 2; break;
        }
        let y0 = this.top + this.gapTop; let y1 = this.top + this.height - this.gapBottom;
        switch (this.vAlign) {
            case "top": y = y0 + tmpH; break;
            case "bottom": y = y1; break;
            case "middle": y = y1 - (y1 - y0) / 2 + tmpH / 2; break;
        }
        let textColor = this.disabledTextColor;
        if (this.enabled) { textColor = focused ? this.focusedTextColor : this.textColor; }
        gText(this.text, this.font, textColor, x, y);
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        if (this.eventMouseWithin(mouseX, mouseY)) { return true; } else { return false; };
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        let x0 = this.left - this.lineWidth / 2;
        let x1 = this.left + this.width + this.lineWidth / 2;
        let y0 = this.top - this.lineWidth / 2;
        let y1 = this.top + this.height + this.lineWidth / 2;
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) 
             { return true; }
        else { return false; }
    }
}

class buttonPlayPauseStop {
    constructor(left, top, width, height, value, lineWidth, lineColor, focusedLineColor, fillColor, smoothPx, shaddowColor, xShaddow, yShaddow, shaddowAll, enabled, disabledFillColor, visible) {
        this.left = left; this.top = top; this.width = width; this.height = height;
        this.value = value;
        this.lineWidth = lineWidth; this.lineColor = lineColor; this.focusedLineColor = focusedLineColor;
        this.fillColor = fillColor;
        this.smoothPx = smoothPx;
        this.shaddowColor = shaddowColor; this.xShaddow = xShaddow; this.yShaddow = yShaddow; this.shaddowAll = shaddowAll;
        this.enabled = enabled; this.disabledFillColor = disabledFillColor;
        this.visible = visible;
    }
    paint() {
        if (!this.visible) { return };
        //---- pravokotnik
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let lineColor = focused ? this.focusedLineColor : this.lineColor;
        let fillColor = this.enabled ? this.fillColor : this.disabledFillColor;
        gBannerRect(this.left, this.top, this.width, this.height, this.smoothPx, this.smoothPx, fillColor, this.lineWidth, lineColor, this.shaddowColor, this.xShaddow, this.yShaddow, this.shaddowAll);
        //---- value symbol
        let x, y;
        let x0 = this.left + 0.3 * this.width; let x1 = this.left + 0.7 * this.width;
        let y0 = this.top + 0.3 * this.height; let y1 = this.top + 0.5 * this.height; let y2 = this.top + 0.7 * this.height
        switch (this.value) {
            case "play":
                ctx.beginPath()
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.lineTo(x0, y2);
                ctx.closePath()
                ctx.fillStyle = "mediumSeaGreen";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "darkGreen";
                ctx.stroke();
                break;
            case "pause":
                break;
            case "stop":
                ctx.beginPath()
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y0);
                ctx.lineTo(x1, y2);
                ctx.lineTo(x0, y2);
                ctx.closePath()
                ctx.fillStyle = "firebrick";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "darkRed";
                ctx.stroke();
                break;
        }
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        if (this.eventMouseWithin(mouseX, mouseY)) { return true; } else { return false; };
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        let x0 = this.left - this.lineWidth / 2;
        let x1 = this.left + this.width + this.lineWidth / 2;
        let y0 = this.top - this.lineWidth / 2;
        let y1 = this.top + this.height + this.lineWidth / 2;
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) 
             { return true; }
        else { return false; }
    }
}

function cLogVarStr(myVar) {
    //return Object.keys({ myVar })[0] + "=" + myVar.toString();

    //a = window[myVar];
    return myVar + '=' + window[myVar]; //tole deluje, ampak samo za globalne spremenljivke!!! 14.12.2023

}

function cLog1(var1Str, var1) {
    console.log(var1Str + "=" + var1.toString());
}
function cLogT1(desc, var1Str, var1) {
    console.log(desc + ": " + var1Str + "=" + var1.toString());
}
function cLog2(var1str, var1, var2str, var2) {
    console.log(var1str + "=" + var1.toString() + " " + var2str + "=" + var2.toString());
}
function cLogT2(desc, var1str, var1, var2str, var2) {
    console.log(desc + ": " + var1str + "=" + var1.toString() + " " + var2str + "=" + var2.toString());
}
function cLog4(var1str, var1, var2str, var2, var3str, var3, var4str, var4) {
    console.log(var1str + "=" + var1.toString() + " " + var2str + "=" + var2.toString() + " " + var3str + "=" + var3.toString() + " " + var4str + "=" + var4.toString());
}

//===========================================
//                                          =
//        ##2  __GLOBAL                     =
//                                          =
//===========================================

const cv_nrTock_min = 10; const cv_nrTock_max = 150;
const cv_kriterij12min = 20; const cv_kriterij12max = 60;
const cv_kriterij23min = 40; const cv_kriterij23max = 75;
const cv_kriterij34min = 60; const cv_kriterij34max = 90;
const cv_kriterij45min = 75; const cv_kriterij45max = 98;

var lo_useHalfPoint = false;
var lo_stepTock = 1;
var lo_nrTock = 40;
var lo_kriterij12 = 50;
var lo_kriterij23 = 65;
var lo_kriterij34 = 80;
var lo_kriterij45 = 90;
var lo_validOcena2, lo_validOcena3, lo_validOcena4;

var lo_tock5t, lo_tock5b;
var lo_tock4t, lo_tock4b;
var lo_tock3t, lo_tock3b;
var lo_tock2t, lo_tock2b;
var lo_tock1t, lo_tock1b;

var lo_enabledIntChooserNrTock = true;
var lo_enabledIntChooserKriterij12 = true;
var lo_enabledIntChooserKriterij23 = true;
var lo_enabledIntChooserKriterij34 = true;
var lo_enabledIntChooserKriterij45 = true;

const cv_naborKriterijev_1 = 1;
const cv_naborKriterijev_2 = 2;
const cv_naborKriterijev_min = 1;
const cv_naborKriterijev_max = 2;
var lo_naborKriterijev = cv_naborKriterijev_1;

const cv_printLevelMax = 4;
const cv_printLevelMin = 0;
var lo_printLevel = cv_printLevelMax; //4-vse, 3-manjka checkBox, 2-manjka checkBox in posivitve tabele, 1-manjka checkBox in posivitve tabele in črte vmes, 0-manjkajo checkBox / posivitve tabele / črte vmes / točke / kriteriji

console.clear;

//===========================================
//                                          =
//        ##3  __DATA                       =
//                                          =
//===========================================



//===========================================
//                                          =
//        ##4  __MAIN                       =
//                                          =
//===========================================

var gl_configChanged = true; // 19.12.2023


//---- mode aplikacije
const cv_mode_timeAvgTempSingle = 1;
const cv_mode_timeAvgTempMultiPlace = 2;
const cv_mode_timeAvgTempMultiTimeSlice = 3;
const cv_mode_vaccExcessDeath = 4;
const cv_mode_vaccExcessDeathMulti = 5;
const cv_minMode = 1;
const cv_maxMode = 3;
var gl_mode = cv_mode_timeAvgTempSingle;
var gl_modeLast = gl_mode; // 19.12.2023
                   // 28.12.2023
var nrToolTips = 0;             // 25.12.2023
const arrToolTipY = [];         // 25.12.2023
//arrToolTipMonth[1] = 890; arrToolTipY[1] = 500; nrToolTips = 1;

var lo_keyDownA = false
var lo_keyDownP = false
var lo_keyDown0 = false; //2.2.2023 v1.11
//---- spreminjanje zgornje in spodnje meje grafa po Y (6.12.2023)
var lo_keyDownU = false;      //6.12.2023
var lo_keyDownD = false;      //6.12.2023
var lo_keyDownW = false;      //13.12.2023
var lo_keyDownE = false;      //15.12.2023
var lo_keyDownShiftLeft = false; // 21.12.2023
var lo_keyDownO = false; // 22.12.2023
var lo_addTempMarginUp = 0;   //6.12.2023
var lo_addTempMarginDown = 0; //6.12.2023
//----
var gl_changeByMouseWheel_nrMonthsAvg = false; //21.12.2023
var gl_changeByMouseWheel_printLevel = false;   //21.12.2023
var gl_changeByMouseWheel_nrSmoothYears = false; //22.12.2023
//----
const cv_addMarkWidthMin = -1; //13.12.2023
const cv_addMarkWidthMax = 3; //13.12.2023
var lo_addMarkWidth = 0; //13.12.2023

const cv_addRightMarginMin = -200;   //15.12.2023
const cv_addRightMarginMax = 100;   //15.12.2023
const cv_addRightMarginMult = 10; //15.12.2023
var lo_addRightMargin = 0;        //15.12.2023

var lo_showGUI = true
var lo_showHelpTips = true;
var lo_showStations = false

var lo_showToolTips = true

// 29.7.2023 1.29
var tmMouseOutOfWindowId 
var lo_mouseOut = true  

// 26.1.2023 1.3
var lo_autoPlay = false  
var tmAutoPlayId                
var lo_autoPlayStarting = false 

var lo_mouseMoveX  = 0
var lo_mouseMoveY  = 0 

var lo_mouseDown = false
var lo_mouseDownX, lo_mouseDownY;

var lo_lastMouseLocation 

const lo_backgroundColor = "whiteSmoke"
const disabledControlLineColor = "silver";
const disabledControlBackColor = "#F0F0F0FF";
const disabledControlTextColor = "silver";
const focusedColor = "lightYellow";

var lo_linearGradientFill = false
var lgfc1x, lgfc1y, lgfc2x, lgfc2y, lgfc1, lgfc2, lgfc3, lgfcs1, lgfcs2, lgfcs3;
var lo_radialGradientFill = false
var rgfc1x, rgfc1y, rgfc1r, rgfc2x, rgfc2y, rgfc2r, rgfc1, rgfc2, rgfc3, rgfcs1, rgfcs2, rgfcs3;

//---------------------------------------------------------------------------
//================ GUI
//---------------------------------------------------------------------------
var lo_layout_marginTop = 8;
let guiPanelLeft, guiPanelTop, guiPanelWidth, guiPanelHeight;
const pickPlaceTop = 65; const pickPlaceTopText = pickPlaceTop + 5; const pickPlaceHeight = 20; const pickPlaceLeftDiff = 10; //6
const cv_guiLayoutA = 1;
const cv_guiLayoutB = 2;
var lo_GUI_layout = cv_guiLayoutB;
switch (lo_GUI_layout) {
    case cv_guiLayoutB:
        guiPanelLeft = 8; guiPanelTop = 8; guiPanelWidth = 500; guiPanelHeight = 80;
        //var buttonMode = new button(guiPanelLeft, guiPanelTop + 10, 60, 28, "Mode", "bold 10pt verdana", "gray", "darkSlateGray", 1, "gray", "darkSlateGray", "lightGoldenrodYellow", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true);
        //var intChooserNrMonthsAvg = new intChooser(guiPanelLeft, guiPanelTop + 16, 180, cv_nrMonthsAvgMax - cv_nrMonthsAvgMin + 1, lo_nrMonthsAvg, cv_nrMonthsAvgMin, 1, true, "burlyWood", "white", "orangeRed", "crimson", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserKriterij12, disabledControlLineColor, disabledControlTextColor, true, "Averaging period", "A(+mWheel)");
        //var checkBoxNrMonthsAvgAll = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "all", "gray", "normal 10pt verdana", 4, "above-middle", lo_nrMonthsAvgAll, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Use all data for averaging", "S");
        //var checkBoxDeltaT = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, scDelta + "T", "gray", "normal 10pt verdana", 4, "above-middle", gl_deltaT, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Calculate differences over 10 years", "L");
        var checkBoxHalfPoint = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "na 0,5 to" + scTchLow + "ke", "gray", "normal 10pt verdana", 4, "right-middle", lo_useHalfPoint, "gray", "white", "pero", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "To" + scTchLow + "kovanje na pol to" + scTchLow + "ke", "P");  //String.fromCharCode(0x0110));
        //var intChooserSmoothYears = new intChooser(guiPanelLeft, guiPanelTop + 16, 80, cv_nrSmoothYearsMax - cv_nrSmoothYearsMin + 1, lo_nrSmoothYears, cv_nrSmoothYearsMin, 1, true, "burlyWood", "white", "orangeRed", "crimson", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserSmoothYears, disabledControlLineColor, disabledControlTextColor, false, "Smoothing period", "O(+mWheel)");
        //var sliderTailMonths = new slider(guiPanelLeft, guiPanelTop + 42, 500, nrMonthsAll, gl_tailMonths, 0, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        //var sliderMonthEnd = new slider2(guiPanelLeft, guiPanelTop + 90, 500, nrMonthsAll, gl_monthStart, true, gl_monthEnd, 1, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        //var buttonPlay = new buttonPlayPauseStop(sliderMonthEnd.right + 10, guiPanelTop + 6, 23, 24, "play", 1, "gray", "darkSlateGray", "honeydew", 2, "lightGray", 2, 2, false, true, disabledControlBackColor, true);
        //var placePanelToggle = new placePanel(ctxW - pickPlaceLeftDiff - 41, pickPlaceTop, ctxW, pickPlaceHeight, true, "darkGray", "bold 10pt verdana", "white", 1, "lightGray", "gray", 2, 2, "#E0E0E0FF", true);
        var intChooserNrTock = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_nrTock, "", 0, 1, 3, 9, 17, 3, "blue", "black", "white", "orangeRed", "", "bold 15pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserNrTock, disabledControlLineColor, disabledControlTextColor, true);
        var intChooserKriterij12 = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_kriterij12, "%", 0, 1, 3, 9, 17, 3, "burlyWood", "black", "white", "orangeRed", "", "bold 12pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserKriterij12, disabledControlLineColor, disabledControlTextColor, true);
        var intChooserKriterij23 = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_kriterij23, "%", 0, 1, 3, 9, 17, 3, "burlyWood", "black", "white", "orangeRed", "", "bold 12pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserKriterij23, disabledControlLineColor, disabledControlTextColor, true);
        var intChooserKriterij34 = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_kriterij34, "%", 0, 1, 3, 9, 17, 3, "burlyWood", "black", "white", "orangeRed", "", "bold 12pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserKriterij34, disabledControlLineColor, disabledControlTextColor, true);
        var intChooserKriterij45 = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_kriterij45, "%", 0, 1, 3, 9, 17, 3, "burlyWood", "black", "white", "orangeRed", "", "bold 12pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserKriterij45, disabledControlLineColor, disabledControlTextColor, true);
}
var lo_GUIlayoutHasChanged = true;
var lo_repaintTimerActive  = false
var lo_hasRepaintRequest  = false
var lo_fullScreen = false
var vl_frmW, vl_frmH

document.body.style.overflow = 'hidden'; // tole onemogoči scrollBar-s
var elMyCanvas = document.getElementById("myCanvas");
var ctxW = window.innerWidth - 18;
var ctxH = window.innerHeight - 10;
var ctxMinDim = Math.min(ctxW, ctxH)
const cv_panelGUI_height = 100

var ctx = elMyCanvas.getContext("2d");
const bckgColor = "#F4F8F8";

const cv_displayMode_landscape = 1
const  cv_displayMode_portrait = 2
var lo_displayMode = cv_displayMode_landscape
var elem = document.documentElement; //23.12.2022 https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_fullscreen2

//---- 3.1.2023 v1.16 font family
const cv_fontFamily_cambria = "Cambria"
const cv_fontFamily_verdana = "Verdana"
const cv_fontFamily_RB = "Open Sans" // "Geostar" // "Rubik Bubbles"
var lo_fontFamily = cv_fontFamily_RB // cv_fontFamily_cambria //cv_fontFamily_verdana //

//https://www.w3schools.com/tags/canvas_font.asp
const myFontMathLabels = "bold 11pt " + lo_fontFamily    //Cambria"
const myFontMathLabelsBig = "bold 14pt " + lo_fontFamily //Cambria"
const myFontMathLabelsLargeItalic = "italic bold 14pt " + lo_fontFamily     //Cambria"
const myFontMathLabelsLargeBoldItalic = "italic bold 14pt " + lo_fontFamily //Cambria"
const myFontMathValues = "bold 10pt " + lo_fontFamily        //Cambria"
const myFontMathValuesSmall = "normal 10pt " + lo_fontFamily //Cambria"

//---- Javascript (CSS) colors
//     https://www.w3schools.com/colors/colors_names.asp

//---- 25.12.2022 iz neta snel funkcije za ugotavljanje komponent barve iz imena barve (https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes)
var cvsConvertColors = document.createElement('canvas');
cvsConvertColors.height = 1;
cvsConvertColors.width = 1;
var ctxConvertColors = cvsConvertColors.getContext('2d');
ctxConvertColors.willReadFrequently = true

var lo_noChange = ""

//---- 27.1.2023 v1.5
var tmHideTipsId;
var lo_hideTipsCounter = 0;
var lo_tipsColorDefault = "darkSlateGray";
var lo_tipsColor = lo_tipsColorDefault;
const cv_hideTipsSteps = 30;
const cv_hideTipsDuration = 700;
const cv_hideTipsTick = cv_hideTipsDuration / cv_hideTipsSteps;
const cv_hideTipsStepAlpha = 255 / cv_hideTipsSteps;

main();

//---- main()
function main() {

    //console.log("main():")
    //lf_focusCanvas(); // ne deluje!!! 30.1.2023 v1.6 ... ostaja torej problem, da je na začetku focus na address bar-u namesto na canvas DOM objektu. Ampak izgleda je problem samo v debug mode v VCCode!
   
    resizeCanvas();

    lf_changePrintLevel(lo_printLevel, false);

    lf_calculateMejeTock();

    paint();
    
    tmHideTipsId = setTimeout(tmHideTips_tick, 5000); //po 6 sekundah naj se tipsi sami postopoma ugasnejo

    // var elMainDate = document.getElementById("mainDate");
// elMainDate.width = 300     //
// elMainDate.height = 30 //
// elMainDate.style.left = "30px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.top = "1px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
    
    tmMouseOutOfWindowId = setInterval(tmMouseOutOfWindow_tick, 500); //na pol sekunde čekiram, če je miška izven okna
    
}

function lf_focusCanvas() {
     // focus: https://html.spec.whatwg.org/multipage/interaction.html ... tabindex=0 pomeni da je focusable, >0 pa da je "tabelarizable"
     elMyCanvas.setAttribute('tabindex','1'); //če ta še ni bil nastavljen v HTML
     //elMyCanvas.focus();
 
     var keyboardEvent = document.createEvent("KeyboardEvent");
     var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
     //var initMethod = typeof keyboardEvent.initKeyEvent;
     keyboardEvent[initMethod](
       "keydown", // event type: keydown, keyup, keypress
       true,      // bubbles
       true,      // cancelable
       window,    // view: should be window
       false,     // ctrlKey
       false,     // altKey
       false,     // shiftKey
       false,     // metaKey
       65,        // keyCode: unsigned long - the virtual key code, else 0. 65 - 'a'
       0          // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
     );
    elMyCanvas.dispatchEvent(keyboardEvent);
    //window.dispatchEvent(keyboardEvent);
 }

function tmHideTips_tick() {

    if (!lo_showHelpTips) {
        lo_tipsColor = lo_tipsColorDefault;
        lo_hideTipsCounter = 0;
        return
    }

    let alpha = Math.trunc(255 - lo_hideTipsCounter * cv_hideTipsStepAlpha);
    if (alpha < 0) { alpha = 0 };
    lo_tipsColor = gf_alphaColor(alpha, lo_tipsColorDefault);
    paint();

    if (lo_hideTipsCounter >= cv_hideTipsSteps) {
        lo_tipsColor = lo_tipsColorDefault;
        lo_hideTipsCounter = 0;
        lf_changeShowHelpTips(false, true);
        return
    }

    tmHideTipsId = setTimeout(tmHideTips_tick, cv_hideTipsTick);
    lo_hideTipsCounter += 1;

}

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.
// Add the event listeners for mousedown, mousemove, and mouseup
elMyCanvas.addEventListener('mousedown', (e) => {
    //console.log("event mouseDown(): x=" + e.offsetX.toString() + " y=" + e.offsetY.toString());
    lo_mouseDownX = e.offsetX;
    lo_mouseDownY = e.offsetY;
    lo_mouseDown = true
    //10.12.2022 v1.0.0.0 Ali hoče vleči celotno sliko enotskega kroga?
    //lo_dragMonthEndActive = sliderMonthEnd.eventMouseWithin(e.offsetX, e.offsetY); //lo_mouseAboveSliderMonthEnd
    //lo_dragTailMonthsActive = sliderTailMonths.eventMouseWithin(e.offsetX, e.offsetY); 
    //console.log("---------------------------------------------------------")
    //console.log("      mousedown(): dragMonthEndActive=" + lo_dragMonthEndActive)

});
elMyCanvas.addEventListener('mouseup', (e) => {
    lo_mouseDown = false
    //lo_dragMonthEndActive = false
    //if (lo_dragIntervalStartActive || lo_dragIntervalEndActive) { lo_dragIntervalIgnoreFirstClick = true; };
    //lo_dragIntervalStartActive = false
    //lo_dragIntervalEndActive = false
    //lo_dragTailMonthsActive = false
    lo_mouseDownX = 0;
    lo_mouseDownY = 0;
    //console.log("mouseup(): dragMonthEndActive=" + lo_dragMonthEndActive)
});
elMyCanvas.addEventListener('mouseout', (e) => {
    lo_mouseOut = true
    //console.log("mouseOut()")
    paint_delay() //ker je šla miška ven iz okna se vse ponovno izriše, da izginejo eventuelni toolTip-s
});

elMyCanvas.addEventListener('click', (e) => {

    //console.log("click(): dragMonthEndActive=" + lo_dragMonthEndActive)
    let rslt = 0; let boolRslt = false; let rslt2 = [0, 0];
    let vl_end = false
    //if (!vl_end && lo_showGUI) {
    //    boolRslt = buttonMode.eventClick(e.offsetX, e.offsetY);
    //    if (boolRslt) {
    //        lf_changeMode(e.shiftKey, true)
    //        vl_end = true
    //    }
    //}
    if (!vl_end && lo_showGUI && lo_enabledIntChooserNrTock) {
        rslt = intChooserNrTock.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (!(rslt == false)) { 
            if (rslt < cv_nrTock_min) { rslt = cv_nrTock_min };
            if (rslt > cv_nrTock_max) { rslt = cv_nrTock_max };
            lf_changeNrTock(rslt, true);
            vl_end = true
         };
        
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserKriterij12) {
        rslt = intChooserKriterij12.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (!(rslt == false)) { 
            if (rslt < cv_kriterij12min) { rslt = cv_kriterij12min };
            if (rslt > cv_kriterij12max) { rslt = cv_kriterij12max };
            if (rslt >= lo_kriterij23) { rslt = lo_kriterij23 - 1 };
            lf_changeKriterij("12", rslt, true);
            vl_end = true
         };
        
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserKriterij23) {
        rslt = intChooserKriterij23.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (!(rslt == false)) { 
            if (rslt < cv_kriterij23min) { rslt = cv_kriterij23min };
            if (rslt > cv_kriterij23max) { rslt = cv_kriterij23max };
            if (rslt <= lo_kriterij12) { rslt = lo_kriterij12 + 1 };
            if (rslt >= lo_kriterij34) { rslt = lo_kriterij34 - 1 };
            lf_changeKriterij("23", rslt, true);
            vl_end = true
         };
        
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserKriterij34) {
        rslt = intChooserKriterij34.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (!(rslt == false)) { 
            if (rslt < cv_kriterij34min) { rslt = cv_kriteri34min };
            if (rslt > cv_kriterij34max) { rslt = cv_kriterij34max };
            if (rslt <= lo_kriterij23) { rslt = lo_kriterij23 + 1 };
            if (rslt >= lo_kriterij45) { rslt = lo_kriterij45 - 1 };
            lf_changeKriterij("34", rslt, true);
            vl_end = true
         };
        
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserKriterij45) {
        rslt = intChooserKriterij45.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (!(rslt == false)) { 
            if (rslt < cv_kriterij45min) { rslt = cv_kriterij45min };
            if (rslt > cv_kriterij45max) { rslt = cv_kriterij45max };
            if (rslt <= lo_kriterij34) { rslt = lo_kriterij34 + 1 };
            lf_changeKriterij("45", rslt, true);
            vl_end = true
         };
        
    }
    if (!vl_end && lo_showGUI) {
        boolRslt = checkBoxHalfPoint.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != lo_useHalfPoint) {
            lf_changeUseHalfPoint(boolRslt, true)
            vl_end = true
        }
    }
    
    //if (lo_dragIntervalIgnoreFirstClick) { lo_dragIntervalIgnoreFirstClick = false; } //4.2.2023 v1.12

});

elMyCanvas.addEventListener('dblclick', (e) => {

    let rslt, place
    let vl_end = false
    //if (!vl_end && lo_showGUI) {
    //    rslt = placePanelToggle.eventDblClick(e.offsetX, e.offsetY);
    //    if (rslt) {
    //        lf_changeEnablePlaceAll(!lo_enabledPlaceAll, true);
    //        vl_end = true
    //    }
    //}

});

elMyCanvas.addEventListener('mousemove', (e) => {

    //console.log("mouse_move() enter")
    //console.log("mouseMove:mouseIn x=" + e.offsetX.toString() + " y=" + e.offsetY.toString())
    //console.log("event mouseMove(): x=" + e.offsetX.toString() + " y=" + e.offsetY.toString());
    
    //if (lo_mouseOut) { console.log("mouseMove:mouseIn x=" + e.offsetX.) }
    lo_mouseOut = false; //29.7.2023

    // mouse cursors: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_cursor2

    //Vlečenje okna / GUI elementov
    if (lo_mouseDown) {
        //if (lo_dragMonthEndActive) {
        //    //console.log("      mousemove(): drag the monthStart or monthEnd slider")
        //    sliderMonthEnd.setAddZone(100, 100)
        //    let rslt = sliderMonthEnd.eventMouseOverValue(e.offsetX, e.offsetY)
        //    sliderMonthEnd.setAddZone(0, 0)
        //    //console.log("      mousemove(): slider overValue=" + rslt)
        //    if (rslt >= 0) { lf_dragInterval(rslt); }
        //    return;
    }
    else {
        //Me.Location = New Point((Me.Location.X - lo_lastMouseLocation.X) + e.X, (Me.Location.Y - lo_lastMouseLocation.Y) + e.Y)
        //Me.Update()
        //console.log("mouse_move-drag")
        //return;
    }

    //23.1.2023 v1.0 Je miška nad kakšnim kontrolerjem?
    if (lo_showGUI) {
        if (intChooserNrTock.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (intChooserKriterij12.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (intChooserKriterij23.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (intChooserKriterij34.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (intChooserKriterij45.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else { document.body.style.cursor = "default" };
    } else { document.body.style.cursor = "default" };
    
    //če se miška v resnici ni premaknila ne naredim nič
    if (e.offsetX == lo_mouseMoveX && e.offsetY == lo_mouseMoveY) {
        //console.log("mouse_no_move")
        return
    }

    //Miška se je zares premaknila
    //console.log("mouse_move_beforeExecute")
    lo_mouseMoveX = e.offsetX
    lo_mouseMoveY = e.offsetY
    //console.log(e.offsetX + "-" + e.offsetY)
    paint_delay() //da na oseh označi koordinate miške
    //console.log("mouse_move exit")
});

//window.addEventListener("wheel", event, (passive = true) => {
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    let newValue, change, maxDiff;
    
    if (lo_enabledIntChooserNrTock && intChooserNrTock.eventMouseWithin(lo_mouseMoveX,lo_mouseMoveY)) {
        change = delta * lo_stepTock;
        if (lo_keyDownShiftLeft) { change = 5 * delta/Math.abs(delta) };
        newValue = lf_changeValueNrTock(change);
        //gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
        lf_changeNrTock(newValue, true);
    }    
    else if (lo_enabledIntChooserKriterij12 && intChooserKriterij12.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) {
        change = delta; if (lo_keyDownShiftLeft) { change *= 5 };
        newValue = lf_changeValueKriterij("12", change);
        //gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
        lf_changeKriterij("12", newValue, true);
    }
    else if (lo_enabledIntChooserKriterij23 && intChooserKriterij23.eventMouseWithin(lo_mouseMoveX,lo_mouseMoveY)) {
        change = delta; if (lo_keyDownShiftLeft) { change *= 5 };
        newValue = lf_changeValueKriterij("23", change);
        //gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
        lf_changeKriterij("23", newValue, true);
    }
    else if (lo_enabledIntChooserKriterij34 && intChooserKriterij34.eventMouseWithin(lo_mouseMoveX,lo_mouseMoveY)) {
        change = delta; if (lo_keyDownShiftLeft) { change *= 5 };
        newValue = lf_changeValueKriterij("34", change);
        //gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
        lf_changeKriterij("34", newValue, true);
    }
    else if (lo_enabledIntChooserKriterij45 && intChooserKriterij45.eventMouseWithin(lo_mouseMoveX,lo_mouseMoveY)) {
        change = delta; if (lo_keyDownShiftLeft) { change *= 5 };
        newValue = lf_changeValueKriterij("45", change);
        //gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
        lf_changeKriterij("45", newValue, true);
    }

    //---- če vrti kolešček miške ob pritisnjeni tipki T, s tem spreminja dolžino "repa"
    //if (lo_keyDownA) {
    //    if (lo_enabledIntChooserKriterij12) {
    //        lf_changeValueNrMonthsAvg(delta);
    //        gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
    //        lf_changeNrMonthsAvg(lo_nrMonthsAvg, true);
    //    }
    //    return
    //}
    else if (lo_keyDownP) {
        lf_changeValuePrintLevel(-delta);
        gl_changeByMouseWheel_printLevel = true; // 21.12.2023
        //console.log("WHEEL: true");
        lf_changePrintLevel(lo_printLevel, true);
        return
    }
        
    //---- ... sicer spreminja ...?
    
});

window.addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'ShiftLeft':
            lo_keyDownShiftLeft = true; break;  //console.log(lo_keyDownShiftLeft); break;
        case 'KeyA':
            lo_keyDownA = true; break;
        case 'KeyO':
            lo_keyDownO = true; break;
        case 'KeyP':
            lo_keyDownP = true; break;
        case 'Digit0':
            lo_keyDown0 = true; break;
        case 'KeyU':
            lo_keyDownU = true; break;
        case 'KeyD':
            lo_keyDownD = true; break;
        case 'KeyW':
            lo_keyDownW = true; break;
        case 'KeyE':
            lo_keyDownE = true; break;
        case 'ArrowRight':
            //lf_changeMonthEnd(lf_changeVar(gl_monthEnd, 1, 1, nrMonthsAll), true)
            //break;
        case 'ArrowLeft':
            //lf_changeMonthEnd(lf_changeVar(gl_monthEnd, -1, 1, nrMonthsAll), true)
            //break;
        case 'Home':
            //if (sliderMonthEnd.useValue0) { lf_changeMonthEnd(gl_monthStart, true) } else { lf_changeMonthEnd(1, true) }; break;
            //if (sliderMonthEnd.useValue0) { lf_changeMonthStart(1, true) } else { lf_changeMonthEnd(1, true) }; break; //11.12.2023
        case 'End':
            //lf_changeMonthEnd(nrMonthsAll, true); break;
        case 'KeyG': // GUI
            lo_showGUI = !lo_showGUI; lo_GUIlayoutHasChanged = true; paint(); break;
        case 'KeyL':
            //lf_changeDeltaT(!gl_deltaT, true); break;
        case 'KeyN': case 'F2':
            lf_changeShowHelpTips(!lo_showHelpTips, true); break;
        case 'KeyI':
            lf_changeShowToolTips(!lo_showToolTips, true); break;
        case 'KeyT':
            //console.log("P pressed");
            lf_changeUseHalfPoint(!lo_useHalfPoint, true); break;
        case 'KeyK':
            //console.log("K pressed");
            if (lo_keyDownShiftLeft) { lf_changeNaborKriterijev(lo_naborKriterijev - 1, true) } else { lf_changeNaborKriterijev(lo_naborKriterijev + 1, true); }; break;
        case 'KeyM':
            //console.log("M pressed"); 
            //lf_changeMode(event.shiftKey, true); break;
        case 'KeyY': case 'KeyZ': //24.10.2023
            //console.log("Y pressed");
            //lf_changeSameScaleY(!gl_sameScaleY, true); break;
        case 'KeyQ': //18.11.2023
            //console.log("W pressed");
            //lf_resizeWindowToFullHD(true); break;
        case 'KeyV': //6.12.2023
            //console.log("V pressed");
            //lf_changeShowExactValuesToo(true); break;
        case 'BracketRight': // "Đ" //23.12.2023 pritisk na tipko "Đ"
            //console.log("Đ pressed");
            //lf_changeAvgAllPlace(!gl_showAvgAllPlace, true); break;
        case 'Equal': // "+" //26.12.2023 pritisk na tipko "+" (26.12.2023)
            break;
    }
});

window.addEventListener("keyup", (event) => {
    
    switch (event.code) {
        case 'KeyP':
            lo_keyDownP = false;
            // 21.12.2023 Ali spreminja vrednost lo_printLevel samo s pomočjo tipke T brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_printLevel) {
                // 21.12.2023 tole je primer spreminjanja lo_printLevel samo s pomočjo tipke T  // obratno: že med vrtenjem koleščka smo spreminjali vrednost lo_printLevel
                //console.log("UP: process keyPress(T)");
                if (event.shiftKey) { lf_changeValuePrintLevel(-1) } else { lf_changeValuePrintLevel(1) };
                lf_changePrintLevel(lo_printLevel, true);
            }
            gl_changeByMouseWheel_printLevel = false;
            //console.log("UP: false");
            //console.log("----");
            break;
        case 'Digit0':
            lo_keyDown0 = false; break;
        case 'KeyU':
            lo_keyDownU = false; break;
        case 'KeyD':
            lo_keyDownD = false; break;
        case 'KeyW':
            lo_keyDownW = false; break;
        case 'KeyE':
            lo_keyDownE = false; break;
        case 'ShiftLeft':
            lo_keyDownShiftLeft = false; console.log(lo_keyDownShiftLeft); break;
        //case 'KeyP':
        //console.log("P pressed"); lf_changeAutoPlay(!lo_autoPlay); break;
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

//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
//const el = document.getElementById('canvas');
//el.addEventListener('touchstart', handleStart);
//el.addEventListener('touchend', handleEnd);
//el.addEventListener('touchcancel', handleCancel);
elMyCanvas.addEventListener('touchmove', canvas_touchMove);

//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
//https://stackoverflow.com/questions/41993176/determine-touch-position-on-tablets-with-javascript
function canvas_touchMove(e) {
    //e.preventDefault();
    lo_mouseMoveX = e.touches[0].clientX 
    lo_mouseMoveY = e.touches[0].clientY
    //console.log(lo_mouseMoveX, lo_mouseMoveY)
    paint()
}

function resizeCanvas() {
    //dimenzioniranje in pozicioniranje canvas-a
    ctxW = window.innerWidth - 6;
    if (lo_keyDownShiftLeft && valueBetween(ctxW, 1200, 1360)) { ctxW = 1280 }; // 21.12.2023
    if (lo_keyDownShiftLeft && valueBetween(ctxW, 1840, 2000)) { ctxW = 1920 }; // 21.12.2023
    ctxH = window.innerHeight - 6;
    if (lo_keyDownShiftLeft && valueBetween(ctxH, 640, 800)) { ctxH = 720 }; // 21.12.2023
    if (lo_keyDownShiftLeft && valueBetween(ctxH, 1010, 1150)) { ctxH = 1080 }; // 21.12.2023
    ctxMinDim = Math.min(ctxW, ctxH)
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
            //checkFullScreen.checked = ""
        }
    }
    lo_GUIlayoutHasChanged = true;
}

function paint() {

    //if (lo_showMap) { return }; // 29.12.2023

    let myTime1 = Date.now()
   
    ctx.fillStyle = bckgColor; // "lightGray";
    ctx.fillRect(0, 0, ctxW, ctxH);

    vl_frmW = window.width
    vl_frmH = window.height

    //---- 30.1.2023 v1.6
    if (lo_GUIlayoutHasChanged) {
        switch (lo_GUI_layout) {
            case cv_guiLayoutA: break;
            case cv_guiLayoutB:
                paint_GUI_layoutB(); break;
        }
        lo_GUIlayoutHasChanged = false;
    }
    
    let marginLeft = 8; let marginRight = 8;
    var marginTop = lo_layout_marginTop; let marginBottom = 25;

    paint_eOcene();
    paint_GUI()
    
    if (lo_showGUI) {
        paint_author();
        paint_version();
        //---- izpis potrebnega časa za izris
        let myTime2 = Date.now()
        //console.log(myTime2-myTime1 + "ms")
        tmpStr = "izris: " + (myTime2 - myTime1).toString() + " ms"
        gText(tmpStr, "italic 10pt sans serif", "gray", ctxW - 65, ctxH - 3)
        //---- 9.12.2023 izpis dimenzij risalnega canvasa
        tmpStr = ctxW.toString() + " x " + ctxH.toString();
        gText(tmpStr, "italic 10pt sans serif", "gray", ctxW - 145, ctxH - 3)
    }

}
function paint_eOcene() {
   
    //gText("To" + scTchLow + "k:", "bold 11pt verdana", "darkSlateGray", 28, 45);
    //gText("Kriteriji:", "bold 11pt verdana", "darkSlateGray", 66, 112);

    //---- grafične meje med razredi
    const marginTop = 20; const marginBottom = 16;
    const gTop = marginTop;
    const gHeight = ctxH - marginTop - marginBottom; //550;
    const gLeft = 200
    let gWidth = 280;
    if (lo_useHalfPoint) { gWidth += 30 };
    let gRight = gLeft + gWidth;
    let gBottom = gTop + gHeight;
    
    let h0 = gBottom;
    let h12 = gBottom - lo_kriterij12 * gHeight / 100;
    let h23 = gBottom - lo_kriterij23 * gHeight / 100;
    let h34 = gBottom - lo_kriterij34 * gHeight / 100;
    let h45 = gBottom - lo_kriterij45 * gHeight / 100;
    let h100 = gTop;

    //---- printLevel: 4-vse, 3-manjka checkBox, 2-manjka checkBox in posivitve tabele, 1-manjka checkBox in posivitve tabele in črte vmes, 0-manjkajo checkBox / posivitve tabele / črte vmes / točke / kriteriji

    //---- različno posivljena področja ocen
    if (lo_printLevel >= 3) {
        gBannerRect(gLeft, h100, gWidth, h45 - h100, 0, 0, "rgb(255, 255, 255)", 0, "", "", 0, 0, false);
        gBannerRect(gLeft, h45, gWidth, h34 - h45, 0, 0, "rgb(228, 228, 228)", 0, "", "", 0, 0, false);
        gBannerRect(gLeft, h34, gWidth, h23 - h34, 0, 0, "rgb(212, 212, 212)", 0, "", "", 0, 0, false);
        gBannerRect(gLeft, h23, gWidth, h12 - h23, 0, 0, "rgb(188, 188, 188)", 0, "", "", 0, 0, false);
        gBannerRect(gLeft, h12, gWidth, h0 - h12, 0, 0, "rgb(164, 164, 164)", 0, "", "", 0, 0, false);
    }

    //---- črtkane meje med posivljenimi področji ocen
    if (lo_printLevel >= 2) {
        gLine(gLeft, h100, gRight, h100, 2, "gray", [4, 4]);
        gLine(gLeft, h45, gRight, h45, 2, "gray", [4, 4]);
        gLine(gLeft, h34, gRight, h34, 2, "gray", [4, 4]);
        gLine(gLeft, h23, gRight, h23, 2, "gray", [4, 4]);
        gLine(gLeft, h12, gRight, h12, 2, "gray", [4, 4]);
        gLine(gLeft, h0, gRight, h0, 2, "gray", [4, 4]);
    }

    //---- tanke linije za povezavo kriterijev z mejami v razpredelnici
    if (lo_printLevel >= 2) {
        let x0, y0, x1, y1;
        x1 = gLeft - 10;
        //----
        x0 = intChooserKriterij45.left + intChooserKriterij45.width + 7;
        y0 = intChooserKriterij45.top + intChooserKriterij45.height / 2; y1 = h45;
        gLine(x0, y0, x1, y1, 1, "darkGray", [2, 4]);
        gEllipse(x0, y0, 2, 2, 0, "darkGray", 0, ""); gEllipse(x1, y1, 2, 2, 0, "darkGray", 0, "");
        //----
        x0 = intChooserKriterij34.left + intChooserKriterij34.width + 7;
        y0 = intChooserKriterij34.top + intChooserKriterij34.height / 2; y1 = h34;
        gLine(x0, y0, x1, y1, 1, "darkGray", [2, 4]);
        gEllipse(x0, y0, 2, 2, 0, "darkGray", 0, ""); gEllipse(x1, y1, 2, 2, 0, "darkGray", 0, "");
        //----
        x0 = intChooserKriterij23.left + intChooserKriterij23.width + 7;
        y0 = intChooserKriterij23.top + intChooserKriterij23.height / 2; y1 = h23;
        gLine(x0, y0, x1, y1, 1, "darkGray", [2, 4]);
        gEllipse(x0, y0, 2, 2, 0, "darkGray", 0, ""); gEllipse(x1, y1, 2, 2, 0, "darkGray", 0, "");
        //----
        x0 = intChooserKriterij12.left + intChooserKriterij12.width + 7;
        y0 = intChooserKriterij12.top + intChooserKriterij12.height / 2; y1 = h12;
        gLine(x0, y0, x1, y1, 1, "darkGray", [2, 4]);
        gEllipse(x0, y0, 2, 2, 0, "darkGray", 0, ""); gEllipse(x1, y1, 2, 2, 0, "darkGray", 0, "");
    }

    //---- grafične oznake ocen
    let font = "bold 15pt verdana";
    let tmpText;
    let font2 = "bold 10pt verdana";
    let bw = 15; let bh = 14;
    let ddx = 7; let ddy = 7;
    let cv_col3 = 215;
    if (lo_printLevel <= 0) { cv_col3 = 18 };
    let cv_col4 = cv_col3 + 35;
    const cv_kriterijiStepV = 40;
    const hAdd = 8; const tAdd = 13;
    
    let y; 
    const hAddLinear = 35;
    let addText=""
    if (lo_printLevel <= 0) { addText = " to" + scTchLow + "k" };
    
    //---- ocena 5
    y = (h100 + h45) / 2 - hAdd;
    if (lo_printLevel == 0) { y = gTop };
    gBannerRoundRectWithText(cv_col3, y, bw, bh, font, "indigo", "5", ddx, ddy, 14, "gold", 1, "gray", "#D0D0D040", 4, 4, false)
    tmpText = lo_tock5b.toString() + addText + " (" + (lo_tock5b / lo_nrTock * 100).toFixed(2) + "%)" //+ " - " + lo_tock5t.toString() + " (100%)";
    if (lo_tock5b !== lo_tock5t) { tmpText += " - " + lo_tock5t.toString() + addText + " (100%)" };
    gText(tmpText, font2, "darkSlateGray", cv_col4, y + tAdd);
    
    //---- ocena 4
    y = (h45 + h34) / 2 - hAdd;
    if (lo_printLevel == 0) { y = gTop + 1 * hAddLinear };
    gBannerRoundRectWithText(cv_col3, y, bw, bh, font, "indigo", "4", ddx, ddy, 14, "gold", 1, "gray", "#D0D0D040", 4, 4, false)
    if (lo_validOcena4) {    
        tmpText = lo_tock4b.toString() + addText + " (" + (lo_tock4b / lo_nrTock * 100).toFixed(2) + "%)" //+ " - " + lo_tock4t.toString() + " (" + (lo_tock4t / lo_nrTock * 100).toFixed(2) + "%)";
        if (lo_tock4b !== lo_tock4t) { tmpText += " - " + lo_tock4t.toString() + addText + " (" + (lo_tock4t / lo_nrTock * 100).toFixed(2) + "%)" };
        gText(tmpText, font2, "darkSlateGray", cv_col4, y + tAdd);
    }

    //---- ocena 3
    y = (h34 + h23) / 2 - hAdd;
    if (lo_printLevel == 0) { y = gTop + 2 * hAddLinear };
    gBannerRoundRectWithText(cv_col3, y, bw, bh, font, "indigo", "3", ddx, ddy, 14, "gold", 1, "gray", "#C0C0C040", 4, 4, false)
    if (lo_validOcena3) {
        tmpText = lo_tock3b.toString() + addText + " (" + (lo_tock3b / lo_nrTock * 100).toFixed(2) + "%)" //+ " - " + lo_tock3t.toString() + " (" + (lo_tock3t / lo_nrTock * 100).toFixed(2) + "%)";
        if (lo_tock3b !== lo_tock3t) { tmpText += " - " + lo_tock3t.toString() + addText + " (" + (lo_tock3t / lo_nrTock * 100).toFixed(2) + "%)" };
        gText(tmpText, font2, "darkSlateGray", cv_col4, y + tAdd);
    }

    //---- ocena 2
    y = (h23 + h12) / 2 - hAdd;
    if (lo_printLevel == 0) { y = gTop + 3 * hAddLinear };
    gBannerRoundRectWithText(cv_col3, y, bw, bh, font, "indigo", "2", ddx, ddy, 14, "gold", 1, "gray", "#A0A0A040", 4, 4, false)
    if (lo_validOcena2) {
        tmpText = lo_tock2b.toString() + addText + " (" + (lo_tock2b / lo_nrTock * 100).toFixed(2) + "%)" //+ " - " + lo_tock2t.toString() + " (" + (lo_tock2t / lo_nrTock * 100).toFixed(2) + "%)";
        if (lo_tock2b !== lo_tock2t) { tmpText += " - " + lo_tock2t.toString() + addText + " (" + (lo_tock2t / lo_nrTock * 100).toFixed(2) + "%)" };
        gText(tmpText, font2, "darkSlateGray", cv_col4, y + tAdd);
    }

    //---- ocena 1
    y = (h12 + h0) / 2 - hAdd;
    if (lo_printLevel == 0) { y = gTop + 4 * hAddLinear };
    gBannerRoundRectWithText(cv_col3, y, bw, bh, font, "indigo", "1", ddx, ddy, 14, "gold", 1, "gray", "#80808040", 4, 4, false)
    tmpText = "0" + addText + " (0%) - " + lo_tock1t.toString() + addText + " (" + (lo_tock1t / lo_nrTock * 100).toFixed(2) + "%)";
    gText(tmpText, font2, "darkSlateGray", cv_col4, y + tAdd);
 
}

function lf_calculateMejeTock() {

    //---- defaukt nastavim, da bo za vsako od teh ocen prišlo nekaj točk, da torej ocena ne bo "prazna"
    lo_validOcena4 = true;
    lo_validOcena3 = true;
    lo_validOcena2 = true;

    let tmpTock;
    
    //---- Ocena 5
    lo_tock5t = lo_nrTock;
    tmpTock = lo_nrTock * lo_kriterij45 / 100; // to je potrebno zaokrožiti navzgor na prvo celo ali polovično točko!
    lo_tock5b = lf_calculatePrveTockeNad(tmpTock);
    
    //---- Ocena 4
    lo_tock4t = lo_tock5b - lo_stepTock;
    tmpTock = lo_nrTock * lo_kriterij34 / 100; // to je potrebno zaokrožiti navzgor na prvo celo ali polovično točko!
    if (tmpTock > lo_tock4t) { lo_tock4b = lo_tock4t } else { lo_tock4b = lf_calculatePrveTockeNad(tmpTock) };
    
    //---- Ocena 3
    if (lo_tock4t < lo_nrTock * lo_kriterij34 / 100) {
        lo_tock3t = lo_tock4t
        lo_validOcena4 = false; //Ocena 4 je prazna, ker so kriteriji zanjo tako ozki in ocene padejo v 5 in 3
    } else {
        lo_tock3t = lo_tock4b - lo_stepTock;
    };
    tmpTock = lo_nrTock * lo_kriterij23 / 100; // to je potrebno zaokrožiti navzgor na prvo celo ali polovično točko!
    if (tmpTock > lo_tock3t) { lo_tock3b = lo_tock3t } else { lo_tock3b = lf_calculatePrveTockeNad(tmpTock) };
    
    //---- Ocena 2
    if (lo_tock3t < lo_nrTock * lo_kriterij23 / 100) {
        lo_tock2t = lo_tock3t
        lo_validOcena3 = false; //Ocena 3 je prazna, ker so kriteriji zanjo tako ozki in ocene padejo v 4 in 2
    } else {
        lo_tock2t = lo_tock3b - lo_stepTock;
    };
    tmpTock = lo_nrTock * lo_kriterij12 / 100; // to je potrebno zaokrožiti navzgor na prvo celo ali polovično točko!
    if (tmpTock > lo_tock2t) { lo_tock2b = lo_tock2t } else { lo_tock2b = lf_calculatePrveTockeNad(tmpTock) };
    
    //---- Ocena 1
    if (lo_tock2t < lo_nrTock * lo_kriterij12 / 100) {
        lo_tock1t = lo_tock2t
        lo_validOcena2 = false; //Ocena 2 je prazna, ker so kriteriji zanjo tako ozki in ocene padejo v 3 in 1
    } else {
        lo_tock1t = lo_tock2b - lo_stepTock;
    };
    lo_tock1b = 0;
    //----
    
}

function lf_calculatePrveTockeNad(vp_tock) {

    let tmpTock = Math.trunc(vp_tock - 1);
    tmpTock += lo_stepTock; if (tmpTock >= vp_tock) { return tmpTock };
    tmpTock += lo_stepTock; if (tmpTock >= vp_tock) { return tmpTock };
    tmpTock += lo_stepTock; if (tmpTock >= vp_tock) { return tmpTock };
    tmpTock += lo_stepTock; if (tmpTock >= vp_tock) { return tmpTock };
    tmpTock += lo_stepTock; if (tmpTock >= vp_tock) { return tmpTock };

}

function lf_mouseOverScatterPlotDataPoint(mouseX, mouseY) {

    lo_focusPlace = cv_placeNone;
    lo_focusMonth = 0;
    
    //---- mora biti raztreseni diagram vacc-excDeaths
    switch (gl_mode) {
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempMultiTimeSlice:  { return false; }
    }
    //---- miška mora biti znotraj področja grafa
    if (mouseX < lo_graphLeft || mouseX > lo_graphRight || mouseY < lo_graphTop || mouseY > lo_graphBottom) { return false };
    //--- gremo po lokacijah in pogledamo, ali je miška blizu kakšnega dataPint-a
    let x, y, yValue, dx, dy, dist;
    let vl_startMonth = gl_monthEnd - gl_tailMonths;
    if (vl_startMonth < 1) { vl_startMonth = 1 };
    for (place = cv_minPlace; place <= nrPlaces; place++) {
        //---- lokacija ne sme biti disabled
        if (!lo_enabledPlace[place]) { continue };
        if (place == cv_aut) {
            place = place;
        }
        //---- če v multi-place mode nisem z miško znotraj področja grafa tekoče lokacije, ne smem nič skenirati
        if (gl_mode == cv_mode_vaccExcessDeathMulti) {
            if (mouseX < placeGraphLeft[place] || mouseX > placeGraphRight[place] || mouseY < placeGraphTop[place] || mouseY > placeGraphBottom[place]) {
                continue;
            }
        };
        //---- zdaj sledi skeniranje data point-s znotraj grafa tekoče lokacije
        for (month = vl_startMonth; month <= gl_monthEnd; month++) {
            //---- izračun koordinat tekočega data point-a
            switch (gl_mode) {
                case cv_mode_vaccExcessDeathMulti:
                    x = placeGraphLeftData[place] + placeVaccByMonth[place][month - 1] * placeGraphKx[place];
                    yValue = lf_getAvgValue(place, month, cv_nrMonthsAvgMult * lo_nrMonthsAvg);
                    y = placeGraphBottomAxis[place] - yValue * placeGraphKy[place];
                    break;
                case cv_mode_vaccExcessDeath:
                    x = lo_graphLeftData + placeVaccByMonth[place][month - 1] * lo_graphKx;
                    yValue = lf_getAvgValue(place, month, cv_nrMonthsAvgMult * lo_nrMonthsAvg);
                    y = lo_graphBottomAxis - yValue * lo_graphKy;
                    break;
            }
            //---- koliko je točka data point-a (x,y) oddaljena od pozicije miške v oknu (mouseX,mouseY)?
            dx = x - mouseX;
            dy = y - mouseY; 
            dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= 5) {
                //našli smo data point, na katerega kaže miška
                lo_focusPlace = place;
                lo_focusMonth = month;
                return true;
            }
        }

    }
}

function paint_GUI() {

    let x = guiPanelLeft; let y = guiPanelTop + 130;
    if (!lo_showGUI) { x = 8; y = ctxH - 8 };
    x = 8; y = ctxH - 8; //kar vedno spodaj levo naj bo
    //gText("data: Eurostat (excess death), OWID (vaccination)", "italic 11pt serif", "maroon", x, y);
    //gText("data: ARSO / VP Trnje " + scSch + "kofja Loka / VP Stra" + scZhLow + "i" + scSchLow + scTchLow + "e Kranj", "italic 11pt serif", "maroon", x, y);

    if (!lo_showGUI) {
        //---- on-screen namigi/pomoč
        if (lo_showHelpTips) { paint_tips() };
        //if (lo_showStations) { paint_stations() };
        //return
    };
    
    //---- skupno število točk
    if (lo_printLevel >= 1) {
        gText("To" + scTchLow + "k:", "bold 11pt verdana", "darkSlateGray", 20, 30);
        intChooserNrTock.paint()
    }

    //---- kriterij za ocene
    if (lo_printLevel >= 1) {
        gText("Kriteriji:", "bold 11pt verdana", "darkSlateGray", 66, 112);
        intChooserKriterij12.paint()
        intChooserKriterij23.paint()
        intChooserKriterij34.paint()
        intChooserKriterij45.paint()
    }

    //---- točkovanje na pol točke
    if (lo_printLevel >= 4) {
        checkBoxHalfPoint.paint()
    }

    //---- on-screen namigi/pomoč
    if (lo_showHelpTips) { paint_tips() };
    //if (lo_showStations) { paint_stations() };

}



function paint_tips() {

    // text baselines: https://www.javascripttutorial.net/web-apis/javascript-filltext/

    switch (lo_GUI_layout) {
        
        case cv_guiLayoutB:
            
            let x0 = 20; let x1 = x0 + 160;
            let y0 = 33; let vStep = 25; let y = y0 - vStep;
            let font = "normal 12pt serif";
            let font2 = "italic 12pt serif";
            let font3 = "bold 12pt serif";
            let nrTipRows = 8;
            let backHeight = nrTipRows * vStep + 15;

            //gBannerRect(x0 - 15, y0 - 13, 415, backHeight, 4, 4, gf_alphaColor(160, "white"), 1, "silver", "#ECECECC0", 5, 5, true);
            //gBannerRoundRect(x0 - 15, y0 - 13, 415, backHeight, 20, gf_alphaColor(160, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true);
            gBannerRoundRect(x0 - 15, y0 - 13, 530, backHeight, 20, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true); //zdaj treba manj transparentno, ker senčenje od v1.16 deluje samo okoli bannerja, ne pa tudi pod njim
            //
            y += vStep;
            gBannerRectWithText2("F2", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 27, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("N", x0 + 41, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i to pomo" + scTchLow, x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... spremeni " + scSchLow + "tevilo to" + scTchLow + "k in kriterije (polje pod mi" + scSchLow + "ko)", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("+", x0 + 35, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("SHIFT", x0 + 50, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hitrej" + scSchLow + "e spreminjanje ob pritisnjenem SHIFT", x1 + 20, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("T", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... vklop/izklop to" + scTchLow + "kovanja na pol to" + scTchLow + "ke", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("K", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... preklapljanje med tipi" + scTchLow + "nimi nabori kriterijev", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("P", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... spremeni nivo prikaza za prenos slike", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("G", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i avtorja in sistemske meritve", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("desniKlikMi" + scSchLow + "ke", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... lahko shrani" + scSchLow + " sliko", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            break;
            
            
            
            
            //
            y += vStep;
            gBannerRectWithText2("0", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 15, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 32, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... select start month", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("Home", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("End", x0 + 49, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("left", x0 + 85, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("right", x0 + 116, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change month", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("P", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... play/stop", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("T", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... display for all/month/season", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);            
            //
            y += vStep;
            gBannerRectWithText2("A", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change averaging period", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("S", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... all time average", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("L", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... " + scDelta + "T(t) diagram", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("O", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... " + scDelta + "T(t) smoothing", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //   
            y += vStep;
            gBannerRectWithText2(String.fromCharCode(0x0110), x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... all station average", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //                
            y += vStep;
            gBannerRectWithText2("U", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("D", x0 +22, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 40, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 57, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change Y scale", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("Y", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... normalize Y scale", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("V", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... show exact values/lines too", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("B", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change station name length", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("E", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 17, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 34, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... move the end of data region", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("W", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 22, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 39, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change marker size", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("+", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 19, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("ALT+", x0 + 33, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... add/delete/all markers on graph", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("G", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hide/show GUI controls", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("C", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 21, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("dblClick", x0 + 35, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... select/unselect all places", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("H", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... high altitude stations selection", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("F9", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... list of weather stations", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("F8", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... weather stations on the map", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //            
            y += vStep;
            gBannerRectWithText2("I", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hide/show tool tips", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("F11", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... full screen mode on/off", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            break;
    }
}

function paint_GUI_layoutB() {

    let vl_lastControlLeft, vl_lastControlWidth;

    const xAuthor = 200;
    guiPanelLeft = 8; guiPanelTop = 8; guiPanelWidth = ctxW - guiPanelLeft - xAuthor; guiPanelHeight = 50;
    if (guiPanelWidth < 300) { guiPanelWidth = 300 };
    lo_layout_marginTop = guiPanelTop + guiPanelHeight;
   
    //----
    const cv_col1 = 12;
    intChooserNrTock.left = cv_col1;
    intChooserNrTock.top = 35;

    //----
    const cv_kriterijiStepV = 40;
    const cv_col2 = 60;
    let y = 120;
    intChooserKriterij45.left = cv_col2;
    intChooserKriterij45.top = y;
    y += cv_kriterijiStepV;
    intChooserKriterij34.left = cv_col2;
    intChooserKriterij34.top = y;
    y += cv_kriterijiStepV;
    intChooserKriterij23.left = cv_col2;
    intChooserKriterij23.top = y;
    y += cv_kriterijiStepV;
    intChooserKriterij12.left = cv_col2;
    intChooserKriterij12.top = y;

    //---- točke na pol točke natančno
    checkBoxHalfPoint.left = cv_col1 + 16; // + 100;
    checkBoxHalfPoint.top = 67;

}

function lf_changeDeltaT(vp_newValue, vp_paint) {

    gl_deltaT = vp_newValue;

    checkBoxDeltaT.value = gl_deltaT;
    lo_enabledIntChooserSmoothYears = gl_deltaT;
    intChooserSmoothYears.enabled = gl_deltaT;
    intChooserSmoothYears.visible = gl_deltaT;
    lo_GUIlayoutHasChanged = true;

    if (vp_paint) { paint() }

}

function lf_changeValueKriterij(vp_typeKriterij, vp_diff) {

    let newValue;

    switch (vp_typeKriterij) {
        case "12": {
            newValue = lo_kriterij12 - vp_diff;
            if (newValue < cv_kriterij12min) { newValue = cv_kriterij12min };
            if (newValue > cv_kriterij12max) { newValue = cv_kriterij12max };
            if (newValue >= lo_kriterij23) { newValue = lo_kriterij23 - 1 };
            break;
        };
        case "23": {
            newValue = lo_kriterij23 - vp_diff;
            if (newValue < cv_kriterij23min) { newValue = cv_kriterij23min };
            if (newValue > cv_kriterij23max) { newValue = cv_kriterij23max };
            if (newValue <= lo_kriterij12) { newValue = lo_kriterij12 + 1 };
            if (newValue >= lo_kriterij34) { newValue = lo_kriterij34 - 1 };
            break;
        };
        case "34": {
            newValue = lo_kriterij34 - vp_diff;
            if (newValue < cv_kriterij34min) { newValue = cv_kriterij34min };
            if (newValue > cv_kriterij34max) { newValue = cv_kriterij34max };
            if (newValue <= lo_kriterij23) { newValue = lo_kriterij23 + 1 };
            if (newValue >= lo_kriterij45) { newValue = lo_kriterij45 - 1 };
            break;
        };
        case "45": {
            newValue = lo_kriterij45 - vp_diff;
            if (newValue < cv_kriterij45min) { newValue = cv_kriterij45min };
            if (newValue > cv_kriterij45max) { newValue = cv_kriterij45max };
            if (newValue <= lo_kriterij34) { newValue = lo_kriterij34 + 1 };
            break;
        };            
    }

    return newValue;

}

function lf_changeKriterij(vp_typeKriterij, vp_newValue, vp_paint) {

    switch (vp_typeKriterij) {
        case "12": {
            lo_kriterij12 = vp_newValue;
            intChooserKriterij12.value = lo_kriterij12; break;
        };
        case "23": {
            lo_kriterij23 = vp_newValue;
            intChooserKriterij23.value = lo_kriterij23; break;
        };
        case "34": {
            lo_kriterij34 = vp_newValue;
            intChooserKriterij34.value = lo_kriterij34; break;
        };
        case "45": {
            lo_kriterij45 = vp_newValue;
            intChooserKriterij45.value = lo_kriterij45; break;
        };            
    }

    lf_calculateMejeTock();

    if (vp_paint) { paint() }

}

function lf_changeValueNrTock(vp_diff) {

    let newValue;

    newValue = lo_nrTock - vp_diff;
    if (newValue < cv_nrTock_min) { newValue = cv_nrTock_min };
    if (newValue > cv_nrTock_max) { newValue = cv_nrTock_max };

    return newValue;

}

function lf_changeNrTock(vp_newValue, vp_paint) {

    lo_nrTock = vp_newValue;
    intChooserNrTock.value = lo_nrTock;

    lf_calculateMejeTock();

    if (vp_paint) { paint() }

}

function lf_changeValuePrintLevel(vp_change) {

    lo_printLevel += vp_change

    if (lo_printLevel < cv_printLevelMin) { lo_printLevel = cv_printLevelMin };
    if (lo_printLevel > cv_printLevelMax) { lo_printLevel = cv_printLevelMax };
}

function lf_changePrintLevel(vp_newValue, vp_paint) {

    lo_printLevel = vp_newValue;
    console.log("printLeve=" + lo_printLevel.toString());
    if (lo_printLevel < cv_printLevelMin) { lo_printLevel = cv_printLevelMin };
    if (lo_printLevel > cv_printLevelMax) { lo_printLevel = cv_printLevelMax };

    if (vp_paint) { paint() }

}

function lf_changeUseHalfPoint(vp_newValue, vp_paint) {

    lo_useHalfPoint = vp_newValue;
    checkBoxHalfPoint.value = lo_useHalfPoint;

    if (lo_useHalfPoint) { lo_stepTock = 0.5; } else { lo_stepTock = 1; };
    intChooserNrTock.step = lo_stepTock;

    lf_calculateMejeTock();

    if (vp_paint) { paint() }

}

function lf_changeShowHelpTips(vp_newValue, vp_paint) {

    lo_showHelpTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeNaborKriterijev(vp_newValue, vp_paint) {

    lo_naborKriterijev = vp_newValue;

    if (lo_naborKriterijev < cv_naborKriterijev_min) { lo_naborKriterijev = cv_naborKriterijev_max };
    if (lo_naborKriterijev > cv_naborKriterijev_max) { lo_naborKriterijev = cv_naborKriterijev_min };
    
    switch (lo_naborKriterijev) {
        case cv_naborKriterijev_1:
            lo_kriterij12 = 50;
            lo_kriterij23 = 65;
            lo_kriterij34 = 80;
            lo_kriterij45 = 90;
            break;
        case cv_naborKriterijev_2:
            lo_kriterij12 = 50;
            lo_kriterij23 = 60;
            lo_kriterij34 = 75;
            lo_kriterij45 = 90;
            break;
    }
    intChooserKriterij12.value = lo_kriterij12;
    intChooserKriterij23.value = lo_kriterij23;
    intChooserKriterij34.value = lo_kriterij34;
    intChooserKriterij45.value = lo_kriterij45;

    lf_calculateMejeTock();

    if (vp_paint) { paint() }

}

function lf_changeMode(vp_shift, vp_paint) {

    if (gl_mode == cv_mode_timeAvgTempMultiTimeSlice) {
        lo_printLevel = cv_timeSliceAll; // če sem bil multiSlice mode in grem ven iz njega, preklopim iz Month/Season v All
    }; //11.12.2023
    //----
    if (vp_shift) { gl_mode -= 1 } else { gl_mode += 1 };
    if (gl_mode < cv_minMode) { gl_mode = cv_maxMode };
    if (gl_mode > cv_maxMode) { gl_mode = cv_minMode };
    lf_setMode(gl_mode, vp_paint);
}

function lf_setMode(vp_mode, vp_paint) {

    gl_mode = vp_mode;

    //---- prilagoditev GUI (1)
    switch (gl_mode) {
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            sliderMonthEnd.useValue0 = false;
            sliderTailMonths.visible = true; break;
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempMultiTimeSlice:
            if (gl_monthEnd < gl_monthStart) { //16.2.2023 v1.17
                gl_monthEnd = nrMonthsAll;
                sliderMonthEnd.value = gl_monthEnd;
            }
            sliderMonthEnd.useValue0 = true;
            sliderTailMonths.visible = false; break;
    }
    //---- prilagoditev GUI (2)    
    switch (gl_mode) { // 24.12.2023
        case cv_mode_timeAvgTempSingle:
            checkBoxAvgAllPlace.visible = true;
            break;
        case cv_mode_timeAvgTempMultiTimeSlice:
            checkBoxAvgAllPlace.visible = true;
            //----
            switch (lo_printLevel) {
                case cv_timeSliceAll: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case cv_timeSliceMonth:
                    //return; //ne bom kar pustil praznega okna, ampak raje preklopim v multi prikaz po mesecih
                    lo_printLevel = cv_timeSliceMonth;  //11.12.2023 //cv_timeSliceMonthMin;           
                    break;
                case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn: case cv_timeSliceSeason:
                    lo_printLevel = cv_timeSliceSeason;  //11.12.2023
                    break;
            }
            break;
        case cv_mode_timeAvgTempMultiPlace:
            checkBoxAvgAllPlace.visible = false;
            break;
    }
    //---- prilagoditev GUI (3)    
    lf_setMonthIntervalText();

    lo_GUIlayoutHasChanged = true;
    if (vp_paint) { paint() }
}


function tmMouseOutOfWindow_tick() {
    
}

function paint_author() {

    //======== AVTOR
    let tmpStr = scCopyR + "2024 Peter Malovrh";
    let font = "italic bold 18px cambria"; // podpičje pred destrukturiranjem nujno !!!!!
    let [tmpW, tmpH] = gMeasureText(tmpStr, font);
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    //console.log("tmpW=" + tmpW + " tmpH=" + tmpH)
    let topMargin = 6
    let rightMargin = 6
    //----
    let dd = 9
    let x1 = ctxW - rightMargin - dd
    let x0 = x1 - tmpW //wh[0]
    let y0 = topMargin + dd
    let y1 = y0 + tmpH //wh[1]
    //----
    //gBannerRectWithText(x0, y0, x1, y1, dd, dd, "white", 1, "lightGray", font, "gray", tmpStr, "#D0D0D040", 4, 4)
    lo_linearGradientFill = true;
    rgfc1x = x0; rgfc1y = y0; rgfc2x = x0 + tmpW; rgfc2y = y0 + tmpH;
    rgfcs1 = 0; rgfc1 = "#F0F0F0FF"; rgfcs2 = 0.3; rgfc2 = "white"; rgfcs3 = 1; rgfc3 = "#F0F0F0FF";
    gBannerRoundRectWithText(x0, y0, tmpW, tmpH, font, "gray", tmpStr, dd, dd, 14, "white", 1, "lightGray", "#D0D0D040", 4, 4, false)
}

function paint_version() {

    //======== VERZIJA APLIKACIJE
    let tmpStr = gl_versionNr
    let font = "italic bold 14px cambria"
    //let wh = gMeasureText(tmpStr, font);
    let tmpW, tmpH; //podpičje tukaj pred destruktiriranjem nujno !!!!
    [tmpW, tmpH] = gMeasureText(tmpStr, font);
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    let topMargin = 33
    let rightMargin = 78
    //----
    let dd = 5
    let x1 = ctxW - rightMargin - dd
    let x0 = x1 - tmpW //wh[0]
    let y0 = topMargin + dd
    let y1 = y0 + tmpH //wh[1]
    //----
    gBannerRectWithText(x0, y0, x1, y1, dd, dd, "#FFF800B0", 1, "lightGray", font, "blue", tmpStr, "#D0D0D040", 3, 3)

    //======== DATUM APLIKACIJE
    tmpStr = gl_versionDate;
    font = "italic bold 12px cambria"; // PAZI TO!!! brez tega podpičja na koncu naslednji destructuring dela narobe !!!
    //                                    https://stackoverflow.com/questions/68796011/requerid-semicolon-in-javascript-for-let-variables
    //                                    http://hassansin.github.io/Object-Destructuring-and-a-Semicolon
    //                                    https://stackoverflow.com/questions/57851596/use-of-semicolon-terminator-in-js-es6-when-deconstructing
    //         glej ECMA ASI: https://262.ecma-international.org/10.0/#sec-rules-of-automatic-semicolon-insertion
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    //console.log("tmpW=" + tmpW + " tmpH=" + tmpH)
    //console.log("x=" + (ctxW - wh[0] - 6) + " y=" + (wh[1] + 6))
    topMargin = 35
    rightMargin = 6
    //----
    dd = 5
    x1 = ctxW - rightMargin - dd
    x0 = x1 - tmpW //wh[0]
    y0 = topMargin + dd
    y1 = y0 + tmpH //wh[1]
    gBannerRectWithText(x0, y0, x1, y1, dd, dd, "white", 1, "lightGray", "italic 12px cambria", "gray", tmpStr, "", 3, 3)
}

window.onresize = function (event) {
    resizeCanvas();
    //resizeMap(); // 29.12.2023
    paint();
};

document.onvisibilitychange = function () {
    return
    // če lokalno poganjaš .html file, potem se cookie ne shrani, ker so pištotki po standardu izključno stvar HTTP protokola, ne pa file:///
    //zato sem za test cookijev moral zadevo dati na server (jaz konkretno na petermalovrh.github.io) in tam potem gledati konzolo
    console.log("======= document visibility changed, printing current cookie ...")
    let docCookie = document.cookie;
    let cText = decodeURIComponent(docCookie); //cookie_get("onOff") ... decodeURIComponent() je tu zaradi urejanja kod posebnih znakov, recimo %20% itd
    console.log("document.cookie: " + docCookie)
    console.log("decodeURIComponent(document.cookie): " + cText)
    if (docCookie != "" || docCookie != null) { } else { 
        //console.log("document.cookie: " + cookies);
        const cookieList = document.cookie.split('; ');
        console.log("cookie[0]: " + cookieList[0] + "  cookie[1]: " + cookieList[1])
    }
    if (document.visibilityState === 'hidden') {
        console.log("... visibility changed to hidden, set the cookie ...")
        //----
        cookie_set("onOff", "theory,rulesSupplement", 10);
        console.log("cookie set (onOff=theory,rulesSupplement)")
        //----
        cookie_set("c2", "c2val", 13);
        console.log("cookie set (c2=c2val)")
        //----
        docCookie = document.cookie;
        cText = decodeURIComponent(docCookie); //cookie_get("onOff") ... decodeURIComponent() je tu zaradi urejanja kod posebnih znakov, recimo %20% itd
        console.log("new document.cookie: " + docCookie)
        console.log("new decodeURIComponent(document.cookie): " + cText)
    } else {
         console.log("... visibility changed to visible, no need to set cookie")
    }
};
  
//===========================================================================================================

//var tmDelayPaintId
//clearInterval(tmDelayPaintId)
function paint_delay() {

    switch (lo_repaintTimerActive) {
        case true:
            lo_hasRepaintRequest = true
            return;
        case false:
            paint();
            setTimeout(tmPaintDelay_tick, 10)
            lo_repaintTimerActive = true
            lo_hasRepaintRequest = false
    }
}

function tmPaintDelay_tick() {
    
    lo_repaintTimerActive = false
    if (lo_hasRepaintRequest) {
        lo_hasRepaintRequest = false
        paint()
    }
    //console.log(lo_mouseMoveX)

}
