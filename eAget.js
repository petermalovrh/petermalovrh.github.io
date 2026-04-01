//===========================================
//                                          =
//        ##1  __COMMON                     =
//                                          =
//===========================================

//------------------------------------
//---- pričetek razvoja 28.3.2026
const gl_versionNr = "v1.3"
const gl_versionDate = "1.4.2026"
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
const scTchSoft = String.fromCharCode(0x106)
const scTchSoftLow = String.fromCharCode(0x107)
//----
const scCopyright = String.fromCharCode(0xA9)
const scDoubleQuote = String.fromCharCode(0x22)
const scSingleQuote = String.fromCharCode(0x27)
//----
const scAdotDot = String.fromCharCode(0x00E4)

function mouseInsideCircle(vp_mouseX, vp_mouseY, vp_cx, vp_cy, vp_radij) {
    
    // Če ni v kvadratu s stranico 2*vp_radij okoli točke (vp_cx, vp_cy), potem grem takoj ven
    if (!mouseInsideRect(vp_mouseX, vp_mouseY, vp_cx - vp_radij, vp_cy - vp_radij, vp_cx + vp_radij, vp_cy + vp_radij)) { return false };

    // Je v kvadratu s stranico 2*vp_radij, zdaj je treba preveriti, če je res znotraj kroga
    let dx = Math.abs(vp_mouseX - vp_cx);
    let dy = Math.abs(vp_mouseY - vp_cy);


    if (Math.sqrt(dx * dx + dy * dy) <= vp_radij) { return true } else { return false };
}

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

function gLik(x0, y0, dx, dy, fillColor, strokeWidth, strokeColor, strokeDash) {
    //ctx.setLineDash([5, 5]); //dashed    ctx.setLineDash([]); //solid  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    for (let i = 0; i < dx.length; i++) {
        ctx.lineTo(x0 + dx[i], y0 + dy[i]);
    }
    ctx.closePath();
    if (fillColor != "") {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.setLineDash(strokeDash);
        ctx.stroke();
    }
}

// https://www.w3schools.com/jsref/canvas_font.asp
function gText(text, font, color, x, y) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

