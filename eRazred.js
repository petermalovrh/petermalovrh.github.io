//===========================================
//                                          =
//        ##1  __COMMON                     =
//                                          =
//===========================================

//------------------------------------
//---- pričetek razvoja 17.1.2025
const gl_versionNr = "v1.15"
const gl_versionDate = "6.2.2025"
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
    showToolTip() { // 10.1.2025
        //---- toolTip
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

const ucenecIme = []; // new Array(nrPlaces)
const ucenecPriimek = [];
const ucenecSpol = [];
const ucenecRazredId = [];
var lo_nrUcencev = 0;
var lo_ucenec;

const razredIme = [];
const razredLetnik = [];
const razredCrka = [];
var lo_nrRazredov = 0;
var lo_razred;

// 25.1.2025
const razredGen = [];
var lo_nrRazredGen = 0;
var lo_razredGen;

const predmetIme = [];
const predmetKratica = [];
var lo_nrPredmetov = 0;
var lo_predmet;
var lo_havePredmetInHeader = false;
var lo_allPredmet = false; // 1.2.2025

// 28.1.2025
const katalogPredmetovIme = [];
const katalogPredmetovKratica3 = [];
const katalogPredmetovKratica1 = [];
var lo_nrKatalogPredmetov = 0;

const letnikStr = [];
var lo_nrLetnikov = 0;
var lo_letnik;

var lo_nrPredmetPisnihTestov = []; // max številka pisnega testa znotraj posameznega predmeta
var lo_pisniTestNr = 1; // 26.1.2025

const rsltColor = ["darkBlue", "darkRed", "darkOrchid", "darkSlateGray", "darkGoldenrod", "darkGreen", "maroon", "purple", "darkCyan", "peru"];

const ocenaCifra = [];
const ocenaCifraNr = [];
const ocenaUcenecId = [];
const ocenaRazredId = [];
const ocenaPredmetId = [];
const ocenaLetnikId = [];
const ocenaDatumStr = [];    // "14-10-2024"
const ocenaDatumMs = [];     // 1.2.2025 v številčne milisekunde pretvorjen datum oziroma razlika v ms od 1.1.1970 (to je JS base datum)
const ocenaTip = [];         // "U" (ustna) ali "P1" (pisna prvi test), "P2" pisna drugi test ...
const ocenaTipTip = [];      // "U" (ustna) ali "P" (pisna)
const ocenaTipSerialNr = []; // "P1" pomeni prvi pisni test
const ocenaTock = [];        // "P1" pomeni prvi pisni test
const ocenaMaxTock = [];     // "P1" pomeni prvi pisni test
var lo_nrOcen = 0;
var lo_ocena;

const colorOcena = [];
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

var nrOcen = [];
var avgOcena = [];
var avgTock = [];
var avgPercent = [];
var maxTock = [];
var lowTock = [];
var topTock = [];
//---- 23.1.2025
var arrRazredArrOceneArrRezultatiImePriimek = [];
var arrRazredArrOceneArrRezultatiRazred = []; // 25.1.2025
var arrRazredArrOceneArrRezultatiTock = [];
var arrRazredArrOceneArrRezultatiPercent = [];
var arrRazredArrOceneArrRezultatiOcenaIdVRazredu = []; // 24.1.2025
//----
var arrOcene = [];
var arrOcenePercent = [];
var arrArrOceneCount = [];
var arrArrOceneCountPercent = [];
var arrMaxOcenaCount = [];
var maxOcenaCount = 0;
var arrArrRezultatiImePriimek = []; // 21.1.2025
var arrArrRezultatiRazred = []; // 25.1.2025
var arrArrRezultatiTock = [];       // 21.1.2025
var arrArrRezultatiPercent = [];    // 21.1.2025
var arrArrRezultatiOcena = [];      // 22.1.2025
var arrKriteriji = [50, 63, 76, 90];
var arrQ1 = []; // 21.1.2025
var arrQ2 = []; // 21.1.2025
var arrQ3 = []; // 21.1.2025

//---- 31.1.2025
var ucenecOcenaId = [];        // polje linkov na ocene za vsakega učenca posebej
var ucenecRollAvg = [];        // tekoče povprečje za do tedaj nabrane ocene. Iz tega se bo potem risal graf sprotnega spreminjanja dotedanjega povprečja 1.2.2025
var ucenecAvgOcena = [];  
var ucenecNrOcen = [];  
var ucenecPrvaOcenaDatum = [];
var ucenecZadnjaOcenaDatum = [];  
//----
var ucenciPrvaOcenaDatum = 1e15;
var ucenciZadnjaOcenaDatum = 0;
var ucenciOceneRazponDni = 0;
//----
var ucenecPredmetOcenaId = []; // polje linkov na ocene za vsakega učenca posebej pri vsakem predmetu posebej
var ucenecPredmetRollAvg = []; // tekoče povprečje za do tedaj nabrane ocene pri posameznempredmetu. Iz tega se bo potem risal graf sprotnega spreminjanja dotedanjega povprečja 1.2.2025
var ucenecPredmetAvgOcena = [];
var ucenecPredmetNrOcen = [];
//----
var razredNrUcencev = []; // 1.2.2025
var razredUcenecId = [];  // 1.2.2025

const cv_schrink_min = 0;
const cv_schrink_max = 5;
var lo_schrink = 1;

var lo_zaokrozujNaCeleProcente = true;
var addKritPercent = 0;

var lo_byRazredGen = false;  true; // 25.1.2025

var drawCommonChartTitle = true; // 26.1.2025
var drawBarChart = true;
var drawPieChart = true;
var drawSpChart = true;

//---- 22.1.2025
var spChartX = [];
var spChartY = [];
var spChartW = [];
var spChartH = [];
var spChartX1 = [];
var spChartY1 = [];
var spChartKy = [];
var spChartKyp = [];
//var spChartSelected = [];
var lo_spChartSelectedId = 0;
var lo_testSelected = 0;

//---- 23.1.2025
var pcChartCx = [];
var pcChartCy = [];
var pcChartFi = [];
var pcChartRadij = [];
//var pcChartSelected = [];
var lo_pcChartSelectedId = 0;
var lo_ocenaSelected = 0;

//---- 24.1.2025
var bcChartX = [];
var bcChartY = [];
var bcChartX1 = [];
var bcChartY1 = [];
var lo_bcChartSelectedId = 0;

//---- 31.1.2025
var ucChartX = [];
var ucChartY = [];
var ucChartX1 = [];
var ucChartY1 = [];
var ucChartX0 = [];
var ucChartY0 = [];
var ucChartKx = [];
var ucChartKy = [];
var lo_ucChartSelectedId = 0;
var lo_focusUcenec = 0; // 1.2.2025

var lo_enabledHelp = true;       // 10.1.2025
var lo_enabledMode = true;       // 2.2.2025
var lo_enabledPredmet = true;    // 28.1.2025
var lo_enabledTest = true;       // 27.1.2025
var lo_enabledRazred = true;     // 27.1.2025
var lo_enabledSPData = true;     // 27.1.2025
var lo_enabledKritLuknje = true; // 27.1.2025
var lo_enabledLoad = true;       // 27.1.2025

const cv_printLevelMax = 7;
const cv_printLevelMin = 0;
var lo_printLevel = cv_printLevelMax; //5-vse, 4-manjka checkBox, 3-manjkajo še grafične točke, 2-manjkajo še posivitve tabele, 1-manjkajo še črte vmes, 0-samo vrstični izpis točkovnika

// ---- 27.1.2025
var lo_toolbarStartPeriod = true;
var lo_showToolbar = true;
var tmToolbarStartPeriod;

console.clear;

//===========================================
//                                          =
//        ##3  __DATA                       =
//                                          =
//===========================================

var demoText = [];
load_demoText5();

function addDemoText(vp_textLine) {

    let arrLen = demoText.length;
    demoText[arrLen] = vp_textLine;

}
    


//===========================================
//                                          =
//        ##4  __MAIN                       =
//                                          =
//===========================================

var gl_configChanged = true; // 19.12.2023
var dbg = false; //true;

//---- mode aplikacije
const cv_mode_razredTest = 1;
const cv_mode_ucenec = 2;
const cv_minMode = 1;
const cv_maxMode = 2;
var gl_mode = cv_mode_razredTest;
var gl_modeLast = gl_mode; 
                   

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
const focusedColor = "lightYellow";

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
        //var checkBoxRealLens = new checkBox(gpLeft + 194, gpTop - 8, 18, 2, 2, "Realna le" + scTchLow + "a", "gray", "normal 10pt verdana", 4, "right-middle", lo_showRealLens, "gray", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Prikaz realne le" + scTchLow + "e", "E");  //String.fromCharCode(0x0110));
        var buttonMode = new button(gpLeft, gpTop + 10, wBtn, hBtn, "M", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "salmon", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Naslednji pogled ...", "M");
        var buttonPredmet = new button(gpLeft, gpTop + 10, wBtn, hBtn, "P", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "white", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Naslednji predmet ...", "P");
        var buttonTest = new button(gpLeft, gpTop + 10, wBtn, hBtn, "T", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "white", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Naslednji test ...", "T");
        var buttonRazred = new button(gpLeft, gpTop + 10, wBtn, hBtn, "R", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "white", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Skupen/lo" + scTchLow + "en pogled po razredih", "R");
        var buttonSPData = new button(gpLeft, gpTop + 10, wBtn, hBtn, "S", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "white", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Pove" + scTchLow + "an/pomanj" + scSchLow + "an graf razpr" + scSchLow + "enosti podatkov", "S (+SHIFT)");
        var buttonKritLuknje = new button(gpLeft, gpTop + 10, wBtn, hBtn, "C", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "white", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Prika" + scZhLow + "i luknje v kriterijih ocen", "C");
        var buttonLoad = new button(gpLeft, gpTop + 10, wBtn, hBtn, "D", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "powderBlue", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Nalo" + scZhLow + "i skopirane podatke razredov in ocen iz clipboard-a ...", "D");
        var buttonHelp = new button(gpLeft, gpTop + 10, wBtn, hBtn, "?", "10pt verdana", "darkSlateGray", "black", 1, "gray", "darkSlateGray", "lightGoldenrodYellow", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true, "Prika" + scZhLow + "i pomo" + scTchLow, "F2");
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
    lf_getCommandLineParams(); 
    
    //console.log("main():")
    //lf_focusCanvas(); // ne deluje!!! 30.1.2023 v1.6 ... ostaja torej problem, da je na začetku focus na address bar-u namesto na canvas DOM objektu. Ampak izgleda je problem samo v debug mode v VCCode!
   
    resizeCanvas();

    //initGraphicalEnvironment();

    //let a;
    //let clipText = navigator.clipboard.readText(a);

    // Read text from the clipboard, or "paste"
    //let clipText;
    //navigator.clipboard.readText()
    //    .then((text) => {
    //        console.log('clipboard contents', clipText)
    //    })
    
    demo_load();
    paint();
    
    if (lo_showHelpTips) { // 3.1.2025
        lo_initHelpTips = true;
        tmHideTipsId = setTimeout(tmHideTips_tick, 5000); //po 5 sekundah naj se tipsi sami postopoma ugasnejo
    }
    
    tmToolbarStartPeriod = setTimeout(tmToolbarStartPeriod_tick, 30000); //po 10 sekundah naj se toolbar sam skrije. Prikazal se bo potem spet, ko se mu boš približal z miško

    tmMouseOutOfWindowId = setInterval(tmMouseOutOfWindow_tick, 500); //na pol sekunde čekiram, če je miška izven okna
    
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

    if (lo_showHelpTips && lo_initHelpTips) { lf_changeShowHelpTips(false, true); }; // 3.1.2025

    //---- prikaži pomoč 10.1.2025
    if (!vl_end && lo_showGUI && lo_enabledHelp) {
        if (buttonHelp.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            lf_changeShowHelpTips(!lo_showHelpTips, true);
            vl_end = true
        }
    }

    //---- preklop mode 2.2.2025
    if (!vl_end && lo_showGUI && lo_enabledMode) {
        if (buttonMode.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            lo_focusUcenec = 0; // 4.2.2025
            if (e.shiftKey) { // 26.1.2025
                lf_changeMode(gl_mode - 1, true); // 2.2.2025
            } else {
                lf_changeMode(gl_mode + 1, true); // 2.2.2025
            }
            vl_end = true
        }
    }

    //---- preklop na naslednji predmet 28.1.2025
    if (!vl_end && lo_showGUI && lo_enabledPredmet) {
        if (buttonPredmet.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            if (e.shiftKey) { // 26.1.2025
                lf_changePredmet(lo_predmet - 1, false); // 26.1.2025
            } else {
                lf_changePredmet(lo_predmet + 1, false); // 26.1.2025
            }
            switch (gl_mode) {
                case cv_mode_razredTest:
                    data_prepareStructures_byRazredTest();                   
                    break;
                case cv_mode_ucenec:
                    lo_focusUcenec = 0; // 4.2.2025
                    break;                
            }
            paint();
            vl_end = true
        }
    };

    //---- analiza naslednjega testa 27.1.2025
    if (!vl_end && lo_showGUI && lo_enabledTest) {
        if (buttonTest.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            if (e.shiftKey) { // 26.1.2025
                lf_changePisniTestNr(lo_pisniTestNr - 1, false); // 26.1.2025
            } else {
                lf_changePisniTestNr(lo_pisniTestNr + 1, false); // 26.1.2025
            }
            switch (gl_mode) {
                case cv_mode_razredTest:
                    data_prepareStructures_byRazredTest();                   
                    break;
                case cv_mode_ucenec:
                    lo_focusUcenec = 0; // 4.2.2025
                    break;                
            }              
            paint();
            vl_end = true
        }
    }

    //---- ločen/skupen pregled po razredih 27.1.2025
    if (!vl_end && lo_showGUI && lo_enabledRazred) {
        if (buttonRazred.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            switch (gl_mode) {
                case cv_mode_razredTest:
                    lf_changeByRazredGen(!lo_byRazredGen, false); // 25.1.2025
                    data_prepareStructures_byRazredTest();
                    paint();                    
                    break;
                case cv_mode_ucenec:
                    if (e.shiftKey) { lf_changeRazred(lo_razred - 1, true); }
                    else { lf_changeRazred(lo_razred + 1, true); };
                    lo_focusUcenec = 0; // 4.2.2025
                    break;
            };            
            vl_end = true
        }
    }
    
    //---- Zoom scatter plot charta za analizo podatkov testa 27.1.2025
    if (!vl_end && lo_showGUI && lo_enabledSPData) {
        if (buttonSPData.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            if (e.shiftKey) {
                lf_changeSchrink(lo_schrink - 1, true);
            } else {
                lf_changeSchrink(lo_schrink + 1, true);
            }
            vl_end = true
        }
    }
    
    //---- prikaz lukenj med kriteriji ocen 27.1.2025
    if (!vl_end && lo_showGUI && lo_enabledKritLuknje) {
        if (buttonKritLuknje.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            lf_changeZaokrozujNaCeleProcente(!lo_zaokrozujNaCeleProcente, true);
            vl_end = true
        }
    }

    //---- naloži podatke razredov in ocen iz clipboard-a 27.1.2025
    if (!vl_end && lo_showGUI && lo_enabledLoad) {
        if (buttonLoad.eventClick(e.offsetX, e.offsetY)) {
            //console.log("click(): rslt=" + rslt.toString())
            lo_focusUcenec = 0; // 4.2.2025
            clipboard_load();
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
    if (lo_showGUI) {
        if (lo_showToolbar) {
            if (buttonHelp.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonMode.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonPredmet.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonTest.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonRazred.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonSPData.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonKritLuknje.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            else if (buttonLoad.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
            //} else if (intChooserA.eventMouseOverIncreaseDecrease(e.offsetX, e.offsetY, false)) {
            //    document.body.style.cursor = "pointer"              
            else { document.body.style.cursor = "default" };
        }
    } else { document.body.style.cursor = "default" };
    
    //če se miška v resnici ni premaknila ne naredim nič
    if (e.offsetX == lo_mouseMoveX && e.offsetY == lo_mouseMoveY) {
        //console.log("mouse_no_move")
        return;
    }

    //Miška se je zares premaknila
    //console.log("mouse_move_beforeExecute")
    lo_mouseMoveX = e.offsetX
    lo_mouseMoveY = e.offsetY
    //console.log(e.offsetX + "-" + e.offsetY)

    //---- če je toolbar skrit, in je z miško prišel v bližino (ali pa na levi rob ekrana), potem naj se toolbar prikaže
    //     če pa je toolbar prikazan, se preveri, ali je miška šla daleč stran in v tem primeru se ga skrije
    const dist = 100;
    if (lo_mouseMoveX < 20 ||
        mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, buttonRazred.left - dist, buttonRazred.top - dist, buttonHelp.left + buttonHelp.width + 1.5 * dist, buttonHelp.top + buttonHelp.height + dist)) {
        lo_showToolbar = true;
    } else {
        if (!lo_toolbarStartPeriod) { lo_showToolbar = false; }
    };

    //---- Preverjanje, ali je z miško nad določenim elementom 
    //let oldSpChartSelected = spChartSelected.slice(0);
    let oldSpChartSelectedId = lo_spChartSelectedId;
    let oldTestSelected = lo_testSelected;
    let oldPcChartSelectedId = lo_pcChartSelectedId; // 23.1.2025
    let oldBcChartSelectedId = lo_bcChartSelectedId; // 24.1.2025
    let oldOcenaSelected = lo_ocenaSelected;
    let chartSelected = false;
    lo_spChartSelectedId = 0; lo_pcChartSelectedId = 0; lo_bcChartSelectedId = 0;
    let x, y;
    let razredId, tmpTest, tmpOcena, fiMouse, tmpItemId;
    //---- Smo z miško nad katerim od chartov za podatkovno analizo?
    let nrItems = lo_nrRazredov; if (lo_byRazredGen) { nrItems = lo_nrRazredGen };
    for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
        // ---- Smo z miško nad katerim od raztresenih chartov za podatkovno analizo?
        if (nrOcen[tmpItemId] && mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, spChartX[tmpItemId], spChartY[tmpItemId], spChartX1[tmpItemId], spChartY1[tmpItemId])) {
            chartSelected = true;
            lo_spChartSelectedId = tmpItemId;
            // ---- Je pod miško kateri od testov v scatter plot chartu?
            lo_testSelected = 0;
            for (tmpTest = 1; tmpTest <= (arrArrRezultatiTock[tmpItemId].length - 1); tmpTest++) {
                x = Math.round(spChartX[tmpItemId] + tmpTest);
                y = Math.round(spChartY1[tmpItemId] - spChartKy[tmpItemId] * arrArrRezultatiTock[tmpItemId][tmpTest]);
                if (x == lo_mouseMoveX && y == lo_mouseMoveY) {
                    lo_testSelected = tmpTest;
                    break;
                }
            }
            if (lo_testSelected <= 0) {
                for (tmpTest = 1; tmpTest <= (arrArrRezultatiTock[tmpItemId].length - 1); tmpTest++) {
                    x = Math.round(spChartX[tmpItemId] + tmpTest);
                    y = Math.round(spChartY1[tmpItemId] - spChartKy[tmpItemId] * arrArrRezultatiTock[tmpItemId][tmpTest]);
                    if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, x-1, y-1, x+1, y+1)) {
                        lo_testSelected = tmpTest;
                        break;
                    }
                }
            }
            if (lo_testSelected <= 0) {
                for (tmpTest = 1; tmpTest <= (arrArrRezultatiTock[tmpItemId].length - 1); tmpTest++) {
                    x = Math.round(spChartX[tmpItemId] + tmpTest);
                    y = Math.round(spChartY1[tmpItemId] - spChartKy[tmpItemId] * arrArrRezultatiTock[tmpItemId][tmpTest]);
                    if (mouseInsideCircle(lo_mouseMoveX, lo_mouseMoveY, x, y, 12)) {
                        lo_testSelected = tmpTest;
                        break;
                    }
                }
            }
            break; // ven iz pregledovanja selektiranosti chartov, ker selektiran char že imamo in znotraj morda že tudi selektiran test in s tem učenca
        }
        // ---- Je pod miško katera od ocen v bar chartih? 24.1.2025
        if (drawBarChart) { 
            for (tmpOcena = 1; tmpOcena <= 5; tmpOcena++) {
                if (nrOcen[tmpItemId] && mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, bcChartX[tmpItemId][tmpOcena], bcChartY[tmpItemId][tmpOcena], bcChartX1[tmpItemId][tmpOcena], bcChartY1[tmpItemId][tmpOcena])) {
                    chartSelected = true;
                    lo_bcChartSelectedId = tmpItemId; // miška je nad tem razredom
                    lo_ocenaSelected = tmpOcena;     // miška je nad barom te ocene
                    break; // ven iz pregledovanja selektiranosti chartov/ocen, ker selekcijo že imamo
                } 
            }
        }
        // ---- Je pod miško katera od ocen v pie chartu? 23.1.2025
        if (drawPieChart) {
            if (nrOcen[tmpItemId] && mouseInsideCircle(lo_mouseMoveX, lo_mouseMoveY, pcChartCx[tmpItemId], pcChartCy[tmpItemId], pcChartRadij[tmpItemId])) {
                chartSelected = true;
                //pcChartSelected[tmpItemId] = true;
                lo_pcChartSelectedId = tmpItemId;  // miška je nad tem razredom
                // ---- Katera ocena je pod miško?
                lo_ocenaSelected = 0;
                fiMouse = Math.atan((pcChartCy[tmpItemId] - lo_mouseMoveY) / (lo_mouseMoveX - pcChartCx[tmpItemId]));
                if (lo_mouseMoveX < pcChartCx[tmpItemId]) { fiMouse += Math.PI; }
                else if (fiMouse < 0) { fiMouse += 2 * Math.PI; }
                for (tmpOcena = 1; tmpOcena <= 5; tmpOcena++) {
                    if (valueBetween(fiMouse, pcChartFi[tmpItemId][tmpOcena - 1], pcChartFi[tmpItemId][tmpOcena])) {
                        lo_ocenaSelected = tmpOcena; // miška je nad pie kosom te ocene
                        break;
                    }
                }
                break; // ven iz pregledovanja selektiranosti chartov, ker selektiran char že imamo in znotraj morda že tudi selektiran test in s tem učenca
            }     
        }
    };
    // če se je karkoli v zvezi s selektiranostjo chartov in učencev spremenilo, potem sledi repaint
    if (!(lo_spChartSelectedId == oldSpChartSelectedId && lo_testSelected == oldTestSelected)) { paint_delay(); return; }   // 22.1.2025
    if (!(lo_pcChartSelectedId == oldPcChartSelectedId && lo_ocenaSelected == oldOcenaSelected)) { paint_delay(); return; } // 23.1.2025
    if (!(lo_bcChartSelectedId == oldBcChartSelectedId && lo_ocenaSelected == oldOcenaSelected)) { paint_delay(); return; } // 24.1.2025

    // če ni spremembe, chart pa je selected, potem ne gledam drugih stvari glede selektiranosti in nič ne rišem ker ni potrebe (->return())
    if (lo_spChartSelectedId > 0) { return }; // 22.1.2025
    if (lo_pcChartSelectedId > 0) { return }; // 23.1.2025
    if (lo_bcChartSelectedId > 0) { return }; // 24.1.2025

    // noben chart in noben učenec nista selektirana -> treba je pogledati, ali je selektirano karkoli drugega ...

    // tudi nič drugega ni selektiranega, zato izhod brez potrebe po ponovnem risanju!

    //// poleg prej preverjenega, kjer je lahko hkrati selektirana samo ena zadeva, je lahko paralelno selektiran tudi center krivine leče
    //if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, lo_gxLecaCenterL - 30, lo_gyO - 30, lo_gxLecaCenterL + 30, lo_gyO + 30)) { lo_selectedCenterKrivineLece = true; }
    //else if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, lo_gxLecaCenterD - 30, lo_gyO - 30, lo_gxLecaCenterD + 30, lo_gyO + 30)) { lo_selectedCenterKrivineLece = true; }

    //if (lo_mouseDown && oldSelectedVrhLece) { lo_selectedVrhLece = true; } // ne glede na to, kje z miško vlečem, naj kar ostane selektiran
    //else if (lo_mouseDown && oldSelectedTemeLece) { lo_selectedTemeLece = true; }; // ne glede na to, kje z miško vlečem, naj kar ostane selektiran

    paint_delay() //da na oseh označi koordinate miške
    //console.log("mouse_move exit")
    
});

//window.addEventListener("wheel", event, (passive = true) => {
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    let newValue, change, maxDiff;
    
    if (gl_mode == cv_mode_ucenec) {
        change = event.shiftKey ? delta : -delta;
        newValue = lf_changeValueFocusUcenec(change);
        gl_changeByMouseWheel_ucenecChart = true; // 4.2.2024
        lf_changeFocusUcenec(newValue, true);
        //}
        return; //konec prverjanja, ker je s pritisnjeno tipko X povedal, da hoče točno to in nič drugega
    };

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
        case 'KeyS':
            //lo_keyDownS = true; break;
            //console.log("S pressed");
            if (event.shiftKey) {
                lf_changeSchrink(lo_schrink - 1, true);
            } else {
                lf_changeSchrink(lo_schrink + 1, true);
            }
            break;
        case 'KeyC':
            //lo_keyDownC = true; break;
            //console.log("C pressed");
            lf_changeZaokrozujNaCeleProcente(!lo_zaokrozujNaCeleProcente, true);
            break;
        case 'ShiftLeft':
            lo_keyDownShiftLeft = true; break;  //console.log(lo_keyDownShiftLeft); break;
        case 'ControlLeft':
            // CTRL+mouseWheel = ZOOM v browserju !!!
            lo_keyDownControlLeft = true; break;  //console.log(lo_keyDownShiftLeft); break;        
        case 'KeyX':
            lo_keyDownX = true; break;
        case 'KeyM':
            //lo_keyDownM = true; break;
            //console.log("M pressed");
            if (event.shiftKey) { lf_changeMode(gl_mode + 1, true); }
            else { lf_changeMode(gl_mode - 1, true); }
            break;
        case 'KeyR':
            //lo_keyDownR = true; break;
            //console.log("R pressed");
            switch (gl_mode) {
                case cv_mode_razredTest:
                    lf_changeByRazredGen(!lo_byRazredGen, false); // 25.1.2025
                    data_prepareStructures_byRazredTest();
                    paint();                    
                    break;
                case cv_mode_ucenec:
                    lo_focusUcenec = 0; // 4.2.2025
                    if(event.shiftKey) { lf_changeRazred(lo_razred - 1, true); }
                    else { lf_changeRazred(lo_razred + 1, true); };
                    break;
            };
            break;
        case 'KeyP': // sprememba predmeta 28.1.2025
            //console.log("T pressed");
            if (event.shiftKey) { // 26.1.2025
                lf_changePredmet(lo_predmet - 1, false); // 26.1.2025
            } else {
                lf_changePredmet(lo_predmet + 1, false); // 26.1.2025
            }
            switch (gl_mode) {
                case cv_mode_razredTest:
                    data_prepareStructures_byRazredTest();                   
                    break;
                case cv_mode_ucenec:
                    break;                
            }            
            paint();
            break;
        case 'KeyT': // sprememba zaporedne številke testa pri istem predmetu
            //console.log("T pressed");
            if (event.shiftKey) { // 26.1.2025
                lf_changePisniTestNr(lo_pisniTestNr - 1, false); // 26.1.2025
            } else {
                lf_changePisniTestNr(lo_pisniTestNr + 1, false); // 26.1.2025
            }
            switch (gl_mode) {
                case cv_mode_razredTest:
                    data_prepareStructures_byRazredTest();                   
                    break;
                case cv_mode_ucenec:
                    break;                
            }              
            paint();
            break;
        case 'KeyB':
            //console.log("F7 pressed");
            if (lo_P == 27) {
                lf_changeDebug(!dbg, true);
            }
            break;
        case 'KeyF':
            lf_changeFocusUcenecOnOff(true);
            break;
        case 'KeyU':
            lo_keyDownU = true; break;
        case 'KeyD':
            // Read text from the clipboard, or "paste"
            lo_focusUcenec = 0; // 4.2.2025
            clipboard_load();
            break;
        case 'KeyW':
            //lo_keyDownW = true; break;
            //paint_realenLom();
            lo_realniLom = !lo_realniLom;
            paint();
            break;
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
            lo_showGUI = !lo_showGUI; lo_GUIlayoutHasChanged = true; paint(); paint(); break;
        case 'KeyN': case 'F2':
            lf_changeShowHelpTips(!lo_showHelpTips, true); break;
        case 'KeyI':
            lf_changeShowToolTips(!lo_showToolTips, true); break;
        case 'KeyY': case 'KeyZ': //24.10.2023
        //console.log("Y pressed");
        //lf_changeSameScaleY(!gl_sameScaleY, true); break;
        //case 'KeyC': //1.4.2024
        //    //console.log("W pressed");
        //    if (lo_tockovnik !== "") { navigator.clipboard.writeText(lo_tockovnik) }; break;
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
    
    let change, newValue;

    switch (event.code) {
        case 'KeyA':
            lo_keyDownA = false;
            // 1.4.2024 Ali spreminja vrednost lo_f samo s pomočjo tipke A brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_A) {
                // 21.12.2023 tole je primer spreminjanja lo_printLevel samo s pomočjo tipke T  // obratno: že med vrtenjem koleščka smo spreminjali vrednost lo_printLevel
                //console.log("UP: process keyPress(T)");
                change = lo_aStep;
                if (lo_keyDownControlLeft) { change = 5 };  // CTRL poveča korak na 5 ... CTRL+T je v browserju odpiranje novega zavihka!!! Tako da povečanje koraka mi s CTRL ne dela
                if (lo_keyDownShiftLeft) { change *= -1 };  // SHIFT obrne smer
                newValue = lf_changeValueA(-change);
                lf_changeA(newValue, false);
            }
            lo_selectedA = false;
            paint();
            gl_changeByMouseWheel_A = false;
            //console.log("UP: false"); console.log("----");
            break;
        case 'Digit0':
            lo_keyDownDigit0 = false;
            // 1.4.2024 Ali spreminja vrednost lo_n samo s pomočjo tipke 0 brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_N) {
                // 21.12.2023 tole je primer spreminjanja lo_printLevel samo s pomočjo tipke T  // obratno: Če med vrtenjem koleščka smo spreminjali vrednost lo_printLevel
                //console.log("UP: process keyPress(T)");
                change = lo_nStep;
                if (lo_keyDownControlLeft) { change = 5 };  // CTRL poveča korak na 5 ... CTRL+T je v browserju odpiranje novega zavihka!!! Tako da povečanje koraka mi s CTRL ne dela
                if (lo_keyDownShiftLeft) { change *= -1 };  // SHIFT obrne smer
                newValue = lf_changeValueN(-change);
                lf_changeN(newValue, false);
            }
            lo_selectedLeca = false;
            paint();
            gl_changeByMouseWheel_N = false;
            //console.log("UP: false"); console.log("----");
            break;
        //case 'KeyX':
        //    lo_keyDownX = false;
        //    // 1.4.2024 Ali spreminja vrednost lo_xNrF samo s pomočjo tipke X brez vrtenja koleščka miške?
        //    if (!gl_changeByMouseWheel_ucenecChart) {
        //        // 21.12.2023 tole je primer spreminjanja lo_xNrF samo s pomočjo tipke X  // obratno: že med vrtenjem koleščka smo spreminjali vrednost lo_xNrF
        //        //console.log("UP: process keyPress(X)");
        //        change = lo_stepXnrF;
        //        if (lo_keyDownControlLeft) { change = 5 };  // CTRL poveča korak na 5 ... CTRL+T je v browserju odpiranje novega zavihka!!! Tako da povečanje koraka mi s CTRL ne dela
        //        if (lo_keyDownShiftLeft) { change *= -1 };  // SHIFT obrne smer
        //        newValue = lf_changeValueXnrF(-change);
        //        lf_changeXnrF(newValue, true);
        //    }
        //    gl_changeByMouseWheel_ucenecChart = false;
        //    //console.log("UP: false"); console.log("----");
        //    break;
        case 'KeyX':
            lo_keyDownX = false;
            // 1.4.2024 Ali spreminja vrednost lo_pixPerUnit samo s pomočjo tipke X brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_pixPerUnit) {
                // 21.12.2023 tole je primer spreminjanja lo_pixPerUnit samo s pomočjo tipke X  // obratno: že med vrtenjem koleščka smo spreminjali vrednost lo_pixPerUnit
                //console.log("UP: process keyPress(X)");
                change = lo_stepPixPerUnit;
                if (lo_keyDownControlLeft) { change = 5 };  // CTRL poveča korak na 5 ... CTRL+T je v browserju odpiranje novega zavihka!!! Tako da povečanje koraka mi s CTRL ne dela
                if (lo_keyDownShiftLeft) { change *= -1 };  // SHIFT obrne smer
                newValue = lf_changeValuePixPerUnit(-change);
                lf_changePixPerUnit(newValue, true);
            }
            gl_changeByMouseWheel_pixPerUnit = false;
            //console.log("UP: false"); console.log("----");
            break;
        case 'Digit2':
            lo_keyDown2 = false;
            // 1.4.2024 Ali spreminja vrednost lo_kriterij12 samo s pomočjo tipke 2 brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_kriterij12) {
                // 21.12.2023 tole je primer spreminjanja lo_kriterij12 samo s pomočjo tipke 2  // obratno: že med vrtenjem koleščka miške smo spreminjali vrednost lo_kriterij12
                //console.log("UP: process keyPress(T)");
                change = 1;
                if (lo_keyDownControlLeft) { change = 5 };  // CTRL poveča korak na 5 ... CTRL+T je v browserju odpiranje novega zavihka!!! Tako da povečanje koraka mi s CTRL ne dela
                if (lo_keyDownShiftLeft) { change *= -1 };  // SHIFT obrne smer
                newValue = lf_changeValueKriterij("12", -change);
                lf_changeKriterij("12", newValue, true);
            }
            gl_changeByMouseWheel_kriterij12 = false;
            //console.log("UP: false"); console.log("----");
            break;
        case 'KeyU':
            lo_keyDownU = false; break;
        case 'KeyD':
            lo_keyDownD = false; break;
        case 'KeyW':
            lo_keyDownW = false; break;
        case 'KeyE':
            lo_keyDownE = false; break;
        case 'ShiftLeft':
            lo_keyDownShiftLeft = false; break;  //console.log(lo_keyDownShiftLeft); break;
        case 'ControlLeft':
            // PAZI !! če daš CTRL-F, se odpre okenček za iskanje. Ko spustiš CTRL in F, dogodka letita v tisti okenček in moja aplikacija ne zazna spuščenega CTRL !!! Change tako ostane na 5 !!!
            lo_keyDownControlLeft = false; break; // console.log(lo_keyDownControlLeft); 
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

function setLensDimensions() {

    // Zaradi ZOOM-a se grafične dimenzije leče in tudi njene grafične koordinate spremenijo in jih je treba na novo postaviti
    lo_ghLece = lo_hLece * lo_pixPerUnit;
    lo_ghLeceHalf = lo_ghLece / 2;
    lo_gdLece = lo_dLece * lo_pixPerUnit;
    lo_gdLeceHalf = lo_gdLece / 2;

    lo_needToSetLensDimensionsAndPoins = false;
    
}

function setLensPoints() {

    // zaradi premikov koordinatnega sistema so se spremenile tudi koordinate robov in centrov leč, gorišč
    lo_gxLecaLeft = lo_gxO - lo_gdLeceHalf;
    lo_gxLecaRight = lo_gxO + lo_gdLeceHalf;
    lo_gyLecaTop = lo_gyO - lo_ghLeceHalf;
    lo_gyLecaBottom = lo_gyO + lo_ghLeceHalf;

    lo_needToSetLensPoins = false;
    
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
            case cv_guiLayoutA: break;
            case cv_guiLayoutB:
                paint_GUI_layoutB(); break;
        }
        lo_GUIlayoutHasChanged = false;
    }
    
    paint_eRazred();
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

function data_prepareStructures_byRazredTest() {

    lo_dataPrepared = false; // 25.1.2025

    let valid = []
    nrOcen.length = 0;
    avgOcena.length = 0;
    avgTock.length = 0;
    avgPercent.length = 0;
    maxTock.length = 0;
    lowTock.length = 0;
    topTock.length = 0;
    //---- 23.1.2025
    arrRazredArrOceneArrRezultatiImePriimek.length = 0;
    arrRazredArrOceneArrRezultatiRazred.length = 0;
    arrRazredArrOceneArrRezultatiTock.length = 0;
    arrRazredArrOceneArrRezultatiPercent.length = 0;
    arrRazredArrOceneArrRezultatiOcenaIdVRazredu.length = 0; // 24.1.2025
    //----
    arrOcene.length = 0;
    arrOcenePercent.length = 0;
    arrArrOceneCount.length = 0;
    arrArrOceneCountPercent.length = 0;
    arrMaxOcenaCount.length = 0;
    maxOcenaCount = 0;
    arrArrRezultatiImePriimek.length = 0; // 21.1.2025
    arrArrRezultatiRazred.length = 0; // 25.1.2025
    arrArrRezultatiTock.length = 0;       // 21.1.2025
    arrArrRezultatiPercent.length = 0;    // 21.1.2025
    arrArrRezultatiOcena.length = 0;      // 21.1.2025
    arrKriteriji = [50, 63, 76, 90];
    arrQ1.length = 0; // 21.1.2025
    arrQ2.length = 0; // 21.1.2025
    arrQ3.length = 0; // 21.1.2025
    //---- 31.1.2025
    ucenecOcenaId.length = 0;
    ucenecRollAvg.length = 0;
    ucenecPredmetOcenaId.length = 0;
    ucenecPredmetRollAvg.length = 0;

    //---- resetiram lastnosti grafov - potreboval jih bom za mouseOved() event
    spChartX.length = 0;
    spChartY.length = 0;
    spChartW.length = 0;
    spChartH.length = 0;
    spChartX1.length = 0;
    spChartY1.length = 0;
    spChartKy.length = 0;
    spChartKyp.length = 0;
    //spChartSelected.length = 0;
    //----
    pcChartCx.length = 0;
    pcChartCy.length = 0;
    pcChartFi.length = 0;
    pcChartRadij.length = 0;
    //pcChartSelected.length = 0;
    //----
    bcChartX.length = 0;
    bcChartY.length = 0;
    bcChartX1.length = 0;
    bcChartY1.length = 0;

    // ============ NABIRANJE PODATKOV  ============

    let tmpItemId, tmpRazredLetnikStr, tmpRazredCrka, tmpTipTestNr;
    let nrItems = lo_nrRazredov;
    if (lo_byRazredGen) { nrItems = lo_nrRazredGen };
    for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
        // za tekoči razred/generacijo razredov naberem vso statistiko na svoje mesto v polju rezultatov
        tmpRazredLetnikStr = razredLetnik[tmpItemId]; if (lo_byRazredGen) { tmpRazredLetnikStr = razredGen[tmpItemId].toString() };
        tmpRazredCrka = razredCrka[tmpItemId]; if (lo_byRazredGen) { tmpRazredCrka = "" };
        tmpTipTestNr = "P" + lo_pisniTestNr.toString();
        //----
        ;[valid[tmpItemId], nrOcen[tmpItemId], avgOcena[tmpItemId], avgTock[tmpItemId], avgPercent[tmpItemId],
        maxTock[tmpItemId], lowTock[tmpItemId], topTock[tmpItemId],
        arrRazredArrOceneArrRezultatiImePriimek[tmpItemId], arrRazredArrOceneArrRezultatiRazred[tmpItemId], arrRazredArrOceneArrRezultatiTock[tmpItemId], arrRazredArrOceneArrRezultatiPercent[tmpItemId], arrRazredArrOceneArrRezultatiOcenaIdVRazredu[tmpItemId],
        arrArrOceneCount[tmpItemId], arrArrOceneCountPercent[tmpItemId], arrMaxOcenaCount[tmpItemId],
            arrArrRezultatiImePriimek[tmpItemId], arrArrRezultatiRazred[tmpItemId], arrArrRezultatiTock[tmpItemId], arrArrRezultatiPercent[tmpItemId], arrArrRezultatiOcena[tmpItemId]]
            = calculate_avg_test("2425", predmetIme[lo_predmet], tmpRazredLetnikStr, tmpRazredCrka, tmpTipTestNr);
        // iščem največje število testov z isto oceno čez vse razrede, da bom lahko določil Y merilo za bar charte
        if (arrMaxOcenaCount[tmpItemId] > maxOcenaCount) {
            maxOcenaCount = arrMaxOcenaCount[tmpItemId];
        }
        //---- določanje kvartilov za rezultate v razredu
        [arrQ1[tmpItemId], arrQ2[tmpItemId], arrQ3[tmpItemId]] =
            calculate_kvartili(nrOcen[tmpItemId], arrArrRezultatiTock[tmpItemId]); // prvi kvartil za rezultate tega razreda
    }
    
    if (lo_nrOcen > 0 && lo_nrRazredov > 0) { // 25.1.2025
        lo_dataPrepared = true; // 25.1.2025 
    }

}

function data_prepareStructures_byUcenec() {

    lo_dataPrepared = false; // 25.1.2025
   
    //---- 31.1.2025
    ucenecOcenaId.length = 0;
    ucenecRollAvg.length = 0; // 1.2.2025
    ucenecAvgOcena.length = 0;
    ucenecNrOcen.length = 0;
    ucenecPrvaOcenaDatum.length = 0;
    ucenecZadnjaOcenaDatum.length = 0;
    //----
    ucenecPredmetOcenaId.length = 0;
    ucenecPredmetRollAvg.length = 0; // 1.2.2025
    ucenecPredmetAvgOcena.length = 0;
    ucenecPredmetNrOcen.length = 0;
    //----
    razredNrUcencev.length = 0;
    razredUcenecId.length = 0;
    // ---- 1.2.2025
    ucenciZadnjaOcenaDatum = 0;
    ucenciPrvaOcenaDatum = 1e15;
    ucenciOceneRazponDni = 0;
    
    //---- resetiram lastnosti grafov - potreboval jih bom za mouseOved() event
    ucChartX.length = 0;
    ucChartY.length = 0;
    ucChartX1.length = 0;
    ucChartY1.length = 0;
    ucChartX0.length = 0;
    ucChartY0.length = 0;
    ucChartKx.length = 0;
    ucChartKy.length = 0;
    //ucChartSelected.length = 0;

    let razredId;
    for (razredId = 1; razredId <= lo_nrRazredov; razredId++) { razredNrUcencev[razredId] = 0;  razredUcenecId[razredId] = []; };

    // ============ NABIRANJE PODATKOV  ============

    let ucenecId;
    for (ucenecId = 1; ucenecId <= lo_nrUcencev; ucenecId++) {
        // za tekočega učenca naberem vso statistiko na svoje mesto v polju rezultatov
        ;[ucenecOcenaId[ucenecId], ucenecRollAvg[ucenecId], ucenecNrOcen[ucenecId], ucenecAvgOcena[ucenecId], ucenecPrvaOcenaDatum[ucenecId], ucenecZadnjaOcenaDatum[ucenecId],
        ucenecPredmetOcenaId[ucenecId], ucenecPredmetRollAvg[ucenecId], ucenecPredmetNrOcen[ucenecId], ucenecPredmetAvgOcena[ucenecId]]
            = calculate_avg_ucenec("2425", ucenecId);
        
        // iščem prvi in zadnji datum vseh ocen skupaj, in vmes date rnge
        if (ucenecPrvaOcenaDatum[ucenecId] < ucenciPrvaOcenaDatum) {
            ucenciPrvaOcenaDatum = ucenecPrvaOcenaDatum[ucenecId];
        }
        if (ucenecZadnjaOcenaDatum[ucenecId] > ucenciZadnjaOcenaDatum) {
            ucenciZadnjaOcenaDatum = ucenecZadnjaOcenaDatum[ucenecId];
        }
    
        razredId = ucenecRazredId[ucenecId];
        razredNrUcencev[razredId] += 1;
        razredUcenecId[razredId][razredNrUcencev[razredId]] = ucenecId; // 1.2.2025
    }
    
    if (lo_nrOcen > 0 && lo_nrUcencev > 0) {
        lo_dataPrepared = true;
    }

    ucenciOceneRazponDni = ucenciZadnjaOcenaDatum - ucenciPrvaOcenaDatum;
    
};

function paint_eRazred() {
    
    //---- risanje ustreznih prikazov
    switch (gl_mode) {
        case cv_mode_razredTest:
            paint_eRazred_grafRazredTest();
            break;
        case cv_mode_ucenec:
            paint_eRazred_grafUcenec();
            break;
    }


}

function paint_eRazred_grafRazredTest() {
     
    if (!lo_dataPrepared) { return; };

    let chartMargin = 20;
    let chartGapX = 30; let chartGapY = 30;
    let nrItems = lo_nrRazredov;
    if (lo_byRazredGen) { nrItems = lo_nrRazredGen }; // 25.1.2025
    let chartWidth = (ctxW - 2 * chartMargin - (nrItems - 1) * chartGapX) / nrItems;
    let x0 = 20; let y0;
    let tmpText, w, h, colorId;
    let titleFont = "bold 18pt verdana";

    // ---- Common title panel
    drawCommonChartTitle = true;
    titlePanelHeight = 34;
    switch (lo_schrink) {
        case 5: titlePanelHeight = 0; drawCommonChartTitle = false; break;
    }
    if (drawCommonChartTitle) {
        yTitleTop = 8;
        let titlePanelLeft = x0 - 8;
        let titlePanelWidth = ctxW - 2 * chartMargin + 4;
        if (lo_showGUI) { titlePanelWidth -= 198 };
        //tmpText = "FIZIKA - 1. pisni test";
        tmpText = predmetIme[lo_predmet] + " - " + lo_pisniTestNr.toString() + ". pisni test";
        ;[w, h] = gMeasureText(tmpText, titleFont);
        gBannerRect(titlePanelLeft, yTitleTop, titlePanelLeft + titlePanelWidth, 34, 7, 7, "#F7F7F7FF", 1, "lightGray", "", 0, 0, false);
        gText(tmpText, titleFont, "darkSlateGray", titlePanelLeft + titlePanelWidth / 2 - w / 2, yTitleTop + h + 7);
    }
    
    y0 = yTitleTop + titlePanelHeight + 18;

    // ---- Za vsak razred narišem svoj panel čez celo višino ekrana
    let tmpItemId;
    for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
        gBannerRect(x0 + (tmpItemId - 1) * (chartWidth + chartGapX) - 8, y0 - 10, chartWidth + 16, ctxH - 2 * chartMargin + 15 - titlePanelHeight, 7, 7, "#F7F7F7FF", 1, "lightGray", "", 0, 0, false);
    }
    
    // ============ (1) ŠTEVILO TESTOV PO OCENAH - BAR CHARTS  ============

    drawBarChart = true;
    switch (lo_schrink) {
        case 0: chartHeight = 0.28 * ctxH - chartMargin - chartGapY / 2; break;
        case 1: chartHeight = 0.22 * ctxH - chartMargin - chartGapY / 2; break;
        case 2: chartHeight = 0.17 * ctxH - chartMargin - chartGapY / 2; break;
        case 3: chartHeight = 0.14 * ctxH - chartMargin - chartGapY / 2; break;
        case 4: case 5: chartHeight = 0; drawBarChart = false; break;
    }

    // Za vse razrede nariši graf
    if (drawBarChart) {
        for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
            // za tekoči razred ali tekočo generacijo razredov narišem graf
            if (nrOcen[tmpItemId] > 0) {
                let vl_chartTitle = razredIme[tmpItemId]; if (lo_byRazredGen) { vl_chartTitle = razredGen[tmpItemId].toString() + ". razred" };
                paint_barChart_byOcena(x0 + (tmpItemId - 1) * (chartWidth + chartGapX), y0, chartWidth, chartHeight, tmpItemId, arrArrOceneCount[tmpItemId], maxOcenaCount, vl_chartTitle);
            }
        }
    }

    // ============ (2) DELEŽ TESTOV PO OCENAH - PIE CHARTS  ============

    chartGapY = 30;
    // .... Kje bo vrh pie chartov (y1)
    y1 = y0;
    if (drawBarChart) {
        y1 += chartHeight + chartGapY; // vrh področja za pie chart graph
    }
    drawPieChart = true;
    switch (lo_schrink) {
        case 0: chartHeight = 0.32 * ctxH - chartGapY; break;
        case 1: chartHeight = 0.26 * ctxH - chartMargin - chartGapY / 2; break;
        case 2: chartHeight = 0.2 * ctxH - chartMargin - chartGapY / 2; break;
        case 3: chartHeight = 0.17 * ctxH - chartMargin - chartGapY / 2; break;
        case 4: case 5: chartHeight = 0; drawPieChart = false; break;
    }
    if (chartHeight > chartWidth) { chartHeight = chartWidth }; // 24.1.2025
    if (drawPieChart) {
        x1 = 20;
        // Za vse razrede nariši pie-chart-e
        for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
            if (nrOcen[tmpItemId] > 0) {
                // za tekoči razred narišem pie chart
                paint_pieChart_byOcenaShare(x1 + (tmpItemId - 1) * (chartWidth + chartGapX), y1, chartWidth, chartHeight, tmpItemId, arrArrOceneCount[tmpItemId], nrOcen[tmpItemId]);
            }
        }
    }

    // ============ (3) RAZPRŠENOST REZULTATOV IN POVPREČJA  ============

    chartGapY = 30;
    // .... Kje bo vrh scatter plot chartov (y2)
    let y2 = y1; // vrh področja za ta graf
    if (drawPieChart) {
        y2 += chartHeight + chartGapY; // vrh področja za scatter plot chart graph
    }
    drawSpChart = true;
    switch (lo_schrink) {
        case 0: case 1: case 2: case 3:
            chartHeight = ctxH - y2 - chartGapY / 2 - chartMargin;
            break;
        case 4: chartHeight = ctxH - 2 * chartMargin - titlePanelHeight; break;
        case 5: chartHeight = ctxH - 2 * chartMargin; break;
    }
    x1 = 20;
    // Za vse razrede nariši pie-chart-e
    for (tmpItemId = 1; tmpItemId <= nrItems; tmpItemId++) {
        // za tekoči razred narišem pie chart
        if (nrOcen[tmpItemId] > 0) {
            paint_scatterPlotChart_byRazprsenost(x1 + (tmpItemId - 1) * (chartWidth + chartGapX), y2, chartWidth, chartHeight,
                tmpItemId,
                arrArrOceneCount[tmpItemId], nrOcen[tmpItemId],
                maxTock[tmpItemId], lowTock[tmpItemId], topTock[tmpItemId],
                avgTock[tmpItemId], avgPercent[tmpItemId],
                arrArrRezultatiImePriimek[tmpItemId], arrArrRezultatiTock[tmpItemId], arrArrRezultatiPercent[tmpItemId], arrArrRezultatiOcena[tmpItemId], arrKriteriji,
                arrQ1[tmpItemId], arrQ2[tmpItemId], arrQ3[tmpItemId]);
        }
    }
    
    // ---- MOUSE OVER TIPS - SCATTER PLOT CHART 22.1.2025

    let tipFont = "bold italic 12pt verdana";
    if (lo_spChartSelectedId > 0) {
        if (lo_testSelected > 0) {
            // ---- odebeljen krogec okoli testa
            x = spChartX[lo_spChartSelectedId] + lo_testSelected;
            y = spChartY1[lo_spChartSelectedId] - spChartKy[lo_spChartSelectedId] * arrArrRezultatiTock[lo_spChartSelectedId][lo_testSelected];
            colorId = lo_testSelected - 10 * (Math.trunc((lo_testSelected - 1) / 10)) - 1;
            gEllipse(x, y, 7, 7, 0, "", 4, rsltColor[colorId]);
            // ---- mouse over tip
            tmpText = "(" + arrArrRezultatiOcena[lo_spChartSelectedId][lo_testSelected] + ")";
            tmpText += " " + arrArrRezultatiImePriimek[lo_spChartSelectedId][lo_testSelected];
            if (lo_byRazredGen) { // če imam pregled za celo generacijo skupaj, k imenu in priimku dodam še razred
                tmpText += ", " + arrArrRezultatiRazred[lo_spChartSelectedId][lo_testSelected];
                //tmpText += ", " + arrRazredArrOceneArrRezultatiRazred[lo_testSelected];
            }
            tmpText += ", " + arrArrRezultatiTock[lo_spChartSelectedId][lo_testSelected].toString() + "t";
            tmpText += ", " + arrArrRezultatiPercent[lo_spChartSelectedId][lo_testSelected].toFixed(1) + "%";
            ;[w, h] = gMeasureText(tmpText, tipFont);
            x1 = lo_mouseMoveX + 24; y1 = lo_mouseMoveY + 6;
            if ((x1 + w + 15) > ctxW) {
                x1 = ctxW - w - 7;
                y1 = lo_mouseMoveY + 24;
            }
            gBannerRectWithText3(tmpText, x1, y1, tipFont, 5, 5, 5, 4, 4, "papayaWhip", 1, "lightGray", "darkBlue", "", 0, 0);
        }
    }
    
    // ---- MOUSE OVER TIPS - BAR/PIE CHART 24.1.2025
    let printList = false;
    if (lo_ocenaSelected > 0) {
        if (drawPieChart && lo_pcChartSelectedId > 0) { tmpItemId = lo_pcChartSelectedId; printList = true }
        else if (drawBarChart && lo_bcChartSelectedId > 0) { tmpItemId = lo_bcChartSelectedId; printList = true };
    }
    if (printList) {
        // ---- nabiranje teksta za prikaz toolTip-a
        let textExceed = false;
        let arrTipText = [];
        let ocenaIdVRazredu;
        for (i = 1; i <= arrArrOceneCount[tmpItemId][lo_ocenaSelected]; i++) {
            ocenaIdVRazredu = arrRazredArrOceneArrRezultatiOcenaIdVRazredu[tmpItemId][lo_ocenaSelected][i];
            colorId = ocenaIdVRazredu - 10 * (Math.trunc((ocenaIdVRazredu - 1) / 10)) - 1;
            // ---- mouse over tip
            tmpText = arrRazredArrOceneArrRezultatiTock[tmpItemId][lo_ocenaSelected][i].toString() + "t#";
            tmpText += colorId.toString() + "t#";
            tmpText += arrRazredArrOceneArrRezultatiImePriimek[tmpItemId][lo_ocenaSelected][i];
            if (lo_byRazredGen) { // če imam pregled za celo generacijo skupaj, k imenu in priimku dodam še razred
                tmpText += ", " + arrRazredArrOceneArrRezultatiRazred[tmpItemId][lo_ocenaSelected][i];
            }
            tmpText += ", " + arrRazredArrOceneArrRezultatiTock[tmpItemId][lo_ocenaSelected][i].toString() + "t";
            tmpText += ", " + arrRazredArrOceneArrRezultatiPercent[tmpItemId][lo_ocenaSelected][i].toFixed(1) + "%";
            arrTipText[i - 1] = tmpText; // zaradi kasnejšega sortiranja si zapise zapisujem od indeksa 0 vključno naprej
            // ---- če še noben text ni pogledal ven iz ekrana, potem to preverim za tekoči tekst
            if (!textExceed) {
                ;[w, h] = gMeasureText(tmpText.split("t#")[2], tipFont);
                if ((lo_mouseMoveX + w + 30) > ctxW) {
                    textExceed = true;
                };
            }
        }
        // ---- tekst za toolTip je nabran in tudi vemo, ali ga je treba prestaviti bolj levo, da ne bo gledal ven iz ekrana
        //      zdaj bi bilo dobro presortirati nabrane učence glede na dosežene točke oziroma procente
        arrTipText.sort(function(a, b){return a.split("t#")[0] - b.split("t#")[0]});
        for (i = 0; i < arrArrOceneCount[tmpItemId][lo_ocenaSelected]; i++) {
            // ---- mouse over tip
            tmpText = arrTipText[i].split("t#")[2];
            ;[w, h] = gMeasureText(tmpText, tipFont);
            x1 = lo_mouseMoveX + 24;
            y1 = lo_mouseMoveY + 16 + i * 21;
            if (textExceed) { x1 = ctxW - w - 7; y1 += 18; };
            //gBannerRectWithText3(tmpText, x1, y1, tipFont, 5, 5, 5, 4, 4, gf_alphaColor(208, "papayaWhip"), 1, "lightGray", "darkBlue", gf_alphaColor(208, "lightGray"), 5, 5);
            colorId = Number(arrTipText[i].split("t#")[1]);
            gBannerRectWithText3(tmpText, x1, y1, tipFont, 5, 5, 5, 4, 4, gf_alphaColor(208, "papayaWhip"), 1, "lightGray", rsltColor[colorId], "", 0, 0); // prej so bili vsi izpisani v darkBlue barvi!
        }
    }

}