// https://www.w3schools.com/jsref/canvas_font.asp
function gTextSO(text, font, color, colorMiddle, colorOut, distMiddle, distOut, x, y) {
    // 26.2.2025 text, osenčen z zunanjim in notranjim slojem v izbranih barvah in na različnih razdaljah
    ctx.font = font;
    ctx.fillStyle = colorOut;
    ctx.fillText(text, x + distOut, y + distOut);
    ctx.fillStyle = colorMiddle;
    ctx.fillText(text, x + distMiddle, y + distMiddle);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

// https://www.w3schools.com/jsref/canvas_font.asp
function gText2(text, font, color, color2, borderWidth, innerMarginX, innerMarginY, x, y) {

    let w, h;

    ctx.font = font;
    ctx.fillStyle = color2;

    // ---- praznenje notranjosti pravokotnika izpisa, a z 10% roba na vsaki stranici
    if (text.length > 1 && (innerMarginX > 0 || innerMarginY > 0)) {
        ;[w, h] = gMeasureText(text, font);
        ctx.fillRect(x + innerMarginX, y - h + innerMarginY, w - 2 * innerMarginX, h - 2 * innerMarginY);
    }

    // ---- spraznjeno področje v pravokotniku en pixel okoli teksta
    ctx.fillText(text, x - 1, y - 1);
    ctx.fillText(text, x, y - 1);
    ctx.fillText(text, x + 1, y - 1);
    ctx.fillText(text, x + 1, y);
    ctx.fillText(text, x + 1, y + 1);
    ctx.fillText(text, x , y + 1);
    ctx.fillText(text, x - 1, y + 1);
    ctx.fillText(text, x - 1, y);

    if (borderWidth == 2) {
        // ---- spraznjeno področje v pravokotniku 2 pixla okoli teksta (vogalov ne praznim)
        ctx.fillText(text, x - 1, y - 2);
        ctx.fillText(text, x, y - 2);
        ctx.fillText(text, x + 1, y - 2);
        ctx.fillText(text, x + 2, y - 1);
        ctx.fillText(text, x + 2, y);
        ctx.fillText(text, x + 2, y + 1);
        ctx.fillText(text, x + 1, y + 2);
        ctx.fillText(text, x , y + 2);
        ctx.fillText(text, x - 1, y + 2);
        ctx.fillText(text, x - 2, y + 1);
        ctx.fillText(text, x - 2, y);
        ctx.fillText(text, x - 2, y - 1);
    };

    // ---- še sm tekst v svoji pravi barvi
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
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
    
    ctx.font = font;
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
    // dd          ... toliko od notranjega okvirja do zunanjega izrisanega okvirja
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

function gBannerRoundRect2(left, top, width, height, radius,  fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll, round1, round2, round3, round4) {
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
            case true:  gBannerRoundRectPath2(left, top, right, bottom, ddx, ddy, radius, -xShaddow, xShaddow, -yShaddow, yShaddow, round1, round2, round3, round4); break;
            case false: gBannerRoundRectPath2(left, top, right, bottom, ddx, ddy, radius, xShaddow, xShaddow, yShaddow, yShaddow, round1, round2, round3, round4); break;
        }
        ctx.fillStyle = shaddowColor;
        ctx.fill();
        ctx.restore(); //s tem se znebim clipping region-a na ctx-u
    }
    //----
    if (fillColor != "" || strokeWidth > 0) {
        gBannerRoundRectPath2(left, top, right, bottom, ddx, ddy, radius, 0, 0, 0, 0, round1, round2, round3, round4);
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

function gBannerRoundRectPath2(left, top, right, bottom, ddx, ddy, radius, xShaddowLeft, xShaddowRight, yShaddowTop, yShaddowBottom, round1, round2, round3, round4) {

    ctx.beginPath();

    // Create clipping path (15.2.2023 v1.16) https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip
    if (xShaddowLeft != 0 || xShaddowRight != 0 || yShaddowTop != 0 || yShaddowBottom != 0) {
        let region = new Path2D();
        region.rect(left + xShaddowLeft, top + yShaddowTop, right + xShaddowRight - left - xShaddowLeft, bottom + yShaddowBottom - top - yShaddowTop);
        //region.rect(left, top, right - left, bottom - top);
        if (round1) { region.moveTo(left + ddx, top); }
        else { region.moveTo(left, top); };
        if (round2) { region.arcTo(right, top, right, top + ddy, radius); }
        else { region.lineTo(right, top); };          // naredi linijo do desne zgornje strani in potem četrt kroga navzdol proti navpičnici
        if (round3) { region.arcTo(right, bottom, right - ddx, bottom, radius); }
        else { region.lineTo(right, bottom); }; // naredi linijo do desne spodnje strani in potem četrt kroga levo proti vodoravnici
        if (round4) { region.arcTo(left, bottom, left, bottom - ddy, radius); }
        else { region.lineTo(left, bottom); };    // naredi linijo do leve spodnje strani in potem četrt kroga navzgor proti navpičnici
        if (round1) { region.arcTo(left, top, left + ddx, top, radius); }
        else { region.lineTo(left, top); };             // naredi linijo do leve zgornje strani in potem četrt kroga desno proti vodoravnici
        ctx.clip(region, "evenodd");
    }

    if (round1) { ctx.moveTo(left + ddx + xShaddowLeft, top + yShaddowTop); }
    else { ctx.moveTo(left + xShaddowLeft, top + yShaddowTop); };
    if (round2) { ctx.arcTo(right + xShaddowRight, top + yShaddowTop, right + xShaddowRight, top + ddy + yShaddowTop, radius); }              // naredi linijo do desne zgornje strani in potem četrt kroga navzdol proti navpičnici
    else { ctx.lineTo(right + xShaddowRight, top + yShaddowTop); };
    if (round3) { ctx.arcTo(right + xShaddowRight, bottom + yShaddowBottom, right - ddx + xShaddowRight, bottom + yShaddowBottom, radius); }  // naredi linijo do desne spodnje strani in potem četrt kroga levo proti vodoravnici
    else { ctx.lineTo(right + xShaddowRight, bottom + yShaddowBottom)}; 
    if (round4) { ctx.arcTo(left + xShaddowLeft, bottom + yShaddowBottom, left + xShaddowLeft, bottom - ddy + yShaddowBottom, radius); }      // naredi linijo do leve spodnje strani in potem četrt kroga navzgor proti navpičnici
    else { ctx.lineTo(left + xShaddowLeft, bottom + yShaddowBottom);};
    if (round1) { ctx.arcTo(left + xShaddowLeft, top + yShaddowTop, left + ddx + xShaddowLeft, top + yShaddowTop, radius); }                  // naredi linijo do leve zgornje strani in potem četrt kroga desno proti vodoravnici  
    else { ctx.lineTo(left + xShaddowLeft, top + yShaddowTop);};

    ctx.closePath();  //ctx.lineTo(xiLeft, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
}

function gBannerRoundRectWithText(left, top, width, height, font, fontColor, text, ddx, ddy, radius,  fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll) {
    //-------------------------------
    // funkcija nariše pobarvan (opcija), osenčen (opcija), obkrožen (opcija), in zaobljen (nastavljiv radius) okvir s tekstom (opcija)
    // left, top, width, height ... virtualni okvir teksta
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

function gBannerRoundRectWithText3(left, top, width, height, font, fontColor, text, ddx, ddyTop, ddyBottom, radius,  fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll) {
    //-------------------------------
    // funkcija nariše pobarvan (opcija), osenčen (opcija), obkrožen (opcija), in zaobljen (nastavljiv radius) okvir s tekstom (opcija)
    // left, top, width, height ... virtualni okvir teksta
    // font, fontColor          ... parametri za tekst
    // text                     ... tekst za izpis (če je prazen se ne izpiše nič)
    // ddx, ddy                 ... koliko praznega prostora po X in Y je okoli virtualnega okvirja teksta
    // radius                   ... vogali zaobljeni s krogom tega polmera
    // fillColor                ... notranja barva (če je "" potem se ne polni)
    // strokeWidth              ... debelina črte okoli okvirja (če je 0, potem se črte ne riše)
    // strokeColor              ... barva črte okoli okvirja
    // shaddowColor             ... barva senčenja okvirja
    // xShaddow, yShaddow       ... kako daleč pade senca desno in navzdol
    // shaddowAll               ... ali mora biti senčeno okoli in okoli (=true), ali pač desno navzdol (=false)
    //-------------------------------

    //---- banner
    gBannerRoundRect(left - ddx, top - ddyTop, width + 2 * ddx, height + ddyTop + ddyBottom, radius, fillColor, strokeWidth, strokeColor, shaddowColor, xShaddow, yShaddow, shaddowAll);
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

function gBannerRect2(left, top, width, height, ddx, ddy, fillColor, strokeWidth, strokeColor, dash, shaddowColor, xShaddow, yShaddow, shaddowAll) {
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
        ctx.setLineDash(dash);
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
    constructor(left, top, items, value, addString, minItemValue, step, focusMargin, arrowWidth, arrowHeight, arrowGap, arrowColor, color, fillColor, crossColor, text, font, gap, posAlign, textColor, clickGap, enabled, disabledColor, disabledTextColor, visible, toolTipText, keyStroke) {
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
        this.toolTipText = toolTipText; 
        this.keyStroke = keyStroke; 
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
    showToolTip() {
        //---- toolTip
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
        }          
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        //----
        if (this.eventMouseOverDecrease(mouseX, mouseY, false)) { return this.value - this.step; }
        else {
            if (this.eventMouseOverIncrease(mouseX, mouseY, false)) {
                return this.value + this.step;
            }
        };
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
        if (focused) {
            let addM = 5; gBannerRect(x1 - addM, y1 - addM, this.width + 2 * addM, this.width + 2 * addM, 3, 3, focusedColor, 0, "", "", 0, 0, false);
        }
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
        //if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
        //    gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
        //    gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
        //}        
    }
    showToolTip() {
        //---- toolTip
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
    constructor(left, top, width, height, text, font, textColor, focusedTextColor, lineWidth, lineColor, focusedLineColor, fillColor, smoothPx, gapLeft, gapTop, gapRight, gapBottom, hAlign, vAlign, shaddowColor, xShaddow, yShaddow, shaddowAll, enabled, disabledFillColor, disabledTextColor, visible, toolTipText, keyStroke) {
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
        this.toolTipText = toolTipText; // 10.1.2025
        this.keyStroke = keyStroke;     // 10.1.2025
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
            case "right": x = x1 - tmpW; break;
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
    showToolTip() { // 10.1.2025
        //---- toolTip
        if (!this.visible || !this.enabled) { return };
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            if (this.keyStroke != "") {
                gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
            }
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

class buttonOnOff {
    constructor(left, top, width, height, valueOnOff, valueOnColor, text, font, textColor, focusedTextColor, lineWidth, lineColor, focusedLineColor, fillColor, smoothPx, gapLeft, gapTop, gapRight, gapBottom, hAlign, vAlign, shaddowColor, xShaddow, yShaddow, shaddowAll, enabled, disabledFillColor, disabledTextColor, visible, toolTipText, keyStroke) {
        this.left = left; this.top = top; this.width = width; this.height = height;
        this.valueOnOff = valueOnOff; this.valueOnColor = valueOnColor; // dodal 6.6.2025
        this.text = text; this.font = font; this.textColor = textColor; this.focusedTextColor = focusedTextColor;
        this.lineWidth = lineWidth; this.lineColor = lineColor; this.focusedLineColor = focusedLineColor;
        this.fillColor = fillColor;
        this.smoothPx = smoothPx;
        this.gapLeft = gapLeft; this.gapTop = gapTop; this.gapRight = gapRight; this.gapBottom = gapBottom;
        this.hAlign = hAlign; this.vAlign = vAlign;
        this.shaddowColor = shaddowColor; this.xShaddow = xShaddow; this.yShaddow = yShaddow; this.shaddowAll = shaddowAll;
        this.enabled = enabled; this.disabledFillColor = disabledFillColor; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
        this.toolTipText = toolTipText; // 10.1.2025
        this.keyStroke = keyStroke;     // 10.1.2025
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
            case "right": x = x1 - tmpW; break;
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
        //---- 6.6.2025 če je valueOnOff=true, potem pod tekstom gumba na sredini dam pravokoten marker, ki kaže stanje ON
        if (this.valueOnOff) {
            //gLine(x + tmpW / 2 - 5, y + 4, x + tmpW / 2 + 5, y + 4, 2, this.valueOnColor, []);
            gLine(x0 + 3, y + 4, x1 - 3, y + 4, 2, this.valueOnColor, []);
        }
    }
    showToolTip() { // 10.1.2025
        //---- toolTip
        if (!this.visible || !this.enabled) { return };
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            if (this.keyStroke != "") {
                gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
            }
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

class httpLink { // 24.2.2025
    constructor(left, top, text, font, textColor, focusedTextColor, lineWidth, lineColor, focusedLineColor, hAlign, vAlign, enabled, disabledTextColor, visible, toolTipText, keyStroke) {
        this.left = left; this.top = top;
        this.text = text; this.font = font; this.textColor = textColor; this.focusedTextColor = focusedTextColor;
        this.dimSet = false;
        this.lineWidth = lineWidth; this.lineColor = lineColor; this.focusedLineColor = focusedLineColor;
        this.hAlign = hAlign; this.vAlign = vAlign;
        this.enabled = enabled; this.disabledTextColor = disabledTextColor;
        this.visible = visible;
        this.toolTipText = toolTipText;
        this.keyStroke = keyStroke;
    }
    paint() {
        if (!this.visible) { return };
        //---- pravokotnik
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let lineColor = focused ? this.focusedLineColor : this.lineColor;
        //---- text
        let tmpW, tmpH, x, y;
        if (!this.dimSet) {
            ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
            this.width = tmpW;
            this.height = tmpH;
            this.dimSet = true;
        }
        let x0 = this.left; let x1 = this.left + this.width;
        switch (this.hAlign) {
            case "left": x = x0; break;
            case "right": x = x1 - this.width; break;
            case "middle": x = x0 + (x1 - x0) / 2 - this.width / 2; break;
        }
        let y0 = this.top ; let y1 = this.top + this.height;
        switch (this.vAlign) {
            case "top": y = y0 + this.height; break;
            case "bottom": y = y1; break;
            case "middle": y = y1 - (y1 - y0) / 2 + this.height / 2; break;
        }
        let textColor = this.disabledTextColor;
        if (this.enabled) { textColor = focused ? this.focusedTextColor : this.textColor; }
        gText(this.text, this.font, textColor, x, y);
        gLine(x, y + 2, x + this.width, y + 2, 1, textColor, []);
    }
    showToolTip() { // 10.1.2025
        //---- toolTip
        if (!this.visible || !this.enabled) { return };
        if (this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && this.toolTipText !== "") {
            gBannerRectWithText3(this.toolTipText, lo_mouseMoveX + 20, lo_mouseMoveY + 22, "italic 11pt cambria", 4, 5, 5, 1, 1, "white", 1, "gray", "dimGray", "lightGray", 1, 1);
            if (this.keyStroke != "") {
                gBannerRectWithText3(this.keyStroke, lo_mouseMoveX + 23, lo_mouseMoveY + 40, "italic 11pt cambria", 4, 5, 4, 2, 2, "azure", 1, "gray", "dimGray", "lightGray", 2, 2);
            }
        }      
    } 
    eventClick(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        if (this.eventMouseWithin(mouseX, mouseY)) { return true; } else { return false; };
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        const dWidth = 2;
        let x0 = this.left - dWidth;
        let x1 = this.left + this.width + dWidth;
        let y0 = this.top - dWidth;
        let y1 = this.top + this.height + dWidth + 2; // +2 zaradi črte za podčrtavanje
        if (mouseInsideRect(mouseX, mouseY, x0, y0, x1, y1)) { return true; } else { return false; };
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

var lo_dataPrepared = false;

const rsltColor = ["darkBlue", "darkRed", "darkOrchid", "darkSlateGray", "darkGoldenrod", "darkGreen", "maroon", "purple", "darkCyan", "peru"];

const colorOcena = [];
colorOcena[0] = "white";
colorOcena[1] = "crimson";
colorOcena[2] = "darkSalmon";
colorOcena[3] = "lightSlateGray";
colorOcena[4] = "darkCyan";
colorOcena[5] = "limeGreen";

const colorPredmet = [];
colorPredmet[1] = "royalBlue";
colorPredmet[2] = "teal";
colorPredmet[3] = "goldenrod";
colorPredmet[4] = "sienna";
colorPredmet[5] = "purple";
colorPredmet[6] = "firebrick";
colorPredmet[7] = "darkOrange";
colorPredmet[8] = "mediumSeaGreen";
colorPredmet[9] = "brown";
colorPredmet[10] = "chocolate";
colorPredmet[11] = "darkGoldenrod";
colorPredmet[12] = "darkSlateBlue";
colorPredmet[13] = "green";
colorPredmet[14] = "dodgerBlue";
colorPredmet[15] = "mediumVioletRed";
colorPredmet[16] = "peru";
colorPredmet[17] = "salmon";
colorPredmet[18] = "steelBlue";
colorPredmet[19] = "yellowGreen";
colorPredmet[20] = "tomato";

var lo_enabledHelp = true;       // 10.1.2025
var lo_enabledMode = true;       // 2.2.2025
var lo_enabledPredmet = true;    // 28.1.2025
var lo_enabledTest = true;       // 27.1.2025
var lo_enabledLetnik = true;     // 20.2.2025
var lo_enabledRazred = true;     // 27.1.2025
var lo_enabledSPData = true;     // 27.1.2025
var lo_enabledKritLuknje = true; // 27.1.2025
var lo_enabledLoad = true;       // 27.1.2025

// ---- 27.1.2025
var lo_toolbarStartPeriod = true;
var lo_showDynamicToolbar = true;
var tmToolbarStartPeriod;

var lo_tipDatumMs = 0; // 9.2.2025

//---- kaj od vhodnih podatkov sploh preberem
var gl_usePohvala;
var gl_usePotrebnaIzboljsava;
var gl_useKomentar;
var gl_useUcitelj; var gl_useUciteljStr = "" ;
var gl_usePredmet; var gl_usePredmetStr = "";

//---- kaj vključim v izhodni izpis
var gl_includeTip;
var gl_includePredmet;
var gl_includeUcitelj;
var gl_includeDatum;
var gl_includeUra;
var gl_includeTermin;

var tip, ucitelj, predmet, datum, ura, termin, vsebina, separator;

var arrTip = [];
var arrUcitelj = [];
var arrPredmet = [];
var arrDatum = [];
var arrDan = [];
var arrUra = [];
var arrTermin = [];
var arrVsebina = [];
var nrDataLines = 0;
var nrPohvala = 0;
var nrPotrebnaIzboljsava = 0;
var nrKomentar = 0;
var nrOdsotnost = 0; 
var nrOdsotnostDogodek = 0;
var loadStatus = ""; 
var copyStatus = "";

const cv_separator_min = 1;
const cv_separator_max = 5;
const cv_separator_1 = "\t"; const cv_separatorDesc_1 = "TAB (za Excel)"; 
const cv_separator_2 = " "; const cv_separatorDesc_2 = "\u0022" + " " + "\u0022";
const cv_separator_3 = "  "; const cv_separatorDesc_3 = "\u0022" + "  " + "\u0022";
const cv_separator_4 = " : ";  const cv_separatorDesc_4 = "\u0022" + " : " + "\u0022";
const cv_separator_5 = " - "; const cv_separatorDesc_5 = "\u0022" + " - " + "\u0022";
var gl_separatorId = 1;
var gl_separator = cv_separator_1;
var gl_separatorDesc = cv_separatorDesc_1;

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
var dbg = false; //true;              

var lo_keyDownF = false;
var lo_keyDownP = false;
var lo_keyDownA = false;
var lo_keyDownX = false;
var lo_keyDownC = false;
var lo_keyDownM = false;
var lo_keyDownT = false; // to bo pri lečah za nivo printinga
var lo_keyDownDigit0 = false; // 2.1.2025

//---- spreminjanje zgornje in spodnje meje grafa po Y (6.12.2023)
var lo_keyDownU = false;      //6.12.2023
var lo_keyDownD = false;      //6.12.2023
var lo_keyDownW = false;      //13.12.2023
var lo_keyDownE = false;      //15.12.2023
var lo_keyDownShiftLeft = false; // 21.12.2023
var lo_keyDownControlLeft = false; // 1.4.2024
var lo_keyDownO = false; // 22.12.2023
var lo_addTempMarginUp = 0;   //6.12.2023
var lo_addTempMarginDown = 0; //6.12.2023
//----
var gl_changeByMouseWheel_printLevel = false;   //4.1.2024
var gl_changeByMouseWheel_ucenecChart = false;   //15.2.2025
var gl_changeByMouseWheel_razredChart = false;   //15.2.2025

//---- grafične meje med razredi
var gpMarginTop, gpMarginBottom, gpMarginLeft, gpMarginRight
var gpTop, gpBottom, gpHeight, gpLeft, gpRight, gpWidth;
var lo_gxO, lo_gyO;

var rsltPanelLeft, rsltPanelTop;
var legendPanelLeft, legendPanelTop;
var lo_gf, lo_gxF1d, lo_gxF2d, lo_gxF1l, lo_gxF2l;
var lo_ga, lo_ghP, lo_gxP, lo_gyP;
var lo_gwPS = 8; // šrina predmeta v pikslih
var lo_gwArrowPS = 14; // šrina predmeta v pikslih
var lo_ghArrowPS = 18; // šrina predmeta v pikslih

const cv_addRightMarginMin = -200;   //15.12.2023
const cv_addRightMarginMax = 100;   //15.12.2023
const cv_addRightMarginMult = 10; //15.12.2023
var lo_addRightMargin = 0;        //15.12.2023

var lo_showGUI = true
var lo_showHelpTips = true;
//var lo_showStations = false

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

const lo_backgroundColor = "white";  //"whiteSmoke"
const disabledControlLineColor = "silver";
const disabledControlBackColor = "#F0F0F0FF";
const disabledControlTextColor = "silver";
const focusedColor = "khaki";  "lightYellow";

var lo_linearGradientFill = false
var lgfc1x, lgfc1y, lgfc2x, lgfc2y, lgfc1, lgfc2, lgfc3, lgfcs1, lgfcs2, lgfcs3;
var lo_radialGradientFill = false
var rgfc1x, rgfc1y, rgfc1r, rgfc2x, rgfc2y, rgfc2r, rgfc1, rgfc2, rgfc3, rgfcs1, rgfcs2, rgfcs3;

//---------------------------------------------------------------------------
//================ GUI
//---------------------------------------------------------------------------
const pickPlaceTop = 65; const pickPlaceTopText = pickPlaceTop + 5; const pickPlaceHeight = 20; const pickPlaceLeftDiff = 10; //6
const cv_guiLayoutA = 1;
const cv_guiLayoutB = 2;
var lo_GUI_layout = cv_guiLayoutB;
const wBtn = 20; const hBtn = 24;
switch (lo_GUI_layout) {
    case cv_guiLayoutB:
        gpLeft = 8; gpTop = 8; gpWidth = 500; gpHeight = 80;
        //var buttonMode = new button(gpLeft, gpTop + 10, 60, 28, "Mode", "bold 10pt verdana", "gray", "darkSlateGray", 1, "gray", "darkSlateGray", "lightGoldenrodYellow", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true);
        //var sliderMonthEnd = new slider2(gpLeft, gpTop + 90, 500, nrMonthsAll, gl_monthStart, true, gl_monthEnd, 1, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        //var placePanelToggle = new placePanel(ctxW - pickPlaceLeftDiff - 41, pickPlaceTop, ctxW, pickPlaceHeight, true, "darkGray", "bold 10pt verdana", "white", 1, "lightGray", "gray", 2, 2, "#E0E0E0FF", true);
        //var intChooserF = new intChooser2H(gpLeft, gpTop + 160, 46, lo_f, "", 0, 1, 3, 9, 17, 3, "blue", "black", "white", "orangeRed", "", "bold 13pt verdana", 4, "above-left", "gray", 5, lo_enabledintChooserF, disabledControlLineColor, disabledControlTextColor, true, "Gori" + scSchLow + scTchLow + "na razdalja (spremeni z vrtenjem mi" + scSchLow + "ke)", "kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke(+SHIFT)");
        //var intChooserA = new intChooser2H(gpLeft, gpTop + 160, 46, lo_a, "", 0, 1, 3, 9, 17, 3, "blue", "black", "white", "orangeRed", "", "bold 13pt verdana", 4, "above-left", "gray", 5, lo_enabledintChooserA, disabledControlLineColor, disabledControlTextColor, true, "Oddaljenost predmeta (spremeni z vrtenjem mi" + scSchLow + "ke)", "kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke(+SHIFT)");
        //var intChooserP = new intChooser2H(gpLeft, gpTop + 160, 46, lo_P, "", 0, 1, 3, 9, 17, 3, "blue", "black", "white", "orangeRed", "", "bold 13pt verdana", 4, "above-left", "gray", 5, lo_enabledintChooserP, disabledControlLineColor, disabledControlTextColor, true, "Velikost predmeta (spremeni z vrtenjem mi" + scSchLow + "ke)", "kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke(+SHIFT)");
        //var intChooserN = new intChooser2H(gpLeft, gpTop + 160, 46, lo_n, "", 1.5, 0.01, 3, 9, 17, 3, "blue", "black", "white", "orangeRed", "", "bold 13pt verdana", 4, "above-left", "gray", 5, lo_enabledintChooserN, disabledControlLineColor, disabledControlTextColor, true, "Lomni količnik (spremeni z vrtenjem mi" + scSchLow + "ke)", "kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke(+SHIFT)");
        //var checkBoxUnitCm = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "cm", "gray", "normal 10pt verdana", 4, "right-middle", lo_unitCm, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Vse enote v centimetrih", "C");  //String.fromCharCode(0x0110));
        //var checkBoxUnitMm = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "mm", "gray", "normal 10pt verdana", 4, "right-middle", lo_unitMm, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Vse enote v milimetrih", "M");  //String.fromCharCode(0x0110));
        //var checkBoxRuler = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Ravnilo", "gray", "normal 10pt verdana", 4, "right-middle", lo_showRuler, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Prikaz ravnila", "R");  //String.fromCharCode(0x0110));
        //var checkBoxLegend = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Legenda", "gray", "normal 10pt verdana", 4, "right-middle", lo_showLegend, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Prikaz legende", "L");  //String.fromCharCode(0x0110));
        //----
        var checkFilterPohvala = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Pohvala", "gray", "normal 10pt verdana", 4, "right-middle", gl_usePohvala, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Preberi pohvale", "");  //String.fromCharCode(0x0110));
        var checkFilterPotrebnaIzboljsava = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Potrebna izbolj" + scSchLow + "ava", "gray", "normal 10pt verdana", 4, "right-middle", gl_usePotrebnaIzboljsava, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Preberi potrebne izbolj" + scSchLow + "ave", "");  //String.fromCharCode(0x0110));
        var checkFilterKomentar = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Komentar", "gray", "normal 10pt verdana", 4, "right-middle", gl_useKomentar, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Preberi komentarje", "");  //String.fromCharCode(0x0110));
        var checkFilterUcitelj = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Samo u" + scTchLow + "itelj:", "gray", "normal 10pt verdana", 4, "right-middle", gl_useUcitelj, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Preberi samo zapise tega u" + scTchLow + "itelja", "");  //String.fromCharCode(0x0110));
        var checkFilterPredmet = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Samo predmet:", "gray", "normal 10pt verdana", 4, "right-middle", gl_usePredmet, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Preberi samo zapise tega predmeta", "");  //String.fromCharCode(0x0110));
        //----
        var checkIncludeTip = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Tip zapisa", "gray", "normal 10pt verdana", 4, "right-middle", gl_includeTip, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i tip zapisa", "");  //String.fromCharCode(0x0110));
        var checkIncludeUcitelj = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "U" + scTchLow + "itelj", "gray", "normal 10pt verdana", 4, "right-middle", gl_includeUcitelj, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i u" + scTchLow + "itelja", "");  //String.fromCharCode(0x0110));
        var checkIncludePredmet = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Predmet", "gray", "normal 10pt verdana", 4, "right-middle", gl_includePredmet, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i predmet", "");  //String.fromCharCode(0x0110));
        var checkIncludeDatum = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Datum", "gray", "normal 10pt verdana", 4, "right-middle", gl_includeDatum, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i datum", "");  //String.fromCharCode(0x0110));
        var checkIncludeUra = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, scSch + "olska ura", "gray", "normal 10pt verdana", 4, "right-middle", gl_includeUra, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i " + scSchLow + "olsko uro", "");
        var checkIncludeTermin = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Od-do", "gray", "normal 10pt verdana", 4, "right-middle", gl_includeTermin, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "V izpis vklju" + scTchLow + "i termin", "");  //String.fromCharCode(0x0110));
        //----
        var buttonLoad = new button(gpLeft, gpTop + 10, 245, 26, "Beri eAsistent zapise iz clipboard-a", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "azure", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Kopiraj zapise v clipboard ...", "C");
        var buttonCopy = new button(gpLeft, gpTop + 10, 186, 26, "Zapi" + scSchLow + "i/kopiraj na clipboard", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "azure", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Kopiraj zapise v clipboard ...", "C");
        var buttonSeparator = new button(gpLeft, gpTop + 10, 20, 23, ">", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "whiteSmoke", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Izberi naslednji separator ...", "S");
        //----
        var textBoxUcitelj = document.createElement('input');
        textBoxUcitelj.type = 'text';
        textBoxUcitelj.id = 'textBoxUcitelj';
        textBoxUcitelj.value = '';
        textBoxUcitelj.maxLength = 50
        textBoxUcitelj.style.position = "absolute";
        textBoxUcitelj.style.left = "140px"
        textBoxUcitelj.style.top = "162px"
        textBoxUcitelj.style.width = "180px"
        textBoxUcitelj.style.zIndex = "2";
        textBoxUcitelj.style.visibility = "hidden"
        //textBoxUcitelj.style.visibility = "visible"
        document.body.appendChild(textBoxUcitelj);
        //----
        var textBoxPredmet = document.createElement('input');
        textBoxPredmet.type = 'text';
        textBoxPredmet.id = 'textBoxPredmet';
        textBoxPredmet.value = '';
        textBoxPredmet.maxLength = 50
        textBoxPredmet.style.position = "absolute";
        textBoxPredmet.style.left = "158px"
        textBoxPredmet.style.top = "187px"
        textBoxPredmet.style.width = "100px"
        textBoxPredmet.style.zIndex = "2";
        textBoxPredmet.style.visibility = "hidden"
        //textBoxPredmet.style.visibility = "visible"
        document.body.appendChild(textBoxPredmet);
}
var lo_GUIlayoutHasChanged = true;
var lo_repaintTimerActive  = false
var lo_hasRepaintRequest  = false
var lo_fullScreen = false

document.body.style.overflow = 'hidden'; // tole onemogoči scrollBar-s
var elMyCanvas = document.getElementById("myCanvas");
var ctxW = window.innerWidth - 18;
var ctxH = window.innerHeight - 10;
var ctxMinDim = Math.min(ctxW, ctxH)
const cv_panelGUI_height = 100

var ctx = elMyCanvas.getContext("2d");
//const bckgColor = "#F4F8F8";
const bckgColor = "white"; //10.4.2024

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
var lo_initHelpTips = false; // 3.1.2025
var tmHideTipsId;
var lo_hideTipsCounter = 0;
var lo_tipsColorDefault = "darkSlateGray";
var lo_tipsColor = lo_tipsColorDefault;
const cv_hideTipsSteps = 30;
const cv_hideTipsDuration = 700;
const cv_hideTipsTick = cv_hideTipsDuration / cv_hideTipsSteps; // na 700/30 (=23.3ms) se bo timer ustavil in se bo za malenkost spremenila barva/jakost help tipsov
const cv_hideTipsStepAlpha = 255 / cv_hideTipsSteps;

//---- 17.6.2024 COMMAND LINE PARAMS
var cmd_unit, cmd_f, cmd_P, cmd_a, cmd_realLens, cmd_n, cmd_realRefl, cmd_ruler, cmd_legend, cmd_initHelp;
var cmd_aval;

main();

//---- main()
function main() {

    //---- VHODNI PARAMETRI (16.6.2024) ... https://www.sitepoint.com/get-url-parameters-with-javascript/
    //lf_getCommandLineParams(); 
    
    //console.log("main():")
    //lf_focusCanvas(); // ne deluje!!! 30.1.2023 v1.6 ... ostaja torej problem, da je na začetku focus na address bar-u namesto na canvas DOM objektu. Ampak izgleda je problem samo v debug mode v VCCode!
   
    resizeCanvas();
    
    lf_setInitFilters(true, false, false, false, false);
    lf_setInitIncludes(true, true, true, false, false, false);

    paint();
    
    if (lo_showHelpTips) { // 3.1.2025
        lo_initHelpTips = true;
        tmHideTipsId = setTimeout(tmHideTips_tick, 5000); //po 5 sekundah naj se tipsi sami postopoma ugasnejo
    }
    
    //tmToolbarStartPeriod = setTimeout(tmToolbarStartPeriod_tick, 30000); //po 10 sekundah naj se toolbar sam skrije. Prikazal se bo potem spet, ko se mu boš približal z miško

    tmMouseOutOfWindowId = setInterval(tmMouseOutOfWindow_tick, 500); //na pol sekunde čekiram, če je miška izven okna
    
}

function lf_setInitFilters(filterPohvala, filterPotrebnaIzboljsava, filterKomentar, filterUcitelj, filterPredmet) {

    gl_usePohvala = filterPohvala; checkFilterPohvala.value = filterPohvala;
    gl_usePotrebnaIzboljsava = filterPotrebnaIzboljsava; checkFilterPotrebnaIzboljsava.value = filterPotrebnaIzboljsava;
    gl_useKomentar = filterKomentar; checkFilterKomentar.value = filterKomentar;
    gl_useUcitelj = filterUcitelj; checkFilterUcitelj.value = filterUcitelj;
    gl_usePredmet = filterPredmet; checkFilterPredmet.value = filterPredmet;

}

function lf_setInitIncludes(includeTip, includeUcitelj, includePredmet, includeDatum, includeUra, includeTermin) {

    gl_includeTip = includeTip; checkIncludeTip.value = includeTip;
    gl_includeUcitelj = includeUcitelj; checkIncludeUcitelj.value = includeUcitelj;
    gl_includePredmet = includePredmet; checkIncludePredmet.value = includePredmet;
    gl_includeDatum = includeDatum; checkIncludeDatum.value = includeDatum;
    gl_includeUra = includeUra; checkIncludeUra.value = includeUra;
    gl_includeTermin = includeTermin; checkIncludeTermin.value = includeTermin;
    
}

function lf_getCommandLineParams() {
    //---- 16.6.2024

    let tmpParam, tmpValue;

    //---- VHODNI PARAMETRI (16.6.2024) ... https://www.sitepoint.com/get-url-parameters-with-javascript/
    //---- podprti command line parametri:
    //       unit     [mm,cm]    
    //       f        [cv_f_min .. cv_f_max]
    //       P        [cv_P_min .. cv_P_max]
    //       a        [cv_a_min .. cv_a_max]
    //       realLens [0,1]
    //       n        [cv_n_min .. cv_n_max]
    //       realRefl [0,1]
    //       ruler    [0,1]
    //       legend   [0,1]
    //       initHelp [0,1]
    // primer uporabe: https://freeweb.t-2.net/pmalovrh/eLeca.html?unit=mm&f=26&P=31&a=56&ruler=0&realLens=1&n=1.71&legend=0&initHelp=0

    return;

    let commandString = window.location.search;

    // DEVELOPER DEBUG MODE
    //commandString = "?unit=mm&f=26&P=31&a=56&ruler=0&realLens=1&n=1.71&realRefl=1&legend=0&initHelp=0"

    console.log("command string: " + commandString);
    const urlParams = new URLSearchParams(commandString);
    
    //---- enote ("mm" ali "cm") 10.1.2025
    tmpParam = "unit"; cmd_unit = urlParams.get(tmpParam); // 10.1.2025
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_unit);
        if (cmd_unit == "mm") { lf_changeUnitCm(false, false); lf_changeUnitMm(true, false); };
        if (cmd_unit == "cm") { lf_changeUnitCm(true, false); lf_changeUnitMm(false, false); };
    } else {
        console.log(tmpParam + ": not present!");
    }
    
    //---- goriščna razdalja 10.1.2025
    tmpParam = "f"; cmd_f = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) { console.log(tmpParam + "  : " + cmd_f); } else { console.log(tmpParam + "  : not present!"); }
    if (valueBetween(cmd_f * 1, cv_f_min, cv_f_max)) { lf_changeF(cmd_f * 1, false); };
    
    //---- velikost predmeta 10.1.2025
    tmpParam = "P"; cmd_P = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) { console.log(tmpParam + ": " + cmd_P); } else { console.log(tmpParam + ": not present!"); }
    //if (cmd_P == "0") { lf_changeUseHalfPoint(false, false); };
    //if (cmd_P == "1") { lf_changeUseHalfPoint(true, false); };
    if (valueBetween(cmd_P * 1, cv_P_min, cv_P_max)) { lf_changeP(cmd_P * 1, false); };

    //---- oddaljenost predmeta 10.1.2025
    tmpParam = "a"; cmd_a = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) { console.log(tmpParam + ": " + cmd_a); } else { console.log(tmpParam + ": not present!"); }
    if (valueBetween(cmd_a * 1, cv_a_min, cv_a_max)) { lf_changeA(cmd_a * 1, false); };

    //---- realna leča 10.1.2025
    tmpParam = "realLens"; cmd_realLens = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_realLens);
        if (cmd_realLens == "0") { lf_changeShowRealLens(false, false) };
        if (cmd_realLens == "1") { lf_changeShowRealLens(true, false) };
    } else {
        console.log(tmpParam + ": not present!");
    }
    
    //---- lomni količnik leče 10.1.2025
    tmpParam = "n"; cmd_n = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) { console.log(tmpParam + ": " + cmd_n); } else { console.log(tmpParam + ": not present!"); }
    if (valueBetween(cmd_n * 1, cv_n_min, cv_n_max)) { lf_changeN(cmd_n * 1, false); };

    //---- realna lom žarka 12.1.2025
    tmpParam = "realRefl"; cmd_realRefl = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_realRefl);
        if (cmd_realRefl == "0") { lf_changeShowRealRefl(false, false) };
        if (cmd_realRefl == "1") { lf_changeShowRealRefl(true, false) };
    } else {
        console.log(tmpParam + ": not present!");
    }
    
    //---- ravnilo 10.1.2025
    tmpParam = "ruler"; cmd_ruler = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_ruler);
        if (cmd_ruler == "0") { lf_changeShowRuler(false, false) };
        if (cmd_ruler == "1") { lf_changeShowRuler(true, false) };
    } else {
        console.log(tmpParam + ": not present!");
    }

    //---- legenda 10.1.2025
    tmpParam = "legend"; cmd_legend = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_legend);
        if (cmd_legend == "0") { lf_changeShowLegend(false, false) };
        if (cmd_legend == "1") { lf_changeShowLegend(true, false) };
    } else {
        console.log(tmpParam + ": not present!");
    }

    //---- zagonska pomoč
    tmpParam = "initHelp"; cmd_initHelp = urlParams.get(tmpParam);
    if (urlParams.has(tmpParam)) {
        console.log(tmpParam + ": " + cmd_initHelp);
        if (cmd_initHelp == "0") { lo_showHelpTips = false; };
        if (cmd_initHelp == "1") { lo_showHelpTips = true; };
    } else {
        console.log(tmpParam + ": not present!");
    }

    //console.log(urlParams.getAll('size'));
    // [ 'm' ]
    //Programmatically add a second size parameter.
    //urlParams.append('size', 'xl');
    //console.log(urlParams.getAll('size'));
    // [ 'm', 'xl' ]
    
    //const
    //keys = urlParams.keys(),
    //values = urlParams.values(),
    //entries = urlParams.entries();
    //for (const key of keys) console.log(key);
    // product, color, newuser, size
    //for (const value of values) console.log(value);
    // shirt, blue, , m
    //for(const entry of entries) {
    //    console.log(`${entry[0]}: ${entry[1]}`);
    //}
    // product: shirt
    // color: blue
    // newuser:
    // size: m
    
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
        lo_initHelpTips = false;
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
        lo_initHelpTips = false;
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
    lo_mouseDown = false;
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
    let vl_end = false;
           
    //---- so HelpTips-i trenutno že prikazani?
    //if (lo_showHelpTips && lo_initHelpTips) { lf_changeShowHelpTips(false, true); }; // 3.1.2025
    //if (!vl_end && lo_showHelpTips) { // 3.3.2025
    //    lf_changeShowHelpTips(false, true);
    //    vl_end = true;
    //};

    //---- prikaži pomoč 10.1.2025
    //if (!vl_end && lo_showGUI && lo_enabledHelp) {
    //if (!vl_end && buttonHelp.visible && buttonHelp.enabled) {
    //    if (buttonHelp.eventClick(e.offsetX, e.offsetY)) {
    //        //console.log("click(): rslt=" + rslt.toString())
    //        lf_changeShowHelpTips(!lo_showHelpTips, true);
    //        vl_end = true
    //    }
    //}

    //---- branje posameznih tipov zapisov
    if (!vl_end && lo_showGUI) {
        boolRslt = checkFilterPohvala.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_usePohvala) {
            lf_changeUsePohvala(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkFilterPotrebnaIzboljsava.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_usePotrebnaIzboljsava) {
            lf_changeUsePotrebnaIzboljsava(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkFilterKomentar.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_useKomentar) {
            lf_changeUseKomentar(boolRslt, true)
            vl_end = true;
        }
    }
    if (!vl_end && lo_showGUI) {
        boolRslt = checkFilterUcitelj.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_useUcitelj) {
            lf_changeUseUcitelj(boolRslt, true)
            vl_end = true;
        }
    }    
    if (!vl_end && lo_showGUI) {
        boolRslt = checkFilterPredmet.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_usePredmet) {
            lf_changeUsePredmet(boolRslt, true)
            vl_end = true;
        }
    }   

    //---- filtriranje posameznih podatkov za izpis
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludeTip.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includeTip) {
            lf_changeIncludeTip(boolRslt, true)
            vl_end = true;
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludeUcitelj.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includeUcitelj) {
            lf_changeIncludeUcitelj(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludePredmet.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includePredmet) {
            lf_changeIncludePredmet(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludeDatum.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includeDatum) {
            lf_changeIncludeDatum(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludeUra.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includeUra) {
            lf_changeIncludeUra(boolRslt, true)
            vl_end = true
        }
    } 
    if (!vl_end && lo_showGUI) {
        boolRslt = checkIncludeTermin.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_includeTermin) {
            lf_changeIncludeTermin(boolRslt, true)
            vl_end = true
        }
    } 
    
    //---- naloži podatke razredov in ocen iz clipboard-a 27.1.2025
    if (!vl_end && buttonLoad.visible && buttonLoad.enabled) {
        if (buttonLoad.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            eA_clipboard_load();
            paint();
            vl_end = true;
        }
    }
    
    //---- formiraj izpis v clipboard-u 28.3.2026
    if (!vl_end && buttonCopy.visible && buttonCopy.enabled) {
        if (buttonCopy.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            if (gl_useUcitelj) { gl_useUciteljStr = textBoxUcitelj.value.trim() };
            if (gl_usePredmet) { gl_usePredmetStr =  textBoxPredmet.value.trim() };
            eA_data_output();
            paint();
            vl_end = true;
        }
    }

    //---- izberi naslednji separator 30.3.2026
    if (!vl_end && buttonSeparator.visible && buttonSeparator.enabled) {
        if (buttonSeparator.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            gl_separatorId += 1;
            if (gl_separatorId > cv_separator_max) { gl_separatorId = cv_separator_min }
            switch (gl_separatorId) {
                case 1:
                    gl_separator = cv_separator_1;
                    gl_separatorDesc = cv_separatorDesc_1;
                    break;
                case 2:
                    gl_separator = cv_separator_2;
                    gl_separatorDesc = cv_separatorDesc_2;
                    break;
                case 3:
                    gl_separator = cv_separator_3;
                    gl_separatorDesc = cv_separatorDesc_3;
                    break;
                case 4:
                    gl_separator = cv_separator_4;
                    gl_separatorDesc = cv_separatorDesc_4;
                    break;
                case 5:
                    gl_separator = cv_separator_5;
                    gl_separatorDesc = cv_separatorDesc_5;
                    break;
            }
            paint();
            vl_end = true;
        }
    }

    //if (lo_dragIntervalIgnoreFirstClick) { lo_dragIntervalIgnoreFirstClick = false; } //4.2.2023 v1.12

});

elMyCanvas.addEventListener('dblclick', (e) => {

    return;
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
        //if (lo_selectedVrhLece) {
        //    let tmpMin = lo_pixPerUnit * cv_lecaHeightMin / 2;
        //    if ((lo_gxLecaRight - lo_gxO) > tmpMin) { tmpMin = lo_gxLecaRight - lo_gxO };
        //    let tmpMax = lo_pixPerUnit * cv_lecaHeightMax / 2; // več kot toliko leča nikoli ne more biti visoka
        //    if (tmpMax > 0.95 * gpHeight / 2 ) { tmpMax = 0.95 * gpHeight / 2 }; // ven iz kadra leči ne pustim iti
        //    //if (lo_ghLecaCurentMax < cv_lecaHeightMax) { tmpMax = lo_ghLecaCurentMax }; // pri trenutni leči pa je omejitev zaradi nizkega polmera kroga krivine lahko še nižja
        //    if (valueBetween(lo_gyO - e.offsetY, tmpMin, tmpMax)) {
        //        lo_gyLecaTop = e.offsetY;
        //        lo_gyLecaBottom = lo_gyO + (lo_gyO - e.offsetY);
        //        lo_ghLece = lo_gyLecaBottom - lo_gyLecaTop; // celotna višina leče 3.1.2025
        //        lo_ghLeceHalf = lo_ghLece / 2;                // 3.1.2025
        //        lo_hLece = lo_ghLece / lo_pixPerUnit;         // 4.1.2025
        //        lo_hLeceHalf = lo_ghLeceHalf / lo_pixPerUnit; // 4.1.2025
        //        lo_modeCalculate = cv_modeCalculate_byLensSize;
        //    }
        //}
        //else if (lo_selectedTemeLece) {
        //    let tmpMin = lo_pixPerUnit * cv_lecaWidthMin / 2;
        //    let tmpMax = lo_pixPerUnit * cv_lecaWidthMax / 2; // več kot toliko leča nikoli ne more biti visoka
        //    if ((lo_ghLeceHalf) < tmpMax) { tmpMax = lo_ghLeceHalf };
        //    if (valueBetween(e.offsetX - lo_gxO, tmpMin, tmpMax)) {
        //        lo_gxLecaRight = e.offsetX;
        //        lo_gxLecaLeft = lo_gxO - (lo_gxLecaRight - lo_gxO);
        //        lo_gdLece = lo_gxLecaRight - lo_gxLecaLeft; // celotna debelina leče 4.1.2025
        //        lo_gdLeceHalf = lo_gdLece / 2;                // 4.1.2025
        //        lo_dLece = lo_gdLece / lo_pixPerUnit;         // 4.1.2025
        //        lo_dLeceHalf = lo_gdLeceHalf / lo_pixPerUnit; // 4.1.2025
        //        lo_modeCalculate = cv_modeCalculate_byLensSize;
        //    }
        //}
    }
    else {
        //Me.Location = New Point((Me.Location.X - lo_lastMouseLocation.X) + e.X, (Me.Location.Y - lo_lastMouseLocation.Y) + e.Y)
        //Me.Update()
        //console.log("mouse_move-drag")
        //return;
    }

    //23.1.2023 v1.0 Je miška nad kakšnim kontrolerjem?
    if (checkFilterPohvala.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkFilterPotrebnaIzboljsava.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkFilterKomentar.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkFilterUcitelj.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkFilterPredmet.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludeTip.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludeUcitelj.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludePredmet.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludeDatum.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludeUra.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (checkIncludeTermin.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (buttonLoad.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (buttonCopy.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (buttonSeparator.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else { document.body.style.cursor = "default" };
    
    //če se miška v resnici ni premaknila ne naredim nič
    if (e.offsetX == lo_mouseMoveX && e.offsetY == lo_mouseMoveY) {
        //console.log("mouse_no_move")
        return;
    }

    //Miška se je zares premaknila
    //console.log("mouse_move_beforeExecute")
    lo_mouseMoveX = e.offsetX;
    lo_mouseMoveY = e.offsetY;
    //console.log(e.offsetX + "-" + e.offsetY)

    //---- če je toolbar skrit, in je z miško prišel v bližino (ali pa na levi rob ekrana), potem naj se toolbar prikaže
    //     če pa je toolbar prikazan, se preveri, ali je miška šla daleč stran in v tem primeru se ga skrije
    //const dist = 100;
    //if (lo_mouseMoveX < 20 ||
    //    mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, buttonMode.left - dist, buttonMode.top - dist, buttonHelp.left + buttonHelp.width + 1.5 * dist, buttonHelp.top + buttonHelp.height + dist)) {
    //    lo_showDynamicToolbar = true;
    //} else {
    //    if (!lo_toolbarStartPeriod) { lo_showDynamicToolbar = false; }
    //};
    //console.log("lo_showDynamicToolbar=" + lo_showDynamicToolbar.toString());

    // noben chart in noben učenec nista selektirana -> treba je pogledati, ali je selektirano karkoli drugega ...

    // tudi nič drugega ni selektiranega, zato izhod brez potrebe po ponovnem risanju!

    //// poleg prej preverjenega, kjer je lahko hkrati selektirana samo ena zadeva, je lahko paralelno selektiran tudi center krivine leče
    //if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, lo_gxLecaCenterL - 30, lo_gyO - 30, lo_gxLecaCenterL + 30, lo_gyO + 30)) { lo_selectedCenterKrivineLece = true; }
    //else if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, lo_gxLecaCenterD - 30, lo_gyO - 30, lo_gxLecaCenterD + 30, lo_gyO + 30)) { lo_selectedCenterKrivineLece = true; }

    //if (lo_mouseDown && oldSelectedVrhLece) { lo_selectedVrhLece = true; } // ne glede na to, kje z miško vlečem, naj kar ostane selektiran
    //else if (lo_mouseDown && oldSelectedTemeLece) { lo_selectedTemeLece = true; }; // ne glede na to, kje z miško vlečem, naj kar ostane selektiran

    //console.log("mouse_move - calling paint_delay()")
    paint_delay(); //da na oseh označi koordinate miške
    //console.log("mouse_move exit")
    
});

//window.addEventListener("wheel", event, (passive = true) => {
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    let newValue, change, maxDiff;
    
    //if (gl_mode == cv_mode_ucenec) {
    //    gl_changeByMouseWheel_ucenecChart = true; // 4.2.2024
    //    lf_changeFocusUcenec(lf_changeValueFocusUcenec(event.shiftKey ? delta : -delta), true);
    //    return; //konec prverjanja, ker je s pritisnjeno tipko X povedal, da hoče točno to in nič drugega
    //};
    //if (gl_mode == cv_mode_razred) {
    //    gl_changeByMouseWheel_razredChart = true; // 4.2.2024
    //    lf_changeFocusRazred(lf_changeValueFocusRazred(event.shiftKey ? -delta : delta), true);
    //    return; //konec prverjanja, ker je s pritisnjeno tipko X povedal, da hoče točno to in nič drugega
    //};

    ////---- če vrti kolešček miške ob pritisnjeni tipki X, s tem spreminja skupno število goriščnih razdalj na X osi
    //if (lo_keyDownX) {
    //    //if (lo_enabledintChooserF) {
    //    change = delta * lo_stepXnrF;
    //    if (lo_keyDownShiftLeft) { change = 5 * delta / Math.abs(delta) };
    //    newValue = lf_changeValueXnrF(change);
    //    gl_changeByMouseWheel_ucenecChart = true; // 4.1.2024
    //    lf_changeXnrF(newValue, true);
    //    //}
    //    return; //konec prverjanja, ker je s pritisnjeno tipko X povedal, da hoče točno to in nič drugega
    //}

  
    ////---- ... sicer spreminja ...?        
    ////---- če si nad intChooserjem za goriščno razdaljo f lahko z vrtenjem koleščka miške spreminjaš f
    //else if (lo_enabledintChooserF && intChooserF.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) {
    //    change = delta * lo_fStep;
    //    if (lo_keyDownShiftLeft) { change = 5 * delta / Math.abs(delta) };
    //    //newValue = lf_changeValueF(change);
    //    //if (change > 0 && (Math.trunc(10 * lo_f) / 10 !== lo_f)) { change -= 1 }; // ker bom delal trunc!(primer: 44.3 na dol bo tako 44, na gor bo 45)
    //    //newValue = Math.trunc(lf_changeValueF(change)); // ker imam step=1 in lahko grem nazaj na cele vrednosti! 4.1.2025
    //    newValue = lf_changeValueF(change, true);
    //    gl_changeByMouseWheel_F = true; // 4.1.2024
    //    lf_changeF(newValue, true);
    //}

    //---- ... sicer (2) spreminja ...?  
    ////---- če je v bližini optične osi lahko z vrtenjem koleščka miške premikaš predmet levo-desno (spreminjaš a)
    //else if ((Math.abs(lo_mouseMoveY - lo_gyO) < 40) && (lo_mouseMoveX < lo_gxO)) {
    //    change = delta * lo_aStep;
    //    if (lo_keyDownShiftLeft) { change = 5 * delta / Math.abs(delta) };
    //    newValue = lf_changeValueA(change);
    //    gl_changeByMouseWheel_A = true; // 4.1.2024
    //    lf_changeA(newValue, true);
    //}


});

window.addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'ShiftLeft':
            lo_keyDownShiftLeft = true; break;  //console.log(lo_keyDownShiftLeft); break;
        case 'ControlLeft':
            // CTRL+mouseWheel = ZOOM v browserju !!!
            //lo_keyDownControlLeft = true; break;  //console.log(lo_keyDownShiftLeft); 
            break;        
        case 'KeyR':
            //lo_keyDownR = true; break;
            //console.log("R pressed");
            break;
        // case 'KeyZ': case 'KeyY':
       
        case 'KeyP': // sprememba predmeta 28.1.2025
            //console.log("T pressed");
            //if (event.shiftKey) { // 26.1.2025
            //    lf_changePredmet(lo_predmet - 1, false); // 26.1.2025
            //} else {
            //    lf_changePredmet(lo_predmet + 1, false); // 26.1.2025
            //}
            break;
        case 'KeyT': // sprememba zaporedne številke testa pri istem predmetu
            //console.log("T pressed");
            break;
        case 'KeyU':
            //console.log("U pressed");
            break;
        case 'Escape':
            break;
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
            lf_changeShowGUI(!lo_showGUI, true); paint(); break;
        case 'KeyN': case 'F2':
            lf_changeShowHelpTips(!lo_showHelpTips, true); break;
        case 'KeyI':
            lf_changeShowToolTips(!lo_showToolTips, true); break;
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

    //---- 30.1.2023 v1.6
    if (lo_GUIlayoutHasChanged) {
        //initGraphicalEnvironment();
        switch (lo_GUI_layout) {
            case cv_guiLayoutA:
                break;
            case cv_guiLayoutB:
                paint_GUI_layoutB(); break;
        }
        lo_GUIlayoutHasChanged = false;
    }
    
    paint_eAget();
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

function paint_eAget() {
    
    //---- risanje ustreznega prikaza

}

function lf_fixProcent(vp_nrStr) {

    if (vp_nrStr.endsWith(".00")) {
        return vp_nrStr.substring(0, vp_nrStr.length - 3);
    } else {
        return vp_nrStr;
    }
}

function lf_addTextPercent(vp_tock) {

    if (lo_drawListSimpleNoPercent) { return "" };

    return " (" + lf_fixProcent((vp_tock / lo_f * 100).toFixed(2)) + "%)";

}

function lf_addTextTock(vp_tock) {
    //-------------------------------
    // 0 .. točk, 1 .. točka, .. 2 .. točki, .. 3 .. točke, 4 .. točke, 5 .. točk, 6 .. točk, ....
    // 0.5, 1.5, 2.5, 3.5, ... točke
    //-------------------------------

    let addText = ""

    //---- če ni na minimalnem prikazu, se ne izpisuje besede "točk/a/e/i"
    if (!lo_drawListSimple) {
        return addText;
    }

    return lf_textTock(vp_tock);

}

function lf_textTock(vp_tock) {
    //-------------------------------
    // 0 .. točk, 1 .. točka, .. 2 .. točki, .. 3 .. točke, 4 .. točke, 5 .. točk, 6 .. točk, ....
    // 0.5, 1.5, 2.5, 3.5, ... točke
    //-------------------------------

    let addText = ""

    //---- default rezultat je " točk"
    let strTock = " to" + scTchLow + "k";
    
    //---- za primer 0.5, 1.5, 2.5, 3.5, .... je rezultat " točke" (primer: https://www.gov.si/teme/nadaljnje-izobrazevanje-in-usposabljanje-strokovnih-delavcev-v-vzgoji-in-izobrazevanju/)
    if (vp_tock !== Math.trunc(vp_tock)) {
        addText = strTock + "e";
        return addText;
    }

    //---- za celoštevilčno število točk
    switch (vp_tock) {
        case 0:
            addText = strTock;
            break;
        case 1:
            addText = strTock + "a";
            break;
        case 2:
            addText = strTock + "i";
            break;
        case 3: case 4:
            addText = strTock + "e";
            break;
        default:
            addText = strTock;
            break;
    }
    return addText;

}

function lf_mouseOverScatterPlotDataPoint(mouseX, mouseY) {

    lo_focusUcenec = cv_placeNone;
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
                lo_focusUcenec = place;
                lo_focusMonth = month;
                return true;
            }
        }

    }
}