function paint_eRazred_grafUcenec() {
     
    if (!lo_dataPrepared) { return; };

    const marginLeft = 8; const marginRight = 8;
    const marginTop = 8; const marginBottom = 8;
    let vGap = 10; let hGap = 10;
    
    let rows, cols, row, col, x, y, itemWidth, itemHeight, ih, iw, kAddFocud, w, h, tmpText;
    let fx, fy, fiw, fih, haveFocusGraph;

    //---- razred mora biti izbran
    if (lo_razred <= 0) { return };
    //---- kakšnega učenca v izbranem razredu moramo imeti
    let nrUcencev = razredNrUcencev[lo_razred];
    if (nrUcencev <= 0) { return };

    //---- dimenzije matrike
    cols = Math.trunc(Math.sqrt(nrUcencev * 0.7 - 1)) + 1;
    let ratio = ctxW / (ctxH + 1);
    if (ratio > 2.1) { cols += 1 }; if (ratio > 2.5) { cols += 1 }; if (ratio > 3.3) { cols += 1 }; if (ratio > 5) { cols += 1 }; //21.12.2023 spremenil faktor 1.8 -> 2.1
    if (cols > nrUcencev) { cols = nrUcencev };
    rows = Math.trunc((nrUcencev - 1) / cols) + 1;
    //----
    itemWidth = (ctxW - marginLeft - marginRight - (cols - 1) * hGap) / cols;
    itemHeight = (ctxH - marginTop - marginBottom - (rows - 1) * vGap) / rows;
    
    col = 1; row = 1;
    kAddFocud = 3; // za ta faktor bo povečan graf učenca v fokusu
    haveFocusGraph = false;
    for (i = 1; i <= nrUcencev; i++) {
        
        //if (lo_razred == 2) {
        //    lo_razred = lo_razred;
        //}

        // ---- najprej ugotovimo pozicijo in dimenzije grafa za tekočega učenca. Upošteva se tudi učenec v fokusu, katerega graf bo večji
        ;[x, y, iw, ih] = paint_eRazred_grafUcenec_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, i, row, col, itemWidth, itemHeight, false, kAddFocud);
        
        // ---- učenca v fokusu preskočim in ga izrišem na koncu po zanki učencev
        if (i == lo_focusUcenec) {
            // ta je fokusiran in si zapomnim podatke zanj, izrisal pa ga bom kasneje
            ;[fx, fy, fiw, fih] = [x, y, iw, ih];
            haveFocusGraph = true;
            paint_eRazred_grafUcenec_drawSingleUcenec(i, false, x, y, iw, ih); // 4.2.2025 vseeno ga izrišem, na koncu pa bom še povečanega na sredini
        } else {
            // ta ni fokusiran, zato ga normalno izrišem
            paint_eRazred_grafUcenec_drawSingleUcenec(i, false, x, y, iw, ih);
        }
        col += 1;
        if (col > cols) { col = 1; row += 1 };
    }
    
    // ---- če imam učenca v fokusu, izrišem zdaj preko ostalih še povečan graf zanj
    if (haveFocusGraph) {        
        //paint_eRazred_grafUcenec_drawSingleUcenec(lo_focusUcenec, fx, fy, fiw, fih);
        ;[x, y, iw, ih] = paint_eRazred_grafUcenec_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, lo_focusUcenec, row, col, itemWidth, itemHeight, true, kAddFocud)
        paint_eRazred_grafUcenec_drawSingleUcenec(lo_focusUcenec, true, x, y, iw, ih);
    }
    
    // ---- Izpis trenutnega razreda
    tmpText = razredIme[lo_razred];
    let fontRazred = "bold 32pt verdana";
    ;[w, h] = gMeasureText(tmpText, fontRazred);
    x = ctxW - w - 15;
    y = ctxH - h - 35;
    //gText(tmpText, fontRazred, "darkBlue", x, y);
    gBannerRoundRectWithText3(x, y, w, h, fontRazred, "royalBlue", tmpText, 6, 6, 6, 18, "khaki", 1, "gray", "darkGray", 4, 4, false);
    
}

function paint_eRazred_grafUcenec_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, ucenec, row, col, itemWidth, itemHeight, vp_focusAware, vp_k) {

    let x, y, iw, ih, newY, yDiff, x0, y0;

    x = marginLeft + (col - 1) * (hGap + itemWidth);
    y = marginTop + (row - 1) * (vGap + itemHeight);
    iw = itemWidth; ih = itemHeight;
        
    //30.7.2023 lokacijo v fokusu izrišem nekoliko večjo
    if (cols > 1 && rows > 1) {
        if (ucenec == lo_focusUcenec) {
            //x0 = x; y0 = y;
            //if (x > (marginLeft + vp_k * iw)) { x -= vp_k * iw; }
            //if (y > (marginTop + vp_k * ih)) { y -= vp_k * ih; }
            //iw += 2 * vp_k * iw; ih += 2 * vp_k * ih;
            //if ((x + iw) > (ctxW - marginRight)) { x = ctxW - marginRight - iw; }
            //if ((y + ih) > (ctxH - marginBottom)) { y = ctxH - marginBottom - ih; }
            // ----
            if (vp_focusAware) { 
                let kSize = 0.9;
                iw = kSize * (ctxW - marginLeft - marginRight);
                ih = iw * itemHeight / itemWidth;
                if (ih > ctxH - marginTop - marginBottom) { ih = kSize * (ctxH - marginTop - marginBottom) };
                x = ctxW / 2 - iw / 2;
                y = ctxH / 2 - ih / 2;                
            }            
        };
    }
        
    if (col == 1 && row == 1 && buttonMode.visible) {
        newY = 32; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod toolbarom 29.1.2023 v1.6
    }
    if (col == cols && row == 1 && lo_showGUI) {
        newY = 59; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod izpisom avtorja:) 29.1.2023 v1.6
    }
        
    return [x, y, iw, ih]
}