function paint_GUI() {

    let y, w, h, tmpText;

    checkFilterPohvala.paint();
    //if (nrPohvala > 0) { gText(nrPohvala.toString(), "normal 8pt verdana", "darkSlateGray", 102, checkFilterPohvala.top + 17); }
    if (nrPohvala > 0) {
        tmpText = nrPohvala.toString();
        [w, h] = gMeasureText(tmpText, "normal 8pt verdana");
        gBannerRoundRectWithText3(106, checkFilterPohvala.top + 5, w, h, "normal 9pt verdana", "darkSlateGray", tmpText, 4, 4, 3, 5, "lightYellow", 1, "gray", "darkGray", 2, 2, false);
    };
    checkFilterPotrebnaIzboljsava.paint();
    if (nrPotrebnaIzboljsava > 0) {
        tmpText = nrPotrebnaIzboljsava.toString();
        [w, h] = gMeasureText(tmpText, "normal 8pt verdana");
        gBannerRoundRectWithText3(185, checkFilterPotrebnaIzboljsava.top + 5, w, h, "normal 9pt verdana", "darkSlateGray", tmpText, 4, 4, 3, 5, "lightYellow", 1, "gray", "darkGray", 2, 2, false);
    };
    checkFilterKomentar.paint();
    if (nrKomentar > 0) {
        tmpText = nrKomentar.toString();
        [w, h] = gMeasureText(tmpText, "normal 8pt verdana");
        gBannerRoundRectWithText3(120, checkFilterKomentar.top + 5, w, h, "normal 9pt verdana", "darkSlateGray", tmpText, 4, 4, 3, 5, "lightYellow", 1, "gray", "darkGray", 2, 2, false);
    };    
    checkFilterUcitelj.paint();
    checkFilterPredmet.paint();
    //----
    checkIncludeTip.paint();
    checkIncludeUcitelj.paint();
    checkIncludePredmet.paint();
    checkIncludeDatum.paint();
    checkIncludeUra.paint();
    checkIncludeTermin.paint();
    //----
    buttonLoad.paint();
    buttonCopy.paint();
    buttonSeparator.paint();

    //---- filtriranje zapisov
    y = 70;
    gLine(20, y, 90, y, 3, "darkSlateGray", [4, 4]);
    gText("Filtriranje zapisov", "italic 13pt serif", "darkSlateGray", 100, y + 3);
    gLine(240, y, 310, y, 3, "darkSlateGray", [4, 4]);
    //---- formatiranje izpisa
    y = 231;
    gLine(20, y, 90, y, 3, "darkSlateGray", [4, 4]);
    gText("Formatiranje izpisa", "italic 13pt serif", "darkSlateGray", 100, y + 3);
    gLine(250, y, 310, y, 3, "darkSlateGray", [4, 4]);
    //---- separator
    y = 405;
    gText("Lo" + scTchLow + "ilo med polji:", "normal 10pt verdana", "darkSlateGray", 20, y + 3);
    gText(gl_separatorDesc, "normal 10pt verdana", "darkSlateGray", 166, y + 3);
    //----
    if (loadStatus != "") {
        gText("zapisov: " + loadStatus, "italic 11pt serif", "darkGray", buttonLoad.left + buttonLoad.width + 12, buttonLoad.top + 22);
    }
    if (copyStatus != "") {
        gText("zapisov: " + copyStatus, "italic 11pt serif", "darkGray", buttonCopy.left + buttonCopy.width + 12, buttonCopy.top + 22);
    }        

    //---- 1. on-screen namigi/pomoč
    //if (lo_showHelpTips) { paint_tips(); }


    
    // ---- PRIKAZ TOOLTIP-sov za gumbe v toolBar-u
    if (lo_showToolTips) { //1.4.2024
        //if (lo_enabledHelp) { // 27.1.2025
        // pogoj VISIBLE IN ENABLED se testirata že v samem objektu!
        checkFilterPohvala.showToolTip(); checkFilterPotrebnaIzboljsava.showToolTip(); checkFilterKomentar.showToolTip(); checkFilterUcitelj.showToolTip(); checkFilterPredmet.showToolTip();
        checkIncludeTip.showToolTip(); checkIncludeUcitelj.showToolTip(); checkIncludePredmet.showToolTip(); checkIncludeDatum.showToolTip(); checkIncludeUra.showToolTip(); checkIncludeTermin.showToolTip();
        buttonLoad.showToolTip(); buttonCopy.showToolTip(); buttonSeparator.showToolTip();
        //};
    };

    //if (dbg) {
    //    vStep = 15;
    //    x = 4; y = 15;
    //    //if (lo_modeCalculate == cv_modeCalculate_byF) { gText("lo_modeCalculate = -byF-", "10pt verdana", "black", x, y) } else { gText("lo_modeCalculate = -byLensSize-", "10pt verdana", "black", x, y) };
    //}
}

function paint_tips() {

    // text baselines: https://www.javascripttutorial.net/web-apis/javascript-filltext/

    switch (lo_GUI_layout) {
        
        case cv_guiLayoutB:
            
            let x0 = 20; let x1 = x0 + 130;
            let y0 = 48; let vStep = 25; let y = y0 - vStep;
            let font = "normal 12pt serif";
            let font2 = "italic 12pt serif";
            let font3 = "bold 12pt serif";
            let nrTipRows = 15;
            let nrSeparators = 3;
            const vStepSep = 8;
            let backHeight = nrTipRows * vStep + nrSeparators * vStepSep + 15;
            const bannerWidth = 570;

            gBannerRoundRect(x0 - 15, y0 - 13, bannerWidth, backHeight, 20, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true); //zdaj treba manj transparentno, ker senčenje od v1.16 deluje samo okoli bannerja, ne pa tudi pod njim
            //
            y += vStep;
            gBannerRectWithText2("F2", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 27, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("N", x0 + 41, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i to pomo" + scTchLow, x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);

            //
            y += (vStep + vStepSep) / 2;
            gLine(x0 - 4, y + 6, x0 + bannerWidth - 25, y + 6, 1, lo_tipsColor, [4, 4]);
            y += (vStep + vStepSep) / 2;
            
            //
            gBannerRectWithText2("L", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... preklop pregleda med razredi posamezno ali skupno po letniku", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("R", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... naslednji/prej" + scSchLow + "nji razred/letnik", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("P", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... naslednji/prej" + scSchLow + "nji predmet", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("U", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... naslednji/prej" + scSchLow + "nji u" + scTchLow + "enec/u" + scTchLow + "enka", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("T", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... naslednji/prej" + scSchLow + "nji pisni test pri istem predmetu", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("...+SHIFT", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... vklop smeri nazaj pri L/R/P/U/T", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("S", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("(+", x0 + 25, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("SHIFT", x0 + 45, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2(")", x0 + 98, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("... ZOOM +/- prikaza razpr" + scSchLow + "enosti rezultatov", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            //y += vStep;
            //gBannerRectWithText2("+", x0 + 35, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            //gBannerRectWithText2("SHIFT", x0 + 50, y, font, 3, 3, 1, 1, "red", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            //gBannerRectWithText2("... hitrej" + scSchLow + "e spreminjanje ob pritisnjenem SHIFT", x1 + 20, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);            
            y += vStep;
            gBannerRectWithText2("C", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i luknje v kriterijih to" + scTchLow + "kovnika", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("F", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 19, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("Esc", x0 + 33, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... vklju" + scTchLow + "i/izklju" + scTchLow + "i fokus na graf ocen razreda / u" + scTchLow + "enca", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... izbira grafa ocen razreda ali u" + scTchLow + "enca za prikaz v fokusu", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            
            //
            y += (vStep + vStepSep) / 2;
            gLine(x0 - 4, y + 6, x0 + bannerWidth - 25, y + 6, 1, lo_tipsColor, [4, 4]);
            y += (vStep + vStepSep) / 2;
            
            //
            gBannerRectWithText2("D", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... nalo" + scZhLow + "i kopirane podatke ocen iz clipboarda", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);

            //
            y += (vStep + vStepSep) / 2;
            gLine(x0 - 4, y + 6, x0 + bannerWidth - 25, y + 6, 1, lo_tipsColor, [4, 4]);
            y += (vStep + vStepSep) / 2;
            
            //          
            gBannerRectWithText2("I", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i pomo" + scTchLow + " nad GUI kontrolerji", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("G", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i gumbe, avtorja, " + scTchLow + "ase", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //     
            y += vStep;
            gBannerRectWithText2("desniKlikMi" + scSchLow + "ke", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... lahko shrani" + scSchLow + " sliko", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
                
    }
}

function paint_GUI_layoutB_0() {

    const wSep = 50;
    const cv_left = 20;
    let yTop = 20;

    //---- 27.1.2025
    checkFilterPohvala.top = yTop; checkFilterPotrebnaIzboljsava.top = yTop; checkFilterKomentar.top = yTop;
    checkFilterPohvala.left = cv_left; 
    checkFilterPotrebnaIzboljsava.left = checkFilterPohvala.left + checkFilterPohvala.width + wSep;
    checkFilterKomentar.left = checkFilterPotrebnaIzboljsava.left + checkFilterPotrebnaIzboljsava.width + wSep;

    yTop = 50;
    checkFilterUcitelj.top = yTop;
    checkFilterUcitelj.left = cv_left;
    checkFilterPredmet.top = yTop;
    checkFilterPredmet.left = cv_left;

    checkIncludeTip.top = yTop; checkIncludePredmet.top = yTop; checkIncludeUcitelj.top = yTop; checkIncludeDatum.top = yTop; checkIncludeUra.top = yTop; checkIncludeTermin.top = yTop;
    checkIncludeTip.left = cv_left;
    checkIncludePredmet.left = checkIncludeTip.left + checkIncludeTip.width + wSep;
    checkIncludeUcitelj.left = checkIncludePredmet.left + checkIncludePredmet.width + wSep;
    checkIncludeDatum.left = checkIncludeUcitelj.left + checkIncludeUcitelj.width + wSep;
    checkIncludeUra.left = checkIncludeDatum.left + checkIncludeDatum.width + wSep;
    checkIncludeTermin.left = checkIncludeUra.left + checkIncludeUra.width + wSep;

    yTop = 80;
    buttonLoad.top = yTop;
    buttonLoad.left = cv_left;

}

function paint_GUI_layoutB() {

    const hSep = 25;
    const cv_left = 20; const cv_top = 20;
    let x = cv_left; let y = cv_top;

    y = cv_top;
    buttonLoad.top = y; buttonLoad.left = cv_left;

    y += hSep + hSep + 15;

    checkFilterPohvala.left = cv_left; checkFilterPotrebnaIzboljsava.left = cv_left; checkFilterKomentar.left = cv_left; checkFilterUcitelj.left = cv_left; checkFilterPredmet.left = cv_left;
    checkFilterPohvala.top = y; 
    y += hSep; checkFilterPotrebnaIzboljsava.top = y;
    y += hSep; checkFilterKomentar.top = y;
    y += hSep; checkFilterUcitelj.top = y;
    y += hSep; checkFilterPredmet.top = y;

    y += hSep + 10;

    checkIncludeTip.left = cv_left; checkIncludePredmet.left = cv_left; checkIncludeUcitelj.left = cv_left; checkIncludeDatum.left = cv_left; checkIncludeUra.left = cv_left; checkIncludeTermin.left = cv_left;
    y += hSep; checkIncludeTip.top = y; 
    y += hSep; checkIncludePredmet.top = y;
    y += hSep; checkIncludeUcitelj.top = y;
    y += hSep; checkIncludeDatum.top = y;
    y += hSep; checkIncludeUra.top = y;
    y += hSep; checkIncludeTermin.top = y;

    y += hSep;
    buttonSeparator.top = y - 4; buttonSeparator.left = 139;

    y += 35;
    buttonCopy.top = y; buttonCopy.left = cv_left;

}

function lf_nextPrevFocusRazred(shift) {

    lf_changeFocusRazred(lf_changeValueFocusRazred(shift ? -1 : 1), true);

}

function lf_changeValuePrintLevel(vp_change) {

    lo_printLevel += vp_change

    lo_printLevel = fixForRange(lo_printLevel, cv_printLevelMin, cv_printLevelMax);
}

function lf_changePrintLevel(vp_newValue, vp_paint) {

    lo_printLevel = vp_newValue;
    //console.log("printLevel=" + lo_printLevel.toString());

    lo_printLevel = fixForRange(lo_printLevel, cv_printLevelMin, cv_printLevelMax);

    lf_setPrintLevel(vp_paint);

}

function lf_changeZaokrozujNaCeleProcente(vp_newValue, vp_paint) {

    lo_zaokrozujNaCeleProcente = vp_newValue;
    buttonKritLuknje.valueOnOff = !lo_zaokrozujNaCeleProcente;
    if (vp_paint) { paint() }

}

function lf_changeShowHelpTips(vp_newValue, vp_paint) {

    lo_showHelpTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowGUI(vp_newValue, vp_paint) {

    lo_showGUI = vp_newValue;

    lo_toolbarStartPeriod = false; // 3.3.2025

    if (vp_paint) { paint() }
}

function lf_changeDebug(vp_newValue, vp_paint) {

    dbg = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowToolTips(vp_newValue, vp_paint) {

    lo_showToolTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeUsePohvala(vp_newValue, vp_paint) {

    gl_usePohvala = vp_newValue;
    checkFilterPohvala.value = gl_usePohvala;
    if (vp_paint) { paint() }

}

function lf_changeUsePotrebnaIzboljsava(vp_newValue, vp_paint) {

    gl_usePotrebnaIzboljsava = vp_newValue;
    checkFilterPotrebnaIzboljsava.value = gl_usePotrebnaIzboljsava;
    if (vp_paint) { paint() }

}

function lf_changeUseKomentar(vp_newValue, vp_paint) {

    gl_useKomentar = vp_newValue;
    checkFilterKomentar.value = gl_useKomentar;
    if (vp_paint) { paint() }

}

function lf_changeUseUcitelj(vp_newValue, vp_paint) {

    gl_useUcitelj = vp_newValue;
    checkFilterUcitelj.value = gl_useUcitelj;
    
    switch (gl_useUcitelj) {
        case true:
            textBoxUcitelj.style.visibility = "visible";
            break;
        case false:
            textBoxUcitelj.style.visibility = "hidden";
            break;
    }

    if (vp_paint) { paint() }

}

function lf_changeUsePredmet(vp_newValue, vp_paint) {

    gl_usePredmet = vp_newValue;
    checkFilterPredmet.value = gl_usePredmet;

    switch (gl_usePredmet) {
        case true:
            textBoxPredmet.style.visibility = "visible";
            break;
        case false:
            textBoxPredmet.style.visibility = "hidden";
            break;
    }

    if (vp_paint) { paint() }

}

function lf_changeIncludeTip(vp_newValue, vp_paint) {

    gl_includeTip = vp_newValue;
    checkIncludeTip.value = gl_includeTip;
    if (vp_paint) { paint() }

}

function lf_changeIncludeUcitelj(vp_newValue, vp_paint) {

    gl_includeUcitelj = vp_newValue;
    checkIncludeUcitelj.value = gl_includeUcitelj;
    if (vp_paint) { paint() }

}

function lf_changeIncludePredmet(vp_newValue, vp_paint) {

    gl_includePredmet = vp_newValue;
    checkIncludePredmet.value = gl_includePredmet;
    if (vp_paint) { paint() }

}

function lf_changeIncludeDatum(vp_newValue, vp_paint) {

    gl_includeDatum = vp_newValue;
    checkIncludeDatum.value = gl_includeDatum;
    if (vp_paint) { paint() }

}

function lf_changeIncludeUra(vp_newValue, vp_paint) {

    gl_includeUra = vp_newValue;
    checkIncludeUra.value = gl_includeUra;
    if (vp_paint) { paint() }

}

function lf_changeIncludeTermin(vp_newValue, vp_paint) {

    gl_includeTermin = vp_newValue;
    checkIncludeTermin.value = gl_includeTermin;
    if (vp_paint) { paint() }

}

function hideAllControls() {

    [buttonLoad, buttonHelp].forEach(hideAndDisableControl);

}

function showAndEnableControls_modeTest() {

    if (lo_drawAnalizaNalog && lo_razredAll) {
        [ buttonLoad, buttonHelp].forEach(showAndEnableControl);
    } else {
        [ buttonLoad, buttonHelp].forEach(showAndEnableControl);
    }

}

function showAndEnableControls_modeUcenec() {

    [ buttonLoad, buttonHelp].forEach(showAndEnableControl);

}


function showAndEnableControl(control, index) {

    control.visible = true;
    control.enabled = true;

}

function hideAndDisableControl(control, index) {

    control.visible = false;
    control.enabled = false;

}

function tmMouseOutOfWindow_tick() {
    
}

function paint_author() {

    //======== AVTOR
    let tmpStr = scCopyR + "2026 Peter Malovrh";
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
    if (dbg) { console.log("-- paint_delay()"); }
    switch (lo_repaintTimerActive) {
        case true:
            lo_hasRepaintRequest = true;
            if (dbg) { console.log("   .. repaint timer active / have repaint requests"); }
            return;
        case false:
            if (dbg) { console.log("   .. repaint timer inactive / call paint() ..."); }
            paint();
            if (dbg) { console.log("      painted ... set repaint timer now, has no repaint requests"); }
            setTimeout(tmPaintDelay_tick, 10)
            lo_repaintTimerActive = true
            lo_hasRepaintRequest = false
    }
}

function tmPaintDelay_tick() {
    if (dbg) { console.log("-- tmPaintDelay_tick()") };
    lo_repaintTimerActive = false
    if (lo_hasRepaintRequest) {
        lo_hasRepaintRequest = false;
        if (dbg) { console.log("   .. have repaint reqs .. call paint() ..."); }
        paint();
        if (dbg) { console.log("      painted"); }
    } else {
        if (dbg) { console.log("   .. no repaint reqs"); }
    }
    //console.log(lo_mouseMoveX)

}

function setWebLink() {
    // 10.1.2025
    // primer uporabe: https://freeweb.t-2.net/pmalovrh/eLeca.html?unit=mm&f=26&P=31&a=56&ruler=0&realLens=1&n=1.71&legend=0&initHelp=0
    
    let webLink = "";
    
    //---- generirm web link
    webLink = "https://freeweb.t-2.net/pmalovrh/eLeca.html";
    webLink += "?unit=" + lo_unitStr;
    webLink += "&f=" + Number(intChooserF.value);
    webLink += "&P=" + Number(intChooserP.value);
    webLink += "&a=" + Number(intChooserA.value);
    webLink += "&ruler=" + (lo_showRuler ? "1" : "0");
    webLink += "&realLens=" + (lo_showRealLens ? "1" : "0");
    webLink += "&n=" + Number(intChooserN.value);
    webLink += "&realRefl=" + (lo_realniLom ? "1" : "0"); // 12.1.2025
    webLink += "&legend=" + (lo_showLegend ? "1" : "0");
    webLink += "&initHelp=1";
    console.log("webLink=" + webLink);
    
    //---- link na clipboard
    navigator.clipboard.writeText(webLink);

}

function tmToolbarStartPeriod_tick() {

    lo_toolbarStartPeriod = false;
    lo_showDynamicToolbar = false;
    paint(); paint(); // 2.2.2025 dvakrat zato, ker pri prvem prehodu najprej riše grafe in šele potem da .visible značko gumbom. Ko riše drugič, pa se to že upošteva in se grafi prilagodijo

}

function randomAtoB(a, b) {
    // 2.2.2025

    let range = b - a + 1;
    return (a + Math.trunc(range * Math.random()));
}

async function setClipboard(text) {
  const type = "text/plain";
  const clipboardItemData = {
    [type]: text,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}

function encryptUcenciRazredi() {
    // po potrebi sem prekopiraj kodo iz encryptData.txt !!
    // naloadaš prave podatke
    // stisneš Shift-E
    // na clipboard-u imaš konvertirane podatke, ki jih nekam paste-aš in shraniš (dataXX.txt)
}

function eA_clipboard_load() {

    if (document.hasFocus) {
        let aa = 1;
    } else {
        console.log("Document not focused!");
    }
        
    navigator.clipboard.readText()
        .then((clipText) => {
            
            //console.log('clipboard contents', clipText);
            if (!eA_clipboard_check(clipText)) {
                return
            };
        
            eA_data_initParseAndPrepare(clipText); // 28.3.2026

        })
}
function eA_clipboard_check(clipText) {

    // Je kaj na clipboard-u?
    if (clipText.length < 50) {
        console.log("ERROR: No content on clipboard!");
        return (false);
    };

    // Na clipboardu je kar nekaj vsebine
    // A so notri potrebni markerji?
    
    // Preverim vsebovanje elementov, ki sigurno so v vsakem data fajlu
    if (clipText.indexOf(".") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    if (clipText.indexOf(",") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    if (clipText.indexOf("-") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    
    return (true);

}

function eA_data_initParseAndPrepare(textData) {

    // Inicializacija podatkovnih struktur
    //intDataStructures();

    // Očitno to so podatki o razredih in ocenah, treba je sparsati
    console.log("PARSE -->");
    eA_data_parse(textData);


}

function eA_data_parse(clipText) {

    let pos, pos1, lineStr, searchStr;
    let haveLines = true;
    let nrLines = 0;
    let rslt;
    let currentCol = 1; let currentLine = 1;
    let tip = ""; let ucitelj = ""; let predmet = ""; let danDatum = ""; let datum = ""; let ura = ""; let termin = ""; let vsebina = "";
    let haveDataLine = false; 
    let textOut = ""; let textOutClipboard = ""
    
    //---- spraznimo podatkovne strukture
    arrTip.length = 0; arrDatum.length = 0; arrPredmet.length = 0; arrUra.length = 0; arrTermin.length = 0; arrVsebina.length = 0; arrUcitelj.length = 0;
    nrDataLines = 0;
    nrPohvala = 0; nrPotrebnaIzboljsava = 0; nrKomentar = 0; nrOdsotnost = 0; nrOdsotnostDogodek = 0;

    for (pos = 0; haveLines; nrLines++) {
        // poiščem konec naslednje vrstice
        pos1 = clipText.indexOf("\n", pos);
        
        // ---- Ali morda ni več prehodov v nove vrstice?
        if (pos1 <= pos) {
            // ni več prelomov v novo vrstico - vzamem vse do konca teksta kot zadnjo vrstico
            haveLines = false;
            lineStr = clipText.slice(pos).trim();
            //---- 30.3.2026
            if (currentCol > 3) {
                //---- vpis novega zapisa
                eA_data_newLineData(tip, ucitelj, predmet, datum, ura, termin, vsebina);
                break;
            }
        } else {
            // ---- Našli smo nov prelom v naslednjo vrstico - treba je obdelati tekočo vrstivo
            lineStr = clipText.slice(pos, pos1).trim();
        }

        //if (lineStr=="Torek, 16. 9.") {
        //    lineStr = lineStr;
        //}

        switch (currentCol) {
            case 4: case 5: case 6:  //---- vse naprej od VSEBINA
                switch (lineStr) {
                    //---- če imamo v lineStr že začetek novega zapisa, je treba doslej nabrano shraniti kot nov zapis
                    case "pohvala": case "potrebna izbolj" + scSchLow + "ava": case "komentar": case "odsotnost": case "odsotnost dogodek":
                        //---- vpis novega zapisa
                        eA_data_newLineData(tip, ucitelj, predmet, datum, ura, termin, vsebina);
                        //----- priprava struktur na naslednji zapis
                        tip = ""; ucitelj = ""; predmet = ""; danDatum = ""; datum = ""; ura = ""; termin = ""; vsebina = "";
                        haveDataLine = false;
                        currentCol = 1; currentLine = 1;
                        break;
                    default:
                        break;
                }
                break;
        }

        switch (currentCol) {
            case 1: //---- TIP / DATUM
                switch (currentLine) {
                    case 1:
                        switch (lineStr) {
                            case "pohvala": case "potrebna izbolj" + scSchLow + "ava": case "komentar":
                                tip = lineStr;
                                currentLine = 2;
                                break;
                            default:
                                // nič od tega, kar pričakujem - verjetno napačen format podatkov - nasleddnja vrstica ...
                                break;
                        }
                        break;
                    case 2:
                        danDatum = lineStr;
                        datum = lf_getDatumFromDanDatum(danDatum);
                        currentCol = 2; currentLine = 1;
                        break;
                }
                break;
            case 2: //---- URA / PREDMET / TERMIN
                switch (currentLine) {
                    case 1:
                        predmet = lineStr;
                        if (predmet.length > 2) {
                            if (predmet.substring(1, 3) == ". ") {
                                ura = predmet.substring(0, 2);
                                predmet = predmet.substring(3, predmet.length);
                            }
                            if (predmet.substring(predmet.length - 2, predmet.length) == " D") {
                                predmet = predmet.substring(0, predmet.length - 2);
                                ura = ""; termin = "";
                                currentCol += 1; currentLine = 1;
                            } else {
                                currentLine += 1;
                            }
                        } else {
                            currentLine += 1;
                        }
                        break;
                    case 2:
                        termin = lineStr;
                        currentCol += 1; currentLine = 1;
                        break;
                }
                break;
            case 3: //---- VSEBINA / UČITELJ
                switch (currentLine) {
                    case 1:
                        vsebina = lineStr;
                        currentLine += 1;
                        break;
                    case 2:
                        ucitelj = lineStr;
                        if (ucitelj.substring(0, 2) == "- ") {
                            ucitelj = ucitelj.substring(2, ucitelj.length);
                        }
                        currentCol += 1; currentLine = 1;
                        break;
                }
                break;
            case 4: //---- STATUS
                currentCol += 1; currentLine = 1;
                break;
            case 5: //---- OBVESTILO
                currentCol += 1; currentLine = 1;
                break;
            case 6: //---- MOŽNOSTI
                currentLine += 1;
                if (currentLine > 2) {
                    haveDataLine = true;
                    currentCol = 1; currentLine = 1;
                }
                break;
        }
        
        pos = pos1 + 1;
        
        if (haveDataLine) {
            //--- imamo vse podatke zapisa - shrani jih v strukture
            eA_data_newLineData(tip, ucitelj, predmet, datum, ura, termin, vsebina)
            //----- priprava struktur na naslednji zapis
            tip = ""; ucitelj = ""; predmet = ""; danDatum = ""; datum = ""; ura = ""; termin = ""; vsebina = "";
            haveDataLine = false;
        }

    }

    loadStatus = nrDataLines.toString();
    
    console.log("     parsed ... " + "zapisov: " + nrDataLines.toString());

}

function cutToFirst(str, char) {
    const i = str.indexOf(char);
    return i === -1 ? str : str.slice(i + 1);
}

function lf_getDatumFromDanDatum(danDatum) {
    //---- iz stringa "Sreda, 11. 3." dobimo "11.3."
    let datum = cutToFirst(danDatum, " ");
    datum = datum.replace(/ /g, ""); // to je samo za presledke, če hočeš za vse specialne znake potem str.replace(/\s+/g, "")
    return datum;

};

function eA_data_newLineData(tip, ucitelj, predmet, datum, ura, termin, vsebina) {

    //--- imamo vse podatke zapisa - shrani jih v strukture
    nrDataLines += 1;
    //----
    arrTip[nrDataLines] = tip;
    arrUcitelj[nrDataLines] = ucitelj;
    arrPredmet[nrDataLines] = predmet;
    arrDatum[nrDataLines] = datum;
    arrUra[nrDataLines] = ura;
    arrTermin[nrDataLines] = termin;
    arrVsebina[nrDataLines] = vsebina;

    //---- 31.3.2026 štejem posamezne tipe zapisov
    switch (tip) {
        case "pohvala":
            nrPohvala += 1;
            break;
        case "potrebna izbolj" + scSchLow + "ava":
            nrPotrebnaIzboljsava += 1;
            break;
        case "komentar":
            nrKomentar += 1;
            break;
        default:
            break;
    }
    
    //---- izpis novega zapisa v konzolo
    textOut = ucitelj + " : " + tip + " : " + datum + " : " + predmet;
    if (ura != "") { textOut += " " + ura + " " + termin };
    textOut += " : " + vsebina;
    console.log(textOut);
    
}

function eA_data_output() {

    let i;

    if (nrDataLines <= 0) {
        alert("Ni zapisov. Najprej jih skopiraj v eAsistentu in jih s klikom na zgornji gumb preberi v tole aplikacijo!")
        return;
    }
    
    let textOutClipboard = "";
    let nrLinesOut = 0;

    for (i = 1; i <= nrDataLines; i++) {
        
        //---- Filtriranje zapisov
        if (!gl_usePohvala && arrTip[i] == "pohvala") { continue };
        if (!gl_usePotrebnaIzboljsava && arrTip[i] == "potrebna izbolj" + scSchLow + "ava") { continue }
        if (!gl_useKomentar && arrTip[i] == "komentar") { continue }
        if (gl_useUcitelj && arrUcitelj[i] != gl_useUciteljStr) { continue }
        if (gl_usePredmet && arrPredmet[i] != gl_usePredmetStr) { continue }
        
        //---- Zapis bo v izpisu - Formatiranje izpisa
        if (nrDataLines > 1) { textOutClipboard += "\n" };
        if (gl_includeTip) { textOutClipboard += arrTip[i] + gl_separator };
        if (gl_includeUcitelj) { textOutClipboard += arrUcitelj[i] + gl_separator };
        if (gl_includePredmet) { textOutClipboard += arrPredmet[i] + gl_separator };
        if (gl_includeDatum) { textOutClipboard += arrDatum[i] + gl_separator };
        if (gl_includeUra) { textOutClipboard += arrUra[i] + gl_separator };
        if (gl_includeTermin) { textOutClipboard += arrTermin[i] + gl_separator };
        textOutClipboard += arrVsebina[i];
        nrLinesOut += 1;

    }

    copyStatus = nrLinesOut.toString();

    if (textOutClipboard != "") {
        navigator.clipboard.writeText(textOutClipboard);
    } else {
        alert("Ni zapisov, ki bi ustrezali izbranim kriterijem filtriranja. Spremeni kriterije in poskusi znova.")
    }

}