function paint_eRazred_grafUcenec_drawSingleUcenec(vp_razredUcenecId, vp_focus, chartLeft, chartTop, chartWidth, chartHeight) {

    let gapLeft = 16; let gapRight = 8;
    let gapTop = 8; let gapBottom = 16;
    if (vp_focus) { gapLeft += 4; gapTop += 4; gapBottom += 4; }; // 6.2.2025
    // ----
    let chartRight = chartLeft + chartWidth;
    let xRight = chartRight - gapRight;
    let xRightData = xRight - 12;
    if (vp_focus) { xRightData -= 16 }; // 6.2.2025
    let chartBottom = chartTop + chartHeight;
    let yTop = chartTop + gapTop;
    let yTopData = yTop + 25;
    // ----
    let xYos = chartLeft + gapLeft;
    let xLeftData = xYos + 15;
    if (vp_focus) { xLeftData += 12 }; // 6.2.2025
    let yXos = chartBottom - gapBottom;
    // ----
    let yRangeOcene = 4.6; // ocena 1 naj bo na polovici višine ene ocene, potem pa po cele višine naprej gor proti 5
    let yRangePix = yXos - yTopData;
    let ky = yRangePix / yRangeOcene;
    // ----
    let ucenecId = razredUcenecId[lo_razred][vp_razredUcenecId];
    let xRangeDate = ucenciOceneRazponDni
    let xRangePix = xRightData - xLeftData;
    let kx = xRangePix / xRangeDate;
    // ----
    let x, y, w, h, tmpText, tmpColor, tmpLineWidth;
    let fontSmall = "10pt verdana";

    // 4.2.2025
    //if (vp_razredUcenecId == lo_focusUcenec) {
    if (vp_focus) {
        let shW = 25; let radius = 12;
        //gBannerRoundRect2(chartLeft - shW, chartTop - shW, chartWidth + 2 * shW, chartHeight + 2 * shW, radius, gf_alphaColor(128, "khaki"), 0, "", "", 0, 0, false, true, true, true, true);
        gBannerRoundRect2(chartLeft - shW, chartTop - shW, chartWidth + 2 * shW, chartHeight + 2 * shW, radius, gf_alphaColor(128, "darkOliveGreen"), 0, "", "", 0, 0, false, true, true, true, true);
        //gBannerRoundRect2(chartLeft, chartTop, chartWidth, chartHeight, 8, "", 0, "", "#FFFFFFC0", 20, 20, true, true, true, true, true);
    }

    // ---- okvirček za celo področje chart-a
    tmpColor = "#F7F7F7FF";
    if (vp_razredUcenecId == lo_focusUcenec && !vp_focus) { tmpColor = "papayaWhip"; };
    gBannerRoundRect2(chartLeft, chartTop, chartWidth, chartHeight, 4, tmpColor, 1, "lightGray", "", 0, 0, false, true, true, true, true);

    // ---- osi
    gLine(xLeftData, yXos, xRightData, yXos, 1, "darkSlateGray", []);
    //gLine(xYos, yTop, xYos, yXos, 1, "darkSlateGray", []);

    // ---- datumi na datumski X osi
    // ---- prvi datum ocene
    let date0 = new Date(ucenciPrvaOcenaDatum);
    let dan = date0.getDate();
    let mesec = date0.getMonth();
    let leto = date0.getFullYear();
    tmpText = dan.toString() + "." + (mesec + 1).toString() + ".";
    let fontDatum = "9pt verdana";
    ;[w, h] = gMeasureText(tmpText, fontDatum);
    x = xLeftData - w / 2;
    y = yXos + h + 4;
    gLine(xLeftData, yXos - 2, xLeftData, yXos + 2, 1, "darkSlateGray", []);
    gText(tmpText, fontDatum, "darkSlateGray", x, y);
    // ---- vsak vmesni prvi v mesecu
    let outOfDateRange = false;
    mesec += 1; if (mesec > 11) { mesec = 0; leto += 1 };
    let mesec0 = mesec;
    let diffPix;
    for (let i = 1; !outOfDateRange; i++) {
        if (mesec > 11) { mesec = 0; leto += 1 };
        let tmpDatum = new Date(leto, mesec, 1, 12);
        let tmpDatumMs = Date.parse(tmpDatum); 
        if (tmpDatumMs > ucenciZadnjaOcenaDatum) {
            outOfDateRange = true;
            break;
        }        
        if (i == 1) {
            diffPix = kx * (tmpDatumMs - ucenciPrvaOcenaDatum);
            if (diffPix < w) {
                mesec += 1; continue;
            }
        };
        x = xLeftData + kx * (tmpDatumMs - ucenciPrvaOcenaDatum);
        gLine(x, yXos - 2, x, yXos + 2, 1, "darkSlateGray", []);
        tmpText = "1." + (mesec + 1).toString() + ".";
        ;[w, h] = gMeasureText(tmpText, fontDatum);
        gText(tmpText, fontDatum, "darkSlateGray", x - w / 2, y);
        //
        mesec += 1;
    }
    // ---- zadnji datum ocene
    date0 = new Date(ucenciZadnjaOcenaDatum);
    dan = date0.getDate();
    mesec = date0.getMonth();
    leto = date0.getFullYear();
    tmpText = dan.toString() + "." + (mesec + 1).toString() + ".";
    ;[w, h] = gMeasureText(tmpText, fontDatum);
    x = xRightData - w / 2;
    y = yXos + h + 3;
    gLine(xRightData, yXos - 2, xRightData, yXos + 2, 1, "darkSlateGray", []);
    gText(tmpText, fontDatum, "darkSlateGray", x, y);    

    // ---- izpis učenca
    let fontUcenecImePriimek = "bold 10pt verdana";
    tmpText = ucenecIme[ucenecId] + " " + ucenecPriimek[ucenecId];
    //if (vp_razredUcenecId == lo_focusUcenec) {
    if (vp_focus) {
        fontUcenecImePriimek = "bold 13pt verdana";
    }
    ;[w, h] = gMeasureText(tmpText, fontUcenecImePriimek);
    x = chartRight - w - 5;
    y = chartTop + 4;
    gBannerRoundRectWithText3(x, y, w, h, fontUcenecImePriimek, "darkSlateGray", tmpText, 2, 2, 2, 2, "#EBFFFFFF", 1, "lightGray", "darkGray", 2, 2, false, true, true, true, true); // med aliceBlue in lightCyan

    // ---- povprečje
    let avgValue = 0;
    //if (lo_allPredmet) { avgValue = ucenecAvgOcena[ucenecId] }
    //else { avgValue = ucenecPredmetAvgOcena[ucenecId][lo_predmet] };
    //y = yXos - ky * (avgValue - 0.5);
    //tmpColor = "darkGray";
    //if (avgValue == 1.5) { tmpColor = "darkRed"; }
    //else if (avgValue < 1.5) { tmpColor = "red"; };
    //gLine(xLeftData, y, xRightData, y, 2, tmpColor, [3, 3]);
    //tmpText = "avg:";
    //;[w, h] = gMeasureText(tmpText, fontSmall);   
    //gText(tmpText, fontSmall, "darkSlateGray", chartRight - w - 4, y - 4);
    //tmpText = avgValue.toFixed(2);
    //;[w, h] = gMeasureText(tmpText, fontSmall);   
    //gText(tmpText, fontSmall, "darkSlateGray", chartRight - w - 4, y + h + 3);
    
    // ---- TABLETEK OCENE
    let fontOcena = "bold 14pt verdana"; let ddy = 8;
    if (vp_focus) { fontOcena = "bold 18pt verdana"; ddy = 16 };
    for (let ocena = 1; ocena <= 5; ocena++) {
        tmpText = ocena.toString();
        ;[w, h] = gMeasureText(tmpText, fontOcena);
        y = yXos - ky * (ocena - 0.5);
        gBannerRoundRectWithText(xYos - w / 2 - 3, y - h / 2, w, h, fontOcena, colorOcena[ocena], tmpText, 4, ddy, 9, "white", 1, "darkGray", "#CACACAC0", 3, 2, false);
    }

    // ---- OCENE - KRIVULJA POVPREČJA ... rišem jo spodaj, da so potem markerji ocen lepo čez njo in ne obratno popackano
    let fontUcenecOcena = "bold 12pt verdana";
    let ocenaId, ocenaNr, ocenaCifraStr, datumOceneMs, colorId, x0, yAvg, rollAvg, pisnaOcena, currentPredmetId, tmpAddY;
    let items = ucenecNrOcen[ucenecId];
    if (!lo_allPredmet) { items = ucenecPredmetNrOcen[ucenecId][lo_predmet]; };
    for (let i = 1; i <= items; i++) {
        if (lo_allPredmet) { 
            ocenaId = ucenecOcenaId[ucenecId][i];
            rollAvg = ucenecRollAvg[ucenecId][i]; // 1.2.2025
        } else {
            ocenaId = ucenecPredmetOcenaId[ucenecId][lo_predmet][i];
            rollAvg = ucenecPredmetRollAvg[ucenecId][lo_predmet][i]; // 1.2.2025
        }
        datumOceneMs = ocenaDatumMs[ocenaId];
        x = xLeftData + kx * (datumOceneMs - ucenciPrvaOcenaDatum);
        // ---- podaljšek krivulje tekočega povprečja do tega datuma in tekočega povprečja
        yAvg = yXos - ky * (rollAvg - 0.5);
        if (i > 1) {
            tmpColor = "darkGray";
            if (rollAvg == 1.5) { tmpColor = "darkRed"; }
            else if (rollAvg < 1.5) { tmpColor = "red"; };
            tmpLineWidth = 3;
            //if (vp_razredUcenecId == lo_focusUcenec) { tmpLineWidth = 5 };
            if (vp_focus) { tmpLineWidth = 5 };
            gLine(x0, y0, x, yAvg, tmpLineWidth, tmpColor, [4, 4]);
        }             
        x0 = x;
        y0 = yAvg;
    };
    // ---- označitev končnega povprečja
    tmpText = "avg:";
    ;[w, h] = gMeasureText(tmpText, fontSmall);   
    x += 10; if ((x + w) > (chartRight - 2)) { x = chartRight - w - 2 };
    gText(tmpText, fontSmall, "darkSlateGray", x, yAvg - 4);
    tmpText = rollAvg.toFixed(2);
    ;[w, h] = gMeasureText(tmpText, fontSmall);   
    gText(tmpText, fontSmall, "darkSlateGray", x, yAvg + h + 3);

    // ---- OCENE - MARKERJI OCEN ... rešejo se preko že izrisane krivulje povprečja
    for (let i = 1; i <= items; i++) {
        if (lo_allPredmet) { ocenaId = ucenecOcenaId[ucenecId][i]; }
        else { ocenaId = ucenecPredmetOcenaId[ucenecId][lo_predmet][i]; };
        pisnaOcena = ocenaTipTip[ocenaId] == "P" ? true : false; // 6.2.2025
        currentPredmetId = ocenaPredmetId[ocenaId];
        ocenaCifraStr = ocenaCifra[ocenaId];
        ocenaNr = ocenaCifraNr[ocenaId];
        datumOceneMs = ocenaDatumMs[ocenaId];
        x = xLeftData + kx * (datumOceneMs - ucenciPrvaOcenaDatum);
        // ---- marker ocene
        y = yXos - ky * (ocenaNr - 0.5);
        if (pisnaOcena && (x - x0) <= 2) {
            y -= 4
        };
        colorId = ocenaId - 10 * (Math.trunc((ocenaId - 1) / 10)) - 1;
        ctx.setLineDash([]);
        if (vp_focus) {
            tmpAddY = 1;
            if (ocenaTipTip[ocenaId] == "P") {
                //gEllipse(x, y, 7, 8, 0, "", 2, colorPredmet[currentPredmetId]);
                //tmpAddY = 5;
            }
            //gEllipse(x, y, 4, 5, 0, colorPredmet[currentPredmetId], 0, "");
            ;[w, h] = gMeasureText(ocenaCifraStr, fontUcenecOcena);
            gBannerRoundRectWithText3(x - w / 2, y - h / 2, w, h, fontUcenecOcena, "white", ocenaCifraStr, 5, 3, 4, 6, colorPredmet[currentPredmetId], 1, "lightGray", "darkGray", 2, 2, false);
            gText(predmetKratica[ocenaPredmetId[ocenaId]].substr(0, 1), "10pt verdana", colorPredmet[currentPredmetId], x - 4, y + h + 11 + tmpAddY);
        } else {
            tmpAddY = 0;
            if (ocenaTipTip[ocenaId] == "P") {
                gEllipse(x, y, 5, 6, 0, "", 1, colorPredmet[currentPredmetId]);
                tmpAddY = 3;
            }
            gEllipse(x, y, 3, 4, 0, colorPredmet[currentPredmetId], 0, "");
            gText(predmetKratica[ocenaPredmetId[ocenaId]].substr(0, 1), "9pt verdana", colorPredmet[currentPredmetId], x - 4, y + 15 + tmpAddY);
        }
        x0 = x;
    };
    
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

    let x, y;

    if (!lo_showGUI) {
        //---- on-screen namigi/pomoč
        if (lo_showHelpTips) { paint_tips() };
        //return
    };

    if (lo_showToolTips) { //1.4.2024
        if (lo_showGUI) {
            if (lo_enabledHelp) { // 27.1.2025
                buttonMode.showToolTip(); buttonPredmet.showToolTip(); buttonTest.showToolTip(); buttonRazred.showToolTip(); buttonSPData.showToolTip(); buttonKritLuknje.showToolTip(); buttonLoad.showToolTip(); buttonHelp.showToolTip();
            };
        };
    };

    if (lo_showGUI && lo_showToolbar) { 
        buttonMode.visible = true; buttonPredmet.visible = true; buttonTest.visible = true; buttonRazred.visible = true; buttonSPData.visible = true; buttonKritLuknje.visible = true; buttonLoad.visible = true; buttonHelp.visible = true;
        buttonMode.paint(); buttonPredmet.paint(); buttonTest.paint(); buttonRazred.paint(); buttonSPData.paint(); buttonKritLuknje.paint(); buttonLoad.paint(); buttonHelp.paint();
        x = buttonKritLuknje.left + buttonKritLuknje.width + 4.5;
        y = buttonRazred.top;
        gLine(x, y, x, y + buttonRazred.height + 1, 3, "darkGray", []);
        x = buttonLoad.left + buttonLoad.width + 4.5;
        y = buttonRazred.top;
        gLine(x, y, x, y + buttonRazred.height + 1, 3, "darkGray", []);
    } else {
        buttonMode.visible = false; buttonPredmet.visible = false; buttonTest.visible = false; buttonRazred.visible = false; buttonSPData.visible = false; buttonKritLuknje.visible = false; buttonLoad.visible = false; buttonHelp.visible = false;
    }

    //---- on-screen namigi/pomoč
    if (lo_showHelpTips) { paint_tips() };

    if (dbg) {
        vStep = 15;
        x = 4; y = 15;
        //if (lo_modeCalculate == cv_modeCalculate_byF) { gText("lo_modeCalculate = -byF-", "10pt verdana", "black", x, y) } else { gText("lo_modeCalculate = -byLensSize-", "10pt verdana", "black", x, y) };
    }
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
            let nrTipRows = 11;
            let backHeight = nrTipRows * vStep + 15;
            const bannerWidth = 510;

            gBannerRoundRect(x0 - 15, y0 - 13, bannerWidth, backHeight, 20, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true); //zdaj treba manj transparentno, ker senčenje od v1.16 deluje samo okoli bannerja, ne pa tudi pod njim
            //
            y += vStep;
            gBannerRectWithText2("F2", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 27, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("N", x0 + 41, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... skrij/prika" + scZhLow + "i to pomo" + scTchLow, x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("D", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... nalo" + scZhLow + "i kopirane podatke ocen iz clipboarda", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("R", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... preklop pregleda med razredi posamezno ali skupno", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("S", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("(+", x0 + 25, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("SHIFT", x0 + 45, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2(")", x0 + 98, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("... ZOOM +/- prikaza razpr" + scSchLow + "enosti rezultatov", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            y += vStep;
            gBannerRectWithText2("T", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... naslednji/prej" + scSchLow + "nji pisni test pri istem predmetu", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
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
            gBannerRectWithText2("... vklju" + scTchLow + "i/izklju" + scTchLow + "i fokus na graf ocen u" + scTchLow + "enca", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("kole" + scSchLow + scTchLow + "ekMi" + scSchLow + "ke", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... izbira grafa ocen u" + scTchLow + "enca za prikaz v fokusu", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);            
            //
            y += vStep;
            gLine(x0 - 4, y - 0.27 * vStep, x0 + bannerWidth - 30, y - 0.27 * vStep, 1, lo_tipsColor, [4, 4]);
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

function paint_GUI_layoutB() {

    const wSep = 4;
    let x;
    let yTop = 2;

    //---- 27.1.2025
    buttonMode.left = 2;
    buttonMode.top = yTop;   
    buttonPredmet.left = buttonMode.left + buttonMode.width + wSep;
    buttonPredmet.top = buttonMode.top;
    buttonTest.left = buttonPredmet.left + buttonPredmet.width + wSep;
    buttonTest.top = buttonMode.top;
    buttonRazred.left = buttonTest.left + buttonTest.width + wSep;
    buttonRazred.top = buttonMode.top;
    buttonSPData.left = buttonRazred.left + buttonRazred.width + wSep;
    buttonSPData.top = buttonMode.top;
    buttonKritLuknje.left = buttonSPData.left + buttonSPData.width + wSep;
    buttonKritLuknje.top = buttonMode.top;
    //----
    x = buttonKritLuknje.left + buttonKritLuknje.width + wSep;
    buttonLoad.left = x + wSep;
    buttonLoad.top = buttonMode.top;
    //----
    x = buttonLoad.left + buttonLoad.width + wSep;
    buttonHelp.left = x + wSep;
    buttonHelp.top = buttonPredmet.top;

}

function lf_changeValueFocusUcenec(vp_diff) {

    let newValue;

    newValue = lo_focusUcenec - vp_diff;
    if (newValue < 0) { newValue = razredNrUcencev[lo_razred] };
    if (newValue > razredNrUcencev[lo_razred]) { newValue = 0 };

    return newValue;

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

function lf_setPrintLevel(vp_paint) {
    //-----------------
    // 5.4.2024
    //-----------------

    //---- Kaj vse se pri posameznem nivoju riše?
    lo_enabledUseHalfPoint = true;
    lo_enabledintChooserF = true;
    lo_enabledKriteriji = true;
    lo_enabledIntChooserKriterij12 = true; lo_enabledIntChooserKriterij23 = true; lo_enabledIntChooserKriterij34 = true; lo_enabledIntChooserKriterij45 = true;
    lo_drawTabelaOcen = true;
    lo_drawTabelaOcenLines = true;
    lo_drawTabelaOcenRects = true;
    lo_drawVTocke = true;
    lo_drawListSimple = false;
    lo_drawListSimpleNoPercent = false; // 8.4.2024
    lo_drawGraphicalH = false; // 9.4.2024
    switch (lo_printLevel) {
        case 7: break;
        case 6: lo_enabledUseHalfPoint = false; break;
        case 5: lo_enabledUseHalfPoint = false; lo_drawVTocke = false; break;
        case 4: lo_enabledUseHalfPoint = false; lo_drawVTocke = false; lo_drawTabelaOcenRects = false; break;
        case 3: lo_enabledUseHalfPoint = false; lo_drawVTocke = false; lo_drawTabelaOcenRects = false; lo_drawTabelaOcenLines = false; break;
        case 2:
            lo_enabledUseHalfPoint = false; lo_drawVTocke = false; lo_drawTabelaOcenRects = false; lo_drawTabelaOcenLines = false; lo_drawTabelaOcen = false;
            lo_enabledintChooserF = false; lo_enabledKriteriji = false;
            lo_enabledIntChooserKriterij12 = false; lo_enabledIntChooserKriterij23 = false; lo_enabledIntChooserKriterij34 = false; lo_enabledIntChooserKriterij45 = false;
            lo_drawListSimple = true;
            break;
        case 1:
            lo_enabledUseHalfPoint = false; lo_drawVTocke = false; lo_drawTabelaOcenRects = false; lo_drawTabelaOcenLines = false; lo_drawTabelaOcen = false;
            lo_enabledintChooserF = false; lo_enabledKriteriji = false;
            lo_enabledIntChooserKriterij12 = false; lo_enabledIntChooserKriterij23 = false; lo_enabledIntChooserKriterij34 = false; lo_enabledIntChooserKriterij45 = false;
            lo_drawListSimpleNoPercent = true;
            break;
        case 0:
            lo_enabledUseHalfPoint = false; lo_drawVTocke = false; lo_drawTabelaOcenRects = false; lo_drawTabelaOcenLines = false; lo_drawTabelaOcen = false;
            lo_enabledintChooserF = false; lo_enabledKriteriji = false;
            lo_enabledIntChooserKriterij12 = false; lo_enabledIntChooserKriterij23 = false; lo_enabledIntChooserKriterij34 = false; lo_enabledIntChooserKriterij45 = false;
            lo_drawGraphicalH = true;
            break;
    }
        
    if (vp_paint) { paint() }

}

function lf_changeShowRuler(vp_newValue, vp_paint) {

    lo_showRuler = vp_newValue;
    checkBoxRuler.value = lo_showRuler;
    if (vp_paint) { paint() }

}

function lf_changeSchrink(vp_newValue, vp_paint) {

    lo_schrink = vp_newValue;

    if (lo_schrink > cv_schrink_max) { lo_schrink = cv_schrink_min };
    if (lo_schrink < cv_schrink_min) { lo_schrink = cv_schrink_max };
    
    if (vp_paint) { paint() }

}

function lf_changeZaokrozujNaCeleProcente(vp_newValue, vp_paint) {

    lo_zaokrozujNaCeleProcente = vp_newValue;
    if (vp_paint) { paint() }

}

function lf_changeByRazredGen(vp_newValue, vp_paint) {

    lo_byRazredGen = vp_newValue;
    if (vp_paint) { paint() }

}

function lf_changePisniTestNr(vp_newValue, vp_paint) {

    lo_pisniTestNr = vp_newValue;

    if (lo_pisniTestNr > lo_nrPredmetPisnihTestov[lo_predmet]) { lo_pisniTestNr = 1 };
    if (lo_pisniTestNr < 1) { lo_pisniTestNr = lo_nrPredmetPisnihTestov[lo_predmet] };

    if (vp_paint) { paint() }

}

function lf_changePredmet(vp_newValue, vp_paint) {

    let oldPredmet = lo_predmet;

    lo_predmet = vp_newValue;

    if (lo_predmet > lo_nrPredmetov) { lo_predmet = 1 };
    if (lo_predmet < 1) { lo_predmet = lo_nrPredmetov };

    if (lo_predmet != oldPredmet) { lo_pisniTestNr = 1 }; // 28.1.2025

    if (vp_paint) { paint() }

}

function lf_changeRazred(vp_newValue, vp_paint) {

    lo_razred = vp_newValue;

    if (lo_razred > lo_nrRazredov) { lo_razred = 1 };
    if (lo_razred < 1) { lo_razred = lo_nrRazredov };

    if (vp_paint) { paint() }

}

function lf_changeShowHelpTips(vp_newValue, vp_paint) {

    lo_showHelpTips = vp_newValue;
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

function lf_changeMode(vp_newValue, vp_paint) {

    //if (gl_mode == cv_mode_timeAvgTempMultiTimeSlice) {
    //    lo_printLevel = cv_timeSliceAll; // če sem bil multiSlice mode in grem ven iz njega, preklopim iz Month/Season v All
    //}; //11.12.2023
    //----

    if (vp_newValue < cv_minMode) { vp_newValue = cv_maxMode };
    if (vp_newValue > cv_maxMode) { vp_newValue = cv_minMode };

    lf_setMode(vp_newValue, vp_paint);
    
}

function lf_changeFocusUcenec(vp_newValue, vp_paint) {

    lo_focusUcenec = vp_newValue;
    if (vp_paint) { paint() }

}

function lf_changeFocusUcenecOnOff(vp_paint) {

    if (gl_mode != cv_mode_ucenec) { return };

    switch (lo_focusUcenec) {
        case 0:
            lo_focusUcenec = 1;
            break;
        default:
            lo_focusUcenec = 0;
            break;
    }

    if (vp_paint) { paint() }

}

function lf_setMode(vp_mode, vp_paint) {

    gl_mode = vp_mode;

    //---- prilagoditev GUI (1)
    switch (gl_mode) {
        case cv_mode_razredTest:
            data_prepareStructures_byRazredTest();
            //sliderMonthEnd.useValue0 = false;
            //sliderTailMonths.visible = true; break;
        case cv_mode_ucenec:
            data_prepareStructures_byUcenec();
            lo_allPredmet = true; // 1.2.2025
            //sliderMonthEnd.useValue0 = true;
            //sliderTailMonths.visible = false; break;
    }
    //---- prilagoditev GUI (2)
    //switch (gl_mode) { // 24.12.2023
    //    case cv_mode_timeAvgTempSingle:
    //        checkBoxAvgAllPlace.visible = true;
    //        break;
    //    case cv_mode_timeAvgTempMultiTimeSlice:
    //        checkBoxAvgAllPlace.visible = true;
            //----
    //}
    
    //---- prilagoditev GUI (3)
    //lf_setMonthIntervalText();

    lo_GUIlayoutHasChanged = true;
    if (vp_paint) { paint() }

}

function tmMouseOutOfWindow_tick() {
    
}

function paint_author() {

    //======== AVTOR
    let tmpStr = scCopyR + "2025 Peter Malovrh";
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

function clipboard_load() {

    navigator.clipboard.readText()
        .then((clipText) => {
            
            //console.log('clipboard contents', clipText);
            if (!clipboard_check(clipText)) {
                return
            };
        
            data_initParseAndPrepare(clipText); // 2.2.2025

            return;
            
            // Inicializacija podatkovnih struktur
            intDataStructures();

            // Očitno to so podatki o razredih in ocenah, treba je sparsati
            console.log("PARSE -->");
            data_parse(clipText);

            // Inicializacija potrebnih struktur za risanje grafov
            lo_predmet = 1; // FIZIKA
            lo_pisniTestNr = 1; // P1
            data_prepareStructures_byRazredTest(); // 23.1.2025
            data_prepareStructures_byUcenec();     // 2.2.2025

        })
}

function demo_load() {
        
    //// Inicializacija podatkovnih struktur
    //intDataStructures();

    let i;
    let demoTextStr = "";
    for (i = 0; i < demoText.length; i++) {
        if (i > 0) { demoTextStr += "\n" };
        demoTextStr += demoText[i];
    };

    data_initParseAndPrepare(demoTextStr); // 2.2.2025

    return;

    // Očitno to so podatki o razredih in ocenah, treba je sparsati
    console.log("DEMO PARSE -->");
    data_parse(demoTextStr);

    // Inicializacija potrebnih struktur za risanje grafov
    lo_predmet = 1; // FIZIKA
    lo_pisniTestNr = 1; // P1
    data_prepareStructures_byRazredTest(); // 23.1.2025

}

function data_initParseAndPrepare(textData) {

    // Inicializacija podatkovnih struktur
    intDataStructures();

    // Očitno to so podatki o razredih in ocenah, treba je sparsati
    console.log("PARSE -->");
    data_parse(textData);

    // Inicializacija potrebnih struktur za risanje grafov
    lo_predmet = 1; // FIZIKA
    lo_pisniTestNr = 1; // P1
    data_prepareStructures_byRazredTest(); // 23.1.2025
    data_prepareStructures_byUcenec();     // 2.2.2025

}

function clipboard_check(clipText) {

    // Je kaj na clipboard-u?
    if (clipText.length < 100) {
        console.log("ERROR: No content on clipboard!");
        return (false);
    };

    // Na clipboardu je kar nekaj vsebine
    // A so notri potrebni markerji?
    
    // Preverim vsebovanje elementov, ki sigurno so v vsakem data fajlu
    if (clipText.indexOf("#L") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    if (clipText.indexOf("#P") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    if (clipText.indexOf("#R") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
    if (clipText.indexOf(",") < 0) { console.log("ERROR: Wrong data format!"); return (false); };
        
    return (true);

}

function intDataStructures() {

    ucenecIme.length = 0;
    ucenecPriimek.length = 0;
    ucenecSpol.length = 0;
    ucenecRazredId.length = 0;
    lo_nrUcencev = 0;
    lo_ucenec = 0;

    razredIme.length = 0;
    razredLetnik.length = 0;
    razredCrka.length = 0;
    lo_nrRazredov = 0;
    lo_razred = 0;

    predmetIme.length = 0;
    predmetKratica.length = 0;
    lo_nrPredmetov = 0;
    lo_nrPredmetPisnihTestov.length = 0;
    lo_predmet = 0;

    // 28.1.2025
    katalogPredmetovIme.length = 0;
    katalogPredmetovKratica3.length = 0;
    katalogPredmetovKratica1.length = 0;
    lo_nrKatalogPredmetov = 0;

    letnikStr.length = 0;
    lo_nrLetnikov = 0;
    lo_letnik = 0;

    ocenaCifra.length = 0;
    ocenaCifraNr.length = 0;
    ocenaUcenecId.length = 0;
    ocenaRazredId.length = 0;
    ocenaPredmetId.length = 0;
    ocenaLetnikId.length = 0;
    ocenaDatumStr.length = 0;    // "14-10-2024"
    ocenaDatumMs.length = 0;     // 1.2.2025
    ocenaTip.length = 0;         // "U" (ustna) ali "P1" (pisna prva/druga/tretja)
    ocenaTipTip.length = 0;      // "U" (ustna) ali "P" (pisna) 6.2.2025
    ocenaTipSerialNr.length = 0; // "P1" pomeni prvi pisni test
    ocenaTock.length = 0; 
    ocenaMaxTock.length = 0; 
    lo_nrOcen = 0;
    lo_ocena = 0;

    console.log("---- DATA INIIALIZED ----" + "letnikov: " + lo_nrLetnikov.toString() + ", predmetov: " + lo_nrPredmetov.toString() + ", razredov: " + lo_nrRazredov.toString() + ", u" + scTchLow + "encev: " + lo_nrUcencev.toString() + ", ocen: " + lo_nrOcen.toString());

};

function data_parse(clipText) {

    let pos, pos1, lineStr, searchStr;
    let haveLines = true;
    let nrLines = 0;
    let rslt;

    for (pos = 0; haveLines; nrLines++) {
        // poiščem konec naslednje vrstice
        pos1 = clipText.indexOf("\n", pos);
        
        // ---- Ali morda ni več prehodov v nove vrstice?
        if (pos1 <= pos) {
            // ni več prelomov v novo vrstico - vzamem vse do konca teksta kot zadnjo vrstico
            haveLines = false;
            lineStr = clipText.slice(pos).trim();
            if (lineStr.length <= 4) {
                break; // ven iz FOR zanke
            };
            if (lineStr.indexOf(",") > 0 && (lineStr.indexOf("|U|") > 0 || lineStr.indexOf("|P") > 0)) {
                // imamo še zadnjega učenca z ocenami - obdelaj ga
                data_parse_ucenec(lineStr);
            }
            break; // ven iz FOR zanke
        }

        // ---- Našli smo nov prelom v naslednjo vrstico - treba je obdelati tekočo vrstivo
        lineStr = clipText.slice(pos, pos1).trim();
        if (lineStr.length <= 4) {
            // brezvezna neuporabna vrstica - ignoriraj in beri dalje
            pos = pos1 + 1;
            continue; // NEXT v FOR zanki (naslednja iteracija v zanki)
        };
        if (lineStr.indexOf(",") > 0 && (lineStr.indexOf("|U|") > 0 || lineStr.indexOf("|P") > 0)) {
            // imamo naslednjega učenca z ocenami - obdelaj ga
            data_parse_ucenec(lineStr);
        } else if (lineStr.indexOf("#PIK!") >= 0 ) {
            // imamo imena in kratice predmetov ...
            rslt = data_parse_imenaKraticePredmetov(lineStr);
            if (!rslt) {
                break; // konec branja vrstic zaradi napake v podatkih ali česa drugega
            }
        //} else if (lineStr.indexOf("#L") >= 0 && lineStr.indexOf("#P") > 0 && lineStr.indexOf("#R") >= 0) {
        } else if (lineStr.indexOf("#L") >= 0 && lineStr.indexOf("#R") >= 0) {
            // imamo začetek novega razreda ...
            rslt = data_parse_novRazred(lineStr);
            if (!rslt) {
                break; // konec branja vrstic zaradi napake v podatkih ali česa drugega
            }
        } else {
            // nič uporabnega - ignoriraj in beri dalje
        }
        pos = pos1 + 1;

    }
    console.log("     parsed ... " + "letnikov: " + lo_nrLetnikov.toString() + ", predmetov: " + lo_nrPredmetov.toString() + ", razredov: " + lo_nrRazredov.toString() + ", u" + scTchLow + "encev: " + lo_nrUcencev.toString() + ", ocen: " + lo_nrOcen.toString());
}

function data_parse_novRazred(lineStr) {
    //console.log("---- " + lineStr);
    let tmpStr;
    const itemList = lineStr.split("#");
    if (itemList.length < 3) {
        return false;
    }
    //console.log(itemList[1] + " - " + itemList[2] + " - " + itemList[3] + " - ");
    //tmpStr = itemList[1].trim() + " - " + itemList[2].trim() + " - " + itemList[3].trim();
    //console.log(tmpStr);

    let nrParams = 0;

    // ---- LETNIK
    let tmpLetnikStr = itemList[1].trim().slice(1);
    // pogledamo, če ta letnik že obstaja med letniki?
    lo_letnik = getLetnikId(tmpLetnikStr);
    if (lo_letnik <= 0) {
        // nov doslej neznan letnik
        lo_nrLetnikov += 1;
        lo_letnik = lo_nrLetnikov;
        letnikStr[lo_nrLetnikov] = tmpLetnikStr;
    } 
    nrParams += 1;

    // ---- PREDMET ... po novem ga lahko tudi ni na tem mestu, če bojo kratice predmetov pri vsaki oceni
    let tmpPredmetStr = itemList[nrParams + 1].trim().toUpperCase();
    if (tmpPredmetStr.length < 2) {
        return false;
    }
    lo_havePredmetInHeader = false; // 28.1.2025
    if (tmpPredmetStr.substr(0, 1) == "P") {
        lo_havePredmetInHeader = true; // 28.1.2025
        tmpPredmetStr = tmpPredmetStr.slice(1);
        // pogledamo, če ta predmet že obstaja med predmeti?
        lo_predmet = getPredmetId(tmpPredmetStr);
        if (lo_predmet <= 0) {
            // nov doslej neznan predmet
            lo_nrPredmetov += 1;
            lo_predmet = lo_nrPredmetov;
            lo_nrPredmetPisnihTestov[lo_predmet] = 0; // 26.1.2025
            predmetIme[lo_nrPredmetov] = tmpPredmetStr;
            switch (tmpPredmetStr) {
                case "FIZIKA":
                    predmetKratica[lo_nrPredmetov] = "FIZ";
                    break;
                case "KEMIJA":
                    predmetKratica[lo_nrPredmetov] = "KEM";
                    break;
            }
        } 
        nrParams += 1; // 28.1.2025
    } else {
        // predmeti ni podan ... očitno bo kratica predmeta pri vsaki oceni spredaj
        nrParams += 0; // debug purpose
    }

    // ---- RAZRED
    let tmpRazredStr = itemList[nrParams + 1].trim().slice(1);
    let tmpRazredLetnikStr = tmpRazredStr.substr(0, 1);
    let tmpRazredCrka = tmpRazredStr.substr(1, 1);
    if (tmpRazredCrka==".") {tmpRazredCrka = tmpRazredStr.substr(2, 1);}
    // pogledamo, če ta razred že obstaja med razredi?
    lo_razred = getRazredId(tmpRazredLetnikStr, tmpRazredCrka);
    if (lo_razred <= 0) {
        // nov doslej neznan razred
        lo_nrRazredov += 1;
        lo_razred = lo_nrRazredov;
        razredIme[lo_nrRazredov] = tmpRazredLetnikStr + "." + tmpRazredCrka;
        razredLetnik[lo_nrRazredov] = tmpRazredLetnikStr;
        razredCrka[lo_nrRazredov] = tmpRazredCrka;
        lo_razredGen = getRazredGenId(Number(tmpRazredLetnikStr));
        if (lo_razredGen <= 0) {
            // nova doslej neznana generacija razredov (.. 7., 8., 9. )
            lo_nrRazredGen += 1;
            lo_razredGen = lo_nrRazredGen;
            razredGen[lo_nrRazredGen] = Number(tmpRazredLetnikStr);
        } 
    }
    return true;
}

function data_parse_imenaKraticePredmetov(lineStr) {
    //
    // primer:  "#PIK! #MATEMATIKA|MAT|M #FIZIKA|FIZ|K #KEMIJA|KEM|K #BIOLOGIJA|BIO|B #GEOGRAFIJA|GEO|G #SLOVENŠČINA|SLJ|S #ANGLEŠČINA|ANG|A #ŠPORT|ŠPO|P"
    //
    

    //console.log("---- " + lineStr);
    const itemList = lineStr.split("#");
    if (itemList.length < 3) { // prvi je prazen pred prvim #, drugi za ključ "PIK!", in vsaj še en predmet(e)
        return false;
    }
    //console.log(itemList[1] + " - " + itemList[2] + " - " + itemList[3] + " - ");
    //tmpStr = itemList[1].trim() + " - " + itemList[2].trim() + " - " + itemList[3].trim();
    //console.log(tmpStr);

    let pItemList;
    let tmpPikStr, i, tmpKatalogPredmetId, predmetIme, predmetKratica3, predmetKratica1;
    for (i = 2; i < itemList.length; i++) {

        // ---- NASLEDNJI PREDMET Z IMENOM, TRIČRKOVNO IN ENOČRKOVNO KRATICO, primer: "MATEMATIKA|MAT|M "
        let tmpPikStr = itemList[i].trim(); // zdaj imamo "MATEMATIKA|MAT|M"
        pItemList = tmpPikStr.split("|");
        if (pItemList.length < 3) {
            // ni dovolj podatkov o tekočem predmetu
            continue;
        }
        predmetIme = pItemList[0].trim().toUpperCase();
        // ---- pogledamo, če ta predmet že obstaja v katalogu predmetov?
        tmpKatalogPredmetId = getKatalogPredmetId(predmetIme);
        if (tmpKatalogPredmetId > 0) {
            // ta predmet imamo že
            continue;
        }
        // ---- nov predmet - preberemo kratice 
        predmetKratica3 = pItemList[1].trim().toUpperCase();
        predmetKratica1 = pItemList[2].trim().toUpperCase();
        // ---- stringi ne smejo biti prazni
        if (predmetIme.length <= 0 || predmetKratica3.length <= 0 || predmetKratica1.length <= 0) {
            // ignoriram ta predmet in gledam nadaljnje
            continue;
        }
        // ---- vpišem nov predmet v katalog
        lo_nrKatalogPredmetov += 1;
        katalogPredmetovIme[lo_nrKatalogPredmetov] = predmetIme;
        katalogPredmetovKratica3[lo_nrKatalogPredmetov] = predmetKratica3;
        katalogPredmetovKratica1[lo_nrKatalogPredmetov] = predmetKratica1;
        
    };

    return true;
}

function data_parse_ucenec(lineStr) {
    //let tmpStr = "L" + lo_letnik.toString() + " P" + lo_predmet.toString() + " R" + lo_razred.toString();
    //console.log(tmpStr + "    U: " + lineStr);

    let tmpStr, pos, pos1, i, tmpOcenaStr, ocenaDataList, tmpZnak1, tmpPredmetKratica1, tmpPredmetId, tmpOcenaCifra, tmpOcenaTip, tmpOcenaTipTip, tmpPisnaOcenaNr, tmpOcenaDatum, tmpPisnaOcena, tmpOcenaTock, tmpOcenaMaxTock;
    const itemList = lineStr.split(",");
    if (itemList.length < 1) {
        return false;
    }
    //console.log(itemList[1] + " - " + itemList[2] + " - " + itemList[3] + " - ");
    //tmpStr = itemList[1].trim() + " - " + itemList[2].trim() + " - " + itemList[3].trim();
    //console.log(tmpStr);

    // ---- IME IN PRIIMEK
    let tmpImePriimek = itemList[0].trim();
    let ime, priimek;
    // poiščem presledek med imenom in priimkom (priimki)
    pos1 = tmpImePriimek.indexOf(" ", pos);
    if (pos1 < 0) {
        ime = tmpImePriimek;
        priimek = "";
    } else {
        ime = tmpImePriimek.substr(0, pos1);
        priimek = tmpImePriimek.slice(pos1 + 1);
    }

    if (tmpImePriimek == "Neja Franko") { // debug purposes
        tmpImePriimek = tmpImePriimek;
    }
    
    // je ta učenec že bil naveden v podatkih v okviru istega razreda in drugega predmeta?
    lo_ucenec = getUcenecByRazredImePriimek(lo_razred, ime, priimek);
    if (lo_ucenec <= 0) {
        // nov doslej neznan učenec
        lo_nrUcencev += 1;
        lo_ucenec = lo_nrUcencev;
        ucenecIme[lo_nrUcencev] = ime;
        ucenecPriimek[lo_nrUcencev] = priimek;
        ucenecSpol[lo_nrUcencev] = "";
        ucenecRazredId[lo_nrUcencev] = lo_razred;
    }

    // 1.2.2025
    let datumOcene = new Date();
    let arrDatumOcene = [];
    let datumOceneMs;

    // ---- OCENE ENA ZA DRUGO
    for (i = 1; i <= (itemList.length - 1); i++) {
        
        // naslednja ocena
        tmpOcenaStr = itemList[i].trim();
        ocenaDataList = tmpOcenaStr.split("|");
        if (ocenaDataList.length < 3) {
            continue; // ignoriram to oceno in grem na naslednje ocene tega istrga učenca
        }
    
        paramId = 0;
        // na začetku je lahko številčna ocena, ali pa po novem tudi enočrkovna kratica predmeta!
        tmpZnak1 = ocenaDataList[0].trim().substr(0, 1);
        switch (tmpZnak1) {
            case "1": case "2": case "3": case "4": case "5":
                // ne naredim nič tule. Treba je prebrati oceno, kratice predmeta spredaj ni bilo.
                if (!lo_havePredmetInHeader) {
                    console.log("ERROR: Predmeta ni ne v zaglavju ne pri oceni ... " + tmpImePriimek + " " + tmpOcenaStr);
                };
                break;
            default:
                // spredaj je enočrkovna kratica predmeta. Za kateri predmet gre?
                tmpPredmetKratica1 = tmpZnak1;
                lo_predmet = getPredmetIdByKratica1(tmpPredmetKratica1);
                if (lo_predmet <= 0) {
                    // nov doslej neznan predmet
                    lo_nrPredmetov += 1;
                    lo_predmet = lo_nrPredmetov;
                    lo_nrPredmetPisnihTestov[lo_predmet] = 0; // 26.1.2025
                    [predmetIme[lo_nrPredmetov], predmetKratica[lo_nrPredmetov]] = getPredmetImeKratica3ByKratica1(tmpPredmetKratica1);
                }
                paramId = 1;
                break;
        }

        // ---- ŠTEVILČNA OCENA
        tmpOcenaCifra = ocenaDataList[paramId].trim();
        paramId += 1;

        // ---- TIP OCENE
        tmpOcenaTip = ocenaDataList[paramId].trim().toUpperCase();
        if (tmpOcenaTip.substr(0, 1) == "P") {
            tmpPisnaOcena = true;
        } else {
            tmpPisnaOcena = false;
        };
        // zaporedna številka pisnega ocenjevanja pri tem predmetu (26.1.2025)
        if (tmpPisnaOcena) {
            tmpPisnaOcenaNr = Number(tmpOcenaTip.substr(1, 1));
            if (tmpPisnaOcenaNr > lo_nrPredmetPisnihTestov[lo_predmet]) {
                lo_nrPredmetPisnihTestov[lo_predmet] += 1;
            }
        }
        paramId += 1;

        // ---- DATUM OCENE
        tmpOcenaDatum = ocenaDataList[paramId].trim();
        arrDatumOcene = tmpOcenaDatum.split("-");
        if (arrDatumOcene.length != 3) {
            continue; // ignoriram to oceno s pokvarjenim datumom
        }
        datumOcene.setFullYear(Number("20" + arrDatumOcene[2]), Number(arrDatumOcene[1]) - 1, Number(arrDatumOcene[0]));
        datumOcene.setHours(12, 0, 0, 0);
        datumOceneMs = Date.parse(datumOcene);        
        paramId += 1;

        // VPIS novE OCENE
        lo_nrOcen += 1;
        lo_ocena = lo_nrOcen;
        
        // ---- LINKI OCENE NA LETNIK, RAZRED, PREDMET IN NA UČENCA
        ocenaLetnikId[lo_nrOcen] = lo_letnik;
        ocenaPredmetId[lo_nrOcen] = lo_predmet;
        ocenaRazredId[lo_nrOcen] = lo_razred;
        ocenaUcenecId[lo_nrOcen] = lo_ucenec;
        
        // ---- PODATKI SAME OCENE
        ocenaCifra[lo_nrOcen] = tmpOcenaCifra;
        ocenaCifraNr[lo_nrOcen] = Number(tmpOcenaCifra);
        ocenaTip[lo_nrOcen] = tmpOcenaTip;
        ocenaTipTip[lo_nrOcen] = tmpOcenaTip.substr(0, 1);
        ocenaTipSerialNr[lo_nrOcen] = 0;
        ocenaDatumStr[lo_nrOcen] = tmpOcenaDatum;
        ocenaDatumMs[lo_nrOcen] = datumOceneMs; // 1.2.2025
        // ŠTEVILO DOSEŽENIH IN VSEH MOŽNIH TOČK NA PISNEM TESTU    
        // ---- default število točk
        ocenaTock[lo_nrOcen] = -1;
        ocenaMaxTock[lo_nrOcen] = -1;
        // ---- zdaj pa pogledamo konkretno ...
        if (tmpPisnaOcena) {
            // ---- ŠTEVILO DOSEŽENIH TOČK NA PISNEM TESTU
            tmpOcenaTock = Number(ocenaDataList[paramId].trim());
            paramId += 1;
            // ---- ŠTEVILO MOŽNIH TOČK NA PISNEM TESTU
            tmpOcenaMaxTock = Number(ocenaDataList[paramId].trim());
            // ----
            ocenaTock[lo_nrOcen] = tmpOcenaTock;       // koliko točk je bilo doseženih pri tej oceni
            ocenaMaxTock[lo_nrOcen] = tmpOcenaMaxTock; // koliko je lahko na tstu največ točk
        }
    }
    

}

function getLetnikId(vp_letnikStr) {
    let i;
    for (i = 1; i <= lo_nrLetnikov; i++) {
        if (letnikStr[i] == vp_letnikStr) {
            return i;
        }
    }
    return -1;
}

function getRazredGenId(vp_razredGen) {
    let i;
    for (i = 1; i <= lo_nrRazredGen; i++) {
        if (razredGen[i] == vp_razredGen) {
            return i;
        }
    }
    return -1;
}

function getPredmetId(vp_predmet) {
    let i;
    for (i = 1; i <= lo_nrPredmetov; i++) {
        if (predmetIme[i] == vp_predmet) {
            return i;
        }
    }
    return -1;
}

function getPredmetIdByKratica1(vp_predmetKratica1) {
    let katalogPredmetId = getKatalogPredmetIdByKratica1(vp_predmetKratica1);
    if (katalogPredmetId <= 0) { return -1; };
    // predmet smo našli v katalogu - preberem njegovo ime
    let predmetIme = katalogPredmetovIme[katalogPredmetId];
    let predmetId = getPredmetId(predmetIme);
    if (predmetId > 0) {
        return predmetId
    } else {
        return -1;
    }
}

function getPredmetImeKratica3ByKratica1(vp_predmetKratica1) {
    let katalogPredmetId = getKatalogPredmetIdByKratica1(vp_predmetKratica1);
    if (katalogPredmetId <= 0) {
        return ["", ""];
    };
    // predmet smo našli v katalogu - vrnem njegovo ime in tročrkovno kratico
    return [katalogPredmetovIme[katalogPredmetId], katalogPredmetovKratica3[katalogPredmetId]];
}

function getKatalogPredmetId(vp_imePredmeta) {
    let i;
    for (i = 1; i <= lo_nrKatalogPredmetov; i++) {
        if (katalogPredmetovIme[i] == vp_imePredmeta) {
            return i;
        }
    }
    return -1;
}

function getKatalogPredmetIdByKratica1(vp_predmetKratica1) {
    let i;
    for (i = 1; i <= lo_nrKatalogPredmetov; i++) {
        if (katalogPredmetovKratica1[i] == vp_predmetKratica1) {
            return i;
        }
    }
    return -1;
}

function getRazredId(vp_letnik, vp_crka) {
    let i;
    for (i = 1; i <= lo_nrRazredov; i++) {
        if (razredLetnik[i] == vp_letnik && razredCrka[i] == vp_crka) {
            return i;
        }
    }
    return -1;
}

function getUcenecByRazredImePriimek(vp_razredId, vp_ime, vp_priimek) {
    let i;
    for (i = 1; i <= lo_nrUcencev; i++) {
        if (ucenecRazredId[i] == vp_razredId && ucenecIme[i] == vp_ime && ucenecPriimek[i] == vp_priimek) {
            return i;
        }
    }
    return -1;
}

function calculate_avg_test(vp_letnik, vp_predmet, vp_razredNr, vp_razredCrka, vp_tip) {

    let avgOcena, avgTock, avgPercent;
    let maxTock, lowTock, topTock;
    let maxOcenaCount = 0;
    let ocenaCount = [];
    let ocenaCountPercent = [];
    ocenaCountPercent[1] = 0; ocenaCountPercent[2] = 0; ocenaCountPercent[3] = 0; ocenaCountPercent[4] = 0; ocenaCountPercent[5] = 0;
    let rezultatiImePriimek = []; // 21.1.2025 tabela učencev za vse v tekočem razredu, ki so imeli to preverjanje
    let rezultatiRazred = []; // 25.1.2025 tabela učencev za vse v tekočem razredu, ki so imeli to preverjanje
    let rezultatiTock = [];       // 21.1.2025 tabela doseženih točk za vse v tekočem razredu
    let rezultatiPercent = [];    // 21.1.2025 tabela doseženih procentov za vse v tekočem razredu
    let rezultatiOcena = [];      // 22.1.2025 tabela ocen za vse v tekočem razredu pri tem preverjanju
    //----
    let ocenaRezultatiImePriimek = []; // 23.1.2025 tabela učencev po ocenah za vse v tekočem razredu, ki so imeli to preverjanje
    let ocenaRezultatiRazred = []; // 23.1.2025 tabela učencev po ocenah za vse v tekočem razredu, ki so imeli to preverjanje
    let ocenaRezultatiTock = [];       // 23.1.2025 tabela doseženih točk po ocenah za vse v tekočem razredu
    let ocenaRezultatiPercent = [];    // 23.1.2025 tabela doseženih točk po ocenah za vse v tekočem razredu
    let ocenaRezultatiOcenaIdVRazredu = []
    //----
    let ocenaId;
    for (ocenaId = 1; ocenaId <= 5; ocenaId++) { // 24.1.2025
        ocenaCount[ocenaId] = 0;
        ocenaRezultatiImePriimek[ocenaId] = []; ocenaRezultatiRazred[ocenaId] = []; ocenaRezultatiTock[ocenaId] = []; ocenaRezultatiPercent[ocenaId] = []; ocenaRezultatiOcenaIdVRazredu[ocenaId] = [];
    }

    let ocenaId0, passed, found;
    let myLetnik = getLetnikId(vp_letnik);
    let myPredmet = getPredmetId(vp_predmet);

    let razredCrkaAll = false;
    if (vp_razredCrka == "") { razredCrkaAll = true };
    let myRazred = -1; if (!razredCrkaAll) { myRazred = getRazredId(vp_razredNr, vp_razredCrka); };
    let myRazredGen = -1; if (razredCrkaAll) { myRazredGen = getRazredGenId(Number(vp_razredNr)); };

    //---- Če je karkoli od zahtevanega nedefinirano, potem grem ven
    if (myLetnik < 0 || myPredmet < 0 || (!razredCrkaAll && myRazred < 0) || (razredCrkaAll && myRazredGen < 0)) {
        return [false, 0, 0, 0, 0, 0, 0, 0, ocenaRezultatiImePriimek, ocenaRezultatiRazred, ocenaRezultatiTock, ocenaRezultatiPercent, ocenaRezultatiOcenaIdVRazredu, ocenaCount, ocenaCountPercent, 0, rezultatiImePriimek, rezultatiRazred, rezultatiTock, rezultatiPercent, rezultatiOcena]; // result not valid
    }
    // ---- Najprej poiščem prvo pravo oceno v tabeli vseh ocen
    found = false; // če najdem ustrezno oceno, se found postavi na true in FOR zanka skoči ven
    for (ocenaId = 1; !found; ocenaId++) {
        if (ocenaLetnikId[ocenaId] == myLetnik &&
            ocenaPredmetId[ocenaId] == myPredmet &&
            ((!razredCrkaAll && ocenaRazredId[ocenaId] == myRazred) || (razredCrkaAll && razredLetnik[ocenaRazredId[ocenaId]] == vp_razredNr)) &&
            ocenaTip[ocenaId] == vp_tip) {
            ocenaId0 = ocenaId;
            found = true;
        } else { // če ocena ni ustrezna, se preveri, ali nisem morda že čez celo tabelo ocen. Če sem, skočim ven iz zanke z found==false
            if (ocenaId >= (ocenaTip.length - 1)) { break; };
        }
    }
    if (!found) {
        return [0, 0, 0, 0, 0, 0, 0, ocenaRezultatiImePriimek, ocenaRezultatiRazred, ocenaRezultatiTock, ocenaRezultatiPercent, ocenaRezultatiOcenaIdVRazredu, ocenaCount, ocenaCountPercent, 0, rezultatiImePriimek, rezultatiRazred, rezultatiTock, rezultatiPercent, rezultatiOcena]; // result not valid - not found!
    }

    let ucenecId, ocena, nrOcen, sumOcen, tock, imePriimek, sumTock;
    // ---- smo na prvi ustrezni oceni
    passed = false;
    nrOcen = 0;
    sumOcen = 0; sumTock = 0;
    lowTock = 1000000; topTock = 0; maxOcenaCount = 0;
    for (ocenaId = ocenaId0; !passed && ocenaId <= lo_nrOcen; ocenaId++) {
        // Smo že mimo iskanih ocen?
        if (ocenaLetnikId[ocenaId] != myLetnik ||
            (!razredCrkaAll && ocenaRazredId[ocenaId] != myRazred) ||
            (razredCrkaAll && razredLetnik[ocenaRazredId[ocenaId]] != vp_razredNr)) {
            passed = true;
            break;
        };
        // Če se je spremenil samo tip, sem pač vmes na neki oceni drugega tipa, naslednja pa je spet lahko pravega tipa
        // 28.1.2025 iz breakpogoja izvzel tudi čekiranje predmeta, ker imam lahko zdaj predmet ob vsaki oceni in se to znotraj razreda nahaja vse skupaj zavse predmete
        if (ocenaTip[ocenaId] != vp_tip || ocenaPredmetId[ocenaId] != myPredmet) {
            continue
        };

        // Še smo znotraj iskanih ocen
        ucenecId = ocenaUcenecId[ocenaId];
        ocena = ocenaCifraNr[ocenaId];
        maxTock = ocenaMaxTock[ocenaId];
        tock = ocenaTock[ocenaId];
        imePriimek = ucenecIme[ucenecId] + " " + ucenecPriimek[ucenecId]; // 24.1.2025
        //----
        if (tock < lowTock) { lowTock = tock };
        if (tock > topTock) { topTock = tock };
        //----
        ocenaCount[ocena] += 1;
        ocenaRezultatiImePriimek[ocena][ocenaCount[ocena]] = imePriimek;        // 24.1.2025 
        ocenaRezultatiRazred[ocena][ocenaCount[ocena]] = razredIme[ucenecRazredId[ucenecId]]; // 24.1.2025 
        ocenaRezultatiTock[ocena][ocenaCount[ocena]] = tock;                    // 24.1.2025 
        ocenaRezultatiPercent[ocena][ocenaCount[ocena]] = tock / maxTock * 100; // 24.1.2025
        //----
        if (ocenaCount[ocena] > maxOcenaCount) {
            maxOcenaCount = ocenaCount[ocena];
        }
        //----
        nrOcen += 1;
        sumOcen += ocena;
        sumTock += tock;
        //----
        ocenaRezultatiOcenaIdVRazredu[ocena][ocenaCount[ocena]] = nrOcen; // 24.1.2025
        //---- Znotraj razreda polja: (1) polje vseh imen in priimkov, (2) polje zbranih točk, (3) polje doseženih procentov, (4) polje ocen
        rezultatiImePriimek[nrOcen] = imePriimek;        // 21.1.2025 ta je dosegel toliko točk
        rezultatiRazred[nrOcen] = razredIme[ucenecRazredId[ucenecId]];  // 25.1.2025 ta je dosegel toliko točk
        rezultatiTock[nrOcen] = tock;                    // 21.1.2025 ta je dosegel toliko točk
        rezultatiPercent[nrOcen] = tock / maxTock * 100; // 21.1.2025 ta je dosegel toliko točk
        rezultatiOcena[nrOcen] = ocena;                  // 22.1.2025 ta je dosegel toliko točk
        
    };
    
    // ---- Smo nabrali kakšne ocene?
    if (nrOcen <= 0) {
        return [0, 0, 0, 0, 0, 0, 0, ocenaRezultatiImePriimek, ocenaRezultatiRazred, ocenaRezultatiTock, ocenaRezultatiPercent, ocenaRezultatiOcenaIdVRazredu, ocenaCount, ocenaCountPercent, maxOcenaCount, 0, rezultatiImePriimek, rezultatiRazred, rezultatiTock, rezultatiPercent, rezultatiOcena]; // result not valid - ni ocen!
    }

    // ---- Imamo ocene - izračunaj povprečja in ostalo
    avgOcena = sumOcen / nrOcen;
    avgTock = sumTock / nrOcen;
    avgPercent = avgTock / maxTock * 100;
    //----
    ocenaCountPercent[1] = ocenaCount[1] / nrOcen * 100;
    ocenaCountPercent[2] = ocenaCount[2] / nrOcen * 100;
    ocenaCountPercent[3] = ocenaCount[3] / nrOcen * 100;
    ocenaCountPercent[4] = ocenaCount[4] / nrOcen * 100;
    ocenaCountPercent[5] = ocenaCount[5] / nrOcen * 100;

    return [true, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, ocenaRezultatiImePriimek, ocenaRezultatiRazred, ocenaRezultatiTock, ocenaRezultatiPercent, ocenaRezultatiOcenaIdVRazredu, ocenaCount, ocenaCountPercent, maxOcenaCount, rezultatiImePriimek, rezultatiRazred, rezultatiTock, rezultatiPercent, rezultatiOcena]; // valid result

};

function calculate_avg_ucenec(vp_letnik, vp_ucenecId) {

    //---- 31.1.2025
    let arrOcenaId = [];   // polje linkov na ocene za zahtevanega učenca
    let arrRollAvg = [];   // polje tekočih povprečij ocen za zahtevanega učenca
    let avgOcena = 0;      // skupna povprečna ocena učenca za vse predmet skupaj
    let nrOcen = 0;        // število vseh ocen zahtevanega učenca
    let prvaOcenaDatum = 1e15;  // datum prve ocene učenca
    let zadnjaOcenaDatum = 0;      // datum zadnje ocene učenca
    let arrPredmetOcenaId = [];    // povprečna ocena učenca za vsak predmet posebej
    let arrPredmetRollAvg = [];    // tekoče povprečje ocena učenca za vsak predmet posebej
    let arrPredmetAvgOcena = [];  // povprečna ocena učenca za vsak predmet posebej
    let arrPredmetNrOcen = [];     // število ocen zahtevanega učenca za vsak predmet posebej
    let predmetSumOcen = [];     // vsota ocen zahtevanega učenca znotraj vsakega predmeta posebej

    //----
    let ocenaId, ocenaId0, passed, found, myPredmet;
    let myLetnik = getLetnikId(vp_letnik);

    //---- Če je karkoli od zahtevanega nedefinirano, potem grem ven
    if (myLetnik <= 0) {
        return [arrOcenaId, arrRollAvg, nrOcen, avgOcena, prvaOcenaDatum, zadnjaOcenaDatum, arrPredmetOcenaId, arrPredmetRollAvg, arrPredmetNrOcen, arrPredmetAvgOcena]; // result not valid
    }
    
    // ---- Najprej poiščem prvo pravo oceno v tabeli vseh ocen
    found = false; // če najdem ustrezno oceno, se found postavi na true in FOR zanka skoči ven
    for (ocenaId = 1; !found; ocenaId++) {
        if (ocenaLetnikId[ocenaId] == myLetnik && ocenaUcenecId[ocenaId] == vp_ucenecId) {
            found = true;
            ocenaId0 = ocenaId;
        } else { // če ocena ni ustrezna, se preveri, ali nisem morda že čez celo tabelo ocen. Če sem, skočim ven iz zanke z found==false
            if (ocenaId >= (ocenaTip.length - 1)) { break; };
        }
    }
    if (!found) {
        return [arrOcenaId, arrRollAvg, nrOcen, avgOcena, prvaOcenaDatum, zadnjaOcenaDatum, arrPredmetOcenaId, arrPredmetRollAvg, arrPredmetNrOcen, arrPredmetAvgOcena]; // result not valid - not found!
    }

    let ocena, predmetId, sumOcen;
    let arrDatumOcene = [];
    let datumOcene = new Date();
    let datumOceneMs;
    
    // ---- smo na prvi ustrezni oceni
    passed = false;
    nrOcen = 0;
    sumOcen = 0;
    for (predmetId = 1; predmetId <= lo_nrPredmetov; predmetId++) {
        arrPredmetOcenaId[predmetId] = []; arrPredmetRollAvg[predmetId] = []; arrPredmetAvgOcena[predmetId] = 0; arrPredmetNrOcen[predmetId] = 0; predmetSumOcen[predmetId] = 0;
    }  
    for (ocenaId = ocenaId0; !passed && ocenaId <= lo_nrOcen; ocenaId++) {
        // Smo že mimo iskanih ocen?
        if (ocenaLetnikId[ocenaId] != myLetnik || ocenaUcenecId[ocenaId] != vp_ucenecId) {
            passed = true;
            break;
        };

        // Še smo znotraj iskanih ocen
        ocena = ocenaCifraNr[ocenaId];
        predmetId = ocenaPredmetId[ocenaId];

        //imePriimek = ucenecIme[ucenecId] + " " + ucenecPriimek[ucenecId]; // 24.1.2025
        //----

        // ---- DATUM OCENE in vse povezano z njim ----

        // naštelam datum na 1.1.1970 12:0:0.0
        //let datumOcene = new Date();
        //datumOcene.setFullYear(1970, 0, 1);
        //datumOcene.setHours(12, 0, 0, 0);

        arrDatumOcene = ocenaDatumStr[ocenaId].split("-");
        if (arrDatumOcene.length != 3) {
            continue; // ignoriram to oceno s pokvarjenim datumom
        }
        datumOcene.setFullYear(Number("20" + arrDatumOcene[2]), Number(arrDatumOcene[1]) - 1, Number(arrDatumOcene[0]));
        datumOcene.setHours(12, 0, 0, 0);
        datumOceneMs = Date.parse(datumOcene);
        if (datumOceneMs < prvaOcenaDatum) { prvaOcenaDatum = datumOceneMs };
        if (datumOceneMs > zadnjaOcenaDatum) { zadnjaOcenaDatum = datumOceneMs };

        //----
        nrOcen += 1;
        arrOcenaId[nrOcen] = ocenaId;
        sumOcen += ocena;
        arrRollAvg[nrOcen] = sumOcen / nrOcen; // 1.2.2025
        //----
        //if (arrPredmetNrOcen[predmetId].length <= 0) { arrPredmetNrOcen[predmetId] = 0 };
        arrPredmetNrOcen[predmetId] += 1;
        arrPredmetOcenaId[predmetId][arrPredmetNrOcen[predmetId]] = ocenaId;
        predmetSumOcen[predmetId] += ocena;
        arrPredmetRollAvg[predmetId][nrOcen] = predmetSumOcen[predmetId] / arrPredmetNrOcen[predmetId]; // 1.2.2025

    };
    
    // ---- Smo nabrali kakšne ocene?
    if (nrOcen <= 0) {
        return [arrOcenaId, arrRollAvg, nrOcen, avgOcena, prvaOcenaDatum, zadnjaOcenaDatum, arrPredmetOcenaId, arrPredmetRollAvg, arrPredmetNrOcen, arrPredmetAvgOcena]; // result not valid - ni ocen!
    }

    // ---- Imamo ocene - izračunaj povprečja in ostalo
    avgOcena = sumOcen / nrOcen;
    //----
    for (let predmetId = 1; predmetId <= lo_nrPredmetov; predmetId++) {
        arrPredmetAvgOcena[predmetId] = (arrPredmetNrOcen[predmetId] <= 0) ? 0 : predmetSumOcen[predmetId] / arrPredmetNrOcen[predmetId];
    }

    return [arrOcenaId, arrRollAvg, nrOcen, avgOcena, prvaOcenaDatum, zadnjaOcenaDatum, arrPredmetOcenaId, arrPredmetRollAvg, arrPredmetNrOcen, arrPredmetAvgOcena];; // valid result

};

function calculate_avg_test_old(vp_letnik, vp_predmet, vp_razredNr, vp_razredCrka, vp_tip) {

    let avgOcena, avgTock, avgPercent;
    let maxTock, lowTock, topTock;
    let nr1, nr2, nr3, nr4, nr5;
    let nr1percent, nr2percent, nr3percent, nr4percent, nr5percent;

    let ocenaId, ocenaId0, passed, found;
    let myLetnik = getLetnikId(vp_letnik);
    let myPredmet = getPredmetId(vp_predmet);
    let myRazred = getRazredId(vp_razredNr, vp_razredCrka);
    if (myLetnik < 0 || myPredmet < 0 || myRazred < 0) {
        return [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // result not valid
    }
    // ---- Najprej poiščem prvo pravo oceno v tabeli vseh ocen
    found = false;
    for (ocenaId = 1; !found; ocenaId++) {
        if (ocenaLetnikId[ocenaId] == myLetnik && ocenaPredmetId[ocenaId] == myPredmet && ocenaRazredId[ocenaId] == myRazred && ocenaTip[ocenaId] == vp_tip) {
            ocenaId0 = ocenaId;
            found = true;
        }
    }
    if (!found) {
        return [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // result not valid - not found!
    }

    let ucenecId, ocena, nrOcen, sumOcen, tock, sumTock;
    // ---- smo na prvi ustrezni oceni
    passed = false;
    nrOcen = 0;
    sumOcen = 0; sumTock = 0;
    lowTock = 1000000; topTock = 0;
    nr1 = 0; nr2 = 0; nr3 = 0; nr4 = 0; nr5 = 0;
    for (ocenaId = ocenaId0; !passed && ocenaId <= lo_nrOcen; ocenaId++) {
        // Smo že mimo iskanih ocen?
        if (ocenaLetnikId[ocenaId] != myLetnik || ocenaPredmetId[ocenaId] != myPredmet || ocenaRazredId[ocenaId] != myRazred) {
            pass = true;
            break;
        };
        // Če se je spremenil samo tip, sem pač vmes na neki oceni drugega tipa, naslednja pa je spet lahko pravega tipa
        if (ocenaTip[ocenaId] != vp_tip) {
            continue
        };
        // Še smo znotraj iskanih ocen
        ucenecId = ocenaUcenecId[ocenaId];
        ocena = ocenaCifraNr[ocenaId];
        maxTock = ocenaMaxTock[ocenaId];
        tock = ocenaTock[ocenaId];
        //----
        if (tock < lowTock) { lowTock = tock };
        if (tock > topTock) { topTock = tock };
        //----
        switch (ocena) {
            case 1: nr1 += 1; break;
            case 2: nr2 += 1; break;
            case 3: nr3 += 1; break;
            case 4: nr4 += 1; break;
            case 5: nr5 += 1; break;
        }
        //----
        nrOcen += 1;
        sumOcen += ocena;
        sumTock += tock;
    };
    
    // ---- Smo nabrali kakšne ocene?
    if (nrOcen<=0) {
        return [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // result not valid - ni ocen!
    }

    // ---- Imamo ocene - izračunaj povprečja in ostalo
    avgOcena = sumOcen / nrOcen;
    avgTock = sumTock / nrOcen;
    avgPercent = avgTock / maxTock * 100;
    //----
    nr1percent = nr1 / nrOcen * 100;
    nr2percent = nr2 / nrOcen * 100;
    nr3percent = nr3 / nrOcen * 100;
    nr4percent = nr4 / nrOcen * 100;
    nr5percent = nr5 / nrOcen * 100;

    return [true, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent]; // valid result

};

function test_avg_8A() {
    let valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent   
    ;[valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent] = calculate_avg_test("2425", "FIZIKA", "8", "A", "P1");
    console.log("8A == ", valid, nrOcen, avgOcena.toFixed(2), avgTock.toFixed(2), avgPercent.toFixed(2) + "%", maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent.toFixed(2) + "%", nr2percent.toFixed(2) + "%", nr3percent.toFixed(2) + "%", nr4percent.toFixed(2) + "%", nr5percent.toFixed(2) + "%");
}
function test_avg_8B() {
    let valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent   
    ;[valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent] = calculate_avg_test("2425", "FIZIKA", "8", "B", "P1");
    console.log("8B == ", valid, nrOcen, avgOcena.toFixed(2), avgTock.toFixed(2), avgPercent.toFixed(2) + "%", maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent.toFixed(2) + "%", nr2percent.toFixed(2) + "%", nr3percent.toFixed(2) + "%", nr4percent.toFixed(2) + "%", nr5percent.toFixed(2) + "%");
}
function test_avg_9A() {
    let valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent   
    ;[valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent] = calculate_avg_test("2425", "FIZIKA", "9", "A", "P1");
    console.log("9A == ", valid, nrOcen, avgOcena.toFixed(2), avgTock.toFixed(2), avgPercent.toFixed(2) + "%", maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent.toFixed(2) + "%", nr2percent.toFixed(2) + "%", nr3percent.toFixed(2) + "%", nr4percent.toFixed(2) + "%", nr5percent.toFixed(2) + "%");
}
function test_avg_9B() {
    let valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent   
    ;[valid, nrOcen, avgOcena, avgTock, avgPercent, maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent, nr2percent, nr3percent, nr4percent, nr5percent] = calculate_avg_test("2425", "FIZIKA", "9", "B", "P1");
    console.log("9B == ", valid, nrOcen, avgOcena.toFixed(2), avgTock.toFixed(2), avgPercent.toFixed(2) + "%", maxTock, lowTock, topTock, nr1, nr2, nr3, nr4, nr5, nr1percent.toFixed(2) + "%", nr2percent.toFixed(2) + "%", nr3percent.toFixed(2) + "%", nr4percent.toFixed(2) + "%", nr5percent.toFixed(2) + "%");
}
function test_avg_all() {
    test_avg_8A();
    test_avg_8B();
    test_avg_9A();
    test_avg_9B();
}

function paint_barChart_byOcena(vp_x, vp_y, vp_w, vp_h, vp_itemId, arrOcene, maxOcenaCount, vp_title) {
    
    const marginChart = 10;
    const gapChart = 5;
    const gapBar = 4;
    const wBar = (vp_w - 2 * marginChart - 2 * gapChart) / 5;
    let y0 = vp_y + vp_h - marginChart;
    let ky = (vp_h - 65) / maxOcenaCount; // na vrhu je še naslov, ki ga stolpci ne bi smeli prekriti
    let xm1 = vp_x + marginChart + gapChart + wBar / 2; // sredina prvega bara
    let wBarFinal = wBar - 2 * gapBar;

    //---- shrani lastnosti digrama za mouseOver() event (24.1.2025)
    bcChartX[vp_itemId] = [];
    bcChartY[vp_itemId] = [];
    bcChartX1[vp_itemId] = [];
    bcChartY1[vp_itemId] = [];
    
    let i, tmpHeight, tmpText, w, h, y, x1, y1, barColor, countOcenColor, yTabletTop, yTextBase;
    let fontOcena = "bold 12pt verdana";
    if (vp_w > 150 && vp_h > 150) { fontOcena = "bold 13pt verdana"; };
    if (vp_w > 250 && vp_h > 250) { fontOcena = "bold 14pt verdana"; };
    if (vp_w > 350 && vp_h > 350) { fontOcena = "bold 15pt verdana"; };
    let fontNr = "10pt verdana";
    let fontTitle = "bold 16pt verdana";
    // ---- Grem po vrsti čez vse ocene od 1 do 5
    
    let xm = xm1;
    for (i = 1; i <= 5; i++) {
        
        //---- shrani lastnosti digrama za mouseOver() event (24.1.2025)
        bcChartX[vp_itemId][i] = 0;
        bcChartY[vp_itemId][i] = 0;
        bcChartX1[vp_itemId][i] = 0;
        bcChartY1[vp_itemId][i] = 0;

        if (arrOcene[i] > 0) {

            // ---- BAR
            x = xm - wBar / 2 + gapBar;
            tmpHeight = ky * arrOcene[i];
            y = y0 - tmpHeight - 1;
            //gBannerRoundRect(x, y0 - 13, wBarFinal, backHeight, 8, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true);
            barColor = colorOcena[i]; countOcenColor = "darkSlateGray";
            if (lo_bcChartSelectedId == vp_itemId && lo_ocenaSelected != i) { // 24.1.2025
                barColor = gf_alphaColor(255 - i * 40, "lightGray");
                countOcenColor = "lightGray"; // 24.1.2025
            }
            gBannerRoundRect2(x, y, wBarFinal, tmpHeight, 6, barColor, 1, "silver", "#DCDCDCC0", 3, 3, false, true, true, false, false);
            //---- shrani lastnosti digrama za mouseOver() event (24.1.2025)
            bcChartX[vp_itemId][i] = x;
            bcChartY[vp_itemId][i] = y;
            bcChartX1[vp_itemId][i] = x + wBarFinal;
            bcChartY1[vp_itemId][i] = y0;

            // ---- TABLETEK OCENE
            tmpText = Number(i);
            ;[w, h] = gMeasureText(tmpText, fontOcena);
            yTabletTop = y0 - h - 6;
            gBannerRoundRectWithText(xm - w / 2 - 1, yTabletTop, w, h, fontOcena, barColor, tmpText, 2, 2, 7, "white", 1, "lightGray", "#DCDCDCC0", 2, 2, false);
    
            // ---- ŠTEVILO OCEN
            tmpText = Number(arrOcene[i]);
            ;[w, h] = gMeasureText(tmpText, fontNr);
            yTextBase = y0 - tmpHeight - 4;
            if (yTextBase < (yTabletTop - 2)) {
                gText(tmpText, fontNr, countOcenColor, xm - w / 2 - 1, yTextBase);
            } else {
                gText(tmpText, fontNr, countOcenColor, xm - w / 2 - 1 + 13, yTextBase);
            }
            
        }
        xm += wBar; // tale pomik mora biti v vsakem primeru, pa če bom risal bar ali ne (26.1.2025)
    }

    // ---- VODORAVNA ČRTA KOT OSNOVA GRAFA
    gLine(vp_x + marginChart, y0, vp_x + vp_w - marginChart, y0, 1, "darkSlateGray", []);

    // ---- POVPREČNA OCENA
    x = xm1 - wBar;
    x += avgOcena[vp_itemId] * wBar;
    //gBannerRect(x - 1, y0, 3, 4, 0, 0, "cyan", 1, "darkSlateGray", "", 0, 0, false);
    //gBannerRect(x - 1, y0 + 7, 3, 4, 0, 0, "cyan", 1, "darkSlateGray", "", 0, 0, false);
    //gBannerRect(x - 1, y0 + 14, 3, 4, 0, 0, "cyan", 1, "darkSlateGray", "", 0, 0, false);
    w = 3; h = 7;
    //ctx.beginPath(); ctx.moveTo(x, y0 + 3); ctx.lineTo(x + w, y0 + 3 + h); ctx.lineTo(x, y0 + 3 + 2 * h); ctx.lineTo(x - w, y0 + 3 + h); ctx.closePath();
    //ctx.strokeStyle = "darkSlateGray"; ctx.lineWidth = 2; ctx.stroke();
    //ctx.fillStyle = "darkTurquoise"; ctx.fill();
    //gLik(x, y0 + 3, [w, 0, -w], [h, 2 * h, h], "darkTurquoise", 1, "darkSlateGray", []); // diamond
    gLik(x, y0 + 3, [w, w, -w, -w], [h, 2 * h - 2, 2 * h - 2, h], "darkTurquoise", 1, "darkSlateGray", []); // vPointer
    gText("avg", "9pt verdana", "darkSlateGray", x - 29, y0 + 14);
    gText(avgOcena[vp_itemId].toFixed(2), "9pt verdana", "darkSlateGray", x + 7, y0 + 14);

    // ---- NASLOV GRAFA
    tmpText = vp_title;
    ;[w, h] = gMeasureText(tmpText, fontTitle);
    x = vp_x + vp_w / 2 - w / 2;
    y = vp_y + h + 4;
    if (lo_showGUI && y < 60 && x > (ctxW - 245)) {
        y = 60;
        if (x > (ctxW - 160)) { x = ctxW - 160; }
    };
    gText(tmpText, fontTitle, "darkGray", x + 3, y + 3);
    gText(tmpText, fontTitle, "powderBlue", x + 2, y + 2);
    gText(tmpText, fontTitle, "darkSlateGray", x, y);

};

function paint_pieChart_byOcenaShare(vp_x, vp_y, vp_w, vp_h, vp_razredId, arrOcene, vp_nrOcen) {
    
    const marginChart = 10;
    let maxDim = Math.min(vp_w, vp_h);
    const radij = (maxDim - 2 * marginChart) / 2;
    let cx = vp_x + vp_w / 2;
    let cy = vp_y + vp_h / 2;

    //---- shrani lastnosti digrama za mouseOver() event (23.1.2025)
    pcChartCx[vp_razredId] = cx;
    pcChartCy[vp_razredId] = cy;
    pcChartRadij[vp_razredId] = radij;
    pcChartFi[vp_razredId] = [];
    
    let i, tmpText, w, h, x, y, pieColor;
    let fontOcena = "bold 12pt verdana";
    if (vp_w > 150 && vp_h > 150) { fontOcena = "bold 13pt verdana"; };
    if (vp_w > 250 && vp_h > 250) { fontOcena = "bold 14pt verdana"; };
    if (vp_w > 350 && vp_h > 350) { fontOcena = "bold 15pt verdana"; };
    let fontNr = "10pt verdana";
    let fontTitle = "bold 16pt verdana";
    //---- Zanka po vseh petih ocenah pri tem konkretnem razredu
    let fi = 0; let fi1 = 0;
    pcChartFi[vp_razredId][0] = 0; // 23.1.2025
    for (i = 1; i <= 5; i++) {

        if (arrOcene[i] > 0) {

            // ---- PIE CHART PIECE
            fi1 = fi + arrOcene[i] / vp_nrOcen * 2 * Math.PI;
            pieColor = colorOcena[i];
            if (lo_pcChartSelectedId == vp_razredId && lo_ocenaSelected != i) { // 24.1.2025
                pieColor = gf_alphaColor(255 - i * 40, "lightGray");
            }
            gArc(cx, cy, radij, fi, fi1, pieColor, 1, "lightGray");

            // ---- TABLETEK OCENE
            tmpText = i.toString();
            ;[w, h] = gMeasureText(tmpText, fontOcena);
            x = cx + Math.cos((fi + fi1) / 2) * radij * 0.4 - w / 2;
            y = cy - Math.sin((fi + fi1) / 2) * radij * 0.4 - h / 2;
            gBannerRoundRectWithText(x, y, w, h, fontOcena, pieColor, tmpText, 2, 2, 7, "white", 1, "lightGray", "#DCDCDCC0", 2, 2, false);
    
            // ---- DELEŽ OCEN
            tmpText = (Math.round(arrOcene[i] / vp_nrOcen * 100 * 10) / 10).toFixed(1) + "%";
            ;[w, h] = gMeasureText(tmpText, fontNr);
            x = cx + Math.cos((fi + fi1) / 2) * radij * 0.75 - w / 2;
            y = cy - Math.sin((fi + fi1) / 2) * radij * 0.75 + h / 2;
            gText(tmpText, fontNr, "black", x, y);

            fi = fi1;

        }
        
        pcChartFi[vp_razredId][i] = fi; // 23.1.2025

    }

};

function paint_scatterPlotChart_byRazprsenost(
    vp_x, vp_y, vp_w, vp_h,
    vp_itemId,
    arrOcene, vp_nrOcen, vp_maxTock, vp_lowTock, vp_topTock, vp_avgTock, vp_avgPercent,
    arrImePriimek, arrTock, arrPercent, arrOcena, arrKriteriji,
    Q1, Q2, Q3) {
    
    let marginChartH = 10;
    if (vp_w > 100) {
        marginChartH = 0.3 * vp_w
    };
    const marginChartV = 10;
    const wTextArea = 20;
    const gapChart = 5;
    const gapChartR = 2;
    let yXos = vp_y + vp_h - marginChartV - 10;
    let yTop = vp_y + marginChartV;
    let yRange = yXos - yTop;
    let ky = (yRange) / vp_maxTock; // na vrhu je še naslov, ki ga stolpci ne bi smeli prekriti
    let kyp = ky * vp_maxTock / 100; // na vrhu je še naslov, ki ga stolpci ne bi smeli prekriti
    let xYos = vp_x + marginChartH + wTextArea;
    let x0 = xYos + gapChart; // začetek risanja markerjev rezultatov
    let wChart = 30; if (lo_byRazredGen) { wChart = 50 };
    let x1 = x0 + wChart;
    let xRight = x1 + gapChartR;

    //---- shrani lastnosti digrama za mouseOver() event (22.1.2025)
    spChartX[vp_itemId] = x0;
    spChartY[vp_itemId] = yTop;
    spChartW[vp_itemId] = wChart;
    spChartH[vp_itemId] = yRange;
    spChartX1[vp_itemId] = x1;
    spChartY1[vp_itemId] = yXos;
    spChartKy[vp_itemId] = ky;
    spChartKyp[vp_itemId] = kyp;
    //spChartSelected[vp_itemId] = false;

    //----
    let i, tmpText, w, h, x, y;
    let tmpTock;
    let fontOcena = "bold 12pt verdana";
    if (vp_w > 150 && vp_h > 150) { fontOcena = "bold 13pt verdana"; };
    if (vp_w > 250 && vp_h > 250) { fontOcena = "bold 14pt verdana"; };
    if (vp_w > 350 && vp_h > 350) { fontOcena = "bold 15pt verdana"; };
    let fontAxisText = "10pt verdana";
    let fontAxisTextBold = "bold 10pt verdana";
    
    let y0, y1, y4;
    addKritPercent = 0;  // da je meja med kriteriji obarvana v barvi višje ocene od teh dveh, ne nižje od teh dveh
    if (lo_zaokrozujNaCeleProcente) { addKritPercent = 0.5 };
    //---- OBMOČJE OCENE 5
    tmpH = kyp * (100 - arrKriteriji[3] + addKritPercent); // (100-90)+addKP
    y0 = yTop;
    y1 = yTop + tmpH;
    gBannerRect(xYos + 6, yTop, xRight - xYos, tmpH + 10, 3, 3, colorOcena[5], 1, "lightGray", "", 0, 0, false);
    gBannerRect(xYos + 6, y1, xRight - xYos, 10, 0, 0, bckgColor, 0, "", "", 0, 0, false); // brisanje zaobljenosti
    //---- OBMOČJE OCENE 1
    tmpH = kyp * (arrKriteriji[0] - 1 + addKritPercent); // (50-1)+addKP
    y0 = yXos - tmpH;
    y1 = yXos;
    gBannerRect(xYos + 6, y0 - 10, xRight - xYos, tmpH + 10, 3, 3, colorOcena[1], 1, "lightGray", "", 0, 0, false);
    gBannerRect(xYos + 6, y0 - 10, xRight - xYos, 10, 0, 0, bckgColor, 0, "", "", 0, 0, false); // brisanje zaobljenosti
    //---- ---- OBMOČJE OCENE 4
    tmpH = kyp * (arrKriteriji[3] - 1 - arrKriteriji[2] + 2 * addKritPercent); // (90-1+addKP)-(76-addKP)=90-1-76-2*addKP
    y0 = yXos - kyp * (arrKriteriji[3] - 1 + addKritPercent);
    y1 = y0 + tmpH;
    gBannerRect(xYos + 6, y0, xRight - xYos, tmpH, 0, 0, colorOcena[4], 1, "lightGray", "", 0, 0, false);
    //---- OBMOČJE OCENE 3
    tmpH = kyp * (arrKriteriji[2] - 1 - arrKriteriji[1] + 2 * addKritPercent); // (76-1+addKP)-(63-addKP)=76-1-63-2*addKP
    y0 = yXos - kyp * (arrKriteriji[2] - 1 + addKritPercent);
    y1 = y0 + tmpH;
    gBannerRect(xYos + 6, y0, xRight - xYos, tmpH, 0, 0, colorOcena[3], 1, "lightGray", "", 0, 0, false);
    //---- OBMOČJE OCENE 2
    tmpH = kyp * (arrKriteriji[1] - 1 - arrKriteriji[0] + 2 * addKritPercent); // (63-1+addKP)-(50-addKP)=63-1-50-2*addKP
    y0 = yXos - kyp * (arrKriteriji[1] - 1 + addKritPercent);
    y1 = y0 + tmpH;
    gBannerRect(xYos + 6, y0, xRight - xYos, tmpH, 0, 0, colorOcena[2], 1, "lightGray", "", 0, 0, false);

    //---- pravokotnik, v katerega se riše markerje rezultatov
    gBannerRect(xYos, yTop, xRight - xYos, yXos - yTop, 3, 3, "azure", 1, "lightGray", "", 0, 0, false);

    
    // ---- OZNAKE MAX IN MIN TOČK/%
    tmpText = vp_maxTock.toString();
    ;[w, h] = gMeasureText(tmpText, fontAxisText);
    x = xYos - w - 3;
    y = yTop + h;
    gText(tmpText, fontAxisText, "darkSlateGray", x, yTop);
    //----
    tmpText = "0";
    ;[w, h] = gMeasureText(tmpText, fontAxisText);
    x = xYos - w - 3;
    gText(tmpText, fontAxisText, "darkSlateGray", x, yXos + h / 2);
    //----
    let addY = 0; if (vp_topTock == vp_topTock) { addY = 3 };
    gText("100%", fontAxisText, "darkSlateGray", xRight + 6, yTop - addY);
    gText("0%", fontAxisText, "darkSlateGray", xRight + 7, yXos + h / 2);


    //---- Označiti je treba področje chartu izbrane ocene v scatter plot chartu, če je ta ocena selektirana v bar/pie chartu
    let krit0, krit1;
    if (lo_ocenaSelected > 0 && ((drawBarChart && lo_bcChartSelectedId == vp_itemId) || (drawPieChart && lo_pcChartSelectedId == vp_itemId))) {
        // Označiti je treba področje te izbrane ocene v scatter plot chartu
        [krit0, krit1] = getKriterijiOcene(lo_ocenaSelected);
        let r1, r2, r3, r4 = false; if (lo_ocenaSelected == 1) { r3 = true; r4 = true; } else if (lo_ocenaSelected == 5) { r1 = true; r2 = true; };
        tmpH = kyp * (krit1 - krit0);
        y = yXos - kyp * krit1;
        y1 = y + tmpH;
        gBannerRoundRect2(xYos, y, xRight - xYos, tmpH, 6, gf_alphaColor(48, colorOcena[lo_ocenaSelected]), 0, "", "", 0, 0, false, r1, r2, r3, r4);
    }
    

    //---- Zanka po vseh ocenjenih preverjanjih pri tem konkretnem razredu
    x = x0 + 1;
    let colorId;
    for (i = 1; i <= vp_nrOcen; i++) {

        // ---- MARKER ZA VSAK REZULTAT PREVERJANJA
        tmpTock = arrTock[i];
        y = yXos - ky * tmpTock;
        colorId = i - 10 * (Math.trunc((i - 1) / 10)) - 1;
        gEllipse(x, y, 2, 3, 0, rsltColor[colorId], 0, "");
        //----
        if (lo_ocenaSelected == arrOcena[i] && ((drawBarChart && lo_bcChartSelectedId == vp_itemId) || (drawPieChart && lo_pcChartSelectedId == vp_itemId))) {
            gEllipse(x, y, 7, 7, 0, "", 4, rsltColor[colorId]);
        }
        //----
        x += 1;
    }

    //---- AVG
    x = x1 - 10;
    y = yXos - ky * vp_avgTock;
    let yAvg = y;
    gLine(xYos - 8, yAvg, xRight + 59, yAvg, 2, "darkSlategray", [3, 3]);
    // ---- AVG točk
    tmpText = "avg.";
    ;[w, h] = gMeasureText(tmpText, fontAxisText);
    x = xYos - w - 5;
    //gText(tmpText, fontAxisText, "darkSlateGray", x, y - 4);
    //gText(tmpText, fontAxisText, "darkSlateGray", xRight + 10, yAvg - 4);
    tmpText = vp_avgTock.toFixed(1);
    ;[w, h] = gMeasureText(tmpText, fontAxisText);
    x = xYos - w - 10;
    gText(tmpText, fontAxisText, "darkSlateGray", x, yAvg + h / 2 - 1);
    gText("avg.", fontAxisText, "darkSlateGray", x, yAvg - h - 2);
    // ---- AVG %
    tmpText = vp_avgPercent.toFixed(1) + "%";
    gText(tmpText, fontAxisTextBold, "darkSlateGray", xRight + 60, yAvg + h / 2 - 1);

    //---- Q1
    const wSkatla = 16;
    let wSkatlaHalf = wSkatla / 2;
    x = xRight + 14;
    let yQlow = yXos - ky * vp_lowTock;
    let yQ1 = yXos - ky * Q1;
    let yQ2 = yXos - ky * Q2;
    let yQ3 = yXos - ky * Q3;
    let yQtop = yXos - ky * vp_topTock;
    //---- škatla
    gBannerRect(x, yQ3, wSkatla, yQ1 - yQ3, 0, 0, "#A0A0A040", 0, "", "", 0, 0, false);
    //----
    gLine(x, yQlow, x + wSkatla, yQlow, 1, "darkSlategray", []);
    gLine(x, yQ1, x + wSkatla, yQ1, 1, "darkSlategray", []);
    gLine(x, yQ2, x + wSkatla, yQ2, 3, "darkSlategray", []);
    gLine(x, yQ3, x + wSkatla, yQ3, 1, "darkSlategray", []);
    gLine(x, yQtop, x + wSkatla, yQtop, 1, "darkSlategray", []);
    //----
    gLine(x, yQ1, x, yQ3, 1, "darkSlategray", []);
    gLine(x + wSkatla, yQ1, x + wSkatla, yQ3, 1, "darkSlategray", []);
    gLine(x + wSkatlaHalf, yQlow, x + wSkatlaHalf, yQ1, 1, "darkSlategray", []);
    gLine(x + wSkatlaHalf, yQ3, x + wSkatlaHalf, yQtop, 1, "darkSlategray", []);

    // ---- IZPIS "Me" desno od črtice mediane. A če se mediana preveč približa Avg-ju, izpis "Me" malce spustim ali zvišam, da se ne prekriva s črto za Avg. (30.1.2025)
    y = yQ2 + h / 2 - 1;
    if (yQ2 <= yAvg && y > (yAvg - 1)) { y = yAvg - 2; }
    else if (yQ2 > yAvg && (y - h) < (yAvg + 1)) { y = yAvg + h + 3; };
    gText("Me", fontAxisTextBold, "darkSlateGray", xRight + 32, y);

    //---- Q3, MEDIANA, Q1
    x += wSkatla + 5;
    //----
    tmpText = "Q3: " + Q3.toString() + "/" + (Q3 / vp_maxTock * 100).toFixed(1) + "%";
    ;[w, h] = gMeasureText(tmpText, fontAxisText);
    gText(tmpText, fontAxisText, "darkSlateGray", x, yQ3 + 1 * h / 2);
    //----
    tmpText = "Me: " + Q2.toString() + "/" + (Q2 / vp_maxTock * 100).toFixed(1) + "%";
    gText(tmpText, fontAxisTextBold, "darkSlateGray", x, yQ3 + 3 * h / 2 + 3);
    //----
    tmpText = "Q1: " + Q1.toString() + "/" + (Q1 / vp_maxTock * 100).toFixed(1) + "%";
    gText(tmpText, fontAxisText, "darkSlateGray", x, yQ3 + 5 * h / 2 + 6);
    //---- TOPMOST RESULT
    if (vp_topTock < vp_maxTock) {
        tmpText = "top: " + vp_topTock.toString() + "/" + (vp_topTock / vp_maxTock * 100).toFixed(1) + "%";
        gText(tmpText, fontAxisText, "darkSlateGray", x, yQtop + h / 2 - 1);
    }
    //---- LOWEST RESULT
    if (vp_lowTock > 0) {
        tmpText = "low: " + vp_lowTock.toString() + "/" + (vp_lowTock / vp_maxTock * 100).toFixed(1) + "%";
        gText(tmpText, fontAxisText, "darkSlateGray", x, yQlow + h / 2 - 1);
    }

};

function calculate_kvartili(vp_nrOcen, vp_tock) {
    //---------------------------------------
    // vp_nrOcen ... število rezultatov testov v polju vp_tock[], kjer je prvi rezultat na indeksu [1], zadnji pa na [vp_nrOcen]. Tisti na indeksu [0] je irelevantean!
    // vp_tock[] ... polje, kjer se uporabne vrdnosti prinejo na indexu 1 !
    // ----------
    // funkcija vrne [Q1, Me, Q3]
    //---------------------------------------

    let sTock = [];

    if (vp_nrOcen <= 0) { return [0, 0, 0]; };
    if (vp_nrOcen == 1) { return [vp_tock[1], vp_tock[1], vp_tock[1]]; };

    sTock = vp_tock.slice(0); // kopija polja rezultatov, ker sortiranje s .sort() spremeni polje, ki ga sortiraš
    sTock.sort(function(a, b){return a - b});
    
    if (vp_nrOcen == 2) {
        sTock = vp_tock.slice(1); // kopija polja rezultatov, ker sortiranje s .sort() spremeni polje, ki ga sortiraš
        sTock.sort(function(a, b){return a - b});
        return [sTock[0], (sTock[0] + sTock[1]) / 2, sTock[1]]; // sTock[] se začne na indexu 0!!!
    };

    // ---- Imam 4 ali več elementov, ki jih zdaj najprej presortiram po velikosti od najmanjšega do največjega
    sTock = vp_tock.slice(1); // kopija polja rezultatov, ker sortiranje s .sort() spremeni polje, ki ga sortiraš
    sTock.sort(function (a, b) { return a - b });
    
    // ---- Imam presortirano polje 4 ali več elementov
    let idMiddleDown, idMiddleUp, idMiddle, idLeftUp, idRightDown;

    // ---- MEDIANA
    let Q2;
    let sodoAll = false;
    if (2 * Math.trunc(vp_nrOcen / 2) == vp_nrOcen) { sodoAll = true };
    if (sodoAll) {
        idMiddleDown = Math.trunc(vp_nrOcen / 2);
        idMiddleUp = idMiddleDown + 1;
        Q2 = (sTock[idMiddleDown - 1] + sTock[idMiddleUp - 1]) / 2; // sTock[] se začne na indexu 0!!!
        //----
        idLeftUp = idMiddleDown;
        idRightDown = idMiddleUp;
    } else {
        idMiddle = 1 + Math.trunc(vp_nrOcen / 2);
        Q2 = sTock[idMiddle - 1]; // sTock[] se začne na indexu 0!!!
        //----
        idLeftUp = idMiddle;
        idRightDown = idMiddle;
    }

    // ---- Q1
    let Q1;
    let nrLeft = idLeftUp;
    let sodoLeft = false;
    if (2 * Math.trunc(nrLeft / 2) == nrLeft) { sodoLeft = true };
    if (sodoLeft) {
        idMiddleDown = Math.trunc(nrLeft / 2);
        idMiddleUp = idMiddleDown + 1;
        Q1 = (sTock[idMiddleDown - 1] + sTock[idMiddleUp - 1]) / 2; // sTock[] se začne na indexu 0!!!
    } else {
        idMiddle = 1 + Math.trunc(nrLeft / 2);
        Q1 = sTock[idMiddle - 1]; // sTock[] se začne na indexu 0!!!
    }

    // ---- Q3
    let Q3;
    let nrRight = vp_nrOcen - idRightDown + 1;
    let sodoRight = false;
    if (2 * Math.trunc(nrRight / 2) == nrRight) { sodoRight = true };
    if (sodoRight) {
        idMiddleDown = idRightDown + Math.trunc(nrRight / 2) - 1;
        idMiddleUp = idMiddleDown + 1;
        Q3 = (sTock[idMiddleDown - 1] + sTock[idMiddleUp - 1]) / 2; // sTock[] se začne na indexu 0!!!
    } else {
        idMiddle = idRightDown + Math.trunc(nrRight / 2);
        Q3 = sTock[idMiddle - 1]; // sTock[] se začne na indexu 0!!!
    }

    //console.log(Q1, Q2, Q3);
    return [Q1, Q2, Q3];

};

function getKriterijiOcene(vp_ocena) {
    //---- 25.1.2025
    
    let krit0, krit1;
    switch (vp_ocena) {
        case 1:
            krit0 = 0;
            krit1 = arrKriteriji[0] - 1 + addKritPercent;
            break;
        case 2: case 3: case 4:
            krit0 = arrKriteriji[vp_ocena - 2] - addKritPercent;
            krit1 = arrKriteriji[vp_ocena - 1] - 1 + addKritPercent;
            break;
        case 5:
            krit0 = arrKriteriji[3] - addKritPercent;
            krit1 = 100;
            break;
    }

    return [krit0, krit1];

}

function tmToolbarStartPeriod_tick() {

    lo_toolbarStartPeriod = false;
    lo_showToolbar = false;
    paint(); paint(); // 2.2.2025 dvakrat zato, ker pri prvem prehodu najprej riše grafe in šele potem da .visible značko gumbom. Ko riše drugič, pa se to že upošteva in se grafi prilagodijo

}

function randomAtoB(a, b) {
    // 2.2.2025

    let range = b - a + 1;
    return (a + Math.trunc(range * Math.random()));
}

function generateDemoUcenecOceneVsiPredmeti(vp_mesec0, vp_leto0, vp_mesecev, ocenaMin, ocenaMax) {
    // 2.2.2025

    let mesec, leto, i;
    let outStr = "";

    // filam ocene za 6 mesecev, začnem s septembrom 2024
    mesec = vp_mesec0; leto = vp_leto0;
    for (i = 1; i <= vp_mesecev; i++) {
        if (mesec > 12) { mesec = 1; leto = vp_leto0 + 1; };
        // FIZ v prvih 9 dnevih (dnevi 1-9), KEM 10-19, MAT 20-28
        outStr += generateDemoUcenecOceneVsiPredmeti_singlePredmet(mesec, leto, 1, 9, "F", ocenaMin, ocenaMax);
        outStr += generateDemoUcenecOceneVsiPredmeti_singlePredmet(mesec, leto, 10, 19, "K", ocenaMin, ocenaMax);
        outStr += generateDemoUcenecOceneVsiPredmeti_singlePredmet(mesec, leto, 20, 28, "M", ocenaMin, ocenaMax);
        //
        mesec += 1;
    }
    
    return outStr;

};

function generateDemoUcenecOceneVsiPredmeti_singlePredmet(mesec, leto, dan0, dan1, kraticaPredmeta, ocenaMin, ocenaMax) {
    // 2.2.2025

    let dan, datumStr, ocena, tipStr, maxTock, procent, tockStr;
    let outStr = "";

    dan = randomAtoB(dan0, dan1);
    datumStr = dan.toString() + "-" + mesec.toString() + "-" + leto.toString();
    ocena = randomAtoB(ocenaMin, ocenaMax);
    switch (mesec) {
        case 9: case 10: case 12: case 1: case 3: case 4: case 6: // USTNA OCENA
            tipStr = "U";
            break;
        case 11:
            tipStr = "P1";
            maxTock = 69;
            switch (ocena) {
                case 1: procent = randomAtoB(5, 47); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 2: procent = randomAtoB(50, 59); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 3: procent = randomAtoB(65, 73); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 4: procent = randomAtoB(76, 87); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 5: procent = randomAtoB(90, 100); tockStr = Math.trunc(procent / 100 * maxTock); break;
            }
            break;
        case 2:
            tipStr = "P2";
            maxTock = 77;
            switch (ocena) {
                case 1: procent = randomAtoB(5, 47); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 2: procent = randomAtoB(50, 59); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 3: procent = randomAtoB(65, 73); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 4: procent = randomAtoB(76, 87); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 5: procent = randomAtoB(90, 100); tockStr = Math.trunc(procent / 100 * maxTock); break;
            }
            break;
        case 5: // PISNI TEST
            tipStr = "P3";
            maxTock = 72;
            switch (ocena) {
                case 1: procent = randomAtoB(5, 47); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 2: procent = randomAtoB(50, 59); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 3: procent = randomAtoB(65, 73); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 4: procent = randomAtoB(76, 87); tockStr = Math.trunc(procent / 100 * maxTock); break;
                case 5: procent = randomAtoB(90, 100); tockStr = Math.trunc(procent / 100 * maxTock); break;
            }
            break;
    }
    outStr += kraticaPredmeta;
    outStr += "|" + ocena.toString();
    outStr += "|" + tipStr;
    outStr += "|" + datumStr;
    if (tipStr != "U") {
        outStr += "|" + tockStr;
        outStr += "|" + maxTock.toString();
    }
    outStr += ", ";

    return outStr;

}

function load_demoText1() {

    // ---------------------------
    // Test variante, ko imaš spredaj najprej header, v katerm poveš letnik (#L), predmet (#P) in razred (#R)
    // Predmet bo pri vseh ocenah ta, ki je zapisan v headerju, zato predmeta pri ocenah učencev ni potrebno označevati in se ga ne označuje.
    // Nato pa v nadaljevanju seznam vseh učemcev razreda, z vsemi njihovimi ocenami pri predmetu, ki je napisan v headerju.
    // Spodaj je isti razred "8.D" naštet še enkrat, v headerju pa piše KEMIJA, in pri učencih so potem ocene pri kemiji.
    // Slabost tega načina podajanja podatkov je ta, da je treba za vsak predmet vse učence ponovno našteti. Ni pa tako dolgih vrstic ocen posameznega učence, ker se gre le za en predmet.
    //    primer headerja in ene ocene: "#L2425 #PFIZIKA #R8.D" .. "4|P1|15-1-25|70.5|81" ... FIZIKA, ocena 4, prvi pisni test, na dan 15.1.2025, 70.5 točk od 81 točk
    // Ta varianta podatkov JE PODPRTA !!!
    // ---------------------------

    addDemoText("#L2425 #PFIZIKA #R8.D");
    addDemoText("Neja Franko,     2|U|17-10-24, 4|P1|15-1-25|70.5|81, 4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,        4|U|5-10-24,  3|P1|15-1-25|60|81, ");
    addDemoText("Janko Bergant,   3|U|9-10-24,  3|P1|15-1-25|56.5|81, ");
    addDemoText("Jasmin Brekalo,  3|U|11-10-24, 1|P1|15-1-25|33|81, 5|P2|25-4-25|60.5|61,");
    addDemoText("Franc Gadafi,    2|U|12-10-24, 3|U|16-12-24,           1|P1|15-1-25|23|81, 4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,    5|U|9-10-24,  3|U|12-12-24,           4|P1|15-1-25|64|81, ");
    addDemoText("Vanjka Semio,    4|U|9-10-24,  4|P1|15-1-25|66.5|81, ");
    addDemoText("Marija Beloder,  5|U|11-10-24, 3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,      5|U|8-10-24,  2|P1|15-1-25|43.5|81, ");
    addDemoText("Danka Cuker,     4|U|6-10-24,  4|P1|15-1-25|72.5|81, ");
    addDemoText("Kiro Puter,      3|U|9-10-24,  2|P1|15-1-25|48.5|81, ");
    addDemoText("Zinka Vodni,     2|U|14-10-24, 5|P1|15-1-25|77.5|81, ");
    addDemoText("Krava Fik,       5|U|11-10-24, 3|P1|15-1-25|51.5|81, 1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,     4|U|12-10-24, 2|P1|15-1-25|44.5|81, ");
    addDemoText("Anja Banja,      4|U|13-10-24, 2|P1|15-1-25|47|81, ");
    addDemoText("Roja Finf,       5|U|3-10-24,  5|P1|15-1-25|81|81, ");
    addDemoText("Kir Per,         5|U|28-9-24,  4|U|4-12-24,            1|P1|15-1-25|28.5|81, ");
    addDemoText("Vinko Tvrdi,     3|U|4-10-24,  4|P1|15-1-25|67|81, ");
    addDemoText("Zeko Populare,   5|U|6-10-24,  1|P1|15-1-25|34.5|81, ");
    addDemoText("Amer Fujsov,     5|U|7-10-24,  3|P1|15-1-25|59.5|81, ");
    addDemoText("Pinka Rinka,     5|U|3-10-24,  5|P1|15-1-25|74.5|81, ");
    addDemoText("Daren Parlov,    3|U|6-10-24,  2|P1|15-1-25|46|81, ");
    //----
    addDemoText("#L2425 #PFIZIKA #R8.E");
    addDemoText("Sin Skok,               2|U|5-10-24,  4|U|17-12-24,           3|P1|15-1-25|53.5|81, ");
    addDemoText("Madalina Breskvar,      5|U|7-10-24,  3|P1|15-1-25|52|81, ");
    addDemoText("Aron Kron,              4|U|9-10-24,  3|P1|20-1-25|60.5|81,  4|P2|25-4-25|51|61,");
    addDemoText("Zija Firbec,            4|U|7-10-24,  3|P1|15-1-25|58|81, ");
    addDemoText("Zara Motorka,           4|U|9-10-24,  2|P1|20-1-25|49|81");
    addDemoText("Mira Mar,               1|U|4-10-24,  1|P1|15-1-25|31.5|81, ");
    addDemoText("Jerka Kubic             5|U|8-10-24,  3|U|16-12-24,           3|P1|13-1-25|55|81, ");
    addDemoText("Birma Firmska,          3|U|9-10-24,  3|P1|15-1-25|51|81, ");
    addDemoText("Seka Sekun,             5|U|7-10-24,  2|P1|15-1-25|47.5|81, ");
    addDemoText("Mirza Delija,           5|U|4-10-24,  2|P1|18-1-25|43|81, ");
    addDemoText("Adi Dasler,             5|U|7-10-24,  2|P1|15-1-25|44.5|81, 2|P2|25-4-25|35|61,");
    addDemoText("Veter Velkaverh,        4|U|12-10-24, 1|P1|17-1-25|29|81, ");
    addDemoText("Ken Reed,               3|U|7-10-24,  1|P1|12-1-25|35|81, ");
    addDemoText("Ari Peka,               4|U|15-10-24, 4|P1|15-1-25|65|81, ");
    addDemoText("Luki Krasi,             5|U|7-10-24,  4|P1|15-1-25|68.5|81, ");
    addDemoText("Porko Smeh,             4|U|7-10-24,  1|U|4-12-24,             4|U|12-12-24,            1|P1|11-1-25|38.5|81, ");
    addDemoText("Matona Pomagi,          3|U|14-10-24, 2|P1|15-1-25|40.5|81, ");
    addDemoText("Fjara Kiselj,           2|U|7-10-24,  1|P1|15-1-25|30.5|81, ");
    addDemoText("Karina Enesu,           5|U|2-10-24,  5|U|4-12-24,             5|P1|15-1-25|76|81, ");
    addDemoText("Kelia Kolas,            3|U|9-10-24,  4|P1|14-1-25|70.5|81, ");
    addDemoText("Dona Podbreg,           5|U|8-10-24,  4|P1|15-1-25|65.5|81, ");
    addDemoText("Gera Presek,            5|U|9-10-24,  1|P1|12-1-25|27|81, ");
    addDemoText("Zevs Novak,             4|U|14-10-24, 1|P1|11-1-25|25|81, ");
    //----
    addDemoText("#L2425 #PFIZIKA #R9.D");
    addDemoText("Zera Bison,         3|U|16-10-24,  5|U|29-11-24,               4|P1|20-1-25|57.5|75, ");
    addDemoText("Emma Celje,         5|U|16-10-24,  4|P1|15-1-25|61|75, ");
    addDemoText("Krasna Gorec,       5|U|12-10-24,  5|P1|12-1-25|69.5|75,");
    addDemoText("Preja Volan,        5|U|22-10-24,  5|P1|15-1-25|72|75, ");
    addDemoText("Kravl Vodnik,       5|U|15-10-24,  3|P1|19-1-25|48.5|75,");
    addDemoText("Voda Popit,         4|U|20-10-24,  1|P1|18-1-25|27|75, ");
    addDemoText("Nos Smerk,          5|U|18-10-24,  4|U|4-12-24,               4|P1|12-1-25|59|75, ");
    addDemoText("Fina Smrekoc,       3|U|11-10-24,  1|P1|11-1-25|16|75, ");
    addDemoText("Heron Delon,        3|U|14-10-24,  1|P1|13-1-25|33|75, ");
    addDemoText("Mirk Novicki,       3|U|6-10-24,   2|P1|15-1-25|41|75, ");
    addDemoText("Karim Kozoleb,      5|U|20-10-24,  4|P1|16-1-25|64.5|75, ");
    addDemoText("Sneja Pacifik,      5|U|12-10-24,  3|P1|20-1-25|51.5|75,");
    addDemoText("Lunea Lolibruc,     4|U|19-10-24,  2|P1|15-1-25|45|75, ");
    addDemoText("Missi Sas,          5|U|9-10-24,   5|P1|19-1-25|70.5|75, ");
    addDemoText("Spona Okov,         4|U|12-10-24,   ");
    addDemoText("Mons Titan,         5|U|4-10-24,   5|P1|12-1-25|73.5|75, ");
    //----
    addDemoText("#L2425 #PFIZIKA #R9.E");
    addDemoText("Priska Fris,         4|U|21-10-24,  4|P1|15-1-25|61.5|75,            ");
    addDemoText("Tor Bariton,         4|U|21-10-24,  3|P1|15-1-25|50|75, ");
    addDemoText("Sjor Bergerud,       5|U|9-10-24,   4|P1|15-1-25|66|75, 4|P2|25-4-25|55|68,");
    addDemoText("Luis Armkil,         3|U|16-10-24,  3|P1|15-1-25|47|75, ");
    addDemoText("Disk Hardi,          4|U|14-10-24,  4|P1|20-1-25|63|75,");
    addDemoText("Fravz Pic,           2|U|21-10-24,  2|P1|15-1-25|38|75, ");
    addDemoText("Jena Alidvak,        5|U|21-10-24,  4|P1|15-1-25|65|75,   ");
    addDemoText("Zimija Zmilican,     5|U|23-10-24,  4|P1|15-1-25|61|75, ");
    addDemoText("Krol Bojanec,        4|U|23-10-24,  3|P1|15-1-25|55|75, 3|P2|25-4-25|44|68,");
    addDemoText("Kljuk Book,          4|U|14-10-24,    ");
    addDemoText("Raven Kodila,        5|U|16-10-24,  2|P1|15-1-25|41.5|75, ");
    addDemoText("Mix Musikmen,        2|U|21-10-24,  1|P1|15-1-25|28|75");
    addDemoText("Vrh Triglava,        5|U|14-10-24,  5|P1|15-1-25|72.5|75, ");
    addDemoText("Petina Zmaga,        5|U|21-10-24,  3|P1|15-1-25|53|75, ");
    addDemoText("Krizantema Vrt,      5|U|14-10-24,  5|P1|15-1-25|74.5|75, ");
    addDemoText("Burak Osman,         5|U|16-10-24,  2|P1|22-1-25|45|75,");
    addDemoText("Mladen Starina,      2|U|23-10-24,  1|P1|15-1-25|22|75, ");
    addDemoText("Bindo Farina,        5|U|9-10-24,   3|P1|15-1-25|54.5|75, ");
    addDemoText("Pikica Slon,         5|U|23-10-24,  5|P1|15-1-25|69|75, ");
    //----
    addDemoText("#L2425 #PKEMIJA #R8.D");
    //addDemoText("Neja Franko,     2|U|17-10-24, 4|P1|15-1-25|70.5|81, 4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,        4|U|5-10-24,  3|P1|15-1-25|81|81, ");
    addDemoText("Janko Bergant,   3|U|9-10-24,  3|P1|15-1-25|56.5|81, ");
    //addDemoText("Jasmin Brekalo,  3|U|11-10-24, 1|P1|15-1-25|33|81, 5|P2|25-4-25|60.5|61,");
    //addDemoText("Franc Gadafi,    2|U|12-10-24, 3|U|16-12-24,           1|P1|15-1-25|23|81, 4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,    5|U|9-10-24,  3|U|12-12-24,           4|P1|15-1-25|64|81, ");
    addDemoText("Vanjka Semio,    4|U|9-10-24,  4|P1|15-1-25|66.5|81, ");
    addDemoText("Marija Beloder,  5|U|11-10-24, 3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,      5|U|8-10-24,  2|P1|15-1-25|43.5|81, ");
    addDemoText("Danka Cuker,     4|U|6-10-24,  4|P1|15-1-25|72.5|81, ");
    addDemoText("Kiro Puter,      3|U|9-10-24,  2|P1|15-1-25|48.5|81, ");
    addDemoText("Zinka Vodni,     2|U|14-10-24, 5|P1|15-1-25|77.5|81, ");
    //addDemoText("Krava Fik,       5|U|11-10-24, 3|P1|15-1-25|51.5|81, 1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,     4|U|12-10-24, 2|P1|15-1-25|44.5|81, ");
    addDemoText("Anja Banja,      4|U|13-10-24, 2|P1|15-1-25|47|81, ");
    addDemoText("Roja Finf,       5|U|3-10-24,  5|P1|15-1-25|81|81, ");
    addDemoText("Kir Per,         5|U|28-9-24,  4|U|4-12-24,            1|P1|15-1-25|28.5|81, ");
    addDemoText("Vinko Tvrdi,     3|U|4-10-24,  4|P1|15-1-25|67|81, ");
    addDemoText("Zeko Populare,   5|U|6-10-24,  1|P1|15-1-25|34.5|81, ");
    addDemoText("Amer Fujsov,     5|U|7-10-24,  3|P1|15-1-25|59.5|81, ");
    addDemoText("Pinka Rinka,     5|U|3-10-24,  5|P1|15-1-25|74.5|81, ");
    addDemoText("Daren Parlov,    3|U|6-10-24,  2|P1|15-1-25|46|81, ");

};

function load_demoText2() {

    addDemoText("#PIK! #MATEMATIKA|MAT|M #FIZIKA|FIZ|F #KEMIJA|KEM|K #BIOLOGIJA|BIO|B #GEOGRAFIJA|GEO|G #SLOVENŠČINA|SLJ|S #ANGLEŠČINA|ANG|A #ŠPORT|ŠPO|P");
    //----
    addDemoText("#L2425 #R8.D");
    addDemoText("Neja Franko,     F|2|U|17-10-24, F|4|P1|15-1-25|70.5|81,   F|4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,        F|4|U|5-10-24,  F|3|P1|15-1-25|60|81, ");
    addDemoText("Janko Bergant,   F|3|U|9-10-24,  F|3|P1|15-1-25|56.5|81, ");
    addDemoText("Jasmin Brekalo,  F|3|U|11-10-24, F|1|P1|15-1-25|33|81,     F|5|P2|25-4-25|60.5|61,");
    addDemoText("Franc Gadafi,    F|2|U|12-10-24, F|3|U|16-12-24,           F|1|P1|15-1-25|23|81,     F|4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,    F|5|U|9-10-24,  F|3|U|12-12-24,           F|4|P1|15-1-25|64|81, ");
    addDemoText("Vanjka Semio,    F|4|U|9-10-24,  F|4|P1|15-1-25|66.5|81, ");
    addDemoText("Marija Beloder,  F|5|U|11-10-24, F|3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,      F|5|U|8-10-24,  F|2|P1|15-1-25|43.5|81, ");
    addDemoText("Danka Cuker,     F|4|U|6-10-24,  F|4|P1|15-1-25|72.5|81, ");
    addDemoText("Kiro Puter,      F|3|U|9-10-24,  F|2|P1|15-1-25|48.5|81, ");
    addDemoText("Zinka Vodni,     F|2|U|14-10-24, F|5|P1|15-1-25|77.5|81, ");
    addDemoText("Krava Fik,       F|5|U|11-10-24, F|3|P1|15-1-25|51.5|81,   F|1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,     F|4|U|12-10-24, F|2|P1|15-1-25|44.5|81, ");
    addDemoText("Anja Banja,      F|4|U|13-10-24, F|2|P1|15-1-25|47|81, ");
    addDemoText("Roja Finf,       F|5|U|3-10-24,  F|5|P1|15-1-25|81|81, ");
    addDemoText("Kir Per,         F|5|U|28-9-24,  F|4|U|4-12-24,            F|1|P1|15-1-25|28.5|81, ");
    addDemoText("Vinko Tvrdi,     F|3|U|4-10-24,  F|4|P1|15-1-25|67|81, ");
    addDemoText("Zeko Populare,   F|5|U|6-10-24,  F|1|P1|15-1-25|34.5|81, ");
    addDemoText("Amer Fujsov,     F|5|U|7-10-24,  F|3|P1|15-1-25|59.5|81, ");
    addDemoText("Pinka Rinka,     F|5|U|3-10-24,  F|5|P1|15-1-25|74.5|81, ");
    addDemoText("Daren Parlov,    F|3|U|6-10-24,  F|2|P1|15-1-25|46|81, ");
    //----
    addDemoText("#L2425 #R8.E");
    addDemoText("Sin Skok,               F|2|U|5-10-24,  F|4|U|17-12-24,           F|3|P1|15-1-25|53.5|81, ");
    addDemoText("Madalina Breskvar,      F|5|U|7-10-24,  F|3|P1|15-1-25|52|81, ");
    addDemoText("Aron Kron,              F|4|U|9-10-24,  F|3|P1|20-1-25|60.5|81,   F|4|P2|25-4-25|51|61,");
    addDemoText("Zija Firbec,            F|4|U|7-10-24,  F|3|P1|15-1-25|58|81, ");
    addDemoText("Zara Motorka,           F|4|U|9-10-24,  F|2|P1|20-1-25|49|81");
    addDemoText("Mira Mar,               F|1|U|4-10-24,  F|1|P1|15-1-25|31.5|81, ");
    addDemoText("Jerka Kubic,            F|5|U|8-10-24,  F|3|U|16-12-24,           F|3|P1|13-1-25|55|81, ");
    addDemoText("Birma Firmska,          F|3|U|9-10-24,  F|3|P1|15-1-25|51|81, ");
    addDemoText("Seka Sekun,             F|5|U|7-10-24,  F|2|P1|15-1-25|47.5|81, ");
    addDemoText("Mirza Delija,           F|5|U|4-10-24,  F|2|P1|18-1-25|43|81, ");
    addDemoText("Adi Dasler,             F|5|U|7-10-24,  F|2|P1|15-1-25|44.5|81,   F|2|P2|25-4-25|35|61,");
    addDemoText("Veter Velkaverh,        F|4|U|12-10-24, F|1|P1|17-1-25|29|81, ");
    addDemoText("Ken Reed,               F|3|U|7-10-24,  F|1|P1|12-1-25|35|81, ");
    addDemoText("Ari Peka,               F|4|U|15-10-24, F|4|P1|15-1-25|65|81, ");
    addDemoText("Luki Krasi,             F|5|U|7-10-24,  F|4|P1|15-1-25|68.5|81, ");
    addDemoText("Porko Smeh,             F|4|U|7-10-24,  F|1|U|4-12-24,             F|4|U|12-12-24,            F|1|P1|11-1-25|38.5|81, ");
    addDemoText("Matona Pomagi,          F|3|U|14-10-24, F|2|P1|15-1-25|40.5|81, ");
    addDemoText("Fjara Kiselj,           F|2|U|7-10-24,  F|1|P1|15-1-25|30.5|81, ");
    addDemoText("Karina Enesu,           F|5|U|2-10-24,  F|5|U|4-12-24,             F|5|P1|15-1-25|76|81, ");
    addDemoText("Kelia Kolas,            F|3|U|9-10-24,  F|4|P1|14-1-25|70.5|81, ");
    addDemoText("Dona Podbreg,           F|5|U|8-10-24,  F|4|P1|15-1-25|65.5|81, ");
    addDemoText("Gera Presek,            F|5|U|9-10-24,  F|1|P1|12-1-25|27|81, ");
    addDemoText("Zevs Novak,             F|4|U|14-10-24, F|1|P1|11-1-25|25|81, ");
    //----
    addDemoText("#L2425 #R9.D");
    addDemoText("Zera Bison,         F|3|U|16-10-24,  F|5|U|29-11-24,             F|4|P1|20-1-25|57.5|75, ");
    addDemoText("Emma Celje,         F|5|U|16-10-24,  F|4|P1|15-1-25|61|75, ");
    addDemoText("Krasna Gorec,       F|5|U|12-10-24,  F|5|P1|12-1-25|69.5|75,");
    addDemoText("Preja Volan,        F|5|U|22-10-24,  F|5|P1|15-1-25|72|75, ");
    addDemoText("Kravl Vodnik,       F|5|U|15-10-24,  F|3|P1|19-1-25|48.5|75,");
    addDemoText("Voda Popit,         F|4|U|20-10-24,  F|1|P1|18-1-25|27|75, ");
    addDemoText("Nos Smerk,          F|5|U|18-10-24,  F|4|U|4-12-24,               F|4|P1|12-1-25|59|75, ");
    addDemoText("Fina Smrekoc,       F|3|U|11-10-24,  F|1|P1|11-1-25|16|75, ");
    addDemoText("Heron Delon,        F|3|U|14-10-24,  F|1|P1|13-1-25|33|75, ");
    addDemoText("Mirk Novicki,       F|3|U|6-10-24,   F|2|P1|15-1-25|41|75, ");
    addDemoText("Karim Kozoleb,      F|5|U|20-10-24,  F|4|P1|16-1-25|64.5|75, ");
    addDemoText("Sneja Pacifik,      F|5|U|12-10-24,  F|3|P1|20-1-25|51.5|75,");
    addDemoText("Lunea Lolibruc,     F|4|U|19-10-24,  F|2|P1|15-1-25|45|75, ");
    addDemoText("Missi Sas,          F|5|U|9-10-24,   F|5|P1|19-1-25|70.5|75, ");
    addDemoText("Spona Okov,         F|4|U|12-10-24,   ");
    addDemoText("Mons Titan,         F|5|U|4-10-24,   F|5|P1|12-1-25|73.5|75, ");
    //----
    addDemoText("#L2425 #R9.E");
    addDemoText("Priska Fris,         F|4|U|21-10-24,  F|4|P1|15-1-25|61.5|75,            ");
    addDemoText("Tor Bariton,         F|4|U|21-10-24,  F|3|P1|15-1-25|50|75, ");
    addDemoText("Sjor Bergerud,       F|5|U|9-10-24,   F|4|P1|15-1-25|66|75,   F|4|P2|25-4-25|55|68,");
    addDemoText("Luis Armkil,         F|3|U|16-10-24,  F|3|P1|15-1-25|47|75, ");
    addDemoText("Disk Hardi,          F|4|U|14-10-24,  F|4|P1|20-1-25|63|75,");
    addDemoText("Fravz Pic,           F|2|U|21-10-24,  F|2|P1|15-1-25|38|75, ");
    addDemoText("Jena Alidvak,        F|5|U|21-10-24,  F|4|P1|15-1-25|65|75,   ");
    addDemoText("Zimija Zmilican,     F|5|U|23-10-24,  F|4|P1|15-1-25|61|75, ");
    addDemoText("Krol Bojanec,        F|4|U|23-10-24,  F|3|P1|15-1-25|55|75,   F|3|P2|25-4-25|44|68,");
    addDemoText("Kljuk Book,          F|4|U|14-10-24,    ");
    addDemoText("Raven Kodila,        F|5|U|16-10-24,  F|2|P1|15-1-25|41.5|75, ");
    addDemoText("Mix Musikmen,        F|2|U|21-10-24,  F|1|P1|15-1-25|28|75");
    addDemoText("Vrh Triglava,        F|5|U|14-10-24,  F|5|P1|15-1-25|72.5|75, ");
    addDemoText("Petina Zmaga,        F|5|U|21-10-24,  F|3|P1|15-1-25|53|75, ");
    addDemoText("Krizantema Vrt,      F|5|U|14-10-24,  F|5|P1|15-1-25|74.5|75, ");
    addDemoText("Burak Osman,         F|5|U|16-10-24,  F|2|P1|22-1-25|45|75,");
    addDemoText("Mladen Starina,      F|2|U|23-10-24,  F|1|P1|15-1-25|22|75, ");
    addDemoText("Bindo Farina,        F|5|U|9-10-24,   F|3|P1|15-1-25|54.5|75, ");
    addDemoText("Pikica Slon,         F|5|U|23-10-24,  F|5|P1|15-1-25|69|75, ");
    //----
    addDemoText("#L2425 #R8.D");
    addDemoText("Neja Franko,      K|2|U|17-10-24, K|4|P1|15-1-25|70.5|81, K|4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,         K|4|U|5-10-24,  K|3|P1|15-1-25|81|81, ");
    addDemoText("Janko Bergant,    K|3|U|9-10-24,  K|3|P1|15-1-25|56.5|81, ");
    addDemoText("Jasmin Brekalo,   K|3|U|11-10-24, K|1|P1|15-1-25|33|81,   K|5|P2|25-4-25|60.5|61,");
    addDemoText("Franc Gadafi,     K|2|U|12-10-24, K|3|U|16-12-24,         K|1|P1|15-1-25|23|81,      K|4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,     K|5|U|9-10-24,  K|3|U|12-12-24,         K|4|P1|15-1-25|64|81, ");
    addDemoText("Vanjka Semio,     K|4|U|9-10-24,  K|4|P1|15-1-25|66.5|81, ");
    addDemoText("Marija Beloder,   K|5|U|11-10-24, K|3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,       K|5|U|8-10-24,  K|2|P1|15-1-25|43.5|81, ");
    addDemoText("Danka Cuker,      K|4|U|6-10-24,  K|4|P1|15-1-25|72.5|81, ");
    addDemoText("Kiro Puter,       K|3|U|9-10-24,  K|2|P1|15-1-25|48.5|81, ");
    addDemoText("Zinka Vodni,      K|2|U|14-10-24, K|5|P1|15-1-25|77.5|81, ");
    addDemoText("Krava Fik,        K|5|U|11-10-24, K|3|P1|15-1-25|51.5|81,  K|1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,      K|4|U|12-10-24, K|2|P1|15-1-25|44.5|81, ");
    addDemoText("Anja Banja,       K|4|U|13-10-24, K|2|P1|15-1-25|47|81, ");
    addDemoText("Roja Finf,        K|5|U|3-10-24,  K|5|P1|15-1-25|81|81, ");
    addDemoText("Kir Per,          K|5|U|28-9-24,  K|4|U|4-12-24,            K|1|P1|15-1-25|28.5|81, ");
    addDemoText("Vinko Tvrdi,      K|3|U|4-10-24,  K|4|P1|15-1-25|67|81, ");
    addDemoText("Zeko Populare,    K|5|U|6-10-24,  K|1|P1|15-1-25|34.5|81, ");
    addDemoText("Amer Fujsov,      K|5|U|7-10-24,  K|3|P1|15-1-25|59.5|81, ");
    addDemoText("Pinka Rinka,      K|5|U|3-10-24,  K|5|P1|15-1-25|74.5|81, ");
    addDemoText("Daren Parlov,     K|3|U|6-10-24,  K|2|P1|15-1-25|46|81, ");

};

function load_demoText3() {

    addDemoText("#PIK! #MATEMATIKA|MAT|M #FIZIKA|FIZ|F #KEMIJA|KEM|K #BIOLOGIJA|BIO|B #GEOGRAFIJA|GEO|G #SLOVENŠČINA|SLJ|S #ANGLEŠČINA|ANG|A #ŠPORT|ŠPO|P");
    //----
    addDemoText("#L2425 #R8.D");
    addDemoText("Neja Franko,      K|2|U|17-10-24, K|4|P1|15-1-25|70.5|81, K|4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,         K|4|U|5-10-24,  K|3|P1|15-1-25|81|81, ");
    addDemoText("Janko Bergant,    K|3|U|9-10-24,  K|3|P1|15-1-25|56.5|81, ");
    addDemoText("Jasmin Brekalo,   K|3|U|11-10-24, K|1|P1|15-1-25|33|81,   K|5|P2|25-4-25|60.5|61,");
    addDemoText("Franc Gadafi,     K|2|U|12-10-24, K|3|U|16-12-24,         K|1|P1|15-1-25|23|81,      4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,     K|5|U|9-10-24,  K|3|U|12-12-24,         K|4|P1|15-1-25|64|81, ");
    addDemoText("Vanjka Semio,     K|4|U|9-10-24,  K|4|P1|15-1-25|66.5|81, ");
    addDemoText("Marija Beloder,   K|5|U|11-10-24, K|3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,       K|5|U|8-10-24,  K|2|P1|15-1-25|43.5|81, ");
    addDemoText("Danka Cuker,      K|4|U|6-10-24,  K|4|P1|15-1-25|72.5|81, ");
    addDemoText("Kiro Puter,       K|3|U|9-10-24,  K|2|P1|15-1-25|48.5|81, ");
    addDemoText("Zinka Vodni,      K|2|U|14-10-24, K|5|P1|15-1-25|77.5|81, ");
    addDemoText("Krava Fik,        K|5|U|11-10-24, K|3|P1|15-1-25|51.5|81,  K|1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,      K|4|U|12-10-24, K|2|P1|15-1-25|44.5|81, ");
    addDemoText("Anja Banja,       K|4|U|13-10-24, K|2|P1|15-1-25|47|81, ");
    addDemoText("Roja Finf,        K|5|U|3-10-24,  K|5|P1|15-1-25|81|81, ");
    addDemoText("Kir Per,          K|5|U|28-9-24,  K|4|U|4-12-24,            K|1|P1|15-1-25|28.5|81, ");
    addDemoText("Vinko Tvrdi,      K|3|U|4-10-24,  K|4|P1|15-1-25|67|81, ");
    addDemoText("Zeko Populare,    K|5|U|6-10-24,  K|1|P1|15-1-25|34.5|81, ");
    addDemoText("Amer Fujsov,      K|5|U|7-10-24,  K|3|P1|15-1-25|59.5|81, ");
    addDemoText("Pinka Rinka,      K|5|U|3-10-24,  K|5|P1|15-1-25|74.5|81, ");
    addDemoText("Daren Parlov,     K|3|U|6-10-24,  K|2|P1|15-1-25|46|81, ");
    
}

function load_demoText4() {

    // ---------------------------
    // Test variante, ko imaš spredaj najprej katalog vseh predmetov z imenom, trimestno kratico in enomestno kratico
    // Potem v nadaljevanju imaš za vsak razred header vrstico z letnikom (#L) in razredom (#R) ... pozor: predmet tu ni naveden, ker bo enomestna kratica predmeta prisotna pri vseki oceni posebej
    // Nato pa v nadaljevanju seznam vseh učemcev razreda, z vsemi njihovimi ocenami pri vseh predmetih.
    //    primer ene ocene: "K|4|P1|15-1-25|70.5|81" ... KEMIJA, ocena 4, prvi pisni test, na dan 15.1.2025, 70.5 točk od 81 točk
    // Ta varianta podatkov JE PODPRTA !!!
    // ---------------------------

    addDemoText("#PIK! #MATEMATIKA|MAT|M #FIZIKA|FIZ|F #KEMIJA|KEM|K #BIOLOGIJA|BIO|B #GEOGRAFIJA|GEO|G #SLOVENŠČINA|SLJ|S #ANGLEŠČINA|ANG|A #ŠPORT|ŠPO|P");
    //----
    addDemoText("#L2425 #R8.D");
    addDemoText("Neja Franko,     F|2|U|17-10-24, K|2|U|28-10-24,           F|4|P1|15-1-25|70.5|81,   K|4|P1|17-2-25|70.5|81,  M|4|P1|18-2-25|70.5|81, K|4|P2|27-3-25|51|61,  F|4|P2|25-4-25|51|61,");
    addDemoText("Mare Car,        F|4|U|5-10-24,  F|3|P1|15-1-25|60|81,     K|4|U|5-10-24,  K|3|P1|15-1-25|81|81, ");
    addDemoText("Janko Bergant,   F|3|U|9-10-24,  F|3|P1|15-1-25|56.5|81,   K|3|U|9-10-24,  K|3|P1|15-1-25|56.5|81, ");
    addDemoText("Jasmin Brekalo,  F|3|U|11-10-24, F|1|P1|15-1-25|33|81,     F|5|P2|25-4-25|60.5|61,     K|3|U|11-10-24, K|1|P1|15-1-25|33|81,   K|5|P2|25-4-25|60.5|61,");
    addDemoText("Franc Gadafi,    F|2|U|12-10-24, F|3|U|16-12-24,           F|1|P1|15-1-25|23|81,     F|4|P2|25-4-25|53|61,   K|2|U|12-10-24, K|3|U|16-12-24,         K|1|P1|15-1-25|23|81,      K|4|P2|25-4-25|53|61,");
    addDemoText("Dolfe Titler,    F|5|U|9-10-24,  F|3|U|12-12-24,           F|4|P1|15-1-25|64|81,     K|5|U|9-10-24,  K|3|U|12-12-24,         K|4|P1|15-1-25|64|81,");
    addDemoText("Vanjka Semio,    F|4|U|9-10-24,  F|4|P1|15-1-25|66.5|81,   K|4|U|9-10-24,  K|4|P1|15-1-25|66.5|81,");
    addDemoText("Marija Beloder,  F|5|U|11-10-24, F|3|P1|15-1-25|56|81,     K|5|U|11-10-24, K|3|P1|15-1-25|56|81, ");
    addDemoText("Finka Kruh,      F|5|U|8-10-24,  F|2|P1|15-1-25|43.5|81,   K|5|U|8-10-24,  K|2|P1|15-1-25|43.5|81,");
    addDemoText("Danka Cuker,     F|4|U|6-10-24,  F|4|P1|15-1-25|72.5|81,   K|4|U|6-10-24,  K|4|P1|15-1-25|72.5|81,");
    addDemoText("Kiro Puter,      F|3|U|9-10-24,  F|2|P1|15-1-25|48.5|81,   K|3|U|9-10-24,  K|2|P1|15-1-25|48.5|81,");
    addDemoText("Zinka Vodni,     F|2|U|14-10-24, F|5|P1|15-1-25|77.5|81,   K|2|U|14-10-24, K|5|P1|15-1-25|77.5|81,");
    addDemoText("Krava Fik,       F|5|U|11-10-24, F|3|P1|15-1-25|51.5|81,   F|1|P2|25-4-25|25|61,   K|5|U|11-10-24, K|3|P1|15-1-25|51.5|81,  K|1|P2|25-4-25|25|61,");
    addDemoText("Tonka Keran,     F|4|U|12-10-24, F|2|P1|15-1-25|44.5|81,   K|4|U|12-10-24, K|2|P1|15-1-25|44.5|81,");
    addDemoText("Anja Banja,      F|4|U|13-10-24, F|2|P1|15-1-25|47|81,     K|4|U|13-10-24, K|2|P1|15-1-25|47|81,");
    addDemoText("Roja Finf,       F|5|U|3-10-24,  F|5|P1|15-1-25|81|81,     K|5|U|3-10-24,  K|5|P1|15-1-25|81|81,");
    addDemoText("Kir Per,         F|5|U|28-9-24,  F|4|U|4-12-24,            F|1|P1|15-1-25|28.5|81, K|5|U|28-9-24,  K|4|U|4-12-24,            K|1|P1|15-1-25|28.5|81,");
    addDemoText("Vinko Tvrdi,     F|3|U|4-10-24,  F|4|P1|15-1-25|67|81,     K|3|U|4-10-24,  K|4|P1|15-1-25|67|81,");
    addDemoText("Zeko Populare,   F|5|U|6-10-24,  F|1|P1|15-1-25|34.5|81,   K|5|U|6-10-24,  K|1|P1|15-1-25|34.5|81,");
    addDemoText("Amer Fujsov,     F|5|U|7-10-24,  F|3|P1|15-1-25|59.5|81,   K|5|U|7-10-24,  K|3|P1|15-1-25|59.5|81,");
    addDemoText("Pinka Rinka,     F|5|U|3-10-24,  F|5|P1|15-1-25|74.5|81,   K|5|U|3-10-24,  K|5|P1|15-1-25|74.5|81,");
    addDemoText("Daren Parlov,    F|3|U|6-10-24,  F|2|P1|15-1-25|46|81,     K|3|U|6-10-24,  K|2|P1|15-1-25|46|81,");
    
}

function load_demoText5() {

    // ---------------------------
    // Test variante, ko imaš spredaj najprej katalog vseh predmetov z imenom, trimestno kratico in enomestno kratico
    // Potem v nadaljevanju imaš za vsak razred header vrstico z letnikom (#L) in razredom (#R) ... pozor: predmet tu ni naveden, ker bo enomestna kratica predmeta prisotna pri vseki oceni posebej
    // Nato pa v nadaljevanju seznam vseh učemcev razreda, z vsemi njihovimi ocenami pri vseh predmetih.
    //    primer ene ocene: "K|4|P1|15-1-25|70.5|81" ... KEMIJA, ocena 4, prvi pisni test, na dan 15.1.2025, 70.5 točk od 81 točk
    // Ta varianta podatkov JE PODPRTA !!!
    // ---------------------------

    let mesec = 9; let leto = 24; let mesecev = 6;

    addDemoText("#PIK! #MATEMATIKA|MAT|M #FIZIKA|FIZ|F #KEMIJA|KEM|K #BIOLOGIJA|BIO|B #GEOGRAFIJA|GEO|G #SLOVENŠČINA|SLJ|S #ANGLEŠČINA|ANG|A #ŠPORT|ŠPO|P");
    //----
    addDemoText("#L2425 #R8.D");
    addDemoText("Neja Franko, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Mare Car, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Janko Bergant, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Jasmin Brekalo, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Franc Gadafi, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Dolfe Titler, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Vanjka Semio, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Marija Beloder, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Finka Kruh, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Danka Cuker, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 3));
    addDemoText("Kiro Puter, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Zinka Vodni, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Krava Fik, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Tonka Keran, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Anja Banja, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Roja Finf, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Kir Per, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Vinko Tvrdi, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 2));
    addDemoText("Zeko Populare, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Amer Fujsov, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Pinka Rinka, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Daren Parlov, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    
    //----
    addDemoText("#L2425 #R8.E");
    addDemoText("Sin Skok, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Madalina Breskvar, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Aron Kron, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Zija Firbec, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Zara Motorka, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Mira Mar, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Jerka Kubic, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 2));
    addDemoText("Birma Firmska, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Seka Sekun, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 4));
    addDemoText("Mirza Delija, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 3));
    addDemoText("Adi Dasler, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Veter Velkaverh, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 3));
    addDemoText("Ken Reed, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Ari Peka, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Luki Krasi, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Porko Smeh, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Matona Pomagi, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Fjara Kiselj, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 4));
    addDemoText("Karina Enesu, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Kelia Kolas, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Dona Podbreg, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Gera Presek, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Zevs Novak, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 2));
    //----
    addDemoText("#L2425 #R9.D");
    addDemoText("Zera Bison, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Emma Celje, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Krasna Gorec, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Preja Volan, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Kravl Vodnik, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Voda Popit, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Nos Smerk, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Fina Smrekoc, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Heron Delon, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Mirk Novicki, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Karim Kozoleb, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 2));
    addDemoText("Sneja Pacifik, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Lunea Lolibruc, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Missi Sas, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Spona Okov, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Mons Titan, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    //----
    addDemoText("#L2425 #R9.E");
    addDemoText("Priska Fris, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Tor Bariton, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Sjor Bergerud, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Luis Armkil, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Disk Hardi, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Fravz Pic, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Jena Alidvak, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Zimija Zmilican, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 2));
    addDemoText("Krol Bojanec, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Kljuk Book, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 5));
    addDemoText("Raven Kodila, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 4));
    addDemoText("Mix Musikmen, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 1, 3));
    addDemoText("Vrh Triglava, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 3));
    addDemoText("Petina Zmaga, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 4));
    addDemoText("Krizantema Vrt, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 2, 5));
    addDemoText("Burak Osman, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
    addDemoText("Mladen Starina, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 4));
    addDemoText("Bindo Farina, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 4, 5));
    addDemoText("Pikica Slon, " + generateDemoUcenecOceneVsiPredmeti(mesec, leto, mesecev, 3, 5));
}
