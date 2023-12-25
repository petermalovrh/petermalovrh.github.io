//------------------------------------
//---- pričetek razvoja 2.12.2023
const gl_versionNr = "v1.15"
const gl_versionDate = "25.12.2023"
const gl_versionNrDate = gl_versionNr + " " + gl_versionDate
//------------------------------------

console.clear;

// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics#Excess_mortality_in_the_EU_between_January_2020_and_November_2022
// https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_5743640/default/table?lang=en
// https://ec.europa.eu/eurostat/databrowser/view/demo_mexrt/default/table?lang=en
// https://jsfiddle.net/ ... code snippets, playground
// https://codepen.io/   ... The best place to build, test, and discover front-end code. (primer: https://codepen.io/alterebro/pen/VNJmEJ)

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

//---------------------------------------------------------------------
//------------ PODATKI O KRAJIH Z MERITVAMI ---------------------------
//---------------------------------------------------------------------

//----
const cv_minPlace = 1
//const cv_maxPlace = 32
const cv_allPlace = -1
const cv_placeNone = 0

//---- to se fila pri nalaganju podatkov o lokacijah meritev
var nrPlaces = 0
const placeName = [];      // new Array(nrPlaces)
const placeNameShort = []; // new Array(nrPlaces)
const placeNameAbbr = [];  // new Array(nrPlaces)
const placeLocation = [];  // 16.12.2023
const placeColor = [];     // new Array(nrPlaces)
const placeColorAnti = []; // 15.12.2023 barva, ki je primerna za pisanje, če bi bilo ozadje placeColor[]
const placeHaveUndefPeriods = []; // new Array(nrPlaces)

//---- to se fila pri nalaganju podatkov o lokacijah meritev (14.12.2023)
var nrStations = 0
const stationPlace = []; // id lokacije
const stationArsoId = [];  // ARSO id konkretne postaje na lokaciji
const stationName = [];    // ime konkretne postaje na lokaciji
const stationLon = [];     // longitude postaje
const stationLat = [];     // latitude postaje
const stationType = [];    // tip postaje ("A"=avtomatska, "P"=privat, ""=ostalo)
const stationHeight = [];  // nadmorska višina postaje
const stationMonthStart = []; // new Array(nrStations)
const stationYearStart = [];  // new Array(nrStations)
const stationMonthEnd = [];   // new Array(nrStations)
const stationYearEnd = [];    // new Array(nrStations)

//---- nedefinirani intervali podatkov določenih lokacij (14.12.2023)
var nrUndefDataPeriods = 0;
const undefDataPeriodPlace = [];
const undefDataPeriodMonthStart = [];
const undefDataPeriodYearStart = [];
const undefDataPeriodMonthEnd = [];
const undefDataPeriodYearEnd = [];
const undefDataPeriodMonthIndexStart = [];      // od katerega podatka v globalnem razponu podatkov podatki niso definirani
const undefDataPeriodMonthIndexEnd = [];        // do katerega podatka v globalnem razponu podatkov podatki niso definirani
const undefDataPeriodPlaceMonthIndexStart = []; // od katerega podatka v nizu podatkov za to lokacijo podatki niso definirani
const undefDataPeriodPlaceMonthIndexEnd = [];   // do katerega podatka v nizu podatkov za to lokacijo podatki niso definirani

//---- obdobja podatkov, kjer je potrebno opraviti korekcijo podatkov (16.12.29023)
var nrNormalizePeriods = 0;
const normalizePeriodPlace = [];           // 
const normalizePeriodStation = [];           // 
const normalizePeriodMonthStart = [];      // 
const normalizePeriodYearStart = [];       // 
const normalizePeriodMonthEnd = [];        // 
const normalizePeriodYearEnd = [];         // 
const normalizePeriodValueCorrection = []; // 

//---- to se fila sproti med nalaganjem izmerjenih podatkov
const minMonth = [];     // new Array(nrPlaces);
const minYear = [];      // new Array(nrPlaces);
const maxMonth = [];     // new Array(nrPlaces);
const maxYear = [];      // new Array(nrPlaces);
const nrMonths = [];     // new Array(nrPlaces);

//---- to se nafila naknadno, ko so vsi izmerjeni podatki že naloženi
const offsetMonths = [];  // 5.12.20223 za koliko mesecev je začetek podatkov lokacije zamaknjen glede na generalno prvi mesec podatkov
const firstMonth = [];    // 5.12.20223   prvi mesec podatkov lokacije, zaporedno relativno glede na prvi mesec podatkov generalno
const lastMonth = [];     // 5.12.20223 zadnji mesec podatkov lokacije, zaporedno relativno glede na prvi mesec podatkov generalno

var minMonthAll = 20;  // mesec prvega podatka generalno od vseh lokacij (1..12)
var maxMonthAll = 0;   // mesec zadnjega podatka generalno od vseh lokacij (1..12)
var minYearAll = 2030; // leto prvega podatka generalno od vseh lokacij (recimo 2009)
var maxYearAll = 0;    // leto zadnjega podatka generalno od vseh lokacij (recimo 2023)
var nrMonthsAll = 0;   // število vseh mesečnih podatkov gledano generalno od vseh lokacij (če so podatki med avg'2009 in nov'2023, je to 172 =5+14*12-1)

var avgTemp = [];
var avgTempCache = []; // 19.12.2023
var avgTempCacheAll = []; // 19.12.2023
let station, station2;

// ŠKOFJA LOKA
const cv_placeSkofjaLoka = addPlace(scSch + "kofja Loka (355m)", scSch + "kofja Loka", scSch + "KL", scSch + "kofja Loka", "royalBlue", "white");
station = addStation(cv_placeSkofjaLoka, 0, "TRNJE", "14.2938", "46.1776", "P", 391, 8, 2009, 12, 2020);
station = addStation(cv_placeSkofjaLoka, 0, "STRA" + scZh + "I" + scSch + scTch + "E", "14.342", "46.232", "P", 395, 1, 2021, 0, 0);

// MARIBOR VRBANSKI PLATO (lon=15.6260, lat=46.5678, viš=279m)
const cv_placeMariborVrbanskiPlato = addPlace("Maribor Vrbanski Plato (279m)", "MB Vrbanski Plato", "MBVP", "Maribor", "darkGreen", "white");
station = addStation(cv_placeMariborVrbanskiPlato, 3308, "MARIBOR - VRBANSKI PLATO", "15.6260", "46.5678", "", 279, 1, 2020, 0, 0);

// MARIBOR TABOR (lon=15.6450, lat=46.5394, viš=275m)
const cv_placeMariborTabor = addPlace("Maribor Tabor (275m)", "MB Tabor", "MBTB", "Maribor", "green", "white");
station = addStation(cv_placeMariborTabor, 1892, "MARIBOR - TABOR", "15.6450", "46.5394", "", 275, 7, 1962, 12, 2004);
station = addStation(cv_placeMariborTabor, 2295, "MARIBOR - TABOR", "15.6450", "46.5394", "", 275, 1, 2005, 1, 2020);

// LJUBLJANA BEŽIGRAD (lon=14.5124, lat=46.0655, viš=299m) ... 5.12.2023
const cv_placeLjubljanaBezigrad = addPlace("Ljubljana Be"+scZhLow+"igrad (299m)", "LJ Be"+scZhLow+"igrad", "LJBE", "Ljubljana", "mediumSeaGreen", "white");
station = addStation(cv_placeLjubljanaBezigrad, 1895, "LJUBLJANA - BE" + scZh + "IGRAD", "14.5124", "46.0655", "", 299, 1, 1948, 0, 0);

// NOVO MESTO 6.12.2023
const cv_placeNovoMesto = addPlace("Novo Mesto (220m)", "Novo Mesto", "NM", "Novo Mesto", "crimson", "white");
station = addStation(cv_placeNovoMesto, 988, "NOVO MESTO - KANDIJA", "15.1619", "45.7997", "", 193, 1, 1948, 12, 1950);
station = addStation(cv_placeNovoMesto, 1058, "NOVO MESTO - KANDIJA", "15.1785", "45.7997", "", 193, 1, 1951, 12, 1951);
station = addStation(cv_placeNovoMesto, 1057, "NOVO MESTO - KANDIJA", "15.1785", "45.7997", "", 193, 1, 1952, 2, 1961);
station = addStation(cv_placeNovoMesto, 1077, "NOVO MESTO - GOTNA VAS", "15.1785", "45.7997", "", 208, 4, 1961, 11, 1972);
station = addStation(cv_placeNovoMesto, 1893, "NOVO MESTO", "15.1773", "45.8018", "", 220, 1, 1973, 0, 0);

// POSTOJNA (533m) (lon=14.1932, lat=45.7661, viš=533m) ... 7.12.2023
const cv_placePostojna = addPlace("Postojna (533m)", "Postojna", "POST", "Postojna", "goldenrod", "white");
station = addStation(cv_placePostojna, 1133, "POSTOJNA", "14.1932", "45.7661", "", 533, 1, 1950, 9, 1953);
station = addStation(cv_placePostojna, 1134, "POSTOJNA", "14.1932", "45.7661", "", 533, 11, 1953, 2, 1961);
station = addStation(cv_placePostojna, 1922, "POSTOJNA", "14.1932", "45.7661", "", 533, 4, 1961, 0, 0);

// NOVA GORICA BILJE (51/55m) (združeno, ker je lepo zvezno! 1962-1991:lon=13.6240, lat=45.8956, viš=55m      1991-2022:lon=13.6240, lat=45.8956, viš=55m) ... 8.12.2023
const cv_placeNovaGoricaBilje = addPlace("Nova Gorica Bilje (51/55m)", "NG Bilje", "NGBI", "Nova Gorica", "darkSalmon", "white");
station = addStation(cv_placeNovaGoricaBilje, 232, "BILJE", "13.6315", "45.8911", "", 51, 4, 1962, 11, 1982);
station = addStation(cv_placeNovaGoricaBilje, 2249, "BILJE", "13.6446", "45.8989", "", 51, 1, 1983, 3, 1991);
station = addStation(cv_placeNovaGoricaBilje, 1923, "BILJE", "13.6240", "45.8956", "", 55, 4, 1991, 0, 0);

// KREDARICA (2513m) (lon=13.8489, lat=46.3787, viš=2513m) ... 8.12.2023
const cv_placeKredarica = addPlace("Kredarica (2513m)", "Kredarica", "KRED", "Kredarica", "teal", "white");
station = addStation(cv_placeKredarica, 1890, "KREDARICA", "13.8489", "46.3787", "", 2513, 1, 1955, 0, 0);

// ŠMARTNO PRI SLOVENJ GRADCU (2513m) (lon=13.8489, lat=46.3787, viš=2513m) ... 9.12.2023
//    jan'54-mar'57: (lon=15.1118, lat=46.4997, viš=440m)
//    apr'57-dec'93: (lon=15.1119, lat=46.4830, viš=452m)
//    jan'94-      : (lon=15.1112, lat=46.4896, viš=444m)
const cv_placeSlovenjGradecSmartno = addPlace("Slovenj Gradec " + scSch + "martno (444m)", "SG " + scSch + "martno", "SG" + scSch + "M", "Slovenj Gradec", "purple", "white");
station = addStation(cv_placeSlovenjGradecSmartno, 1054, scSch + "MARTNO PRI SLOVENJ GRADCU", "15.1118", "46.4997", "", 440, 7, 1949, 12, 1952);
station = addStation(cv_placeSlovenjGradecSmartno, 1053, scSch + "MARTNO PRI SLOVENJ GRADCU", "15.1118", "46.4997", "", 440, 1, 1953, 3, 1957);
station = addStation(cv_placeSlovenjGradecSmartno, 1080, scSch + "MARTNO PRI SLOVENJ GRADCU", "15.1119", "46.4830", "", 452, 4, 1957, 12, 1993);
station = addStation(cv_placeSlovenjGradecSmartno, 1897, scSch + "MARTNO PRI SLOVENJ GRADCU", "15.1112", "46.4896", "", 444, 1, 1994, 0, 0);

// KRVAVEC (1742m) (lon=14.5333, lat=46.2973, viš=1742m) ... 12.12.2023
//    1961-1973 id=14, 1973-2022 id=1614 !!! id postaje v http req, ki ga uporabljam tudi v mojem vb-net orodju avgTemp
//    pred 1961 je že tudi bila postaja, a 300m višje in je zato tu ne gledam
const cv_placeKrvavec = addPlace("Krvavec (1742m)", "Krvavec", "KRVA", "Krvavec", "sienna", "white");
station2 = addStation(cv_placeKrvavec, 14, "KRVAVEC", "14.5201", "46.2964", "", 1478, 1, 1961, 4, 1973);
station = addStation(cv_placeKrvavec, 1614, "KRVAVEC", "14.5333", "46.2973", "", 1742, 9, 1973, 0, 0); // !!! POZOR: višina dvignjena za 264m, v nižje T !!! Razdeli lokacijo na 2 lokaciji ali nekako normaliziraj !!!
addNormalizePeriod(cv_placeKrvavec, station2, 1, 1961, 4, 1973, -1.2); //višina dvignjena za 264m, v nižje T !!! Zato normalizacija z -1.2 stopinje, to pa pride iz razlike Kredarica:Krvavec 2513:1790 diff=4.5 stopinje, se pravi okoli 0.6 stopinje na 100m višine

// MURSKA SOBOTA ... 12.12.2023, vse postaje združil skupaj
const cv_placeMurskaSobota = addPlace("Murska Sobota (190m)", "Murska Sobota", "MS", "Murska Sobota", "mediumVioletRed", "white");
station = addStation(cv_placeMurskaSobota, 996, "MURSKA SOBOTA - RAKI" + scTch + "AN I", "16.1950", "46.6497", "", 187, 4, 1949, 6, 1950);
station = addStation(cv_placeMurskaSobota, 893, "MURSKA SOBOTA", "16.1784", "46.6497", "", 187, 1, 1950, 12, 1951);
station = addStation(cv_placeMurskaSobota, 1052, "MURSKA SOBOTA", "16.1284", "46.6663", "", 191, 1, 1952, 12, 1952);
station = addStation(cv_placeMurskaSobota, 1051, "MURSKA SOBOTA", "16.1284", "46.6663", "", 191, 1, 1953, 12, 1955);
station = addStation(cv_placeMurskaSobota, 1078, "MURSKA SOBOTA - RAKI" + scTch + "AN", "16.1284", "46.6663", "", 193, 1, 1956, 6, 1971);
station = addStation(cv_placeMurskaSobota, 1082, "MURSKA SOBOTA - RAKI" + scTch + "AN", "16.1784", "46.6330", "", 184, 7, 1971, 5, 1985);
station = addStation(cv_placeMurskaSobota, 1894, "MURSKA SOBOTA - RAKI" + scTch + "AN", "16.1913", "46.6521", "", 187, 7, 1985, 0, 0);

// JAVORJE NAD POLJANAMI ... 12.12.2023, združil dve postaji
const cv_placeJavorje = addPlace("Javorje (695m)", "Javorje", "JAPO", "Javorje nad Poljanami", "olive", "white");
station = addStation(cv_placeJavorje, 40, "JAVORJE NAD POLJANAMI", "14.1786", "46.1663", "", 700, 1, 1955, 4, 1975);
station = addStation(cv_placeJavorje, 41, "JAVORJE NAD POLJANAMI", "14.1775", "46.1569", "", 690, 6, 1975, 12, 1990);

// CELJE ... 12.12.2023
//    cel kup postaj, vse sem združil skupaj, spodaj glej id-je in podatke konkretnih postaj
const cv_placeCelje = addPlace("Celje (245m)", "Celje", "CE", "Celje", "blueViolet", "white");
station = addStation(cv_placeCelje, 1050, "CELJE - MEDLOG", "15.2285", "46.2330", "", 241, 1, 1948, 7, 1953);
station = addStation(cv_placeCelje, 1060, "CELJE - LEVEC - LETALI" + scSch + scTch + "E", "15.2452", "46.2330", "", 244, 8, 1953, 11, 1959);
station = addStation(cv_placeCelje, 1063, "CELJE - " + scZh + "ALEC", "15.2452", "46.2497", "", 254, 12, 1959, 1, 1961);
station = addStation(cv_placeCelje, 1064, "CELJE - LOKROVEC", "15.2452", "46.2664", "", 255, 3, 1961, 10, 1962);
station = addStation(cv_placeCelje, 1075, "CELJE - MEDLOG", "15.2285", "46.2497", "", 245, 11, 1962, 10, 1965);
station = addStation(cv_placeCelje, 1081, "CELJE - LEVEC - LETALI" + scSch + scTch + "E", "15.2452", "46.2330", "", 244, 12, 1965, 9, 1976);
station = addStation(cv_placeCelje, 1901, "CELJE", "15.2477", "46.2444", "", 244, 11, 1976, 2, 2008);
station = addStation(cv_placeCelje, 2482, "CELJE - MEDLOG", "15.2259", "46.2366", "", 242, 4, 2008, 0, 0);

// BABNO POLJE ... 13.12.2023 
//    podatki postaje so v treh delih, ki sem jih združil spodaj, spodaj glej id-je in podatke konkretnih postaj
const cv_placeBabnoPolje = addPlace("Babno Polje (755m)", "Babno Polje", "BABP", "Babno Polje", "darkGoldenrod", "white");
station = addStation(cv_placeBabnoPolje, 389, "BABNO POLJE", "14.5359", "45.6467", "", 753, 11, 1949, 9, 1965);
station = addStation(cv_placeBabnoPolje, 1141, "BABNO POLJE", "14.5449", "45.6452", "", 755, 10, 1965, 6, 1991); // !!!POZOR: vmes manjka 12 let podatkov!!! umetno sem to nafilal, da obdržim eno lokacijo
station = addStation(cv_placeBabnoPolje, 2214, "BABNO POLJE", "14.5449", "45.6452", "", 755, 11, 2003, 0, 0);
addUndefPlaceDataPeriod(cv_placeBabnoPolje, 7, 1991, 10, 2003); //tu vmes ni podatkov, vseeno pa ohranim eno lokacijo, le graf se tu vmes ne bo prikazoval

// PORTOROŽ - LETALIŠČE (lon=13.6160, lat=45.4753, viš=2m) ... 13.12.2023  id=1896
const cv_placePortorozLetalisce = addPlace("Portoro" + scZhLow + " Letali" + scSchLow + scTchLow + "e (2m)", "Portoro" + scZhLow, "PRT" + scZh, "Portoro" + scZhLow, "deepSkyBlue", "white");
station = addStation(cv_placePortorozLetalisce, 1896, "PORTORO" + scZh + " - LETALI" + scSch + scTch + "E", "13.6160", "45.4753", "", 2, 6, 1988, 0, 0);

// KOČEVJE  ... 13.12.2023  id=1896
const cv_placeKocevje = addPlace("Ko" + scTchLow + "evje (467m)", "Ko" + scTchLow + "evje", "KO" + scTch + "E", "Ko" + scTchLow + "evje", "indianRed", "white");
station = addStation(cv_placeKocevje, 2512, "KO" + scTch + "EVJE", "14.8589", "45.6375", "", 464, 1, 1950, 5, 1951);
station = addStation(cv_placeKocevje, 409, "KO" + scTch + "EVJE", "14.8603", "45.6362", "", 463, 7, 1951, 7, 1989);
station = addStation(cv_placeKocevje, 410, "KO" + scTch + "EVJE", "14.8640", "45.6374", "", 467, 9, 1989, 10, 1993);
station = addStation(cv_placeKocevje, 1694, "KO" + scTch + "EVJE", "14.8501", "45.6460", "", 467, 12, 1993, 0, 0);

// RATEČE (lon=13.7129, lat=46.4971, viš=864m)  ... 13.12.2023  id=1086 (za 1948) in 1899 (za 1949-zdaj)
const cv_placeRatece = addPlace("Rate" + scTchLow + "e (864m)", "Rate" + scTchLow + "e", "RATE", "Rate" + scTchLow + "e", "slateBlue", "white");
station = addStation(cv_placeRatece, 1086, "RATE" + scTch + "E", "13.7129", "46.4971", "", 864, 1, 1948, 12, 1948);
station = addStation(cv_placeRatece, 1899, "RATE" + scTch + "E", "13.7129", "46.4971", "", 864, 1, 1949, 0, 0);

// VOJSKO lokacije postaj glej spodaj med podatki  ... 13.12.2023  id=192 (za 1958-1993) in 1654 (za 1993-zdaj)
const cv_placeVojsko = addPlace("Vojsko (1065m)", "Vojsko", "VOJS", "Vojsko", "mediumOrchid", "white");
station = addStation(cv_placeVojsko, 192, "VOJSKO", "13.9031", "46.0250", "", 1070, 11, 1958, 11, 1993);
station = addStation(cv_placeVojsko, 1654, "VOJSKO", "13.9021", "46.0254", "", 1065, 12, 1993, 0, 0);

// BRNIK LETALIŠČE lokacije in ARSO-Id postaj glej spodaj med podatki  ... 13.12.2023  
const cv_placeBrnikLetalisce = addPlace("Brnik Letali" + scSchLow + scTchLow + "e (362m)", "Brnik", "BRLET", "Brnik", "oliveDrab", "white");
station = addStation(cv_placeBrnikLetalisce, 1076, "BRNIK - LETALI" + scSch + scTch + "E", "14.4574", "46.2288", "", 380, 1, 1964, 4, 1966);
station = addStation(cv_placeBrnikLetalisce, 1079, "BRNIK - LETALI" + scSch + scTch + "E", "14.4747", "46.2169", "", 363, 6, 1966, 10, 1978);
station = addStation(cv_placeBrnikLetalisce, 1085, "BRNIK - LETALI" + scSch + scTch + "E", "14.4542", "46.2311", "", 384, 12, 1978, 4, 1994);
station = addStation(cv_placeBrnikLetalisce, 1898, "LETALI" + scSch + scTch + "E JO" + scZh + "ETA PU" + scTch + "NIKA LJUBLJANA", "14.4728", "46.2175", "", 364, 6, 1994, 9, 2017);
station = addStation(cv_placeBrnikLetalisce, 3049, "LETALI" + scSch + scTch + "E JO" + scZh + "ETA PU" + scTch + "NIKA LJUBLJANA", "14.4784", "46.2114", "", 362, 8, 2017, 0, 0);

// BIZELJSKO lokacije in ARSO-Id postaj glej spodaj med podatki  ... 17.12.2023  
const cv_placeBizeljsko = addPlace("Bizeljsko (175m)", "Bizeljsko", "BIZEL", "Bizeljsko", "slateBlue", "white");
station = addStation(cv_placeBizeljsko, 532, "BIZELJSKO - STARA VAS", "15.6945", "45.9910", "", 163, 7, 1949, 4, 1954);
station = addStation(cv_placeBizeljsko, 533, "BIZELJSKO - ZGORNJA SU" + scSch + "ICA", "15.6947", "46.0154", "", 174, 6, 1954, 4, 1979);
station = addStation(cv_placeBizeljsko, 534, "BIZELJSKO", "15.6946", "46.0148", "", 172, 5, 1979, 10, 1994);
station = addStation(cv_placeBizeljsko, 1719, "BIZELJSKO", "15.6948", "46.0153", "", 173, 12, 1994, 12, 2012);
station = addStation(cv_placeBizeljsko, 2849, "BIZELJSKO", "15.6913", "46.0159", "", 173, 1, 2013, 0, 0);

// MARIBOR LETALIŠČE EDVARDA RUSJANA lokacije in ARSO-Id postaj glej spodaj med podatki  ... 17.12.2023  
const cv_placeMariborLetalisce = addPlace("Maribor Letali" + scSchLow + scTchLow + "e (264m)", "MB Letali" + scSchLow + scTchLow + "e", "MBLET", "Maribor Letali" + scSchLow + scTchLow + "e", "forestGreen", "white");
station = addStation(cv_placeMariborLetalisce, 1902, "LETALI" + scSch + scTch + "E EDVARDA RUSJANA MARIBOR", "15.6818", "46.4797", "", 264, 1, 1977, 0, 0);

// LOGATEC lokacije in ARSO-Id postaj glej spodaj med podatki  ... 18.12.2023  
const cv_placeLogatec = addPlace("Logatec (485m)", "Logatec", "LOGTC", "Logatec", "darkCyan", "white");
station = addStation(cv_placeLogatec, 2650, "Logatec", "14.2032", "45.9077", "A", 485, 2, 2014, 0, 0);

// TOLMIN lokacije in ARSO-Id postaj glej spodaj med podatki  ... 18.12.2023  
const cv_placeTolmin = addPlace("Tolmin - Vol" + scTchLow + "e (188m)", "Tolmin - Vol" + scTchLow + "e", "TOLV", "Tolmin", "brown", "white");
station = addStation(cv_placeTolmin, 2650, "TOLMIN - VOL" + scTch + "E", "13.7180", "46.1777", "A", 188, 10, 2015, 0, 0);

// VELENJE - TEŠ  lokacije in ARSO-Id postaj glej spodaj med podatki  ... 19.12.2023  
const cv_placeVelenje = addPlace("Velenje - TE" + scSch + " (388m)", "Velenje - TE" + scSch, "VELTE" + scSch, "Velenje", "darkSlateGray", "white");
station = addStation(cv_placeVelenje, 1837, "VELENJE - TE" + scSch, "15.1119", "46.3603", "A", 388, 8, 1990, 0, 0);
addUndefPlaceDataPeriod(cv_placeVelenje, 4, 1999, 12, 2004); //tu vmes ni podatkov, vseeno pa ohranim eno lokacijo, le graf se tu vmes ne bo prikazoval

// PTUJ - TERME  lokacije in ARSO-Id postaj glej spodaj med podatki  ... 19.12.2023  
const cv_placePtuj = addPlace("Ptuj - Terme (222m)", "Ptuj - Terme", "PTUJ", "Ptuj", "darkOrange", "white");
station = addStation(cv_placePtuj, 1266, "PTUJ - TERME", "15.8543", "46.4219", "A", 223, 12, 1995, 2, 2006);
station = addStation(cv_placePtuj, 1859, "PTUJ - TERME", "15.8512", "46.4213", "A", 222, 4, 2006, 11, 2016);
station = addStation(cv_placePtuj, 2701, "PTUJ", "15.8492", "46.4197", "A", 222, 12, 2016, 0, 0);

// AJDOVŠČINA  lokacije in ARSO-Id postaj glej spodaj med podatki  ... 21.12.2023  
const cv_placeAjdovscina = addPlace("Ajdov" + scSchLow + scTchLow + "ina (86m)", "Ajdov" + scSchLow + scTchLow + "ina", "AJDV", "Ajdov" + scSchLow + scTchLow + "ina", "seaGreen", "white");
station = addStation(cv_placeAjdovscina, 1857, "AJDOV" + scSch + scTch + "INA - DOLENJE", "13.9013", "45.8662", "A", 86, 2, 1993, 0, 0);

// id=1266 AVTOMATSKA !!  PTUJ - TERME (lon = 15.8543 lat = 46.4219 viš = 223m)
// id=1859 AVTOMATSKA !!  PTUJ - TERME (lon = 15.8512 lat = 46.4213 viš = 222m)


//---- pomočnik za pripravo vzorca za novo postajo, rezultat v debug konzoli
//genPlaceTemplate("cv_placePostojna", 1950, 2022)
//genPlaceTemplate("cv_placeNovaGoricaBilje55m", 1991, 2022)
//genPlaceTemplate("cv_placeNovaGoricaBilje51m", 1962, 1991)
//genPlaceTemplate("cv_placeKredarica", 1955, 2022)
//genPlaceTemplate("cv_placeSlovenjGradecSmartno", 1954, 2022)

//---- postopek dodajanja nove lokacije s pomočjo mojega vb.net orodja avgTemp (12.12.2023)
// najprej potrebuješ ARSO ID postaje
// zato greš na meteo.si "Arhiv meritev", in potem klikneš "ARHIV - opazovani in merjeni meteorološki podatki po Sloveniji"
//      izbereš "Letni podatki s prikazom po mesecih", počekiraš glavne in meteorološke postaje, izbereš neko letnico za podatke
// odpreš google chrome extension HTTP-TRACKER
// na meteo.si končno klikneš na gumb "Poizvedi"
// v HTTP trackerju klikneš na prikazani HTTP REQ in spodaj v URL poiščeš podatek id=
// odpreš vb.net orodje avgTemp in klikneš na gumb "ARSO"
// izbereš zahtevani interval v letih, vpišeš prej odčitani id postaje in vpišeš literal nove lokacije
// dobiš JS source kodo za zahtevane podatke postaje v zahtevanem obdobju, ki jo prekopiraš v VSCode JS projekt tempStat
//----

var gl_configChanged = true; // 19.12.2023
var gl_appStart = true;      // 19.12.2023

var lo_focusPlace = cv_placeNone;
var lo_focusMonth = 0;
let place, month;

//---- koordinate multi-place grafov (14.2.2023 v1.15)
const placeGraphLeft = []; // new Array(nrPlaces)
const placeGraphLeftAxis = []; // new Array(nrPlaces)
const placeGraphLeftData = []; // new Array(nrPlaces)
const placeGraphRightData = []; // new Array(nrPlaces)
const placeGraphRight = []; // new Array(nrPlaces)
const placeGraphKx = []; // new Array(nrPlaces)
//
const placeGraphTop = []; // new Array(nrPlaces)
const placeGraphTopData = []; // new Array(nrPlaces)
const placeGraphBottomAxis = []; // new Array(nrPlaces)
const placeGraphBottom = []; // new Array(nrPlaces)
const placeGraphKy = []; // new Array(nrPlaces)
//
const placeGraphWidth = []; // new Array(nrPlaces)
const placeGraphHeight = []; // new Array(nrPlaces)
//
for (place = cv_minPlace; place <= nrPlaces; place++) {
    placeGraphLeft[place] = 0;
    placeGraphLeftAxis[place] = 0;
    placeGraphLeftData[place] = 0;
    placeGraphRightData[place] = 0;
    placeGraphRight[place] = 0;
    placeGraphKx[place] = 0;
    placeGraphTop[place] = 0;
    placeGraphTopData[place] = 0;
    placeGraphBottomAxis[place] = 0;
    placeGraphBottom[place] = 0;
    placeGraphKy[place] = 0;
    placeGraphWidth[place] = 0;
    placeGraphHeight[place] = 0;
}
// še za primer all-place grafov - bodo kar globalne spremenljivke (14.2.2023 v1.15)
var lo_graphLeft = 0;
var lo_graphLeftAxis = 0;
var lo_graphLeftData = 0;
var lo_graphRightData = 0;
var lo_graphRight = 0;
var lo_graphKx = 0;
var lo_graphTop = 0;
var lo_graphTopData = 0;
var lo_graphBottomAxis = 0;
var lo_graphBottom = 0;
var lo_graphKy = 0;
var lo_graphWidth = 0;
var lo_graphHeight = 0;

//---- toggles for places
var lo_enabledPlaceAll = true;
var lo_enabledPlace = new Array(nrPlaces)
for (place = cv_minPlace; place <= nrPlaces; place++) {
    lo_enabledPlace[place] = true;
}
var nrSelectedPlaces = 0; 

//---------------------------------------------------------------------
//------------ PODATKI O POVPREČNIH TEMPERATURAH PO KRAJIH ------------
//---------------------------------------------------------------------

addAvgTempYear(cv_placeSkofjaLoka, 2009, 8, [20, 16.5, 9.8, 5.9, 0.9]);
addAvgTempYear(cv_placeSkofjaLoka, 2010, 1, [-2.6, -0.1, 4.7, 10.2, 14.2, 18.7, 21, 18.6, 13.7, 8.5, 6.9, -1.3]);
addAvgTempYear(cv_placeSkofjaLoka, 2011, 1, [0.3, 0.5, 5.4, 12.1, 14.8, 18.2, 19, 20.6, 17.9, 8.7, 2.1, 1.8]);
addAvgTempYear(cv_placeSkofjaLoka, 2012, 1, [0.6, -2.6, 8.7, 9.8, 14.6, 19.4, 20.9, 21.4, 16.2, 10.2, 7.4, -0.5]);
addAvgTempYear(cv_placeSkofjaLoka, 2013, 1, [0.6, -0.5, 2.4, 10, 13.2, 17.8, 21.4, 20.8, 15, 11.6, 6.1, 1.5]);
addAvgTempYear(cv_placeSkofjaLoka, 2014, 1, [4.1, 3, 8.2, 12.2, 14.2, 18.1, 18.8, 18.6, 15.1, 12.8, 7.8, 2.6]);
addAvgTempYear(cv_placeSkofjaLoka, 2015, 1, [1.7, 1.3, 6.3, 10, 15.2, 18.8, 22.7, 20.8, 14.7, 9.6, 5.8, 1.2]);
addAvgTempYear(cv_placeSkofjaLoka, 2016, 1, [-0.1, 4.2, 6, 11.2, 13.9, 18.6, 21.7, 19.3, 17.1, 9.1, 6, -1.1]);
addAvgTempYear(cv_placeSkofjaLoka, 2017, 1, [-4.2, 3, 8.5, 10.6, 15.6, 20, 21.2, 21.3, 13.2, 10.4, 5.2, 0.1]);
addAvgTempYear(cv_placeSkofjaLoka, 2018, 1, [3.1, -1.5, 3, 13.3, 16.6, 19.2, 20.7, 21.2, 16.2, 11.8, 7.1, 0.9]);
addAvgTempYear(cv_placeSkofjaLoka, 2019, 1, [-0.5, 3.5, 6.9, 10, 11.7, 21.9, 21.1, 20.9, 15.7, 11.8, 7.7, 2.7]);
addAvgTempYear(cv_placeSkofjaLoka, 2020, 1, [0.6, 4.8, 5.8, 11.2, 13.8, 16.7, 20.2, 20.9, 16.3, 10.4, 4.6, 1.9]);
addAvgTempYear(cv_placeSkofjaLoka, 2021, 1, [-0.7, 3.9, 5, 7.9, 12.2, 21.2, 21.9, 19.3, 16.2, 8.8, 4.4, -0.3]);
addAvgTempYear(cv_placeSkofjaLoka, 2022, 1, [-0.4, 3.4, 4.9, 9.2, 16.7, 21.6, 22.8, 21.8, 14.7, 13.0, 6.5, 2.8]);
addAvgTempYear(cv_placeSkofjaLoka, 2023, 1, [2.4, 1.6, 6.8, 9.1, 14.9, 19.7, 21.6, 20.4, 17.4, 13.5, 5.5]);

addAvgTempYear(cv_placeMariborVrbanskiPlato, 2020, 1, [0.1, 5.3, 6.3, 11, 14.1, 18.3, 20, 21, 16.4, 10.7, 4.4, 1.6]);
addAvgTempYear(cv_placeMariborVrbanskiPlato, 2021, 1, [1.5, 3.4, 5.2, 8.4, 12.7, 21.2, 21.8, 19, 15.9, 9.1, 5.1, 1.6]);
addAvgTempYear(cv_placeMariborVrbanskiPlato, 2022, 1, [1.5, 4.1, 4.7, 9.1, 16.6, 20.9, 21.5, 21, 14.7, 12.7, 6.6, 2.2]);

//5.12.2023 https://meteo.arso.gov.si/met/sl/app/webmet/#webmet==8Sdwx2bhR2cv0WZ0V2bvEGcw9ydlJWblR3LwVnaz9SYtVmYh9iclFGbt9SaulGdugXbsx3cs9mdl5WahxXYyNGapZXZ8tHZv1WYp5mOnMHbvZXZulWYnwCchJXYtVGdlJnOn0UQQdSf;
//---- https://meteo.arso.gov.si/uploads/probase/www/climate/text/sl/stations/Maribor%20Tabor.pdf
addAvgTempYear(cv_placeMariborTabor, 1962, 7, [17.6, 19.7, 13.4, 10, 3.4, -4.1]);
addAvgTempYear(cv_placeMariborTabor, 1963, 1, [-6.1, -4.3, 3.1, 10.6, 14.1, 18.6, 20.4, 19.3, 15.9, 9.6, 9.8, -5]);
addAvgTempYear(cv_placeMariborTabor, 1964, 1, [-6.5, -0.2, 2.4, 10.6, 14.4, 19.8, 19.6, 17.7, 14.9, 9.2, 6.3, -0.1]);
addAvgTempYear(cv_placeMariborTabor, 1965, 1, [0.3, -2.8, 5.3, 8.3, 13.1, 17.8, 18.6, 16.8, 15.1, 8.8, 2.4, 1.8]);
addAvgTempYear(cv_placeMariborTabor, 1966, 1, [-3.6, 7.1, 4.7, 11.9, 14.7, 18.2, 18.2, 17.4, 15.4, 13.4, 2.6, 0.8]);
addAvgTempYear(cv_placeMariborTabor, 1967, 1, [-2.1, 1.8, 6.7, 9.1, 15.4, 17.3, 21.1, 18.5, 15.8, 11.4, 5.2, -0.6]);
addAvgTempYear(cv_placeMariborTabor, 1968, 1, [-2.6, 2.4, 6.1, 11.8, 14.9, 18, 19.4, 17.8, 14.5, 10.6, 5, -2.7]);
addAvgTempYear(cv_placeMariborTabor, 1969, 1, [-2.2, -1, 3.1, 9.6, 16.3, 16.7, 19.4, 17.3, 15.3, 10.3, 7, -3.2]);
addAvgTempYear(cv_placeMariborTabor, 1970, 1, [-1.3, 0.7, 3.2, 8.7, 12.9, 18.9, 19.3, 18.9, 14.9, 9, 7, -0.5]);
addAvgTempYear(cv_placeMariborTabor, 1971, 1, [-0.6, 2.3, 2.3, 11, 16.1, 17.4, 20.7, 20.1, 13, 9.4, 4.2, 1.2]);
addAvgTempYear(cv_placeMariborTabor, 1972, 1, [-3, 2.7, 7.2, 10.1, 14, 18.4, 19.4, 18.3, 12.1, 8.4, 5, -0.3]);
addAvgTempYear(cv_placeMariborTabor, 1973, 1, [-1, 1.5, 4.9, 7.8, 15.9, 18.1, 19.4, 19.1, 15.6, 7.9, 2.5, 0.5]);
addAvgTempYear(cv_placeMariborTabor, 1974, 1, [1.2, 4.9, 7, 9.3, 13.9, 16.4, 19.5, 20.3, 14.7, 6.2, 5.6, 3.4]);
addAvgTempYear(cv_placeMariborTabor, 1975, 1, [3.6, 1.5, 6, 9.8, 15.8, 16.6, 19.5, 18.6, 17.3, 9.9, 3.6, 0]);
addAvgTempYear(cv_placeMariborTabor, 1976, 1, [1, 0.1, 2.3, 10, 14.9, 18.5, 21, 16.4, 14.2, 10.6, 6.1, -0.2]);
addAvgTempYear(cv_placeMariborTabor, 1977, 1, [0.9, 4.7, 8.7, 8.7, 14.8, 19.3, 19.6, 18.5, 13.3, 11.3, 6.1, -0.3]);
addAvgTempYear(cv_placeMariborTabor, 1978, 1, [0.2, 0.7, 6.9, 8.8, 13, 17.2, 18, 17.4, 14.7, 9.9, 1.2, 0.4]);
addAvgTempYear(cv_placeMariborTabor, 1979, 1, [-2.5, 1.3, 7.1, 9, 15.6, 19.5, 18, 17.8, 15.3, 9.2, 5.4, 3.5]);
addAvgTempYear(cv_placeMariborTabor, 1980, 1, [-2.4, 2.5, 4.8, 8.1, 12.1, 17.5, 18.6, 19.2, 15.3, 9.7, 3.1, -0.3]);
addAvgTempYear(cv_placeMariborTabor, 1981, 1, [-2.1, 0.8, 8.1, 10.4, 14.5, 18.6, 19.5, 19.1, 16.2, 11.7, 5, 0.2]);
addAvgTempYear(cv_placeMariborTabor, 1982, 1, [-2.6, -1.1, 5.5, 8.4, 15.2, 18.9, 20.5, 19.6, 18, 11, 6.2, 3.4]);
addAvgTempYear(cv_placeMariborTabor, 1983, 1, [3.2, -0.8, 6.7, 12.4, 15.8, 17.9, 22.5, 19.8, 15.8, 10.3, 1.7, 0.7]);
addAvgTempYear(cv_placeMariborTabor, 1984, 1, [-0.2, 0, 4.3, 9.1, 13.2, 17.4, 18.4, 18.7, 15, 11.5, 4.7, 0.6]);
addAvgTempYear(cv_placeMariborTabor, 1985, 1, [-5.3, -3.1, 3.9, 10.1, 15.9, 16.8, 20.3, 19.9, 16.2, 9.8, 2.6, 3.6]);
addAvgTempYear(cv_placeMariborTabor, 1986, 1, [0.4, -4.2, 2.7, 10.8, 17.6, 17.4, 19.6, 20.3, 15.1, 10.4, 5, -1.2]);
addAvgTempYear(cv_placeMariborTabor, 1987, 1, [-4, 0.3, 0.4, 11.2, 13.3, 18.1, 21.4, 17.9, 17.9, 11.1, 4.8, 1.3]);
addAvgTempYear(cv_placeMariborTabor, 1988, 1, [2.6, 3, 4.9, 9.8, 15.2, 17.6, 21.3, 20.2, 15.4, 10.5, 1, 1.1]);
addAvgTempYear(cv_placeMariborTabor, 1989, 1, [-0.7, 4.2, 8.7, 11, 14.7, 16.6, 20.2, 19.2, 15.4, 10.7, 3.2, 2.4]);
addAvgTempYear(cv_placeMariborTabor, 1990, 1, [-0.3, 6.1, 8.8, 9.6, 16.2, 17.7, 19.4, 19.8, 13.8, 10.7, 4.9, 0]);
addAvgTempYear(cv_placeMariborTabor, 1991, 1, [0.4, -2, 7.7, 8.9, 11.8, 18, 21.4, 19.8, 16.6, 8.6, 5, -1.4]);
addAvgTempYear(cv_placeMariborTabor, 1992, 1, [1, 3.5, 6.2, 10.9, 15.5, 19.2, 21.1, 24.7, 16.8, 9.2, 6, 0.4]);
addAvgTempYear(cv_placeMariborTabor, 1993, 1, [1.5, 0.6, 5.3, 10.9, 17.6, 19.1, 20.2, 20.4, 15.3, 11.4, 1.6, 1.7]);
addAvgTempYear(cv_placeMariborTabor, 1994, 1, [3.8, 1.9, 9.5, 10.3, 15.4, 19.1, 22.4, 21.6, 17.3, 8.7, 7.5, 1.6]);
addAvgTempYear(cv_placeMariborTabor, 1995, 1, [0.1, 5, 5, 11.4, 15, 17.2, 22.2, 18.9, 14.5, 11.7, 3.5, 0]);
addAvgTempYear(cv_placeMariborTabor, 1996, 1, [-1.4, -1.8, 2.3, 10.5, 16.4, 19.7, 19, 19.3, 12.7, 11, 7.5, -1.8]);
addAvgTempYear(cv_placeMariborTabor, 1997, 1, [-1.9, 3.8, 6.3, 8.4, 16.4, 19, 19.9, 19.8, 16.1, 8.6, 5.4, 2.6]);
addAvgTempYear(cv_placeMariborTabor, 1998, 1, [2.6, 6.1, 5.2, 11.6, 15.7, 19.9, 20.8, 20.8, 15.1, 11, 3.2, -1.9]);
addAvgTempYear(cv_placeMariborTabor, 1999, 1, [0.4, 1.4, 7.7, 11.7, 15.8, 18.8, 20.8, 19.4, 17.6, 11.5, 2.8, 0.6]);
addAvgTempYear(cv_placeMariborTabor, 2000, 1, [-2.3, 4.6, 7.3, 14.1, 17.1, 21.1, 20, 22.4, 16, 12.6, 8.6, 3.1]);
addAvgTempYear(cv_placeMariborTabor, 2001, 1, [1.9, 4, 8.5, 9.8, 17.4, 18.1, 21.7, 22, 13.7, 13.8, 3.3, -2.2]);
addAvgTempYear(cv_placeMariborTabor, 2002, 1, [0.5, 5.5, 8.1, 10, 17.8, 21.5, 21.9, 20.3, 14.9, 11.1, 9, 1.1]);
addAvgTempYear(cv_placeMariborTabor, 2003, 1, [-1.7, -2, 6.9, 10, 18.5, 23.5, 22.7, 24.4, 15.4, 8.6, 7.4, 1.3]);
addAvgTempYear(cv_placeMariborTabor, 2004, 1, [-0.6, 2.3, 4.6, 10.9, 13.9, 18.4, 20.5, 20.8, 15.5, 12.3, 5.5, 1]);
addAvgTempYear(cv_placeMariborTabor, 2005, 1, [-0.6, 2.3, 4.6, 10.9, 13.9, 18.4, 20.5, 20.8, 15.5, 12.3, 5.5, 1]); //kopirano iz 2004, ker ni podatkov za 2005!!!
addAvgTempYear(cv_placeMariborTabor, 2006, 1, [-3.2, 0.1, 4.5, 11.6, 15.2, 19.7, 23.4, 17.8, 17.4, 12.9, 7.4, 2.6]);
addAvgTempYear(cv_placeMariborTabor, 2007, 1, [4.6, 5.8, 8, 13.7, 17.2, 21.2, 22.4, 20.2, 14, 9.5, 4.6, -0.5]);
addAvgTempYear(cv_placeMariborTabor, 2008, 1, [2.8, 4.5, 6.2, 11, 16.9, 20.2, 21.3, 20.7, 14.9, 11.6, 6.2, 1.9]);
addAvgTempYear(cv_placeMariborTabor, 2009, 1, [-1.5, 1.9, 6.5, 13.7, 17.1, 18.5, 21.5, 21.2, 17.1, 10.6, 6.9, 1.9]);
addAvgTempYear(cv_placeMariborTabor, 2010, 1, [-1.6, 1.4, 6.1, 11.2, 15.7, 20.1, 23, 19.7, 14, 8.9, 7.3, 0.3]);
addAvgTempYear(cv_placeMariborTabor, 2011, 1, [1, 0.5, 6.5, 13.3, 16.4, 20.1, 20.4, 21.8, 18.9, 10, 3.4, 2.7]);
addAvgTempYear(cv_placeMariborTabor, 2012, 1, [1.5, -1.8, 9.3, 11.6, 16.1, 21.4, 22.2, 22.5, 17.2, 10.7, 8, 1.2]);
addAvgTempYear(cv_placeMariborTabor, 2013, 1, [0.6, 0.9, 3.3, 12.3, 15.2, 19.9, 23.3, 22.4, 15.6, 12.3, 6.4, 2.1]);
addAvgTempYear(cv_placeMariborTabor, 2014, 1, [3.3, 3.9, 9.5, 12.6, 15, 19.4, 20.9, 18.9, 15.6, 12.8, 8.6, 3]);
addAvgTempYear(cv_placeMariborTabor, 2015, 1, [2.7, 2, 7, 11.6, 15.9, 19.9, 23.2, 22.2, 16.2, 10.3, 7.5, 2.6]);
addAvgTempYear(cv_placeMariborTabor, 2016, 1, [-0.3, 5.8, 6.8, 12, 15.2, 19.6, 22.3, 20, 17.8, 9.9, 6.3, 0]);
addAvgTempYear(cv_placeMariborTabor, 2017, 1, [-4.2, 4.1, 9.7, 11.1, 16.9, 21.5, 22.5, 22.3, 14.8, 11.5, 5.8, 2.7]);
addAvgTempYear(cv_placeMariborTabor, 2018, 1, [3.8, -0.6, 3.8, 15.1, 17.7, 20.2, 21.9, 22.2, 17.1, 12.5, 7.1, 1.8]);
addAvgTempYear(cv_placeMariborTabor, 2019, 1, [0.6, 4.8, 8.5, 11.6, 12.8, 22.8, 21.9, 22, 16.2, 12.4, 8.2, 3.8]);
addAvgTempYear(cv_placeMariborTabor, 2020, 1, [0.8]);

//---- LJUBLJANA BEŽIGRAD ... https://meteo.arso.gov.si/uploads/probase/www/climate/text/sl/stations/ljubljana-bezigrad.pdf
addAvgTempYear(cv_placeLjubljanaBezigrad, 1948, 1, [4.2, 0.2, 5.6, 11.1, 15.4, 16.9, 17.5, 18.9, 15.7, 10.9, 3.8, -1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1949, 1, [1.4, 1.3, 3.6, 12.3, 13.8, 16.7, 19.6, 18.4, 16.4, 11.1, 6, 2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1950, 1, [-3.1, 2.9, 7, 9.6, 16.7, 20.4, 22.7, 20.1, 15.5, 8.8, 5.1, 0.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1951, 1, [2, 3.3, 4.6, 9.9, 14.1, 18.5, 19.4, 19.8, 17, 9, 7.6, 1.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1952, 1, [-2, -2.5, 3.1, 12.4, 14.3, 19.2, 21.9, 20.6, 13.1, 9.9, 3.6, -0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1953, 1, [-2.3, -0.5, 5, 11.1, 14.4, 17.7, 20.2, 17.8, 15.9, 12.4, 3.3, 1.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1954, 1, [-5.2, -3.7, 6, 8.6, 13.4, 18.7, 17.8, 18, 16.2, 9.5, 4.4, 3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1955, 1, [1.1, 2.4, 1.8, 8.7, 12.9, 16.9, 19.3, 17.9, 14.7, 9.5, 3.6, 2.3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1956, 1, [2, -7.8, 2.8, 8.3, 15.1, 16.3, 19.8, 18.9, 15.9, 9.5, 2.3, -0.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1957, 1, [-2.9, 4.5, 7.4, 9.8, 11.5, 19.6, 19.8, 18, 14.3, 10, 5.9, 1.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1958, 1, [-2.7, 3.2, 2, 7.6, 18.1, 17.7, 20.5, 19.8, 15.3, 11, 6.4, 3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1959, 1, [0.7, -0.8, 7.8, 10.6, 14.3, 17.9, 20.8, 18.5, 14.1, 8.9, 5.2, 3.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1960, 1, [-0.4, 1.1, 5.4, 9.9, 14.6, 18.6, 18.2, 18.8, 13.8, 11.5, 6.6, 2.8]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1961, 1, [-1.9, 2.6, 7.7, 12.9, 13.5, 19.1, 18.5, 19, 17.2, 12.1, 6.1, -0.8]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1962, 1, [0.1, 1.1, 2.2, 9.8, 13.4, 16, 18.3, 20.8, 14.8, 10.4, 4.2, -3.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1963, 1, [-6.2, -3.1, 3.7, 11, 14.1, 18.2, 20.7, 19.6, 16.4, 10, 10, -2.8]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1964, 1, [-5.7, 0.3, 3.5, 11.1, 15.2, 20.1, 20.3, 18.2, 15.8, 9.9, 6.3, 0.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1965, 1, [-0.5, -2.2, 5.4, 8.5, 13.4, 18.4, 19.2, 17.3, 15.1, 9.3, 3.6, 1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1966, 1, [-3.4, 6.8, 4.9, 11.8, 15, 19.3, 18.5, 17.9, 16.1, 14, 2.7, 1.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1967, 1, [-1.5, 1.7, 7.2, 8.9, 15.7, 17.3, 21.6, 19.6, 16.2, 11.7, 5.5, -0.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1968, 1, [-3.1, 3.2, 6.6, 12.4, 14.8, 17.8, 19.6, 17.9, 15, 11.6, 5.1, -2.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1969, 1, [-1.6, -0.8, 3.9, 9.6, 16.8, 17.2, 20.2, 18, 15.9, 9.9, 7.6, -2.8]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1970, 1, [0.1, 0.8, 3.3, 8.5, 12.6, 19.1, 19.7, 19.6, 16, 9.7, 7.3, -0.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1971, 1, [-1, 2.3, 2.8, 11.2, 15.8, 16.8, 20.9, 21, 13.1, 9, 4.4, -1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1972, 1, [-1.8, 2.8, 7.7, 10.1, 14, 18.4, 19.4, 18.8, 12.3, 9.1, 4.5, 0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1973, 1, [-0.1, 1.1, 5.5, 7.8, 15.8, 18.5, 19.6, 19.4, 16, 8.1, 3.1, 0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1974, 1, [1.4, 5.7, 7.4, 9.5, 14, 16.2, 19.7, 20.7, 15.4, 6.5, 5.8, 2.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1975, 1, [4.3, 2, 5.9, 10, 15.6, 16.5, 19.8, 19, 17.7, 9.5, 4.2, -0.3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1976, 1, [0.2, 0.3, 2.2, 9.9, 15.1, 18.4, 20.5, 16.2, 14.2, 10.7, 6.7, 0]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1977, 1, [1.9, 4.5, 8.6, 8.6, 14.2, 18.4, 19.1, 18.2, 13.1, 11.5, 5.3, -0.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1978, 1, [0.4, 0.8, 6.9, 8.5, 12.4, 17.1, 17.8, 17.4, 14.4, 9.6, 1, -0.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1979, 1, [-2.1, 2, 6.8, 8.8, 15.5, 19.5, 18.8, 17.8, 15.3, 9.6, 4.4, 2.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1980, 1, [-1.3, 3.1, 5.6, 7.9, 12.2, 16.9, 18.3, 19.7, 15.6, 9.8, 2.5, -2.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1981, 1, [-4.1, -0.3, 7.7, 10.5, 14.3, 18.2, 19.6, 18.8, 16.1, 12.1, 3.8, 0]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1982, 1, [-1.9, -0.7, 4.9, 8.4, 14.9, 19, 21.2, 19.9, 17.9, 11.1, 5.9, 3.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1983, 1, [1.3, -1.1, 6.1, 12, 15.2, 18.4, 22.6, 19.7, 15.6, 10, 1.7, 0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1984, 1, [-0.5, 0.3, 4.3, 9.2, 12.8, 17.4, 18.9, 18.3, 15, 11.6, 5.3, 1.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1985, 1, [-5, -2.4, 4.2, 9.4, 15.2, 16.7, 21.2, 20, 16.4, 9.9, 2.6, 3.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1986, 1, [0.1, -2.8, 3.2, 10.2, 17.6, 17.4, 19.6, 20.2, 14.7, 10.2, 5.5, -1.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1987, 1, [-3.4, 0.5, 1.1, 11.1, 13.3, 17.8, 21.4, 18.7, 18.3, 11.2, 4.5, 0.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1988, 1, [3.8, 3.4, 5.4, 10.4, 15.3, 17.4, 22, 20.8, 15.5, 11.5, 0.9, -0.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1989, 1, [-0.7, 4.1, 8.5, 10.6, 14.9, 16.5, 20.2, 19.7, 15.5, 10.2, 3.5, 2.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1990, 1, [-0.5, 5.7, 8.8, 9.1, 16.2, 17.7, 20.2, 20, 14.1, 11.3, 5.1, 0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1991, 1, [0.7, -1.4, 8.4, 9.4, 12.1, 18.2, 21.8, 20.6, 17.5, 9.2, 5.1, -2.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1992, 1, [0.6, 3.4, 6.3, 10.8, 16.1, 18.5, 21.2, 23.7, 16.3, 9.6, 6.6, 0.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1993, 1, [0.9, 1, 5.8, 11.2, 17, 19.2, 20.4, 20.9, 14.9, 11.4, 2.5, 1.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1994, 1, [3.5, 2.6, 10.6, 10.1, 15.3, 19.3, 22.5, 22.1, 17.1, 8.9, 7.7, 2.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1995, 1, [1, 4.5, 5.1, 11.3, 15.1, 17, 22.8, 19.1, 14.3, 12.3, 5.3, 1.3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1996, 1, [-0.8, -0.9, 3.4, 10.6, 16, 19.7, 19.1, 19.5, 13.2, 11, 7.5, -1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1997, 1, [-0.5, 4.1, 7.5, 8.5, 16.3, 19, 20.1, 20.2, 16.6, 9.6, 5.3, 2.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1998, 1, [3.2, 5.3, 5.8, 11, 15.8, 20.7, 21.5, 21.6, 15.6, 11.4, 3.4, -3.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 1999, 1, [0.6, 0.8, 7.8, 11.6, 16.7, 19.1, 20.9, 20.5, 18.1, 11.8, 3.1, 0.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2000, 1, [-1.6, 4, 7.6, 13.6, 17, 20.9, 19.9, 22.1, 16.4, 12.9, 8.4, 4.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2001, 1, [3.4, 4.7, 8.8, 10.1, 17.2, 18.4, 21.9, 22.9, 13.8, 14, 3.6, -2.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2002, 1, [-0.6, 5, 8.9, 10.1, 17.3, 21.1, 21.3, 20.1, 15, 11.5, 9.4, 2.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2003, 1, [-1.1, -0.9, 7.4, 10.3, 18.3, 23.5, 22.6, 24.2, 15.5, 8.8, 8.2, 2.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2004, 1, [-0.3, 2.2, 5, 10.7, 14, 18.8, 20.9, 20.7, 15.6, 13, 5.9, 1.5]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2005, 1, [0.1, -0.3, 5.7, 10.8, 16.3, 19.5, 21.1, 18.4, 16.4, 11.8, 5.1, 0.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2006, 1, [-1.6, 0.5, 4.5, 11.5, 15.5, 20.5, 23.6, 17.7, 17.7, 13.4, 8.9, 4.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2007, 1, [4.9, 5.9, 8.5, 14.7, 17.2, 20.9, 22, 20.4, 14.5, 10.4, 5.1, 0.1]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2008, 1, [2.5, 4.6, 6.2, 10.7, 16.9, 20.3, 21.4, 20.7, 15.1, 12, 6.4, 2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2009, 1, [-1.5, 2.3, 7.1, 13.3, 18.1, 18.9, 21.7, 22.4, 17.4, 11, 7.5, 2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2010, 1, [-1.5, 1.3, 6.2, 11.5, 15.3, 20.3, 22.9, 20.3, 14.7, 9.5, 8.1, -0.4]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2011, 1, [1.5, 1.5, 7.1, 13.5, 17, 20, 21.1, 22.8, 19.4, 10, 3.8, 3.3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2012, 1, [1.6, -0.8, 10.1, 11.4, 16.1, 21.3, 22.7, 23.3, 17, 11.7, 8.8, 0.8]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2013, 1, [2, 0.9, 3.9, 12.4, 14.8, 19.8, 23.5, 22.5, 16.2, 13.2, 7.3, 2.7]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2014, 1, [5.4, 4.4, 10, 13.1, 15.7, 20.2, 20.8, 19.6, 16.2, 13.6, 8.8, 3.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2015, 1, [2.8, 2.4, 7.6, 11.8, 17, 20.6, 24.3, 22.3, 16.5, 11, 6.9, 2.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2016, 1, [1.1, 5.5, 7.5, 12.5, 15.3, 20, 23.2, 20.6, 18.3, 10.3, 7, -0.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2017, 1, [-3.2, 4.5, 10.2, 12.1, 16.9, 21.7, 23.2, 23.2, 14.3, 12, 6.2, 1.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2018, 1, [4.8, -0.1, 4.6, 15.2, 18, 20.9, 22.3, 22.8, 17.6, 13.2, 8.3, 2.2]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2019, 1, [0.7, 4.9, 9, 11.6, 12.9, 23.5, 22.9, 22.6, 16.8, 13.2, 8.8, 3.6]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2020, 1, [1.9, 6.8, 7.2, 13, 15.3, 19.6, 21.8, 22.2, 17.5, 11.9, 5.3, 2.9]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2021, 1, [1.2, 5.9, 6.7, 9.1, 13.5, 23.1, 23.3, 21, 17.5, 9.8, 5.9, 1.3]);
addAvgTempYear(cv_placeLjubljanaBezigrad, 2022, 1, [0.8, 5.1, 6.6, 10.4, 18.1, 23.4, 24.5, 23, 16, 14.4, 7.9, 4.4]);

//id=  Novo Mesto Kandija
//addAvgTempYear(cv_placeNovoMestoKandija, 1948, 1, [4, 0, 5.7, 11.4, 16, 16.9, 17.2, 18.9, 15.3, 11.1, 4.4, -1.4]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1949, 1, [1.5, 1.2, 2.5, 12, 14.1, 16.4, 19.1, 18, 16.1, 11.1, 6.8, 2.3]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1950, 1, [-3.2, 2.9, 6.4, 10, 16.7, 20.3, 21.7, 20, 15.7, 8.4, 5.3, 1.2]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1951, 1, [2.3, 4.1, 5.3, 9.7, 14.5, 18.1, 19, 19.4, 17.2, 8.8, 8.1, 1.7]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1952, 1, [-1.1, -1.1, 4.1, 12.5, 14, 19, 21.3, 20.8, 13.3, 10.3, 4, -0.3]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1953, 1, [-2.1, -0.6, 4.3, 10.6, 14, 17.9, 20.2, 17.6, 15.6, 12.3, 3.2, 0.8]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1954, 1, [-5.5, -4.4, 6.2, 8.3, 13.4, 19.2, 17.9, 18, 16, 9.6, 4.8, 3.1]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1955, 1, [1, 2.2, 1.6, 8.1, 13, 17.2, 19.5, 17.8, 14.3, 9.5, 3.8, 2.4]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1956, 1, [2.3, -8, 2.3, 9.3, 14.8, 16.4, 20, 19, 15.7, 9.1, 1.7, -0.4]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1957, 1, [-3.4, 4.8, 7, 9.6, 11.6, 19.8, 20.1, 17.6, 14.3, 9.8, 6.4, 1.4]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1958, 1, [-1.8, 4.6, 2.1, 7.8, 17.9, 17.6, 20.4, 19.5, 14.8, 10.8, 6.5, 3.2]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1959, 1, [0.2, -1.1, 8.1, 10.7, 13.9, 17.4, 20.8, 18.2, 13, 8, 5.6, 3.5]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1960, 1, [-0.7, 2, 5.6, 9.4, 14, 18.1, 17.9, 18.7, 13.3, 11.5, 6.6, 3.6]);
//addAvgTempYear(cv_placeNovoMestoKandija, 1961, 1, [-1.4, 3.1]);
//id=  Novo Mesto Gotna Vas
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1961, 4, [12.6, 13, 18.1, 17.8, 18, 16, 11.4, 5.3, -1.5]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1962, 1, [-0.3, 0.1, 2.1, 9, 13.2, 15.5, 17.7, 19.5, 14, 9.7, 3.7, -4]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1963, 1, [-6.8, -4.1, 3.3, 10.6, 13.7, 18.2, 20.2, 19.3, 15.6, 9.3, 10, -3.4]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1964, 1, [-5.8, -0.2, 2.8, 10.1, 14.1, 19.3, 19.1, 17.3, 14.2, 9.5, 6, 0.1]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1965, 1, [-0.5, -3.3, 4.9, 8, 12.9, 17.4, 18.9, 16.3, 14.9, 8.4, 3.5, 1.6]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1966, 1, [-4, 7.3, 4.4, 11.5, 14.2, 18.6, 18.1, 17.3, 15.1, 13.3, 2.6, 0.3]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1967, 1, [-2.9, 1.2, 6.6, 8.6, 15.3, 17, 20.6, 18.7, 15.5, 11, 5.1, -1.2]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1968, 1, [-3.7, 3, 5.7, 11.8, 14.4, 17.2, 19, 17.4, 14.8, 10.7, 5.3, -2.6]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1969, 1, [-2.6, -1.7, 3.2, 9.1, 16.1, 16.6, 19, 17.2, 15.2, 8.8, 7.5, -3.4]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1970, 1, [-0.5, 0.2, 3, 8.4, 12, 18, 18.7, 18.7, 14.8, 8.8, 7.2, -0.9]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1971, 1, [-1.4, 1.7, 2.3, 10.7, 15.2, 16.7, 19.6, 19.6, 11.7, 7.9, 4, -0.2]);
//addAvgTempYear(cv_placeNovoMestoGotnaVas, 1972, 1, [-1.9, 2.5, 6.9, 9.7, 13.5, 17.9, 19.3, 17.9, 11.7, 8.4, 4.1]);

//id=  Novo Mesto Kandija
addAvgTempYear(cv_placeNovoMesto, 1948, 1, [4, 0, 5.7, 11.4, 16, 16.9, 17.2, 18.9, 15.3, 11.1, 4.4, -1.4]);
addAvgTempYear(cv_placeNovoMesto, 1949, 1, [1.5, 1.2, 2.5, 12, 14.1, 16.4, 19.1, 18, 16.1, 11.1, 6.8, 2.3]);
addAvgTempYear(cv_placeNovoMesto, 1950, 1, [-3.2, 2.9, 6.4, 10, 16.7, 20.3, 21.7, 20, 15.7, 8.4, 5.3, 1.2]);
addAvgTempYear(cv_placeNovoMesto, 1951, 1, [2.3, 4.1, 5.3, 9.7, 14.5, 18.1, 19, 19.4, 17.2, 8.8, 8.1, 1.7]);
addAvgTempYear(cv_placeNovoMesto, 1952, 1, [-1.1, -1.1, 4.1, 12.5, 14, 19, 21.3, 20.8, 13.3, 10.3, 4, -0.3]);
addAvgTempYear(cv_placeNovoMesto, 1953, 1, [-2.1, -0.6, 4.3, 10.6, 14, 17.9, 20.2, 17.6, 15.6, 12.3, 3.2, 0.8]);
addAvgTempYear(cv_placeNovoMesto, 1954, 1, [-5.5, -4.4, 6.2, 8.3, 13.4, 19.2, 17.9, 18, 16, 9.6, 4.8, 3.1]);
addAvgTempYear(cv_placeNovoMesto, 1955, 1, [1, 2.2, 1.6, 8.1, 13, 17.2, 19.5, 17.8, 14.3, 9.5, 3.8, 2.4]);
addAvgTempYear(cv_placeNovoMesto, 1956, 1, [2.3, -8, 2.3, 9.3, 14.8, 16.4, 20, 19, 15.7, 9.1, 1.7, -0.4]);
addAvgTempYear(cv_placeNovoMesto, 1957, 1, [-3.4, 4.8, 7, 9.6, 11.6, 19.8, 20.1, 17.6, 14.3, 9.8, 6.4, 1.4]);
addAvgTempYear(cv_placeNovoMesto, 1958, 1, [-1.8, 4.6, 2.1, 7.8, 17.9, 17.6, 20.4, 19.5, 14.8, 10.8, 6.5, 3.2]);
addAvgTempYear(cv_placeNovoMesto, 1959, 1, [0.2, -1.1, 8.1, 10.7, 13.9, 17.4, 20.8, 18.2, 13, 8, 5.6, 3.5]);
addAvgTempYear(cv_placeNovoMesto, 1960, 1, [-0.7, 2, 5.6, 9.4, 14, 18.1, 17.9, 18.7, 13.3, 11.5, 6.6, 3.6]);
//addAvgTempYear(cv_placeNovoMesto, 1961, 1, [-1.4, 3.1]);
//id=  Novo Mesto Gotna Vas
//addAvgTempYear(cv_placeNovoMesto, 1961, 4, [12.6, 13, 18.1, 17.8, 18, 16, 11.4, 5.3, -1.5]);
addAvgTempYear(cv_placeNovoMesto, 1961, 1, [-1.4, 3.1, 3.8, 12.6, 13, 18.1, 17.8, 18, 16, 11.4, 5.3, -1.5]); //manjkajoči mar, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeNovoMesto, 1962, 1, [-0.3, 0.1, 2.1, 9, 13.2, 15.5, 17.7, 19.5, 14, 9.7, 3.7, -4]);
addAvgTempYear(cv_placeNovoMesto, 1963, 1, [-6.8, -4.1, 3.3, 10.6, 13.7, 18.2, 20.2, 19.3, 15.6, 9.3, 10, -3.4]);
addAvgTempYear(cv_placeNovoMesto, 1964, 1, [-5.8, -0.2, 2.8, 10.1, 14.1, 19.3, 19.1, 17.3, 14.2, 9.5, 6, 0.1]);
addAvgTempYear(cv_placeNovoMesto, 1965, 1, [-0.5, -3.3, 4.9, 8, 12.9, 17.4, 18.9, 16.3, 14.9, 8.4, 3.5, 1.6]);
addAvgTempYear(cv_placeNovoMesto, 1966, 1, [-4, 7.3, 4.4, 11.5, 14.2, 18.6, 18.1, 17.3, 15.1, 13.3, 2.6, 0.3]);
addAvgTempYear(cv_placeNovoMesto, 1967, 1, [-2.9, 1.2, 6.6, 8.6, 15.3, 17, 20.6, 18.7, 15.5, 11, 5.1, -1.2]);
addAvgTempYear(cv_placeNovoMesto, 1968, 1, [-3.7, 3, 5.7, 11.8, 14.4, 17.2, 19, 17.4, 14.8, 10.7, 5.3, -2.6]);
addAvgTempYear(cv_placeNovoMesto, 1969, 1, [-2.6, -1.7, 3.2, 9.1, 16.1, 16.6, 19, 17.2, 15.2, 8.8, 7.5, -3.4]);
addAvgTempYear(cv_placeNovoMesto, 1970, 1, [-0.5, 0.2, 3, 8.4, 12, 18, 18.7, 18.7, 14.8, 8.8, 7.2, -0.9]);
addAvgTempYear(cv_placeNovoMesto, 1971, 1, [-1.4, 1.7, 2.3, 10.7, 15.2, 16.7, 19.6, 19.6, 11.7, 7.9, 4, -0.2]);
addAvgTempYear(cv_placeNovoMesto, 1972, 1, [-1.9, 2.5, 6.9, 9.7, 13.5, 17.9, 19.3, 17.9, 11.7, 8.4, 4.1, 0]); //manjkajoči dec, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
//id=  Novo Mesto
addAvgTempYear(cv_placeNovoMesto, 1973, 1, [-1, 1.1, 4.6, 7.7, 15.6, 18, 19.2, 18.7, 15.4, 8, 2.8, 0.2]);
addAvgTempYear(cv_placeNovoMesto, 1974, 1, [0.8, 5.6, 6.8, 8.9, 13.5, 16.1, 19.3, 20.1, 14.9, 5.9, 5.6, 2.1]);
addAvgTempYear(cv_placeNovoMesto, 1975, 1, [3.9, 1.1, 6, 9.8, 15.5, 16.3, 19.3, 17.9, 17.1, 9.2, 3.6, 0.4]);
addAvgTempYear(cv_placeNovoMesto, 1976, 1, [0.2, 0.3, 1.6, 9.4, 14.6, 17.5, 20.1, 15.6, 13.6, 10, 6.5, 0]);
addAvgTempYear(cv_placeNovoMesto, 1977, 1, [1.9, 4.7, 8.3, 8.3, 13.9, 18.2, 19.1, 18.2, 12.4, 11.3, 5.4, -0.4]);
addAvgTempYear(cv_placeNovoMesto, 1978, 1, [-0.2, 0.4, 6.9, 8.4, 11.9, 17, 17.8, 17.1, 14.1, 9.2, 0.7, 0.4]);
addAvgTempYear(cv_placeNovoMesto, 1979, 1, [-2.2, 1.7, 7.4, 8.9, 15.3, 19.3, 18.5, 17.3, 14.8, 9, 4.6, 3.3]);
addAvgTempYear(cv_placeNovoMesto, 1980, 1, [-2.4, 2.7, 5.4, 7.6, 11.8, 17, 18.6, 18.9, 15, 9.8, 2.8, -1.8]);
addAvgTempYear(cv_placeNovoMesto, 1981, 1, [-3.1, -0.1, 7.8, 10.3, 14.3, 18.4, 19.2, 18.7, 15.7, 12, 3.9, 0.2]);
addAvgTempYear(cv_placeNovoMesto, 1982, 1, [-2.2, -1.1, 4.5, 7.5, 14.9, 19, 20.6, 19.2, 17.4, 11.3, 5.6, 3.6]);
addAvgTempYear(cv_placeNovoMesto, 1983, 1, [2, -1.1, 6.3, 12.5, 15.7, 17.8, 21.8, 19.3, 15.3, 9.8, 2.2, 0.3]);
addAvgTempYear(cv_placeNovoMesto, 1984, 1, [0, -0.1, 4.2, 9.1, 13.1, 17.4, 18.5, 17.9, 15, 11.5, 5.1, 0.6]);
addAvgTempYear(cv_placeNovoMesto, 1985, 1, [-5.7, -3.2, 4.3, 9.5, 15.3, 16.1, 20.2, 19.1, 15.5, 9.2, 2.7, 3.8]);
addAvgTempYear(cv_placeNovoMesto, 1986, 1, [0.5, -3.7, 2.6, 10.4, 17.3, 16.5, 19, 19.7, 14.1, 9.5, 5.2, -1.1]);
addAvgTempYear(cv_placeNovoMesto, 1987, 1, [-3.6, 0.8, 0.9, 10.8, 13.3, 18, 20.7, 18, 18.3, 11.3, 4.2, 1.4]);
addAvgTempYear(cv_placeNovoMesto, 1988, 1, [3.7, 3.4, 5.1, 9.7, 15, 17.2, 21.5, 19.7, 15.2, 10.4, 1.2, 0.5]);
addAvgTempYear(cv_placeNovoMesto, 1989, 1, [-0.4, 4.3, 8.5, 11, 14.1, 16.2, 19.8, 19.2, 15.1, 10.1, 3.5, 2.7]);
addAvgTempYear(cv_placeNovoMesto, 1990, 1, [-0.4, 5.7, 8.4, 9.2, 15.7, 17.8, 19.7, 19.4, 14, 11.1, 5, 0.5]);
addAvgTempYear(cv_placeNovoMesto, 1991, 1, [0.7, -1.7, 8.4, 8.4, 11.6, 18.1, 21.2, 19.7, 16.8, 8.7, 5.4, -1.7]);
addAvgTempYear(cv_placeNovoMesto, 1992, 1, [0.6, 3.1, 6, 11, 15.4, 18.1, 20.7, 23.1, 16.1, 9.4, 6.2, 0.5]);
addAvgTempYear(cv_placeNovoMesto, 1993, 1, [1.1, 0.3, 5.2, 10.8, 17.1, 19, 20.2, 20.6, 14.9, 11.6, 1.5, 1.9]);
addAvgTempYear(cv_placeNovoMesto, 1994, 1, [3.2, 2, 10.3, 10, 15.2, 18.9, 22.1, 21.5, 17.3, 8.2, 7.6, 1.9]);
addAvgTempYear(cv_placeNovoMesto, 1995, 1, [0.1, 4.9, 4.7, 11.3, 14.9, 16.9, 21.8, 18.5, 13.9, 11.6, 4.6, 0.5]);
addAvgTempYear(cv_placeNovoMesto, 1996, 1, [-1.5, -1, 3, 9.9, 16, 19.3, 18.6, 19, 12.6, 10.6, 7.3, -2.4]);
addAvgTempYear(cv_placeNovoMesto, 1997, 1, [-1.3, 3.8, 6, 7.4, 16.2, 18.9, 19.6, 19.2, 15.6, 8.8, 5.3, 2.1]);
addAvgTempYear(cv_placeNovoMesto, 1998, 1, [3, 5, 4.8, 11.7, 15, 19.9, 21, 20.7, 14.9, 11, 3, -2.9]);
addAvgTempYear(cv_placeNovoMesto, 1999, 1, [0.5, 0.8, 7.7, 11.6, 16.1, 18.9, 20.2, 19.9, 17.5, 11.4, 2.7, 0.3]);
addAvgTempYear(cv_placeNovoMesto, 2000, 1, [-2, 4, 7.5, 13.4, 16.8, 20.9, 20, 22.1, 15.9, 12.5, 8.8, 4.3]);
addAvgTempYear(cv_placeNovoMesto, 2001, 1, [3.4, 3.9, 9.1, 9.9, 17, 18.1, 21.7, 22.2, 13.6, 13.6, 2.7, -2.1]);
addAvgTempYear(cv_placeNovoMesto, 2002, 1, [0.1, 5.5, 8.2, 9.6, 17.2, 20.5, 20.8, 19.9, 14, 11, 9.2, 1.5]);
addAvgTempYear(cv_placeNovoMesto, 2003, 1, [-1.4, -2.2, 6.5, 9.9, 18.2, 23.2, 22.2, 24, 15.1, 8.4, 7.7, 1.1]);
addAvgTempYear(cv_placeNovoMesto, 2004, 1, [-1, 1.7, 4.4, 10.6, 13.8, 18.2, 20.3, 20.1, 15, 12.7, 5.9, 1]);
addAvgTempYear(cv_placeNovoMesto, 2005, 1, [-0.4, -1.7, 4.8, 10.9, 15.9, 19.2, 20.6, 17.8, 15.8, 11.2, 4.5, 0.5]);
addAvgTempYear(cv_placeNovoMesto, 2006, 1, [-1.9, 0.5, 4.5, 11.5, 14.9, 19.6, 22.7, 17.6, 16.8, 12.6, 8.5, 4]);
addAvgTempYear(cv_placeNovoMesto, 2007, 1, [4.9, 6.2, 8.1, 13.5, 16.9, 20.6, 21.5, 20, 14, 9.4, 4.4, -0.3]);
addAvgTempYear(cv_placeNovoMesto, 2008, 1, [2.3, 4.4, 6.4, 10.9, 16.1, 20, 20.8, 20.1, 14.4, 11.8, 6.5, 2.2]);
addAvgTempYear(cv_placeNovoMesto, 2009, 1, [-1.7, 2, 6.6, 13, 17.5, 18.7, 21.4, 21.3, 16.9, 10.8, 7.4, 2.1]);
addAvgTempYear(cv_placeNovoMesto, 2010, 1, [-1.5, 1.1, 5.8, 11, 15.1, 19.6, 22.6, 20, 14.1, 8.7, 7.7, -1.6]);
addAvgTempYear(cv_placeNovoMesto, 2011, 1, [1.4, 1, 6.5, 12.8, 15.6, 19.8, 20.7, 22, 18.6, 9.6, 3.5, 3.5]);
addAvgTempYear(cv_placeNovoMesto, 2012, 1, [1.3, -2.4, 9.3, 11.4, 15.6, 21.1, 22.4, 22.7, 16.6, 11, 8.6, 0.7]);
addAvgTempYear(cv_placeNovoMesto, 2013, 1, [0.9, 0.6, 3.4, 12.1, 14.9, 19.4, 22.8, 22, 15.3, 12.7, 6.9, 2.7]);
addAvgTempYear(cv_placeNovoMesto, 2014, 1, [5, 4.5, 9.6, 12.7, 15.1, 19.4, 20.8, 19.3, 15.7, 13, 8.8, 3.5]);
addAvgTempYear(cv_placeNovoMesto, 2015, 1, [2.3, 1.8, 7.2, 11.3, 16.8, 20.2, 23.8, 22, 16.5, 10.8, 7.2, 3.2]);
addAvgTempYear(cv_placeNovoMesto, 2016, 1, [1.2, 5.7, 7, 12.3, 15.4, 19.8, 22.5, 19.8, 17.3, 9.7, 6.4, -0.2]);
addAvgTempYear(cv_placeNovoMesto, 2017, 1, [-4, 4.4, 9.4, 11.6, 16.5, 21.4, 23.3, 22.4, 14, 10.9, 5.9, 3]);
addAvgTempYear(cv_placeNovoMesto, 2018, 1, [4.7, -0.9, 3.9, 14.7, 17.9, 19.9, 21, 21.8, 16.7, 12.7, 7.3, 1.9]);
addAvgTempYear(cv_placeNovoMesto, 2019, 1, [0.1, 4.3, 8.5, 11.2, 12.8, 22.9, 21.9, 22, 15.9, 12.7, 8.4, 3.6]);
addAvgTempYear(cv_placeNovoMesto, 2020, 1, [1.5, 6.5, 7.4, 12.2, 14.8, 19.4, 21, 21.8, 16.7, 11.6, 4.9, 3]);
addAvgTempYear(cv_placeNovoMesto, 2021, 1, [1.4, 5.1, 6.2, 8.9, 13.6, 22.5, 22.8, 20.2, 16.3, 9.4, 5.7, 2.2]);
addAvgTempYear(cv_placeNovoMesto, 2022, 1, [1.3, 4.6, 5.7, 10, 17.5, 22.1, 23, 21.7, 15.4, 13.8, 7.1, 3.7]);

//---- POSTOJNA ... https://meteo.arso.gov.si/uploads/probase/www/climate/text/sl/stations/postojna.pdf
addAvgTempYear(cv_placePostojna, 1950, 1, [-2.8, 3.2, 5.1, 7.7, 14.1, 17.9, 20.5, 18.5, 13.9, 8.4, 5.2, 0.7]);
addAvgTempYear(cv_placePostojna, 1951, 1, [2.7, 3.6, 3.1, 8.1, 12.2, 16.4, 17.4, 17.9, 15.7, 8.4, 7.1, 2.3]);
addAvgTempYear(cv_placePostojna, 1952, 1, [-1.5, -2, 2.4, 10.1, 12, 16.9, 20.2, 18.2, 12.1, 9.1, 3.7, 0.6]);
addAvgTempYear(cv_placePostojna, 1953, 1, [-3, -3, 3.7, 8.3, 11.8, 17, 18.1, 17, 13.4, 9, 3, 1.7]); //od jan-okt manjkajo podatki, nadomestil s povprečjem mesecev iz leta 1952 in 1954
addAvgTempYear(cv_placePostojna, 1954, 1, [-4.6, -3.9, 4.9, 6.6, 11.7, 17, 16.1, 15.9, 14.7, 8.8, 5.2, 3.1]);
addAvgTempYear(cv_placePostojna, 1955, 1, [1.1, 1.7, 0.9, 6.7, 10.9, 15.3, 17.6, 16.1, 13.7, 9, 3.4, 3.2]);
addAvgTempYear(cv_placePostojna, 1956, 1, [1.6, -8.3, 1.2, 6.7, 12.6, 14.4, 17.8, 17.2, 14, 7.9, 1.3, -0.2]);
addAvgTempYear(cv_placePostojna, 1957, 1, [-1.5, 3.8, 5.3, 7.5, 9.5, 17.6, 17.6, 16.1, 12.9, 9.3, 5.4, 1.6]);
addAvgTempYear(cv_placePostojna, 1958, 1, [-1, 3.6, 0, 5.6, 15, 15.3, 18.2, 17.4, 13.9, 9.8, 5.2, 3.5]);
addAvgTempYear(cv_placePostojna, 1959, 1, [-0.3, -1, 5.8, 8.5, 12, 15.7, 19.1, 16.4, 12.1, 7.6, 4.9, 3.5]);
addAvgTempYear(cv_placePostojna, 1960, 1, [-0.4, 0.7, 4.1, 7.9, 12.4, 15.8, 15.7, 16.5, 12.3, 10.4, 6.5, 3]);
addAvgTempYear(cv_placePostojna, 1961, 1, [-1.6, 3, 2.3, 7.8, 11.6, 15, 16.1, 17.8, 12.8, 10.1, 4.8, 0.3]); //od mar-dec manjkajo podatki, nadomestil s povprečjem mesecev iz leta 1952 in 1954
addAvgTempYear(cv_placePostojna, 1962, 1, [0.8, -0.6, 0.6, 7.8, 10.8, 14.1, 16.5, 19.1, 13.3, 9.9, 3.1, -2.3]);
addAvgTempYear(cv_placePostojna, 1963, 1, [-5.6, -4.1, 2.4, 8.5, 12.1, 15.7, 18.5, 17.1, 14.7, 8.8, 9, -2.8]);
addAvgTempYear(cv_placePostojna, 1964, 1, [-4.3, 0, 1.7, 8.4, 12.6, 17.5, 17.8, 16.3, 13.3, 9.1, 5.2, 0.1]);
addAvgTempYear(cv_placePostojna, 1965, 1, [0.4, -2.7, 4, 5.6, 10.5, 15.5, 16.6, 15.1, 13.5, 8.5, 3.8, 2.2]);
addAvgTempYear(cv_placePostojna, 1966, 1, [-2.8, 5.6, 2.9, 9.5, 12.2, 16.4, 16.3, 15.9, 14.2, 12.5, 2.3, 1.1]);
addAvgTempYear(cv_placePostojna, 1967, 1, [-2.2, 1, 5.2, 6.6, 12.9, 14.5, 19.1, 17.4, 14.3, 10.4, 5.6, -0.3]);
addAvgTempYear(cv_placePostojna, 1968, 1, [-3.1, 2.9, 4.6, 9.5, 12.5, 15.6, 17.5, 15.6, 13.6, 10.3, 4.6, -2.6]);
addAvgTempYear(cv_placePostojna, 1969, 1, [-0.8, -0.8, 2.4, 7.1, 13.8, 14.3, 17.9, 16.1, 14.3, 10.1, 6.9, -3.4]);
addAvgTempYear(cv_placePostojna, 1970, 1, [0.3, 0.1, 1.2, 6.2, 10.1, 16.2, 17.1, 17.2, 14.2, 8.5, 6.5, -0.8]);
addAvgTempYear(cv_placePostojna, 1971, 1, [0, 1.4, 0.9, 9, 13, 14.6, 18.5, 18.7, 11.7, 7.7, 3.6, 0.1]);
addAvgTempYear(cv_placePostojna, 1972, 1, [-2.4, 2.4, 6.4, 8, 11.4, 15.7, 18, 16.5, 10.4, 7.9, 4.9, 0.2]);
addAvgTempYear(cv_placePostojna, 1973, 1, [-0.5, 0.6, 3.1, 5.8, 13, 16, 17.5, 17.8, 14.7, 8.3, 3.3, 0.4]);
addAvgTempYear(cv_placePostojna, 1974, 1, [1.4, 4.2, 5.3, 7.3, 11.2, 13.7, 17.3, 18.6, 13.9, 4.9, 5, 2.1]);
addAvgTempYear(cv_placePostojna, 1975, 1, [3.1, 0.9, 4, 8.1, 13.4, 14.7, 18, 16.9, 16.1, 8.5, 3.9, 0.4]);
addAvgTempYear(cv_placePostojna, 1976, 1, [-0.1, -0.6, 0.8, 7.1, 13, 16.2, 18.2, 14.1, 12.4, 9.6, 5.9, 0]);
addAvgTempYear(cv_placePostojna, 1977, 1, [2.2, 3.9, 6.4, 6.4, 11.6, 15.6, 17, 16.2, 11.5, 10.8, 4.5, -0.8]);
addAvgTempYear(cv_placePostojna, 1978, 1, [0, -0.4, 4.8, 6.3, 10.4, 14.8, 16.2, 15.5, 12.5, 9.2, 1.8, 0.5]);
addAvgTempYear(cv_placePostojna, 1979, 1, [-1.8, 1.1, 5.2, 6.5, 12.9, 17.8, 16.9, 15.6, 13.3, 8.7, 4.5, 2.3]);
addAvgTempYear(cv_placePostojna, 1980, 1, [-2.1, 2.4, 3.6, 5.6, 10.2, 14.2, 16.2, 17.4, 13.7, 9.4, 2.4, -2]);
addAvgTempYear(cv_placePostojna, 1981, 1, [-2.9, -1.2, 5.7, 8.2, 11.5, 15.8, 16.9, 16.8, 14.2, 11.1, 3.2, 0.5]);
addAvgTempYear(cv_placePostojna, 1982, 1, [-1.3, -1.4, 2.9, 6.2, 12.9, 16.8, 19, 17.4, 16.4, 10, 5.8, 2.7]);
addAvgTempYear(cv_placePostojna, 1983, 1, [1, -2.3, 4.4, 8.8, 12.6, 16, 20.6, 17.6, 14, 9.4, 2.4, 0.7]);
addAvgTempYear(cv_placePostojna, 1984, 1, [-0.8, -0.9, 2.7, 7, 10.1, 14.7, 16.7, 16.3, 12.8, 10.6, 5.2, 0.9]);
addAvgTempYear(cv_placePostojna, 1985, 1, [-4.7, -2, 3, 7.1, 12.8, 14.5, 19.2, 18, 14.6, 8.9, 2, 3.8]);
addAvgTempYear(cv_placePostojna, 1986, 1, [-0.8, -4, 2.1, 7.7, 14.7, 15.3, 17.4, 17.8, 12.8, 9.4, 5.6, -0.7]);
addAvgTempYear(cv_placePostojna, 1987, 1, [-3.6, 0.5, -0.4, 8.5, 10.9, 15.3, 18.9, 16.5, 16.6, 10.5, 4.6, 0.9]);
addAvgTempYear(cv_placePostojna, 1988, 1, [3.8, 1.9, 3.2, 7.9, 13.2, 14.9, 19.5, 18.2, 13.2, 10.4, 1.4, 1.1]);
addAvgTempYear(cv_placePostojna, 1989, 1, [0.2, 3, 6.1, 8.5, 12.3, 14.2, 17.8, 17.2, 13.6, 8.6, 3.5, 2.5]);
addAvgTempYear(cv_placePostojna, 1990, 1, [0.2, 4.9, 6.5, 6.9, 13, 15.1, 17.6, 17.3, 12.4, 10.4, 5.1, -0.1]);
addAvgTempYear(cv_placePostojna, 1991, 1, [0.2, -1.5, 6.3, 6.9, 9.3, 15.5, 19.5, 18.5, 15.4, 7.9, 4.6, -1.7]);
addAvgTempYear(cv_placePostojna, 1992, 1, [0.3, 1.6, 4.1, 8.4, 13.9, 16.1, 18.4, 20, 13.5, 8.9, 6.6, 0.5]);
addAvgTempYear(cv_placePostojna, 1993, 1, [0.4, -0.2, 2.6, 7.9, 14.3, 16.6, 17.1, 18.6, 12.9, 10.2, 1.5, 2.4]);
addAvgTempYear(cv_placePostojna, 1994, 1, [2.7, 1.2, 7.9, 7.9, 12.7, 16.3, 20.3, 19.5, 15, 8.3, 7, 2.1]);
addAvgTempYear(cv_placePostojna, 1995, 1, [0.1, 3.7, 2.7, 7.9, 12.3, 14.3, 20.2, 17.1, 12.2, 11.1, 4.1, 0.4]);
addAvgTempYear(cv_placePostojna, 1996, 1, [-1.1, -1.6, 1.6, 8, 13.3, 16.7, 16.8, 17.1, 10.8, 9.2, 6.1, -1.2]);
addAvgTempYear(cv_placePostojna, 1997, 1, [-0.7, 3, 5.6, 5.3, 13.4, 16.6, 17.1, 17.8, 14.6, 8.2, 5, 2.3]);
addAvgTempYear(cv_placePostojna, 1998, 1, [2.7, 4.1, 3.6, 8.7, 13.2, 17.5, 19.2, 19.5, 13.6, 9.8, 2.3, -3.1]);
addAvgTempYear(cv_placePostojna, 1999, 1, [0.8, -0.3, 5.8, 8.6, 14.2, 16.8, 18.7, 18.2, 15.7, 9.7, 2.1, 0.9]);
addAvgTempYear(cv_placePostojna, 2000, 1, [-2, 2.7, 5.1, 10.4, 14.2, 17.8, 16.9, 19.1, 14.2, 11.8, 7.6, 4.3]);
addAvgTempYear(cv_placePostojna, 2001, 1, [2.5, 2.8, 7.3, 7.4, 15.4, 15.9, 18.9, 20.1, 11.6, 12.8, 3.3, -2.1]);
addAvgTempYear(cv_placePostojna, 2002, 1, [-0.1, 3.7, 7.1, 7.9, 13.7, 18.3, 19.1, 17.8, 12.7, 10.2, 8.8, 1.4]);
addAvgTempYear(cv_placePostojna, 2003, 1, [-1, -2.4, 5, 7.8, 15.1, 20.6, 20.2, 21.6, 13.1, 7.7, 7, 1.7]);
addAvgTempYear(cv_placePostojna, 2004, 1, [-1.3, 0.5, 3, 8.5, 11.5, 16.5, 18.4, 18.3, 14.2, 12, 5.2, 1]);
addAvgTempYear(cv_placePostojna, 2005, 1, [-0.7, -1.8, 3.3, 8, 14.3, 17.9, 19.6, 16.8, 14.6, 10.5, 4.2, -0.3]);
addAvgTempYear(cv_placePostojna, 2006, 1, [-2.1, -0.4, 2.8, 9.1, 13.4, 18.2, 22.4, 15.9, 15.9, 12.5, 7.3, 3.7]);
addAvgTempYear(cv_placePostojna, 2007, 1, [3.7, 4.9, 6.8, 12.2, 15, 18.6, 19.4, 18.2, 12.5, 8.6, 3.9, -0.2]);
addAvgTempYear(cv_placePostojna, 2008, 1, [3, 2.6, 4, 8.3, 14.4, 18.3, 19.4, 18.9, 13.2, 10.9, 5.8, 1.4]);
addAvgTempYear(cv_placePostojna, 2009, 1, [-1.3, 1.2, 4.7, 10.8, 15.8, 17.1, 19.4, 20.4, 16.4, 9.8, 7.2, 1.8]);
addAvgTempYear(cv_placePostojna, 2010, 1, [-2.3, 0.7, 3.9, 9.4, 12.8, 17.7, 20.4, 18, 13.3, 8.6, 6.9, 0]);
addAvgTempYear(cv_placePostojna, 2011, 1, [0.8, 0.3, 4.9, 10.5, 14.5, 17.9, 18.7, 20.2, 17.5, 8.9, 3.9, 3.1]);
addAvgTempYear(cv_placePostojna, 2012, 1, [0.3, -2.8, 7.8, 9.1, 13.5, 19, 20.9, 21.4, 15.5, 11, 7.9, 0.7]);
addAvgTempYear(cv_placePostojna, 2013, 1, [1.1, 0, 3.1, 9.9, 12.6, 17.2, 21.2, 20.1, 14.5, 11.5, 6.5, 3.2]);
addAvgTempYear(cv_placePostojna, 2014, 1, [4.7, 3.9, 7.6, 10.9, 13, 17.8, 18.5, 17.8, 14.6, 12.2, 8.4, 3.3]);
addAvgTempYear(cv_placePostojna, 2015, 1, [2.6, 1.2, 5.7, 9.1, 14.7, 18.5, 22, 20, 14.9, 10.1, 6.2, 3.5]);
addAvgTempYear(cv_placePostojna, 2016, 1, [1.3, 4.3, 5.3, 10, 12.7, 17.7, 20.9, 18.9, 16.3, 9.2, 6.6, 0.5]);
addAvgTempYear(cv_placePostojna, 2017, 1, [-3.2, 3.7, 8, 9.4, 14.2, 19.3, 20.5, 20.5, 12.7, 10.3, 5.5, 1.6]);
addAvgTempYear(cv_placePostojna, 2018, 1, [4.2, -1.8, 3.1, 12.3, 15.9, 18.3, 20, 20.7, 15.6, 12.6, 7.2, 1.8]);
addAvgTempYear(cv_placePostojna, 2019, 1, [-0.2, 4.2, 7, 9.6, 10.4, 21, 20.4, 20.4, 15.1, 11.4, 7.9, 4]);
addAvgTempYear(cv_placePostojna, 2020, 1, [2.7, 5.2, 5.4, 10.3, 13.1, 17, 19.5, 19.8, 15.7, 10.2, 5.6, 3.4]);
addAvgTempYear(cv_placePostojna, 2021, 1, [0.9, 5.3, 4.5, 6.7, 11.7, 20, 20.5, 18.7, 15.6, 8.9, 5.7, 1.8]);
addAvgTempYear(cv_placePostojna, 2022, 1, [1.1, 3.5, 4.3, 8.4, 15.7, 21.1, 22.5, 20.8, 14.1, 13.2, 6.9, 4]);

//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1962, 4, [11.4, 14.9, 18.4, 20.4, 23.8, 17.9, 13, 7.9, 1.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1963, 1, [-0.4, 0.9, 5.1, 11.1, 16.5, 19.3, 22.3, 21.2, 17.7, 12.4, 11.1, 2.3]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1964, 1, [0.8, 3.1, 6, 11.2, 16.4, 21.7, 22.2, 20.2, 16.4, 12.6, 8.2, 4.6]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1965, 1, [4.9, 2.2, 7.4, 10.1, 14.9, 19.4, 20.4, 19.4, 16.4, 11.1, 8.3, 5.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1966, 1, [1, 7, 7.1, 12.7, 16.9, 21, 20.8, 20.5, 17.3, 15.9, 7, 4.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1967, 1, [2.3, 4.2, 8.9, 10.6, 17, 18.5, 23.5, 21.6, 17.3, 13.2, 9.3, 3.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1968, 1, [2, 6.6, 8.2, 13.1, 16.2, 19.9, 21.5, 19.4, 16.8, 13.1, 9, 2.3]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1969, 1, [3.7, 3.6, 7.1, 10.8, 17.9, 18.8, 21.8, 20, 17, 12.6, 9.3, 2.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1970, 1, [4.2, 3, 6.7, 10.6, 14.2, 20.3, 21.1, 20.4, 17.4, 11.5, 8.9, 3.4]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1971, 1, [4.8, 4.7, 4.8, 12.1, 16.9, 18.6, 22, 22.7, 14.4, 10.7, 7.8, 2.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1972, 1, [3.4, 6.4, 9.3, 11.4, 14.7, 20.2, 22.2, 20.2, 14.2, 11, 7.7, 4.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1973, 1, [4.3, 4.3, 6.9, 9.9, 16.4, 19.9, 21.5, 22, 18.4, 11.6, 6.1, 3.3]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1974, 1, [5.1, 7.1, 8.7, 10.7, 14.6, 18, 22.3, 22.1, 17.3, 8.6, 7.9, 4.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1975, 1, [4.7, 5.1, 8.4, 11.4, 17.2, 18.6, 21.6, 20.3, 18.6, 11.5, 7.3, 4.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1976, 1, [2.4, 4.9, 6.2, 11, 15.6, 19.7, 21.8, 17.5, 15.6, 13.3, 9.8, 4.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1977, 1, [5.4, 6.8, 9.2, 10.2, 15.6, 19.8, 20.5, 19.9, 14.3, 12.6, 8, 3.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1978, 1, [4.2, 4.1, 8.1, 10.7, 13.3, 18.6, 20, 19.1, 15.4, 11.6, 5.8, 3.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1979, 1, [1.8, 5.4, 8.6, 9.9, 15.5, 21.2, 20.9, 19.1, 17, 12.4, 7, 4.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1980, 1, [2.3, 5.1, 7.2, 9.1, 13.8, 18.1, 19.7, 21.4, 16.5, 11.4, 5.9, 1.4]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1981, 1, [0.1, 2.4, 8.1, 11.2, 14.4, 19.6, 20.3, 20.3, 17.6, 13.4, 4.5, 3.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1982, 1, [1.7, 1.7, 6.5, 10.5, 16.2, 20.4, 22.8, 21.5, 19.1, 13.1, 8.8, 3.3]); //za dec manjka podatek, nadomestil s povprečjem dec'81 in dec'83
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1983, 1, [1.7, 0.6, 6.8, 11.7, 15.5, 19, 22.5, 19.8, 16.6, 11.4, 4.8, 3.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1984, 1, [2, 3.3, 6.1, 10.4, 13.1, 17.5, 19.6, 19.2, 15.8, 13, 8.3, 4.6]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1985, 1, [-0.5, 0.4, 6.7, 10, 16, 17.9, 22, 20.2, 16.8, 12, 5.8, 5.3]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1986, 1, [2.4, 1.5, 6.6, 11.1, 18, 19.1, 21.2, 21.5, 16.1, 12, 7.9, 1.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1987, 1, [0.9, 3.9, 3, 11.3, 14.1, 18.1, 22.6, 20.3, 19.7, 13.7, 7.5, 4]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1988, 1, [6, 5, 6, 11.4, 17.1, 18.6, 22.6, 21.6, 16.1, 13.6, 4.2, 2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1989, 1, [1.7, 5.1, 8.6, 11.9, 16.1, 17.9, 21.6, 20.3, 16.6, 10.4, 6, 4]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1990, 1, [1.3, 5.8, 8.8, 10.4, 16.9, 18.7, 21.4, 20.6, 15.9, 13.2, 7.7, 3.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje51m, 1991, 1, [3.2, 1.8, 9.8]);
//----
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1991, 4, [10.5, 12.8, 18.6, 23, 21.9, 19, 11.1, 7.3, 0.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1992, 1, [3.3, 3.6, 7.4, 11.9, 18, 19.3, 22, 23.6, 16.8, 12, 8.6, 4.6]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1993, 1, [2.8, 2.8, 6.2, 11.6, 18.2, 20.5, 21, 22.7, 16.6, 13.6, 6.6, 5.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1994, 1, [5.3, 4.3, 10.3, 11.6, 16.1, 20.3, 24.7, 23.4, 18.1, 11.7, 9.8, 4.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1995, 1, [3, 5.6, 6.8, 10.9, 15.9, 18.3, 24.1, 20.7, 15.6, 13, 6.9, 4.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1996, 1, [4, 2.5, 5.9, 11.9, 16.7, 20.7, 20.6, 20.9, 14.6, 12.7, 9.3, 3.7]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1997, 1, [5, 4.9, 9, 9.3, 17.1, 20.2, 20.8, 21.6, 18.1, 11.9, 8.4, 5.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1998, 1, [4.6, 6.1, 6.6, 11.5, 17.2, 20.8, 22.7, 23.4, 16.8, 12.4, 6.4, 1.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 1999, 1, [3.3, 2.5, 8.4, 12.2, 17.6, 20.3, 22.8, 22.2, 19.2, 13.7, 6.6, 3.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2000, 1, [0.6, 4.3, 7.8, 13.4, 17.4, 21.8, 20.3, 22.8, 17.6, 14.6, 10.5, 6.7]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2001, 1, [5.9, 5.8, 10.1, 11, 18.8, 19.3, 22.4, 23.8, 15.3, 15, 6.6, 1.6]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2002, 1, [1.5, 5.7, 10, 12.3, 17, 22, 22.7, 21.1, 16.4, 13.1, 11.2, 6.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2003, 1, [2.6, 1.8, 8, 11.1, 18.8, 24.5, 24.2, 25.7, 16.8, 11, 9.9, 4.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2004, 1, [2, 3.5, 7.4, 12.3, 14.7, 20.4, 22.5, 22, 18.1, 14.8, 7.8, 4.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2005, 1, [1.9, 2.3, 6.6, 11.3, 17.3, 21.3, 22.4, 20.1, 17.8, 13.3, 7.4, 2.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2006, 1, [1.7, 3.4, 6.4, 12.1, 16.2, 21.2, 25.4, 19.1, 18.9, 15, 9.1, 5.9]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2007, 1, [6.1, 6.9, 10.3, 15, 18.5, 21.8, 22.9, 21.6, 15.7, 12.1, 6.9, 3.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2008, 1, [5.3, 4.9, 7.7, 11.7, 17.6, 21.2, 22.5, 22.3, 16.5, 13.4, 8.5, 4.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2009, 1, [3.6, 3.8, 7.8, 14, 18.7, 20.5, 22.7, 23.8, 19.5, 12.5, 9.6, 4.4]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2010, 1, [2, 4.5, 7.1, 12.4, 16, 20.7, 23.5, 21.1, 16.7, 11.9, 9.5, 2.5]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2011, 1, [3.1, 4.7, 8.2, 13.6, 18.3, 21.3, 21.9, 23.4, 20.7, 11.9, 7.6, 5.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2012, 1, [2, 1.4, 10.5, 12.1, 16.9, 22.1, 24.6, 24.5, 19.3, 13.5, 10.3, 2.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2013, 1, [4.1, 3.8, 6.7, 13.2, 15.6, 20.4, 24.8, 23.2, 18, 14.4, 9.8, 5.4]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2014, 1, [7.8, 7.9, 10.7, 13.7, 15.9, 20.9, 21.2, 20.7, 17.4, 14.8, 11.4, 6.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2015, 1, [4.6, 5.1, 9.2, 11.8, 17.6, 21.5, 25.4, 23, 18.4, 13.1, 7.9, 4.7]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2016, 1, [3.1, 7.3, 9, 12.8, 15.8, 20.9, 23.9, 22.5, 19.8, 12, 9.2, 2.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2017, 1, [0.6, 6.3, 10.1, 12.6, 17.4, 22.4, 23.3, 24, 16.3, 12.4, 8.2, 3.4]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2018, 1, [5.7, 2.8, 7, 15.2, 19.1, 21.7, 23.3, 23.8, 19.1, 15.1, 10.7, 3.8]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2019, 1, [2, 5.9, 9.2, 12.7, 14.2, 24.3, 24, 24.3, 18.4, 14.1, 10.7, 6.3]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2020, 1, [3.7, 6.8, 8.5, 13.3, 17.1, 20.3, 23, 23.2, 19, 12.6, 8.1, 6.2]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2021, 1, [3.7, 6.6, 7, 10.4, 15, 22.8, 24.2, 22.6, 19, 11.7, 9.4, 4.1]);
//addAvgTempYear(cv_placeNovaGoricaBilje55m, 2022, 1, [2.8, 5.5, 7, 11.5, 19.1, 24.2, 26.5, 24.4, 17.9, 15.6, 9.6, 6.9]);

addAvgTempYear(cv_placeNovaGoricaBilje, 1962, 4, [11.4, 14.9, 18.4, 20.4, 23.8, 17.9, 13, 7.9, 1.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1963, 1, [-0.4, 0.9, 5.1, 11.1, 16.5, 19.3, 22.3, 21.2, 17.7, 12.4, 11.1, 2.3]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1964, 1, [0.8, 3.1, 6, 11.2, 16.4, 21.7, 22.2, 20.2, 16.4, 12.6, 8.2, 4.6]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1965, 1, [4.9, 2.2, 7.4, 10.1, 14.9, 19.4, 20.4, 19.4, 16.4, 11.1, 8.3, 5.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1966, 1, [1, 7, 7.1, 12.7, 16.9, 21, 20.8, 20.5, 17.3, 15.9, 7, 4.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1967, 1, [2.3, 4.2, 8.9, 10.6, 17, 18.5, 23.5, 21.6, 17.3, 13.2, 9.3, 3.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1968, 1, [2, 6.6, 8.2, 13.1, 16.2, 19.9, 21.5, 19.4, 16.8, 13.1, 9, 2.3]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1969, 1, [3.7, 3.6, 7.1, 10.8, 17.9, 18.8, 21.8, 20, 17, 12.6, 9.3, 2.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1970, 1, [4.2, 3, 6.7, 10.6, 14.2, 20.3, 21.1, 20.4, 17.4, 11.5, 8.9, 3.4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1971, 1, [4.8, 4.7, 4.8, 12.1, 16.9, 18.6, 22, 22.7, 14.4, 10.7, 7.8, 2.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1972, 1, [3.4, 6.4, 9.3, 11.4, 14.7, 20.2, 22.2, 20.2, 14.2, 11, 7.7, 4.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1973, 1, [4.3, 4.3, 6.9, 9.9, 16.4, 19.9, 21.5, 22, 18.4, 11.6, 6.1, 3.3]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1974, 1, [5.1, 7.1, 8.7, 10.7, 14.6, 18, 22.3, 22.1, 17.3, 8.6, 7.9, 4.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1975, 1, [4.7, 5.1, 8.4, 11.4, 17.2, 18.6, 21.6, 20.3, 18.6, 11.5, 7.3, 4.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1976, 1, [2.4, 4.9, 6.2, 11, 15.6, 19.7, 21.8, 17.5, 15.6, 13.3, 9.8, 4.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1977, 1, [5.4, 6.8, 9.2, 10.2, 15.6, 19.8, 20.5, 19.9, 14.3, 12.6, 8, 3.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1978, 1, [4.2, 4.1, 8.1, 10.7, 13.3, 18.6, 20, 19.1, 15.4, 11.6, 5.8, 3.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1979, 1, [1.8, 5.4, 8.6, 9.9, 15.5, 21.2, 20.9, 19.1, 17, 12.4, 7, 4.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1980, 1, [2.3, 5.1, 7.2, 9.1, 13.8, 18.1, 19.7, 21.4, 16.5, 11.4, 5.9, 1.4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1981, 1, [0.1, 2.4, 8.1, 11.2, 14.4, 19.6, 20.3, 20.3, 17.6, 13.4, 4.5, 3.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1982, 1, [1.7, 1.7, 6.5, 10.5, 16.2, 20.4, 22.8, 21.5, 19.1, 13.1, 8.8, 3.3]); //za dec manjka podatek, nadomestil s povprečjem dec'81 in dec'83
addAvgTempYear(cv_placeNovaGoricaBilje, 1983, 1, [1.7, 0.6, 6.8, 11.7, 15.5, 19, 22.5, 19.8, 16.6, 11.4, 4.8, 3.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1984, 1, [2, 3.3, 6.1, 10.4, 13.1, 17.5, 19.6, 19.2, 15.8, 13, 8.3, 4.6]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1985, 1, [-0.5, 0.4, 6.7, 10, 16, 17.9, 22, 20.2, 16.8, 12, 5.8, 5.3]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1986, 1, [2.4, 1.5, 6.6, 11.1, 18, 19.1, 21.2, 21.5, 16.1, 12, 7.9, 1.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1987, 1, [0.9, 3.9, 3, 11.3, 14.1, 18.1, 22.6, 20.3, 19.7, 13.7, 7.5, 4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1988, 1, [6, 5, 6, 11.4, 17.1, 18.6, 22.6, 21.6, 16.1, 13.6, 4.2, 2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1989, 1, [1.7, 5.1, 8.6, 11.9, 16.1, 17.9, 21.6, 20.3, 16.6, 10.4, 6, 4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1990, 1, [1.3, 5.8, 8.8, 10.4, 16.9, 18.7, 21.4, 20.6, 15.9, 13.2, 7.7, 3.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1991, 1, [3.2, 1.8, 9.8, 10.5, 12.8, 18.6, 23, 21.9, 19, 11.1, 7.3, 0.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1992, 1, [3.3, 3.6, 7.4, 11.9, 18, 19.3, 22, 23.6, 16.8, 12, 8.6, 4.6]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1993, 1, [2.8, 2.8, 6.2, 11.6, 18.2, 20.5, 21, 22.7, 16.6, 13.6, 6.6, 5.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1994, 1, [5.3, 4.3, 10.3, 11.6, 16.1, 20.3, 24.7, 23.4, 18.1, 11.7, 9.8, 4.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1995, 1, [3, 5.6, 6.8, 10.9, 15.9, 18.3, 24.1, 20.7, 15.6, 13, 6.9, 4.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1996, 1, [4, 2.5, 5.9, 11.9, 16.7, 20.7, 20.6, 20.9, 14.6, 12.7, 9.3, 3.7]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1997, 1, [5, 4.9, 9, 9.3, 17.1, 20.2, 20.8, 21.6, 18.1, 11.9, 8.4, 5.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1998, 1, [4.6, 6.1, 6.6, 11.5, 17.2, 20.8, 22.7, 23.4, 16.8, 12.4, 6.4, 1.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 1999, 1, [3.3, 2.5, 8.4, 12.2, 17.6, 20.3, 22.8, 22.2, 19.2, 13.7, 6.6, 3.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2000, 1, [0.6, 4.3, 7.8, 13.4, 17.4, 21.8, 20.3, 22.8, 17.6, 14.6, 10.5, 6.7]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2001, 1, [5.9, 5.8, 10.1, 11, 18.8, 19.3, 22.4, 23.8, 15.3, 15, 6.6, 1.6]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2002, 1, [1.5, 5.7, 10, 12.3, 17, 22, 22.7, 21.1, 16.4, 13.1, 11.2, 6.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2003, 1, [2.6, 1.8, 8, 11.1, 18.8, 24.5, 24.2, 25.7, 16.8, 11, 9.9, 4.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2004, 1, [2, 3.5, 7.4, 12.3, 14.7, 20.4, 22.5, 22, 18.1, 14.8, 7.8, 4.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2005, 1, [1.9, 2.3, 6.6, 11.3, 17.3, 21.3, 22.4, 20.1, 17.8, 13.3, 7.4, 2.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2006, 1, [1.7, 3.4, 6.4, 12.1, 16.2, 21.2, 25.4, 19.1, 18.9, 15, 9.1, 5.9]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2007, 1, [6.1, 6.9, 10.3, 15, 18.5, 21.8, 22.9, 21.6, 15.7, 12.1, 6.9, 3.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2008, 1, [5.3, 4.9, 7.7, 11.7, 17.6, 21.2, 22.5, 22.3, 16.5, 13.4, 8.5, 4.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2009, 1, [3.6, 3.8, 7.8, 14, 18.7, 20.5, 22.7, 23.8, 19.5, 12.5, 9.6, 4.4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2010, 1, [2, 4.5, 7.1, 12.4, 16, 20.7, 23.5, 21.1, 16.7, 11.9, 9.5, 2.5]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2011, 1, [3.1, 4.7, 8.2, 13.6, 18.3, 21.3, 21.9, 23.4, 20.7, 11.9, 7.6, 5.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2012, 1, [2, 1.4, 10.5, 12.1, 16.9, 22.1, 24.6, 24.5, 19.3, 13.5, 10.3, 2.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2013, 1, [4.1, 3.8, 6.7, 13.2, 15.6, 20.4, 24.8, 23.2, 18, 14.4, 9.8, 5.4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2014, 1, [7.8, 7.9, 10.7, 13.7, 15.9, 20.9, 21.2, 20.7, 17.4, 14.8, 11.4, 6.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2015, 1, [4.6, 5.1, 9.2, 11.8, 17.6, 21.5, 25.4, 23, 18.4, 13.1, 7.9, 4.7]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2016, 1, [3.1, 7.3, 9, 12.8, 15.8, 20.9, 23.9, 22.5, 19.8, 12, 9.2, 2.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2017, 1, [0.6, 6.3, 10.1, 12.6, 17.4, 22.4, 23.3, 24, 16.3, 12.4, 8.2, 3.4]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2018, 1, [5.7, 2.8, 7, 15.2, 19.1, 21.7, 23.3, 23.8, 19.1, 15.1, 10.7, 3.8]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2019, 1, [2, 5.9, 9.2, 12.7, 14.2, 24.3, 24, 24.3, 18.4, 14.1, 10.7, 6.3]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2020, 1, [3.7, 6.8, 8.5, 13.3, 17.1, 20.3, 23, 23.2, 19, 12.6, 8.1, 6.2]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2021, 1, [3.7, 6.6, 7, 10.4, 15, 22.8, 24.2, 22.6, 19, 11.7, 9.4, 4.1]);
addAvgTempYear(cv_placeNovaGoricaBilje, 2022, 1, [2.8, 5.5, 7, 11.5, 19.1, 24.2, 26.5, 24.4, 17.9, 15.6, 9.6, 6.9]);

//id=1890
addAvgTempYear(cv_placeKredarica, 1955, 1, [-5.1, -9.8, -8, -5.5, -0.5, 2.9, 5.7, 4.1, 2.7, -1.3, -4.8, -5]);
addAvgTempYear(cv_placeKredarica, 1956, 1, [-8.3, -17.2, -8.7, -5.5, 0.2, 1.7, 6.1, 6.2, 6, -0.3, -6.7, -5.8]);
addAvgTempYear(cv_placeKredarica, 1957, 1, [-8.1, -6.3, -3.1, -4.4, -2.4, 4.9, 6, 4.8, 3, 1.6, -2.7, -7]);
addAvgTempYear(cv_placeKredarica, 1958, 1, [-7.9, -5.5, -10.7, -6.7, 3.9, 2.9, 6.7, 7.3, 4.7, 0.5, -2.7, -6.3]);
addAvgTempYear(cv_placeKredarica, 1959, 1, [-10.1, -5.3, -4.2, -3.6, -0.2, 3.3, 6.8, 4.8, 3.3, 0.1, -4.6, -6.2]);
addAvgTempYear(cv_placeKredarica, 1960, 1, [-8.7, -7.6, -6.7, -4.5, 0.3, 4.1, 4.5, 6.1, 1.3, -1.2, -3.3, -6.1]);
addAvgTempYear(cv_placeKredarica, 1961, 1, [-7.6, -5.7, -4.7, -0.8, -1.3, 4.8, 4.3, 6.5, 7.7, 1.4, -3.3, -7.4]);
addAvgTempYear(cv_placeKredarica, 1962, 1, [-6.9, -10.4, -10.8, -4.5, -1.4, 1.5, 4.8, 7.9, 3, 0.8, -6.2, -10.2]);
addAvgTempYear(cv_placeKredarica, 1963, 1, [-14.7, -12, -7.1, -3.2, -0.6, 4.3, 6.4, 5.8, 4.6, 0.3, -1.6, -7.3]);
addAvgTempYear(cv_placeKredarica, 1964, 1, [-6.8, -7.9, -6.7, -3.4, 1, 5.1, 6.3, 5.6, 3.7, -1.8, -3, -6]);
addAvgTempYear(cv_placeKredarica, 1965, 1, [-8.5, -14.4, -7.1, -5.6, -1.4, 3.9, 5.3, 4.2, 2.3, 2.6, -5.3, -7.1]);
addAvgTempYear(cv_placeKredarica, 1966, 1, [-10.9, -3.8, -9.2, -2.4, 0, 4.6, 4.5, 4.8, 5.4, 1.3, -7, -8.5]);
addAvgTempYear(cv_placeKredarica, 1967, 1, [-8.9, -8.3, -6.3, -5.5, 0.5, 2.9, 7.2, 6.4, 4.3, 3.8, -1.9, -9.1]);
addAvgTempYear(cv_placeKredarica, 1968, 1, [-11.1, -7.6, -6.6, -2.3, -0.1, 3.2, 5, 3.9, 2.4, 2.6, -3.7, -9.6]);
addAvgTempYear(cv_placeKredarica, 1969, 1, [-7.4, -11.8, -7.5, -4.9, 2.3, 1.9, 6.1, 4, 4.3, 2.4, -3.7, -11]);
addAvgTempYear(cv_placeKredarica, 1970, 1, [-7.2, -11.5, -9.7, -6.1, -2.9, 4.5, 5.2, 6.3, 4.2, 0.1, -1.6, -7.4]);
addAvgTempYear(cv_placeKredarica, 1971, 1, [-8.3, -9.6, -11.1, -2.7, 1.1, 1.9, 6.1, 8.1, 1.1, 1.3, -5.3, -3.1]);
addAvgTempYear(cv_placeKredarica, 1972, 1, [-8.1, -6.1, -5, -4.1, -0.9, 3.4, 5.7, 5.2, -1.1, -2.2, -3.1, -4.9]);
addAvgTempYear(cv_placeKredarica, 1973, 1, [-7.2, -9.9, -8.6, -7.4, 1.2, 4.3, 4.7, 7, 5.3, 0.2, -4.2, -7.4]);
addAvgTempYear(cv_placeKredarica, 1974, 1, [-4.9, -8, -5.4, -5.8, -1.1, 1.5, 5.3, 7.4, 3.6, -6.8, -5.5, -5.2]);
addAvgTempYear(cv_placeKredarica, 1975, 1, [-4.6, -8.3, -7.1, -4.6, 0.8, 2, 5.8, 5.2, 6, -0.7, -5.4, -4.1]);
addAvgTempYear(cv_placeKredarica, 1976, 1, [-8.6, -6.3, -9.2, -4.6, 0.5, 3.8, 6.4, 2.5, 1.4, 1.3, -5.4, -9]);
addAvgTempYear(cv_placeKredarica, 1977, 1, [-7.4, -7, -2.8, -4.5, -0.2, 3.1, 5.3, 4.8, 1.3, 2.7, -5.2, -5.5]);
addAvgTempYear(cv_placeKredarica, 1978, 1, [-8.7, -8.7, -6.4, -5.7, -2, 2.3, 4.1, 4.5, 2.9, 0.7, -1.7, -5.7]);
addAvgTempYear(cv_placeKredarica, 1979, 1, [-10.9, -8.6, -6, -6.2, -0.1, 4.8, 4.5, 4.4, 4.2, 0.5, -4.8, -5.3]);
addAvgTempYear(cv_placeKredarica, 1980, 1, [-10.4, -7.7, -7.1, -7.4, -2.5, 2, 4.4, 7.2, 5.4, -0.6, -3.7, -8.3]);
addAvgTempYear(cv_placeKredarica, 1981, 1, [-12, -10.3, -3.3, -3, 0.1, 4.5, 4.6, 6.1, 3.4, -0.4, -5.4, -9.8]);
addAvgTempYear(cv_placeKredarica, 1982, 1, [-6, -8.5, -8.1, -6.3, 0.4, 4.9, 7.4, 6.2, 6.6, -0.4, -2, -6.5]);
addAvgTempYear(cv_placeKredarica, 1983, 1, [-4.3, -11.5, -5.1, -3, 0.2, 4, 9.8, 5.8, 4.7, 0.8, -3.2, -6.3]);
addAvgTempYear(cv_placeKredarica, 1984, 1, [-9, -11.5, -9.7, -5.9, -2, 2.4, 5.5, 5, 2.3, 1.2, -0.7, -6.1]);
addAvgTempYear(cv_placeKredarica, 1985, 1, [-12.8, -8.9, -7.6, -4.7, 0.6, 1.7, 7.6, 6.8, 6.1, 1.2, -6.6, -3]);
addAvgTempYear(cv_placeKredarica, 1986, 1, [-10.1, -12.4, -6.1, -4.2, 2.9, 3.2, 5.2, 6.6, 4.5, 2.4, -1.6, -6.4]);
addAvgTempYear(cv_placeKredarica, 1987, 1, [-10.3, -6.8, -11.9, -3.2, -1.9, 2.8, 7.1, 6.1, 6.8, 2, -4.2, -3.7]);
addAvgTempYear(cv_placeKredarica, 1988, 1, [-5.5, -9.3, -9.2, -3.2, 1, 2.9, 7.4, 7.4, 3.3, 2.6, -5.3, -6.4]);
addAvgTempYear(cv_placeKredarica, 1989, 1, [-2.7, -4, -3.2, -3.8, -0.4, 1.7, 6.3, 5.9, 3.3, 1.6, -4.4, -4.3]);
addAvgTempYear(cv_placeKredarica, 1990, 1, [-4.3, -2.9, -3.1, -5.1, 1.1, 3.6, 6.4, 6.7, 2.2, 2.5, -4.9, -9.7]);
addAvgTempYear(cv_placeKredarica, 1991, 1, [-6.3, -10, -4, -6.1, -3.7, 3.3, 7.3, 7.1, 5.3, -1.1, -3.9, -7.5]);
addAvgTempYear(cv_placeKredarica, 1992, 1, [-4.8, -6.7, -6.2, -3.9, 1.2, 3.2, 7.5, 10.3, 4.4, -1.2, -1.5, -5.1]);
addAvgTempYear(cv_placeKredarica, 1993, 1, [-4.4, -7.4, -7.9, -3.3, 1.8, 4.3, 5.6, 7.1, 2.3, 0.5, -6, -5.6]);
addAvgTempYear(cv_placeKredarica, 1994, 1, [-6.5, -8.9, -2.6, -5.1, 0.9, 4.7, 8, 8.6, 4.4, -0.2, -0.9, -4.1]);
addAvgTempYear(cv_placeKredarica, 1995, 1, [-9.8, -4.6, -8.4, -3.4, 0.4, 2.5, 8.6, 5.2, 1, 4.6, -6, -7.3]);
addAvgTempYear(cv_placeKredarica, 1996, 1, [-6, -10.3, -9.4, -2.9, 1.1, 5.1, 5.1, 5.3, -0.8, -0.6, -3.8, -6.1]);
addAvgTempYear(cv_placeKredarica, 1997, 1, [-4, -5, -4.5, -6.5, 1, 4.1, 5.3, 6.3, 6.2, -0.3, -3.5, -6.5]);
addAvgTempYear(cv_placeKredarica, 1998, 1, [-6.2, -2.5, -7.7, -3.7, 0.5, 5.6, 7.2, 7.9, 2.7, -0.1, -7.7, -7]);
addAvgTempYear(cv_placeKredarica, 1999, 1, [-5.4, -10.6, -6, -3.2, 3, 3.8, 6.4, 6.9, 5.3, 0.8, -5, -7.5]);
addAvgTempYear(cv_placeKredarica, 2000, 1, [-8, -6.7, -5.7, -1.6, 2.7, 6.5, 4.4, 8.5, 4.4, 1.8, -2.6, -4.2]);
addAvgTempYear(cv_placeKredarica, 2001, 1, [-7.2, -7.8, -3.6, -4.8, 2.6, 3.3, 6.9, 8.6, 0.4, 4.7, -4.7, -10.8]);
addAvgTempYear(cv_placeKredarica, 2002, 1, [-5.4, -4.6, -3.6, -4.1, 1.9, 6.8, 7, 6.1, 1.5, 0.4, -2.8, -5.5]);
addAvgTempYear(cv_placeKredarica, 2003, 1, [-8.6, -11.2, -5, -4.9, 3.4, 8.9, 8, 10.2, 3.3, -2.6, -1.6, -5.8]);
addAvgTempYear(cv_placeKredarica, 2004, 1, [-10.3, -7, -6.3, -3.7, -1.3, 4.1, 6.3, 7, 4, 2.3, -4.1, -4.6]);
addAvgTempYear(cv_placeKredarica, 2005, 1, [-8.5, -13.1, -6.3, -3.3, 1.8, 4.9, 7, 4.7, 3.6, 2.7, -4.4, -9.9]);
addAvgTempYear(cv_placeKredarica, 2006, 1, [-8.8, -9.6, -7.6, -2.7, 0.7, 5.1, 9.1, 3.5, 6.6, 3.8, -1.1, -3.1]);
addAvgTempYear(cv_placeKredarica, 2007, 1, [-3.6, -5.5, -5.7, 0.4, 2.3, 5.6, 7.5, 6.8, 1.6, -0.1, -5.7, -7.2]);
addAvgTempYear(cv_placeKredarica, 2008, 1, [-4.9, -5.1, -7.2, -4.4, 1.7, 5.7, 6.5, 7.5, 1.6, 1.9, -4, -7.2]);
addAvgTempYear(cv_placeKredarica, 2009, 1, [-7.7, -10.5, -7.3, -1.5, 3.2, 3.7, 7.7, 8.8, 4.3, -0.4, -1.3, -8.5]);
addAvgTempYear(cv_placeKredarica, 2010, 1, [-10.1, -8.7, -7.4, -3.2, -0.4, 5, 8.2, 6.5, 2.3, -0.6, -3.6, -10.1]);
addAvgTempYear(cv_placeKredarica, 2011, 1, [-7.8, -6.5, -5.7, -1.3, 1.7, 5, 5.6, 9.2, 7.1, 0.5, 0.3, -6.3]);
addAvgTempYear(cv_placeKredarica, 2012, 1, [-9, -12.6, -2.7, -3.2, 1.2, 6.8, 7.7, 9, 4.9, 2.7, -1.1, -8.3]);
addAvgTempYear(cv_placeKredarica, 2013, 1, [-6.9, -11.2, -7.2, -1.6, -0.5, 4.1, 8.2, 7.9, 4.1, 2.5, -3.9, -3.3]);
addAvgTempYear(cv_placeKredarica, 2014, 1, [-4.9, -6.1, -3.6, -1.7, 0, 4.7, 6.2, 5.6, 3.8, 1.9, -0.1, -5.8]);
addAvgTempYear(cv_placeKredarica, 2015, 1, [-6.9, -8.1, -6.1, -3, 2.3, 5.2, 10.3, 9, 2.2, 0.1, 0.3, 0.7]);
addAvgTempYear(cv_placeKredarica, 2016, 1, [-7.1, -5.8, -6.9, -1.8, 0.2, 4.7, 8.1, 7.2, 5.2, -1.3, -3.7, -3.3]);
addAvgTempYear(cv_placeKredarica, 2017, 1, [-10.1, -5.1, -3, -3.4, 1.8, 7.4, 8.1, 9.7, 1.6, 2.5, -4.5, -7.8]);
addAvgTempYear(cv_placeKredarica, 2018, 1, [-5.4, -12.2, -6.8, 0.7, 3.1, 5.3, 8, 8.7, 5.8, 1.8, -1.9, -6.2]);
addAvgTempYear(cv_placeKredarica, 2019, 1, [-10.9, -4.3, -4.9, -2.6, -2, 8.9, 8.4, 9, 5.3, 4, -3.1, -5]);
addAvgTempYear(cv_placeKredarica, 2020, 1, [-3.1, -4.5, -6.2, -1.2, 0.8, 4.6, 7.3, 8.5, 5.3, -0.4, 0.4, -5.5]);
addAvgTempYear(cv_placeKredarica, 2021, 1, [-10.2, -4.4, -6.8, -5.5, -1.2, 7.3, 8, 6.5, 5.5, 0.2, -2.2, -5.6]);
addAvgTempYear(cv_placeKredarica, 2022, 1, [-6.5, -6.5, -5.7, -3.9, 3.5, 8.4, 9, 8, 2.7, 5, -2.9, -3.6]);

//id=1054 1053  1897
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1949, 7, [17.3, 16.5, 14.4, 9.7, 4.4, -1.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1950, 1, [-5.8, 1.2, 4.9, 7.8, 14.7, 18, 20.2, 18.3, 14.1, 7.1, 3.1, -0.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1951, 1, [-0.3, 2.4, 3, 8, 12.4, 16.6, 17.6, 18.1, 15.2, 7.1, 5.9, -0.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1952, 1, [-5.3, -3.6, 0.9, 10.3, 12.6, 17.1, 19.2, 18.3, 11.3, 8, 0.8, -2.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1953, 1, [-4.9, -2.3, 2.4, 8.9, 12.1, 16.3, 18.3, 15.5, 14, 11.1, 1.1, -0.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1954, 1, [-6.8, -5, 4.5, 6.7, 11.7, 17.3, 16, 16.3, 14.2, 7.9, 2.6, 2.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1955, 1, [-1.4, -0.1, 0.1, 6.2, 11.2, 15.6, 17.5, 15.9, 12.8, 7.6, 1.7, -0.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1956, 1, [-0.8, -8.5, 1.2, 6.6, 12.8, 15, 18.2, 17, 13.3, 7.6, 0.9, -2.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1957, 1, [-4.7, 2.5, 4.7, 7.8, 9.7, 18, 17.9, 16.2, 12.2, 7.7, 4.6, -0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1958, 1, [-4.7, 0.5, -0.1, 5.7, 16.4, 15.7, 18.2, 17.6, 13.1, 9.3, 4.7, 0.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1959, 1, [-2.8, -2, 6.3, 8.8, 12, 15.2, 18.2, 16.1, 11.4, 6.5, 3.8, 1.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1960, 1, [-3.1, -0.5, 3.4, 7.8, 12.6, 16.2, 16.1, 17.2, 12.1, 9.9, 4, 0.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1961, 1, [-5.2, 0.8, 4.7, 11, 11.6, 17.2, 16, 16.4, 14.8, 10.1, 3.4, -4.2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1962, 1, [-2.8, -0.9, 0.9, 7.1, 11.6, 13.9, 15.9, 17.9, 12.1, 8.1, 2.5, -6.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1963, 1, [-7.1, -5.1, 1.5, 8.9, 11.8, 17, 18.1, 17.7, 14.5, 8.1, 7.3, -4.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1964, 1, [-8.9, -0.8, 2, 8.9, 12.9, 17.6, 17.6, 16.1, 13.7, 7.9, 4.7, -1.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1965, 1, [-2.4, -4.5, 3.4, 6.2, 11.7, 16.5, 17.2, 15.2, 13.8, 6.8, 1.8, -2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1966, 1, [-4.8, 3.7, 3, 10.1, 12.7, 16.8, 16.6, 16.1, 14.3, 12.7, 1.4, -1.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1967, 1, [-4, -0.8, 4.7, 7.2, 13.7, 15.7, 19, 16.8, 14.3, 9.9, 4, -2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1968, 1, [-6.4, 1.2, 3.9, 10.1, 13.4, 15.9, 17.1, 16.1, 13.2, 9.2, 3.9, -5.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1969, 1, [-3, -2.6, 2, 7, 15.4, 15.2, 17.5, 15.8, 13.8, 7.8, 4.5, -4.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1970, 1, [-1.9, -1, 1.5, 6.3, 10.6, 17, 17.2, 17.3, 13.8, 6.7, 4.5, -2.7]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1971, 1, [-3.2, 0, 0.7, 8.9, 14.2, 15.2, 17.6, 18.3, 10.9, 6.7, 2.2, -2.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1972, 1, [-4.3, 1.2, 5, 8, 12, 16.4, 17.2, 16.5, 10.1, 6.5, 1.8, -2.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1973, 1, [-2.2, -1.2, 1.8, 6, 14, 16.3, 17, 16.8, 14, 5.9, 0.4, -1.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1974, 1, [0.2, 3.2, 4.9, 6.6, 12.3, 14.3, 17.5, 18, 13.4, 4.9, 3.4, -0.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1975, 1, [1.2, -0.7, 3.9, 7.7, 13.9, 14.6, 17.7, 16.6, 15.8, 7.8, 2.2, -1.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1976, 1, [-1.2, -0.7, 0.6, 7.2, 12.5, 16.4, 18.1, 14.2, 12.6, 9.7, 4.2, -2.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1977, 1, [-0.8, 2.4, 6.3, 6.8, 12.5, 16.3, 17.2, 16.6, 11.1, 10, 3, -1.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1978, 1, [-1.4, -0.5, 5.1, 6.4, 11.1, 15.2, 16.1, 15.5, 12.8, 7.8, 0.3, -3.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1979, 1, [-5, -0.3, 4.9, 6.5, 13.2, 17, 16.6, 15.7, 13.6, 8.2, 3.2, 0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1980, 1, [-3.8, 0.6, 3.6, 6.1, 10.5, 15.6, 16.6, 17.2, 14, 8, 0.1, -4.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1981, 1, [-6.4, -2.5, 5.5, 8.1, 12.8, 16.7, 17.3, 16.8, 14.5, 10, 1.8, -2.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1982, 1, [-4, -2.8, 2.9, 5.9, 13, 17.2, 18.7, 17.5, 16.3, 9.7, 4.9, 0.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1983, 1, [-1.7, -2.9, 3.8, 10.3, 13.9, 16.2, 20.2, 17.3, 13.6, 7.9, -0.5, -1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1984, 1, [-3, -0.9, 1.9, 6.9, 11.6, 15.4, 16.7, 16.2, 13.4, 9.7, 3.3, 0.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1985, 1, [-6.7, -3.5, 3, 7.4, 13.6, 15.3, 18.7, 17.9, 14.1, 7.9, 0.6, -0.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1986, 1, [-3.1, -4.9, 1.4, 8.6, 15.7, 15.2, 17.5, 18.1, 12.7, 8.5, 3.4, -4.7]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1987, 1, [-6.6, -1.8, -1.5, 9, 11.5, 16.3, 19.3, 16.5, 16.3, 10.1, 3.7, -0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1988, 1, [0.7, 1, 3.1, 8, 13.3, 15.6, 19.6, 18.2, 13.6, 9.8, -1, -1.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1989, 1, [-2, 2.5, 6.2, 9.3, 12.7, 14.9, 18.4, 17.4, 13.4, 8.1, 1.2, -0.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1990, 1, [-2.2, 3.3, 5.6, 7.4, 14, 16.2, 17.2, 17.1, 12.3, 9.6, 3, -1.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1991, 1, [-2.9, -4, 6.3, 6.5, 9.9, 16.5, 19.2, 17.7, 15.4, 7.3, 3.1, -3.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1992, 1, [-1.4, 0.8, 4.1, 8.5, 13.4, 16.9, 18.7, 21.5, 14, 8, 4.1, -1.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1993, 1, [-1.7, -0.8, 3.2, 8.9, 14.9, 17.5, 18, 17.9, 13.5, 10.1, 1.4, -1.2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1994, 1, [1.1, -0.3, 7.5, 7.8, 13.4, 17.4, 19.5, 19.5, 15.5, 7.2, 6.2, -0.2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1995, 1, [-2.6, 1.7, 2.7, 8.7, 13.1, 15.2, 19.7, 16.5, 12.4, 10.1, 2.9, -1.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1996, 1, [-2.1, -3, 0.3, 8.2, 14.4, 17.2, 16.6, 16.9, 11.2, 8.9, 5.5, -3.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1997, 1, [-2.6, 1.1, 4.2, 6.2, 14.1, 17.2, 17.8, 17.1, 13.7, 7.1, 3.9, 0.7]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1998, 1, [0.4, 2.2, 3.1, 9.2, 13.3, 17.9, 18.8, 18.6, 13.7, 9.2, 1.8, -4.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 1999, 1, [-2.1, -1.3, 5.8, 9.5, 14.4, 17, 18.4, 17.8, 15.6, 9.9, 1.2, -2.9]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2000, 1, [-5.2, 1.2, 5.2, 11.8, 14.9, 18.5, 17.3, 18.9, 14, 11, 7.1, 1.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2001, 1, [0.8, 1.6, 6.9, 7.4, 15.2, 16.2, 19.2, 19.2, 11.9, 12, 1.5, -4.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2002, 1, [-3.4, 3.1, 5.9, 7.9, 15.4, 19.2, 19.5, 18, 12.5, 9.2, 7.3, 0.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2003, 1, [-3.4, -3.9, 4.3, 7.5, 15.9, 20.7, 20.3, 20.8, 12.7, 6.8, 5.6, -0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2004, 1, [-2.7, -0.5, 2.2, 9, 11.8, 16.3, 18.1, 18.1, 13.4, 11.1, 2.9, -0.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2005, 1, [-2.8, -3.1, 2.5, 8.4, 14.4, 17.5, 18.6, 16.2, 14.5, 9.5, 3, -3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2006, 1, [-5.7, -2.1, 1.9, 9.3, 13.1, 17.8, 20.5, 15.5, 15.1, 11.3, 4.1, 1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2007, 1, [0.7, 3.4, 5.5, 11.1, 15.2, 19, 19.6, 17.8, 11.9, 7.9, 3, -2.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2008, 1, [1.2, 2.3, 3.9, 8.8, 14.8, 18.5, 19, 18.3, 13.3, 10.1, 4.5, 0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2009, 1, [-2.8, 0.4, 4.7, 11.1, 15.7, 16.8, 19.3, 19.4, 15.1, 9.1, 5, -0.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2010, 1, [-2.9, -0.5, 4, 9, 14, 18.3, 20.7, 18, 12.9, 7.4, 5.4, -2.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2011, 1, [-1.6, -1, 4.7, 10.8, 14.4, 17.7, 18.5, 19.6, 16.7, 7.8, 2.8, 0.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2012, 1, [-1.4, -3.5, 6.9, 9.5, 14, 19.4, 20, 19.3, 14.8, 9.5, 6.5, -1.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2013, 1, [-0.6, -1.3, 1.9, 10.4, 13.5, 17.7, 20.7, 19.8, 14, 10.8, 4.9, 0.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2014, 1, [2.2, 2.9, 7, 11, 13.6, 17.6, 19.2, 17.5, 14.2, 11.8, 8.2, 0.2]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2015, 1, [0.6, 0.8, 4.8, 9.5, 14.7, 18.1, 21.6, 20.2, 14.5, 9.2, 4.3, -0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2016, 1, [-1.5, 3.4, 5.3, 10.7, 13.9, 17.6, 20.6, 18, 15.7, 8.7, 4.4, -1.3]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2017, 1, [-5.7, 2.7, 7.6, 9.5, 14.9, 19.4, 20.7, 19.8, 12.3, 9.1, 3.5, -0.6]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2018, 1, [1.5, -1.7, 2.9, 13.1, 16.1, 18.6, 19.6, 19.8, 15.3, 11, 6.6, -0.5]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2019, 1, [-1.6, 2.7, 6, 9.6, 11.1, 20.9, 20.5, 20, 14.4, 10.9, 7.1, 1.1]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2020, 1, [-0.9, 3.6, 4.6, 9.8, 13.1, 17.4, 18.9, 19.6, 14.6, 9.7, 3.3, 0.8]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2021, 1, [-1.7, 1.9, 3.7, 6.8, 11.8, 20.3, 20.9, 17.9, 14.2, 8.4, 4.2, -1.4]);
addAvgTempYear(cv_placeSlovenjGradecSmartno, 2022, 1, [-1.2, 2.2, 2.8, 8.2, 15.8, 20.1, 21.1, 20.2, 13.7, 12, 5.7, 0.1]);

//myTool POZOR: id=14
addAvgTempYear(cv_placeKrvavec, 1961, 1, [-5.8, -2.2, -3.3, 6, 6.1, 11.2, 11.2, 12.5, 12.4, 6.6, 1.3, -3.7]); //manjkajoči mar, nadomestim s povprečjem iz dveh naslednjih podatka
addAvgTempYear(cv_placeKrvavec, 1962, 1, [-3.3, -5.3, -4.8, 3, 5.5, 8.9, 11.9, 14.2, 9.3, 5.1, -0.6, -6]);
addAvgTempYear(cv_placeKrvavec, 1963, 1, [-9.7, -7.1, -1.9, 3.2, 7.1, 11.1, 13.5, 12.7, 10.5, 5.1, 2.7, -4.6]);
addAvgTempYear(cv_placeKrvavec, 1964, 1, [-3.6, -3.9, -1.9, 3.6, 8.4, 12.7, 12.8, 11.2, 8.8, 3.8, 2.6, -2.1]);
addAvgTempYear(cv_placeKrvavec, 1965, 1, [-3.6, -8.9, -2.6, 0.3, 5.1, 11.8, 12, 10.8, 8.4, 5.3, 0, -1.9]);
addAvgTempYear(cv_placeKrvavec, 1966, 1, [-7.2, 1.1, -2.2, 4.7, 9.1, 12.5, 12.5, 11, 9.8, 8, -0.9, -4.7]);
addAvgTempYear(cv_placeKrvavec, 1967, 1, [-5.3, -3.6, 0, 1.9, 7.5, 10.5, 14.8, 13.5, 10.8, 9.1, 2.7, -4.9]);
addAvgTempYear(cv_placeKrvavec, 1968, 1, [-6, -2, -1.5, 5.1, 8.9, 11.4, 12.5, 10.2, 9, 7.1, 1.7, -5.7]);
addAvgTempYear(cv_placeKrvavec, 1969, 1, [-3.5, -6, -2.9, 1.2, 10.2, 10.3, 13.4, 11.5, 9.8, 6.9, 1.5, -7]);
addAvgTempYear(cv_placeKrvavec, 1970, 1, [-3.4, -6.6, -3.9, 0.4, 5, 12.3, 13.4, 13.9, 9.5, 4.6, 2.9, -3.3]);
addAvgTempYear(cv_placeKrvavec, 1971, 1, [-4.2, -4.5, -5, 3.8, 9.4, 11.7, 13, 13, 7.6, 6, 0.1, 0.9]);  //manjkajoči jun-avg, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeKrvavec, 1972, 1, [-6.4, -4.2, -3.4, 2.7, 8, 11.2, 12.6, 12.2, 6.8, 2.9, 1.7, -1.8]);  //manjkajoči feb-maj, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
//addAvgTempYear(cv_placeKrvavec, 1973, 1, [-4.2, -4, -1.9, 1.6, , , , , , , , ]);
//myTool POZOR: id=1614
//addAvgTempYear(cv_placeKrvavec, 1973, 1, [, , , , , , , , 9.5, 3.8, -1.2, -4.3]);
addAvgTempYear(cv_placeKrvavec, 1973, 1, [-4.2, -4, -1.9, 1.6, 6.7, 9, 11.4, 12.4, 9.5, 3.8, -1.2, -4.3]); //manjkajoči maj-avg, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeKrvavec, 1974, 1, [-1.4, -3.6, -0.7, -0.5, 4, 6.8, 10.2, 12.6, 7.8, -2.1, -1.7, -1.2]);
addAvgTempYear(cv_placeKrvavec, 1975, 1, [-1.5, -4, -2.7, 0.3, 6.2, 7.7, 11.1, 10.6, 10.2, 3.7, -1.9, -1.4]);
addAvgTempYear(cv_placeKrvavec, 1976, 1, [-4, -2.9, -5.1, 0.6, 5.8, 9.5, 11.7, 7.7, 5.7, 5.3, -0.9, -5]);
addAvgTempYear(cv_placeKrvavec, 1977, 1, [-3.6, -2.7, 1.2, -0.2, 4.9, 8.4, 10.2, 9.7, 5.9, 6, -0.9, -2.5]);
addAvgTempYear(cv_placeKrvavec, 1978, 1, [-4.6, -6, -1.9, -0.8, 2.8, 7.8, 9, 9.3, 7.5, 4.7, 2.1, -3.2]);
addAvgTempYear(cv_placeKrvavec, 1979, 1, [-7.2, -5, -2.1, -1.2, 5.2, 10.6, 9.3, 9.4, 8.6, 3.7, -0.8, -1.4]);
addAvgTempYear(cv_placeKrvavec, 1980, 1, [-6.7, -3.7, -3.6, -2.1, 2.4, 7.5, 9.2, 11.5, 8.7, 3.4, -1.6, -4.2]);
addAvgTempYear(cv_placeKrvavec, 1981, 1, [-7.8, -6.8, 0.3, 1.6, 5.1, 9.6, 10.1, 11, 8, 3.8, -0.3, -5.7]);
addAvgTempYear(cv_placeKrvavec, 1982, 1, [-3.2, -4.7, -3.5, -1.2, 6.1, 10.1, 12.2, 11.5, 11.1, 4, 1.6, -2.2]);
addAvgTempYear(cv_placeKrvavec, 1983, 1, [0, -7.3, -0.4, 1.5, 5.9, 9.4, 15, 11.2, 9.3, 5.1, -0.2, -2.9]);
addAvgTempYear(cv_placeKrvavec, 1984, 1, [-5.5, -7.2, -5, -0.2, 2.7, 7.5, 10.7, 9.8, 6.9, 5.3, 1.9, -2.3]);
addAvgTempYear(cv_placeKrvavec, 1985, 1, [-8.5, -5.4, -3.3, 0.2, 6.2, 7, 12.2, 12, 10.7, 5.7, -3.4, 0.2]);
addAvgTempYear(cv_placeKrvavec, 1986, 1, [-6.6, -9, -2.4, 0.7, 8.4, 8.7, 10.6, 11.6, 8.5, 6.1, 1.4, -2.9]);
addAvgTempYear(cv_placeKrvavec, 1987, 1, [-7.3, -3.2, -7, 1.7, 3.8, 8.3, 12.3, 10.4, 11.8, 4.2, 0.4, -0.4]);
addAvgTempYear(cv_placeKrvavec, 1988, 1, [-2.4, -4.8, -4.2, 1.3, 5.5, 8.4, 12.9, 12.7, 8, 6, -2.3, -2]);
addAvgTempYear(cv_placeKrvavec, 1989, 1, [1, 0.4, 1.6, 1.1, 5.4, 7.5, 11.6, 11.2, 8, 6.1, -0.8, -1.6]);
addAvgTempYear(cv_placeKrvavec, 1990, 1, [-0.4, 0.5, 2.3, -0.4, 7.1, 8.6, 11.4, 12, 6.5, 6.1, -0.7, -5.5]);
addAvgTempYear(cv_placeKrvavec, 1991, 1, [-3.3, -6, 0.7, -0.1, 1.8, 8.5, 12.7, 12.1, 9.6, 2.1, -0.5, -3.4]);
addAvgTempYear(cv_placeKrvavec, 1992, 1, [-0.9, -2.2, -1.8, 1.1, 6.8, 9.1, 12.3, 15.5, 8.7, 2.7, 1.6, -1.9]);
addAvgTempYear(cv_placeKrvavec, 1993, 1, [-2.1, -2.8, -2.8, 2.3, 7.9, 9.5, 10.6, 12.3, 6.7, 4.4, -2.5, -2.6]);
addAvgTempYear(cv_placeKrvavec, 1994, 1, [-2.5, -5.4, 1.6, 0.8, 5.7, 10.1, 13.6, 13.5, 8.7, 4, 3.1, -1]);
addAvgTempYear(cv_placeKrvavec, 1995, 1, [-6.4, -1.5, -4.4, 1.5, 5.8, 7.7, 13.7, 10.3, 5.8, 8.3, -1.6, -3.8]);
addAvgTempYear(cv_placeKrvavec, 1996, 1, [-3.4, -6.8, -5.2, 1.8, 6.2, 10.2, 9.7, 10.7, 4.5, 3.5, 0.1, -4]);
addAvgTempYear(cv_placeKrvavec, 1997, 1, [-0.7, -1.9, 0.2, -1, 6.3, 9.3, 10.5, 11.5, 9.5, 3.2, 0.3, -2.9]);
addAvgTempYear(cv_placeKrvavec, 1998, 1, [-3, 0.8, -3.7, 0.9, 5.8, 10.9, 12.1, 13.2, 6.9, 4, -3.4, -3.7]);
addAvgTempYear(cv_placeKrvavec, 1999, 1, [-2.3, -6.1, -1.3, 1.8, 7.4, 9.1, 11.8, 11.2, 9.8, 4.7, -1.7, -4.6]);
addAvgTempYear(cv_placeKrvavec, 2000, 1, [-4.8, -3.2, -1.8, 3.7, 8, 11.9, 9.6, 13.5, 8.5, 6.2, 1.2, -1]);
addAvgTempYear(cv_placeKrvavec, 2001, 1, [-4, -3.6, -0.1, 0.5, 8.1, 8.5, 11.9, 13.6, 5.1, 8.4, -1.1, -6.7]);
addAvgTempYear(cv_placeKrvavec, 2002, 1, [-2.1, -1.1, 0.4, 1, 7.6, 11.8, 12.3, 11.2, 6.7, 4.1, 1.5, -2.5]);
addAvgTempYear(cv_placeKrvavec, 2003, 1, [-4.8, -7.8, -0.2, 0.2, 9.5, 14.3, 13, 15.9, 8, 0.9, 1.6, -2]);
addAvgTempYear(cv_placeKrvavec, 2004, 1, [-6.9, -3.2, -3.1, 1.2, 4, 9.7, 12, 11.8, 8.3, 6.2, 0.3, -1.1]);
addAvgTempYear(cv_placeKrvavec, 2005, 1, [-4.3, -8.3, -2.5, 1.3, 7.6, 10, 12.1, 9.7, 8.1, 5.6, -0.9, -5.9]);
addAvgTempYear(cv_placeKrvavec, 2006, 1, [-5.4, -5.4, -3.8, 1.9, 6.1, 11, 14.8, 9, 10.7, 7.2, 2.2, 0.6]);
addAvgTempYear(cv_placeKrvavec, 2007, 1, [-0.9, -1.8, -0.9, 5.9, 7.9, 11.1, 13, 12.1, 6.5, 4.1, -1.7, -3.3]);
addAvgTempYear(cv_placeKrvavec, 2008, 1, [-1.4, -1.4, -2.9, 0.8, 7.2, 11.4, 12, 12.4, 6.4, 6.1, 0, -3.8]);
addAvgTempYear(cv_placeKrvavec, 2009, 1, [-4.4, -6, -3, 4, 8.7, 9.3, 13, 13.6, 9.9, 3.5, 2, -4.7]);
addAvgTempYear(cv_placeKrvavec, 2010, 1, [-6.5, -5.3, -3.3, 2, 5.3, 10.6, 14, 11.6, 7.3, 2.6, 0.3, -5.7]);
addAvgTempYear(cv_placeKrvavec, 2011, 1, [-3.8, -1.7, -0.9, 4.6, 7.7, 10.4, 11.4, 14.4, 12.1, 4.6, 3.4, -2.3]);
addAvgTempYear(cv_placeKrvavec, 2012, 1, [-5.1, -8.1, 2.8, 1.4, 7.2, 11.9, 13.2, 14.8, 10.2, 6.2, 2.3, -4.1]);
addAvgTempYear(cv_placeKrvavec, 2013, 1, [-3.1, -6.5, -3.3, 2.5, 5, 9.9, 13.7, 13.8, 8.4, 5.5, 0, 0.3]);
addAvgTempYear(cv_placeKrvavec, 2014, 1, [-1.3, -1.8, 1.1, 3.7, 5.5, 10.6, 11.9, 10.8, 8.5, 6, 4.2, -1.5]);
addAvgTempYear(cv_placeKrvavec, 2015, 1, [-3.2, -3.7, -1.8, 1.9, 7.6, 10.6, 15.2, 14.3, 7.5, 4.5, 4.7, 3.7]);
addAvgTempYear(cv_placeKrvavec, 2016, 1, [-3, -2.2, -2.3, 2.7, 5.4, 10.1, 13.2, 12.1, 10, 3.2, 0.1, 1]);
addAvgTempYear(cv_placeKrvavec, 2017, 1, [-6.6, -1.7, 1.3, 1.9, 7.1, 12.3, 13.2, 14.8, 6.2, 6.3, -0.8, -3.7]);
addAvgTempYear(cv_placeKrvavec, 2018, 1, [-2.2, -8.1, -3.3, 5.7, 8.9, 11.4, 13.2, 14.4, 10.6, 6.4, 1.7, -2.5]);
addAvgTempYear(cv_placeKrvavec, 2019, 1, [-6.5, 0.1, -0.1, 2.5, 3.3, 14.5, 13.7, 13.8, 9, 6.7, 1.2, -1.1]);
addAvgTempYear(cv_placeKrvavec, 2020, 1, [-0.1, -1.4, -1.8, 4, 6.1, 9.9, 12.4, 13.8, 9.6, 3.9, 3.6, -1.9]);
addAvgTempYear(cv_placeKrvavec, 2021, 1, [-6.2, -1.2, -1.9, -0.8, 3.8, 13.3, 13.8, 11.8, 9.8, 4.3, 1.5, -2.2]);
addAvgTempYear(cv_placeKrvavec, 2022, 1, [-2.1, -2.7, -1.7, 0.9, 9.1, 13.8, 14.9, 13.8, 7.8, 9.3, 1.6, -0.9]);

//id=996  MURSKA SOBOTA - RAKIČAN I (lon=16.1950, lat=46.6497, viš=187m)
addAvgTempYear(cv_placeMurskaSobota, 1949, 4, [10.9, 14.5, 15.8, 18.9, 17.3, 15.1, 10.5, 6.1, 1.5]);
//addAvgTempYear(cv_placeMurskaSobota, 1950, 1, [-5.4, 1, 5.5, 9.5, 15.9, 19.1, , , , , , ]);
//id=893  MURSKA SOBOTA (lon=16.1784, lat=46.6497, viš=187m)
addAvgTempYear(cv_placeMurskaSobota, 1950, 1, [-5.4, 1, 5.5, 9.5, 15.8, 19.1, 21.7, 19.3, 15, 7.8, 5.4, 0.9]);
addAvgTempYear(cv_placeMurskaSobota, 1951, 1, [1, 4, 4.9, 10.3, 14.1, 18.1, 19.2, 19.8, 16.8, 8.2, 8, 1.5]);
//id=1052  MURSKA SOBOTA (lon=16.1284, lat=46.6663, viš=191m)
addAvgTempYear(cv_placeMurskaSobota, 1952, 1, [-1.8, -2.1, 2.1, 12.7, 14.4, 18.8, 21.6, 21.2, 13.4, 9.2, 2.6, -0.3]);
//id=1051  MURSKA SOBOTA (lon=16.1284, lat=46.6663, viš=191m)
addAvgTempYear(cv_placeMurskaSobota, 1953, 1, [-2.4, 0.7, 3.9, 10.6, 14, 18.5, 20.3, 17.3, 15.8, 11.9, 2.5, -0.3]);
addAvgTempYear(cv_placeMurskaSobota, 1954, 1, [-6.5, -6.5, 5.6, 8.2, 13.7, 19.2, 17.7, 18.3, 15.7, 9, 3.7, 3]);
addAvgTempYear(cv_placeMurskaSobota, 1955, 1, [-1.1, 0.7, 1.2, 8, 13.1, 16.9, 19, 17.9, 14.5, 9.4, 3.7, 0.9]);
//id=1078  MURSKA SOBOTA - RAKIČAN (lon=16.1284, lat=46.6663, viš=193m)
addAvgTempYear(cv_placeMurskaSobota, 1956, 1, [1.3, -9, 1.9, 8.9, 14.4, 16.5, 19.6, 18.6, 14.7, 9.1, 1.4, -1.2]);
addAvgTempYear(cv_placeMurskaSobota, 1957, 1, [-4.9, 4, 6.7, 9.4, 11.6, 19.6, 19.9, 17.5, 14, 8.4, 6, 0.6]);
addAvgTempYear(cv_placeMurskaSobota, 1958, 1, [-3.3, 2.9, 1.2, 7.8, 18.3, 17.2, 20, 19.4, 15, 10.8, 5.8, 2.8]);
addAvgTempYear(cv_placeMurskaSobota, 1959, 1, [-0.3, -1.4, 8.1, 10.6, 14, 16.9, 20.1, 18.4, 13.2, 7.9, 4.9, 3.5]);
addAvgTempYear(cv_placeMurskaSobota, 1960, 1, [-2.3, 0.7, 5.6, 9.9, 13.9, 18.1, 17.9, 19.1, 13.8, 12, 6.4, 3.3]);
addAvgTempYear(cv_placeMurskaSobota, 1961, 1, [-2.7, 2.9, 7.4, 13.1, 13.3, 19, 18.1, 18.2, 16, 11.3, 5.2, -1.8]);
addAvgTempYear(cv_placeMurskaSobota, 1962, 1, [-0.6, 0.5, 2.5, 10.1, 13.5, 15.6, 17.5, 19.3, 13.3, 9.3, 3.7, -4.9]);
addAvgTempYear(cv_placeMurskaSobota, 1963, 1, [-7.7, -5.1, 2.5, 10.9, 14.5, 18.9, 20.3, 19.3, 15.8, 9, 9.5, -6.3]);
addAvgTempYear(cv_placeMurskaSobota, 1964, 1, [-7.9, -0.4, 2.7, 10.7, 14.1, 19.6, 19.1, 17.7, 14.5, 9.1, 6.1, -0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1965, 1, [-0.6, -3, 5.2, 8.3, 13.2, 17.8, 18.8, 17, 15.6, 7.5, 2.5, 1.1]);
addAvgTempYear(cv_placeMurskaSobota, 1966, 1, [-4.3, 6, 4.7, 11.8, 14.2, 18, 18.1, 17.3, 15.3, 14.1, 2.9, 0.6]);
addAvgTempYear(cv_placeMurskaSobota, 1967, 1, [-3.4, 1.6, 6.6, 9.3, 15.4, 17.6, 20.9, 18.6, 16, 10.8, 4.5, -1.4]);
addAvgTempYear(cv_placeMurskaSobota, 1968, 1, [-5.6, 1.6, 5.3, 11.7, 14.9, 18.1, 19.2, 17.5, 14.5, 9.9, 5.3, -3.1]);
addAvgTempYear(cv_placeMurskaSobota, 1969, 1, [-3.2, -2.3, 3.1, 9.4, 16.4, 16.8, 19.4, 17.3, 15.1, 9.1, 6.9, -3.8]);
addAvgTempYear(cv_placeMurskaSobota, 1970, 1, [-2.3, -0.3, 3.5, 8.7, 12.4, 18.4, 19, 19, 14.8, 8.5, 7.2, -1.1]);
//addAvgTempYear(cv_placeMurskaSobota, 1971, 1, [-2.3, 1.6, 1.9, 10.5, 16.1, 17.2, , , , , , ]);
//id=1082  MURSKA SOBOTA - RAKIČAN (lon=16.1784, lat=46.6330, viš=184m)
//addAvgTempYear(cv_placeMurskaSobota, 1971, 1, [, , , , , , 20, 20.4, 12.7, 6.8, 3.3, -0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1971, 1, [-2.3, 1.6, 1.9, 10.5, 16.1, 17.2, 20, 20.4, 12.7, 6.8, 3.3, -0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1972, 1, [-3.1, 2.8, 6.5, 9.9, 13.9, 17.8, 19.4, 17.7, 11.6, 7.8, 3.9, -0.4]);
addAvgTempYear(cv_placeMurskaSobota, 1973, 1, [-1.5, 1, 4.2, 7.8, 15.6, 17.7, 19.3, 18.4, 14.8, 7.3, 1.5, 0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1974, 1, [1.1, 4.9, 6.8, 9.2, 13.6, 16, 19, 20.1, 14.4, 6.1, 5.6, 2.2]);
addAvgTempYear(cv_placeMurskaSobota, 1975, 1, [2.7, 0.7, 6, 9.1, 15.6, 16.6, 19.3, 18.6, 16.8, 8.7, 3.4, -0.3]);
addAvgTempYear(cv_placeMurskaSobota, 1976, 1, [0.1, -0.5, 1, 9.4, 14.1, 17.5, 19.8, 16, 13.9, 10.1, 6.1, -0.7]);
addAvgTempYear(cv_placeMurskaSobota, 1977, 1, [0.6, 3.9, 7.5, 8, 14.2, 18.2, 18.9, 18, 12.1, 10.2, 5.1, -1.1]);
addAvgTempYear(cv_placeMurskaSobota, 1978, 1, [-0.6, 0, 6.3, 8.1, 12.8, 16.9, 17.1, 16.5, 13.5, 8.6, 0.6, -0.7]);
addAvgTempYear(cv_placeMurskaSobota, 1979, 1, [-4, 0.9, 7.3, 8.5, 14.8, 19.4, 17.7, 17.1, 14.1, 8.2, 4.7, 2.2]);
addAvgTempYear(cv_placeMurskaSobota, 1980, 1, [-4, 1.6, 4.5, 7.7, 12, 17.1, 17.9, 18.4, 14, 9, 1.7, -1.9]);
addAvgTempYear(cv_placeMurskaSobota, 1981, 1, [-3.4, 0.1, 7.4, 9.7, 14.2, 18.4, 18.9, 17.9, 16.3, 11.7, 3.7, -1]);
addAvgTempYear(cv_placeMurskaSobota, 1982, 1, [-3.9, -1.7, 4.7, 8, 14.8, 18.3, 19.9, 18.6, 16.9, 10.2, 5.4, 3.2]);
addAvgTempYear(cv_placeMurskaSobota, 1983, 1, [0.9, -2.2, 5.8, 12.1, 16.1, 17.9, 21.8, 19.1, 14.6, 9.4, 0.5, -0.5]);
addAvgTempYear(cv_placeMurskaSobota, 1984, 1, [-1.3, -0.5, 4.1, 9, 13.5, 16.8, 17.7, 17.6, 14.6, 10.6, 4.8, 0.1]);
//addAvgTempYear(cv_placeMurskaSobota, 1985, 1, [-7.1, -5.1, 3.8, 9.7, 15.5, , , , , , , ]);
//id=1894  MURSKA SOBOTA - RAKIČAN (lon=16.1913, lat=46.6521, viš=187m)
//addAvgTempYear(cv_placeMurskaSobota, 1985, 1, [, , , , , , 19.9, 19, 15, 8.7, 2.5, 3.2]);
addAvgTempYear(cv_placeMurskaSobota, 1985, 1, [-7.1, -5.1, 3.8, 9.7, 15.5, 17.1, 19.9, 19, 15, 8.7, 2.5, 3.2]); //manjkajoči jun, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeMurskaSobota, 1986, 1, [-0.2, -5.1, 2.4, 11, 17.3, 17.4, 19.1, 19.6, 14, 8.8, 4.6, -2.2]);
addAvgTempYear(cv_placeMurskaSobota, 1987, 1, [-5.7, -0.8, 0.3, 10.6, 13.2, 18.3, 21.1, 17.3, 17.4, 10.9, 4.7, 0.4]);
addAvgTempYear(cv_placeMurskaSobota, 1988, 1, [2.4, 3, 4.5, 9.4, 15.4, 17.7, 21, 19.7, 15, 9.7, 0.2, 0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1989, 1, [-1.5, 3.6, 8.2, 11.1, 14.7, 16.7, 20.3, 19, 14.9, 9.6, 2.6, 2.1]);
addAvgTempYear(cv_placeMurskaSobota, 1990, 1, [-1.1, 5.2, 8.1, 9.7, 16, 18, 19.1, 19.1, 13.5, 9.9, 4.8, -0.4]);
addAvgTempYear(cv_placeMurskaSobota, 1991, 1, [-0.1, -3.8, 7.1, 8.8, 12.1, 18.2, 21.4, 19.7, 16.1, 8.2, 5.1, -1.7]);
addAvgTempYear(cv_placeMurskaSobota, 1992, 1, [0.3, 2.6, 5.6, 10.7, 15.4, 19, 21.5, 24.2, 16, 9.2, 5.4, 0.5]);
addAvgTempYear(cv_placeMurskaSobota, 1993, 1, [0, -0.5, 4.5, 10.5, 17.5, 19.3, 20.1, 19.7, 14.9, 11.6, 1.4, 0.3]);
addAvgTempYear(cv_placeMurskaSobota, 1994, 1, [3.1, 2, 9.2, 10.2, 15.3, 19, 21.9, 21, 17.4, 8.1, 6.7, 0.7]);
addAvgTempYear(cv_placeMurskaSobota, 1995, 1, [0.2, 4.6, 5.1, 11, 15, 17.4, 21.8, 18.6, 14.1, 10.5, 3.2, -0.1]);
addAvgTempYear(cv_placeMurskaSobota, 1996, 1, [-2.1, -3.5, 2, 10.5, 16.2, 19.1, 18.4, 19, 12.4, 10.7, 7.2, -2.4]);
addAvgTempYear(cv_placeMurskaSobota, 1997, 1, [-2.5, 2.5, 5.2, 7.6, 16.3, 19.1, 19.3, 19.4, 14.8, 7.5, 5.2, 1.6]);
addAvgTempYear(cv_placeMurskaSobota, 1998, 1, [1.6, 4.2, 4.4, 11.3, 15.1, 19.5, 20.3, 20.1, 15, 11.2, 2.6, -4.1]);
addAvgTempYear(cv_placeMurskaSobota, 1999, 1, [-1.2, 0.3, 7.5, 11.4, 16, 18.5, 20.7, 19, 17.3, 10.8, 2.5, -0.2]);
addAvgTempYear(cv_placeMurskaSobota, 2000, 1, [-3.5, 3.8, 6.6, 13.7, 16.9, 20.3, 19.4, 22, 15.4, 12.3, 8.3, 2.5]);
addAvgTempYear(cv_placeMurskaSobota, 2001, 1, [1.3, 3.6, 8.5, 9.5, 17.2, 17.7, 21.1, 21.5, 13.8, 13.2, 2.8, -4.2]);
addAvgTempYear(cv_placeMurskaSobota, 2002, 1, [-0.6, 5, 7.2, 9.9, 17.6, 20.6, 21.5, 19.9, 14.4, 10.7, 8.4, 0.4]);
addAvgTempYear(cv_placeMurskaSobota, 2003, 1, [-3.3, -3.1, 5.4, 9.6, 18, 23.1, 22.1, 24, 14.7, 8.1, 7.1, 0.2]);
addAvgTempYear(cv_placeMurskaSobota, 2004, 1, [-1.6, 1.3, 4.3, 10.7, 13.6, 18, 19.9, 19.9, 14.5, 11.9, 4.6, 0.3]);
addAvgTempYear(cv_placeMurskaSobota, 2005, 1, [-0.9, -3.3, 3.1, 10.9, 15.9, 19, 20.3, 18, 15.9, 10.7, 3.6, -0.3]);
addAvgTempYear(cv_placeMurskaSobota, 2006, 1, [-5.1, -0.4, 4.2, 11.2, 14.9, 19.3, 22.3, 17.5, 16.3, 12.2, 6.8, 2.4]);
addAvgTempYear(cv_placeMurskaSobota, 2007, 1, [3.6, 5, 7.4, 12.2, 17, 21.2, 22.2, 19.9, 13.4, 8.9, 3.9, -0.5]);
addAvgTempYear(cv_placeMurskaSobota, 2008, 1, [1.8, 3.9, 6.2, 10.8, 16.7, 20.2, 20.8, 20.1, 14.7, 10.9, 6.2, 2.1]);
addAvgTempYear(cv_placeMurskaSobota, 2009, 1, [-1.8, 1.8, 6.1, 13.3, 16.8, 18.2, 21.1, 20.7, 16.7, 10.1, 6.2, 1.5]);
addAvgTempYear(cv_placeMurskaSobota, 2010, 1, [-2, 1, 5.8, 11, 15.6, 19.7, 22.2, 19.6, 13.9, 8.1, 7.6, -0.2]);
addAvgTempYear(cv_placeMurskaSobota, 2011, 1, [0.8, -0.2, 5.7, 12.4, 15.7, 19.9, 20.1, 21.2, 18, 9.3, 2.6, 2.6]);
addAvgTempYear(cv_placeMurskaSobota, 2012, 1, [1, -2.8, 8.3, 11.7, 15.9, 21.1, 21.9, 21.8, 16.8, 10.5, 7.8, 0.6]);
addAvgTempYear(cv_placeMurskaSobota, 2013, 1, [0.1, 0.6, 3.5, 12.2, 15.7, 19.3, 23, 21.4, 15.2, 12.2, 6.5, 2.1]);
addAvgTempYear(cv_placeMurskaSobota, 2014, 1, [3.4, 4.5, 9.1, 12.6, 15.1, 19.6, 21.2, 18.8, 15.5, 12.9, 8.5, 2.4]);
addAvgTempYear(cv_placeMurskaSobota, 2015, 1, [2.4, 2, 6.4, 11.3, 16, 19.9, 23, 22.1, 16.4, 10.1, 6.4, 1.8]);
addAvgTempYear(cv_placeMurskaSobota, 2016, 1, [-0.2, 5.9, 6.9, 12.2, 15.6, 19.8, 22, 19.5, 17.4, 9.6, 5.6, -0.8]);
addAvgTempYear(cv_placeMurskaSobota, 2017, 1, [-5.1, 3.7, 8.7, 10.7, 16.4, 21, 22.2, 21.6, 14.2, 10.5, 5.2, 2.2]);
addAvgTempYear(cv_placeMurskaSobota, 2018, 1, [3.4, -0.8, 3.8, 15.3, 18.1, 20.1, 21.5, 22.3, 16.4, 12.3, 7, 1]);
addAvgTempYear(cv_placeMurskaSobota, 2019, 1, [-0.1, 3.7, 7.8, 11.5, 13, 22.7, 21.6, 21.8, 16.1, 12.1, 8.4, 3.5]);
addAvgTempYear(cv_placeMurskaSobota, 2020, 1, [0, 6, 6.9, 11.7, 14.7, 19.2, 20.5, 21.6, 16, 11.1, 5, 2.3]);
addAvgTempYear(cv_placeMurskaSobota, 2021, 1, [1.8, 3.1, 5.5, 8.6, 13.5, 21.6, 22.8, 19.3, 15.7, 9.2, 5.3, 1.8]);
addAvgTempYear(cv_placeMurskaSobota, 2022, 1, [0.8, 4.2, 4.7, 9.7, 17.4, 21.7, 21.9, 21.5, 15.2, 12.4, 6.5, 2.1]);

//id=40  JAVORJE NAD POLJANAMI (lon=14.1786, lat=46.1663, viš=700m)
addAvgTempYear(cv_placeJavorje, 1955, 1, [-0.4, 0.7, 0.2, 7.1, 10.7, 14.7, 17.4, 16.5, 14, 8.7, 2.8, 2.3]);
addAvgTempYear(cv_placeJavorje, 1956, 1, [0.4, -8, 1.2, 5.9, 13, 14.4, 17.8, 17.1, 15.2, 9.2, 1.2, -0.5]);
addAvgTempYear(cv_placeJavorje, 1957, 1, [-0.6, 3.7, 5.9, 8, 9.7, 17.5, 18.1, 16.5, 13.1, 9.6, 5, 1.4]);
addAvgTempYear(cv_placeJavorje, 1958, 1, [-0.8, 3.2, 0.4, 5.5, 15.6, 15.1, 18.4, 18.2, 14.6, 9.8, 4.3, 2.8]);
addAvgTempYear(cv_placeJavorje, 1959, 1, [0.1, -0.8, 6, 8.5, 12.2, 15.7, 18.9, 16.8, 13.2, 8.5, 4.6, 2.7]);
addAvgTempYear(cv_placeJavorje, 1960, 1, [-0.7, -0.2, 3.6, 8.1, 12.2, 15.9, 15.9, 16.5, 12.4, 10.1, 6, 2]);
addAvgTempYear(cv_placeJavorje, 1961, 1, [-2.5, 3.5, 6.9, 10.9, 11.4, 16.5, 16.1, 17.5, 16.6, 10.5, 5.1, -1.1]);
addAvgTempYear(cv_placeJavorje, 1962, 1, [0.5, -0.7, 0.2, 8.3, 10.8, 13.8, 16.3, 19.1, 13.3, 10, 2.6, -2.5]);
addAvgTempYear(cv_placeJavorje, 1963, 1, [-6.3, -4.5, 2.2, 8.8, 12.4, 15.6, 18.8, 17.3, 14.7, 9.3, 8.3, -3.2]);
addAvgTempYear(cv_placeJavorje, 1964, 1, [-4.4, 0.4, 1.3, 8.8, 12.7, 17.7, 18.2, 16.5, 13.9, 8.5, 4.9, -0.1]);
addAvgTempYear(cv_placeJavorje, 1965, 1, [-0.1, -3.2, 3.4, 6.2, 11, 15.5, 16.5, 15.5, 13.3, 9.2, 2.5, 1]);
addAvgTempYear(cv_placeJavorje, 1966, 1, [-3, 5.5, 3.1, 9.9, 12.9, 16.7, 16, 15.8, 14.6, 12.3, 1.9, 1]);
addAvgTempYear(cv_placeJavorje, 1967, 1, [-1.3, 0.3, 5.5, 7.2, 13.2, 15.1, 19.5, 17.5, 14.6, 11.3, 5, -0.5]);
addAvgTempYear(cv_placeJavorje, 1968, 1, [-2, 1.7, 5, 10, 12.4, 15.6, 17.3, 15.6, 13.4, 10.5, 4.3, -3]);
addAvgTempYear(cv_placeJavorje, 1969, 1, [-1.4, -1.3, 1.8, 7.5, 14.1, 14.7, 18.2, 16.1, 14.6, 10.8, 5.9, -3.6]);
addAvgTempYear(cv_placeJavorje, 1970, 1, [-0.7, -0.5, 1.4, 6, 10.3, 16.6, 17.5, 17.4, 14.3, 8.6, 6.2, -0.6]);
addAvgTempYear(cv_placeJavorje, 1971, 1, [-0.7, 1.1, 0.3, 9, 13.2, 14, 18.5, 18.9, 12.3, 9, 4, 2.5]);
addAvgTempYear(cv_placeJavorje, 1972, 1, [-3.3, 2.2, 6.1, 7.5, 11.5, 15.9, 17.9, 16.9, 10.8, 7.6, 4.8, -0.8]);
addAvgTempYear(cv_placeJavorje, 1973, 1, [-1.2, 0.3, 3.8, 5.5, 13.1, 15.8, 17.1, 17.6, 14.8, 7.7, 3.3, -0.1]);
addAvgTempYear(cv_placeJavorje, 1974, 1, [1.3, 3.6, 5.5, 7.3, 11.1, 13.5, 17.1, 18.8, 13.7, 4.6, 4.4, 3.1]);
//addAvgTempYear(cv_placeJavorje, 1975, 1, [3.2, 0.9, 3.6, 7.8, , , , , , , , ]);
//id=41  JAVORJE NAD POLJANAMI (lon=14.1775, lat=46.1569, viš=690m)
//addAvgTempYear(cv_placeJavorje, 1975, 1, [, , , , , 14.3, 17.9, 17.1, 16.2, 9.2, 3.2, 0.6]);
addAvgTempYear(cv_placeJavorje, 1975, 1, [3.2, 0.9, 3.6, 7.8, 12.1, 14.3, 17.9, 17.1, 16.2, 9.2, 3.2, 0.6]); //manjkajoči maj, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeJavorje, 1976, 1, [0.3, -0.8, 1.3, 7.8, 13.1, 16.3, 18.4, 14.3, 12.3, 9.8, 5.4, 0]);
addAvgTempYear(cv_placeJavorje, 1977, 1, [1.1, 3.3, 7.1, 6.6, 12.1, 15.9, 16.8, 16.2, 11.9, 10.9, 5.1, -0.8]);
addAvgTempYear(cv_placeJavorje, 1978, 1, [-0.2, -0.6, 5.1, 6.5, 10.1, 14.9, 16.2, 15.6, 13.4, 9.4, 2.5, 0.3]);
addAvgTempYear(cv_placeJavorje, 1979, 1, [-2, 0.2, 4.7, 6.6, 13.3, 17.9, 16.3, 16.1, 14, 8.2, 4.4, 2.8]);
addAvgTempYear(cv_placeJavorje, 1980, 1, [-2.6, 2.3, 3.4, 5.4, 9.8, 14.5, 16.1, 17.9, 14.3, 9, 2.4, -0.7]);
addAvgTempYear(cv_placeJavorje, 1981, 1, [-1.8, -0.5, 6, 8.4, 11.9, 15.8, 17, 17.7, 15.3, 10.3, 3.9, -0.8]); //manjkajoči avg-sep, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeJavorje, 1982, 1, [-2, -1.9, 2.9, 6.1, 12.6, 16.3, 18.5, 17.5, 16.3, 9.4, 5.2, 2.2]);
addAvgTempYear(cv_placeJavorje, 1983, 1, [2.5, -2.4, 4.7, 8.6, 12.3, 15.8, 20.5, 17.6, 14.3, 9.2, 1.7, 0.2]);
addAvgTempYear(cv_placeJavorje, 1984, 1, [-1.1, -1.5, 1.8, 7, 9.6, 14, 16.2, 16.1, 12.7, 10.2, 4.1, 0]);
addAvgTempYear(cv_placeJavorje, 1985, 1, [-5.7, -2.7, 2.3, 7, 12.7, 13.8, 18.6, 18.1, 15.4, 9.3, 1.1, 3.5]);
addAvgTempYear(cv_placeJavorje, 1986, 1, [-1.1, -5, 1.4, 7.7, 15.2, 15.3, 17.4, 18, 13.4, 9.9, 5.1, -0.4]);
addAvgTempYear(cv_placeJavorje, 1987, 1, [-4.4, -0.1, -1.1, 8.5, 10.6, 14.9, 18.7, 16.3, 16.7, 9.4, 4.1, 1.4]);
addAvgTempYear(cv_placeJavorje, 1988, 1, [2.6, 1.4, 2.9, 7.8, 12.5, 14.7, 19.1, 18.2, 13.8, 9.9, 0.9, 1.1]);
addAvgTempYear(cv_placeJavorje, 1989, 1, [0.7, 3.2, 6.8, 8, 12.8, 13.9, 17.6, 17, 13.7, 10.2, 3.1, 1.6]);
addAvgTempYear(cv_placeJavorje, 1990, 1, [0.4, 5.1, 7.5, 6.6, 13.4, 14.8, 17.5, 18, 12.2, 10.2, 4.1, -1.3]);


//id=1050  CELJE - MEDLOG (lon=15.2285, lat=46.2330, viš=241m)
addAvgTempYear(cv_placeCelje, 1948, 1, [3.9, -1.7, 4.3, 10.8, 14.9, 16.1, 16.9, 18.5, 14.9, 10.5, 3.5, -1]);
addAvgTempYear(cv_placeCelje, 1949, 1, [0.9, -0.1, 2.2, 11.1, 13.6, 15.9, 18.8, 17.5, 15.5, 10.5, 6, 2.1]);
addAvgTempYear(cv_placeCelje, 1950, 1, [-3.7, 2.2, 5.9, 9.1, 16, 19.4, 21.5, 19.1, 15.1, 8.4, 5.5, 0.9]);
addAvgTempYear(cv_placeCelje, 1951, 1, [1.9, 3.4, 4.8, 9.3, 14, 17.9, 18.7, 19.2, 16.6, 8.1, 8, 1.5]);
addAvgTempYear(cv_placeCelje, 1952, 1, [-2.1, -2.5, 2.7, 12.2, 13.7, 18.7, 20.9, 19.9, 12.6, 9.9, 3.8, -0.8]);
//addAvgTempYear(cv_placeCelje, 1953, 1, [-2.7, -0.8, 4.1, 10.2, 13.5, 17.5, 19.6, , , , , ]);
//id=1060  CELJE - LEVEC - LETALIŠČE (lon=15.2452, lat=46.2330, viš=244m)
//addAvgTempYear(cv_placeCelje, 1953, 1, [, , , , , , , 16.7, 15.2, 11.8, 3.2, 0.9]);
addAvgTempYear(cv_placeCelje, 1953, 1, [-2.7, -0.8, 4.1, 10.2, 13.5, 17.5, 19.6, 16.7, 15.2, 11.8, 3.2, 0.9]);
addAvgTempYear(cv_placeCelje, 1954, 1, [-6.1, -4.9, 5.4, 7.9, 13, 18.7, 17.5, 17.2, 15.4, 9, 3.7, 2.7]);
addAvgTempYear(cv_placeCelje, 1955, 1, [0.2, 0.8, 0.8, 7.3, 12.6, 16.6, 19, 17.5, 13.6, 8.8, 3, 1.3]);
addAvgTempYear(cv_placeCelje, 1956, 1, [1.8, -9.1, 1.8, 8.2, 14.1, 16.1, 19.4, 18.2, 14.5, 8.5, 1.8, -1.3]);
addAvgTempYear(cv_placeCelje, 1957, 1, [-4.1, 4, 5.8, 8.9, 10.8, 18.9, 19.2, 16.8, 13.5, 8.7, 5.9, 1.3]);
addAvgTempYear(cv_placeCelje, 1958, 1, [-3, 3.7, 1, 7.2, 17.6, 17.3, 19.4, 18.7, 14.2, 10.6, 6.2, 2.7]);
//addAvgTempYear(cv_placeCelje, 1959, 1, [0.6, -1.6, 7.2, 10.1, 13.6, 17.1, 20.2, 17.8, 12.5, 7.1, 5, ]);
//id=1063  CELJE - ŽALEC (lon=15.2452, lat=46.2497, viš=254m)
//addAvgTempYear(cv_placeCelje, 1959, 1, [, , , , , , , , , , , 3.2]);
addAvgTempYear(cv_placeCelje, 1959, 1, [0.6, -1.6, 7.2, 10.1, 13.6, 17.1, 20.2, 17.8, 12.5, 7.1, 5, 3.2]);
addAvgTempYear(cv_placeCelje, 1960, 1, [-1, 1.6, 5.1, 9.8, 14.2, 18.7, 17.9, 18.8, 13.3, 11.9, 6.7, 3.1]);
//addAvgTempYear(cv_placeCelje, 1961, 1, [-2.3, , , , , , , , , , , ]);
//id=1064  CELJE - LOKROVEC (lon=15.2452, lat=46.2664, viš=255m)
//addAvgTempYear(cv_placeCelje, 1961, 1, [, , 6.5, 12.3, 12.7, 18.2, 17.5, 17.3, 15.4, 11.2, 5.1, -1.9]);
addAvgTempYear(cv_placeCelje, 1961, 1, [-2.3, 1, 6.5, 12.3, 12.7, 18.2, 17.5, 17.3, 15.4, 11.2, 5.1, -1.9]); //manjkajoči feb, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
//addAvgTempYear(cv_placeCelje, 1962, 1, [0.1, 0.5, 1.8, 8.6, 12.3, 14.9, 17.1, 18.9, 13, 8.8, , ]);
//id=1075  CELJE - MEDLOG (lon=15.2285, lat=46.2497, viš=245m)
//addAvgTempYear(cv_placeCelje, 1962, 1, [, , , , , , , , , , 3.9, -4.3]);
addAvgTempYear(cv_placeCelje, 1962, 1, [0.1, 0.5, 1.8, 8.6, 12.3, 14.9, 17.1, 18.9, 13, 8.8, 3.9, -4.3]);
addAvgTempYear(cv_placeCelje, 1963, 1, [-7.2, -4.2, 2.9, 10.4, 13.8, 18.3, 19.7, 18.9, 15.5, 9.3, 10.1, -4.1]);
addAvgTempYear(cv_placeCelje, 1964, 1, [-7.5, -0.4, 3.4, 10, 14, 19.5, 19.2, 17.3, 14.8, 9.3, 6, 0.3]);
//addAvgTempYear(cv_placeCelje, 1965, 1, [0, -2.7, 5.1, 7.9, 13, 17.7, 18.7, 16.4, 14.8, 8, , ]);
//id=1081  CELJE - LEVEC - LETALIŠČE (lon=15.2452, lat=46.2330, viš=244m)
//addAvgTempYear(cv_placeCelje, 1965, 1, [, , , , , , , , , , , 1.5]);
addAvgTempYear(cv_placeCelje, 1965, 1, [0, -2.7, 5.1, 7.9, 13, 17.7, 18.7, 16.4, 14.8, 8, 4, 1.5]);  //manjkajoči nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeCelje, 1966, 1, [-4.4, 6.6, 3.7, 11.2, 13.5, 17.9, 17.5, 16.7, 14.6, 13.2, 2.1, 0.3]);
addAvgTempYear(cv_placeCelje, 1967, 1, [-2.1, 1.1, 6.1, 8.2, 14.7, 17.1, 21, 19, 15.7, 10.6, 4.7, -1.6]);
addAvgTempYear(cv_placeCelje, 1968, 1, [-4.8, 2.5, 4.7, 10.9, 14.3, 17.7, 18.7, 17.2, 14.1, 10.3, 5, -3.4]);
addAvgTempYear(cv_placeCelje, 1969, 1, [-2.7, -2.2, 3.3, 8.7, 15.9, 16.7, 18.3, 16.9, 14.7, 8.4, 7.4, -4.1]);
addAvgTempYear(cv_placeCelje, 1970, 1, [-1.1, 0.1, 2.7, 8, 12, 18.6, 18.5, 18.7, 14.7, 8.4, 6.6, -1.4]);
addAvgTempYear(cv_placeCelje, 1971, 1, [-2.2, 1, 1.7, 10.1, 15.4, 16.7, 19, 19.4, 11.4, 7.3, 3.6, -0.8]);
addAvgTempYear(cv_placeCelje, 1972, 1, [-3.2, 3, 6, 9.5, 13.4, 17.7, 19, 17.7, 11.5, 7.9, 4.2, 0]);
addAvgTempYear(cv_placeCelje, 1973, 1, [-1.4, 0.6, 3.5, 7.3, 15.1, 17.9, 18.8, 18.2, 14.7, 7, 1.9, -0.7]);
addAvgTempYear(cv_placeCelje, 1974, 1, [1.4, 5.3, 6.1, 8.1, 13.5, 15.8, 18.8, 19.7, 14.6, 6.1, 5.3, 2.2]);
addAvgTempYear(cv_placeCelje, 1975, 1, [3.6, 0.3, 5.3, 8.9, 15.4, 16, 19.7, 17.7, 16.7, 8.6, 2.9, -0.8]);
//addAvgTempYear(cv_placeCelje, 1976, 1, [-0.6, -0.5, 0.6, 9, 14.3, 17.9, 20.5, 15.4, 13.7, , , ]);
//id=1901  CELJE (lon=15.2477, lat=46.2444, viš=244m)
//addAvgTempYear(cv_placeCelje, 1976, 1, [, , , , , , , , , , 6.2, -0.2]);
addAvgTempYear(cv_placeCelje, 1976, 1, [-0.6, -0.5, 0.6, 9, 14.3, 17.9, 20.5, 15.4, 13.7, 10.1, 6.2, -0.2]); //manjkajoči okt, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeCelje, 1977, 1, [2, 4.9, 8.1, 8.7, 14.8, 19.6, 19.6, 18.8, 12.9, 11.6, 5.7, -0.1]);
addAvgTempYear(cv_placeCelje, 1978, 1, [-0.1, 0.9, 6.7, 7.9, 12.2, 17.2, 17.9, 16.9, 14, 8.9, 0.7, -0.4]);
addAvgTempYear(cv_placeCelje, 1979, 1, [-2.8, 1.7, 6.9, 8.2, 14.7, 19.4, 18.3, 16.9, 14.6, 8.8, 4.8, 2.7]);
addAvgTempYear(cv_placeCelje, 1980, 1, [-2.9, 2, 4.3, 7.6, 11.9, 16.7, 18.1, 18.8, 15, 9.3, 2.5, -2.3]);
addAvgTempYear(cv_placeCelje, 1981, 1, [-4.3, -0.6, 7.1, 9.6, 13.9, 18.2, 18.6, 18, 15.7, 11.8, 3.7, -0.6]);
addAvgTempYear(cv_placeCelje, 1982, 1, [-2.5, -1.6, 4.1, 7.5, 14.3, 18.5, 20.3, 18.8, 17, 10.6, 6, 3.5]);
addAvgTempYear(cv_placeCelje, 1983, 1, [1.6, -2, 5.1, 11.7, 15, 17.9, 21.7, 18.9, 15.1, 9.4, 0.9, 0.2]);
addAvgTempYear(cv_placeCelje, 1984, 1, [-1.3, -0.1, 3.7, 8.7, 13, 17.2, 18.2, 17.7, 14.5, 11.2, 5, 0.5]);
addAvgTempYear(cv_placeCelje, 1985, 1, [-6.9, -4.4, 4, 9.4, 15, 16.5, 20.2, 19.1, 15.4, 8.9, 2.2, 4]);
addAvgTempYear(cv_placeCelje, 1986, 1, [0.2, -4.1, 2.3, 9.9, 17.2, 16.8, 19, 19.6, 14, 9.5, 5, -2.2]);
addAvgTempYear(cv_placeCelje, 1987, 1, [-4.1, -0.7, 0.1, 10.7, 13.2, 17.9, 20.8, 17.9, 17.7, 11, 4.4, 1.5]);
addAvgTempYear(cv_placeCelje, 1988, 1, [3.1, 3.1, 4.8, 9.6, 15, 17.1, 21.1, 19.4, 14.8, 10.7, 0.9, -0.4]);
addAvgTempYear(cv_placeCelje, 1989, 1, [-1, 3.7, 8, 10.6, 14, 16.5, 20, 18.9, 14.8, 9.2, 2.8, 2]);
addAvgTempYear(cv_placeCelje, 1990, 1, [-1.2, 5.1, 7.1, 9.1, 15.6, 17.9, 19.1, 18.8, 13.3, 10.7, 4.5, -0.5]);
addAvgTempYear(cv_placeCelje, 1991, 1, [0.2, -3.5, 7.4, 8.5, 11.6, 18.1, 21, 19.6, 16.4, 8.5, 5, -2.3]);
addAvgTempYear(cv_placeCelje, 1992, 1, [0.6, 2.6, 5.4, 10.4, 15.3, 18.3, 20.5, 23.1, 15.5, 9.2, 6.3, 0.4]);
addAvgTempYear(cv_placeCelje, 1993, 1, [1, -0.4, 4.4, 10.2, 16.6, 18.9, 19.7, 20, 14.8, 11.1, 1.8, 1.6]);
addAvgTempYear(cv_placeCelje, 1994, 1, [3.4, 2.1, 9.6, 9.7, 15.1, 19, 21.4, 21.1, 16.9, 8.3, 7.3, 1.4]);
addAvgTempYear(cv_placeCelje, 1995, 1, [0.2, 4.2, 4.4, 10.5, 14.8, 16.9, 21.7, 18.4, 14, 11.3, 3.9, 0.6]);
addAvgTempYear(cv_placeCelje, 1996, 1, [-1, -1.8, 2.4, 9.8, 16.1, 19.2, 18.4, 18.8, 12.5, 10.6, 7.2, -1.6]);
addAvgTempYear(cv_placeCelje, 1997, 1, [-1.3, 3, 5.6, 7.5, 15.8, 18.9, 19.3, 19.1, 15.2, 8.5, 4.8, 2.1]);
addAvgTempYear(cv_placeCelje, 1998, 1, [2.7, 3.6, 4.6, 10.9, 14.8, 19.6, 20.6, 20.2, 15, 10.7, 2.6, -3.8]);
addAvgTempYear(cv_placeCelje, 1999, 1, [0.8, -0.2, 7.4, 11, 15.9, 18.8, 20.2, 19.4, 16.8, 11.2, 2.3, 0]);
addAvgTempYear(cv_placeCelje, 2000, 1, [-3.3, 3.3, 6.9, 13.1, 16.5, 20.3, 19.2, 21, 15.4, 12.3, 8.3, 4.4]);
addAvgTempYear(cv_placeCelje, 2001, 1, [2.9, 3.8, 8.9, 9.2, 16.6, 17.7, 21, 21, 13.1, 13.3, 2.7, -3.1]);
addAvgTempYear(cv_placeCelje, 2002, 1, [-0.1, 4.7, 7.4, 9.5, 16.9, 20.5, 20.9, 19.4, 13.9, 11, 8.6, 2.1]);
addAvgTempYear(cv_placeCelje, 2003, 1, [-2, -2.7, 6.1, 9.2, 17.4, 23, 22, 23.8, 14.3, 8.3, 7.6, 1]);
addAvgTempYear(cv_placeCelje, 2004, 1, [-1, 1.6, 4.2, 10, 13.3, 18.2, 19.9, 19.9, 14.7, 12.3, 5.4, 1.2]);
addAvgTempYear(cv_placeCelje, 2005, 1, [-0.7, -2.2, 3.9, 10.4, 15.7, 19, 20.3, 17.9, 15.6, 10.9, 4.6, -0.2]);
addAvgTempYear(cv_placeCelje, 2006, 1, [-3, -0.6, 3.9, 10.9, 14.7, 19.6, 22.4, 17.1, 16.3, 12.2, 7.5, 3.6]);
addAvgTempYear(cv_placeCelje, 2007, 1, [4.1, 5.4, 7.2, 12.7, 16.8, 20.8, 21.5, 19.4, 13.5, 9.2, 4.1, -0.5]);
//addAvgTempYear(cv_placeCelje, 2008, 1, [2.5, 3.3, , , , , , , , , , ]);
//id=2482  CELJE - MEDLOG (lon=15.2259, lat=46.2366, viš=242m)
//addAvgTempYear(cv_placeCelje, 2008, 1, [, , , 10, 15.9, 19.4, 20.1, 19.4, 13.9, 10.8, 5.6, 1.9]);
addAvgTempYear(cv_placeCelje, 2008, 1, [2.5, 3.3, 6.5, 10, 15.9, 19.4, 20.1, 19.4, 13.9, 10.8, 5.6, 1.9]); //manjkajoči mar, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeCelje, 2009, 1, [-1.9, 1.5, 5.8, 12.3, 16.8, 17.9, 20.2, 20.2, 16.2, 10.1, 7.1, 1.6]);
addAvgTempYear(cv_placeCelje, 2010, 1, [-2, 0.5, 5.4, 10.6, 15.4, 19.5, 22.1, 19.3, 13.6, 8.3, 7.3, -0.8]);
addAvgTempYear(cv_placeCelje, 2011, 1, [1, 0.2, 5.6, 11.8, 15.1, 19, 19.6, 20.8, 17.6, 8.9, 3.4, 2.9]);
addAvgTempYear(cv_placeCelje, 2012, 1, [0.7, -3.1, 7.8, 10.8, 15.2, 20.3, 21.4, 20.8, 16, 10.6, 8.1, 0.2]);
addAvgTempYear(cv_placeCelje, 2013, 1, [0.8, -0.1, 2.7, 11.6, 14.5, 18.7, 21.7, 20.6, 14.8, 12.5, 6.7, 2.6]);
addAvgTempYear(cv_placeCelje, 2014, 1, [4.2, 3.9, 8.3, 12.2, 15, 18.9, 20.1, 18.7, 15.3, 12.9, 8.7, 2.8]);
addAvgTempYear(cv_placeCelje, 2015, 1, [2.1, 1.3, 6.2, 10.8, 15.9, 19.1, 22.5, 20.7, 15.5, 10.1, 5.6, 1.8]);
addAvgTempYear(cv_placeCelje, 2016, 1, [-0.1, 5.3, 6.5, 11.4, 14.6, 18.7, 21.5, 18.8, 16.5, 9.4, 6, -0.9]);
addAvgTempYear(cv_placeCelje, 2017, 1, [-5.1, 4, 8.4, 10.5, 15.8, 20.2, 21.7, 20.9, 13.4, 10.4, 5.6, 2]);
addAvgTempYear(cv_placeCelje, 2018, 1, [4.2, -1.3, 3.6, 13.7, 17.1, 19.5, 20.3, 20.9, 16, 11.7, 7.3, 1.3]);
addAvgTempYear(cv_placeCelje, 2019, 1, [-0.6, 3.3, 7.3, 10.3, 12.5, 21.7, 21.2, 21.1, 15.5, 12.3, 8.3, 3]);
addAvgTempYear(cv_placeCelje, 2020, 1, [0.7, 5.7, 6.2, 10.7, 14.3, 18.3, 20.1, 20.8, 15.7, 11.2, 4.4, 2]);
addAvgTempYear(cv_placeCelje, 2021, 1, [0.7, 4.3, 5.1, 8.4, 12.9, 21.1, 21.8, 19.1, 15.2, 8.8, 5, 1.1]);
addAvgTempYear(cv_placeCelje, 2022, 1, [0.4, 3.7, 4.1, 9.4, 16.9, 21.5, 22.1, 21.5, 14.8, 13.3, 7, 3.2]);


//id=389 BABNO POLJE (lon=14.5359, lat=45.6467, viš=753m)
addAvgTempYear(cv_placeBabnoPolje, 1949, 11, [2.8, 0]);
addAvgTempYear(cv_placeBabnoPolje, 1950, 1, [-4.9, 0.9, 2.1, 5.7, 11.9, 16.1, 18.6, 16.1, 11.9, 5.5, 2.8, -1.3]);
addAvgTempYear(cv_placeBabnoPolje, 1951, 1, [0.4, 1.5, 1.1, 5.5, 10.6, 14.3, 15.5, 16.1, 13.1, 6, 5.1, -0.2]);
addAvgTempYear(cv_placeBabnoPolje, 1952, 1, [-5, -5.5, 0, 8.1, 10.7, 15.7, 17.9, 16.6, 10.7, 7.5, 2, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1953, 1, [-5, -4.1, -0.2, 7.3, 10.6, 14.3, 16.6, 14.4, 12.8, 10.1, 1.1, -0.9]);
addAvgTempYear(cv_placeBabnoPolje, 1954, 1, [-7.2, -5.9, 2.8, 4.6, 9.7, 15.5, 14.6, 14.3, 12.7, 6.8, 2.8, 0.6]);
addAvgTempYear(cv_placeBabnoPolje, 1955, 1, [-0.7, -0.7, -2, 3.8, 9.2, 13.6, 15.6, 13.5, 10.4, 6.9, 1.3, 1]);
addAvgTempYear(cv_placeBabnoPolje, 1956, 1, [-0.6, -11.7, -1.1, 4.8, 11.1, 12.7, 16.2, 15.8, 11.6, 5.1, -0.7, -2.5]);
addAvgTempYear(cv_placeBabnoPolje, 1957, 1, [-4.9, 1.8, 2.3, 5.1, 6.9, 15.9, 15.8, 14.6, 10.7, 6.9, 3.3, 0.1]);
addAvgTempYear(cv_placeBabnoPolje, 1958, 1, [-4.9, 1.6, -3, 3.3, 13.4, 13.5, 16.2, 15.4, 11, 7.3, 3.5, 1.4]);
addAvgTempYear(cv_placeBabnoPolje, 1959, 1, [-3, -4.9, 4, 6.8, 10, 13.6, 16.9, 14.2, 9.2, 4.3, 3, 1.3]);
addAvgTempYear(cv_placeBabnoPolje, 1960, 1, [-2.9, -1.1, 1.9, 5.4, 10.6, 14, 14.1, 14.4, 10.2, 8.8, 5, 1.3]);
addAvgTempYear(cv_placeBabnoPolje, 1961, 1, [-4.4, -0.5, 2.1, 8.8, 9.4, 14.4, 14.3, 13.9, 12.1, 8.1, 3.1, -2.3]);
addAvgTempYear(cv_placeBabnoPolje, 1962, 1, [-2.3, -3.8, -2.1, 4.8, 9.2, 11.6, 14.4, 15.8, 10.9, 6.7, 1.2, -5.5]);
addAvgTempYear(cv_placeBabnoPolje, 1963, 1, [-7.9, -6.7, -0.4, 6.2, 9.5, 14.3, 16.1, 15.2, 12.3, 6, 7.8, -5.2]);
addAvgTempYear(cv_placeBabnoPolje, 1964, 1, [-7.3, -2.6, 0, 5.5, 10.5, 15.5, 15.5, 14, 10.8, 7.2, 2.9, -2.8]);
//addAvgTempYear(cv_placeBabnoPolje, 1965, 1, [-2.4, -6.4, 1.5, 3.6, 9.1, 13.8, 15, 12.7, 11.2, , , ]);
//id=1141  BABNO POLJE (lon=14.5449, lat=45.6452, viš=755m)
//addAvgTempYear(cv_placeBabnoPolje, 1965, 1, [, , , , , , , , , , 2.1, 0.4]);
addAvgTempYear(cv_placeBabnoPolje, 1965, 1, [-2.4, -6.4, 1.5, 3.6, 9.1, 13.8, 15, 12.7, 11.2, 8.6, 2.1, 0.4]); //manjkajoči okt, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBabnoPolje, 1966, 1, [-5.3, 4, -0.1, 7.2, 10.1, 14.7, 14.3, 14, 11.5, 10.1, -0.2, -1.1]);
addAvgTempYear(cv_placeBabnoPolje, 1967, 1, [-5.7, -1.7, 3, 4.4, 11.3, 12.7, 16.5, 14.6, 12, 7.7, 3.5, -3.1]);
addAvgTempYear(cv_placeBabnoPolje, 1968, 1, [-6.8, 0.9, 1.9, 7.8, 10.8, 13.5, 15.4, 13.7, 11.2, 7.8, 2.7, -5]);
addAvgTempYear(cv_placeBabnoPolje, 1969, 1, [-2.9, -3.1, -0.1, 4.4, 12.3, 12.8, 15.4, 14.1, 11.9, 5.5, 5.1, -5.7]);
addAvgTempYear(cv_placeBabnoPolje, 1970, 1, [-1.3, -2.3, -1, 3.9, 8.1, 14.7, 15, 15.3, 11.8, 5.9, 4.4, -3.2]);
addAvgTempYear(cv_placeBabnoPolje, 1971, 1, [-1.6, -1.5, -1.6, 6.5, 11.2, 13.2, 15.9, 16.3, 8.4, 4.3, 1.6, -3.3]);
addAvgTempYear(cv_placeBabnoPolje, 1972, 1, [-4.1, 0.1, 3.2, 5.7, 9.7, 14.1, 15.8, 14.2, 8.1, 5.7, 1.9, -2.3]);
addAvgTempYear(cv_placeBabnoPolje, 1973, 1, [-2.6, -3.1, -0.3, 3.4, 11.2, 14.1, 15.4, 14.7, 12.1, 6.2, 1, -1.7]);
addAvgTempYear(cv_placeBabnoPolje, 1974, 1, [-0.7, 2, 2.8, 4.8, 9.6, 12.1, 15.3, 16.1, 11.4, 2.5, 2.6, -0.7]);
addAvgTempYear(cv_placeBabnoPolje, 1975, 1, [0.9, -2.3, 1.9, 5.8, 11.2, 13, 15.7, 14.6, 13.3, 5.3, 1.2, -1.8]);
addAvgTempYear(cv_placeBabnoPolje, 1976, 1, [-2.9, -3.1, -2.8, 4.1, 10.5, 13.7, 15.6, 11.7, 10.1, 7.7, 3.5, -2.1]);
addAvgTempYear(cv_placeBabnoPolje, 1977, 1, [0.6, 1.4, 3.9, 4.3, 10.1, 13.7, 15, 14, 8.3, 8, 2.7, -3.1]);
addAvgTempYear(cv_placeBabnoPolje, 1978, 1, [-2.3, -2.4, 1.8, 4, 8.8, 12.7, 14.2, 13.2, 9.9, 6.4, -1.5, -1.3]);
addAvgTempYear(cv_placeBabnoPolje, 1979, 1, [-4.9, -1, 3, 4.3, 11, 15.1, 14.8, 13.6, 10.9, 6.5, 2.1, 0.2]);
addAvgTempYear(cv_placeBabnoPolje, 1980, 1, [-5.3, -0.7, 1.4, 3.3, 8.2, 13, 14.5, 15.4, 11.4, 7.3, 0.4, -5.8]);
addAvgTempYear(cv_placeBabnoPolje, 1981, 1, [-6.9, -4.9, 3, 5.6, 9.9, 14.1, 14.9, 14.2, 12.2, 9.5, -0.6, -2.1]);
addAvgTempYear(cv_placeBabnoPolje, 1982, 1, [-3.3, -4.1, 0.3, 2.9, 10.8, 14.9, 16.9, 14.9, 13.6, 8.1, 3.8, 0.3]);
addAvgTempYear(cv_placeBabnoPolje, 1983, 1, [-2.2, -5.4, 1.9, 7.5, 11.3, 13.8, 17.8, 15, 11.3, 6.5, -0.1, -1.7]);
addAvgTempYear(cv_placeBabnoPolje, 1984, 1, [-3.2, -2.8, -0.1, 4.1, 9, 13, 14.8, 13.7, 10.9, 8.7, 3.1, -1.1]);
addAvgTempYear(cv_placeBabnoPolje, 1985, 1, [-7.9, -5, 1, 5.3, 11.4, 13.1, 17.2, 15.7, 11.8, 5.8, -0.1, 0.6]);
addAvgTempYear(cv_placeBabnoPolje, 1986, 1, [-3.7, -6, -0.1, 6, 13.4, 13.4, 15.3, 15.9, 10.2, 6.4, 2.8, -4]);
addAvgTempYear(cv_placeBabnoPolje, 1987, 1, [-5.8, -2.5, -3.5, 6.5, 9.5, 14.2, 17.1, 14.6, 14.1, 8.7, 2.6, -1.5]);
addAvgTempYear(cv_placeBabnoPolje, 1988, 1, [1.9, -0.7, 0.3, 5.8, 11.4, 13.2, 17.3, 15.9, 10.9, 8.2, -0.9, -1.5]);
addAvgTempYear(cv_placeBabnoPolje, 1989, 1, [-2.3, 0.5, 4, 7.3, 10.5, 12.8, 16.2, 15.2, 11.1, 5.5, 0.5, 0.2]);
addAvgTempYear(cv_placeBabnoPolje, 1990, 1, [-2.6, 1.8, 3.5, 4.9, 11.2, 14.1, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
//addAvgTempYear(cv_placeBabnoPolje, 1991, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, , , , , ,]);
// podatke jul'91-dec'91 skopiram iz leta 1990
//podatke za leta 1991-2002 skopiram iz leta 1991, ker postaja v teh letih na tej lokaciji ni delala, nočem pa zato imeti dveh ločenih postaj!!!
// podatke jan'2003-okt'2003 skopiram iz izmišljenih podatkov leta 2002 !!!
addAvgTempYear(cv_placeBabnoPolje, 1991, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1992, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1993, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1994, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1995, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1996, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1997, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1998, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 1999, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 2000, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 2001, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
addAvgTempYear(cv_placeBabnoPolje, 2002, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 2.4, -1.9]);
//id=2214  BABNO POLJE (lon=14.5449, lat=45.6452, viš=755m)
//addAvgTempYear(cv_placeBabnoPolje, 2003, 1, [, , , , , , , , , , 4.2, -1.1]);
addAvgTempYear(cv_placeBabnoPolje, 2003, 1, [-2.2, -5, 4.3, 4.3, 7.5, 14.2, 15.5, 14.5, 10.3, 8.8, 4.2, -1.1]); //jan-okt vzamem podatke oz izmišljenega leta 2002
addAvgTempYear(cv_placeBabnoPolje, 2004, 1, [-5.1, -2.4, -0.4, 5.6, 9.2, 14.1, 16.4, 16, 11.3, 9.9, 2.5, -1.5]);
addAvgTempYear(cv_placeBabnoPolje, 2005, 1, [-4.3, -5.6, -1, 5.8, 11.6, 14.9, 16, 14, 11.8, 8.1, 1.8, -3.1]);
addAvgTempYear(cv_placeBabnoPolje, 2006, 1, [-4.9, -3.8, -0.3, 6.4, 10.9, 15.1, 18.7, 13.6, 12.4, 9, 4.4, 1.1]);
addAvgTempYear(cv_placeBabnoPolje, 2007, 1, [0.5, 1.9, 3.7, 8.2, 12.5, 16.6, 16.8, 15.6, 9.4, 5.6, 1.2, -3.6]);
addAvgTempYear(cv_placeBabnoPolje, 2008, 1, [0.2, -0.1, 1.7, 5.9, 11.9, 15.7, 16.7, 16, 10.5, 7.7, 3.3, -1.3]);
addAvgTempYear(cv_placeBabnoPolje, 2009, 1, [-4, -1.7, 1.5, 7.8, 13, 14.7, 16.9, 16.8, 12.4, 7, 4.8, -0.6]);
addAvgTempYear(cv_placeBabnoPolje, 2010, 1, [-5.2, -2.2, 0.3, 6.3, 10.8, 15.5, 17.7, 15.5, 10.4, 6.1, 4.7, -4.4]);
addAvgTempYear(cv_placeBabnoPolje, 2011, 1, [-2.3, -2.5, 1.6, 7.5, 11.5, 15.7, 16.5, 17.6, 14.1, 5.9, 0.6, -0.3]);
addAvgTempYear(cv_placeBabnoPolje, 2012, 1, [-3.3, -6.3, 4, 7.2, 10.8, 17.1, 18.7, 18.1, 12.5, 7.6, 6.1, -3.1]);
addAvgTempYear(cv_placeBabnoPolje, 2013, 1, [-1.4, -2.7, -0.4, 7.2, 10.7, 14.8, 18.1, 16.8, 11.8, 9.3, 3.9, -0.1]);
addAvgTempYear(cv_placeBabnoPolje, 2014, 1, [2.5, 1.8, 4.6, 8.4, 10.9, 15.3, 16.6, 15.8, 11.8, 9.6, 6.3, -0.1]);
addAvgTempYear(cv_placeBabnoPolje, 2015, 1, [0.2, -1.8, 2.8, 6.1, 12.8, 15.8, 19.4, 17.1, 12.3, 7.7, 1.8, -0.8]);
addAvgTempYear(cv_placeBabnoPolje, 2016, 1, [-1.8, 1.8, 2.8, 7.7, 10.8, 15.5, 18.3, 15.9, 12.6, 6.7, 3.9, -3.1]);
addAvgTempYear(cv_placeBabnoPolje, 2017, 1, [-6.7, 1, 4.2, 6.7, 11.7, 17.4, 18.4, 17.9, 10.2, 6.3, 2.7, -2.2]);
addAvgTempYear(cv_placeBabnoPolje, 2018, 1, [1.5, -4.6, 0.4, 9.8, 13.1, 15.9, 17.4, 17.2, 12.3, 9.1, 4.5, -1.3]);
addAvgTempYear(cv_placeBabnoPolje, 2019, 1, [-2.9, 0.3, 3.2, 6.5, 8.3, 18.6, 17.8, 17.9, 11.9, 8.6, 5.7, 0.8]);
addAvgTempYear(cv_placeBabnoPolje, 2020, 1, [-0.8, 2.6, 2.3, 6.8, 10.6, 14.8, 16.2, 16.8, 11.7, 7.4, 2.2, 0.7]);
addAvgTempYear(cv_placeBabnoPolje, 2021, 1, [-2.5, 2.3, 1.2, 3.6, 9.9, 17.5, 18.5, 16, 11.8, 5.9, 3.2, -0.6]);
addAvgTempYear(cv_placeBabnoPolje, 2022, 1, [-2.5, 0.8, 0.5, 5.7, 13.2, 18.4, 18.6, 17.3, 11.6, 9.7, 4.3, 2.5]);

//id=1896  PORTOROŽ - LETALIŠČE (lon=13.6160, lat=45.4753, viš=2m)
addAvgTempYear(cv_placePortorozLetalisce, 1988, 6, [19.4, 23.9, 22.5, 17.3, 14.8, 5.7, 4.5]);
addAvgTempYear(cv_placePortorozLetalisce, 1989, 1, [3.1, 6, 9.3, 12.6, 16.6, 19.1, 22.2, 21.1, 17.1, 12, 7.3, 5.6]);
addAvgTempYear(cv_placePortorozLetalisce, 1990, 1, [3.5, 7.1, 9.1, 11.4, 17.4, 20.4, 22.2, 21.4, 16.8, 14.7, 9.5, 4.7]);
//addAvgTempYear(cv_placePortorozLetalisce, 1991, 1, [4, 2.2, 9.9, , , , , 22.5, 19.8, 12.5, 8.3, 1.7]); //manjkajoči apr-jul, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placePortorozLetalisce, 1991, 1, [4, 2.2, 9.9, 12, 18, 20.2, 22.2, 22.5, 19.8, 12.5, 8.3, 1.7]);   //manjkajoči apr-jul, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placePortorozLetalisce, 1992, 1, [4.1, 3.6, 7.1, 12.6, 18.5, 20.1, 22.2, 23.7, 17.5, 13.8, 10.2, 6.1]);
addAvgTempYear(cv_placePortorozLetalisce, 1993, 1, [3.7, 3.3, 5.9, 11.4, 18.2, 20.8, 21.4, 23, 17.9, 14.7, 7.8, 6.7]);
addAvgTempYear(cv_placePortorozLetalisce, 1994, 1, [6.5, 4.9, 10, 11.8, 16.4, 20.7, 25, 24.2, 19.4, 12.8, 10.9, 6.4]);
addAvgTempYear(cv_placePortorozLetalisce, 1995, 1, [4.6, 6.7, 7.2, 11.2, 16.1, 18.6, 23.8, 20.7, 16.7, 13.9, 8.6, 6]);
addAvgTempYear(cv_placePortorozLetalisce, 1996, 1, [5.7, 3.6, 5.6, 11.9, 16.9, 20.8, 20.9, 21.3, 15.2, 13.5, 11.1, 5.4]);
addAvgTempYear(cv_placePortorozLetalisce, 1997, 1, [6.3, 6.2, 8.9, 9.6, 17.2, 21, 21.6, 21.7, 18.5, 13.4, 9.7, 6.8]);
addAvgTempYear(cv_placePortorozLetalisce, 1998, 1, [6, 6.3, 7.3, 12.5, 16.7, 21.2, 23.1, 23.9, 17.7, 13.7, 7.5, 4.1]);
addAvgTempYear(cv_placePortorozLetalisce, 1999, 1, [4.6, 4, 9.3, 12.7, 17.9, 20.8, 23.2, 23.4, 20.2, 14.5, 8.2, 5.2]);
addAvgTempYear(cv_placePortorozLetalisce, 2000, 1, [2.3, 5.1, 8.2, 13.6, 18.2, 22, 21.7, 23.1, 18.5, 15.6, 11.9, 8.4]);
addAvgTempYear(cv_placePortorozLetalisce, 2001, 1, [7.4, 6.9, 11.3, 11.6, 18.8, 20, 23.3, 24.4, 16.6, 15.9, 8.3, 3.3]);
addAvgTempYear(cv_placePortorozLetalisce, 2002, 1, [2.9, 6.8, 9.8, 12.4, 17.4, 22, 23.1, 21.7, 17.3, 14.8, 12.9, 7.4]);
addAvgTempYear(cv_placePortorozLetalisce, 2003, 1, [4.1, 2.4, 7.5, 11.4, 18.5, 24.5, 24.5, 26.1, 17.2, 12.3, 10.5, 6.7]);
addAvgTempYear(cv_placePortorozLetalisce, 2004, 1, [3.4, 4.4, 7.1, 12.4, 15, 20.7, 22.5, 22.3, 18.7, 15.9, 9.5, 6.8]);
addAvgTempYear(cv_placePortorozLetalisce, 2005, 1, [3.5, 3, 7, 11.3, 16.9, 21.2, 22.7, 20.2, 18.4, 13.4, 8.8, 4.6]);
addAvgTempYear(cv_placePortorozLetalisce, 2006, 1, [3.1, 4.2, 7, 12.9, 16.8, 21.7, 25.4, 20.1, 19.3, 15.7, 10.9, 7.7]);
addAvgTempYear(cv_placePortorozLetalisce, 2007, 1, [7.7, 7.8, 10.6, 14.7, 18.8, 22.7, 24.1, 22.2, 16.7, 12.9, 8.4, 5.1]);
addAvgTempYear(cv_placePortorozLetalisce, 2008, 1, [6.7, 5.6, 8.7, 12.6, 17.9, 21.6, 23.5, 23, 17.7, 14.8, 9.8, 6.3]);
addAvgTempYear(cv_placePortorozLetalisce, 2009, 1, [4.5, 5.2, 8.6, 14.1, 18.7, 21, 23.3, 24, 20, 13.2, 10.8, 5.7]);
addAvgTempYear(cv_placePortorozLetalisce, 2010, 1, [3.5, 5.6, 7.7, 12.7, 16.8, 20.7, 23.9, 21.6, 17.5, 12.8, 10.6, 4.4]);
addAvgTempYear(cv_placePortorozLetalisce, 2011, 1, [4.5, 5.5, 8.5, 13.7, 17.9, 21.6, 22.5, 23.6, 21, 12.6, 8.6, 7.3]);
addAvgTempYear(cv_placePortorozLetalisce, 2012, 1, [3.5, 1.5, 9.9, 12.8, 16.6, 22.7, 25.5, 24.7, 19.8, 14.9, 11.7, 5]);
addAvgTempYear(cv_placePortorozLetalisce, 2013, 1, [5.6, 4.8, 7.4, 13.2, 16.5, 20.5, 24.3, 23.2, 18.9, 15.3, 11.1, 6.9]);
addAvgTempYear(cv_placePortorozLetalisce, 2014, 1, [9.4, 9.8, 10.8, 13.9, 16.2, 21.6, 21.7, 21.5, 17.9, 15.4, 13, 7.8]);
addAvgTempYear(cv_placePortorozLetalisce, 2015, 1, [6.3, 5.7, 9.2, 12.1, 18, 21.9, 25.9, 23.7, 19.4, 14, 9.1, 6.7]);
addAvgTempYear(cv_placePortorozLetalisce, 2016, 1, [5, 8.6, 9.7, 13.4, 16.6, 21.4, 24.5, 23, 19.9, 13.4, 10.2, 4.9]);
addAvgTempYear(cv_placePortorozLetalisce, 2017, 1, [1.9, 7, 10.2, 12.7, 17.6, 23.3, 24.2, 24.3, 17.3, 13.7, 9.8, 5.6]);
addAvgTempYear(cv_placePortorozLetalisce, 2018, 1, [7.4, 3.7, 8.1, 15.2, 19.3, 22.5, 24.1, 24.7, 19.5, 15.9, 11.5, 5.4]);
addAvgTempYear(cv_placePortorozLetalisce, 2019, 1, [4.1, 6.7, 10.3, 12.9, 14.6, 24.2, 24.2, 24.4, 18.8, 15.3, 12.5, 8.1]);
addAvgTempYear(cv_placePortorozLetalisce, 2020, 1, [5.5, 7.8, 9, 13.3, 18.1, 21, 23.2, 24, 19.5, 13.7, 9.4, 7.9]);
addAvgTempYear(cv_placePortorozLetalisce, 2021, 1, [5, 7.6, 7.7, 11, 16, 22.9, 24.4, 23, 18.9, 12.9, 10.6, 5.9]);
addAvgTempYear(cv_placePortorozLetalisce, 2022, 1, [4.4, 6.6, 6.7, 11.9, 18.9, 24.2, 25.9, 24.6, 18.8, 16.3, 11.1, 8.5]);


//id=2512  KOČEVJE (lon=14.8589, lat=45.6375, viš=464m)
addAvgTempYear(cv_placeKocevje, 1950, 1, [-4.2, 2.3, 5.3, 8.6, 15.8, 19.5, 21.8, 19.2, 14.1, 7.6, 5, -0.2]);
//addAvgTempYear(cv_placeKocevje, 1951, 1, [1.2, 3.9, 3.7, 8.7, 13.1, , , , , , , ]);
//id=409  KOČEVJE (lon=14.8603, lat=45.6362, viš=463m)
//addAvgTempYear(cv_placeKocevje, 1951, 1, [, , , , , , 17.4, 18, 15.6, 7.6, 7.3, 1]);
addAvgTempYear(cv_placeKocevje, 1951, 1, [1.2, 3.9, 3.7, 8.7, 13.1, 18.5, 17.4, 18, 15.6, 7.6, 7.3, 1]); //manjkajoči jun, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeKocevje, 1952, 1, [-2.5, -2.9, 2, 10.4, 12.6, 17.4, 19.6, 19.4, 12.6, 9.3, 3.6, -0.6]);
addAvgTempYear(cv_placeKocevje, 1953, 1, [-3.6, -2.4, 1.8, 9.1, 12.3, 16, 18.1, 15.8, 14.3, 11.6, 2.4, 0.1]);
addAvgTempYear(cv_placeKocevje, 1954, 1, [-6.7, -5, 5, 6.4, 11.6, 17.4, 16.9, 16.9, 15, 9.1, 4.4, 2]);
addAvgTempYear(cv_placeKocevje, 1955, 1, [0.7, 1.7, -0.3, 5.5, 11, 15.3, 18, 16.7, 13.3, 8.8, 3, 2]);
addAvgTempYear(cv_placeKocevje, 1956, 1, [2.1, -9.2, 0.7, 6.8, 12.5, 14.7, 18.4, 17.4, 15.2, 7.9, 1.3, -2]);
addAvgTempYear(cv_placeKocevje, 1957, 1, [-4.6, 4.6, 5.5, 8, 9.1, 18.1, 17.8, 16.5, 13.2, 8.7, 1.9, 1]);
addAvgTempYear(cv_placeKocevje, 1958, 1, [-3.3, 3.5, -0.1, 5.4, 16.4, 15.8, 18.2, 18, 13, 9.2, 4.8, 3]);
addAvgTempYear(cv_placeKocevje, 1959, 1, [-0.9, -3.1, 6.2, 8.9, 11.8, 15.4, 18.5, 16.7, 11.8, 7.2, 5, 2.4]);
addAvgTempYear(cv_placeKocevje, 1960, 1, [-1.3, 1.3, 3.8, 7.5, 12.7, 16.4, 16.2, 17.1, 12.3, 11, 6.5, 3]);
addAvgTempYear(cv_placeKocevje, 1961, 1, [-1.6, 2.7, 6, 11.7, 12.6, 17.5, 16.8, 16.8, 15, 11.2, 5.3, -0.9]);
addAvgTempYear(cv_placeKocevje, 1962, 1, [0.2, -2, -0.5, 7, 11.2, 14, 15.7, 18.1, 12.6, 8.4, 3, -4.6]);
addAvgTempYear(cv_placeKocevje, 1963, 1, [-7, -5, 1.9, 8.8, 12.3, 16.7, 18.1, 17.7, 14.4, 8.5, 9.9, -3.5]);
addAvgTempYear(cv_placeKocevje, 1964, 1, [-6, -0.9, 1.6, 8.5, 12.6, 17.4, 17.4, 16.3, 14, 9.3, 5, -0.3]);
addAvgTempYear(cv_placeKocevje, 1965, 1, [-0.1, -3.8, 4, 6.4, 11.6, 16.2, 17.4, 15.2, 14, 7.4, 3.6, 2.2]);
addAvgTempYear(cv_placeKocevje, 1966, 1, [-3.3, 6.8, 3.5, 10.5, 13, 17.4, 17.1, 16.2, 14.2, 12.9, 2.5, 0.3]);
addAvgTempYear(cv_placeKocevje, 1967, 1, [-3.8, 0.1, 5.7, 6.7, 13.3, 15.2, 18.5, 16.8, 14.2, 10.4, 5.1, -1.5]);
addAvgTempYear(cv_placeKocevje, 1968, 1, [-4.8, 2.8, 5.4, 11, 13.1, 15.5, 17.2, 15.7, 13.5, 9.8, 4.6, -3.4]);
addAvgTempYear(cv_placeKocevje, 1969, 1, [-2, -1.5, 2, 7.6, 14.5, 14.8, 17, 16.2, 14.3, 7.6, 6.8, -3.9]);
addAvgTempYear(cv_placeKocevje, 1970, 1, [0, -0.1, 1.8, 7.5, 11.4, 17.3, 17.3, 17.7, 14.2, 8.2, 6.3, -1.2]);
addAvgTempYear(cv_placeKocevje, 1971, 1, [-0.6, 1.1, 1.2, 9.9, 14.4, 15.7, 18.1, 18.7, 11, 6.9, 3.7, -1.8]);
addAvgTempYear(cv_placeKocevje, 1972, 1, [-2.4, 1.7, 5.9, 8.4, 12.4, 16.7, 18.1, 16.9, 10.7, 7.6, 3.8, -0.6]);
addAvgTempYear(cv_placeKocevje, 1973, 1, [-1.5, 0.2, 2.8, 6.2, 14.4, 16.8, 18, 17.1, 14.4, 7.6, 2.4, -0.5]);
addAvgTempYear(cv_placeKocevje, 1974, 1, [0.4, 4.7, 5.2, 7.7, 12.3, 14.7, 18, 18.6, 14.5, 4.8, 5, 0.8]);
addAvgTempYear(cv_placeKocevje, 1975, 1, [2.6, 0, 4.9, 8.5, 14.2, 14.9, 18, 17, 16, 7.9, 3.2, -0.4]);
addAvgTempYear(cv_placeKocevje, 1976, 1, [-0.6, -1.2, -0.8, 7.6, 12.9, 15.9, 18.1, 14.1, 12.8, 9.7, 5.6, -0.6]);
addAvgTempYear(cv_placeKocevje, 1977, 1, [2.3, 3.7, 7.1, 7.3, 12.7, 16.3, 17.7, 16.8, 11, 10.5, 4.9, -1.5]);
addAvgTempYear(cv_placeKocevje, 1978, 1, [-0.2, -0.4, 5, 6.5, 10.8, 15.3, 16.4, 15.8, 12.8, 8.4, 0.5, 0.3]);
addAvgTempYear(cv_placeKocevje, 1979, 1, [-2.3, 1, 5.9, 7.5, 13.5, 17.5, 17.1, 16.1, 13.6, 8.4, 4, 2.3]);
addAvgTempYear(cv_placeKocevje, 1980, 1, [-2.8, 2.1, 4.1, 5.8, 10.5, 15.8, 17.6, 18, 14.2, 9.1, 2.3, -2.8]);
addAvgTempYear(cv_placeKocevje, 1981, 1, [-4.1, -0.6, 6.6, 9.1, 13, 17.1, 18.4, 17.9, 15.6, 12.6, 3.3, 0.7]);
addAvgTempYear(cv_placeKocevje, 1982, 1, [-2.3, -1.9, 3, 5.7, 13.1, 17.6, 19.1, 18, 16.7, 11, 5.6, 2.4]);
addAvgTempYear(cv_placeKocevje, 1983, 1, [0.3, -2.9, 4, 10.5, 14.5, 16.4, 20.4, 17.8, 14.3, 8.5, 1.4, -0.4]);
addAvgTempYear(cv_placeKocevje, 1984, 1, [-0.9, -0.3, 3, 7.7, 11.5, 15.7, 17, 16.3, 13.4, 10.6, 4.8, 0.2]);
addAvgTempYear(cv_placeKocevje, 1985, 1, [-6.5, -4.2, 2.9, 7.6, 13.6, 14.8, 18.9, 17.5, 13.7, 7.9, 2, 2.8]);
addAvgTempYear(cv_placeKocevje, 1986, 1, [-0.5, -4.4, 1.5, 8.7, 15.2, 15.2, 17, 18, 12.4, 8.5, 4.5, -1.7]);
addAvgTempYear(cv_placeKocevje, 1987, 1, [-4.6, -0.2, -0.8, 9, 11.4, 16.5, 19.3, 16.5, 16.7, 10.5, 4.2, 0.3]);
addAvgTempYear(cv_placeKocevje, 1988, 1, [3.4, 2.2, 3.4, 8.1, 13.5, 15.4, 19.9, 17.8, 13.5, 10, 0.4, -0.3]);
//addAvgTempYear(cv_placeKocevje, 1989, 1, [-0.4, 3.1, 6.7, 9.6, 12.7, 14.5, 18, , , , , ]);
//id=410  KOČEVJE (lon=14.8640, lat=45.6374, viš=467m)
//addAvgTempYear(cv_placeKocevje, 1989, 1, [, , , , , , , , , 8.8, 2.7, 2.2]);
addAvgTempYear(cv_placeKocevje, 1989, 1, [-0.4, 3.1, 6.7, 9.6, 12.7, 14.5, 18, 17.5, 13.2, 8.8, 2.7, 2.2]); //manjkajoči avg-sep, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeKocevje, 1990, 1, [-0.3, 4.8, 6.7, 7.4, 13.6, 16, 17.9, 17.3, 12.9, 10.7, 4.8, -0.5]);
addAvgTempYear(cv_placeKocevje, 1991, 1, [-0.5, -2.6, 7, 6.9, 10, 16.7, 19.9, 18.3, 15.5, 7.7, 4.6, -2.7]);
addAvgTempYear(cv_placeKocevje, 1992, 1, [-0.6, 1.3, 4.4, 8.9, 13.6, 16.5, 18.7, 20.8, 13.9, 9, 5.9, -0.7]);
//addAvgTempYear(cv_placeKocevje, 1993, 1, [0.1, -0.8, 3, 9, 14.8, 17.2, 18.2, 18.8, 14, 11, , ]);
//id=1694  KOČEVJE (lon=14.8501, lat=45.6460, viš=467m)
//addAvgTempYear(cv_placeKocevje, 1993, 1, [, , , , , , , , , , , 1.6]);
addAvgTempYear(cv_placeKocevje, 1993, 1, [0.1, -0.8, 3, 9, 14.8, 17.2, 18.2, 18.8, 14, 11, 6.1, 1.6]); //manjkajoči nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeKocevje, 1994, 1, [1.9, 0.9, 8.2, 7.7, 13.1, 16.8, 19.5, 19.6, 15.4, 6.9, 6.4, 0.8]);
addAvgTempYear(cv_placeKocevje, 1995, 1, [-0.6, 3.6, 2.8, 8.6, 12.8, 14.5, 19.4, 16.2, 12.1, 10.3, 3.9, 0.1]);
addAvgTempYear(cv_placeKocevje, 1996, 1, [-2, -2.3, 0.9, 7.6, 13.8, 16.9, 16.3, 17, 11.1, 9.3, 6, -3.1]);
addAvgTempYear(cv_placeKocevje, 1997, 1, [-1.9, 1.9, 4.1, 5.2, 13.9, 17.1, 17.2, 17, 13.4, 7.4, 4.2, 1.2]);
addAvgTempYear(cv_placeKocevje, 1998, 1, [1.9, 2.5, 3.1, 9.3, 13.1, 17.8, 18.7, 18.5, 13.5, 9.6, 2, -4.9]);
addAvgTempYear(cv_placeKocevje, 1999, 1, [-0.4, -1.3, 5.7, 9.4, 14, 16.8, 18.2, 18.1, 15.7, 10, 1.6, 0]);
addAvgTempYear(cv_placeKocevje, 2000, 1, [-3.3, 1.9, 5.2, 11.1, 14.2, 18.1, 17.4, 18.8, 13.9, 11.2, 7.7, 3.5]);
addAvgTempYear(cv_placeKocevje, 2001, 1, [2.9, 2.1, 8, 7.8, 14.9, 16, 19.1, 19.9, 11.8, 11.8, 1.5, -3.1]);
addAvgTempYear(cv_placeKocevje, 2002, 1, [-1.8, 3.8, 6, 7.6, 14.8, 18, 18.7, 17.8, 12.1, 9.9, 8.3, 0.7]);
addAvgTempYear(cv_placeKocevje, 2003, 1, [-2.1, -4.4, 3.7, 7.5, 15.6, 20.3, 19.8, 21.1, 12.6, 7, 6.1, 0.4]);
addAvgTempYear(cv_placeKocevje, 2004, 1, [-1.9, 0.1, 1.7, 8.4, 11.5, 16.1, 18.2, 17.9, 13.3, 11.5, 4.4, 0.3]);
addAvgTempYear(cv_placeKocevje, 2005, 1, [-2.2, -3.6, 1.7, 8.4, 13.5, 16.9, 18.2, 16, 14.2, 10, 3.9, -0.4]);
addAvgTempYear(cv_placeKocevje, 2006, 1, [-3.3, -1.5, 2.5, 9.1, 13.1, 17.1, 20.5, 15.7, 14.8, 11.1, 6.9, 3]);
addAvgTempYear(cv_placeKocevje, 2007, 1, [3.1, 4.4, 5.9, 11.1, 14.8, 18.6, 18.9, 17.8, 11.7, 7.8, 3.3, -1.4]);
addAvgTempYear(cv_placeKocevje, 2008, 1, [1.6, 2.4, 4, 8.5, 13.8, 17.8, 18.9, 17.9, 12.9, 10.1, 5.5, 0.9]);
addAvgTempYear(cv_placeKocevje, 2009, 1, [-2.8, 0.5, 4.6, 10.6, 15.6, 16.6, 18.8, 19.1, 14.9, 8.9, 6.2, 1.4]);
addAvgTempYear(cv_placeKocevje, 2010, 1, [-2.9, -0.4, 3.4, 9, 13.1, 17.5, 20, 17.6, 12.3, 7.7, 6.5, -1.9]);
addAvgTempYear(cv_placeKocevje, 2011, 1, [0.2, -1, 4.2, 10.4, 13.5, 17.4, 17.9, 19.7, 16.2, 8, 2.4, 2.4]);
addAvgTempYear(cv_placeKocevje, 2012, 1, [-0.4, -4.6, 6.5, 9.5, 13.3, 19, 20.2, 19.8, 14.4, 9.6, 7.9, -0.8]);
addAvgTempYear(cv_placeKocevje, 2013, 1, [-0.2, -0.8, 1.5, 9.6, 13, 16.9, 19.7, 18.9, 13.7, 11.3, 5.7, 1.9]);
addAvgTempYear(cv_placeKocevje, 2014, 1, [4, 3.5, 7, 10.7, 12.9, 16.7, 18.3, 17.5, 13.9, 11.8, 7.8, 2]);
addAvgTempYear(cv_placeKocevje, 2015, 1, [1.4, -0.1, 4.8, 8.8, 14.8, 17.7, 21.1, 19.3, 14.4, 9.3, 4.8, 1.7]);
addAvgTempYear(cv_placeKocevje, 2016, 1, [0.3, 3.8, 4.7, 9.9, 13, 17.4, 20.2, 17.6, 15.2, 8.5, 5.8, -1.4]);
addAvgTempYear(cv_placeKocevje, 2017, 1, [-5.1, 3, 6.8, 9.4, 14, 18.8, 20.2, 20.2, 12.5, 9.2, 4.9, 1.2]);
addAvgTempYear(cv_placeKocevje, 2018, 1, [3.7, -2.4, 2.3, 12.5, 15.3, 17.6, 19, 19.5, 14.5, 11.2, 6.2, 0.5]);
addAvgTempYear(cv_placeKocevje, 2019, 1, [-1, 2.5, 6.2, 9.4, 10.7, 20.3, 19.6, 19.8, 14, 11.1, 7.5, 3]);
addAvgTempYear(cv_placeKocevje, 2020, 1, [0.7, 5, 4.9, 10, 12.9, 17.2, 18.7, 19.6, 14.6, 9.9, 3.8, 1.9]);
addAvgTempYear(cv_placeKocevje, 2021, 1, [-0.4, 4, 3.7, 6.6, 12, 19.9, 20.5, 18, 14.3, 7.7, 4.7, 1.2]);
addAvgTempYear(cv_placeKocevje, 2022, 1, [-0.5, 2.7, 3.2, 7.9, 15.3, 20.2, 20.5, 19.3, 13.6, 12.3, 6.1, 3]);

//id=1086  RATEČE (lon=13.7129, lat=46.4971, viš=864m)
addAvgTempYear(cv_placeRatece, 1948, 1, [-0.8, -4.2, 2.7, 6.7, 11.4, 13.4, 13.4, 15.3, 11.9, 7.2, 2.1, -3.3]);
//id=1899  RATEČE (lon=13.7129, lat=46.4971, viš=864m)
addAvgTempYear(cv_placeRatece, 1949, 1, [-2.4, -1.7, -0.2, 8.5, 9.9, 13.4, 15.9, 14.6, 13.2, 8.2, 0.9, -2.8]);
addAvgTempYear(cv_placeRatece, 1950, 1, [-5.3, -0.7, 2.7, 4.9, 12.3, 15.6, 18.2, 16.1, 11.6, 5.8, 1.2, -3.2]);
addAvgTempYear(cv_placeRatece, 1951, 1, [-2.8, -1.3, -0.3, 4.2, 9.6, 14.5, 15.9, 16.1, 13.4, 5.5, 3.7, -0.9]);
addAvgTempYear(cv_placeRatece, 1952, 1, [-5.6, -4.6, 0.1, 7.4, 10.8, 15.3, 18, 16.4, 9.6, 6.4, 0.3, -3.3]);
addAvgTempYear(cv_placeRatece, 1953, 1, [-5.2, -3.4, 1.3, 7.1, 11.2, 14, 16.4, 14.7, 12.5, 9.3, 0.5, -1.5]);
addAvgTempYear(cv_placeRatece, 1954, 1, [-8, -5.5, 2.3, 5, 9.4, 15, 13.8, 14, 12.4, 6.2, 1.3, 0.2]);
addAvgTempYear(cv_placeRatece, 1955, 1, [-2.5, -1.9, -1, 4.8, 9.2, 13.4, 15.7, 14, 11.5, 6, 0.6, -0.3]);
addAvgTempYear(cv_placeRatece, 1956, 1, [-2.3, -10.1, -0.4, 4, 10.9, 12.6, 16.2, 14.8, 12.2, 5.8, -1.3, -4]);
addAvgTempYear(cv_placeRatece, 1957, 1, [-3.5, 0.4, 2.9, 5.4, 7.9, 15.4, 15.6, 14.4, 10.2, 6.5, 2.8, -1.9]);
addAvgTempYear(cv_placeRatece, 1958, 1, [-5.3, -0.4, -2.8, 3, 13.8, 13.9, 16.4, 15.6, 12.1, 7.1, 2.6, -1.4]);
addAvgTempYear(cv_placeRatece, 1959, 1, [-3.5, -1.8, 4.5, 6.9, 10.6, 14, 17, 14.7, 11.2, 5.4, 1.8, -1.3]);
addAvgTempYear(cv_placeRatece, 1960, 1, [-4.3, -2.7, 1.2, 5.5, 11.2, 15, 14.4, 14.8, 10.6, 7.6, 2.4, -1.9]);
addAvgTempYear(cv_placeRatece, 1961, 1, [-5.9, -0.7, 3.6, 9.1, 9.8, 15.2, 14.4, 15.4, 13.6, 8.1, 1.9, -4]);
addAvgTempYear(cv_placeRatece, 1962, 1, [-3.2, -3.1, -1.4, 4.7, 9.1, 12.2, 14.4, 16.6, 10.7, 6.2, 0.5, -7.4]);
addAvgTempYear(cv_placeRatece, 1963, 1, [-8.3, -6.3, -0.3, 6.1, 9.9, 14.3, 16.9, 14.9, 12.6, 6.4, 5.4, -6]);
addAvgTempYear(cv_placeRatece, 1964, 1, [-8.7, -2.3, 0.1, 6.6, 11.7, 15.6, 16.2, 14.3, 11.4, 4.9, 2.7, -2.9]);
addAvgTempYear(cv_placeRatece, 1965, 1, [-3.8, -6.8, 0.2, 3.9, 8.9, 14.2, 14.8, 13.2, 10.8, 6, 0.4, -3.6]);
addAvgTempYear(cv_placeRatece, 1966, 1, [-6.5, 1.8, 0.9, 7.5, 10.8, 15.2, 14.6, 13.7, 12.2, 10, -0.7, -3.4]);
addAvgTempYear(cv_placeRatece, 1967, 1, [-4.9, -3, 2.6, 4.3, 10.8, 13.7, 17, 14.9, 12, 8.1, 2.6, -5]);
addAvgTempYear(cv_placeRatece, 1968, 1, [-6.9, -0.8, 1.2, 7.4, 10.7, 13.6, 15.5, 13.7, 11, 7.7, 1.6, -6.9]);
addAvgTempYear(cv_placeRatece, 1969, 1, [-4.3, -4.1, -0.1, 3.9, 12.4, 12.6, 16.2, 13.8, 12.1, 6.8, 2.2, -6.9]);
addAvgTempYear(cv_placeRatece, 1970, 1, [-3.4, -3.5, -1.3, 2.6, 8.2, 15.1, 15.2, 15.1, 12.1, 5.1, 2.4, -4.6]);
addAvgTempYear(cv_placeRatece, 1971, 1, [-3.8, -2.6, -2.2, 6.4, 11.5, 12.3, 16.6, 16.4, 9.5, 5.5, 0.7, -2]);
addAvgTempYear(cv_placeRatece, 1972, 1, [-5.4, -0.2, 2.6, 5.5, 9.5, 14.1, 15.6, 14.7, 7.7, 4.7, 0.4, -4.1]);
addAvgTempYear(cv_placeRatece, 1973, 1, [-3.3, -3.7, 0.3, 2.9, 11.5, 14.3, 15, 15.6, 12.1, 4.7, 0.1, -3.6]);
addAvgTempYear(cv_placeRatece, 1974, 1, [-1.2, 0.8, 2.3, 4.7, 9.7, 11.8, 15.4, 16.1, 11.1, 2.3, 1.4, -1.3]);
addAvgTempYear(cv_placeRatece, 1975, 1, [-0.3, -1.4, 1, 4.7, 10.7, 12.5, 15.9, 15, 13.7, 5.4, -0.1, -3.7]);
addAvgTempYear(cv_placeRatece, 1976, 1, [-3, -2, -1.2, 5.1, 10.6, 14.9, 16.6, 12.2, 10, 7.7, 2.4, -4.6]);
addAvgTempYear(cv_placeRatece, 1977, 1, [-2.7, -0.1, 3, 4.2, 9.8, 14, 15.1, 13.8, 9.6, 7.9, 1, -3.8]);
addAvgTempYear(cv_placeRatece, 1978, 1, [-4.2, -4, 1.4, 3.2, 8.4, 12.7, 14, 13.1, 10.2, 5.4, -1.1, -4.1]);
addAvgTempYear(cv_placeRatece, 1979, 1, [-6.9, -2.7, 1.7, 3.9, 9.8, 14.6, 14.3, 13.7, 11.5, 6.4, 0.7, -1.4]);
addAvgTempYear(cv_placeRatece, 1980, 1, [-6.2, -1.9, 0.8, 3.1, 8, 12.4, 14.1, 16, 11.9, 5.8, -1.3, -5.2]);
addAvgTempYear(cv_placeRatece, 1981, 1, [-8, -4.3, 3, 6.3, 10.1, 14, 14.7, 14.7, 12.2, 7.6, 0.5, -4.4]);
addAvgTempYear(cv_placeRatece, 1982, 1, [-4.8, -4.6, 0, 3.8, 10, 15, 16.8, 15.4, 13.7, 7.1, 2.7, -1.4]);
addAvgTempYear(cv_placeRatece, 1983, 1, [-1.9, -5.2, 2.3, 7.1, 10.3, 14.8, 19, 15.2, 11.5, 6.3, -1.5, -3]);
addAvgTempYear(cv_placeRatece, 1984, 1, [-4.7, -3.4, -0.4, 3.7, 8.5, 14, 15.1, 14.4, 10.5, 7.6, 1, -2.2]);
addAvgTempYear(cv_placeRatece, 1985, 1, [-8.3, -3.9, 0.4, 4.7, 11, 13, 17.2, 15.6, 12.7, 6.7, -1.4, -1.2]);
addAvgTempYear(cv_placeRatece, 1986, 1, [-5.1, -5.8, 0, 4.7, 13.4, 13.9, 16, 16, 11, 7.2, 1.2, -5.2]);
addAvgTempYear(cv_placeRatece, 1987, 1, [-7.7, -3, -3.3, 5.9, 9.1, 13.6, 17, 15.1, 14, 7.6, 2, -1.9]);
addAvgTempYear(cv_placeRatece, 1988, 1, [-1.1, -2.2, 0, 6.2, 11.3, 13.6, 17, 16, 10.9, 8.5, -2.3, -2.4]);
addAvgTempYear(cv_placeRatece, 1989, 1, [-2.7, 0.5, 4, 6.2, 10.5, 12.7, 15.9, 15, 11.3, 6.4, -0.3, -1.6]);
addAvgTempYear(cv_placeRatece, 1990, 1, [-2.6, 1.9, 4.1, 4.8, 11.8, 13.6, 15.7, 15.1, 9.7, 7.8, 0.8, -4.8]);
addAvgTempYear(cv_placeRatece, 1991, 1, [-5.3, -5.2, 3.4, 4.6, 7.5, 13.9, 17.2, 16.4, 13.3, 5.2, 0.3, -5.3]);
addAvgTempYear(cv_placeRatece, 1992, 1, [-2.6, -0.9, 2.3, 5.6, 11.8, 14.2, 17.3, 19, 11.7, 5.5, 3.1, -3.5]);
addAvgTempYear(cv_placeRatece, 1993, 1, [-2.7, -2, 1.2, 6.5, 12.4, 14.8, 15.6, 16.1, 10.7, 7.1, -0.3, -2.2]);
addAvgTempYear(cv_placeRatece, 1994, 1, [-1.6, -1.6, 5.3, 4.8, 11.4, 15, 18.5, 17.7, 12.7, 5.5, 4.7, -0.9]);
addAvgTempYear(cv_placeRatece, 1995, 1, [-4.2, 0.3, 0.1, 6.2, 10.9, 13.2, 18.4, 15, 10, 8.6, 1.2, -2.4]);
addAvgTempYear(cv_placeRatece, 1996, 1, [-2.7, -4.3, -1, 6.1, 11.4, 15.6, 15.5, 15.4, 9.2, 6.5, 3, -4.2]);
addAvgTempYear(cv_placeRatece, 1997, 1, [-3.1, -0.2, 3.3, 4.4, 11.5, 14.7, 15.4, 15.8, 12.6, 5.6, 2.1, -1.9]);
addAvgTempYear(cv_placeRatece, 1998, 1, [-1.9, 1.2, 1.4, 6, 11.7, 16, 17.2, 17, 11.5, 7, -0.8, -5.2]);
addAvgTempYear(cv_placeRatece, 1999, 1, [-3.2, -3.3, 2.9, 7.1, 12.7, 14.7, 16.7, 16.1, 13.6, 7.6, -0.6, -4.2]);
addAvgTempYear(cv_placeRatece, 2000, 1, [-5.7, -0.7, 2.7, 8.4, 12.6, 16.6, 15.4, 17, 12.2, 8.8, 4.1, -0.3]);
addAvgTempYear(cv_placeRatece, 2001, 1, [-1.4, -0.1, 4.2, 5.1, 13.2, 14.5, 17.3, 17.6, 9.7, 10.2, 0, -5.8]);
addAvgTempYear(cv_placeRatece, 2002, 1, [-4.2, 1, 4.1, 5.2, 12.5, 17.4, 17.1, 16, 10.5, 7.8, 5.3, -1.1]);
addAvgTempYear(cv_placeRatece, 2003, 1, [-4.4, -5.1, 3.3, 5.1, 13.4, 18.8, 17.7, 19.1, 10.5, 4.5, 3.6, -2.2]);
addAvgTempYear(cv_placeRatece, 2004, 1, [-5.4, -1.7, 0.6, 6.3, 9.9, 14.8, 16.5, 16.2, 11.6, 9.3, 1.1, -3]);
addAvgTempYear(cv_placeRatece, 2005, 1, [-5.6, -4.9, 0.5, 5.9, 12.5, 16, 16.4, 14.4, 12.1, 7.5, 1, -5.7]);
addAvgTempYear(cv_placeRatece, 2006, 1, [-6.2, -3.2, -0.2, 6, 11.2, 16.1, 20, 13.7, 13.7, 9, 2.9, -0.7]);
addAvgTempYear(cv_placeRatece, 2007, 1, [0.1, 0.7, 3.1, 9.9, 13.2, 16.3, 17, 15.6, 10, 6.1, 0.9, -2.6]);
addAvgTempYear(cv_placeRatece, 2008, 1, [-0.5, -0.3, 1.2, 5.7, 12.7, 15.8, 16.8, 16.5, 10.8, 8, 2, -2.7]);
addAvgTempYear(cv_placeRatece, 2009, 1, [-5, -2.4, 1, 6.7, 13.8, 14.9, 17.6, 17.9, 12.9, 7, 3.3, -2.7]);
addAvgTempYear(cv_placeRatece, 2010, 1, [-5, -2.3, 1.2, 7, 11.3, 16.1, 19, 16, 10.9, 5.8, 2.9, -4.5]);
addAvgTempYear(cv_placeRatece, 2011, 1, [-2.9, -1.3, 2.4, 9, 12.7, 15.8, 16.6, 17.6, 14.9, 6.1, 1.3, -1.2]);
addAvgTempYear(cv_placeRatece, 2012, 1, [-4.1, -4.9, 5.8, 6.6, 11.9, 17, 17.4, 17.7, 12.3, 7.4, 3.9, -3.6]);
addAvgTempYear(cv_placeRatece, 2013, 1, [-2, -3.7, -0.1, 6.7, 10.1, 15.5, 19.2, 17.4, 12, 8.8, 2.4, -1.1]);
addAvgTempYear(cv_placeRatece, 2014, 1, [0, 0.1, 3.2, 8.1, 10.8, 15.6, 16.5, 15.1, 12.4, 9.1, 5.6, -1]);
addAvgTempYear(cv_placeRatece, 2015, 1, [-1.6, -1.4, 2.5, 7.2, 12.8, 16.4, 19.8, 17.5, 11.7, 7, 3, -0.7]);
addAvgTempYear(cv_placeRatece, 2016, 1, [-2, 0.6, 2.2, 7.6, 10.6, 15.5, 18.1, 16.1, 13.8, 6.6, 2.8, -2.3]);
addAvgTempYear(cv_placeRatece, 2017, 1, [-7, 0.9, 5.3, 7.5, 12.7, 17.1, 17.5, 17.7, 10.2, 7.2, 0.9, -3.4]);
addAvgTempYear(cv_placeRatece, 2018, 1, [-0.8, -4.3, 0.3, 9.7, 13.2, 16.4, 17.6, 18.1, 13.2, 8.8, 4.1, -1.6]);
addAvgTempYear(cv_placeRatece, 2019, 1, [-3.7, 0.2, 3.8, 7.2, 8.5, 19.4, 18.5, 18, 12.4, 8.7, 3.8, -1]);
addAvgTempYear(cv_placeRatece, 2020, 1, [-1.7, 1.6, 2, 7.9, 11.3, 14.7, 17, 17.4, 12.8, 6.8, 1.7, -1.8]);
addAvgTempYear(cv_placeRatece, 2021, 1, [-5.3, -0.5, 1.2, 4.7, 9, 18.2, 18, 15.7, 13.2, 6.1, 2.3, -3.6]);
addAvgTempYear(cv_placeRatece, 2022, 1, [-3.6, -0.4, 1.2, 5.9, 13.3, 18.4, 19.1, 17.4, 11.7, 10.2, 3.1, -1.6]);

//id=192  VOJSKO (lon=13.9031, lat=46.0250, viš=1070m)
addAvgTempYear(cv_placeVojsko, 1958, 11, [-0.1, 0.5]);
addAvgTempYear(cv_placeVojsko, 1959, 1, [-2, -1.9, 3.2, 5.7, 9.7, 14.3, 16.9, 14.5, 10.5, 6, 2.4, 0.7]);
addAvgTempYear(cv_placeVojsko, 1960, 1, [-2.7, -2.2, 0.6, 5.1, 9.5, 13.5, 13.8, 14.5, 10, 7.6, 4, 0.1]);
addAvgTempYear(cv_placeVojsko, 1961, 1, [-4.2, 1.3, 4.5, 8.3, 8.7, 14.1, 13.7, 15, 14.3, 8, 2.9, -2.7]);
addAvgTempYear(cv_placeVojsko, 1962, 1, [-1.7, -3.6, -2.6, 5.6, 8.2, 11.3, 13.9, 16.5, 10.7, 6.9, 0.7, -4.5]);
addAvgTempYear(cv_placeVojsko, 1963, 1, [-8.3, -6.4, -0.2, 5.9, 9.7, 13.3, 16.4, 15.1, 12.2, 6.9, 6.1, -4.4]);
addAvgTempYear(cv_placeVojsko, 1964, 1, [-5.3, -1.5, -1, 6.1, 10.5, 15.2, 16.1, 14.1, 11.7, 6, 2.8, -1.5]);
addAvgTempYear(cv_placeVojsko, 1965, 1, [-1.8, -5.4, 1.2, 3.8, 8.5, 13.5, 14.7, 13.4, 10.8, 6.8, 1.1, -0.6]);
addAvgTempYear(cv_placeVojsko, 1966, 1, [-5.2, 3, 0.4, 7.3, 10.2, 14.4, 13.7, 13.4, 12.4, 9.9, -0.2, -1.2]);
addAvgTempYear(cv_placeVojsko, 1967, 1, [-3, -2.1, 2.8, 4.4, 10.7, 12.8, 16.8, 14.8, 12.6, 9.6, 3.2, -2.9]);
addAvgTempYear(cv_placeVojsko, 1968, 1, [-4.2, -0.2, 2.4, 7.6, 9.9, 12.8, 15, 13.3, 11.3, 8.3, 2.8, -4.3]);
addAvgTempYear(cv_placeVojsko, 1969, 1, [-2.8, -2.9, -0.9, 4.5, 11.8, 12.3, 16.3, 13.6, 12.1, 8.2, 4, -5.7]);
addAvgTempYear(cv_placeVojsko, 1970, 1, [-2, -2.7, -0.8, 3.6, 7.8, 14.6, 15, 15.5, 12, 6.5, 4.2, -1.5]);
addAvgTempYear(cv_placeVojsko, 1971, 1, [-2.3, -1.6, -2.3, 6.5, 11.1, 11.9, 16.2, 16.7, 10, 6.7, 2.2, 1.9]);
addAvgTempYear(cv_placeVojsko, 1972, 1, [-4.9, 0.3, 3.5, 4.8, 9.6, 13.6, 15.7, 14.4, 8.3, 5.3, 3.5, -2.1]);
addAvgTempYear(cv_placeVojsko, 1973, 1, [-2.8, -1.6, 1, 3.2, 10.8, 13.8, 15.1, 15.6, 13.1, 6, 1.2, -1.3]);
addAvgTempYear(cv_placeVojsko, 1974, 1, [0.7, 1, 3, 4.9, 9.3, 11.9, 15.3, 16.6, 11.8, 2.6, 2.5, 1.5]);
addAvgTempYear(cv_placeVojsko, 1975, 1, [1.2, -1.2, 1.5, 5.6, 11.3, 12.4, 16.1, 14.9, 14.2, 7.2, 1.1, 0.2]);
addAvgTempYear(cv_placeVojsko, 1976, 1, [-1.3, -2.1, -1, 5.4, 11.1, 14.5, 16.4, 12.4, 10.6, 8.3, 3.2, -1.6]);
addAvgTempYear(cv_placeVojsko, 1977, 1, [-0.3, 0.9, 4.5, 4.3, 9.4, 13.2, 14.5, 13.7, 9.3, 8.5, 2.9, -2.1]);
addAvgTempYear(cv_placeVojsko, 1978, 1, [-2.4, -3.2, 2.3, 3.6, 7.6, 12.6, 13.7, 13.1, 11.1, 6.5, 1.7, -1.4]);
addAvgTempYear(cv_placeVojsko, 1979, 1, [-4.2, -2.2, 2.1, 3.8, 10.5, 15.2, 13.8, 13.5, 11.4, 5.7, 1.9, 1.1]);
addAvgTempYear(cv_placeVojsko, 1980, 1, [-4.9, -0.7, 0.5, 2.5, 7.2, 11.9, 13.7, 15.4, 11.6, 6.8, 0.2, -2.2]);
addAvgTempYear(cv_placeVojsko, 1981, 1, [-4.7, -3.6, 3.5, 5.7, 9.3, 13.4, 14.5, 14.6, 11.8, 7.9, 1.8, -2.4]);
addAvgTempYear(cv_placeVojsko, 1982, 1, [-2.7, -3.9, 0.2, 3, 10.1, 14.1, 16, 15.2, 14, 7.3, 4, 0.3]);
addAvgTempYear(cv_placeVojsko, 1983, 1, [1.1, -4.6, 2.4, 6.3, 10.1, 13.5, 18.4, 15.4, 12.3, 7.2, 0.3, -1.4]);
addAvgTempYear(cv_placeVojsko, 1984, 1, [-2.4, -3.8, -1, 4.1, 7.2, 11.8, 14.4, 14, 10.7, 8.1, 2.2, -0.6]);
addAvgTempYear(cv_placeVojsko, 1985, 1, [-7.2, -4.4, -0.2, 4.5, 10.6, 11.7, 16.5, 15.9, 13.4, 7.4, -0.9, 1.7]);
addAvgTempYear(cv_placeVojsko, 1986, 1, [-3.1, -7.3, -0.6, 5, 13, 13.3, 14.9, 15.7, 11.1, 7.5, 3.3, -1.3]);
addAvgTempYear(cv_placeVojsko, 1987, 1, [-5.9, -2, -3.7, 6.1, 8.8, 12.8, 16.5, 14.4, 14.4, 7.2, 2.5, 0.3]);
addAvgTempYear(cv_placeVojsko, 1988, 1, [1, -0.9, 0.4, 5.3, 10.1, 12.3, 16.8, 16, 11.6, 7.9, -1.2, -0.1]);
addAvgTempYear(cv_placeVojsko, 1989, 1, [-0.5, 1.4, 4.6, 5.9, 10.3, 12, 15.5, 14.9, 11.3, 8.5, 1.3, -0.3]);
addAvgTempYear(cv_placeVojsko, 1990, 1, [-0.5, 2.9, 5.3, 4.2, 11.3, 12.9, 15.3, 15.8, 10.4, 8.5, 2.1, -3.2]);
addAvgTempYear(cv_placeVojsko, 1991, 1, [-3, -4.2, 3.9, 4.3, 7.1, 12.9, 17.2, 16.3, 13.4, 5, 1.9, -2.3]);
addAvgTempYear(cv_placeVojsko, 1992, 1, [-1.1, 0.8, 2, 5.3, 11.2, 13.5, 16.3, 19.1, 12.2, 6.1, 4.2, -2.1]);
//addAvgTempYear(cv_placeVojsko, 1993, 1, [-0.8, -1.6, 0.7, 6.1, 12.3, 14.1, 14.9, 16.4, 10.5, 7.1, , ]);
//id=1654  VOJSKO (lon=13.9021, lat=46.0254, viš=1065m)
//addAvgTempYear(cv_placeVojsko, 1993, 1, [, , , , , , , , , , , 0]);
addAvgTempYear(cv_placeVojsko, 1993, 1, [-0.8, -1.6, 0.7, 6.1, 12.3, 14.1, 14.9, 16.4, 10.5, 7.1, 4.6, 0]); //manjkajoči nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeVojsko, 1994, 1, [-0.4, -2.4, 5.2, 4.4, 9.9, 13.6, 17.8, 16.8, 11.8, 5.3, 5, -0.5]);
addAvgTempYear(cv_placeVojsko, 1995, 1, [-3.5, 0.8, -0.4, 5.2, 9.5, 11.6, 17.5, 14.3, 9.8, 8.9, 1.6, -2.1]);
addAvgTempYear(cv_placeVojsko, 1996, 1, [-3.2, -4.8, -2.2, 4.7, 10.3, 14.7, 14.2, 14.4, 7.8, 6.6, 3.4, -2.9]);
addAvgTempYear(cv_placeVojsko, 1997, 1, [-1.7, 0.7, 3.6, 3.7, 11.4, 14, 15.2, 16.1, 12.2, 5.1, 2.7, -0.3]);
addAvgTempYear(cv_placeVojsko, 1998, 1, [-0.3, 2.9, 0.9, 5.6, 11.3, 15.4, 17.3, 17, 11, 7.3, -0.8, -2.7]);
addAvgTempYear(cv_placeVojsko, 1999, 1, [-0.3, -2.8, 2.7, 6.4, 11.7, 14, 16.2, 15.7, 13.4, 7.8, 0.4, -2.2]);
addAvgTempYear(cv_placeVojsko, 2000, 1, [-3.5, 0.2, 2.3, 8.4, 11.7, 15.2, 14.6, 16.6, 11.9, 8.8, 4.9, 1.3]);
addAvgTempYear(cv_placeVojsko, 2001, 1, [-0.7, 0.1, 4, 4.9, 12.4, 13, 15.9, 16.8, 8.8, 9.8, 0.5, -5]);
addAvgTempYear(cv_placeVojsko, 2002, 1, [-2.5, 1.1, 4.1, 4.7, 11.2, 15.5, 16, 14.9, 10.2, 7.2, 5.4, -1.6]);
addAvgTempYear(cv_placeVojsko, 2003, 1, [-3.5, -5.8, 2.4, 4.5, 13.1, 18.1, 17.5, 19, 10.6, 4.1, 3.4, -0.9]);
addAvgTempYear(cv_placeVojsko, 2004, 1, [-4.5, -1.9, -0.4, 5, 8.6, 13.4, 16.4, 15.5, 11.1, 8.9, 2.4, -0.5]);
addAvgTempYear(cv_placeVojsko, 2005, 1, [-2.9, -5.2, 0.2, 5, 11, 14.3, 15.8, 13.3, 11.2, 7.3, 1.2, -3.9]);
addAvgTempYear(cv_placeVojsko, 2006, 1, [-5.1, -3.2, -1.4, 5.4, 10.1, 14.9, 18.8, 12.7, 12.5, 9, 4.2, 0.7]);
addAvgTempYear(cv_placeVojsko, 2007, 1, [0.8, 1.7, 3.4, 10, 12.3, 15.3, 17, 15.2, 9.8, 5.8, 1, -1.4]);
addAvgTempYear(cv_placeVojsko, 2008, 1, [0.9, 0, 0.5, 5.7, 11.6, 14.8, 16.2, 16.3, 10.5, 8.3, 2.9, -1.2]);
addAvgTempYear(cv_placeVojsko, 2009, 1, [-3.7, -1.8, 1.7, 8.1, 13.2, 13.9, 16.3, 17.5, 13.2, 6.5, 3.9, -1.4]);
addAvgTempYear(cv_placeVojsko, 2010, 1, [-5.4, -2.1, 0.4, 6.5, 10.1, 15, 17.8, 15.4, 10.5, 5.1, 3.8, -2.9]);
addAvgTempYear(cv_placeVojsko, 2011, 1, [-1.9, -1.5, 1.9, 8.7, 11.8, 14.4, 15.2, 17.4, 14.6, 5.9, 2.8, 0.8]);
addAvgTempYear(cv_placeVojsko, 2012, 1, [-2.2, -5.9, 5.4, 5.9, 11, 15.8, 17.2, 18, 12.5, 7.8, 4.8, -1.8]);
addAvgTempYear(cv_placeVojsko, 2013, 1, [-1.4, -3.9, -0.7, 6.1, 9.2, 14.1, 18, 16.8, 11.5, 8.3, 2.9, 1.6]);
addAvgTempYear(cv_placeVojsko, 2014, 1, [1.4, 0.6, 4.4, 7.8, 10.3, 14.3, 15.6, 14.4, 11.7, 8.9, 6.1, -0.4]);
addAvgTempYear(cv_placeVojsko, 2015, 1, [-0.2, -1.8, 2.1, 6.4, 11.3, 14.9, 18.8, 17.3, 11.7, 6.8, 4.7, 2.5]);
addAvgTempYear(cv_placeVojsko, 2016, 1, [-0.7, 1.1, 2, 6.9, 10.1, 14.4, 17.7, 15.6, 13.8, 6, 3.3, 0.3]);
addAvgTempYear(cv_placeVojsko, 2017, 1, [-5.7, 0.1, 5.3, 6.6, 11.8, 16.4, 17.4, 17.8, 10, 8.3, 1.9, -1.1]);
addAvgTempYear(cv_placeVojsko, 2018, 1, [1, -5.4, -0.3, 9.9, 12.7, 15.5, 17.5, 18, 13.3, 9.5, 3.8, -0.1]);
addAvgTempYear(cv_placeVojsko, 2019, 1, [-3.2, 1.7, 3.6, 7, 8.1, 19, 18, 17.4, 12.1, 9, 4.5, 1.5]);
addAvgTempYear(cv_placeVojsko, 2020, 1, [0.9, 2, 1.9, 7.9, 10.5, 14.5, 17.1, 17.7, 12.8, 7.3, 3.1, -0.1]);
addAvgTempYear(cv_placeVojsko, 2021, 1, [-2.6, 1.1, 1.7, 3.7, 8.4, 17.4, 17.5, 15.7, 12.9, 6.2, 3.2, -0.4]);
addAvgTempYear(cv_placeVojsko, 2022, 1, [-1.2, 0.8, 1.3, 5.2, 12.9, 18.1, 19.1, 18, 10.9, 11.3, 4.3, 0.6]);


//id=1076  BRNIK - LETALIŠČE (lon=14.4574, lat=46.2288, viš=380m)
addAvgTempYear(cv_placeBrnikLetalisce, 1964, 1, [-6.7, -1.3, 2.2, 9.2, 13.6, 18.7, 18.8, 16.8, 14, 8.7, 4.7, -0.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 1965, 1, [-1.7, -3.9, 3.3, 6.9, 12.3, 16.9, 17.6, 15.9, 13.6, 7.5, 2.3, -0.2]);
//addAvgTempYear(cv_placeBrnikLetalisce, 1966, 1, [-4.5, 4.9, 3.2, 10.3, , , , , , , , ]);
//id=1079  BRNIK - LETALIŠČE (lon=14.4747, lat=46.2169, viš=363m)
//addAvgTempYear(cv_placeBrnikLetalisce, 1966, 1, [, , , , , 17.2, 16.8, 16.1, 13.7, 12.2, 1.4, -0.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1966, 1, [-4.5, 4.9, 3.2, 10.3, 12.9, 17.2, 16.8, 16.1, 13.7, 12.2, 1.4, -0.3]); //manjkajoči maj, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBrnikLetalisce, 1967, 1, [-3.4, -0.9, 4.9, 6.6, 13.5, 15.7, 19.4, 17.7, 14.1, 8.9, 3.7, -2.9]);
addAvgTempYear(cv_placeBrnikLetalisce, 1968, 1, [-5.8, 1, 3.1, 9.7, 12.9, 15.9, 17.3, 16, 13.3, 8.9, 3.7, -4.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 1969, 1, [-2.9, -2.7, 1.9, 7, 14.4, 15.3, 17.8, 16, 13.8, 7, 5.2, -4.2]);
addAvgTempYear(cv_placeBrnikLetalisce, 1970, 1, [-1.1, -1.5, 1, 6.6, 10.7, 17.2, 17.4, 17.8, 13.9, 6.9, 5, -2.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 1971, 1, [-2.9, -0.6, 0.8, 8.9, 13.9, 14.8, 18.5, 18.2, 10.6, 5.7, 2.5, -2.8]);
addAvgTempYear(cv_placeBrnikLetalisce, 1972, 1, [-3.3, 0.9, 5.1, 8.5, 12.3, 16.3, 17.7, 17.1, 10, 6.7, 2.7, -1.2]);
addAvgTempYear(cv_placeBrnikLetalisce, 1973, 1, [-1.7, -1, 2.4, 6, 13.7, 16.7, 17.4, 17.3, 14, 5.8, 0.7, -1.8]);
addAvgTempYear(cv_placeBrnikLetalisce, 1974, 1, [0.5, 3.7, 5.1, 7.1, 12.2, 14.6, 17.7, 18.4, 13.4, 4.7, 3.6, 0]);
addAvgTempYear(cv_placeBrnikLetalisce, 1975, 1, [1.4, -0.8, 3.7, 7.9, 14.3, 14.9, 18.1, 17.3, 15.5, 7.3, 3, -2.4]);
addAvgTempYear(cv_placeBrnikLetalisce, 1976, 1, [-2.1, -1.5, -1, 7.2, 13.3, 16.9, 19, 14.5, 12.3, 9.2, 4.9, -1.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 1977, 1, [0, 2.5, 5.2, 6.7, 12.3, 16.6, 17.5, 16.6, 11.3, 9.2, 3.6, -1.3]);
//addAvgTempYear(cv_placeBrnikLetalisce, 1978, 1, [-1, -1.4, 4.5, 6.5, 10.7, 15.6, 17.6, 17, 14, 9, , ]);
//id=1085  BRNIK - LETALIŠČE (lon=14.4542, lat=46.2311, viš=384m)
//addAvgTempYear(cv_placeBrnikLetalisce, 1978, 1, [, , , , , , , , , , , -1.4]);
addAvgTempYear(cv_placeBrnikLetalisce, 1978, 1, [-1, -1.4, 4.5, 6.5, 10.7, 15.6, 17.6, 17, 14, 9, 3.6, -1.4]); //manjkajoči nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBrnikLetalisce, 1979, 1, [-2.5, 0.8, 5.4, 7.8, 14.7, 18.9, 17.8, 16.9, 14.3, 8.7, 3.6, 1.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 1980, 1, [-2.4, 1.4, 4.2, 6.7, 11.4, 16.2, 17.4, 19, 14.8, 9.2, 1, -3.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1981, 1, [-4.5, -1.4, 5.8, 9.3, 13.5, 17.3, 18.5, 18.1, 15.2, 10.9, 3, -0.9]);
addAvgTempYear(cv_placeBrnikLetalisce, 1982, 1, [-3.2, -1.8, 3.5, 7.3, 13.8, 18.2, 20.2, 18.8, 16.9, 10.2, 5, 2.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 1983, 1, [0.4, -2.2, 4.6, 10.5, 14.1, 17.6, 21.9, 18.7, 14.7, 9, 0.8, -0.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1984, 1, [-1.6, -0.4, 2.8, 8.1, 11.7, 16.3, 18, 17.6, 13.9, 10.5, 3.9, 0.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1985, 1, [-6.2, -3.4, 3.3, 8, 14.5, 15.7, 20.3, 19.3, 15.6, 9.1, 1.4, 2.1]);
addAvgTempYear(cv_placeBrnikLetalisce, 1986, 1, [-1.1, -3.8, 2.1, 8.8, 16.7, 16.9, 18.9, 19.5, 14, 9.7, 4.3, -2.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1987, 1, [-4.7, -0.6, -0.5, 9.7, 12.7, 16.8, 20.4, 18, 17.3, 10.5, 4, 0.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1988, 1, [2.6, 2.2, 3.9, 9.3, 14.5, 16.6, 20.8, 19.7, 14.8, 10.7, 0.1, -1.1]);
addAvgTempYear(cv_placeBrnikLetalisce, 1989, 1, [-1.5, 2.9, 7, 9.7, 14.3, 15.8, 19.5, 18.7, 14.8, 9.2, 2.3, 1.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 1990, 1, [-1.1, 4.3, 7.1, 8.2, 15.5, 17.1, 19.6, 19.3, 13.3, 10.8, 4.1, -0.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 1991, 1, [-0.6, -2.3, 7.2, 8.3, 11.3, 17.3, 20.8, 20, 16.6, 8.3, 4.2, -2.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 1992, 1, [-0.3, 1.9, 4.9, 9.4, 15.5, 17.9, 20.6, 22.6, 15.5, 8.9, 5.3, -0.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 1993, 1, [-0.2, 0.1, 4.3, 10, 16.5, 18.4, 18.3, 18.8, 13.2, 10, 1.5, 0.3]);
//addAvgTempYear(cv_placeBrnikLetalisce, 1994, 1, [2, 1, 8, 8.3, , , , , , , , ]);
//id=1898  LETALIŠČE JOŽETA PUČNIKA LJUBLJANA (lon=14.4728, lat=46.2175, viš=364m)
//addAvgTempYear(cv_placeBrnikLetalisce, 1994, 1, [, , , , , 17.7, 20.3, 20, 15.3, 7.5, 6.3, 0.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 1994, 1, [2, 1, 8, 8.3, 14.8, 17.7, 20.3, 20, 15.3, 7.5, 6.3, 0.6]); //manjkajoči maj, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBrnikLetalisce, 1995, 1, [-1.1, 2.1, 3.4, 8.9, 13.2, 15.3, 20.4, 17.3, 12.6, 10.1, 3.8, 0.1]);
addAvgTempYear(cv_placeBrnikLetalisce, 1996, 1, [-1.9, -2.8, 1, 8.6, 14.4, 18.1, 17.4, 17.8, 12.1, 9.3, 6.2, -2.4]);
addAvgTempYear(cv_placeBrnikLetalisce, 1997, 1, [-1.6, 0.9, 5, 6.7, 14.2, 17.5, 18.3, 18.3, 14.4, 7.8, 4, 1]);
addAvgTempYear(cv_placeBrnikLetalisce, 1998, 1, [1.1, 2.3, 3.7, 9.5, 13.9, 19, 19.8, 19.5, 14.2, 9.8, 2.2, -5]);
addAvgTempYear(cv_placeBrnikLetalisce, 1999, 1, [-1.6, -1.9, 5.3, 9.6, 14.9, 17.3, 19.2, 18.6, 16.1, 10.4, 1.4, -1.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 2000, 1, [-3.6, 2.4, 5.1, 11.5, 14.9, 18.4, 17.5, 19.3, 14.2, 11.1, 7.2, 3]);
addAvgTempYear(cv_placeBrnikLetalisce, 2001, 1, [2.1, 2.2, 6.9, 7.9, 15.3, 16.6, 19.5, 20.2, 12.2, 12, 1.9, -4.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 2002, 1, [-3.4, 2.4, 6.1, 8.5, 15.1, 19.2, 19.4, 18.4, 13.1, 9.7, 7.9, 1.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 2003, 1, [-3.3, -3.4, 4.6, 8.6, 15.9, 21.6, 20.7, 22.2, 13.4, 7.3, 6.6, 0]);
addAvgTempYear(cv_placeBrnikLetalisce, 2004, 1, [-1.6, 0.3, 2.3, 9, 12.3, 16.9, 18.7, 18.5, 13.8, 11.6, 3.9, 0]);
addAvgTempYear(cv_placeBrnikLetalisce, 2005, 1, [-2.4, -3.2, 2.7, 8.8, 14.8, 18.3, 19.3, 17.1, 15, 10.3, 3.9, -2.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 2006, 1, [-4.5, -2.1, 2.3, 9.4, 13.6, 18.7, 21.6, 16.2, 15.7, 11.1, 6.2, 2.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 2007, 1, [2.1, 3.8, 6.1, 12.3, 15.5, 19.2, 19.8, 18.9, 13, 8.9, 3.3, -1.2]);
addAvgTempYear(cv_placeBrnikLetalisce, 2008, 1, [0.9, 2, 4.3, 8.9, 15.9, 19.2, 19.9, 19.2, 13.4, 10.1, 4.5, 0.4]);
addAvgTempYear(cv_placeBrnikLetalisce, 2009, 1, [-3, 0.4, 5.1, 11.3, 16.2, 17.2, 19.7, 20.5, 15.7, 9.2, 5.3, 0.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 2010, 1, [-3.2, -1, 4.1, 9.5, 14.2, 19, 21.3, 18.5, 13.4, 8, 6.5, -1.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 2011, 1, [-0.8, -0.2, 4.6, 11.6, 15.2, 18.3, 19.2, 20.6, 17.3, 8.2, 2.2, 1.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 2012, 1, [-0.4, -3.4, 7.4, 9.8, 14.6, 19.6, 21, 21.3, 15.4, 9.9, 7.2, -1]);
addAvgTempYear(cv_placeBrnikLetalisce, 2013, 1, [0.1, -0.8, 2.1, 10.6, 13.3, 18.4, 21.6, 20.7, 14.6, 11.6, 5.9, 0.9]);
addAvgTempYear(cv_placeBrnikLetalisce, 2014, 1, [4, 2.7, 7.1, 11.3, 14.1, 18.3, 19.5, 18.4, 14.9, 11.9, 7.9, 1.7]);
addAvgTempYear(cv_placeBrnikLetalisce, 2015, 1, [0.7, 0.6, 5.6, 10.3, 15.3, 18.9, 22.6, 20.6, 14.7, 9.5, 4.6, 0.3]);
addAvgTempYear(cv_placeBrnikLetalisce, 2016, 1, [-1, 3.6, 5.5, 10.4, 13.9, 18.5, 21.3, 18.9, 16.4, 8.7, 5.4, -1.8]);
//addAvgTempYear(cv_placeBrnikLetalisce, 2017, 1, [-4.5, 2.5, 7.5, 10.2, 15.4, 19.7, 21, 20.9, 13.7, , , ]);
//id=3049  LETALIŠČE JOŽETA PUČNIKA LJUBLJANA (lon=14.4784, lat=46.2114, viš=362m)
//addAvgTempYear(cv_placeBrnikLetalisce, 2017, 1, [, , , , , , , 20.4, 12.6, 9.1, 4, -0.6]);
addAvgTempYear(cv_placeBrnikLetalisce, 2017, 1, [-4.5, 2.5, 7.5, 10.2, 15.4, 19.7, 21, 20.4, 12.6, 9.1, 4, -0.6]); // za avg-sep se prekrivajo podatki!! nova postaja kaže 0.5-1 stopinjo manj !!!
addAvgTempYear(cv_placeBrnikLetalisce, 2018, 1, [2.8, -2, 2.6, 12.7, 16.4, 19.1, 20.2, 20.3, 15.5, 11.1, 7, 0.4]);
addAvgTempYear(cv_placeBrnikLetalisce, 2019, 1, [-1.5, 2.6, 6, 9.7, 11.4, 21.2, 21, 20.5, 15, 10.9, 7.5, 2]);
addAvgTempYear(cv_placeBrnikLetalisce, 2020, 1, [-0.6, 4.3, 4.9, 10.6, 13.6, 18, 19.7, 20.2, 15.3, 10.1, 3.5, 1.5]);
addAvgTempYear(cv_placeBrnikLetalisce, 2021, 1, [-1.1, 3, 4, 7.3, 11.7, 20.7, 21.1, 18.7, 15.1, 8.1, 4.2, -0.9]);
addAvgTempYear(cv_placeBrnikLetalisce, 2022, 1, [-1.4, 2.7, 3.6, 8.4, 16, 21.2, 22.3, 21.4, 14.3, 12.4, 6.2, 2.6]);

// id=532  BIZELJSKO - STARA VAS (lon=15.6945, lat=45.9910, viš=163m)
addAvgTempYear(cv_placeBizeljsko, 1949, 7, [19.6, 19.3, 17.3, 11, 6.8, 2.4]);
addAvgTempYear(cv_placeBizeljsko, 1950, 1, [-5.3, 0.8, 4.6, 11, 17.9, 22.4, 24.6, 21.3, 17.1, 10.9, 7.7, 2.2]);  //manjka mar in okt-dec, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBizeljsko, 1951, 1, [2.3, 4.5, 4.6, 9.4, 15.3, 18.9, 19.8, 21.7, 15.5, 10.8, 8.7, 2.1]);    //manjka avg-okt, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBizeljsko, 1952, 1, [-1.1, -1.4, 5.1, 13.5, 14.9, 19.9, 22.4, 22.2, 13.9, 10.8, 4.6, 0.5]);
addAvgTempYear(cv_placeBizeljsko, 1953, 1, [-0.6, 0.6, 5.5, 11.6, 14.8, 18.8, 20.8, 18.3, 16.2, 12.6, 4.6, 1.2]);  //manjka nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
//addAvgTempYear(cv_placeBizeljsko, 1954, 1, [-5.2, -4.2, 6.6, 8.6, , , , , , , ,]);
// id=533  BIZELJSKO - ZGORNJA SUŠICA (lon=15.6947, lat=46.0154, viš=174m)
//addAvgTempYear(cv_placeBizeljsko, 1954, 1, [, , , , , 19.6, 18.2, 18.6, 16.4, 10.2, 4.7, 3.6]);
addAvgTempYear(cv_placeBizeljsko, 1954, 1, [-5.2, -4.2, 6.6, 8.6, 14.1, 19.6, 18.2, 18.6, 16.4, 10.2, 4.7, 3.6]); //manjka maj, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBizeljsko, 1955, 1, [0.6, 2.2, 2.4, 8.8, 13.4, 17.3, 19.5, 18.2, 15.1, 10.1, 4.3, 2.4]);
addAvgTempYear(cv_placeBizeljsko, 1956, 1, [2.4, -7.9, 2.7, 10, 15.3, 17.1, 20.1, 18.9, 16, 9.9, 2.4, -0.1]);
addAvgTempYear(cv_placeBizeljsko, 1957, 1, [-3.6, 4.9, 7.9, 10.1, 12, 20.1, 20.1, 17.7, 14.6, 9.9, 6.2, 1.1]);
addAvgTempYear(cv_placeBizeljsko, 1958, 1, [-2.2, 4, 2.5, 8.4, 18.4, 17.7, 20.4, 19.7, 15.4, 11.3, 6.6, 3.1]);
addAvgTempYear(cv_placeBizeljsko, 1959, 1, [0, -0.8, 8.5, 11.4, 14.4, 17.2, 20.5, 18.7, 14, 8.5, 5.8, 3.9]);
addAvgTempYear(cv_placeBizeljsko, 1960, 1, [-1.4, 2.1, 6.2, 10.5, 14.3, 18.3, 17.7, 19, 14, 11.6, 7.2, 3.6]);
addAvgTempYear(cv_placeBizeljsko, 1961, 1, [-1, 3.5, 8.1, 13.7, 13.6, 18.6, 18.1, 18.4, 16.5, 12, 6, -1]);
addAvgTempYear(cv_placeBizeljsko, 1962, 1, [-0.6, 0.8, 2.6, 10.3, 13.5, 16, 17.8, 19.9, 14.6, 10.6, 4.3, -3.5]);
addAvgTempYear(cv_placeBizeljsko, 1963, 1, [-6.3, -3.3, 3.8, 11.3, 14.7, 19, 20.7, 19.8, 16.1, 10, 10.1, -3.3]);
addAvgTempYear(cv_placeBizeljsko, 1964, 1, [-6.5, -0.2, 3.5, 10.8, 14.5, 19.9, 19.3, 17.8, 14.9, 9.9, 6.7, 0.4]);
addAvgTempYear(cv_placeBizeljsko, 1965, 1, [0.3, -2, 5.8, 8.7, 13.5, 17.8, 18.9, 16.7, 15.4, 9.1, 3.3, 2.2]);
addAvgTempYear(cv_placeBizeljsko, 1966, 1, [-3.4, 7.3, 5.1, 12, 14.6, 18.7, 18.1, 17.7, 15.7, 14.1, 3.3, 0.6]);
addAvgTempYear(cv_placeBizeljsko, 1967, 1, [-2.3, 2.3, 7.1, 9.3, 15.6, 17.3, 21.3, 19.1, 16.3, 11.5, 5.9, -0.7]);
addAvgTempYear(cv_placeBizeljsko, 1968, 1, [-2.7, 3.2, 6.3, 12.2, 15.1, 18.1, 19.4, 18, 14.7, 11, 5.9, -2.5]);
addAvgTempYear(cv_placeBizeljsko, 1969, 1, [-2, -0.9, 4.2, 9.9, 16.5, 17, 19.1, 17.9, 15.7, 9.4, 7.5, -2.9]);
addAvgTempYear(cv_placeBizeljsko, 1970, 1, [-0.9, 0.8, 4.1, 9.3, 12.4, 18.6, 18.8, 19.3, 15.4, 9.2, 7.8, -0.2]);
addAvgTempYear(cv_placeBizeljsko, 1971, 1, [-1.7, 3, 2.8, 11.2, 16, 17.4, 19.9, 20.1, 12.6, 8.8, 4.4, 0.1]);
addAvgTempYear(cv_placeBizeljsko, 1972, 1, [-1.3, 3.4, 7.7, 10.5, 13.9, 18.2, 19.9, 18.4, 12.6, 9.1, 4.8, 0.8]);
addAvgTempYear(cv_placeBizeljsko, 1973, 1, [-0.5, 2, 5.2, 8.4, 15.8, 18.2, 19.1, 19, 15.6, 8.2, 2.9, 0.4]);
addAvgTempYear(cv_placeBizeljsko, 1974, 1, [1.2, 6.1, 7.7, 9.6, 13.8, 16.5, 19.1, 20.3, 15.5, 6.6, 5.4, 2.8]);
addAvgTempYear(cv_placeBizeljsko, 1975, 1, [4.1, 1.9, 6.8, 10.5, 16.2, 16.7, 19.8, 18.8, 17.6, 9.9, 4.4, 0.7]);
addAvgTempYear(cv_placeBizeljsko, 1976, 1, [0.9, 0.9, 2.1, 10.1, 14.7, 17.8, 20.7, 16.1, 14.3, 10.5, 7.1, 0.4]);
addAvgTempYear(cv_placeBizeljsko, 1977, 1, [2, 4.7, 8.6, 9, 14.8, 18.8, 19.3, 18.8, 13.3, 11.6, 5.7, 0]);
addAvgTempYear(cv_placeBizeljsko, 1978, 1, [0.2, 0.7, 7.1, 9, 12.8, 17.1, 17.7, 17.4, 14.4, 9.6, 1.1, 0.3]);
//addAvgTempYear(cv_placeBizeljsko, 1979, 1, [-2.4, 1.9, 7.4, 9.2, , , , , , , ,]);
// id=534  BIZELJSKO (lon=15.6946, lat=46.0148, viš=172m)
//addAvgTempYear(cv_placeBizeljsko, 1979, 1, [, , , , 15.6, 20.2, 18.3, 17.8, 15.5, 9.3, 5.8, 3.6]);
addAvgTempYear(cv_placeBizeljsko, 1979, 1, [-2.4, 1.9, 7.4, 9.2, 15.6, 20.2, 18.3, 17.8, 15.5, 9.3, 5.8, 3.6]);
addAvgTempYear(cv_placeBizeljsko, 1980, 1, [-2.1, 2.8, 5.6, 8.5, 12.6, 17.3, 18.4, 19.3, 15.3, 9.7, 3.5, -1.5]);
addAvgTempYear(cv_placeBizeljsko, 1981, 1, [-3, 0.2, 8.5, 10.4, 14.4, 18.4, 19.3, 18.9, 16.1, 12.1, 4.2, 0]);
addAvgTempYear(cv_placeBizeljsko, 1982, 1, [-2.2, -0.8, 5, 8.2, 15.2, 18.8, 20.8, 19.1, 18.2, 11.4, 5.5, 3.7]);
addAvgTempYear(cv_placeBizeljsko, 1983, 1, [2.2, -1, 6.5, 12.4, 16.1, 18, 21.6, 19.3, 15.4, 9.9, 1.7, 0.3]);
addAvgTempYear(cv_placeBizeljsko, 1984, 1, [-0.7, 0.4, 4.5, 9.8, 13.4, 17, 18, 18.3, 15.2, 11.2, 5.1, 0.5]);
addAvgTempYear(cv_placeBizeljsko, 1985, 1, [-6.3, -3.6, 4.7, 9.9, 15.7, 16, 19.7, 19, 15.4, 9.3, 2.5, 3.7]);
addAvgTempYear(cv_placeBizeljsko, 1986, 1, [0, -3.4, 2.8, 10.7, 17.4, 17, 18.7, 19.6, 14.3, 9.5, 5, -1.5]);
addAvgTempYear(cv_placeBizeljsko, 1987, 1, [-3.6, 0.7, 1, 10.8, 13.3, 17.7, 20.7, 17.6, 18.1, 11.2, 4.3, 0.8]);
addAvgTempYear(cv_placeBizeljsko, 1988, 1, [3, 3, 5.2, 9.6, 15.1, 17.1, 20.5, 19.5, 15.2, 10, 0.7, 0]);
addAvgTempYear(cv_placeBizeljsko, 1989, 1, [-1.2, 3.7, 8.4, 11.1, 14.2, 16.4, 20.2, 19.2, 15.4, 9.9, 3, 1.6]);
addAvgTempYear(cv_placeBizeljsko, 1990, 1, [-0.8, 5.9, 8.7, 9.7, 15.8, 17.6, 19.1, 19.4, 14, 10.8, 5.2, 0.8]);
addAvgTempYear(cv_placeBizeljsko, 1991, 1, [0.9, -2.2, 8.5, 8.9, 11.7, 17.9, 21.3, 19.6, 16.1, 8.7, 5.4, -2.4]);
addAvgTempYear(cv_placeBizeljsko, 1992, 1, [0.7, 3.2, 6.3, 11, 15.5, 18.4, 20.4, 23.1, 16.2, 9.7, 6.1, 0.8]);
addAvgTempYear(cv_placeBizeljsko, 1993, 1, [1, 0.3, 5.4, 10.8, 17.2, 18.9, 19.6, 20.2, 15, 11.1, 1.7, 0.9]);
//addAvgTempYear(cv_placeBizeljsko, 1994, 1, [3.2, 2.3, 9.7, 10.7, 15.1, 18.7, 22, 21.2, 17.2, 8.3, , ]);
// id=1719  BIZELJSKO (lon=15.6948, lat=46.0153, viš=173m)
//addAvgTempYear(cv_placeBizeljsko, 1994, 1, [, , , , , , , , , , , 1.1]);
addAvgTempYear(cv_placeBizeljsko, 1994, 1, [3.2, 2.3, 9.7, 10.7, 15.1, 18.7, 22, 21.2, 17.2, 8.3, 3, 1.1]); //manjka nov, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeBizeljsko, 1995, 1, [-0.6, 4.5, 4.9, 11.5, 15.1, 17.3, 21.8, 18.6, 14.3, 11.7, 4.3, 0.5]);
addAvgTempYear(cv_placeBizeljsko, 1996, 1, [-1.7, -1.4, 3, 10.3, 16.4, 19.3, 18.5, 19.1, 12.8, 11.1, 7, -1.9]);
addAvgTempYear(cv_placeBizeljsko, 1997, 1, [-1.1, 3.8, 6.4, 7.8, 16.3, 19, 19.7, 19.8, 15.7, 8.9, 5.2, 2.2]);
addAvgTempYear(cv_placeBizeljsko, 1998, 1, [2.4, 4.7, 4.9, 11.9, 15.5, 19.8, 20.8, 20.5, 15.4, 10.9, 2.9, -3.5]);
addAvgTempYear(cv_placeBizeljsko, 1999, 1, [0.1, 0.5, 8, 11.7, 16, 19, 20.6, 19.8, 17.9, 11.4, 2.8, 0]);
addAvgTempYear(cv_placeBizeljsko, 2000, 1, [-2.7, 3.9, 7.3, 13.5, 16.8, 20.4, 19.4, 22.1, 16, 12.7, 8.4, 3.9]);
addAvgTempYear(cv_placeBizeljsko, 2001, 1, [3, 3.6, 9.1, 10, 17.2, 17.8, 21.2, 21.8, 13.8, 13.5, 3, -3.1]);
addAvgTempYear(cv_placeBizeljsko, 2002, 1, [-0.2, 5.4, 8.4, 10.2, 17.5, 20.4, 21.3, 20.2, 15, 10.7, 8.9, 1.7]);
addAvgTempYear(cv_placeBizeljsko, 2003, 1, [-2, -2.6, 6.5, 10.2, 18.4, 23.7, 22.2, 24.2, 15.4, 8.8, 7.3, 0.9]);
addAvgTempYear(cv_placeBizeljsko, 2004, 1, [-1.1, 1.9, 4.8, 11.1, 14, 18.5, 20.4, 20.2, 15.5, 12.6, 6.1, 1.1]);
addAvgTempYear(cv_placeBizeljsko, 2005, 1, [-0.7, -2, 4.6, 11.4, 15.9, 19.3, 20.7, 18.4, 16.5, 11.5, 4.5, 0.1]);
addAvgTempYear(cv_placeBizeljsko, 2006, 1, [-1.9, 0.4, 4.9, 11.7, 15.4, 19.9, 22.8, 18.1, 17.3, 12.4, 7.9, 3.2]);
addAvgTempYear(cv_placeBizeljsko, 2007, 1, [4.7, 6, 8.1, 13.4, 17.3, 21.1, 21.4, 20.1, 14, 9.6, 4.5, -0.2]);
addAvgTempYear(cv_placeBizeljsko, 2008, 1, [1.8, 4.1, 6.4, 11.1, 17, 20.2, 21.1, 20.5, 14.8, 11.5, 6.5, 2.2]);
addAvgTempYear(cv_placeBizeljsko, 2009, 1, [-1.7, 2.1, 6.7, 14.1, 18.1, 19.1, 21.6, 21.7, 17.8, 10.8, 7.4, 2]);
addAvgTempYear(cv_placeBizeljsko, 2010, 1, [-1.2, 1.4, 5.9, 11.8, 15.7, 19.6, 22.6, 20.2, 14.6, 8.5, 7.7, -2]);
addAvgTempYear(cv_placeBizeljsko, 2011, 1, [1.1, 0.8, 6.6, 12.8, 15.8, 19.9, 21, 22.4, 19.1, 9.9, 2.9, 2.5]);
addAvgTempYear(cv_placeBizeljsko, 2012, 1, [1.2, -2.6, 8.9, 11.7, 15.9, 21, 22.7, 22.6, 17.1, 11.3, 8.1, 0.1]);
// id=2849  BIZELJSKO (lon=15.6913, lat=46.0159, viš=175m)
addAvgTempYear(cv_placeBizeljsko, 2013, 1, [0.7, 1.1, 4, 12.1, 15.3, 19.3, 22.4, 21.6, 15.1, 12.4, 6.7, 1.8]);
addAvgTempYear(cv_placeBizeljsko, 2014, 1, [4.4, 4.3, 9.8, 13, 14.9, 19.1, 20.8, 19, 15.7, 12.7, 8.6, 3.4]);
addAvgTempYear(cv_placeBizeljsko, 2015, 1, [2.4, 2, 7.5, 11.3, 16.8, 19.7, 23.2, 21.9, 16.6, 10.8, 6.8, 2.3]);
addAvgTempYear(cv_placeBizeljsko, 2016, 1, [0.6, 5.8, 7.2, 12, 15.3, 19.7, 22.4, 19.7, 17.6, 9.7, 6.1, -1]);
addAvgTempYear(cv_placeBizeljsko, 2017, 1, [-4, 4.1, 9.6, 11.3, 16.6, 21.4, 22.8, 22.3, 14.4, 11.1, 6.5, 2.1]);
addAvgTempYear(cv_placeBizeljsko, 2018, 1, [4, -0.4, 4.2, 14.9, 18.8, 20.6, 21.3, 22.6, 16.6, 12.9, 7.6, 1.7]);
addAvgTempYear(cv_placeBizeljsko, 2019, 1, [0.2, 4.3, 8.6, 11.7, 12.9, 22.8, 21.6, 22.3, 16.4, 12.5, 8.5, 3.5]);
addAvgTempYear(cv_placeBizeljsko, 2020, 1, [0.4, 6.6, 7.8, 12.8, 15.1, 19.4, 21.1, 22.2, 17, 11.8, 5.2, 3.5]);
addAvgTempYear(cv_placeBizeljsko, 2021, 1, [1.8, 4.8, 6.3, 9.2, 13.4, 22.2, 22.8, 20.4, 16.7, 9.4, 5.8, 2.2]);
addAvgTempYear(cv_placeBizeljsko, 2022, 1, [0.8, 4.5, 6, 10, 18, 22.5, 23, 22.4, 15.8, 13.3, 7.3, 3.5]);

// id=1902  LETALIŠČE EDVARDA RUSJANA MARIBOR (lon=15.6818, lat=46.4797, viš=264m)
addAvgTempYear(cv_placeMariborLetalisce, 1977, 1, [1, 4.4, 7.6, 8.1, 14.2, 18.6, 18.8, 17.9, 12.4, 10.6, 5.4, -0.7]);
addAvgTempYear(cv_placeMariborLetalisce, 1978, 1, [-0.3, 0.3, 6.2, 7.9, 12.5, 16.7, 17.2, 16.7, 13.7, 8.8, 0.6, -0.5]);
addAvgTempYear(cv_placeMariborLetalisce, 1979, 1, [-3.6, 0.9, 6.8, 8.1, 14.8, 19.1, 17.5, 17, 14.3, 8.5, 4.9, 2.5]);
addAvgTempYear(cv_placeMariborLetalisce, 1980, 1, [-3.4, 1.9, 4.1, 7.4, 11.8, 17, 18, 18.4, 14.7, 9.3, 2.2, -2]);
addAvgTempYear(cv_placeMariborLetalisce, 1981, 1, [-3.8, -0.4, 6.9, 9.3, 13.8, 18.2, 18.7, 18.2, 15.7, 11.5, 3.8, -0.5]);
addAvgTempYear(cv_placeMariborLetalisce, 1982, 1, [-3, -2, 4.8, 7.6, 14.6, 18.6, 20.1, 18.9, 17.2, 10.5, 5.8, 3]);
addAvgTempYear(cv_placeMariborLetalisce, 1983, 1, [1.8, -1.8, 5.8, 12, 15.7, 17.7, 22, 19.2, 15.1, 9.6, 0.9, 0.1]);
addAvgTempYear(cv_placeMariborLetalisce, 1984, 1, [-0.9, -0.4, 3.6, 8.8, 13.2, 17.1, 18.3, 18, 14.6, 11, 4.7, 0.3]);
addAvgTempYear(cv_placeMariborLetalisce, 1985, 1, [-6.3, -4.4, 3.7, 9.4, 15.3, 16.7, 19.7, 19.4, 15.2, 8.8, 2.5, 3.3]);
addAvgTempYear(cv_placeMariborLetalisce, 1986, 1, [-0.1, -4.8, 2.3, 10.4, 17.3, 17.2, 19, 19.8, 14.3, 9.3, 4.5, -1.6]);
addAvgTempYear(cv_placeMariborLetalisce, 1987, 1, [-4.8, -0.4, -0.1, 10.5, 12.9, 18, 21.2, 17.7, 17.5, 10.9, 4.5, 0.7]);
addAvgTempYear(cv_placeMariborLetalisce, 1988, 1, [2.4, 2.8, 4.3, 9.1, 15, 17.4, 21, 19.8, 15, 10.2, 0.5, 0.3]);
addAvgTempYear(cv_placeMariborLetalisce, 1989, 1, [-1.1, 3.5, 8, 10.8, 14.4, 16.3, 20.1, 18.8, 14.8, 9.6, 2.3, 2]);
addAvgTempYear(cv_placeMariborLetalisce, 1990, 1, [-0.7, 5.5, 7.6, 9.1, 15.9, 17.6, 19, 19.2, 13.3, 10.2, 4.5, -0.5]);
addAvgTempYear(cv_placeMariborLetalisce, 1991, 1, [-0.3, -3.2, 7.1, 8.4, 11.4, 17.7, 19.7, 21.4, 15.9, 8.1, 4.6, -2.7]);  //manjka jul-avg, nadomestim s povprečjem iz prejšnjega in naslednjega podatka
addAvgTempYear(cv_placeMariborLetalisce, 1992, 1, [0.2, 2.5, 5.6, 10.3, 14.9, 18.5, 20.5, 23.6, 16, 9, 5.5, 0.1]);
addAvgTempYear(cv_placeMariborLetalisce, 1993, 1, [0.5, -0.2, 4.2, 10.1, 17, 18.9, 19.7, 19.7, 15, 11.4, 1.2, 0.9]);
addAvgTempYear(cv_placeMariborLetalisce, 1994, 1, [3.4, 1.2, 9.1, 10, 15.2, 18.9, 21.7, 21.1, 17.2, 8, 6.9, 1.1]);
addAvgTempYear(cv_placeMariborLetalisce, 1995, 1, [0, 4.4, 4.6, 10.7, 14.8, 17, 21.7, 18.3, 14, 10.7, 3.3, -0.2]);
addAvgTempYear(cv_placeMariborLetalisce, 1996, 1, [-1.6, -2.5, 1.8, 10, 16.2, 19.2, 18.3, 18.8, 12.2, 10.6, 7.2, -2.1]);
addAvgTempYear(cv_placeMariborLetalisce, 1997, 1, [-2.4, 2.8, 5.3, 7.6, 15.9, 18.6, 19.2, 19, 15.2, 8.1, 5, 2]);
addAvgTempYear(cv_placeMariborLetalisce, 1998, 1, [2.2, 4.4, 4.2, 10.8, 15.1, 19.2, 20.1, 20, 14.8, 10.7, 2.5, -3.6]);
addAvgTempYear(cv_placeMariborLetalisce, 1999, 1, [-0.7, 0.1, 7.1, 11, 15.5, 18.4, 20.3, 18.8, 17.1, 11, 2, -0.3]);
addAvgTempYear(cv_placeMariborLetalisce, 2000, 1, [-4.1, 3.6, 6.4, 13.5, 16.6, 20.4, 19.3, 21.5, 15.5, 12.2, 8.5, 3]);
addAvgTempYear(cv_placeMariborLetalisce, 2001, 1, [2, 3.5, 8.5, 9.2, 16.9, 17.6, 21, 21.1, 13.5, 13.3, 2.8, -3.1]);
addAvgTempYear(cv_placeMariborLetalisce, 2002, 1, [-0.5, 5.2, 7.2, 9.7, 17.3, 20.8, 21.2, 19.7, 14.1, 10.8, 8.7, 1]);
addAvgTempYear(cv_placeMariborLetalisce, 2003, 1, [-2.9, -3.4, 5.8, 9.4, 18.1, 23, 22, 23.7, 14.8, 8.5, 7.4, 0.9]);
addAvgTempYear(cv_placeMariborLetalisce, 2004, 1, [-0.8, 1.5, 3.9, 10.4, 13.4, 17.9, 19.8, 20, 14.9, 12.2, 5.3, 0.7]);
addAvgTempYear(cv_placeMariborLetalisce, 2005, 1, [-0.4, -2.5, 3.4, 10.4, 15.8, 19.1, 20.1, 17.6, 15.8, 10.9, 4, 0.3]);
addAvgTempYear(cv_placeMariborLetalisce, 2006, 1, [-4, -0.2, 4, 11.2, 14.7, 19.1, 22.4, 17.2, 16.4, 12.5, 7.1, 2.1]);
addAvgTempYear(cv_placeMariborLetalisce, 2007, 1, [3.8, 5.2, 7.3, 12.4, 16.6, 20.7, 21.7, 19.5, 13.5, 9.1, 4.5, -0.7]);
addAvgTempYear(cv_placeMariborLetalisce, 2008, 1, [2.5, 3.8, 6.1, 10.5, 17, 19.7, 20.6, 19.9, 14.4, 10.9, 6, 1.5]);
addAvgTempYear(cv_placeMariborLetalisce, 2009, 1, [-1.9, 1.6, 5.8, 13.1, 16.7, 18.1, 20.8, 20.5, 16.5, 10.3, 6.6, 1.7]);
addAvgTempYear(cv_placeMariborLetalisce, 2010, 1, [-2.1, 0.9, 5.5, 10.5, 15.4, 19.7, 22.2, 19.4, 13.8, 8.6, 7.6, 0.2]);
addAvgTempYear(cv_placeMariborLetalisce, 2011, 1, [1, 0, 5.8, 12.6, 15.8, 19.5, 20, 21.2, 18.3, 9.3, 3.1, 2.5]);
addAvgTempYear(cv_placeMariborLetalisce, 2012, 1, [0.9, -3, 8.3, 11.4, 15.8, 21, 21.7, 21.6, 16.8, 10.5, 7.9, 0.9]);
addAvgTempYear(cv_placeMariborLetalisce, 2013, 1, [0.3, 0.5, 3.3, 11.8, 14.9, 19.3, 22.5, 21.6, 15.2, 12.4, 6.4, 2.1]);
addAvgTempYear(cv_placeMariborLetalisce, 2014, 1, [3.3, 4.4, 8.8, 12.5, 15, 19.2, 20.8, 18.7, 15.5, 12.9, 8.5, 2.8]);
addAvgTempYear(cv_placeMariborLetalisce, 2015, 1, [2.5, 1.8, 6.4, 11.2, 15.8, 19.5, 22.8, 21.7, 16.3, 10.2, 6.4, 1.8]);
addAvgTempYear(cv_placeMariborLetalisce, 2016, 1, [0.2, 5.9, 6.7, 12.1, 15.3, 20, 22.2, 19.6, 17.4, 9.8, 6.2, -0.6]);
addAvgTempYear(cv_placeMariborLetalisce, 2017, 1, [-5.2, 3.9, 9, 10.7, 16.4, 21.2, 22.2, 21.7, 13.9, 10.8, 5.4, 2.2]);
addAvgTempYear(cv_placeMariborLetalisce, 2018, 1, [3.8, -1.2, 3.6, 14.8, 17.6, 19.9, 21.5, 21.9, 16.9, 12.2, 7.3, 1.2]);
addAvgTempYear(cv_placeMariborLetalisce, 2019, 1, [0, 3.8, 8, 11.2, 12.8, 22.8, 21.7, 21.8, 16.1, 12.5, 8.2, 3.3]);
addAvgTempYear(cv_placeMariborLetalisce, 2020, 1, [0.2, 5.9, 6.6, 11.6, 14.7, 19.1, 20.7, 21.3, 16.5, 11.4, 4.5, 1.9]);
addAvgTempYear(cv_placeMariborLetalisce, 2021, 1, [1.4, 3.7, 5.5, 8.5, 13.4, 22.2, 22.7, 19.3, 15.7, 9.3, 5, 1]);
addAvgTempYear(cv_placeMariborLetalisce, 2022, 1, [0.8, 4.2, 4.4, 9.5, 17.3, 21.8, 22.6, 21.7, 15.3, 13.1, 6.7, 2.1]);

// id=2650 AVTOMATSKA!!  LOGATEC (lon = 14.2032 lat = 45.9077 viš = 485m)
addAvgTempYear(cv_placeLogatec, 2014, 2, [2.6, 6.4, 10.2, 12.6, 17.0, 18.0, 17.1, 14.2, 11.5, 7.5, 2.3]); // !2784! 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2015, 1, [1.3, -0.6, 4.5, 8.6, 14.2, 17.5, 21.2, 19.1, 14.0, 9.0, 5.1, 1.9]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2016, 1, [-0.4, 3.8, 4.7, 9.5, 12.4, 17.1, 20.2, 17.6, 15.3, 8.3, 5.9, -1.8]); // 4464 4176 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2017, 1, [-5.2, 2.8, 7.0, 8.9, 13.9, 18.8, 19.8, 19.5, 12.4, 9.2, 4.6, 0.4]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2018, 1, [3.4, -2.6, 2.2, 11.8, 14.9, 17.8, 19.5, 19.7, 14.6, 10.6, 6.3, 0.0]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2019, 1, [-1.4, 2.3, 6.0, 8.8, 10.4, 20.2, 19.5, 19.6, 14.1, 11.1, 7.4, 2.0]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2020, 1, [0.5, 4.5, 4.6, 9.3, 12.5, 16.8, 18.6, 19.4, 14.4, 10.0, 3.6, 1.8]); // 4464 4176 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2021, 1, [-0.5, 3.9, 3.3, 6.4, 11.4, 19.5, 19.9, 17.9, 14.3, 7.3, 4.2, 0.1]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeLogatec, 2022, 1, [-1.0, 2.7, 2.9, 7.9, 14.9, 20.0, 20.2, 19.6, 13.7, 11.7, 6.0, 3.1]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464

// id=2841 AVTOMATSKA !!  TOLMIN - VOLČE (lon = 13.7180 lat = 46.1777 viš = 188m)
addAvgTempYear(cv_placeTolmin, 2015, 10, [11.5, 6.6, 2.6]); // 48 48 48 48 48 48 48 48 2927 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2016, 1, [1.1, 5.4, 8.0, 11.9, 14.4, 18.8, 22.0, 20.3, 18.0, 11.0, 7.8, 0.4]); // 4464 4176 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2017, 1, [-1.5, 4.9, 10.1, 11.4, 16.2, 20.6, 21.3, 21.9, 14.4, 11.3, 6.5, 1.3]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2018, 1, [3.9, 1.6, 5.4, 14.1, 17.2, 19.9, 21.4, 21.8, 17.6, 13.1, 9.2, 2.2]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2019, 1, [0.9, 5.1, 8.7, 11.8, 13.1, 22.5, 22.1, 22.0, 17.2, 13.1, 9.1, 3.8]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2020, 1, [2.0, 5.8, 7.7, 12.8, 15.3, 18.3, 21.2, 21.5, 17.4, 11.5, 6.7, 3.5]); // 4464 4176 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2021, 1, [1.0, 5.5, 6.5, 9.2, 13.0, 21.3, 22.1, 19.9, 17.4, 11.0, 7.2, 1.4]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placeTolmin, 2022, 1, [1.4, 4.3, 6.7, 10.3, 17.4, 22.5, 24.7, 22.7, 15.9, 14.2, 8.3, 4.8]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464

// id=1837 AVTOMATSKA !!  VELENJE - TEŠ (lon = 15.1119 lat = 46.3603 viš = 388m)
addAvgTempYear(cv_placeVelenje, 1990, 8, [21.1, 13.3, 10.9, 5.0, 0.1]); // 48 48 48 48 48 48 48 1392 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1991, 1, [-0.6, -2.6, 7.7, 8.4, 11.4, 17.1, 20.5, 19.4, 16.2, 8.6, 4.7, -0.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1992, 1, [0.7, 3.1, 5.5, 9.6, 14.6, 17.6, 19.9, 23.0, 15.7, 9.0, 6.1, 0.0]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1993, 1, [0.9, 0.6, 5.2, 10.3, 16.3, 18.2, 18.8, 19.6, 14.3, 10.8, 1.8, 2.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1994, 1, [3.4, 2.1, 9.2, 9.2, 14.4, 17.9, 21.3, 21.6, 15.8, 8.3, 7.5, 1.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1995, 1, [0.4, 4.0, 4.3, 10.4, 14.4, 16.4, 21.4, 18.1, 13.5, 11.8, 3.8, -0.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1996, 1, [-1.5, -1.2, 1.9, 9.5, 15.2, 18.4, 18.2, 18.7, 12.6, 10.4, 6.9, -1.6]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1997, 1, [-1.7, 3.2, 5.8, 7.5, 15.4, 17.9, 19.0, 19.0, 15.1, 8.4, 4.8, 2.0]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1998, 1, [2.6, 4.7, 4.6, 10.5, 14.6, 19.8, 19.9, 20.2, 14.6, 10.9, 2.8, -1.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 1999, 1, [0.0, -0.4, -0.5]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
// id=1837 ... od tu naprej umetno dopolnjujem ker manjkajo podatki do 2005 !!
addAvgTempYear(cv_placeVelenje, 1999, 4, [10.5, 14.6, 19.8, 19.9, 20.2, 14.6, 10.9, 2.8, -1.6]); 
addAvgTempYear(cv_placeVelenje, 2000, 1, [-0.7, -1.2, 1.6, 9.9, 14.7, 19, 19.6, 18.6, 14.9, 10.6, 3.3, -1.1]); 
addAvgTempYear(cv_placeVelenje, 2001, 1, [-0.7, -1.2, 1.6, 9.9, 14.7, 19, 19.6, 18.6, 14.9, 10.6, 3.3, -1.1]); 
addAvgTempYear(cv_placeVelenje, 2002, 1, [-0.7, -1.2, 1.6, 9.9, 14.7, 19, 19.6, 18.6, 14.9, 10.6, 3.3, -1.1]); 
addAvgTempYear(cv_placeVelenje, 2003, 1, [-0.7, -1.2, 1.6, 9.9, 14.7, 19, 19.6, 18.6, 14.9, 10.6, 3.3, -1.1]); 
addAvgTempYear(cv_placeVelenje, 2004, 1, [-0.7, -1.2, 1.6, 9.9, 14.7, 19, 19.6, 18.6, 14.9, 10.6, 3.3, -1.1]); 
// id=1837 ... pa spet regularni podatki
addAvgTempYear(cv_placeVelenje, 2005, 1, [-1.4, -2.1, 3.7, 9.3, 14.8, 18.2, 19.4, 17.0, 15.2, 10.3, 3.8, -0.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2006, 1, [-3.4, -0.8, 2.7, 9.9, 13.8, 18.4, 21.7, 16.4, 16.2, 12.0, 6.1, 2.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2007, 1, [2.6, 4.5, 6.5, 12.4, 15.6, 19.5, 20.3, 18.7, 12.9, 8.7, 3.9, -1.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2008, 1, [2.2, 3.0, 4.8, 9.7, 15.4, 18.9, 19.8, 19.5, 14.1, 10.9, 5.5, 1.2]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2009, 1, [-2.2, 1.3, 5.5, 12.3, 16.3, 17.2, 20.0, 20.6, 16.3, 9.9, 6.1, 1.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2010, 1, [-2.3, 0.5, 4.7, 10.0, 14.4, 18.9, 21.7, 18.9, 13.5, 8.2, 6.5, -0.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2011, 1, [0.4, -0.2, 5.7, 12.2, 15.1, 18.5, 20.1, 21.9, 19.1, 10.0, 4.3, 3.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2012, 1, [1.6, -1.8, 9.2, 11.2, 15.9, 20.8, 22.2, 22.0, 16.5, 10.6, 7.7, 0.8]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2013, 1, [1.2, 0.4, 3.0, 11.6, 14.6, 18.9, 22.5, 21.7, 15.5, 12.2, 6.5, 3.0]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2014, 1, [4.0, 4.0, 9.3, 12.4, 14.9, 19.1, 20.3, 18.9, 15.7, 13.2, 8.9, 2.9]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2015, 1, [2.6, 2.2, 6.7, 11.2, 15.8, 19.3, 23.1, 22.0, 15.9, 10.6, 6.9, 2.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2016, 1, [1.0, 4.9, 6.6, 11.9, 14.9, 19.1, 22.1, 19.8, 18.0, 10.1, 6.5, 1.0]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2017, 1, [-3.7, 4.2, 9.4, 11.0, 16.2, 20.8, 22.4, 22.2, 13.9, 11.7, 5.6, 2.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2018, 1, [4.1, -0.5, 3.6, 14.6, 17.6, 19.8, 21.2, 22.0, 17.1, 12.8, 7.6, 2.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2019, 1, [0.4, 4.7, 8.2, 11.2, 12.4, 22.4, 22.0, 21.8, 16.3, 12.7, 8.4, 3.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2020, 1, [1.8, 5.7, 6.7, 12.0, 14.4, 18.7, 20.8, 21.7, 16.7, 10.7, 4.2, 1.1]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2021, 1, [0.4, 3.9, 5.2, 7.8, 12.4, 21.1, 21.7, 19.4, 16.1, 9.2, 4.7, 0.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeVelenje, 2022, 1, [0.7, 3.6, 4.6, 8.9, 16.5, 21.2, 22.3, 21.5, 14.6, 13.4, 6.7, 1.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488

// id=1266 AVTOMATSKA !!  PTUJ - TERME (lon = 15.8543 lat = 46.4219 viš = 223m)
//addAvgTempYear(cv_placePtuj, 1995, 1, [?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 3.0 ?, 0.9]); // 48 48 48 48 48 48 48 48 48 48 96 1488
addAvgTempYear(cv_placePtuj, 1995, 12, [0.9]); // 1488
addAvgTempYear(cv_placePtuj, 1996, 1, [-1.6, -3.2, 2.8, 10.0, 16.2, 19.1, 18.3, 18.8, 12.5, 10.7, 7.5, 0.7]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 1997, 1, [-1.5, 3.6, 5.4, 7.6, 16.2, 18.9, 19.2, 19.2, 15.4, 8.5, 5.3, 2.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 1998, 1, [3.0, 4.5, 4.7, 11.4, 14.9, 18.8, 20.1, 21.2, 16.8, 10.9, 2.7, -3.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 1999, 1, [?, 2.5, 7.7, 11.1, 15.7, 18.9, 21.0, 18.9, 16.9, 11.1, 2.2, -0.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 1999, 1, [-0.2, 2.5, 7.7, 11.1, 15.7, 18.9, 21.0, 18.9, 16.9, 11.1, 2.2, -0.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2000, 1, [-3.5, 3.8, 6.6, 13.0, 16.1, 19.6, 19.1, 21.5, 15.5, 12.0, 8.4, 3.2]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2001, 1, [2.1, 3.8, 9.1, 9.1, 17.6, 16.5, 20.7, 20.4, 13.2, 13.3, 3.1, -1.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2002, 1, [1.6, 5.6, 7.7, 9.9, 17.1, 20.0, 21.4, 20.3, 11.1, 10.9, 8.9, 1.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2003, 1, [-2.4, -2.9, 6.3, 9.9, 18.2, 23.4, 20.2, ?, ?, 4.9, 7.4, 0.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2003, 1, [-2.4, -2.9, 6.3, 9.9, 18.2, 23.4, 20.2, 19.1, 13.1, 4.9, 7.4, 0.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2004, 1, [-1.2, 1.9, 4.6, 10.5, 13.7, 18.2, 19.9, 17.9, 15.1, 12.1, 5.5, 0.7]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2005, 1, [-0.6, -2.7, 3.6, 10.8, 16.3, 19.5, 20.6, 18.7, 15.5, 11.8, 3.4, 0.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2006, 1, [-3.1, 0.5, 1.7 ?, ?, ?, ?, ?, ?, ?, ?, ?, ?]); // 1488 1344 960 48 48 48 48 48 48 48 48 48
// id=1859 AVTOMATSKA !!  PTUJ - TERME (lon = 15.8512 lat = 46.4213 viš = 222m)
//addAvgTempYear(cv_placePtuj, 2006, 1, [?, ?, 10.4 ?, 11.7, 15.2, 18.2, 22.5, 17.3, 16.8, 12.4, 7.7, 2.6]); // 48 48 576 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2006, 1, [-3.1, 0.5, 5.4, 11.7, 15.2, 18.2, 22.5, 17.3, 16.8, 12.4, 7.7, 2.6]); // 
addAvgTempYear(cv_placePtuj, 2007, 1, [4.5, 5.2, 7.2, 12.1, 16.3, 20.3, 20.9, 18.4, 13.6, 7.9, 4.1, -0.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2008, 1, [2.5, 3.9, 6.2, 10.6, 16.0, 18.8, 20.3, 19.9, 14.5, 10.9, 6.3, 1.8]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2009, 1, [-2.0, 1.8, 6.0, 12.8, 16.5, 17.7, 20.3, 20.3, 16.3, 10.3, 6.9, 2.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2010, 1, [-1.7, 1.1, 6.0, 10.4, 15.3, 19.2, 21.6, 19.7, 13.8, 8.5, 8.0, 0.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2011, 1, [1.2, 0.3, 6.1, 12.1, 15.1, 19.1, 19.5, 20.7, 17.9, 9.3, 3.0, 3.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2012, 1, [1.3, -2.9, 8.2, 11.4, 15.4, 20.4, 21.7, 21.4, 16.5, 10.8, 8.0, 1.0]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2013, 1, [0.6, 0.8, 3.3, 11.7, 15.1, 18.8, 21.7, 20.6, 14.9, 12.8, 6.7, 2.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2014, 1, [4.0, 4.5, 9.0, 12.5, 14.7, 18.7, 20.3, 18.6, 15.4, 13.1, 8.5, 3.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placePtuj, 2015, 1, [2.9, 2.0, 6.5, 11.1, 15.8, 19.4, 22.4, 21.2, 16.0, 10.0, 6.7, 2.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2016, 1, [0.3, 6.2, 6.8, 11.9, 14.9, 19.3, 21.7, 19.2, 17.2, 9.7, 6.5, -0.7]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2017, 1, [-4.8, 3.9, 9.1, 10.7, 16.2, 20.7, 21.5, 21.2, 13.9, 10.9, 6.2, 2.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2018, 1, [4.6, -0.9, 3.9, 14.5, 17.5, 19.8, 21.1, 21.5, 16.4, 12.1, 7.4, 1.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placePtuj, 2019, 1, [0.1, 3.8, 8.2, 11.0, 12.7, 22.1, 21.5, 21.6, 16.0, ?, ?, ?]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 49 48 48
// id=2701 AVTOMATSKA !!  PTUJ (lon = 15.8492 lat = 46.4197 viš = 222m)
//addAvgTempYear(cv_placePtuj, 2016, 1, [?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.1 ?, -0.9]); // 48 48 48 48 48 48 48 48 48 48 479 4464
addAvgTempYear(cv_placePtuj, 2016, 1, [0.3, 6.2, 6.8, 11.9, 14.9, 19.3, 21.7, 19.2, 17.2, 9.7, 6.5, -0.9]); // kombiniram
addAvgTempYear(cv_placePtuj, 2017, 1, [-5.1, 3.7, 9.0, 10.6, 16.2, 20.8, 21.7, 21.3, 13.9, 10.8, 6.0, 2.5]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placePtuj, 2018, 1, [4.3, -1.2, 3.7, 14.4, 17.6, 19.8, 21.1, 21.6, 16.5, 12.0, 7.2, 1.4]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placePtuj, 2019, 1, [-0.2, 3.5, 8.0, 10.9, 12.8, 22.2, 21.5, 21.7, 16.2, 12.7, 8.3, 3.6]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placePtuj, 2020, 1, [0.1, 6.4, 6.9, 11.2, 14.6, 18.6, 20.3, 21.3, 16.1, 11.5, 4.6, 2.2]); // 4464 4176 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placePtuj, 2021, 1, [1.8, 4.1, 5.8, 8.5, 13.5, 21.5, 22.0, 19.2, 15.7, 9.2, 5.2, 1.5]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464
addAvgTempYear(cv_placePtuj, 2022, 1, [0.9, 4.6, 4.8, 9.7, 17.0, 21.3, 22.0, 21.6, 15.2, 13.0, 6.5, 2.7]); // 4464 4032 4464 4320 4464 4320 4464 4464 4320 4464 4320 4464

// id=1859 AVTOMATSKA !!  AJDOVŠČINA - DOLENJE (lon = 13.9013 lat = 45.8662 viš = 86m)
//addAvgTempYear(cv_placeAjdovscina, 1993, 1, [3.8 ?, 4.0, 6.2, 11.5, 18.0, 20.5, 20.7, 23.2, 16.4, 13.5, 6.3, 5.1]); // 288 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1993, 2, [4.0, 6.2, 11.5, 18.0, 20.5, 20.7, 23.2, 16.4, 13.5, 6.3, 5.1]); // 288 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1994, 1, [5.4, 4.6, 10.6, 11.6, 15.7, 19.5, 25.0, 22.8, 18.1, 12.5, 10.3, 4.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1995, 1, [3.6, 5.9, 6.8, 10.5, 15.3, 17.4, 23.8, 21.3, 15.7, 14.6, 7.3, 4.9]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1996, 1, [3.9, 2.1, 6.8, 11.8, 16.5, 20.5, 20.5, 21.1, 14.9, 12.9, 9.3, 4.0]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placeAjdovscina, 1997, 1, [4.2, 5.7, 9.9, 9.4, ?, 19.8, 20.8, 21.7, 19.3, 12.1, 8.7, 5.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1997, 1, [4.2, 5.7, 9.9, 9.4, 16.8, 19.8, 20.8, 21.7, 19.3, 12.1, 8.7, 5.7]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1998, 1, [5.3, 7.0, 7.7, 12.3, 17.1, 21.8, 23.1, 24.2, 17.8, 13.0, 7.9, 2.0]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 1999, 1, [4.1, 3.0, 8.7, 12.0, 17.7, 20.9, 23.2, 22.9, 19.8, 14.0, 6.8, 4.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2000, 1, [1.5, 5.4, 8.4, 13.8, 18.2, 22.5, 20.4, 22.9, 18.5, 15.4, 10.3, 6.8]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2001, 1, [6.0, 6.4, 10.1, 11.2, 19.0, 19.5, 22.7, 24.6, 15.4, 16.1, 7.1, 2.5]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2002, 1, [3.2, 6.1, 10.6, 12.5, 17.5, 22.6, 23.1, 21.8, 17.3, 13.9, 11.1, 5.9]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2003, 1, [3.1, 2.6, 8.6, 11.4, 19.1, 24.8, 24.4, 25.9, 17.9, 11.3, 10.3, 5.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2004, 1, [2.3, 3.7, 7.4, 12.9, 14.8, 20.2, 23.3, 22.2, 18.9, 14.2, 8.5, 5.6]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placeAjdovscina, 2005, 1, [2.6, 2.8, 6.8, 11.5, 17.5, 20.9, 22.9, 20.5, 19.0, 14.1, 12.6, ?]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2005, 1, [2.6, 2.8, 6.8, 11.5, 17.5, 20.9, 22.9, 20.5, 19.0, 14.1, 12.6, 6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
//addAvgTempYear(cv_placeAjdovscina, 2006, 1, [?, ?, ?, 14.9, 16.4, 21.3, 26.1, 19.3, 19.4, 16.3, 9.6, 6.5]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2006, 1, [4.2, 5.1, 8.9, 14.9, 16.4, 21.3, 26.1, 19.3, 19.4, 16.3, 9.6, 6.5]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2007, 1, [5.8, 7.4, 11.0, 15.8, 18.8, 21.9, 22.5, 21.6, 16.8, 13.0, 7.4, 4.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2008, 1, [5.8, 5.1, 8.1, 11.6, 17.6, 21.4, 22.5, 22.9, 17.3, 13.6, 8.8, 4.9]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2009, 1, [4.1, 4.4, 7.8, 14.2, 18.8, 20.0, 22.5, 24.0, 20.4, 13.5, 9.7, 4.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2010, 1, [1.9, 4.3, 7.3, 12.9, 15.7, 20.7, 23.6, 21.6, 17.3, 12.4, 9.7, 2.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2011, 1, [3.0, 5.0, 8.3, 13.9, 18.3, 21.3, 21.6, 23.9, 21.9, 12.6, 7.7, 5.5]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2012, 1, [2.1, 1.0, 11.5, 12.1, 16.4, 21.9, 24.2, 25.0, 19.9, 14.6, 11.0, 3.9]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2013, 1, [4.3, 4.1, 6.9, 13.0, 15.6, 20.0, 24.6, 23.5, 18.2, 14.3, 9.9, 5.6]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2014, 1, [7.7, 8.1, 10.9, 14.0, 15.7, 20.7, 20.7, 21.0, 17.9, 15.6, 11.6, 6.3]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2015, 1, [5.0, 5.6, 9.9, 11.8, 17.9, 21.5, 25.0, 23.5, 18.6, 13.9, 8.0, 5.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2016, 1, [3.3, 7.4, 8.8, 13.1, 15.8, 20.7, 23.8, 22.8, 20.3, 13.0, 9.2, 4.2]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2017, 1, [0.9, 6.9, 11.2, 12.7, 17.0, 22.1, 22.8, 24.2, 16.3, 13.0, 8.4, 3.8]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2018, 1, [6.1, 3.1, 6.9, 15.3, 19.7, 21.5, 22.8, 24.4, 19.7, 16.4, 11.0, 4.2]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2019, 1, [2.8, 6.8, 10.0, 12.9, 13.8, 24.1, 23.5, 24.0, 18.8, 14.4, 11.1, 6.4]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2020, 1, [4.8, 7.4, 8.7, 13.4, 16.4, 19.6, 22.5, 23.3, 19.8, 12.6, 9.0, 6.4]); // 1488 1392 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2021, 1, [3.8, 7.1, 7.6, 10.3, 14.5, 22.2, 23.8, 22.2, 19.2, 13.0, 9.3, 5.0]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488
addAvgTempYear(cv_placeAjdovscina, 2022, 1, [3.5, 5.7, 7.8, 11.3, 18.8, 23.8, 25.7, 24.4, 17.9, 16.2, 10.2, 7.1]); // 1488 1344 1488 1440 1488 1440 1488 1488 1440 1488 1440 1488

//---- podatki so vpisani, zdaj je treba za vsako lokacijo določiti offset, se pravi za koliko mesecev naprej od splošno prvega podatka se začnejo podatki posamezne lokacije
for (place = 1; place <= nrPlaces; place++) {
    offsetMonths[place] = (12 * minYear[place] + minMonth[place]) - (12 * minYearAll + minMonthAll); //4.12.2023
    firstMonth[place] = 1 + offsetMonths[place];              //prvi mesec podatkov te lokacije, zaporedno relativno glede na splošno prvi mesec vseh podatkov
    lastMonth[place] = offsetMonths[place] + nrMonths[place]; //zadnji mesec podatkov te lokacije, zaporedno relativno glede na splošno prvi mesec vseh podatkov
}

//---- med intervali nedefiniranih podatkov je potrebno nastaviti pravilne indekse mesecev
let undefDataPeriodIndex;
for (undefDataPeriodIndex = 1; undefDataPeriodIndex <= nrUndefDataPeriods; undefDataPeriodIndex++) {
    // zaporedna številka meseca v globalu
    undefDataPeriodMonthIndexStart[undefDataPeriodIndex] = lf_getMonthDataIndex(undefDataPeriodMonthStart[undefDataPeriodIndex], undefDataPeriodYearStart[undefDataPeriodIndex]);
    undefDataPeriodMonthIndexEnd[undefDataPeriodIndex] = lf_getMonthDataIndex(undefDataPeriodMonthEnd[undefDataPeriodIndex], undefDataPeriodYearEnd[undefDataPeriodIndex]);
    // zaporedna številka meseca znotraj niza podatkov lokacije
    undefDataPeriodPlaceMonthIndexStart[undefDataPeriodIndex] = undefDataPeriodMonthIndexStart[undefDataPeriodIndex] - offsetMonths[undefDataPeriodPlace[undefDataPeriodIndex]];
    undefDataPeriodPlaceMonthIndexEnd[undefDataPeriodIndex] = undefDataPeriodMonthIndexEnd[undefDataPeriodIndex] - offsetMonths[undefDataPeriodPlace[undefDataPeriodIndex]];
}

//---- normalizacija/korekcija določenih podatkov
let normalizePeriod
for (normalizePeriod = 1; normalizePeriod <= nrNormalizePeriods; normalizePeriod++) {
    //normalizePlaceDataPeriod(cv_placeKrvavec, 1, 1961, 4, 1973, -1.2); //višina dvignjena za 264m, v nižje T !!! Zato normalizacija z -1.2 stopinje, to pa pride iz razlike Kredarica:Krvavec 2513:1790 diff=4.5 stopinje, se pravi okoli 0.6 stopinje na 100m višine
    normalizePlaceDataPeriod(normalizePeriodPlace[normalizePeriod], normalizePeriodMonthStart[normalizePeriod], normalizePeriodYearStart[normalizePeriod], normalizePeriodMonthEnd[normalizePeriod], normalizePeriodYearEnd[normalizePeriod], normalizePeriodValueCorrection[normalizePeriod]); 
}

//let tmpStr = "from: " + minMonthAll.toString() + "." + minYearAll.toString() + ", to: " + maxMonthAll.toString() + "." + maxYearAll.toString() + ", nrMonthsAll=" + nrMonthsAll.toString();
//console.log(tmpStr)

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
//----
var gl_deltaT = false; // 22.12.2023 ali gledamo T(t) ali pa deltaT(t)
//var gl_deltaTavgMonths = 24;
var gl_deltaTLast = gl_deltaT; // 22.12.2023
//----
var gl_showAvgAllPlace = false; // 22.12.2023
var gl_showAvgAllPlaceLast = gl_showAvgAllPlace; // 23.12.2023
//---- nivo prikaza imena lokacije (15.12.2023)
const cv_showPlaceNameLevel_none = 0;
const cv_showPlaceNameLevel_abbr = 1;
const cv_showPlaceNameLevel_short = 2;
const cv_showPlaceNameLevel_full = 3;
const cv_showPlaceNameLevelMin = 0;
const cv_showPlaceNameLevelMax = 3;
var gl_showPlaceNameLevel = cv_showPlaceNameLevel_short;

//---- izbrana časovna enota poseznega podatka, lahko je vse, posamezen mesec, ali pa posamezen letni čas
const cv_timeSliceAll = 0;
const cv_timeSliceMonthMin = 1;
const cv_timeSliceMonthMax = 12;
const cv_timeSliceWinter = 13; // dec/jan/feb
const cv_timeSliceSpring = 14; // mar/apr/maj
const cv_timeSliceSummer = 15; // jun/jul/avg
const cv_timeSliceAutumn = 16; // sep/okt/nov
const cv_timeSliceMonth = 17;  // by month
const cv_timeSliceSeason = 18; // by season
//----
const cv_timeSliceMin = 0;
const cv_timeSliceMax = 16;
const cv_timeSliceSeasonMin = 13;
const cv_timeSliceSeasonMax = 16;
const cv_timeSliceMaxAll = 18; //11.12.2023
//----
var gl_timeSlice = cv_timeSliceAll;
var gl_timeSliceLast = gl_timeSlice; // 19.12.2023


var gl_sameScaleY = false; //24.10.2023
var gl_showExactValuesToo = false; //6.12.2023 ali naj se v primeru povprečenja poleg povprečja izrišejo še točne vrednosti
var gl_showExactLinesToo = false; //6.12.2023 ali naj se v primeru povprečenja poleg povprečja izrišejo še točne vrednosti
var gl_showAvgFuzzyStartOscilations = false; //12.12.2023

const cv_graphType_vaccExcessDeath = 1;
const cv_graphType_timeAvgTemp = 2;

const cv_nrMonthsAvgMin = 0;   //3.12.2023
const cv_nrMonthsAvgMax = 9;   //3.12.2023
const cv_nrMonthsAvgMaxExceed = 19;   //3.12.2023
const cv_nrMonthsAvgMult = 12; //3.12.2023
var lo_nrMonthsAvg = 5
var lo_nrMonthsAvgLast = lo_nrMonthsAvg; // 19.12.2023
var lo_nrMonthsAvgOld = 5                   // 25.1.2023 v1.1
var lo_nrMonthsAvgAll = false;
var lo_enabledIntChooserNrMonthsAvg = true; // 25.1.2023 v1.1
//---- 22.12.2023
const cv_nrSmoothYearsMin = 0;   
const cv_nrSmoothYearsMax = 3;  
const cv_nrSmoothYearsMaxExceed = 19; 
const cv_nrSmoothYearsMult = 12; 
var lo_nrSmoothYears = 1
var lo_nrSmoothYearsLast = lo_nrSmoothYears;
var lo_enabledIntChooserSmoothYears = gl_deltaT; 
//----

var gl_monthEnd = nrMonthsAll;
//var gl_monthEndLast = gl_monthEnd; // 19.12.2023
var gl_tailMonths = 5  //za koliko mesecev nazaj se še riše od trenutno izbranega meseca gl_monthEnd
var gl_monthStart = 1; //gl_monthEnd - gl_tailMonths  //28=apr2022 30=jun2022 35=nov2022 36=dec2022
//var gl_monthStartLast = gl_monthStart; // 19.12.2023
var lo_tipMonth = 0;

var lo_keyDownA = false
var lo_keyDownT = false
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
var gl_changeByMouseWheel_timeSlice = false;   //21.12.2023
var gl_changeByMouseWheel_nrSmoothYears = false; //22.12.2023
//----
const cv_addMarkWidthMin = -1; //13.12.2023
const cv_addMarkWidthMax = 3; //13.12.2023
var lo_addMarkWidth = 0; //13.12.2023

const cv_addRightMarginMin = -200;   //15.12.2023
const cv_addRightMarginMax = 100;   //15.12.2023
const cv_addRightMarginMult = 10; //15.12.2023
var lo_addRightMargin = 0;        //15.12.2023

var lo_graphMarginLeft, lo_graphMarginTop, lo_graphMarginRight, lo_graphMarginBottom;

var lo_showGUI = true
var lo_showHelpTips = true
var lo_showStations = false

var lo_showToolTips = true

// 29.7.2023 1.29
var tmMouseOutOfWindowId 
var lo_mouseOut = true  

// 26.1.2023 1.3
var lo_autoPlay = false  
var tmAutoPlayId                
var lo_autoPlayStarting = false 

//var cv_privateFormBorder  = 2
//var lo_penFrg1 As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpPen As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpBrush As SolidBrush = New SolidBrush(Color.DarkSlateGray)

var lo_mouseMoveX  = 0
var lo_mouseMoveY  = 0 

var lo_mouseDown = false
var lo_mouseDownX, lo_mouseDownY;

var lo_lastMouseLocation 

//var lo_mouseAboveSliderMonthEnd = false
var lo_dragMonthEndActive = false
var lo_dragIntervalStartActive = false //2.2.2023 v1.11
var lo_dragIntervalEndActive = false   //2.2.2023 v1.11
var lo_dragTailMonthsActive = false
var lo_dragIntervalIgnoreFirstClick = false;

const lo_backgroundColor = "whiteSmoke"
const disabledControlLineColor = "silver";
const disabledControlBackColor = "#F0F0F0FF";
const disabledControlTextColor = "silver";
const focusedColor = "lightYellow";

var lo_linearGradientFill = false
var lgfc1x, lgfc1y, lgfc2x, lgfc2y, lgfc1, lgfc2, lgfc3, lgfcs1, lgfcs2, lgfcs3;
var lo_radialGradientFill = false
var rgfc1x, rgfc1y, rgfc1r, rgfc2x, rgfc2y, rgfc2r, rgfc1, rgfc2, rgfc3, rgfcs1, rgfcs2, rgfcs3;

class placePanel {
    constructor(left, top, right, itemHeight, enabled, disabledColor, font, fillColor, strokeWidth, strokeColor, shaddowColor, shaddowX, shaddowY, backColor, visible ) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.itemHeight = itemHeight;
        this.enabled = enabled;
        this.disabledColor = disabledColor;
        this.font = font;
        this.fillColor = fillColor;
        this.strokeWidth = strokeWidth;
        this.strokeColor = strokeColor;
        this.shaddowColor = shaddowColor;
        this.shaddowX = shaddowX;
        this.shaddowY = shaddowY;
        this.backColor = backColor;
        this.visible = visible;
        //---- additional object properties
        this.textTop = this.top + 5;
        this.textRight = this.right - pickPlaceLeftDiff;
    }
    paint() {
        if (!this.visible) { return };
        let tmpW, tmpH, x, y, color
        if (this.backColor != "") {
            for (place = 1; place <= nrPlaces; place++) {
                ;[tmpW, tmpH] = gMeasureText(placeNameAbbr[place], this.font);
                x = this.textRight - tmpW;
                y = this.textTop + (place - 1) * this.itemHeight;
                if (!lo_enabledPlace[place]) { color = this.disabledColor }
                switch (place) {
                    case 1: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 9, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                    case nrPlaces: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 11, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                    default: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 16, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                }
                //if (place == 1 || place == nrPlaces) {
                //    gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 9, this.backColor, 0, "", "", "", "", "", 0, 0)
                //} else { gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 16, this.backColor, 0, "", "", "", "", "", 0, 0) }
            }
        }
        for (place = 1; place <= nrPlaces; place++) {
            ;[tmpW, tmpH] = gMeasureText(placeNameAbbr[place], this.font);
            //x = ctxW - tmpW - pickPlaceLeftDiff; y = pickPlaceTop + (place - 1) * pickPlaceHeight;
            x = this.textRight - tmpW;
            y = this.textTop + (place - 1) * this.itemHeight;
            color = placeColor[place]
            if (!lo_enabledPlace[place]) { color = this.disabledColor }
            gBannerRectWithText(x, y, x + tmpW, y + tmpH, 3, 3, this.fillColor, this.strokeWidth, this.strokeColor, this.font, color, placeNameAbbr[place], this.shaddowColor, this.shaddowX, this.shaddowY)
        }
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        //---- če miška ni nad področjem gumbov lokacij
        if (mouseX >= (this.left) && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + nrPlaces * this.itemHeight))
             { return true; }
        else { return false; };
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible) { return cv_placeNone };
        //---- če klik ni bil na lokacijah
        if (!this.eventMouseWithin(mouseX, mouseY)) { return cv_placeNone };
        //if (!(mouseX >= (this.left) && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + nrPlaces * this.itemHeight))) {
        //    return -100;
        //}
        //---- na katero lokacijo je bil klik
        let y0, y1;
        for (place = cv_minPlace; place <= nrPlaces; place++) {
            y0 = this.top + (place - 1) * this.itemHeight;
            y1 = this.top + place * this.itemHeight;
            if (mouseY >= y0 && mouseY <= y1) {
                return place
            }
        }
        return cv_placeNone;  //-100;
    }
    eventDblClick(mouseX, mouseY) {
        if (!this.visible) { return false };
        //---- če dvojni klik ni bil na lokacijah
        if (!(mouseX >= this.left && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + nrPlaces * this.itemHeight)))
             { return false }
        else { return true };
    }
    eventMouseOverValue(mouseX, mouseY) {
        return this.eventClick(mouseX, mouseY); //ker eventClick() ne postavlja nobenega propertija objekta, lahko uporabim kar ta surogat
    }
    adjustToCtxWidth() {
        this.left = ctxW - pickPlaceLeftDiff - 45;
        this.textRight = ctxW - pickPlaceLeftDiff;
        this.right = ctxW;
    }
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
    constructor(left, top, items, value, minItemValue, step, focusMargin, arrowWidth, arrowHeight, arrowGap, arrowColor, color, fillColor, crossColor, text, font, gap, posAlign, textColor, clickGap, enabled, disabledColor, disabledTextColor, visible) {
        this.left = left; this.top = top;
        this.items = items; this.value = value; this.minItemValue = minItemValue; this.step = step;
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
        tmpStr = this.value.toString();
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
        gBannerRoundRectWithText(textLeft, textTop, textWidth, textHeight, this.font, this.color, this.value.toString(), this.gap, this.gap, 7, "white", 1, "lightGray", "#D0D0D040", 2, 2, true)
        //ctx.beginPath(); ctx.rect(bannerLeft, bannerTop, bannerWidth, bannerHeight); ctx.closePath(); ctx.setLineDash([]); ctx.strokeStyle = "gray"; ctx.strokeWidth = 1; ctx.stroke();
        //ctx.beginPath(); ctx.rect(textLeft, textTop, textWidth, textHeight); ctx.closePath(); ctx.setLineDash([]); ctx.strokeStyle = "gray"; ctx.strokeWidth = 1; ctx.stroke();
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
        let y1 = this.top + this.height;
        //console.log("x0=" + x0 + " x1=" + x1 + " y0=" + y0 + " y1=" + y1);
        if (mouseX >= x0 && mouseX <= x1 && mouseY >= y0 && mouseY <= y1) { return true; } else { return false; }
    }
    eventMouseOverOption(mouseX, mouseY, returnItem) {
        //console.log("eventMouseWithin(mouseX=" + mouseX + ", mouseY=" + mouseY + ")")
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
        return 1;


        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
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
        switch (this.posAlign) {
            case "above-middle": //above-middle
                ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
                let textColor = this.enabled ? this.textColor : this.disabledTextColor;
                gText(this.text, this.font, textColor, this.left + (this.width - tmpW) / 2, this.top - this.gap);
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
        var buttonMode = new button(guiPanelLeft, guiPanelTop + 10, 60, 28, "Mode", "bold 10pt verdana", "gray", "darkSlateGray", 1, "gray", "darkSlateGray", "lightGoldenrodYellow", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true);
        var intChooserNrMonthsAvg = new intChooser(guiPanelLeft, guiPanelTop + 16, 180, cv_nrMonthsAvgMax - cv_nrMonthsAvgMin + 1, lo_nrMonthsAvg, cv_nrMonthsAvgMin, 1, true, "burlyWood", "white", "orangeRed", "crimson", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserNrMonthsAvg, disabledControlLineColor, disabledControlTextColor, true, "Averaging period", "A(+mWheel)");
        var checkBoxNrMonthsAvgAll = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "all", "gray", "normal 10pt verdana", 4, "above-middle", lo_nrMonthsAvgAll, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Use all data for averaging", "S");
        var checkBoxDeltaT = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, scDelta + "T", "gray", "normal 10pt verdana", 4, "above-middle", gl_deltaT, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Calculate differences over 10 years", "L");
        var checkBoxAvgAllPlace = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "AVG", "gray", "normal 10pt verdana", 4, "above-middle", gl_showAvgAllPlace, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true, "Average selected stations", String.fromCharCode(0x0110));
        var intChooserSmoothYears = new intChooser(guiPanelLeft, guiPanelTop + 16, 80, cv_nrSmoothYearsMax - cv_nrSmoothYearsMin + 1, lo_nrSmoothYears, cv_nrSmoothYearsMin, 1, true, "burlyWood", "white", "orangeRed", "crimson", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserSmoothYears, disabledControlLineColor, disabledControlTextColor, false, "Smoothing period", "O(+mWheel)");
        var sliderTailMonths = new slider(guiPanelLeft, guiPanelTop + 42, 500, nrMonthsAll, gl_tailMonths, 0, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        var sliderMonthEnd = new slider2(guiPanelLeft, guiPanelTop + 90, 500, nrMonthsAll, gl_monthStart, true, gl_monthEnd, 1, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        var buttonPlay = new buttonPlayPauseStop(sliderMonthEnd.right + 10, guiPanelTop + 6, 23, 24, "play", 1, "gray", "darkSlateGray", "honeydew", 2, "lightGray", 2, 2, false, true, disabledControlBackColor, true);
        var placePanelToggle = new placePanel(ctxW - pickPlaceLeftDiff - 41, pickPlaceTop, ctxW, pickPlaceHeight, true, "darkGray", "bold 10pt verdana", "white", 1, "lightGray", "gray", 2, 2, "#E0E0E0FF", true);
        //var intChooserNrMonthsAvg2 = new intChooser2H(guiPanelLeft, guiPanelTop + 160, 46, lo_nrMonthsAvg, 0, 1, 3, 9, 17, 3, "burlyWood", "black", "white", "orangeRed", "", "bold 12pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserNrMonthsAvg, disabledControlLineColor, disabledControlTextColor, true);
}
var lo_GUIlayoutHasChanged = true;
var lo_currentMonthTextLeft = 400; var lo_currentMonthTextTop = 20;
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
//placePanelToggle.right = ctxW - pickPlaceLeftDiff; // 27.1.2023 v1.4
//placePanelToggle.left = placePanelToggle.right - 41;
placePanelToggle.adjustToCtxWidth();

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
    lf_changeNrMonthsAvg(lo_nrMonthsAvg, false);
    lf_changeTimeSlice(gl_timeSlice, false); //10.12.2023
    lf_changeNrSmoothYears(lo_nrSmoothYears, false); // 22.12.2023
    lf_setMode(gl_mode, false);
    lf_changeMonthEnd(gl_monthEnd, false);

    paint();
    
    tmHideTipsId = setTimeout(tmHideTips_tick, 6000); //po 6 sekundah naj se tipsi sami postopoma ugasnejo

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
    lo_dragMonthEndActive = sliderMonthEnd.eventMouseWithin(e.offsetX, e.offsetY); //lo_mouseAboveSliderMonthEnd
    lo_dragTailMonthsActive = sliderTailMonths.eventMouseWithin(e.offsetX, e.offsetY); 
    //console.log("---------------------------------------------------------")
    //console.log("      mousedown(): dragMonthEndActive=" + lo_dragMonthEndActive)

});
elMyCanvas.addEventListener('mouseup', (e) => {
    lo_mouseDown = false
    lo_dragMonthEndActive = false
    if (lo_dragIntervalStartActive || lo_dragIntervalEndActive) { lo_dragIntervalIgnoreFirstClick = true; };
    lo_dragIntervalStartActive = false
    lo_dragIntervalEndActive = false
    lo_dragTailMonthsActive = false
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
    if (!vl_end && lo_showGUI) {
        boolRslt = buttonMode.eventClick(e.offsetX, e.offsetY);
        if (boolRslt) {
            lf_changeMode(e.shiftKey, true)
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserNrMonthsAvg) {
        rslt = intChooserNrMonthsAvg.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (rslt >= cv_nrMonthsAvgMin && rslt != lo_nrMonthsAvg) {
            lf_changeNrMonthsAvg(rslt, true);
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI) {
        boolRslt = checkBoxNrMonthsAvgAll.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != lo_nrMonthsAvgAll) {
            lf_changeNrMonthsAvgAll(boolRslt, true)
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI) {
        boolRslt = checkBoxDeltaT.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_deltaT) {
            lf_changeDeltaT(boolRslt, true)
            vl_end = true
        }
    }  
    if (!vl_end && lo_showGUI) {
        boolRslt = checkBoxAvgAllPlace.eventClick(e.offsetX, e.offsetY);
        if (boolRslt != gl_showAvgAllPlace) {
            lf_changeAvgAllPlace(boolRslt, true)
            vl_end = true
        }
    }      
    if (!vl_end && lo_showGUI && lo_enabledIntChooserSmoothYears) {
        rslt = intChooserSmoothYears.eventClick(e.offsetX, e.offsetY)
        //console.log("click(): rslt=" + rslt.toString())
        if (rslt >= cv_nrSmoothYearsMin && rslt != lo_nrSmoothYears) {
            lf_changeNrSmoothYears(rslt, true);
            vl_end = true
        }
    }    
    if (!vl_end && lo_showGUI & !lo_dragIntervalIgnoreFirstClick) {
        rslt2 = sliderMonthEnd.eventClick(e.offsetX, e.offsetY);
        //console.log("  [value0, value]=" + rslt2)
        if (rslt2[0] >= 1 && rslt2[0] != gl_monthStart) {
            //console.log("  rslt2[0]=" + rslt2[0])
            lf_changeMonthStart(rslt2[0], true);
            vl_end = true
        } else if (rslt2[1] >= 1 && rslt2[1] != gl_monthEnd) {
            //console.log("  rslt2[1]=" + rslt2[1])
            lf_changeMonthEnd(rslt2[1], true);
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI) {
        boolRslt = buttonPlay.eventClick(e.offsetX, e.offsetY);
        if (boolRslt) {
            lf_changeAutoPlay(!lo_autoPlay);
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI) {
        rslt = placePanelToggle.eventClick(e.offsetX, e.offsetY);
        if (rslt >= 1 && rslt <= nrPlaces) {
            lo_enabledPlace[rslt] = !lo_enabledPlace[rslt];
            paint_graph_timeAvgTemp_cache_avgAllPlace(); // 24.12.2023
            paint()
            vl_end = true
        }
    }
    if (lo_dragIntervalIgnoreFirstClick) { lo_dragIntervalIgnoreFirstClick = false; } //4.2.2023 v1.12
});

elMyCanvas.addEventListener('dblclick', (e) => {

    let rslt, place
    let vl_end = false
    if (!vl_end && lo_showGUI) {
        rslt = placePanelToggle.eventDblClick(e.offsetX, e.offsetY);
        if (rslt) {
            lf_changeEnablePlaceAll(!lo_enabledPlaceAll, true);
            vl_end = true
        }
    }

});

elMyCanvas.addEventListener('mousemove', (e) => {

    //console.log("mouse_move() enter")
    //console.log("mouseMove:mouseIn x=" + e.offsetX.toString() + " y=" + e.offsetY.toString())
    //console.log("event mouseMove(): x=" + e.offsetX.toString() + " y=" + e.offsetY.toString());
    
    //if (lo_mouseOut) { console.log("mouseMove:mouseIn x=" + e.offsetX.) }
    lo_mouseOut = false; //29.7.2023

    // mouse cursors: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_cursor2

    let vl_oldFocusPlace = lo_focusPlace;
    lo_focusPlace = cv_placeNone;

    //Vlečenje okna / GUI elementov
    if (lo_mouseDown) {
        if (lo_dragMonthEndActive) {
            //console.log("      mousemove(): drag the monthStart or monthEnd slider")
            sliderMonthEnd.setAddZone(100, 100)
            let rslt = sliderMonthEnd.eventMouseOverValue(e.offsetX, e.offsetY)
            sliderMonthEnd.setAddZone(0, 0)
            //console.log("      mousemove(): slider overValue=" + rslt)
            if (rslt >= 0) { lf_dragInterval(rslt); }
            return;
        }
        else {
            //Me.Location = New Point((Me.Location.X - lo_lastMouseLocation.X) + e.X, (Me.Location.Y - lo_lastMouseLocation.Y) + e.Y)
            //Me.Update()
            //console.log("mouse_move-drag")
            //return;
        }
    }

    //23.1.2023 v1.0 Je miška nad kakšnim kontrolerjem?
    if (lo_showGUI) {
        if (buttonMode.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
        else if (intChooserNrMonthsAvg.eventMouseOverOption(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (checkBoxNrMonthsAvgAll.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
        else if (checkBoxDeltaT.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
        else if (checkBoxAvgAllPlace.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }            
        else if (intChooserSmoothYears.eventMouseOverOption(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
        else if (buttonPlay.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
        else if (placePanelToggle.eventMouseWithin(e.offsetX, e.offsetY)) {
            document.body.style.cursor = "pointer";
            let place = placePanelToggle.eventMouseOverValue(e.offsetX, e.offsetY);
            lo_focusPlace = cv_placeNone;
            if (lf_regularPlace(place)) {
                if (lo_enabledPlace[place]) { lo_focusPlace = place; };
            } else {
                document.body.style.cursor = "default"
            }
        } else { document.body.style.cursor = "default" }
    } else { document.body.style.cursor = "default" };
        
    //if (lf_mouseOverScatterPlotDataPoint(e.offsetX, e.offsetY)) { }
    //else { document.body.style.cursor = "default"; };

    if (lo_focusPlace != vl_oldFocusPlace) {
        //console.log("focusPlace=" + lo_focusPlace);
        //paint_delay()
    }
    
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
    let maxDiff;
    //---- če vrti kolešček miške ob pritisnjeni tipki T, s tem spreminja dolžino "repa"
    if (lo_keyDownA) {
        if (lo_enabledIntChooserNrMonthsAvg) {
            lf_changeValueNrMonthsAvg(delta);
            gl_changeByMouseWheel_nrMonthsAvg = true; // 21.12.2023
            lf_changeNrMonthsAvg(lo_nrMonthsAvg, true);
        }
        return
    }
    else if (lo_keyDownT) {
        lf_changeValueTimeSlice(delta);
        gl_changeByMouseWheel_timeSlice = true; // 21.12.2023
        //console.log("WHEEL: true");
        lf_changeTimeSlice(gl_timeSlice, true);
        return
    }
    if (lo_keyDownO) {
        if (lo_enabledIntChooserSmoothYears) {
            lf_changeValueNrSmoothYears(delta);
            gl_changeByMouseWheel_nrSmoothYears = true; // 22.12.2023
            lf_changeNrSmoothYears(lo_nrSmoothYears, true);
        }
        return
    }        
    else if (lo_keyDown0) {
        if (sliderMonthEnd.useValue0) {
            gl_monthStart -= delta;
            if (gl_monthStart < 1) { gl_monthStart = 1 };
            if (gl_monthStart > gl_monthEnd) { gl_monthStart = gl_monthEnd };
            lf_changeMonthStart(gl_monthStart, true);
        }
        return
    }
    else if (lo_keyDownU) {
        maxDiff = 20;
        lo_addTempMarginUp += delta;
        if (lo_addTempMarginUp > maxDiff) { lo_addTempMarginUp = maxDiff };
        if (lo_addTempMarginUp < -maxDiff) { lo_addTempMarginUp = -maxDiff };
        //console.log("lo_addTempMarginUp=" + lo_addTempMarginUp.toString())
        paint();
        return
    }
    else if (lo_keyDownD) {
        maxDiff = 20;
        lo_addTempMarginDown += delta;
        if (lo_addTempMarginDown > maxDiff) { lo_addTempMarginDown = maxDiff };
        if (lo_addTempMarginDown < -maxDiff) { lo_addTempMarginDown = -maxDiff };
        //console.log("lo_addTempMarginDown=" + lo_addTempMarginDown.toString())
        paint();
        return        
    }
    else if (lo_keyDownW) {
        lo_addMarkWidth -= delta;
        if (lo_addMarkWidth > cv_addMarkWidthMax) { lo_addMarkWidth = cv_addMarkWidthMax };
        if (lo_addMarkWidth < cv_addMarkWidthMin) { lo_addMarkWidth = cv_addMarkWidthMin };
        //console.log("lo_addMarkWidth=" + lo_addMarkWidth.toString())
        paint();
        return        
    }  
    else if (lo_keyDownE) {
        lo_addRightMargin -= delta * cv_addRightMarginMult;
        if (lo_addRightMargin > cv_addRightMarginMax) { lo_addRightMargin = cv_addRightMarginMax };
        if (lo_addRightMargin < cv_addRightMarginMin) { lo_addRightMargin = cv_addRightMarginMin };
        //console.log("lo_addRightMargin=" + lo_addRightMargin.toString())
        paint();
        return        
    }      
    //---- ... sicer spreminja (končni) mesec prikaza
    gl_monthEnd -= delta;
    if (gl_monthEnd > nrMonthsAll) { gl_monthEnd = nrMonthsAll };
    switch (gl_mode) {
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (gl_monthEnd < 1) { gl_monthEnd = 1 }; break;
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace:
            if (gl_monthEnd < gl_monthStart) { gl_monthEnd = gl_monthStart }; break;
    }
    lf_changeMonthEnd(gl_monthEnd, true);
});

window.addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'ShiftLeft':
            lo_keyDownShiftLeft = true; console.log(lo_keyDownShiftLeft); break;
        case 'KeyA':
            lo_keyDownA = true; break;
        case 'KeyO':
            lo_keyDownO = true; break;
        case 'KeyT':
            lo_keyDownT = true;
            //gl_changeByMouseWheel_timeSlice = false; //sem pogruntal, da zaradi multiple keyDown eventov tegale ne smem imeti tu. Na FALSE se itak postavi po obdelavi keyUp eventa
            //console.log("DOWN: false");
            break;
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
            lf_changeMonthEnd(lf_changeVar(gl_monthEnd, 1, 1, nrMonthsAll), true)
            break;
        case 'ArrowLeft':
            lf_changeMonthEnd(lf_changeVar(gl_monthEnd, -1, 1, nrMonthsAll), true)
            break;
        case 'Home':
            //if (sliderMonthEnd.useValue0) { lf_changeMonthEnd(gl_monthStart, true) } else { lf_changeMonthEnd(1, true) }; break;
            if (sliderMonthEnd.useValue0) { lf_changeMonthStart(1, true) } else { lf_changeMonthEnd(1, true) }; break; //11.12.2023
        case 'End':
            lf_changeMonthEnd(nrMonthsAll, true); break;
        case 'KeyH':
            lo_showGUI = !lo_showGUI; lo_GUIlayoutHasChanged = true; paint(); break;
        case 'KeyS':
            lf_changeNrMonthsAvgAll(!lo_nrMonthsAvgAll, true); break;
        case 'KeyL':
            lf_changeDeltaT(!gl_deltaT, true); break;
        case 'KeyC':
            lf_changeEnablePlaceAll(!lo_enabledPlaceAll, true); break;
        case 'KeyN': case 'F2':
            lf_changeShowHelpTips(!lo_showHelpTips, true); break;
        case 'KeyI':
            lf_changeShowToolTips(!lo_showToolTips, true); break;
        //case 'F5':
        //console.log("F5 pressed"); lf_changeAutoPlay(!lo_autoPlay); break;
        case 'KeyP':
            //console.log("P pressed");
            lf_changeAutoPlay(!lo_autoPlay); break;
        case 'KeyM':
            //console.log("M pressed"); 
            lf_changeMode(event.shiftKey, true); break;
        case 'KeyY': case 'KeyZ': //24.10.2023
            //console.log("Y pressed");
            lf_changeSameScaleY(!gl_sameScaleY, true); break;
        case 'KeyQ': //18.11.2023
            //console.log("W pressed");
            lf_resizeWindowToFullHD(true); break;
        case 'KeyV': //6.12.2023
            //console.log("V pressed");
            lf_changeShowExactValuesToo(true); break;
        case 'KeyX': //6.12.2023
            //console.log("V pressed");
            gl_showAvgFuzzyStartOscilations = !gl_showAvgFuzzyStartOscilations; paint(); break;
        case 'KeyB': //15.12.2023
            //console.log("B pressed"); 
            // if (event.shiftKey) { } //... takole bi preverjal SHIFT tipko
            // if (event.ctrlKey) { } //... takole bi preverjal CTRL tipko
            lf_changeShowPlaceNameLevel(true); break;
        case 'F9':
            lf_changeShowStations(!lo_showStations, true); break;
        case 'BracketRight': // "Đ" //23.12.2023 pritisk na tipko "Đ"
            //console.log("V pressed");
            lf_changeAvgAllPlace(!gl_showAvgAllPlace, true); break;
    }
});

window.addEventListener("keyup", (event) => {
    
    switch (event.code) {
        case 'KeyA':
            lo_keyDownA = false;
            // 21.12.2023 Ali spreminja vrednost gl_timeSlice samo s pomočjo tipke T brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_nrMonthsAvg) {
                // 21.12.2023 tole je primer spreminjanja spremenljivke samo s pomočjo tipke T  // obratno: že med vrtenjem koleščka smo spreminjali vrednost spremenljivke
                //console.log("UP: process keyPress(T)");
                if (event.shiftKey) { lf_changeValueNrMonthsAvg(1) } else { lf_changeValueNrMonthsAvg(-1) };
                lf_changeNrMonthsAvg(lo_nrMonthsAvg, true);
            }
            gl_changeByMouseWheel_nrMonthsAvg = false;
            break;
        case 'KeyO':
            lo_keyDownO = false;
            // Ali spreminja vrednost samo s pomočjo tipke brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_nrSmoothYears) {
                // 21.12.2023 tole je primer spreminjanja spremenljivke samo s pomočjo tipke // obratno: že med vrtenjem koleščka smo spreminjali vrednost spremenljivke
                //console.log("UP: process keyPress(T)");
                if (event.shiftKey) { lf_changeValueNrSmoothYears(1) } else { lf_changeValueNrSmoothYears(-1) };
                lf_changeNrSmoothYears(lo_nrSmoothYears, true);
            }
            gl_changeByMouseWheel_nrSmoothYears = false;
            break;
        case 'KeyT':
            lo_keyDownT = false;
            // 21.12.2023 Ali spreminja vrednost gl_timeSlice samo s pomočjo tipke T brez vrtenja koleščka miške?
            if (!gl_changeByMouseWheel_timeSlice) {
                // 21.12.2023 tole je primer spreminjanja gl_timeSlice samo s pomočjo tipke T  // obratno: že med vrtenjem koleščka smo spreminjali vrednost gl_timeSlice
                //console.log("UP: process keyPress(T)");
                if (event.shiftKey) { lf_changeValueTimeSlice(1) } else { lf_changeValueTimeSlice(-1) };
                lf_changeTimeSlice(gl_timeSlice, true);
            }
            gl_changeByMouseWheel_timeSlice = false;
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

    //placePanelToggle.right = ctxW - pickPlaceLeftDiff; // 27.1.2023 v1.4
    //placePanelToggle.left = placePanelToggle.right - 41;
    placePanelToggle.adjustToCtxWidth();

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

    let myTime1 = Date.now()

    // 19.12.2023 nastavitev boolean podatka o spremenjeni konfiguraciji glede na zadnje risanje pred tem risanjem
    let noChangeCond1;
    switch (gl_appStart) {
        case true:
            //---- prvič se riše! zato nastavim, kot da je konfiguracija spremenjena, da bo šel podatke računati iz original tabel, ne pa iz cache-a
            gl_configChanged = true;
            gl_appStart = false;
            break;
        case false:
            //---- ne riše se prvič ... preverim, ali se je konfiguracija spremenila
            //noChangeCond1 = (gl_mode == gl_modeLast && lo_nrMonthsAvg == lo_nrMonthsAvgLast && gl_timeSlice == gl_timeSliceLast && gl_deltaT == gl_deltaTLast && lo_nrSmoothYears == lo_nrSmoothYearsLast);
            noChangeCond1 = (gl_mode == gl_modeLast);
            noChangeCond1 = noChangeCond1 && (lo_nrMonthsAvg == lo_nrMonthsAvgLast);
            noChangeCond1 = noChangeCond1 && (gl_timeSlice == gl_timeSliceLast);
            noChangeCond1 = noChangeCond1 && (gl_deltaT == gl_deltaTLast);
            noChangeCond1 = noChangeCond1 && (lo_nrSmoothYears == lo_nrSmoothYearsLast);
            noChangeCond1 = noChangeCond1 && (gl_showAvgAllPlace == gl_showAvgAllPlaceLast); // 23.12.2023
            //let noChangeCond2 = (valueBetween(gl_monthStart, gl_monthStartLast, gl_monthEndLast) && valueBetween(gl_monthEnd, gl_monthStartLast, gl_monthEndLast));
            //if (noChangeCond1 && noChangeCond2) {
            //    gl_configChanged = false;
            //} else {
            //    gl_configChanged = true;
            //}
            //gl_configChanged = !(noChangeCond1 && noChangeCond2);
            gl_configChanged = !noChangeCond1;
            break;
    }
    if (gl_configChanged) {
        //console.log("change")
        paint_graph_timeAvgTemp_cache();
        gl_configChanged = false;
    };
    //----
    gl_modeLast = gl_mode;
    lo_nrMonthsAvgLast = lo_nrMonthsAvg;
    gl_timeSliceLast = gl_timeSlice;
    gl_deltaTLast = gl_deltaT; // 22.12.2023
    lo_nrSmoothYearsLast = lo_nrSmoothYears;      // 22.12.2023
    gl_showAvgAllPlaceLast = gl_showAvgAllPlace; // 23.12.2023
    //gl_monthStartLast = gl_monthStart;
    //gl_monthEndLast = gl_monthEnd;
    
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

    //tmpStr = "velikost enotskega kroga spremeniš z vrtenjem koleščka miške"
    //tmpStr = "velikost enotskega kroga spremeni" + scSchLow + " z vrtenjem kole" + scSchLow + scTchLow + "ka mi" + scSchLow + "ke nad krogom"
    //gText(tmpStr, "italic 11pt cambria", "gray", 6, ctxH - 22)
    //tmpStr = "enotski krog lahko pri sredi" + scSchLow + scTchLow  + "u prime" + scSchLow + " z mi" + scSchLow + "ko in ga premakne" + scSchLow 
    //gText(tmpStr, "italic 11pt cambria", "gray", 6, ctxH - 8)

        //---- 30.1.2023 v1.6
    if (lo_GUIlayoutHasChanged) {
        switch (lo_GUI_layout) {
            case cv_guiLayoutA: break;
            case cv_guiLayoutB: paint_GUI_layoutB(); break;
        }
        lo_GUIlayoutHasChanged = false;
    }
    
    let marginLeft = 8; let marginRight = 8;
    var marginTop = lo_layout_marginTop; let marginBottom = 25;
    //paint_graph_vaccExcessDeath(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
    //paint_graph_timeAvgTemp(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_timeAvgTemp, cv_allPlace, 45); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
    
    //preštetje selektiranih lokacij
    lf_getnrSelectedPlaces();

    lo_graphMarginLeft = marginLeft;
    lo_graphMarginTop = marginTop;
    lo_graphMarginRight = marginRight;
    lo_graphMarginBottom = marginBottom;
    lo_graphWidth = ctxW - marginLeft - marginRight;
    lo_graphHeight = ctxH - marginTop - marginBottom;
    //
    lo_graphLeft = marginLeft;
    lo_graphRight = ctxW - marginRight;
    lo_graphTop = marginTop;
    lo_graphBottom = ctxH - marginBottom;
    lo_graphWidth = ctxW - marginLeft - marginRight;
    lo_graphHeight = ctxH - marginTop - marginBottom;
    //
    switch (gl_mode) {
        case cv_mode_vaccExcessDeath:
            paint_graph_timeAvgTemp(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_vaccExcessDeath, cv_allPlace, gl_timeSlice, 45, false, 0, 0, 0); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
            break;
        case cv_mode_vaccExcessDeathMulti:
            if (lo_showGUI) { marginRight += 55; lo_graphMarginRight = marginRight; };
            paint_graph_timeAvgTemp_multiPlace(marginLeft, marginTop, marginRight, marginBottom, cv_graphType_vaccExcessDeath); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris, pa tudi vir podatkov
            break;
        case cv_mode_timeAvgTempSingle:
            paint_graph_timeAvgTemp(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_timeAvgTemp, cv_allPlace, gl_timeSlice, 45, false, 0, 0, 0); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
            break;
        case cv_mode_timeAvgTempMultiPlace:
            if (lo_showGUI) { marginRight += 55; lo_graphMarginRight = marginRight; };
            paint_graph_timeAvgTemp_multiPlace(marginLeft, marginTop, marginRight, marginBottom, cv_graphType_timeAvgTemp); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris, pa tudi vir podatkov
            break;
        case cv_mode_timeAvgTempMultiTimeSlice:
            if (lo_showGUI) { marginRight += 55; lo_graphMarginRight = marginRight; };
            paint_graph_timeAvgTemp_multiTimeSlice(marginLeft, marginTop, marginRight, marginBottom, cv_graphType_timeAvgTemp); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris, pa tudi vir podatkov
            break;
    }
    
    paint_GUI()
    paint_author();
    paint_version();

 
    //test_arcTo();
    //test_bezierCurveTo()
    //test_rotate();
    
    if (lo_showGUI) {
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

function lf_regularPlace(vp_place) {

    if (valueBetween(vp_place, cv_minPlace, nrPlaces)) { return true } else { return false };
}

function lf_regularMonth(vp_month) {

    if (valueBetween(vp_month, 1, nrMonthsAll)) { return true } else { return false };
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

function lf_dragInterval(value) {

    //console.log("  lf_dragInterval(): value=" + value)

    let maxValue = sliderMonthEnd.minItemValue + (sliderMonthEnd.items - 1) * sliderMonthEnd.step;
    //console.log("  maxValue=" + maxValue)
    if (!valueBetween(value, 1, maxValue)) {
        //console.log("  iregular value!")
        return
    };
    if (!lo_dragMonthEndActive) {
        //console.log("  drag not activated!")
        return
    };
    
    //smo med vlečenjem sliderja v sliderMonthEnd, in miška je nad "value"
    switch (sliderMonthEnd.useValue0) {
        case true:
            if (lo_dragIntervalStartActive) {
                //začetni mesec lahko vlečeš med 1 in endMonth
                //console.log("    drag monthStart active")
                if (valueBetween(value, 1, gl_monthEnd)) {
                    lf_changeMonthStart(value, true);
                };
            } else if (lo_dragIntervalEndActive) {
               //console.log("    drag monthEnd active")
                //končni mesec lahko vlečeš med monthStart in maxValue
                if (valueBetween(value, gl_monthStart, maxValue)) {
                    lf_changeMonthEnd(value, true);
                };
            } else {
                //treba se je še odločiti, kaj se vleče - začetni ali končni mesec
                //če je miška levo od sredine med monthStart in monthEnd, potem bom vlekel začetni mesec
                //console.log("    choose what to drag now")
                let itemWidth = sliderMonthEnd.width / sliderMonthEnd.items; //pozor: na obeh koncih dodatni polovički gledata čez!
                let avgValue = (gl_monthStart + gl_monthEnd) / 2;
                if (lo_mouseMoveX < (sliderMonthEnd.left + itemWidth / 2 + (avgValue - 1) * itemWidth)) {
                    //if (value < (gl_monthStart + gl_monthEnd) / 2) {
                    //console.log("    drag monthStart activated")
                    lo_dragIntervalStartActive = true;
                    lf_changeMonthStart(value, true);
                } else {
                    //console.log("    drag monthEnd activated")
                    lo_dragIntervalEndActive = true;
                    lf_changeMonthEnd(value, true);
                }
            }
            break;
        case false:
            //imamo vključen samo končni mesec in ta se je zdaj z mousemove-drag (morda) spremenil
            //console.log("    not using monthStart!")
            lf_changeMonthEnd(value, true);
            break
    }

}

function lf_setNrMonthsAvgText() {

    let tmpStr, tmpStr2;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            tmpStr = "Povpre" + scTchLow + "enje: "
            tmpStr2 = lo_nrMonthsAvg.toString()
            if (lo_nrMonthsAvg == 1) { tmpStr2 = "brez" }
            else if (lo_nrMonthsAvg == 2) { tmpStr2 += " meseca" }
            else if (lo_nrMonthsAvg == 3) { tmpStr2 += " mesece" }
            else if (lo_nrMonthsAvg == 4) { tmpStr2 += " mesece" }
            else if (lo_nrMonthsAvg == 5) { tmpStr2 += " mesecev" }
            else { tmpStr2 += " mesecev" }
            tmpStr += tmpStr2
            break;
        case cv_guiLayoutB:
            //console.log("lo_nrMonthsAvg=" + lo_nrMonthsAvg.toString());
            tmpStr = "Average: "
            tmpStr2 = lo_nrMonthsAvg.toString();
            switch (lo_nrMonthsAvg) {
                case 0: tmpStr2 = "none"; break;
                case 1: tmpStr2 += " year"; break;
                default: tmpStr2 += " years"; break;
            }
            //if (lo_nrMonthsAvg == 0) { tmpStr2 = "none" } else { tmpStr2 += " years" };
            tmpStr += tmpStr2
            break;
    }
    intChooserNrMonthsAvg.text = tmpStr;
}

function lf_setNrSmoothYearsText() {

    let tmpStr, tmpStr2;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            break;
        case cv_guiLayoutB:
            //console.log("lo_nrSmoothYears=" + lo_nrSmoothYears.toString());
            tmpStr = "Smooth: "
            tmpStr2 = lo_nrSmoothYears.toString();
            switch (lo_nrSmoothYears) {
                case 0: tmpStr2 = "0"; break;
                case 1: tmpStr2 += "y"; break;
                default: tmpStr2 += "y"; break;
            }
            //if (lo_nrSmoothYears == 0) { tmpStr2 = "none" } else { tmpStr2 += " years" };
            tmpStr += tmpStr2
            break;
    }
    intChooserSmoothYears.text = tmpStr;
}

function lf_setNrMonthsAvgTextShort() {

    let tmpStr, tmpStr2;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            break;
        case cv_guiLayoutB:
            //console.log("lo_nrMonthsAvg=" + lo_nrMonthsAvg.toString());
            tmpStr = "Avg: "
            tmpStr2 = lo_nrMonthsAvg.toString();
            switch (lo_nrMonthsAvg) {
                case 0: tmpStr2 = "none"; break;
                default: tmpStr2 += "y"; break;
            }
            tmpStr += tmpStr2
            break;
    }
    return tmpStr;
}

function lf_setTimeSliceText() {

    let tmpStr, tmpStr2;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            break;
        case cv_guiLayoutB:
            //console.log("gl_timeSlice=" + gl_timeSlice.toString());
            tmpStr = "TS: "; tmpStr2 = "";
            switch (gl_timeSlice) {
                case cv_timeSliceAll:
                    tmpStr2 = "all"; break;
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    //tmpStr2 = (gl_timeSlice - cv_timeSliceMonthMin + 1).toString(); break;
                    tmpStr2 = lf_monthStrMMM((gl_timeSlice - cv_timeSliceMonthMin + 1)); break;
                case cv_timeSliceWinter: tmpStr2 += "WN"; break;
                case cv_timeSliceSpring: tmpStr2 += "SP"; break;
                case cv_timeSliceSummer: tmpStr2 += "SM"; break;
                case cv_timeSliceAutumn: tmpStr2 += "AT"; break;
                case cv_timeSliceMonth: tmpStr2 += "M"; break;
                case cv_timeSliceSeason: tmpStr2 += "SS"; break;
            }
            tmpStr += tmpStr2
            break;
    }
    return tmpStr;
}

function lf_setTimeSliceNameENG(vp_timeSlice) {

    let tmpStr;

    switch (vp_timeSlice) {
        case cv_timeSliceAll: tmpStr = "All"; break;
        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
            tmpStr = lf_mesecNameLongENG((vp_timeSlice - cv_timeSliceMonthMin + 1)); break;
        case cv_timeSliceWinter: tmpStr = "Winter"; break;
        case cv_timeSliceSpring: tmpStr = "Spring"; break;
        case cv_timeSliceSummer: tmpStr = "Summer"; break;
        case cv_timeSliceAutumn: tmpStr = "Autumn"; break;
    }
    return tmpStr;
}

function lf_setTailMonthsText() {

    let tmpStr, tmpStr2;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            tmpStr = "Risanje tudi za predhodnih: " + gl_tailMonths.toString()
            if (gl_tailMonths == 0) { tmpStr2 = " mesecev" }
            else if (gl_tailMonths == 1) { tmpStr2 = " mesec" }
            else if (gl_tailMonths == 2) { tmpStr2 = " meseca" }
            else if (gl_tailMonths == 3) { tmpStr2 = " mesece" }
            else if (gl_tailMonths == 4) { tmpStr2 = " mesece" }
            else { tmpStr2 = " mesecev" }
            tmpStr += tmpStr2
            break;
        case cv_guiLayoutB:
            tmpStr = "Tail months: " + gl_tailMonths.toString() + " months";
            break;
    }
    sliderTailMonths.text = tmpStr;
}

function lf_setMonthEndText() {

    //console.log("lf_setMonthEndText(): gl_monthEnd=" + gl_monthEnd);
    let tmpStr;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            tmpStr = "Risanje za mesec: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"
            break;
        case cv_guiLayoutB:
            //tmpStr = "Month: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"  
            switch (sliderMonthEnd.useValue0) {
                case true:
                    tmpStr = lf_monthStrMY(gl_monthStart) + " - " + lf_monthStrMY(gl_monthEnd);
                    break;
                case false:
                    tmpStr = "Month: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"  
                    break;
            }
            break;
    }
    sliderMonthEnd.text = tmpStr;
}

function lf_setMonthStartText() {

    let tmpStr;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            tmpStr = "Risanje od meseca: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"
        case cv_guiLayoutB:
            //tmpStr = "Month: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"  
            switch (sliderMonthEnd.useValue0) {
                case true:
                    tmpStr = lf_monthStrMY(gl_monthStart) + " - " + lf_monthStrMY(gl_monthEnd);
                    sliderMonthEnd.text = tmpStr;
                    break;
            }
            break;
    }
}

function lf_setMonthIntervalText() {

    //console.log("lf_setMonthIntervalText(): gl_monthStart=" + gl_monthStart + "gl_monthEnd=" + gl_monthEnd);
    let tmpStr;
    switch (lo_GUI_layout) {
        case cv_guiLayoutA:
            tmpStr = "Risanje za mesec: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"
            break;
        case cv_guiLayoutB: 
            switch (sliderMonthEnd.useValue0) {
                case true:
                    tmpStr = lf_monthStrMY(gl_monthStart) + " - " + lf_monthStrMY(gl_monthEnd);
                    break;
                case false:
                    tmpStr = "Month: " + gl_monthEnd.toString() + " (" + lf_monthStrMY(gl_monthEnd) + ")"  
                    break;
            }
            break;
    }
    sliderMonthEnd.text = tmpStr;
}

function paint_GUI() {

    let x = guiPanelLeft; let y = guiPanelTop + 130;
    if (!lo_showGUI) { x = 8; y = ctxH - 8 };
    x = 8; y = ctxH - 8; //kar vedno spodaj levo naj bo
    //gText("data: Eurostat (excess death), OWID (vaccination)", "italic 11pt serif", "maroon", x, y);
    gText("data: ARSO / VP Trnje " + scSch + "kofja Loka / VP Stra" + scZhLow + "i" + scSchLow + scTchLow + "e Kranj", "italic 11pt serif", "maroon", x, y);

    if (!lo_showGUI) {
        //---- on-screen namigi/pomoč
        if (lo_showHelpTips) { paint_tips() };
        if (lo_showStations) { paint_stations() };
        return
    };

    //---- mode button
    buttonMode.paint();
    
    //---- izbiranje števila mesecev za povprečenje podatkov  
    intChooserNrMonthsAvg.paint()
    //intChooserNrMonthsAvg2.paint()
    
    //---- check box za povprečenje čez vse mesece covid epidemije
    checkBoxNrMonthsAvgAll.paint();
    
    //---- check box za deltaT(t) namesto T(t)
    checkBoxDeltaT.paint();
    
    //---- check box za graf povprečja vse izbranih lokacij
    checkBoxAvgAllPlace.paint();
    
    //---- izbiranje števila let za glajenje krivulje deltaT(t)
    intChooserSmoothYears.paint()
    
    //---- za koliko časa nazaj se bo risal "rep"
    sliderTailMonths.paint();

    //---- izbira meseca za prikaz
    sliderMonthEnd.paint();

    //---- button play/stop
    buttonPlay.paint();
    
    //---- toggle za lokacije (zahteval Žiga Vipotnik @ZVipotnik 25.1.2023)
    placePanelToggle.paint();

    //28.6.2023 dodan izpis trenutnega mode
    tmpStr=gl_mode.toString()
    gBannerRoundRectWithText(buttonMode.left+buttonMode.width-15-(4-gl_mode)*13, buttonMode.top+buttonMode.height-1, 9, 9, "bold 10pt verdana", "darkSlateGray", tmpStr, 4, 4, 8, "white", 1, "lightGray", "lightGray", 2, 2, false)
    
    //---- on-screen namigi/pomoč
    if (lo_showHelpTips) { paint_tips() };
    if (lo_showStations) { paint_stations() };

}

function paint_stations() {
    //---------------------------------------------
    // 15.12.2023
    //---------------------------------------------
    let fontStation = "normal 11pt serif";
    let fontPlace = "bold 12pt serif";
    //----    
    let place, place2, station, station2;
    let xPlace = 20; let xStation = 50;
    //----
    let wArsoId = 45; let wHeight = 55; let wLon = 63; let wLat = 63; let wDateStart = 65; let wDateEnd = 70; let wName = 285;
    //----
    let xArsoId = xStation;
    let xHeight = xArsoId + wArsoId;
    let xLon = xHeight + wHeight;
    let xLat = xLon + wLon;
    let xDateStart = xLat + wLat;
    let xDateEnd = xDateStart + wDateStart;
    let xName = xDateEnd + wDateEnd;
    //----
    let y0 = 65; let y;
    let vStepStation = 16; let vStepPlace = 19;
    let backHeight = nrPlaces * vStepPlace + nrStations * vStepStation + 15;
    let tmpStr, tmpW, tmpH;
    //----
    let wCol = xName + wName - xPlace; //širina celotnega izpisa za en stolpec lokacij in postaj
    let xCol = 0; let wColGap = 40;
    let tmpNrPlaces, tmpNrStations, newCol;
    //----
    const cv_placeVDiff = 6;            // se vsaki pred place odvzame, razen na vrhu vsakega stolpca podatkov
    const cv_avgPlaceTextHeight = 11.4; // povprečna višina teksta za place
    const colStations = 12; // toliko lokacij znotaj enega stolpca. Preizkušeno deluje tudi za 8 ali poljubno drugo številko!
    let yGapTop, tmpMaxWidth;
    let valueCorrection; //16.12.2023
    let wColShorten = 0; //17.12.2023
    //gText("Javorje", fontPlace, "black", 0, 0);
    //console.log("--------------------");
    place = 0; y = y0;
    for (station = 1; station <= nrStations; station++) {
        //---- smo na prehodu na novo lokacijo z njenimi postajami?
        if (place !== stationPlace[station]) {
            //if (stationPlace[station] == 12) { // debug purposes
            //    y = y;
            //}
            //---- po 12 lokacij s postajami v enem stolpcu izpisa
            newCol = false;
            switch (place) {
                case 0: newCol = true; break;
                case colStations: case 2 * colStations: case 3 * colStations: xCol += wColGap + wCol - wColShorten; y = y0; newCol = true; break;
            }
            //---- lokacija se je spremenila, treba jo je izpisati
            place = stationPlace[station];            
            //---- če je nov stolpec podatkov, potem izračunati, koliko je lokacij in pripadajočih postaj v tem stolpcu, in potem izris background okvirja?
            if (newCol) {
                //---- koliko je lokacij in pripadajočih postaj v trenutnem stolpcu za izpis?
                tmpNrPlaces = 0; tmpNrStations = 0; tmpMaxWidth = 0;
                for (station2 = station; station2 <= nrStations; station2++) {
                    place2 = stationPlace[station2];
                    if (place2 - place >= colStations) { place2 -= 1; break; }
                    tmpNrStations += 1;
                    // iščem tudi station z najdaljšim imenom, da bom lahko izrisal background banner ustrezne širine!
                    ;[tmpW, tmpH] = gMeasureText(stationName[station2], fontPlace); 
                    if (tmpW > tmpMaxWidth) { tmpMaxWidth = tmpW };
                }
                tmpNrPlaces = place2 - place + 1;
                //console.log("tmpNrPlaces=" + tmpNrPlaces.toString() + " tmpNrStations=" + tmpNrStations.toString());
                //---- za ta stolpec imamo torej tmpNrPlaces+tmpNrStations, sledi izris background okvirja
                wColShorten = 0;
                if (tmpMaxWidth < 310) { wColShorten = 310 - tmpMaxWidth };
                backHeight = tmpNrPlaces * (vStepPlace + cv_avgPlaceTextHeight - cv_placeVDiff) + cv_placeVDiff + tmpNrStations * vStepStation + 10; 
                gBannerRoundRect(xPlace - 15 + xCol, y0 - 10, wCol + 30 - wColShorten, backHeight, 20, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true); //zdaj treba manj transparentno, ker senčenje od v1.16 deluje samo okoli bannerja, ne pa tudi pod njim
            }
            //---- 
            if (!newCol) { y -= cv_placeVDiff };
            ;[tmpW, tmpH] = gMeasureText(placeLocation[place], fontPlace);
            //console.log("tmpH=" + tmpH.toString());
            yGapTop = 3; if (placeLocation[place].includes(scSch)) { yGapTop = 2 }; // če je v imenu lokacije "Š", potem na vrhu malo manj spacinga
            gBannerRectWithText3(placeLocation[place], xCol + xPlace, y, fontPlace, 3, yGapTop, 4, 1, 1, placeColor[place], 1, "gray", placeColorAnti[place], "lightGray", 2, 2);
            y += tmpH + vStepPlace;
        }
        valueCorrection = isNormalizedStation(station);
        if (valueCorrection !== 0) {
            gText(valueCorrection.toString() + scStopinj + "C", "bold 8pt serif", "red", xCol + xArsoId - 33, y - 1);
        }
        //---- izpis tipa postaje, če je avtomatska ali privatna. Od ARSO glavne in klimatološke ne označujem posebej (19.12.2023)
        switch (stationType[station]) {
            case "A": gText("A", "bold 11pt serif", "blue", xCol + xArsoId - 20, y); break;
            case "P": gText("P", "bold 11pt serif", "blue", xCol + xArsoId - 20, y); break;
        }        
        gText(stationArsoId[station].toString(), fontStation, "darkSlateGray", xCol + xArsoId, y);
        gText(stationHeight[station].toString() + "m", fontStation, "darkSlateGray", xCol + xHeight, y);
        gText(stationLon[station].toString(), fontStation, "darkSlateGray", xCol + xLon, y);
        gText(stationLat[station].toString(), fontStation, "darkSlateGray", xCol + xLat, y);
        tmpStr = lf_dateStrMMMsepYY(stationMonthStart[station], stationYearStart[station], ":", 0, 0, "live");
        gText(tmpStr, fontStation, "darkSlateGray", xCol + xDateStart, y);
        gText("..", fontStation, "darkSlateGray", xCol + xDateEnd - 12, y);
        tmpStr = lf_dateStrMMMsepYY(stationMonthEnd[station], stationYearEnd[station], ":", 0, 0, "live");
        gText(tmpStr, fontStation, "darkSlateGray", xCol + xDateEnd, y);
        gText(stationName[station].toString(), fontStation, "darkSlateGray", xCol + xName, y);
        y += vStepStation;
    }
}

function paint_tips() {

    // text baselines: https://www.javascripttutorial.net/web-apis/javascript-filltext/

    switch (lo_GUI_layout) {

        case cv_guiLayoutA:
            gText("(A+kole" + scSchLow + scTchLow + "ek)", "italic 10pt serif", lo_tipsColor, checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width + 8, checkBoxNrMonthsAvgAll.top + 6);
            gText("(S)", "italic 10pt serif", lo_tipsColor, checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width + 8, checkBoxNrMonthsAvgAll.top + 20);
            gText("(T+kole" + scSchLow + scTchLow + "ek)", "italic 10pt serif", lo_tipsColor, guiPanelLeft + 418, guiPanelTop + 31);
            gText("(H=skrij/prika" + scZhLow + "i)", "italic 10pt serif", lo_tipsColor, guiPanelLeft + 398, guiPanelTop + 11);
            gText("(F2=tips)", "italic 10pt serif", lo_tipsColor, guiPanelLeft + 439, guiPanelTop - 9);
            gText("(kole" + scSchLow + scTchLow + "ek, levo/desno, Home/End, P=Play/Stop)", "italic 10pt serif", lo_tipsColor, guiPanelLeft + 232, guiPanelTop + 80);
            gText("(C)", "italic 10pt serif", lo_tipsColor, ctxW - 20, pickPlaceTop + nrPlaces * pickPlaceHeight + 17);
            gText("(dblClick)", "italic 10pt serif", lo_tipsColor, ctxW - 56, pickPlaceTop + nrPlaces * pickPlaceHeight + 31);
            break;
        
        case cv_guiLayoutB:
            
            let x0 = 20; let x1 = x0 + 160;
            let y0 = 70; let vStep = 25; let y = y0 - vStep;
            let font = "normal 12pt serif";
            let font2 = "italic 12pt serif";
            let font3 = "bold 12pt serif";
            let nrTipRows = 23;
            let backHeight = nrTipRows * vStep + 15;

            //gBannerRect(x0 - 15, y0 - 13, 415, backHeight, 4, 4, gf_alphaColor(160, "white"), 1, "silver", "#ECECECC0", 5, 5, true);
            //gBannerRoundRect(x0 - 15, y0 - 13, 415, backHeight, 20, gf_alphaColor(160, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true);
            gBannerRoundRect(x0 - 15, y0 - 13, 415, backHeight, 20, gf_alphaColor(232, "ivory"), 1, "silver", "#ECECECC0", 5, 5, true); //zdaj treba manj transparentno, ker senčenje od v1.16 deluje samo okoli bannerja, ne pa tudi pod njim
            //
            y += vStep;
            gBannerRectWithText2("F2", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 27, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("N", x0 + 41, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hide/show these tips", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("M", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change mode, show other graphs", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("mouseWheel", x0, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... select month", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
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
            gBannerRectWithText2("H", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hide/show controls", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("C", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 21, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("dblClick", x0 + 35, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... select/unselect all places", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("F9", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... list of weather stations", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
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
    if (!lo_showGUI) {
        lo_currentMonthTextLeft = 15;
        lo_currentMonthTextTop = 14;
        switch (gl_mode) {
            case cv_mode_vaccExcessDeathMulti: case cv_mode_timeAvgTempMultiPlace:
                guiPanelHeight = 0;
                lo_layout_marginTop = guiPanelTop + guiPanelHeight;
                return;
                break;
        }
    }; //4.2.2023 v1.12
    //----
    buttonMode.left = guiPanelLeft;
    buttonMode.top = guiPanelTop + 2;
    //----
    intChooserNrMonthsAvg.left = buttonMode.left + buttonMode.width + 15;
    intChooserNrMonthsAvg.top = guiPanelTop + 16;
    intChooserNrMonthsAvg.width = 180;
    //----
    //intChooserNrMonthsAvg2.left = 450;
    //intChooserNrMonthsAvg2.top =  200;
    //----
    checkBoxNrMonthsAvgAll.left = intChooserNrMonthsAvg.left + intChooserNrMonthsAvg.width + 5;
    checkBoxNrMonthsAvgAll.top = intChooserNrMonthsAvg.top - 3;
    checkBoxNrMonthsAvgAll.width = 18;
    //---- 22.12.2023 deltaT(t)
    checkBoxDeltaT.left = checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width + 15;
    checkBoxDeltaT.top = checkBoxNrMonthsAvgAll.top;
    checkBoxDeltaT.width = 18;
    vl_lastControlLeft = checkBoxDeltaT.left; vl_lastControlWidth = checkBoxDeltaT.width;
    //----
    if (gl_deltaT) {
        intChooserSmoothYears.left = vl_lastControlLeft + vl_lastControlWidth + 6;
        intChooserSmoothYears.top = guiPanelTop + 16;
        intChooserSmoothYears.width = 80;
        vl_lastControlLeft = intChooserSmoothYears.left; vl_lastControlWidth = intChooserSmoothYears.width;
    }
    //---- 24.12.2023 povprečje vseh izbrnih lokacij
    if (gl_mode !== cv_mode_timeAvgTempMultiPlace) {
        checkBoxAvgAllPlace.left = vl_lastControlLeft + vl_lastControlWidth + 15;
        checkBoxAvgAllPlace.top = checkBoxNrMonthsAvgAll.top;
        checkBoxAvgAllPlace.width = 18;  
        vl_lastControlLeft = checkBoxAvgAllPlace.left; vl_lastControlWidth = checkBoxAvgAllPlace.width;
    }    
    //----
    let x1, x2, gap1, gap2, d1, d2, dHalf;
    const minTailWidth = 100; const maxTailWidth = 300;
    const minMonthEndWidth = 100; const maxMonthEndWidth = 500;

    gap2 = 200; //prostor za izpis tekočega meseca
    //x1 = checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width;
    x1 = vl_lastControlLeft + vl_lastControlWidth; // 22.12.2023
    //x2 = x1 + gap2;
    x2 = x1 + gap2 + 20;
    x3 = ctxW - xAuthor;
    //----
    lo_currentMonthTextLeft = x1 + 15;
    lo_currentMonthTextTop = 21;
    //----
    sliderMonthEnd.left = x2;
    sliderMonthEnd.bodyMiddle = guiPanelTop + 22; //sliderTailMonths.bodyMiddle;
    d2 = x3 - x2;
    if (d2 > maxMonthEndWidth) { sliderMonthEnd.width = maxMonthEndWidth; }
    else if (d2 < minMonthEndWidth) { sliderMonthEnd.width = minMonthEndWidth; }
    else { sliderMonthEnd.width = d2; };

    buttonPlay.left = sliderMonthEnd.left - 31; // + sliderMonthEnd.width +5;
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

function lf_monthStrMY(vp_month) {
    // format: "sep/2021"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let leto = minYearAll + nrLet
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    let mesec, leto;
    ;[mesec, leto] = lf_monthYearValue(vp_month);
    return (lf_mesecName(mesec) + "/" + leto.toString())
}

function lf_monthStrMMYY(vp_month) {
    // format: "9/21"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let leto = minYearAll + nrLet
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    let mesec, leto;
    ;[mesec, leto] = lf_monthYearValue(vp_month);
    return (mesec.toString() + "/" + leto.toString().substring(2, 4))
}

function lf_monthStrMMMYY(vp_month) {
    // format: "sep/21"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let leto = minYearAll + nrLet
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    let mesec, leto;
    ;[mesec, leto] = lf_monthYearValue(vp_month);
    return (lf_mesecName(mesec) + "/" + leto.toString().substring(2, 4))
}

function lf_monthStrMMMYYYY(vp_month) {
    // format: "sep/21"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let leto = minYearAll + nrLet
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    let mesec, leto;
    ;[mesec, leto] = lf_monthYearValue(vp_month);
    return (lf_mesecName(mesec) + "/" + leto.toString());
}

function lf_seasonStrSmall(vp_monthValue) {
    // format: "winter"
    switch (vp_monthValue) {
        case 12: case 1: case 2: return "winter"; break;
        case 3: case 4: case 5: return "spring"; break;
        case 6: case 7: case 8: return "summer"; break;
        case 9: case 10: case 11: return "autumn"; break;
    }
}

function lf_seasonStrSmallYYYY(vp_month) {
    // format: "winter/1987"
    let mesec, leto, tmpStr;
    ;[mesec, leto] = lf_monthYearValue(vp_month);
    tmpStr = lf_seasonStrSmall(mesec);
    tmpStr += "/" + leto.toString();
    return tmpStr;
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

function lf_monthStrMMM(vp_month) {
    // format: "sep"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    //let mesec = lf_monthValue(vp_month); // 21.12.2023
    //return lf_mesecName(mesec);
    return lf_mesecName(lf_monthValue(vp_month)); // 21.12.2023
}

function lf_monthStrM(vp_month) {
    // format: "S"
    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    //let mesec = lf_monthValue(vp_month); // 21.12.2023
    //return (lf_mesecNameM(mesec))
    return (lf_mesecNameM(lf_monthValue(vp_month)))
}

function lf_monthValue(vp_month) {

    let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    return (mesec)
}

function lf_yearValue(vp_month) {

    let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    let leto = minYearAll + nrLet
    return (leto)
}

function lf_monthYearValue(vp_month) {

    let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    let leto = minYearAll + nrLet
    let mesec = vp_month + minMonthAll - 1 - 12 * nrLet
    return [mesec, leto];
}

function lf_yearStrShort(vp_month) {

    //let nrLet = Math.trunc((vp_month - 1 + minMonthAll - 1) / 12)
    //let leto = minYearAll + nrLet
    //return ("'" + leto.toString().substring(2, 4));
    return ("'" + lf_yearValue(vp_month).toString().substring(2, 4));
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

function lf_changeNrMonthsAvgAll(vp_newValue, vp_paint) {

    lo_nrMonthsAvgAll = vp_newValue;
    switch (lo_nrMonthsAvgAll) {
        case true:
            lo_nrMonthsAvgOld = lo_nrMonthsAvg
            //lo_nrMonthsAvg = nrMonthsAll;
            lo_nrMonthsAvg = Math.trunc(nrMonthsAll / 12) + 1;
            lo_enabledIntChooserNrMonthsAvg = false;
            break;
        case false:
            lo_nrMonthsAvg = lo_nrMonthsAvgOld
            lo_enabledIntChooserNrMonthsAvg = true;
            break; 
    }
    lf_setNrMonthsAvgText();
    checkBoxNrMonthsAvgAll.value = lo_nrMonthsAvgAll;
    intChooserNrMonthsAvg.enabled = lo_enabledIntChooserNrMonthsAvg;
    if (vp_paint) { paint() }

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

function lf_changeAvgAllPlace(vp_newValue, vp_paint) {

    gl_showAvgAllPlace = vp_newValue;

    checkBoxAvgAllPlace.value = gl_showAvgAllPlace;

    if (vp_paint) { paint() }

}

function lf_changeEnablePlaceAll(vp_newValue, vp_paint) {

    lo_enabledPlaceAll = vp_newValue;
    let place;
    for (place = 1; place <= nrPlaces; place++) {
        lo_enabledPlace[place] = lo_enabledPlaceAll;
    }
    paint_graph_timeAvgTemp_cache_avgAllPlace(); // 24.12.2023
    if (vp_paint) { paint() }
}

function lf_changeShowHelpTips(vp_newValue, vp_paint) {

    lo_showHelpTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowStations(vp_newValue, vp_paint) {

    lo_showStations = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowToolTips(vp_newValue, vp_paint) {

    lo_showToolTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeMode(vp_shift, vp_paint) {

    if (gl_mode == cv_mode_timeAvgTempMultiTimeSlice) {
        gl_timeSlice = cv_timeSliceAll
    }; //11.12.2023
    //----
    if (vp_shift) { gl_mode -= 1 } else { gl_mode += 1 };
    if (gl_mode < cv_minMode) { gl_mode = cv_maxMode };
    if (gl_mode > cv_maxMode) { gl_mode = cv_minMode };
    lf_setMode(gl_mode, vp_paint);
}

function lf_changeShowPlaceNameLevel(vp_paint) {
    // 15.12.2023
    gl_showPlaceNameLevel -= 1;
    if (gl_showPlaceNameLevel < cv_showPlaceNameLevelMin) { gl_showPlaceNameLevel = cv_showPlaceNameLevelMax };
    if (gl_showPlaceNameLevel > cv_showPlaceNameLevelMax) { gl_showPlaceNameLevel = cv_showPlaceNameLevelMin };
    //lf_setShowPlaceNameLevel(gl_showPlaceNameLevel, vp_paint);
    //console.log("gl_showPlaceNameLevel=" + gl_showPlaceNameLevel.toString());
    if (vp_paint) { paint() }

}

function lf_changeSameScaleY(vp_newValue, vp_paint) {
    //24.10.2023
    gl_sameScaleY = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowExactValuesToo(vp_paint) {
    //6.12.2023
    switch (gl_showExactValuesToo) {
        case false: {
            gl_showExactValuesToo = true;
            gl_showExactLinesToo = false;
            break;
        }
        case true: {
            switch (gl_showExactLinesToo) {
                case false: {
                    gl_showExactLinesToo = true;
                    break;
                }
                case true: {
                    gl_showExactValuesToo = false;
                    gl_showExactLinesToo = false;
                    ; break;
                }
            }
            break;
        }
    }
    if (vp_paint) { paint() }
}

function lf_resizeWindowToFullHD(vp_paint) {
    //18.11.2023 ... zadeva v Chrome žal ne dela, ker Chrome tega ne pusti. Dovoli le v popup oknih!!!
    window.resizeTo(1920, 1080);
    if (vp_paint) { paint() }
}

function lf_setMode(vp_mode, vp_paint) {

    gl_mode = vp_mode;
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
    switch (gl_mode) { // 24.12.2023
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiTimeSlice:
            checkBoxAvgAllPlace.visible = true; break;
        case cv_mode_timeAvgTempMultiPlace:
            checkBoxAvgAllPlace.visible = false; break;
    }
    lf_setMonthIntervalText();
    lo_GUIlayoutHasChanged = true;
    if (vp_paint) { paint() }
}

function lf_changeNrMonthsAvg(vp_newValue, vp_paint) {

    //console.log("lf_changeNrMonthsAvg: newValue=" + vp_newValue)
    
    if (vp_newValue < cv_nrMonthsAvgMin || vp_newValue > nrMonthsAll) { return };

    lo_nrMonthsAvg = vp_newValue;

    lf_setNrMonthsAvgText();
    intChooserNrMonthsAvg.value = lo_nrMonthsAvg;

    if (vp_paint) {
        //console.log("lf_changeNrMonthsAvg: call Paint() now ...")
        paint()
    }
}

function lf_changeNrSmoothYears(vp_newValue, vp_paint) {

    //console.log("lf_changeNrSmoothYears: newValue=" + vp_newValue)
    
    if (vp_newValue < cv_nrSmoothYearsMin || vp_newValue > nrMonthsAll) { return };

    lo_nrSmoothYears = vp_newValue;

    lf_setNrSmoothYearsText();
    intChooserSmoothYears.value = lo_nrSmoothYears;

    if (vp_paint) {
        //console.log("lf_changeNrSmoothYears: call Paint() now ...")
        paint()
    }
}

function lf_changeValueNrMonthsAvg(vp_changeValue) {

    //console.log("lf_changeValueNrMonthsAvg: changeValue=" + vp_changeValue)
    
    lo_nrMonthsAvg -= vp_changeValue;
    //if (lo_nrMonthsAvg > cv_nrMonthsAvgMax) { lo_nrMonthsAvg = cv_nrMonthsAvgMax };
    if (lo_nrMonthsAvg > cv_nrMonthsAvgMaxExceed) { lo_nrMonthsAvg = cv_nrMonthsAvgMaxExceed }; //12.12.2023
    if (lo_nrMonthsAvg < cv_nrMonthsAvgMin) { lo_nrMonthsAvg = cv_nrMonthsAvgMin };
    
    //console.log("lf_changeValueNrMonthsAvg: call Paint() now ...")
}

function lf_changeValueNrSmoothYears(vp_changeValue) {

    //console.log("lf_changeValueNrSmoothYears: changeValue=" + vp_changeValue)
    
    lo_nrSmoothYears -= vp_changeValue;
    //if (lo_nrSmoothYears > cv_nrSmoothYearsMax) { lo_nrSmoothYears = cv_nrSmoothYearsMax };
    if (lo_nrSmoothYears > cv_nrSmoothYearsMaxExceed) { lo_nrSmoothYears = cv_nrSmoothYearsMaxExceed }; //12.12.2023
    if (lo_nrSmoothYears < cv_nrSmoothYearsMin) { lo_nrSmoothYears = cv_nrSmoothYearsMin };
    
    //console.log("lf_changeValueNrSmoothYears: call Paint() now ...")
}

function lf_changeTimeSlice(vp_newValue, vp_paint) {

    //console.log("lf_changeTimeSlice: newValue=" + vp_newValue)
    
    if (!valueBetween(vp_newValue, cv_timeSliceMin, cv_timeSliceMaxAll)) { return };

    gl_timeSlice = vp_newValue;

    //lf_setTailMonthsText();
    //sliderTailMonths.value = gl_tailMonths;
    
    if (vp_paint) {
        //console.log("lf_changeTimeSlice: call Paint() now ...")
        paint()
    }
}

function lf_changeValueTimeSlice(vp_changeValue) {

    //console.log("lf_changeValueTimeSlice: changeValue=" + vp_changeValue)
    
    switch (gl_mode) {
        case cv_mode_timeAvgTempMultiTimeSlice:
            if (gl_timeSlice == cv_timeSliceMonth) { gl_timeSlice = cv_timeSliceSeason } else { gl_timeSlice = cv_timeSliceMonth };
            break;
        default:
            gl_timeSlice -= vp_changeValue;
            if (gl_timeSlice > cv_timeSliceMax) { gl_timeSlice = cv_timeSliceMin };
            if (gl_timeSlice < cv_timeSliceMin) { gl_timeSlice = cv_timeSliceMax };                
            break;
    }
    
    //console.log("lf_changeValueTimeSlice: call Paint() now ...")
}

function lf_changeMonthEnd(vp_newValue, vp_paint) {

    //console.log("lf_changeMonthEnd: newValue=" + vp_newValue)
    
    //if (vp_newValue < 1 || vp_newValue > nrMonthsAll) { return };
    if (!valueBetween(vp_newValue, 1, nrMonthsAll)) { return };
    if (sliderMonthEnd.useValue0 && vp_newValue < gl_monthStart) { return };
    
    gl_monthEnd = vp_newValue;

    lf_setMonthEndText();
    sliderMonthEnd.value = gl_monthEnd;
    //console.log("lf_changeMonthEnd(): sliderMonthEnd.value=" + gl_monthEnd);
    
    if (vp_paint) {
        //console.log("lf_changeMonthEnd: call Paint() now ...")
        paint()
    }
}

function lf_changeMonthStart(vp_newValue, vp_paint) {

    //console.log("lf_changeMonthStart: newValue=" + vp_newValue)
    
    //if (vp_newValue < 1 || vp_newValue > nrMonthsAll) { return };
    //if (vp_newValue > gl_monthEnd) { return };
    if (!valueBetween(vp_newValue, 1, gl_monthEnd)) { return };
    
    gl_monthStart = vp_newValue;

    lf_setMonthStartText();
    sliderMonthEnd.value0 = gl_monthStart;
    //console.log("lf_changeMonthStart(): sliderMonthEnd.value0=" + gl_monthStart);

    if (vp_paint) {
        //console.log("lf_changeMonthStart: call Paint() now ...")
        paint();
    }
}

function lf_changeAutoPlay(vp_newValue) {

    //console.log("lf_changeAutoPlay: newValue=" + vp_newValue);

    lo_autoPlay = vp_newValue;

    switch (lo_autoPlay) {
        case true:
            //user je vključil auto play - treba je štartati timer
            //console.log("now start timer ...");
            //16.2.2023 v1.17 če je bil zadnji mesec, potem auto-play samodejno pričnem od začetnega meseca
            buttonPlay.value = "stop";
            if (gl_monthEnd == nrMonthsAll) {
                switch (gl_mode) {
                    case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempSingle: gl_monthEnd = gl_monthStart; break;
                    case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti: gl_monthEnd = 1; break;
                }
                sliderMonthEnd.value = gl_monthEnd;
            }
            lo_autoPlayStarting = true;
            tmAutoPlayId = setInterval(tmAutoPlay_tick, 200);
            lo_autoPlayStarting = false;
            //console.log("  timer started");
            break;
        case false:
            //user je izključil auto play - treba je ukiniti timer
            buttonPlay.value = "play";
            clearInterval(tmAutoPlayId);
            //console.log("timer cleared");
    }
    paint();
}

function tmAutoPlay_tick() {

    //console.log("timer_tick")

    if (lo_autoPlayStarting) {
        //console.log("  exit because start of the timer!");
        lo_autoPlayStarting = false;
        //return
    } else {
        // če sem že na zadnjem mesecu, potem ustavim animacijo
        if (gl_monthEnd >= nrMonthsAll) {
            clearInterval(tmAutoPlayId);
            tmAutoPlayId = null;
            //console.log("  timer_tick_cleared");
            lo_autoPlay = false;
            buttonPlay.value = "play";
            paint();
            //return;
        } else {
            // grem na naslednji mesec
            //console.log("  set month=" + (gl_monthEnd + 1).toString());
            lf_changeMonthEnd(gl_monthEnd + 1, true);
            // če sem že na zadnjem mesecu, potem ustavim animacijo
            if (gl_monthEnd >= nrMonthsAll) {
                clearInterval(tmAutoPlayId);
                tmAutoPlayId = null;
                //console.log("  timer_tick_cleared(pos-end)");
                lo_autoPlay = false;
                buttonPlay.value = "play";
                paint();
                //return;
        }
        }
    }
}

function tmMouseOutOfWindow_tick() {

    

    
}

function lf_getnrSelectedPlaces() {

    nrSelectedPlaces = 0;
    for (let place = 1; place <= nrPlaces; place++) {
        if (lo_enabledPlace[place]) { nrSelectedPlaces += 1 };
    }
}

function paint_graph_timeAvgTemp_multiPlace(marginLeft, marginTop, marginRight, marginBottom, vp_graphType) {

    let rows, cols, row, col, x, y, itemWidth, itemHeight, place, ih, iw, k;
    let fx, fy, fiw, fih, haveFocusGraph;
    let vGap = 10; let hGap = 10;
    //---- kakšna lokacija mora biti selektirana
    if (nrSelectedPlaces <= 0) { return };
    //---- dimenzije matrike
    cols = Math.trunc(Math.sqrt(nrSelectedPlaces - 1)) + 1;
    let ratio = ctxW / (ctxH + 1);
    if (ratio > 2.1) { cols += 1 }; if (ratio > 2.5) { cols += 1 }; if (ratio > 3.3) { cols += 1 }; if (ratio > 5) { cols += 1 }; //21.12.2023 spremenil faktor 1.8 -> 2.1
    if (cols > nrSelectedPlaces) { cols = nrSelectedPlaces };
    rows = Math.trunc((nrSelectedPlaces - 1) / cols) + 1;
    //----
    itemWidth = (ctxW - marginLeft - marginRight - (cols - 1) * hGap) / cols;
    itemHeight = (ctxH - marginTop - marginBottom - (rows - 1) * vGap) / rows;
    //---- pregled Y vrednosti presežne smrtnosti in določanje ky
    let vl_minY, vl_maxY, vl_dataRange;
    let vl_forceDataRangeY = false;
    if (gl_sameScaleY && vp_graphType==cv_graphType_timeAvgTemp) { //24.10.2023 normalizacija po Y v Mode=4       
        ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(cv_allPlace, gl_timeSlice, gl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
        vl_forceDataRangeY = true;
    }
    //----
    col = 1; row = 1;
    k = 0.15; //30.7.2023 v1.31
    haveFocusGraph = false;
    for (place = 1; place <= nrPlaces; place++) {
        if (!lo_enabledPlace[place]) { continue };
        ;[x, y, iw, ih] = paint_graph_timeAvgTemp_multiPlace_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, place, row, col, itemWidth, itemHeight, k)
        //30.7.2023 lokacijo v fokusu preskočim in jo izrišem na koncu po zanki lokacij
        if (place == lo_focusPlace) {
            ;[fx, fy, fiw, fih] = [x, y, iw, ih];
            haveFocusGraph = true;
        } else {
            paint_graph_timeAvgTemp_multiPlace_drawSinglePlace(place, x, y, iw, ih, vp_graphType, vl_forceDataRangeY, vl_minY, vl_maxY, vl_dataRange)
        }
        col += 1;
        if (col > cols) { col = 1; row += 1 };
    }
    //30.7.2023 po potrebi izrišem še lokacijo v fokusu
    if (haveFocusGraph) {
        paint_graph_timeAvgTemp_multiPlace_drawSinglePlace(lo_focusPlace, fx, fy, fiw, fih, vp_graphType, vl_forceDataRangeY, vl_minY, vl_maxY, vl_dataRange)
    }
}

function paint_graph_timeAvgTemp_multiTimeSlice(marginLeft, marginTop, marginRight, marginBottom, vp_graphType) {
    //----------------------------------------
    // 10.12.2023 nameče ali 12 grafov po mesecih, ali 4 grafe po letnih časih
    //----------------------------------------
    let rows, cols, row, col, x, y, itemWidth, itemHeight, place, ih, iw, k;
    let fx, fy, fiw, fih, haveFocusGraph;
    let vGap = 10; let hGap = 10;
    //---- kakšna lokacija mora biti selektirana
    //if (nrSelectedPlaces <= 0) { return };
    //---- za timeSlice more biti izbran ali nek mesec ali pa letni čas
    let nrGraphs, timeSliceStart, timeSliceEnd;
    switch (gl_timeSlice) {
        case cv_timeSliceAll: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case cv_timeSliceMonth:
            //return; //ne bom kar pustil praznega okna, ampak raje preklopim v multi prikaz po mesecih
            gl_timeSlice = cv_timeSliceMonth;  //11.12.2023 //cv_timeSliceMonthMin;
            nrGraphs = 12;
            timeSliceStart = cv_timeSliceMonthMin;
            timeSliceEnd = cv_timeSliceMonthMax;            
            break;
        case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn: case cv_timeSliceSeason:
            gl_timeSlice = cv_timeSliceSeason;  //11.12.2023
            nrGraphs = 4;
            timeSliceStart = cv_timeSliceWinter;
            timeSliceEnd = cv_timeSliceAutumn;
            break;
    }
    //---- dimenzije matrike
    cols = Math.trunc(Math.sqrt(nrGraphs - 1)) + 1;
    let ratio = ctxW / (ctxH + 1);
    if (ratio > 2.1) { cols += 1 }; if (ratio > 2.5) { cols += 1 }; if (ratio > 3.3) { cols += 1 }; if (ratio > 5) { cols += 1 }; //21.12.2023 spremenil faktor 1.8 -> 2.1
    if (cols > nrGraphs) { cols = nrGraphs };
    rows = Math.trunc((nrGraphs - 1) / cols) + 1;
    //----
    itemWidth = (ctxW - marginLeft - marginRight - (cols - 1) * hGap) / cols;
    itemHeight = (ctxH - marginTop - marginBottom - (rows - 1) * vGap) / rows;
    //---- pregled Y vrednosti in določanje ky
    let vl_minY, vl_maxY, vl_dataRange;
    let vl_forceDataRangeY = false;
    if (gl_sameScaleY && vp_graphType==cv_graphType_timeAvgTemp) { //24.10.2023 normalizacija po Y      
        ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(cv_allPlace, cv_timeSliceAll, gl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
        vl_forceDataRangeY = true;
    }
    //----
    col = 1; row = 1;
    k = 0.15; //30.7.2023 v1.31
    let vl_timeSlice;
    for (vl_timeSlice = timeSliceStart; vl_timeSlice <= timeSliceEnd; vl_timeSlice++) {
        ;[x, y, iw, ih] = paint_graph_timeAvgTemp_multiTimeSlice_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, cv_allPlace, row, col, itemWidth, itemHeight, k)
        paint_graph_timeAvgTemp_multiTimeSlice_drawSingleTimeSlice(cv_allPlace, vl_timeSlice, x, y, iw, ih, vp_graphType, vl_forceDataRangeY, vl_minY, vl_maxY, vl_dataRange)
        col += 1;
        if (col > cols) { col = 1; row += 1 };
    }
}

function paint_graph_timeAvgTemp_multiPlace_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, place, row, col, itemWidth, itemHeight, k) {

    let x, y, iw, ih, newY, yDiff, x0, y0;
 
    x = marginLeft + (col - 1) * (hGap + itemWidth);
    y = marginTop + (row - 1) * (vGap + itemHeight);
    iw = itemWidth; ih = itemHeight;
        
    //30.7.2023 lokacijo v fokusu izrišem nekoliko večjo
    if (cols > 1 && rows > 1) {
        if (place == lo_focusPlace) {
            x0 = x; y0 = y;
            if (x > (marginLeft + k * iw)) { x -= k * iw; }
            if (y > (marginTop + k * ih)) { y -= k * ih; }
            iw += 2 * k * iw; ih += 2 * k * ih;
            if ((x + iw) > (ctxW - marginRight)) { x = ctxW - marginRight - iw; }
            if ((y + ih) > (ctxH - marginBottom)) { y = ctxH - marginBottom - ih; }
        };
    }
        
    if (col == 1 && row == 1 && !lo_showGUI) {
        newY = 42; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod izpisom avtorja:) 29.1.2023 v1.6
    }
    if (col == cols && row == 1) {
        newY = 59; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod izpisom avtorja:) 29.1.2023 v1.6
    }
        
    return [x, y, iw, ih]
}

function paint_graph_timeAvgTemp_multiTimeSlice_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, place, row, col, itemWidth, itemHeight, k) {

    let x, y, iw, ih, newY, yDiff, x0, y0;
 
    x = marginLeft + (col - 1) * (hGap + itemWidth);
    y = marginTop + (row - 1) * (vGap + itemHeight);
    iw = itemWidth; ih = itemHeight;
        
    if (col == 1 && row == 1 && !lo_showGUI) {
        newY = 42; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod izpisom avtorja:) 29.1.2023 v1.6
    }
    if (col == cols && row == 1) {
        newY = 59; yDiff = newY - y;
        if (yDiff > 0) { y = newY; ih -= yDiff; }   // y += 52; ih -= 52 }; //da ni pod izpisom avtorja:) 29.1.2023 v1.6
    }
        
    return [x, y, iw, ih]
}

function paint_graph_timeAvgTemp_multiPlace_drawSinglePlace(place, x, y, iw, ih, vp_graphType, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange) {
    //24.10.2023 uvedeni vhodni parametri vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange
    
    //---- risanje okvirja, kamor se bo potem notri narisal graf za tole konkretno lokacijo
    gLine(x + 1, y + 2, x + iw - 1, y + 2, 2, "white", []);
    gLine(x + 2, y + 1, x + 2, y + ih - 2, 2, "white", []);
    gLine(x + 1, y + ih + 2, x + iw + 1, y + ih + 2, 2, "white", []);
    gLine(x + iw + 2, y + 1, x + iw + 2, y + ih + 1, 2, "white", []);
    ctx.beginPath(); ctx.rect(x, y, iw, ih); ctx.closePath();
    ctx.fillStyle = "#FBFBFBFF";
    if (place == lo_focusPlace) { ctx.fillStyle = "floralWhite"; };
    ctx.fill();
    ctx.setLineDash([]); ctx.strokeStyle = "lightGray"; ctx.strokeWidth = 1; ctx.stroke();
    
    //---- končno zdaj risanje grafa za posamezno lokacijo
    paint_graph_timeAvgTemp(x, y, iw, ih, vp_graphType, place, gl_timeSlice, 2, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange);
    
}

function paint_graph_timeAvgTemp_multiTimeSlice_drawSingleTimeSlice(place, vp_timeSlice, x, y, iw, ih, vp_graphType, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange) {
    //24.10.2023 uvedeni vhodni parametri vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange
    //10.12.2023 prirejeno za risanje grafa za posamezen timeSlice

    //---- risanje okvirja, kamor se bo potem notri narisal graf za tole konkretno lokacijo
    gLine(x + 1, y + 2, x + iw - 1, y + 2, 2, "white", []);
    gLine(x + 2, y + 1, x + 2, y + ih - 2, 2, "white", []);
    gLine(x + 1, y + ih + 2, x + iw + 1, y + ih + 2, 2, "white", []);
    gLine(x + iw + 2, y + 1, x + iw + 2, y + ih + 1, 2, "white", []);
    ctx.beginPath(); ctx.rect(x, y, iw, ih); ctx.closePath();
    ctx.fillStyle = "#FBFBFBFF";
    if (place == lo_focusPlace) { ctx.fillStyle = "floralWhite"; };
    ctx.fill();
    ctx.setLineDash([]); ctx.strokeStyle = "lightGray"; ctx.strokeWidth = 1; ctx.stroke();
    
    //---- končno zdaj risanje grafa za posamezno lokacijo
    paint_graph_timeAvgTemp(x, y, iw, ih, vp_graphType, place, vp_timeSlice, 2, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange);
    
}

function paint_graph_timeAvgTemp_cache() {
    //-------------------------
    // 19.12.2023 pred novim risanjem zaradi spremembe konfiguracije (avg, time interval, mode, time slice) najprej napolnim cache, da lahko potem delam samo z njim brez vsakega izračunavanja povprečij itd.
    //-------------------------

    let myTime1 = Date.now()

    gl_configChanged = true; // zato da bo pri klicih izračuna vrednosti nafilal to vrednosti tudi v cache

    let place, tmpValue, month, placeMonth, monthValue, timeSlice;
    let actualMonthsAvg = cv_nrMonthsAvgMult * lo_nrMonthsAvg;
    for (place = 1; place <= nrPlaces; place++) {
        for (placeMonth = 1; placeMonth <= nrMonths[place]; placeMonth++) {
            //---- tu je potrebno upoštevati vp_timeSlice, se pravi ali delamo za vse, za mesec, ali za letni čas (9.12.2023)
            switch (gl_timeSlice) {
                case cv_timeSliceAll:
                    //---- če delamo na vseh podatkih, samo izračunaj podatek
                    tmpValue = lf_getAvgValue(place, gl_timeSlice, placeMonth, actualMonthsAvg)
                    break;
                case cv_timeSliceMonth: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    //---- če delamo ločeno po mesecih, je treba pogruntati tekoči mesec, in izračunati s timeSlice nastavljenim na tisti mesec
                    monthValue = lf_monthValue(placeMonth + offsetMonths[place]); //mesec od 1..12
                    timeSlice = cv_timeSliceMonthMin + monthValue - 1;
                    tmpValue = lf_getAvgValue(place, timeSlice, placeMonth, actualMonthsAvg)
                    break;
                case cv_timeSliceSeason: case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                    //---- če delamo za letni čas, je potrebno izračunati podatek samo v primeru feb/may/aug/nov, in to s timeSlice nastavljenim na ustrezen letni čas
                    monthValue = lf_monthValue(placeMonth + offsetMonths[place]); //mesec od 1..12
                    switch (monthValue) {
                        case 2: timeSlice = cv_timeSliceWinter; break;
                        case 5: timeSlice = cv_timeSliceSpring; break;
                        case 8: timeSlice = cv_timeSliceSummer; break;
                        case 11: timeSlice = cv_timeSliceAutumn; break;
                        default: continue; // na ostalih 8 mesecih ne računam nič, ker ne rabim. Če bo kasneje spremenil gl_timeSlice, bom itak ponovno prišel sem in vse naredil na novo
                    }
                    tmpValue = lf_getAvgValue(place, timeSlice, placeMonth, actualMonthsAvg)
                    break;
            }
        }
    }
  

    //-------------------------- SPREMINAJNJE TEMPERATURE --------------------------------
    //if (!gl_deltaT) {
    //    //---- izpis potrebnega časa za postopek
    //    let myTime2 = Date.now()
    //    //console.log("cache fill: " + (myTime2 - myTime1).toString() + "ms");        
    //    return;
    //};

    if (gl_deltaT) {
        // 22.12.2023 namesto temperatur hočemo spremembo temperature glede na prejšnji interval
        // se pravi, če timeSliceAll in nrMonthsAvg=3 se pogleda razliko med današnjo vrednostjo in vrednostjo pred 3 leti
        // da si ne povozim podatkov v cache, grem za vsak place od zadnjega meseca podatkov nazaj proti prvemu
        for (place = 1; place <= nrPlaces; place++) {
            for (placeMonth = nrMonths[place]; placeMonth >= 1; placeMonth--) {
                //---- pri 3-letnem povprečenju pogledam razliko glede na 3-letno povprečje pred 3 leti, in nato ekstrapoliram z 10/3 na obdobje 10 let
                //avgTempCache[place][placeMonth] = (avgTempCache[place][placeMonth] - avgTempCache[place][placeMonth - actualMonthsAvg]) * 10 / lo_nrMonthsAvg;
                //---- pri 3-letnem povprečenju pogledam razliko glede na 3-letno povprečje pred 10 leti, in to že pove spremembo T na 10 let
                avgTempCache[place][placeMonth] = (avgTempCache[place][placeMonth] - avgTempCache[place][placeMonth - 120]);
            }
        }
        //---- opravim še lo_nrSmoothYears-letno glajenje krivulje. Če glajenje ni zahtevano, preskočim.
        let sum, nrData;
        if (lo_nrSmoothYears > 0) {
            let sum = 0; let nrData = 0;
            for (place = 1; place <= nrPlaces; place++) {
                for (placeMonth = nrMonths[place]; placeMonth >= 1; placeMonth--) {
                    sum = 0; nrData = 0;
                    for (month = 0; month <= lo_nrSmoothYears * 12 - 1; month++) {
                        if (!isNaN(avgTempCache[place][placeMonth])) {
                            sum += avgTempCache[place][placeMonth - month];
                            nrData += 1;
                        }
                    }
                    avgTempCache[place][placeMonth] = sum / nrData;
                }
            }
        }
    }

    //---- še cache tabela za povprečje vseh (selektiranih) postaj (22.12.2023)
    paint_graph_timeAvgTemp_cache_avgAllPlace();

    //---- izpis potrebnega časa za postopek
    //let myTime2 = Date.now(); console.log("cache fill: " + (myTime2 - myTime1).toString() + "ms");
    
}

function paint_graph_timeAvgTemp_cache_avgAllPlace() {
    //-------------------------
    // 19.12.2023 pred novim risanjem zaradi spremembe konfiguracije (avg, time interval, mode, time slice) najprej napolnim cache, da lahko potem delam samo z njim brez vsakega izračunavanja povprečij itd.
    // 24.12.2023 ločena funkcija, ker se lahko posebej kliče med selektiranjem/deselektiranjem lokacij
    //-------------------------

    let place, month, placeMonth;
    let sum, nrData;

    //let myTime1 = Date.now()
    
    //---- Cache tabela za povprečje vseh (selektiranih) postaj (22.12.2023)
    for (month = 1; month <= nrMonthsAll; month++) {
        sum = 0; nrData = 0;
        for (place = 1; place <= nrPlaces; place++) {
            if (lo_enabledPlace[place]) {
                placeMonth = month - offsetMonths[place];
                if (placeMonth >= 1) {
                    if (!isNaN(avgTempCache[place][placeMonth])) {
                        sum += avgTempCache[place][placeMonth];
                        nrData += 1;
                    }
                }
            }
        }
        avgTempCacheAll[month] = sum / nrData;
    }

    //---- izpis potrebnega časa za postopek
    //let myTime2 = Date.now(); console.log("cache fill: " + (myTime2 - myTime1).toString() + "ms");
}

function paint_graph_timeAvgTemp(vp_left, vp_top, vp_width, vp_height, vp_graphType, vp_place, vp_timeSlice, vp_marginRight, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange) {
    //24.10.2023 uvedeni vhodni parametri vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange
    
    let place, yValue, placeMonth, offsetPlaceMonths, stepMonths, vl_drawLines;
    let lastPlaceMarkerX = []; let lastPlaceMarkerY = [];
    //
    let cv_graphMarginLeft, cv_graphMarginRight, cv_graphMarginTop, cv_graphMarginBottom;
    let cv_graphGapLeft, cv_graphGapRight, cv_graphGapTop, cv_graphGapBottom;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath:
            cv_graphMarginLeft = 20; cv_graphMarginRight = vp_marginRight; cv_graphMarginTop = 20; cv_graphMarginBottom = 16;
            cv_graphGapLeft = 0; cv_graphGapRight = 5; cv_graphGapTop = 5; cv_graphGapBottom = 0;
            break;
        case cv_graphType_timeAvgTemp:
            switch (gl_mode) {
                case cv_mode_timeAvgTempSingle: cv_graphMarginLeft = 26; break; // nekaj manj, ker ni okvirja in je že tako 8 rezerve
                default: cv_graphMarginLeft = 28; break;                        // da minus ne bo gledal ven
            }
            cv_graphMarginRight = vp_marginRight; cv_graphMarginTop = 20; cv_graphMarginBottom = 16;
            cv_graphGapLeft = 14; cv_graphGapRight = 70; cv_graphGapTop = 5; cv_graphGapBottom = 0;
            if (vp_place != cv_allPlace) { cv_graphGapRight = 20 };
            break;
    }
    const cv_graphLeft = vp_left + cv_graphMarginLeft //X koordinata Y osi oziroma začetka X osi
    const cv_graphRight = vp_left + vp_width - vp_marginRight //X koordinata konca X osi
    const cv_graphLeftData = cv_graphLeft + cv_graphGapLeft //X koordinata začetka področja podatkov
    //const cv_graphRightData = cv_graphRight - cv_graphGapRight //X koordinata konca področja podatkov
    let cv_graphRightData = cv_graphRight - cv_graphGapRight + lo_addRightMargin; //X koordinata konca področja podatkov
    if (cv_graphRightData < cv_graphLeftData + 50) { cv_graphRightData = cv_graphLeftData + 50 };
    if (cv_graphRightData > cv_graphRight) { cv_graphRightData = cv_graphRight };
    const cv_graphRangeX = cv_graphRightData - cv_graphLeftData //razpon X koordinat področja podatkov
    //----
    const cv_graphTopAxis = vp_top + cv_graphMarginTop //Y koordinata vrha Y osi
    const cv_graphTopData = cv_graphTopAxis + cv_graphGapTop //Y koordinata vrha območja podatkov
    const cv_graphBottom = vp_top + vp_height - cv_graphMarginBottom //Y koordinata dna grafa
    const cv_graphRangeY = cv_graphBottom - cv_graphTopData //razpon Y koordinat področja podatkov
    
    //---- določanje začetnega meseca
    let vl_monthStart
    switch (vp_graphType) {
        case cv_graphType_timeAvgTemp:
            vl_monthStart = gl_monthStart; break;
    }
    //---- določanje razpona mesecev in kx
    let vl_nrMonths = gl_monthEnd - vl_monthStart + 1;
    let kx;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath:
            kx = cv_graphRangeX / 100; break; // največ je 100% vaccinated
        case cv_graphType_timeAvgTemp:
            switch (vl_nrMonths - 1) {   //koliko je "prostorčkov" med prvim in zadnjim mesecem (primer: če je mesecev 15, je vmes 14 prostorčkov)
                case 0: kx = 100; break; //raje nisem dal 0, ker bi bil potem problem pri označevanju pozicije miške na X osi!
                default: kx = cv_graphRangeX / (vl_nrMonths - 1); break;
            }
    }
    //console.log("kx=" + kx.toString());

    //---- pregled Y vrednosti povprečne temperature in določanje ky
    let vl_minY, vl_maxY, vl_dataRange;
    switch (vp_forceDataRangeY) { //24.10.2023 je Y range že vnaprej določen za vse lokacije enako?
        case false:
            if (gl_showAvgAllPlace && vp_place == cv_allPlace) {
                ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValuesAvgAllPlace(vp_timeSlice, vl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
            } else {
                ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(vp_place, vp_timeSlice, vl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
            }
            break;
        default:
            vl_minY = vp_minY; vl_maxY = vp_maxY; vl_dataRange = vp_dataRange;
            break;
    }
    //---- 6.12.2023 upoštvam ročno kalibracijo minY in maxY
    let vl_addTempMarginDown = lo_addTempMarginDown; let vl_addTempMarginUp = lo_addTempMarginUp;
    if (gl_deltaT) { vl_addTempMarginDown /= 10; vl_addTempMarginUp /= 10 };
    if (vl_maxY - vl_minY - 1 > vl_addTempMarginDown) {
        vl_minY += vl_addTempMarginDown
    } else { vl_minY += Math.trunc(vl_maxY - vl_minY - 1) };
    if (vl_maxY - vl_minY - 1 > -vl_addTempMarginUp) {
        vl_maxY += vl_addTempMarginUp
    } else { vl_maxY += Math.trunc(vl_maxY - vl_minY - 1) };
    vl_dataRange = vl_maxY - vl_minY;
    //console.log("minY=" + vl_minY.toString() + "  maxY=" + vl_maxY.toString() + "  range=" + vl_dataRange.toString());
    
    const ky = cv_graphRangeY / vl_dataRange
    
    //---- Y koordinata vodoravne X osi
    let cv_graphY0 = cv_graphBottom; // Y koordinata X osi
    //if (vl_minY < 0) { cv_graphY0 = cv_graphBottom - ky * Math.abs(vl_minY) };
    if (vl_minY < 0) { cv_graphY0 -= ky * Math.abs(vl_minY) } else { cv_graphY0 += ky * Math.abs(vl_minY) };

    //---- risanje koordinatnih osi
    gLine(cv_graphLeft, cv_graphBottom, cv_graphLeft, cv_graphTopAxis, 2, "gray", [])
    let yOsX = cv_graphY0; //7.12.2023 na tem Y bo risana X os in oznake na njej
    if (yOsX > cv_graphBottom) { yOsX = cv_graphBottom };
    if (yOsX < cv_graphTopAxis) { yOsX = cv_graphTopAxis }; // 25.12.2023
    gLine(cv_graphLeft, yOsX, cv_graphRight, yOsX, 2, "gray", [])
    
    //---- nastavitev globalnih spremenljivk za pozicije in dimenzije all-place, multi-place ter multi-timeSlice grafov
    switch (gl_mode) {
        case cv_mode_timeAvgTempMultiTimeSlice:
            placeGraphLeft[vp_timeSlice] = vp_left;
            placeGraphLeftAxis[vp_timeSlice] = cv_graphLeft;
            placeGraphLeftData[vp_timeSlice] = cv_graphLeftData;
            placeGraphRightData[vp_timeSlice] = cv_graphRightData;
            placeGraphRight[vp_timeSlice] = cv_graphRight;
            placeGraphKx[vp_timeSlice] = kx;
            placeGraphTop[vp_timeSlice] = vp_top;
            placeGraphTopData[vp_timeSlice] = cv_graphTopData;
            placeGraphBottomAxis[vp_timeSlice] = cv_graphY0;
            placeGraphBottom[vp_timeSlice] = cv_graphBottom;
            placeGraphKy[vp_timeSlice] = ky;
            placeGraphWidth[vp_timeSlice] = vp_width;
            placeGraphHeight[vp_timeSlice] = vp_height;
            break;
        default:
            switch (vp_place) {
                case cv_allPlace:
                    lo_graphLeft = vp_left;
                    lo_graphLeftAxis = cv_graphLeft;
                    lo_graphLeftData = cv_graphLeftData;
                    lo_graphRightData = cv_graphRightData;
                    lo_graphRight = cv_graphRight;
                    lo_graphKx = kx;
                    lo_graphTop = vp_top;
                    lo_graphTopData = cv_graphTopData;
                    lo_graphBottomAxis = cv_graphY0;
                    lo_graphBottom = cv_graphBottom;
                    lo_graphKy = ky;
                    lo_graphWidth = vp_width;
                    lo_graphHeight = vp_height;
                    break;
                default:
                    placeGraphLeft[vp_place] = vp_left;
                    placeGraphLeftAxis[vp_place] = cv_graphLeft;
                    placeGraphLeftData[vp_place] = cv_graphLeftData;
                    placeGraphRightData[vp_place] = cv_graphRightData;
                    placeGraphRight[vp_place] = cv_graphRight;
                    placeGraphKx[vp_place] = kx;
                    placeGraphTop[vp_place] = vp_top;
                    placeGraphTopData[vp_place] = cv_graphTopData;
                    placeGraphBottomAxis[vp_place] = cv_graphY0;
                    placeGraphBottom[vp_place] = cv_graphBottom;
                    placeGraphKy[vp_place] = ky;
                    placeGraphWidth[vp_place] = vp_width;
                    placeGraphHeight[vp_place] = vp_height;
                    break;
            }
            break;
    }
    
    //---- oznake na Y osi
    let tmpStr = "T [" + scStopinj + "]";
    if (gl_deltaT) { tmpStr = scDelta + "T/10y[" + scStopinj + "]"; };
    gText(tmpStr, "bold italic 11pt cambria", "darkSlateGray", cv_graphLeft - 17, cv_graphTopAxis - 6);
    let x, y, font, tmpW, tmpH;
    let tmpTemp, tmpTempAbs, tmpTemp2;
    let yMark10 = true; let yMark5 = true; let yMark1 = true;
    let vl_dataRangeFactor = gl_deltaT ? 10 : 1;
    //if (vl_dataRange * vl_dataRangeFactor > 27) { yMark1 = false };
    if (vl_dataRange * vl_dataRangeFactor > 50) { yMark1 = false };
    if (vl_dataRange * vl_dataRangeFactor > 100) { yMark5 = false };
    let tmpShift; //8.12.2023
    switch (vp_place) {
        case cv_allPlace: { // Mode1,3
            switch (gl_timeSlice) { //15.12.2023
                case cv_timeSliceMonth: case cv_timeSliceSeason: // Mode3
                    font = "italic 10pt cambria"; tmpShift = 5; break;
                default: // Mode1
                    font = "italic 11pt cambria"; tmpShift = 6; break;
            }
            break;
        }
        default: { // Mode2
            font = "italic 10pt cambria"
            tmpShift = 4;
            break;
        }
    }
    for (tmpTemp = -25; tmpTemp <= 30; tmpTemp++) {
        //---- izpis pri 0 stopinj
        if (tmpTemp == 0) {
            y = cv_graphY0;
            //if (y <= cv_graphBottom) {
            if (valueBetween(y, cv_graphTopAxis, cv_graphBottom)) {
                tmpStr = "0"; //tmpTemp.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - tmpShift
                gText(tmpStr, font, "darkSlateGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        tmpTempAbs = Math.abs(tmpTemp);
        tmpTemp2 = tmpTemp / vl_dataRangeFactor; // 22.12.2023
        //---- gosta temnejša linija na vsakih 10 stopinj in številčna oznaka na Y osi
        if (yMark10 && (Math.abs(tmpTempAbs - 10 * Math.trunc(tmpTempAbs / 10)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpTemp2
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "gray", [2, 1])
                tmpStr = tmpTemp2.toString() + scStopinj;
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - tmpShift
                gText(tmpStr, font, "darkSlateGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        //---- srednje gosta srednje temna linija na vsakih 5 stopinj in številčna oznaka na Y osi
        if (yMark5 && (Math.abs(tmpTempAbs - 5 * Math.trunc(tmpTempAbs / 5)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpTemp2
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "gray", [2, 3])
                tmpStr = tmpTemp2.toString() + scStopinj;
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - tmpShift
                gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        //---- redka svetlejša linija na vsako stopinjo
        if (yMark1 && ky / vl_dataRangeFactor > 8) {
            y = cv_graphY0 - ky * tmpTemp2
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 5])
            }
        }
        //---- številčna oznaka na Y osi na vsao stopinjo
        if (yMark1 && ky / vl_dataRangeFactor > 12) {
            y = cv_graphY0 - ky * tmpTemp2
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                tmpStr = tmpTemp2.toString() + scStopinj;
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - tmpShift
                gText(tmpStr, font, "gray", x, y + tmpH / 2 - 1);
            }
        }        
    }
    
    //---- oznake na X osi
    let addX, addY; // 21.12.2023
    let tmpVacc, tmpMonth, tmpMonthValue, tmpMonthValue2, tmpYear, vl_xOld, vl_yOld, vl_xOldExact, vl_yOldExact;
    switch (vp_graphType) {
        case cv_graphType_timeAvgTemp:
            //---- oznake mesecev
            font = "normal 9pt cambria";
            vl_xOld = 0; vl_xOldExact = 0;
            let singleYear = false;
            if (lf_yearValue(vl_monthStart) == lf_yearValue(gl_monthEnd)) { singleYear = true };
            for (tmpMonth = vl_monthStart; tmpMonth <= gl_monthEnd; tmpMonth++) {
                tmpMonthValue = lf_monthValue(tmpMonth); //mesec od 1..12
                tmpYear = lf_yearValue(tmpMonth);
                x = cv_graphLeftData + kx * (tmpMonth - vl_monthStart);
                if (x >= cv_graphLeftData && x <= cv_graphRightData) {
                    tmpStr = "";
                    //---- vertikalna kratka črtica na X osi za vsak mesec
                    if (kx > 6) {
                        //---- kratka črtica kot oznaka meseca na X osi
                        gLine(x, yOsX - 2, x, yOsX + 2, 1, "darkSlateGray", []);
                        //---- potencialna enočrkovna oznaka meseca na X osi
                        if (valueBetween(kx, 23, 36.9)) {
                            tmpStr = lf_monthStrM(tmpMonth);
                        }
                    }
                     //---- vertikalna kratka črtica na X osi za vsako leto (pri najbolj zgoščenem prikazu)
                     if (kx < 1.5 && tmpMonthValue == 1) {
                        gLine(x - kx / 2, yOsX - 2, x, yOsX + 2, 1, "darkSlateGray", []);
                    }
                    if (kx < 1.5) { //---- pri najbolj zgoščenem izpisu samo skrajšana dvomestna letnica za vsako deseto leto
                        if (tmpMonthValue == 1 && 10 * Math.trunc(tmpYear / 10) == tmpYear) {
                            if (kx < 0.3) { tmpStr = lf_yearStrShort(tmpMonth) } else { tmpStr = tmpYear.toString() };
                            gLine(x - kx /2, cv_graphTopData, x, cv_graphBottom, 1, "silver", []);                            
                            //x += 8;
                        };
                    }
                    else if (kx < 4) { //---- pri najbolj zgoščenem izpisu skrajšana dvomestna letnica in pa vertikalna pregrada med leti pri prehodu v januar
                        if (tmpMonthValue == 1 && tmpMonth != vl_monthStart) {
                            tmpStr = lf_yearStrShort(tmpMonth);
                            x -= (x - vl_xOld) / 2;
                            gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "silver", []);
                            x += 8;
                        };
                    }                 
                    else if (kx < 37) { //---- pri malo manj zgoščenem izpisu vertikalna pregrada med leti pri prehodu v januar, in pa letnica oziroma eventualno začetnica meseca
                        if (tmpMonthValue == 1 && tmpMonth != vl_monthStart) {
                            tmpStr = lf_yearValue(tmpMonth);
                            x -= (x - vl_xOld) / 2;
                            gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "silver", []);
                            x += 15;
                        } else {
                            if (singleYear && kx > 6) { tmpStr = lf_monthStrM(tmpMonth); }
                        }
                    }
                    //else if (kx < 25) { tmpStr = tmpMonth.toString(); }        //---- pri še manj zgoščenem samo zaporedna številka meseca ("172")
                    //else if (kx < 37) { tmpStr = lf_monthStrMMM(tmpMonth); }   //---- pri še manj zgoščenem tromestna okrajšava meseca ("nov")
                    else if (kx < 60) { tmpStr = lf_monthStrMMYY(tmpMonth); }  //---- pri še manj "11/23"
                    else { tmpStr = lf_monthStrMY(tmpMonth); }                 //---- sicer "nov/2023"
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    gText(tmpStr, font, "dimGray", x - tmpW / 2, yOsX + 13);
                }
                vl_xOld = x;
            }
            //---- oznaka osi
            switch (gl_mode) { //(vp_place) {
                case cv_mode_timeAvgTempSingle: //case cv_allPlace:
                    tmpStr = "Time"; addX = 10; addY = 15;
                    break;
                case cv_mode_timeAvgTempMultiTimeSlice:
                    switch (vp_timeSlice) {
                        case cv_timeSliceSeason: case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                            tmpStr = "Time"; addX = -2; addY = 14;
                            break;
                        default:
                            tmpStr = "t"; addX = -2; addY = 14;
                            break;
                    }
                    break;
                default:
                    tmpStr = "t"; addX = -2; addY = 14;
                    if (vp_width > 700) { tmpStr = "Time"; addX = -2; addY = 14; };
                    break;
            }
            font = "bold italic 11pt cambria";
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            x = cv_graphRight - tmpW + addX
            y = yOsX + addY;
            ctx.beginPath; ctx.rect(x - 1, y - tmpH - 1, tmpW + 2, tmpH + 2); ctx.closePath; ctx.fillStyle = bckgColor; ctx.fill();
            gText(tmpStr, font, "darkSlateGray", x, y);
    }

    //---- risanje backround toolTip krogcev in vertikalne linije zanje
    paint_graph_timeAvgTemp_tipBeforeGraph(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky, cv_graphLeft, cv_graphRight, cv_graphTopData, cv_graphBottom);

    //---- risanje diagrama    
    let xValue, xValue0, monthIndex, kkk;
    let dataLineColor, dataLineColorFinal, dataPointColor, dataPointColorFinal, placeNameColor, dataLineWidth;
    switch (vp_graphType) {
        case cv_graphType_timeAvgTemp:
            xValue0 = vl_monthStart; break;
    }
    font = "bold 10pt verdana";

    //---- debelina markerja je odvisna od gostote izpisa
    let placeStart, placeEnd;
    let dataPointRadij = 3;
    switch (vp_place) {
        case cv_allPlace:
            placeStart = 1; placeEnd = nrPlaces; break;
        default:
            placeStart = vp_place; placeEnd = vp_place;
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    if (kx < 1.3) { dataPointRadij=1 }
                    else if (kx < 2.6) { dataPointRadij = 2 };
                    break;
                case cv_graphType_timeAvgTemp:
                    if (kx < 4) { dataPointRadij=1 }
                    else if (kx < 7) { dataPointRadij = 2 };
                    break;
            }
            break;
    }
    let vl_focus, vl_disabled;
    let vl_firstGraphDataPoint; //10.12.2023
    let vl_haveValidDataPoints, vl_currentPointValid, vl_previousPointValid, vl_showPoint; //12.12.2023
    let vl_pointUndefData; //14.12.2023
    let vl_showingAvgAllPlace = false; // 22.12.2023

    //----------------------------------------------
    //---- Risanje grafov po vrsti za vsako lokacijo
    //----------------------------------------------
    let tmpInt = 226; // =0xE2
    let cv_colorHideData = "rgb(" + tmpInt.toString() + ", " + tmpInt.toString() + ", " + tmpInt.toString() + ")";
    for (placeLoopIndex = placeStart; placeLoopIndex <= placeEnd; placeLoopIndex++) {
        
        //---- 22.12.2023
        if (placeLoopIndex == placeStart && gl_showAvgAllPlace && vp_place == cv_allPlace) {
            vl_showingAvgAllPlace = true;
        }
        //---- 22.12.2023
        if (vl_showingAvgAllPlace) {
            vl_disabled = false; vl_focus = false;
            dataPointColor = "darkBlue"; dataLineColor = "darkBlue"; placeNameColor = "darkBlue";
        } else {
            place = placeLoopIndex;
            //13.2.2023 v1.14
            vl_focus = false; vl_disabled = false;
            if (lf_regularPlace(lo_focusPlace)) {
                if (place == lo_focusPlace) { vl_focus = true }
                else { vl_disabled = true };
            }
            //17.5.2023 v1.22 lokacijo, ki je v fokusu (miška nad lokacijo v legendi lokacij) izrišem zadnjo, da je risana čez sive črte drugih lokacij in jo te ne prekrivajo
            switch (vp_place) {
                case cv_allPlace:
                    switch (vl_focus) {
                        case true: //smo na lokaciji s fokusom
                            //če lokacija s fokusom ni zadnja lokacija, potem najprej prikažem naslednjo lokacijo in to kot disabled
                            if (placeLoopIndex < placeEnd) {
                                vl_focus = false; vl_disabled = true;  //false;
                                place = placeLoopIndex + 1;
                            }
                            break;
                        default: //nismo na lokaciji s fokusom
                            //če ena lokacija ima fokus, in je ta lokacija že pred trenutno lokacijo, potem je treba prikazati naslednjo lokacijo, razen če je to zadnja lokacija v zanki (takrat je treba prikazati lokacijo s fokusom)
                            switch (lf_regularPlace(lo_focusPlace)) {
                                case true: //na eni drugi lokaciji je trenutno fokus
                                    if (placeLoopIndex == placeEnd) {
                                        //ena lokacija ima fokus, mi pa smo sedaj na zadnji lokaciji v zanki, zato je zdaj čas, da se nariše še lokacijo v fokusu, ki bo tako narisana čez vse
                                        vl_focus = true; vl_disabled = false;
                                        place = lo_focusPlace;
                                    } else if (placeLoopIndex > lo_focusPlace) {
                                        //ena lokacija ima fokus, mi pa smo sedaj za njo, kar pomeni, da moramo risati eno naprej in to v disabled načinu 
                                        vl_focus = false; vl_disabled = true;
                                        place = placeLoopIndex + 1;
                                    }
                                    break;
                                default: //nobena lokacija nima fokusa
                                    //normalno rišemo tekočo lokacijo
                                    break;
                            }
                            break;
                    }
                    break;
                default:
                    break;
            }
            //---- če je prikaz lokacije izključen, potem to lokacijo preskočim (25.1.2023 v1.1)
            if (!lo_enabledPlace[place]) { continue };
            //
            //if (place == cv_fin) {
            //    place = place
            //};
            placeNameColor = placeColor[place];
            dataLineWidth = 1;
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    switch (vp_place) {
                        case cv_allPlace: dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(80, placeColor[place]); break;
                        default: dataLineColor = placeColor[place]; dataPointColor = placeColor[place]; break;
                    }
                    break;
                case cv_graphType_timeAvgTemp:
                    dataLineColor = placeColor[place]; dataPointColor = placeColor[place]; break;
                //24.7.2023 tole spodaj sem raje spet ukinil, ker je delalo narobe
                //switch (vp_place) {
                //    case cv_allPlace: dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(80, placeColor[place]); break;
                //    default: dataLineColor = placeColor[place]; dataPointColor = placeColor[place]; break;
                //}
                //break;            
            }
            if (vl_focus) {
                dataLineColor = placeColor[place]; dataPointColor = placeColor[place]; dataLineWidth = 2;
            };
            //---- 15.12.2023
            dataLineWidth += lo_addMarkWidth;
            if (dataLineWidth < 1) { dataLineWidth = 1 };
            //if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = "lightGray"; placeNameColor = "lightGray"; };
            if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(25, placeColor[place]); placeNameColor = "lightGray"; };
            //console.log("placeNameColor=" + placeNameColor);
        }

        //-----------------------------------------
        //---- GRAF: najprej linije med krogci točk
        //-----------------------------------------
        vl_xOld = 0; vl_xOldExact = 0; vl_pointUndefData = false;
        vl_firstGraphDataPoint = true;
        vl_haveValidDataPoints = false; vl_currentPointValid = false; vl_previousPointValid = false; //12.12.2023
        //---- če so točke zelo na gosto in solidno povprečeno/glajeno, lahko izrisujem samo vsako drugo pa ne bo nič kaj razlike, bo pa hitreje
        vl_drawLines = true; //if (kx < 2.3 && vp_timeSlice == cv_timeSliceAll && lo_nrMonthsAvg >= 3  && cv_graphRangeY / ky > 27) { vl_drawLines = false }; //console.log("vl_drawLines=" + vl_drawLines.toString()); //14.12.2023
        //---- zanka čez vse mesece v izbranem razponu
        if (vl_drawLines) {
            for (month = vl_monthStart; month <= gl_monthEnd; month++) {
                if (vl_showingAvgAllPlace) {
                    placeMonth = month
                } else {
                    if (!valueBetween(month, firstMonth[place], lastMonth[place])) { continue }; //6.12.2023
                    placeMonth = month - offsetMonths[place];      //4.12.2023 ta mesec je v podatkih te lokacije na mestu placeMonth med podatki
                    if (gf_withinUndefPeriod(place, month)) { vl_pointUndefData = true; continue }; //---- 14.12.2023 če smo na mesecu in lokaciji znotraj katerega od nedefiniranih intervalov podatkov
                    //if (vl_pointUndefData) { vl_pointUndefData = false; continue }; // če je bila prejšnja točka še v nedefiniranem področju, potem linije ne rišem, za naprej si pa popravim, da zdaj nismo več v nedefiniranem področju
                }
                monthIndex = month - vl_monthStart + 1       //na grafu je tole zaporedna številka meseca po X osi
                tmpMonthValue = lf_monthValue(month);
                switch (vp_graphType) {
                    case cv_graphType_timeAvgTemp: xValue = month; break;
                }
                x = cv_graphLeftData + kx * (xValue - xValue0);
                //---- če imamo povprečenje vrednosti (lo_nrMonthsAvg>0), in se zahteva tudi izris točnih posameznih vrednosti (gl_showExactValuesToo), 
                //     zraven pa moramo imeti ali samo eno selektirano lokacijo (nrSelectedPlaces==1), ali pa risanje lokacije v fokusu (place == lo_focusPlace),
                //     potem najprej posivljeno izrišem točno vrednost (6.12.2023)            
                if (!vl_showingAvgAllPlace && lo_nrMonthsAvg > 0 && gl_showExactLinesToo && (nrSelectedPlaces == 1 || place == lo_focusPlace)) {
                    yValue = avgTemp[place][placeMonth];
                    y = cv_graphY0 - ky * yValue
                    gLine(vl_xOldExact, vl_yOldExact, x, y, dataLineWidth, gf_alphaColor(80, placeColor[place]), []);
                    vl_xOldExact = x; vl_yOldExact = y;
                }
                //---- risanja linije osnovne zahtevane krivulje ne bo, če timeSlice ni pravi (9.12.2023)
                switch (vp_timeSlice) {
                    case cv_timeSliceAll: break; //risanje seveda je
                    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                        if (tmpMonthValue !== vp_timeSlice) { continue }; //risanja ni, če ni točno določeni mesec
                        break;
                    case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                        tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                        if (tmpMonthValue !== tmpMonthValue2) { continue };             //rišem pri zadnjem mesecu letnega časa
                        if (vl_showingAvgAllPlace) {
                            if (month < 3) { continue } //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                        } else {
                            if (!valueBetween(placeMonth, 3, nrMonths[place])) { continue } //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                        }
                        break;
                }
                //if (vp_timeSlice == cv_timeSliceWinter && lf_yearValue(month) == 2015 && tmpMonthValue == 2) {
                //    month = month;
                //}
                //---- glede timeSlice smo na pravi točki (mesecu). Je ta v redu z vidika povprečenja?
                if (vl_previousPointValid) {
                    //---- ker je prejšnja valid, je tudi ta sigurno valid
                    vl_currentPointValid = true;
                } else {
                    //---- prejšnja ni bila valid, ali pa je sploh še ni bilo. Za tole je potrebno preveriti, ali se za zadnjo sploh da izračunati ustrezno povprečje ...
                    vl_currentPointValid = paint_graph_timeAvgTemp_enoughDataForAveraging(placeMonth, vp_timeSlice);
                }
                //---- zdaj pa še osnovno zahtevano povezovanje vrednosti            
                if (vl_showingAvgAllPlace) {
                    yValue = avgTempCacheAll[month];
                } else {
                    yValue = lf_getAvgValue(place, vp_timeSlice, placeMonth, cv_nrMonthsAvgMult * lo_nrMonthsAvg)
                }
                y = cv_graphY0 - ky * yValue
                //---- pri prvi podatkovni točki še ne more biti linije od prejšnje do te
                //---- pogoj za prvi data point pa je odvisen od vp_timeSlice (10.12.2023)
                if (vl_firstGraphDataPoint) {
                    switch (vp_timeSlice) {
                        case cv_timeSliceAll:
                            if (monthIndex > 1 && placeMonth > 1) { vl_firstGraphDataPoint = false };
                            break;
                        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                            if (monthIndex >= 13 && placeMonth >= 13) { vl_firstGraphDataPoint = false };
                            break;
                        case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                            //if (monthIndex >= 15 && placeMonth >= 15) { vl_firstGraphDataPoint = false };
                            if (monthIndex >= 13 && placeMonth >= 15) { vl_firstGraphDataPoint = false };
                            break;
                    }
                }
                //---- linijo rišem od prejšnje do trenutne točke, zato v primeru prve točke na grafu ni risanja
                if (!vl_firstGraphDataPoint && placeMonth > 1 && !vl_pointUndefData) {
                    //---- 5.12.2023 če je to odsek, kjer še ni bilo dovolj podatkov za regularno povprečenje, potem posivim
                    dataLineColorFinal = dataLineColor;
                    if (!vl_currentPointValid || !vl_previousPointValid) { dataLineColorFinal = cv_colorHideData };
                    //---- za risanje linije vsaj ena krajna točka daljice ne sme biti preko maxY
                    if (vl_yOld >= cv_graphTopAxis && y >= cv_graphTopAxis) {
                        //---- če sta obe krajišči znotraj, enostavno narišem linijo
                        gLine(vl_xOld, vl_yOld, x, y, dataLineWidth, dataLineColorFinal, []);
                    } else if (vl_yOld >= cv_graphTopAxis) {
                        //---- če je znotraj le začetna (naraščajoča daljica), moram izračunati končno, ki bo po Y na meji ...
                        kkk = (y - vl_yOld) / kx;
                        tmpX = vl_xOld + (cv_graphTopAxis - vl_yOld) / kkk;
                        gLine(vl_xOld, vl_yOld, tmpX, cv_graphTopAxis, dataLineWidth, dataLineColorFinal, []);
                    } else if (y >= cv_graphTopAxis) {
                        //---- če je znotraj le končna (padajoča daljica), moram izračunati začetno, ki bo po Y na meji ...
                        kkk = (y - vl_yOld) / kx;
                        tmpX = vl_xOld + (y - cv_graphTopAxis) / kkk;
                        gLine(tmpX, cv_graphTopAxis, x, y, dataLineWidth, dataLineColorFinal, []);
                    }
                }
                vl_xOld = x; vl_yOld = y;
                vl_previousPointValid = vl_currentPointValid; //12.12.2023
                vl_pointUndefData = false; //14.12.2023
            }
        }

        //----------------------------------------------------------------
        //---- GRAF: zdaj pa še za krogce točk, zato da so ti risani preko linij
        //----------------------------------------------------------------
        ctx.setLineDash([]);
        //---- če so točke zelo na gosto in solidno povprečeno/glajeno, lahko izrisujem samo vsako drugo pa ne bo nič kaj razlike, bo pa hitreje
        stepMonths = 1; //if (kx < 2.3 && vp_timeSlice == cv_timeSliceAll && lo_nrMonthsAvg >= 3 && cv_graphRangeY / ky > 27) { stepMonths = 2 }; //console.log("stepMonths=" + stepMonths.toString()); //14.12.2023
        //---- zanka čez vse mesece v izbranem razponu
        for (month = vl_monthStart; month <= gl_monthEnd; month+=stepMonths) {
            //if (month == 901) { //debug
            //    month = month;
            //}
            if (vl_showingAvgAllPlace) {
                placeMonth = month
            } else {
                if (!valueBetween(month, firstMonth[place], lastMonth[place])) { continue }; //6.12.2023
                placeMonth = month - offsetMonths[place];      //4.12.2023 ta mesec je v podatkih te lokacije na mestu placeMonth med podatki
                if (gf_withinUndefPeriod(place, month)) { continue }; //---- 14.12.2023 če smo na mesecu in lokaciji znotraj katerega od nedefiniranih intervalov podatkov
            }
            monthIndex = month - vl_monthStart + 1;      //na grafu je tole zaporedna številka meseca po X osi
            tmpMonthValue = lf_monthValue(month);
            switch (vp_graphType) {
                case cv_graphType_timeAvgTemp: xValue = month; break;
            }
            x = cv_graphLeftData + kx * (xValue - xValue0);
            //---- če imamo povprečenje vrednosti (lo_nrMonthsAvg>0), in se zahteva tudi izris točnih posameznih vrednosti (gl_showExactValuesToo), 
            //     zraven pa moramo imeti ali samo eno selektirano lokacijo (nrSelectedPlaces==1), ali pa risanje lokacije v fokusu (place == lo_focusPlace),
            //     potem najprej posivljeno izrišem točno vrednost (6.12.2023)
            if (!vl_showingAvgAllPlace && lo_nrMonthsAvg > 0 && gl_showExactValuesToo && (nrSelectedPlaces == 1 || place == lo_focusPlace)) {
                yValue = avgTemp[place][placeMonth];
                y = cv_graphY0 - ky * yValue
                if (y > cv_graphTopAxis) { //ne sme biti nad področjem predvidenim za graf
                    gEllipse(x, y, dataPointRadij, dataPointRadij, 0, gf_alphaColor(80, placeColor[place]), 0, "");
                }
            }
            //---- risanja markerja osnovne zahtevane krivulje ne bo, če timeSlice ni pravi (9.12.2023)
            switch (vp_timeSlice) {
                case cv_timeSliceAll: break; //risanje seveda je
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    if (tmpMonthValue !== vp_timeSlice) { continue }; //risanja ni, če ni točno določeni mesec
                    break;
                case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                    tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                    if (tmpMonthValue !== tmpMonthValue2) { continue };             //rišem pri zadnjem mesecu letnega časa
                    if (vl_showingAvgAllPlace) {
                        if (month < 3) { continue } //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                    } else {
                        if (!valueBetween(placeMonth, 3, nrMonths[place])) { continue } //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                    }
                    break;                
            }
            //---- zdaj pa še osnovno zahtevano označevanje vrednosti
            if (vl_showingAvgAllPlace) {
                yValue = avgTempCacheAll[month];
            } else {
                yValue = lf_getAvgValue(place, vp_timeSlice, placeMonth, cv_nrMonthsAvgMult * lo_nrMonthsAvg);
            }
            y = cv_graphY0 - ky * yValue
            //---- za risanje ne smemo biti preko maxY
            if (y >= cv_graphTopAxis) {
                //---- če je to odsek, kjer še ni bilo dovolj podatkov za regularno povprečenje, potem posivim (5.12.2023)
                dataPointColorFinal = dataPointColor;
                vl_showPoint = true;
                if (!lo_nrMonthsAvgAll && !paint_graph_timeAvgTemp_enoughDataForAveraging(placeMonth, vp_timeSlice)) {
                    dataPointColorFinal = cv_colorHideData;
                    if (!gl_showAvgFuzzyStartOscilations) {
                        vl_showPoint = false
                    };
                };
                //---- risanje točke
                if (vl_showPoint) {
                    gEllipse(x, y, dataPointRadij + lo_addMarkWidth, dataPointRadij + lo_addMarkWidth, 0, dataPointColorFinal, 0, "");
                }
                //---- beleženje zadnjih koordinat (10.12.2023)
                lastPlaceMarkerX[place] = x; 
                lastPlaceMarkerY[place] = y;
            }
        }
        if (vl_showingAvgAllPlace) { break }; // 23.12.2023 če smo risali za povprečje lokacij, potem ne smem nadaljevati zanke po lokacijah
    }
    //---------------------------------------------------------------------------
    //---- zdaj pa še za oznake lokacij, zato da so te v vsakem primeru preko krogcev točk in linij med krogci (ta problem je sicer le pri VACC-ExcessDeath diagramu)
    //---------------------------------------------------------------------------
    //---- zanka čez vse mesece v izbranem razponu
    font = "bold 10pt verdana";
    if (vl_showingAvgAllPlace) {
        switch (gl_mode) {
            case cv_mode_timeAvgTempMultiTimeSlice:
                //---- multi mode - risanje skupno za vse lokacije in ločeno po mesecih ali pa letnih časih
                tmpStr = lf_setTimeSliceNameENG(vp_timeSlice);
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "gray", 1, "lightGray", "bold 10pt verdana", "white", tmpStr, "lightGray", 2, 2);
                break;
        }
    } else {
        for (placeLoopIndex = placeStart; placeLoopIndex <= placeEnd; placeLoopIndex++) {
            place = placeLoopIndex;
            //13.2.2023 v1.14
            vl_focus = false; vl_disabled = false;
            if (lf_regularPlace(lo_focusPlace)) {
                if (place == lo_focusPlace) { vl_focus = true }
                else { vl_disabled = true };
            }
            //17.5.2023 v1.22 lokacijo, ki je v fokusu (miška nad lokacijo v legendi lokacij) izrišem zadnjo, da je risana čez sive črte drugih lokacij in jo te ne prekrivajo
            //srednji pogoj spodaj dodal 24.7.2023, da naslednje lokacije od fokusirane ne izpiše z neko srednje močno barvo
            switch (vp_place) {
                case cv_allPlace:
                    if (vl_focus && placeLoopIndex < placeEnd) {
                        vl_focus = false; vl_disabled = true;
                        place = placeLoopIndex + 1;
                    } else if (!vl_focus && lf_regularPlace(lo_focusPlace) && placeLoopIndex > lo_focusPlace && placeLoopIndex < placeEnd) {
                        vl_focus = false; vl_disabled = true;
                        place = placeLoopIndex + 1;
                    } else if (!vl_focus && lf_regularPlace(lo_focusPlace) && placeLoopIndex == placeEnd) {
                        vl_focus = true; vl_disabled = false;
                        place = lo_focusPlace;
                    }
                    break;
                default:
                    break;
            }
            //---- če je prikaz lokacije izključen, potem to lokacijo preskočim (25.1.2023 v1.1)
            if (!lo_enabledPlace[place]) { continue };
            month = gl_monthEnd
            monthIndex = month - vl_monthStart + 1
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    xValue = placeVaccByMonth[place][month - 1];
                    break;
                case cv_graphType_timeAvgTemp:
                    //---- če so se podatki za to lokacijo končali že prej kot na gl_monthEnd, je treba mesec postaviti na zadnji mesec podatkov te lokacije (5.12.2023)
                    if (lastMonth[place] < month) {
                        month = lastMonth[place];
                        monthIndex = month - vl_monthStart + 1;
                    };
                    xValue = month;
                    break;
            }

            //---- 8.12.2023 izpis lokacije v kotu desno zgoraj v primeru MULTI grafov sem preselil sem, da se izpiše tudi za lokacije, ki so že definirane, nimajo pa še definiranih podatkov.
            //if (vp_place != cv_allPlace) {
            //    tmpStr = placeName[place];
            //    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //    gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", placeNameColor, tmpStr, "lightGray", 2, 2);
            //}
            switch (vp_place) {
                case cv_allPlace:
                    //---- risanje skupno za vse lokacije. Vprašanje je, ali delamo ločeno po mesecih ali letnih časih (multiTimeSlice), ali ne?
                    switch (gl_mode) {
                        case cv_mode_timeAvgTempMultiTimeSlice:
                            //---- multi mode - risanje skupno za vse lokacije in ločeno po mesecih ali pa letnih časih
                            tmpStr = lf_setTimeSliceNameENG(vp_timeSlice);
                            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                            gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "gray", 1, "lightGray", "bold 10pt verdana", "white", tmpStr, "lightGray", 2, 2);
                            break;
                    }
                    break;
                default:
                    //---- risanje ločeno za eno lokacijo, se pravi da smo očitno v multiPlace mode
                    tmpStr = placeName[place];
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", placeNameColor, tmpStr, "lightGray", 2, 2);
                    break;
            }

            //---- če je mesec prikaza lokacije izven podatkovnega območja te lokacije
            if (month < firstMonth[place]) { continue };

            x = cv_graphLeftData + kx * (xValue - xValue0);
            yValue = lf_getAvgValue(place, vp_timeSlice, lf_getPlaceMonthDataIndex(place, month), cv_nrMonthsAvgMult * lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue

            placeNameColor = placeColor[place];
            //if (vl_focus) { dataLineColor = placeColor[place]; dataPointColor = placeColor[place]; };
            //if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = "lightGray"; placeNameColor = "lightGray" };
            if (vl_disabled) { placeNameColor = "lightGray" };
            //console.log("placeNameColor=" + placeNameColor);
            switch (vp_graphType) {
                case cv_graphType_timeAvgTemp:
                    //tmpStr = placeNameAbbr[place];
                    //tmpStr = placeName[place];
                    if (gl_showPlaceNameLevel !== cv_showPlaceNameLevel_none) { //15.12.2023
                        switch (gl_showPlaceNameLevel) {
                            case cv_showPlaceNameLevel_abbr: tmpStr = placeNameAbbr[place]; break;
                            case cv_showPlaceNameLevel_short: tmpStr = placeNameShort[place]; break;
                            case cv_showPlaceNameLevel_full: tmpStr = placeName[place]; break;
                        }
                        //;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                        switch (vp_place) {
                            case cv_allPlace:
                                //gText(tmpStr, "normal 9pt verdana", placeNameColor, x + 8, y + 3);
                                //gText(tmpStr, "normal 9pt verdana", placeNameColor, lastPlaceMarkerX[place] + 8, lastPlaceMarkerY[place] + 3);
                                if (lo_addMarkWidth >= 3) {
                                    gText(tmpStr, "bold 11pt verdana", placeNameColor, lastPlaceMarkerX[place] + 10, lastPlaceMarkerY[place] + 3);
                                } else if (lo_addMarkWidth >= 2) {
                                    gText(tmpStr, "normal 10pt verdana", placeNameColor, lastPlaceMarkerX[place] + 9, lastPlaceMarkerY[place] + 3);
                                } else {
                                    gText(tmpStr, "normal 9pt verdana", placeNameColor, lastPlaceMarkerX[place] + 8, lastPlaceMarkerY[place] + 3);
                                }
                                break;
                        }
                    }
                    break;
            }
            vl_xOld = x; vl_yOld = y
        }
    }

    //---- foreground toolTip krogci
    paint_graph_timeAvgTemp_tipAfterGraph(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);

    //Izpis tekočega meseca
    let tmpDist, ddx;
    switch (lo_showGUI) {
        case true: {
            tmpDist = 13; ddx = 4;
            //---- tu je viden cel GUI - ta se je izrisal ločeno, med risanjem grafov pa se izriše še tale tabletek za izbrano obdobje
            //----
            //gText("A+mWheel", "italic 8pt cambria", "darkGray", intChooserNrMonthsAvg.left + intChooserNrMonthsAvg.width - 50, 9);
            //if (lo_enabledIntChooserNrMonthsAvg && intChooserNrMonthsAvg.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) {
            //    gText("A+mWheel", "italic 10pt cambria", "darkGray", intChooserNrMonthsAvg.left + intChooserNrMonthsAvg.width - 55, 12);
            //}
            ////----
            //if (lo_enabledIntChooserSmoothYears && intChooserSmoothYears.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) {
            //    gText("O+mWheel", "italic 10pt cambria", "darkGray", intChooserSmoothYears.left + intChooserSmoothYears.width - 55, 10);
            //}
            //----
            tmpStr = lf_monthStrMMYY(gl_monthStart) + "-" + lf_monthStrMMYY(gl_monthEnd);
            font = "bold 10pt verdana";
            x = lo_currentMonthTextLeft;
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //let tmpLeft = 400; let tmpTop = 20;
            //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            lo_radialGradientFill = true;
            rgfc1x = x + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
            rgfc2x = x + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
            rgfcs1 = 0; rgfc1 = "greenYellow";
            rgfcs2 = 0.6; rgfc2 = "gold";
            rgfcs3 = 1; rgfc3 = "azure";
            gBannerRoundRectWithText(x, lo_currentMonthTextTop, tmpW, tmpH, font, "darkSlateGray", tmpStr, ddx, 9, 5, "azure", 1, "lightGray", "lightGray", 3, 3, false)
            //----
            //gText("(0+)mWheel", "italic 8pt cambria", "darkGray", x + 42, lo_currentMonthTextTop - 12);
            if (sliderMonthEnd.enabled && sliderMonthEnd.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY) && sliderMonthEnd.width > 200) {
                gText("(0+)mWheel", "italic 10pt cambria", "darkGray", sliderMonthEnd.left + sliderMonthEnd.width - 60, 12);
            }            
            x += tmpW + tmpDist;
            //----
            tmpStr = lf_setTimeSliceText(); //10.12.2023
            font = "bold 10pt verdana";
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //let tmpLeft = 400; let tmpTop = 20;
            //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            lo_radialGradientFill = true;
            rgfc1x = x + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
            rgfc2x = x + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
            rgfcs1 = 0; rgfc1 = "red";
            rgfcs2 = 0.6; rgfc2 = "orange";
            rgfcs3 = 1; rgfc3 = "azure";
            gBannerRoundRectWithText(x, lo_currentMonthTextTop, tmpW, tmpH + 1, font, "white", tmpStr, ddx, 9, 5, "azure", 1, "lightGray", "lightGray", 3, 3, false)
            //----
            //gText("T+mWheel", "italic 8pt cambria", "darkGray", x + 10, lo_currentMonthTextTop - 12);
            if (mouseInsideRect(lo_mouseMoveX, lo_mouseMoveY, x - ddx, lo_currentMonthTextTop - 9, x + tmpW + ddx, lo_currentMonthTextTop + tmpH + 9)) {
                gText("T+mWheel", "italic 10pt cambria", "darkGray", x + 5, 11);
            }
            break;
        }
        default: {
            tmpDist = 18; ddx = 6;
            //---- tu GUI ni viden - med risanjem grafov se posebej izriše še tale tabletek za izbrano obdobje ter tabletek za izbrano povprečenje
            tmpStr = lf_monthStrMY(gl_monthStart) + ".." + lf_monthStrMY(gl_monthEnd);
            font = "bold 10pt verdana";
            x = 13;
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //let tmpLeft = 400; let tmpTop = 20;
            //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            lo_radialGradientFill = true;
            rgfc1x = x + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
            rgfc2x = x + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
            rgfcs1 = 0; rgfc1 = "greenYellow";
            rgfcs2 = 0.6; rgfc2 = "gold";
            rgfcs3 = 1; rgfc3 = "azure";
            gBannerRoundRectWithText(x, lo_currentMonthTextTop, tmpW, tmpH, font, "darkSlateGray", tmpStr, ddx, 9, 5, "azure", 1, "lightGray", "lightGray", 3, 3, false)
            x += tmpW + tmpDist;          
            //----
            tmpStr = lf_setNrMonthsAvgTextShort(); //8.12.2023
            font = "bold 10pt verdana";
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //let tmpLeft = 400; let tmpTop = 20;
            //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            lo_radialGradientFill = true;
            rgfc1x = x + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
            rgfc2x = x + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
            rgfcs1 = 0; rgfc1 = "aquamarine";
            rgfcs2 = 0.6; rgfc2 = "deepSkyBlue";
            rgfcs3 = 1; rgfc3 = "azure";
            gBannerRoundRectWithText(x, lo_currentMonthTextTop, tmpW, tmpH + 1, font, "darkSlateGray", tmpStr, ddx, 9, 5, "azure", 1, "lightGray", "lightGray", 3, 3, false)
            x += tmpW + tmpDist;
            //----
            tmpStr = lf_setTimeSliceText(); //10.12.2023
            font = "bold 10pt verdana";
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //let tmpLeft = 400; let tmpTop = 20;
            //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
            lo_radialGradientFill = true;
            rgfc1x = x + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
            rgfc2x = x + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
            rgfcs1 = 0; rgfc1 = "red";
            rgfcs2 = 0.6; rgfc2 = "orange";
            rgfcs3 = 1; rgfc3 = "azure";
            gBannerRoundRectWithText(x, lo_currentMonthTextTop, tmpW, tmpH + 1, font, "white", tmpStr, 8, 9, 5, "azure", 1, "lightGray", "lightGray", 3, 3, false)
            break;
        }
            
    }
    
    //oznake koordinat miške
    font = "italic 9pt cambria";
    let tmpValue;
    //if (lo_mouseMoveX > 1.005 * cv_graphLeftData && lo_mouseMoveX < 0.995 * cv_graphRightData) {
    if (!lo_mouseOut && lo_mouseMoveX > 1.005 * cv_graphLeftData && lo_mouseMoveX < 0.995 * cv_graphRightData && lo_mouseMoveY > 1.005 * cv_graphTopData && lo_mouseMoveY < 0.995 * cv_graphBottom) {
        gLine(lo_mouseMoveX, cv_graphY0 - 30, lo_mouseMoveX, cv_graphY0 + 10, 1, "gray", [2, 2]);
        tmpValue = xValue0 + (lo_mouseMoveX - cv_graphLeftData) / kx;
        switch (vp_graphType) {
            case cv_graphType_vaccExcessDeath: tmpStr = tmpValue.toFixed(2) + "%"; break;
            case cv_graphType_timeAvgTemp: tmpStr = tmpValue.toFixed(2); break;
        }
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", lo_mouseMoveX + 2, cv_graphY0 - 4); //--- pod X osjo pri X koordinati miške - izpiše zaporedno številko meseca
        //if (lo_mouseMoveY > 1.005 * cv_graphTopData && lo_mouseMoveY < 0.995 * cv_graphBottom && ky != 0) {
        if (ky != 0) {
            gLine(cv_graphLeft - 10, lo_mouseMoveY, cv_graphLeft + 40, lo_mouseMoveY, 1, "gray", [2, 2]);
            tmpTemp = (cv_graphY0 - lo_mouseMoveY) / ky;
            tmpStr = tmpTemp.toFixed(1) + scStopinj;
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            gText(tmpStr, font, "dimGray", cv_graphLeft + 3, lo_mouseMoveY - 3); //--- pri Y osi pri Y koordinati miške - izpiše temperaturo
        }
    }

    //---- risanje toolTip okvirja in vsebine
    paint_graph_timeAvgTemp_tipContent(vp_place, vp_timeSlice, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);

}

function paint_graph_timeAvgTemp_enoughDataForAveraging(vp_placeMonth, vp_timeSlice) {
    //---------------------------------------
    // 12.12.2023 preverjanje, ali se za to točko da izračunati povprečje, oziroma če je za to dovolj podatkov do te točke
    //            previdno, vp_placeMonth je zaporedna številka podatka znotraj podatkov ene lokacije, ne globalno
    //            in vp_placeMonth podatek mora ustrezati timeSlice-u. Se pravi če je timeSlice=3, mora tudi placeMonth biti podatek za enega od marcev!
    //---------------------------------------
    let tmpMargin;

    //---- potrebno je preveriti, ali se za to točko sploh da izračunati ustrezno povprečje ...
    switch (vp_timeSlice) {
        case cv_timeSliceAll:
            tmpMargin = cv_nrMonthsAvgMult * lo_nrMonthsAvg; break;
        case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
            tmpMargin = cv_nrMonthsAvgMult * (lo_nrMonthsAvg - 1); break; //za 0 let je ok, za 1 leto je že ok, za 2 leti rabiš  vsaj 13, za 3 leta 25, ...
        case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
            tmpMargin = 3; // za 0 let je dovolj 3, za 1 leto tudi 3, za 2 leti 15, za 3 leta 27, ...
            if (lo_nrMonthsAvg > 0) { tmpMargin = cv_nrMonthsAvgMult * (lo_nrMonthsAvg - 1) };
            break;
    }

    if (vp_placeMonth >= tmpMargin) { return true } else { return false };

}

function paint_graph_timeAvgTemp_tipContent(vp_place, vp_timeSlice, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    //prikaz tipsov glede na vrsto grafa
    let tmpMonthValue, tmpMonthValue2;
    switch (gl_mode) {
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempMultiTimeSlice:
            // toolTip je lahko samo v primeru meseca, ki ustreza vp_timeSlice
            switch (vp_timeSlice) { //10.12.2023
                case cv_timeSliceAll: break; //toolTip je lahko na vsakem mesecu
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    //---- toolTip je lahko samo na mesecu, ki je določen z vp_timeSlice
                    if (lf_monthValue(lo_tipMonth) !== vp_timeSlice) { return }; //če ni pravi mesec, ga preskočim
                    break;
                case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                    //---- povprečju dodajamo le na zadnjem mesecu ustreznega letnega časa, dodamo mu pa povprečje zadnjih treh mesecev
                    tmpMonthValue = lf_monthValue(lo_tipMonth);
                    tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                    if (tmpMonthValue !== tmpMonthValue2) { return };             //računam pri zadnjem mesecu letnega časa
                    break;                    
            } 
            // prikaz toolTip vsebine
            paint_graph_timeAvgTemp_tipContent_timeAvgTemp(vp_place, vp_timeSlice, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);
            break;
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (lf_regularPlace(lo_focusPlace) && lf_regularMonth(lo_focusMonth)) {
                if (gl_mode == cv_mode_vaccExcessDeath || (gl_mode == cv_mode_vaccExcessDeathMulti && vp_place == lo_focusPlace)) {
                    paint_graph_timeExcessDeath_tipContent_vaccExcessDeath(lo_focusPlace, vp_timeSlice, lo_focusMonth, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);    
                }
            }
            break;
    }
}

function paint_graph_timeExcessDeath_tipContent_vaccExcessDeath(vp_place, vp_timeSlice, vp_month, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {
    
    if (!lo_enabledPlace[vp_place]) { return };

    const basicFrameWidth = 160;
    let frameWidth = basicFrameWidth;
    const cv_heightMonth = 30;
    const cv_heightSingle = 16;
    let cv_heightBody = 2 * cv_heightSingle;
    const frameHeight = cv_heightMonth + cv_heightBody - 3;
    //---- postavitev toolTip okvirja znotraj okna
    //---- postavitev po Y-u
    let frameTop = lo_mouseMoveY - frameHeight / 2; //po Y postavi tako, da je cursor na sredini toolTip-a
    if (frameTop < vp_top) { frameTop = vp_top };   //če zgoraj gre ven, naj se začne na vrhu
    if (frameTop + frameHeight > cv_graphBottom) { frameTop = cv_graphBottom - frameHeight }; //če spodaj gre ven, naj gre spodaj ravno do roba
    //---- postavitev po X-u
    let frameLeft = lo_mouseMoveX - 8 - frameWidth;                   //postavi toolTip malce levo od kurzorja miške
    if (frameLeft < cv_graphLeft) { frameLeft = lo_mouseMoveX + 10 }; //če levo gre ven, naj se začne na levi na začetku
    if (frameLeft + frameWidth > cv_graphRight) { frameLeft = cv_graphRight - frameWidth }; //če desno gre ven, naj gre desno ravno do roba

    //---- background toolTip okvir
    gBannerRoundRect(frameLeft, frameTop, frameWidth, frameHeight, 4, gf_alphaColor(224, "mintCream"), 1, "gray", "#C0C0C080", 3, 3, false);

    //---- izpis meseca na vrhu
    let tmpStr, tmpW, tmpH, font, x, y, place;
    font = "bold 13px verdana";
    tmpStr = lf_monthStrMMMYY(vp_month) + "  (#" + vp_month.toString() + ")";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = frameLeft + frameWidth / 2 - tmpW / 2;
    y = frameTop + 4 + tmpH;
    gText(tmpStr, font, "darkSlateGray", x, y);

    //---- pa še podatki za konkreten data-point
    const cv_gapLeft = 6; const cv_gapRight = 10; const cv_xDvopicje = frameLeft + frameWidth - 65;
    y += 20;
    font = "normal 12px verdana";
    //----
    tmpStr = "vaccinated";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = cv_xDvopicje - cv_gapLeft - tmpW;
    gText(tmpStr, font, "darkSlateGray", x, y);
    gText(":", font, "darkSlateGray", cv_xDvopicje, y);
    gText(placeVaccByMonth[vp_place][vp_month - 1].toFixed(1) + "%", font, "darkSlateGray", cv_xDvopicje + cv_gapRight, y);
    //----
    y += cv_heightSingle;
    tmpStr = "excess death";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = cv_xDvopicje - cv_gapLeft - tmpW;
    gText(tmpStr, font, "darkSlateGray", x, y);
    gText(":", font, "darkSlateGray", cv_xDvopicje, y);
    gText(lf_getAvgValue(vp_place, vp_timeSlice, vp_month, cv_nrMonthsAvgMult * lo_nrMonthsAvg).toFixed(1)+"%", font, "darkSlateGray", cv_xDvopicje + cv_gapRight, y);
}

function paint_graph_timeAvgTemp_tipContent_timeAvgTemp(vp_place, vp_timeSlice, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {
    
    //miška mora biti nad tekočim grafom
    if (lo_tipMonth <= 0) { return };
    
    const basicFrameWidth = 170;
    let frameWidth = basicFrameWidth;
    const cv_heightMonth = 30;
    const cv_heightSingle = 16;
    let cv_heightBody;
    let tmpStr, tmpW, tmpH, font, x, y;
    let place;
    //prilagoditev širine in višine toolTip okvirja
    font = "normal 12px verdana";
    switch (vp_place) {
        case cv_allPlace:
            //if (!lo_enabledPlace[cv_placeSkofjaLoka]) {
            //    frameWidth = basicFrameWidth - 20;
            //    if (!lo_enabledPlace[cv_placeSkofjaLoka] && !lo_enabledPlace[cv_placeSkofjaLoka] && !lo_enabledPlace[cv_placeSkofjaLoka] && !lo_enabledPlace[cv_placeSkofjaLoka]) {
            //        frameWidth = basicFrameWidth - 45;
            //    };
            //};
            //cv_heightBody = nrSelectedPlaces * cv_heightSingle   //zakomentiral 4.12.2023, ker selektiranih lokacoij je že lahko toliko, a nimajo vse podatkov na mesti toolTip-a!
            let tipPlacesWithData = 0;
            let maxWidth = 0;
            if (gl_showAvgAllPlace) {
                tmpStr = "average";
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                if (tmpW > 110) { frameWidth = tmpW + 64 };
                cv_heightBody = cv_heightSingle;
            } else {
                for (place = 1; place <= nrPlaces; place++) { 
                    if (!lo_enabledPlace[place]) { continue };
                    //offsetPlaceMonths = (12 * minYear[place] + minMonth[place]) - (12 * minYearAll + minMonthAll); //4.12.2023
                    //if (lo_tipMonth <= offsetPlaceMonths) { continue }
                    //if (lo_tipMonth <= offsetMonths[place]) { continue }
                    if (!valueBetween(lo_tipMonth, firstMonth[place], lastMonth[place])) { continue }
                    tipPlacesWithData += 1;
                    tmpStr = placeName[place];
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    if (tmpW > maxWidth) { maxWidth = tmpW }
                }
                cv_heightBody = tipPlacesWithData * cv_heightSingle
                if (maxWidth > 110) { frameWidth = maxWidth + 64 };
            }
            break;
        default:
            //if (vp_place!=cv_placeSkofjaLoka) {
            //    frameWidth = basicFrameWidth - 20;
            //    if (vp_place!=cv_lie && vp_place!=cv_lux && vp_place!=cv_ned && vp_place!=cv_swi) {
            //        frameWidth = basicFrameWidth - 45;
            //    };
            //};
            cv_heightBody = cv_heightSingle
            //offsetPlaceMonths = (12 * minYear[place] + minMonth[place]) - (12 * minYearAll + minMonthAll); //4.12.2023
            //if (lo_tipMonth <= offsetPlaceMonths) { cv_heightBody = 0 }
            if (lo_tipMonth <= offsetMonths[place]) {
                cv_heightBody = 0
            } else {
                tmpStr = placeName[vp_place];
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                if (tmpW > 110) { frameWidth = tmpW + 64 }
            }
            break
    }
    const frameHeight = cv_heightMonth + cv_heightBody - 3;
    //---- postavitev toolTip okvirja znotraj okna
    //---- postavitev po Y-u
    let frameTop = lo_mouseMoveY - frameHeight / 2; //po Y postavi tako, da je cursor na sredini toolTip-a
    if (frameTop < vp_top) {
        frameTop = vp_top;  //če zgoraj gre ven, naj se začne na vrhu
    } else if (frameTop + frameHeight > cv_graphBottom) {
        frameTop = cv_graphBottom - frameHeight; //če spodaj gre ven, naj gre spodaj ravno do roba
    }
    //---- postavitev po X-u
    let frameLeft = lo_mouseMoveX - 8 - frameWidth;                   //postavi toolTip malce levo od kurzorja miške
    if (frameLeft < cv_graphLeft) { frameLeft = lo_mouseMoveX + 10 }; //če levo gre ven, naj se začne na levi na začetku
    if (frameLeft + frameWidth > cv_graphRight) { frameLeft = cv_graphRight - frameWidth }; //če desno gre ven, naj gre desno ravno do roba

    //---- background toolTip okvir
    gBannerRoundRect(frameLeft, frameTop, frameWidth, frameHeight, 4, gf_alphaColor(224, "mintCream"), 1, "gray", "#C0C0C080", 3, 3, false);

    //---- izpis meseca/letnega časa na vrhu
    font = "bold 13px verdana";
    switch (vp_timeSlice) {
        case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn: case cv_timeSliceSeason:
            tmpStr = lf_seasonStrSmallYYYY(lo_tipMonth);
            break;
        default:
            tmpStr = lf_monthStrMMMYYYY(lo_tipMonth);
            break;
    }    
    tmpStr += "  (#" + lo_tipMonth.toString() + ")";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = frameLeft + frameWidth / 2 - tmpW / 2;
    y = frameTop + 4 + tmpH;
    gText(tmpStr, font, "darkSlateGray", x, y);

    //---- pa še podatki za lokacijo/lokacije
    const cv_gapLeft = 6; const cv_gapRight = 10;
    const cv_xDvopicje = frameLeft + frameWidth - 50;
    y += 20;
    font = "normal 12px verdana";
    if (gl_showAvgAllPlace && vp_place == cv_allPlace) {
        tmpStr = "average";
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        x = cv_xDvopicje - cv_gapLeft - tmpW;
        gText(tmpStr, font, "darkBlue", x, y);
        //----
        gText(":", font, "darkSlateGray", cv_xDvopicje, y);
        //----
        gText(avgTempCacheAll[lo_tipMonth].toFixed(1) + scStopinj, font, "darkBlue", cv_xDvopicje + cv_gapRight, y);
    } else {
        for (place = 1; place <= nrPlaces; place++) {
            if (!lo_enabledPlace[place]) { continue };
            if (vp_place != cv_allPlace && place != vp_place) { continue };
            //----
            //offsetPlaceMonths = (12 * minYear[place] + minMonth[place]) - (12 * minYearAll + minMonthAll); //4.12.2023
            //if (lo_tipMonth <= offsetPlaceMonths) { continue }
            //if (lo_tipMonth <= offsetMonths[place]) { continue }
            if (!valueBetween(lo_tipMonth, firstMonth[place], lastMonth[place])) { continue }
            //----
            tmpStr = placeName[place];
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            x = cv_xDvopicje - cv_gapLeft - tmpW;
            gText(tmpStr, font, placeColor[place], x, y);
            //----
            gText(":", font, "darkSlateGray", cv_xDvopicje, y);
            //----
            //gText(lf_getAvgValue(place, lo_tipMonth - offsetPlaceMonths, cv_nrMonthsAvgMult * lo_nrMonthsAvg).toFixed(1) + scStopinj, font, placeColor[place], cv_xDvopicje + cv_gapRight, y);
            gText(lf_getAvgValue(place, vp_timeSlice, lo_tipMonth - offsetMonths[place], cv_nrMonthsAvgMult * lo_nrMonthsAvg).toFixed(1) + scStopinj, font, placeColor[place], cv_xDvopicje + cv_gapRight, y);
            //----
            y += cv_heightSingle;
        }
    }

}

function paint_graph_timeAvgTemp_tipBeforeGraph(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky, cv_graphLeft, cv_graphRight, cv_graphTopData, cv_graphBottom) {

    lo_tipMonth = 0;

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    let place, tmpMonthValue, tmpMonthValue2;

    if (lo_mouseMoveX > cv_graphLeft && lo_mouseMoveX < cv_graphRight && lo_mouseMoveY > cv_graphTopData && lo_mouseMoveY < cv_graphBottom) {
        //---- določanje tipMonth
        switch (gl_mode) {
            case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempMultiTimeSlice:
                lo_tipMonth = Math.round(vl_monthStart + (lo_mouseMoveX - cv_graphLeftData) / kx);
                if (lo_tipMonth < vl_monthStart) { lo_tipMonth = vl_monthStart };
                if (lo_tipMonth > gl_monthEnd) { lo_tipMonth = gl_monthEnd };
                switch (vp_timeSlice) { //10.12.2023
                    case cv_timeSliceAll: break; //toolTip je lahko na vsakem mesecu
                    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                        //---- toolTip je lahko samo na mesecu, ki je določen z vp_timeSlice
                        //if (lf_monthValue(lo_tipMonth) !== vp_timeSlice) { return }; //če ni pravi mesec, ga preskočim
                        lo_tipMonth = lf_getNearestTimeSliceMonth(lo_tipMonth, vp_timeSlice - cv_timeSliceMonthMin + 1, vl_monthStart, gl_monthEnd); //11.12.2023
                        if (lo_tipMonth == 0) { return };
                        break;
                    case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                        //---- povprečju dodajamo le na zadnjem mesecu ustreznega letnega časa, dodamo mu pa povprečje zadnjih treh mesecev
                        //tmpMonthValue = lf_monthValue(lo_tipMonth);
                        tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                        //if (tmpMonthValue !== tmpMonthValue2) { return };             //računam pri zadnjem mesecu letnega časa
                        lo_tipMonth = lf_getNearestTimeSliceMonth(lo_tipMonth, tmpMonthValue2, vl_monthStart, gl_monthEnd); //11.12.2023
                        if (lo_tipMonth == 0) { return };
                        break;                    
                }
        }
        //---- risanje background toolTip krogcev
        switch (gl_mode) {
            case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiTimeSlice:
                if (gl_showAvgAllPlace) {
                    paint_graph_timeAvgTemp_tipMarkerDown(cv_allPlace, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                } else {
                    for (place = 1; place <= nrPlaces; place++) {
                        paint_graph_timeAvgTemp_tipMarkerDown(place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                    }
                }
  
                break;
            case cv_mode_timeAvgTempMultiPlace:
                paint_graph_timeAvgTemp_tipMarkerDown(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                break;
            case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
                if (lf_regularPlace(lo_focusPlace) && lf_regularMonth(lo_focusMonth)) {
                    paint_graph_timeAvgTemp_tipMarkerDown(lo_focusPlace, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                }
                break;
        }
        //---- risanje vertikalne linije za toolTip
        switch (gl_mode) {
            case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiPlace: case cv_mode_timeAvgTempMultiTimeSlice:
                paint_graph_timeExcessDeath_tipVerticalLine(vl_monthStart, kx, cv_graphLeftData, cv_graphTopData, cv_graphBottom);
        }
    }
}

function paint_graph_timeAvgTemp_tipAfterGraph(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    //---- risanje foreground toolTip krogcev
    let place, tmpMonthValue, tmpMonthValue2;
    switch (gl_mode) {
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiTimeSlice:
            //miška mora biti nad grafom
            if (lo_tipMonth <= 0) { return };
            // toolTip je lahko samo v primeru meseca, ki ustreza vp_timeSlice
            switch (vp_timeSlice) { //10.12.2023
                case cv_timeSliceAll: break; //toolTip je lahko na vsakem mesecu
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    //---- toolTip je lahko samo na mesecu, ki je določen z vp_timeSlice
                    //if (lf_monthValue(lo_tipMonth) !== vp_timeSlice) { return }; //če ni pravi mesec, ga preskočim
                    lo_tipMonth = lf_getNearestTimeSliceMonth(lo_tipMonth, vp_timeSlice - cv_timeSliceMonthMin + 1, vl_monthStart, gl_monthEnd); //11.12.2023
                    if (lo_tipMonth == 0) { return };                    
                    break;
                case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                    //---- povprečju dodajamo le na zadnjem mesecu ustreznega letnega časa, dodamo mu pa povprečje zadnjih treh mesecev
                    //tmpMonthValue = lf_monthValue(lo_tipMonth);
                    tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                    //if (tmpMonthValue !== tmpMonthValue2) { return };             //računam pri zadnjem mesecu letnega časa
                    lo_tipMonth = lf_getNearestTimeSliceMonth(lo_tipMonth, tmpMonthValue2, vl_monthStart, gl_monthEnd); //11.12.2023
                    if (lo_tipMonth == 0) { return };
                    break;                    
            }            
            //grem čez vse lokacije in pri vsaki za lo_tipMonth narišem foreground marker
            if (gl_showAvgAllPlace) { // 24.12.2023
                paint_graph_timeAvgTemp_tipMarkerUp(cv_allPlace, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            } else {
                for (place = 1; place <= nrPlaces; place++) {
                    paint_graph_timeAvgTemp_tipMarkerUp(place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                }
            }
            break;
        case cv_mode_timeAvgTempMultiPlace:
            //miška mora biti nad tekočim grafom
            if (lo_tipMonth <= 0) { return };
            // toolTip je lahko samo v primeru meseca, ki ustreza vp_timeSlice
            switch (vp_timeSlice) { //10.12.2023
                case cv_timeSliceAll: break; //toolTip je lahko na vsakem mesecu
                case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                    //---- toolTip je lahko samo na mesecu, ki je določen z vp_timeSlice
                    if (lf_monthValue(lo_tipMonth) !== vp_timeSlice) { return }; //če ni pravi mesec, ga preskočim
                    break;
                case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                    //---- povprečju dodajamo le na zadnjem mesecu ustreznega letnega časa, dodamo mu pa povprečje zadnjih treh mesecev
                    tmpMonthValue = lf_monthValue(lo_tipMonth);
                    tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                    if (tmpMonthValue !== tmpMonthValue2) { return };             //računam pri zadnjem mesecu letnega časa
                    break;                    
            }             
            //za to lokacijo za lo_tipMonth narišem foreground marker
            paint_graph_timeAvgTemp_tipMarkerUp(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            break;
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (lf_regularPlace(lo_focusPlace) && lf_regularMonth(lo_focusMonth)) {
                paint_graph_timeAvgTemp_tipMarkerUp(lo_focusPlace, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            }
            break;
    }
}

function paint_graph_timeAvgTemp_tipMarkerDown(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    if (!gl_showAvgAllPlace) { //24.12.2023
        //lokacija mora biti selektirana
        if (!lo_enabledPlace[vp_place]) { return };
        //položaj miške za toolTip mora biti v področju s podatki za to lokacijo (4.12.2023)
        if (lo_tipMonth <= offsetMonths[vp_place]) { return }
    }
    
    //---- izračun koordinat tekočega data point-a
    let x, y, yValue, color;
    x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
    switch (gl_mode) {
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiTimeSlice:
            if (gl_showAvgAllPlace) {
                yValue = avgTempCacheAll[lo_tipMonth]; // 24.12.2023
                color = "darkBlue";
            } else {
                yValue = lf_getAvgValue(vp_place, vp_timeSlice, lo_tipMonth - offsetMonths[vp_place], cv_nrMonthsAvgMult * lo_nrMonthsAvg)
                color = placeColor[vp_place];
            }
            break;
        case cv_mode_timeAvgTempMultiPlace:
            yValue = lf_getAvgValue(vp_place, vp_timeSlice, lo_tipMonth - offsetMonths[vp_place], cv_nrMonthsAvgMult * lo_nrMonthsAvg)
            color = placeColor[vp_place];
            break;
    }
    y = cv_graphY0 - ky * yValue;

    //risanje background krogca za to lokacijo in mesec
    gEllipse(x, y, 9, 9, 0, gf_alphaColor(96, color), 0, "");
}

function paint_graph_timeAvgTemp_tipMarkerUp(vp_place, vp_timeSlice, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    if (!gl_showAvgAllPlace) {
        //lokacija mora biti selektirana
        if (!lo_enabledPlace[vp_place]) { return };
        //položaj miške za toolTip mora biti v področju s podatki za to lokacijo (4.12.2023)
        if (lo_tipMonth <= offsetMonths[vp_place]) { return }
    }
    
    //---- izračun koordinat tekočega data point-a
    let x, y, yValue, color;
    x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
    switch (gl_mode) {
        case cv_mode_timeAvgTempSingle: case cv_mode_timeAvgTempMultiTimeSlice:
            if (gl_showAvgAllPlace) {
                yValue = avgTempCacheAll[lo_tipMonth];
                color = "darkBlue";
            } else {
                yValue = lf_getAvgValue(vp_place, vp_timeSlice, lo_tipMonth - offsetMonths[vp_place], cv_nrMonthsAvgMult * lo_nrMonthsAvg)
                color = placeColor[vp_place];
            }
            break;
        case cv_mode_timeAvgTempMultiPlace:
            yValue = lf_getAvgValue(vp_place, vp_timeSlice, lo_tipMonth - offsetMonths[vp_place], cv_nrMonthsAvgMult * lo_nrMonthsAvg)
            color = placeColor[vp_place];
            break;
    }
    y = cv_graphY0 - ky * yValue

    //risanje foreground krogca za to lokacijo in mesec
    gEllipse(x, y, 5, 5, 0, "white", 0, "");
    gEllipse(x, y, 3, 3, 0, gf_alphaColor(192, color), 0, "");

}

function lf_getNearestTimeSliceMonth(vp_tipMonth, vp_timeSlice, vp_monthStart, vp_monthEnd) {

    if (!valueBetween(vp_tipMonth, vp_monthStart, vp_monthEnd)) { return 0 };
    
    let vl_monthValue = lf_monthValue(vp_tipMonth);
    let diff, rsltTipMonth;
    if (vl_monthValue == vp_timeSlice) {
        return vp_tipMonth;
    }
    else if (vl_monthValue < vp_timeSlice) {
        diff = vp_timeSlice - vl_monthValue;
        if (diff < 6) {
            rsltTipMonth = vp_tipMonth + diff;
        } else {
            rsltTipMonth = vp_tipMonth - (12 - diff);
        } 
    }
    else {
        diff = vl_monthValue - vp_timeSlice;
        if (diff < 6) {
            rsltTipMonth = vp_tipMonth - diff;
        } else {
            rsltTipMonth = vp_tipMonth + (12 - diff);
        } 
    }

    if (!valueBetween(rsltTipMonth, vp_monthStart, vp_monthEnd)) { return 0 };

    return rsltTipMonth;

}

function paint_graph_timeExcessDeath_tipVerticalLine(vl_monthStart, kx, cv_graphLeftData, cv_graphTopData, cv_graphBottom) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    //risanje background krogca za to lokacijo in mesec
    let x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
    gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "silver", [3, 1]);

}

function paint_graph_vaccExcessDeath(vp_left, vp_top, vp_width, vp_height) {
    //----
    //24.10.2023 ta funkcija se že nekaj mesecev ne uporablja več. Nadomeščata jo univerzalni funkciji paint_graph_timeAvgTemp() in paint_graph_timeAvgTemp_multiPlace() !!
    //----
    const cv_graphLeft = vp_left + 20 //X koordinata Y osi oziroma začetka X osi
    const cv_graphRight = vp_left + vp_width - 45 //X koordinata konca X osi
    const cv_graphLeftData = cv_graphLeft + 2 //X koordinata začetka področja podatkov
    const cv_graphRightData = cv_graphRight - 5 //X koordinata konca področja podatkov
    const cv_graphRangeX = cv_graphRightData - cv_graphLeftData //X koordinata konca področja podatkov
    const kx = cv_graphRangeX/100
    //----
    const cv_graphTopAxis = vp_top + 10 //Y koordinata vrha Y osi
    const cv_graphTopData = cv_graphTopAxis + 5 //Y koordinata vrha območja podatkov
    const cv_graphBottom = vp_top + vp_height - 15 //Y koordinata X osi oziroma začetka Y osi
    const cv_graphRangeY = cv_graphBottom - cv_graphTopData //X koordinata konca področja podatkov
    
    //---- določanje začetnega meseca
    let vl_monthStart = gl_monthEnd - gl_tailMonths //30 //25//1  28=apr2022 30=jun2022 35=nov2022

    //---- pregled Y vrednosti presežne smrtnosti in določanje ky
    let vl_nrMonths = gl_tailMonths + 1
    let vl_minY, vl_maxY, vl_dataRange;
    ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(cv_allPlace, vl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
    const ky = cv_graphRangeY / vl_dataRange
    
    //---- Y koordinata vodoravne X osi
    let cv_graphY0 = cv_graphBottom
    if (vl_minY<0) {cv_graphY0=cv_graphBottom-ky*Math.abs(vl_minY)}

    //---- risanje koordinatnih osi
    gLine(cv_graphLeft, cv_graphBottom, cv_graphLeft, cv_graphTopAxis, 2, "gray", [])
    gLine(cv_graphLeft, cv_graphY0, cv_graphRight, cv_graphY0, 2, "gray", [])
    
    //---- oznake na Y osi
    gText("Excess death [%]", "bold italic 11pt cambria", "darkSlateGray", cv_graphLeft - 17, cv_graphTopAxis - 7);
    let x, y, font, tmpW, tmpH
    let tmpTemp, tmpTempAbs
    let yMark10 = true; let yMark5 = true; let yMark1 = true;
    if (vl_dataRange > 30) { yMark1 = false }
    if (vl_dataRange > 100) { yMark5 = false }
    font = "italic 9pt cambria";
    for (tmpTemp = -150; tmpTemp <= 150; tmpTemp++) {
        if (tmpTemp == 0) {
            tmpStr = tmpTemp.toString(); 
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            x = cv_graphLeft - tmpW - 4
            y = cv_graphY0
            gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            continue
        }
        tmpTempAbs = Math.abs(tmpTemp)
        if (yMark10 && (Math.abs(tmpTempAbs - 10 * Math.trunc(tmpTempAbs / 10)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpTemp
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 2])
                tmpStr = tmpTemp.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        if (yMark5 && (Math.abs(tmpTempAbs - 5 * Math.trunc(tmpTempAbs / 5)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpTemp
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 5])
                tmpStr = tmpTemp.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "darkGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        if (yMark1) {
            y = cv_graphY0 - ky * tmpTemp
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "silver", [2, 10])
            }
        }
    }
    
    //---- oznake na X osi
    tmpStr = "Vaccinated [%]"
    ;[tmpW, tmpH] = gMeasureText(tmpStr, "bold italic 11pt cambria");
    x = cv_graphRight - tmpW + 10
    gText(tmpStr, "bold italic 11pt cambria", "darkSlateGray", x, cv_graphY0 + 15);
    font = "italic 9pt cambria";
    let tmpVacc
    for (tmpVacc = 10; tmpVacc <= 100; tmpVacc+=10) {
        x = cv_graphLeftData + kx * tmpVacc
        if (x >= cv_graphLeftData && x <= cv_graphRightData) {
            gLine(x, cv_graphY0 - 2, x, cv_graphY0 + 2, 1, "darkSlateGray", [])
            if (tmpVacc != 100) {
                tmpStr = tmpVacc.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                gText(tmpStr, font, "dimGray", x - tmpW / 2, cv_graphY0 + tmpH + 4);
            }
        }
    }

    //---- risanje koralacijske linije precepljenost/excessDeaths
    paint_graph_vaccExcessDeath_corelationLine(gl_monthEnd, lo_nrMonthsAvg, kx, ky, cv_graphLeftData, cv_graphY0)
    //ctx.setLineDash([]);
    //---- risanje raztresenega diagrama    
    let xValue, yValue, monthIndex, vl_xOld, vl_yOld
    font = "bold 10pt verdana"
    let kk = 2; if (gl_tailMonths>10) {kk=1}
    for (place = 1; place <= nrPlaces; place++) {
        //---- če je prikaz lokacije izključen, potem to lokacijo preskočim (25.1.2023 v1.1)
        if (!lo_enabledPlace[place]) { continue };
        //---- najprej za linije med krogci točk
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart + 1
            //xValue = placeVacc[place]
            xValue = placeVaccByMonth[place][month - 1]
            x = cv_graphLeftData + kx * xValue
            yValue = lf_getAvgValue(place, month, cv_nrMonthsAvgMult * lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            x = x - kk * (vl_nrMonths / 2 - monthIndex + 1)
            if (monthIndex > 1) { gLine(vl_xOld, vl_yOld, x, y, 1, "lightGray", []) }
            vl_xOld = x; vl_yOld = y
        }
        //---- zdaj pa še za krogce točk, zato da so ti risani preko linij
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart +1
            //xValue = placeVacc[place]
            xValue = placeVaccByMonth[place][month - 1]
            x = cv_graphLeftData + kx * xValue
            yValue = lf_getAvgValue(place, month, cv_nrMonthsAvgMult * lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            x = x - kk * (vl_nrMonths / 2 - monthIndex + 1)
            if (month == gl_monthEnd) {
                gEllipse(x, y, 5, 5, 0, placeColor[place], 1, "dimGray");
            } else {
                gEllipse(x, y, 3, 3, 0, gf_alphaColor(80, placeColor[place]), 0, "")
            }
            vl_xOld = x; vl_yOld = y
        }
    }
    //---- zdaj pa še za oznake lokacij, zato da so te v vsakem primeru preko krogcev točk in linij med krogci
    for (place = 1; place <= nrPlaces; place++) {
         //---- če je prikaz lokacije izključen, potem to lokacijo preskočim (25.1.2023 v1.1)
         if (!lo_enabledPlace[place]) { continue };
        month = gl_monthEnd
        monthIndex = month - vl_monthStart + 1
        //xValue = placeVacc[place]
        xValue = placeVaccByMonth[place][month - 1]
        x = cv_graphLeftData + kx * xValue
        yValue = lf_getAvgValue(place, month, cv_nrMonthsAvgMult * lo_nrMonthsAvg)
        y = cv_graphY0 - ky * yValue
        x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
        ;[tmpW, tmpH] = gMeasureText(placeNameAbbr[place], font);
        gBannerRectWithText(x + 10, y - 8, x + tmpW+9, y + 4, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", placeColor[place], placeNameAbbr[place], "lightGray", 2, 2)
        vl_xOld = x; vl_yOld = y 
    }

    //Izpis tekočega meseca
    tmpStr = lf_monthStrMY(gl_monthEnd);
    font = "bold 14pt verdana";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    let tmpLeft = 400; let tmpTop = 20;
    gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
    
    //oznake koordinat miške
    font = "italic 9pt cambria";
    if (lo_mouseMoveX > 1.005 * cv_graphLeftData && lo_mouseMoveX < 0.995 * cv_graphRightData) {
        gLine(lo_mouseMoveX, cv_graphY0 - 30, lo_mouseMoveX, cv_graphY0 + 10, 1, "gray", [2, 2]);
        tmpVacc=(lo_mouseMoveX-cv_graphLeftData)/kx
        tmpStr = tmpVacc.toFixed(2) + "%";
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", lo_mouseMoveX +2, cv_graphY0 -4);
    }
    if (lo_mouseMoveY > 1.005 * cv_graphTopData && lo_mouseMoveY < 0.995 * cv_graphBottom && ky != 0) {
        gLine(cv_graphLeft - 10, lo_mouseMoveY, cv_graphLeft + 40, lo_mouseMoveY, 1, "gray", [2, 2]);
        tmpTemp = (cv_graphY0 - lo_mouseMoveY) / ky;
        tmpStr = tmpTemp.toFixed(1) + "%";
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", cv_graphLeft + 3, lo_mouseMoveY - 3);
    }
}

function paint_graph_vaccExcessDeath_corelationLine(vp_month, vp_nrMonthsAvg, vp_kx, vp_ky, vp_graphLeftData, vp_graphY0, vp_topData, vp_bottomData, vp_place) {

    //---- pred feb 2021 ne rišem korelacije, ker je še premalo cepljenih
    if (vp_month < 14) { return };

    //---- ugotavljanje težišča za vse lokacije skupaj
    let minVacc = 1000; let maxVacc = 0;
    let sumVacc = 0; let sumExcessDeath = 0; let sumPlace = 0;
    for (place = 1; place <= nrPlaces; place++) {
        if (place == cv_placeSkofjaLoka) { continue }
        //sumVacc += placeVacc[place]
        sumVacc += placeVaccByMonth[place][vp_month - 1]
        sumExcessDeath += lf_getAvgValue(place, vp_month, cv_nrMonthsAvgMult * vp_nrMonthsAvg)
        sumPlace += 1
        if (placeVaccByMonth[place][vp_month - 1] < minVacc) { minVacc = placeVaccByMonth[place][vp_month - 1] };
        if (placeVaccByMonth[place][vp_month - 1] > maxVacc) { maxVacc = placeVaccByMonth[place][vp_month - 1] };
    }
    let avgVaccAll = sumVacc / sumPlace
    let avgExcessDeathAll = sumExcessDeath / sumPlace
    //console.log("avgVaccAll=" + avgVaccAll + " avgExcessDeathAll=" + avgExcessDeathAll)

    //---- ugotavljanje težišča za lokacije levo od težišča
    let sumVaccLeft = 0; let sumExcessDeathLeft = 0; let sumPlaceLeft = 0;
    for (place = 1; place <= nrPlaces; place++) {
        if (place == cv_placeSkofjaLoka) { continue }
        //if (placeVacc[place] < avgVaccAll) {
        if (placeVaccByMonth[place][vp_month - 1] < avgVaccAll) {
            //sumVaccLeft += placeVacc[place]
            sumVaccLeft += placeVaccByMonth[place][vp_month - 1]
            sumExcessDeathLeft += lf_getAvgValue(place, vp_month, cv_nrMonthsAvgMult * vp_nrMonthsAvg)
            sumPlaceLeft += 1
        }
    }
    let avgVaccLeft = sumVaccLeft / sumPlaceLeft
    let avgExcessDeathLeft = sumExcessDeathLeft / sumPlaceLeft
    //console.log("avgVaccLeft=" + avgVaccLeft + " avgExcessDeathLeft=" + avgExcessDeathLeft)
    
    //---- naklonski koeficient smerne linije
    let k
    if ((avgVaccAll - avgVaccLeft) == 0) { k = 1000 }
    else { k = (avgExcessDeathAll - avgExcessDeathLeft) / (avgVaccAll - avgVaccLeft) }

    //console.log("k=" + k)
    //---- začetna in končna točka smerne linije
    //let vacc0 = 22; let vacc1 = 95
    let vacc0 = minVacc - 4; if (vacc0 < 0) { vacc0 = 0 };
    let vacc1 = maxVacc + 4; if (vacc1 > 100) { vacc1 = 100 };
    let excessDeath0 = avgExcessDeathAll - k * (avgVaccAll - vacc0)
    let excessDeath1 = avgExcessDeathAll + k * (vacc1 - avgVaccAll)
    let x0 = vp_graphLeftData + vp_kx * vacc0
    let x1 = vp_graphLeftData + vp_kx * vacc1
    let y0 = vp_graphY0 - vp_ky * excessDeath0
    let y1 = vp_graphY0 - vp_ky * excessDeath1

    //---- če je cela linija izven podatkovnega področja okna potem nimam kaj risati 29.1.2023 v1.6
    if ((y0 >= vp_bottomData && y1 >= vp_bottomData) || (y0 <= vp_topData && y1 <= vp_topData)) {
        return;
    }

    //---- del linije izven podatkovnega področja okna ni prav da se riše! 29.1.2023 v1.6
    let dx, dy
    let kGraph = k * vp_ky / vp_kx;
    //gLine(x0, y0, x1, y1, 1, "red", []) //ta je bila samo za kontrolo!
    if (y0 > vp_bottomData) {
        dy = y0 - vp_bottomData; dx = dy / kGraph; x0 += dx; y0 = vp_bottomData;
    }
    else if (y0 < vp_topData) {
        dy = y0 - vp_topData; dx = dy / kGraph; x0 += dx; y0 = vp_topData;
    };
    if (y1 > vp_bottomData) {
        dy = vp_bottomData - y1; dx = dy / kGraph; x1 -= dx; y1 = vp_bottomData;
    }
    else if (y1 < vp_topData) {
        dy = vp_topData - y1; dx = dy / kGraph; x1 -= dx; y1 = vp_topData;
    };

    //---- risanje smerne linije
    const cv_dashWidth = 7
    gLine(x0 - 2, y0 - 2, x1 - 2, y1 - 2, 4, "white", [cv_dashWidth, cv_dashWidth])
    gLine(x0 + 1, y0 + 1, x1 + 1, y1 + 1, 4, "gray", [cv_dashWidth, cv_dashWidth])
    gLine(x0, y0, x1, y1, 4, "darkGray", [cv_dashWidth, cv_dashWidth])

    //---- označitev težišča (19.9.2023)
    let x = vp_graphLeftData + vp_kx * avgVaccAll
    let y = vp_graphY0 - vp_ky * avgExcessDeathAll
    let d = 4;
    if (valueBetween(x, x0, x1)) {
        if (valueBetween(y, y0, y1) || valueBetween(y, y1, y0)) {
            gLine(x - d, y - d, x + d, y + d, 3, "dimGray", []);
            gLine(x + d, y - d, x - d, y + d, 3, "dimGray", []);
        };
    };

    //---- označitev kota smerne linije
    if (vp_place == cv_allPlace) {
        let alphaStr
        if ((avgVaccAll - avgVaccLeft) == 0) { alphaStr = "90" + scStopinj } else { alphaStr = (Math.abs(Math.atan(k)) * 180 / Math.PI).toFixed(1) + scStopinj }
        gText(alphaStr, "italic 10pt serif", "gray", x1 + 5, y1 + 4)
    }
}

function lf_getAvgValue(vp_place, vp_timeSlice, vp_month, vp_nrMonthsAvg) {
    //--------------------------------------------------------------------------
    // vp_place       ... lokacija meritev
    // vp_timeSlice   ... vsi podatki / samo za dolečen mesec v vsakem letu / samo za dolečn letni čas v vsakem letu
    // vp_month       ... zaporedna številka znotraj serije podatkov lokacije, ne pa globalno!!!
    // vp_nrMonthsAvg ... čez koliko mesecev naj se povpreči, vključno z vp_month
    //--------------------------------------------------------------------------
    
    //---- če je eenaka konfiguracija, kot je bila pri prejšnjem risanju, potem že izračunane podatke enostavno vzamem iz pomožne tabele, in s tem prihranim na času (19.12.2023)
    if (!gl_configChanged) {
        return avgTempCache[vp_place][vp_month]; // 20.12.2023 če je cache že napolnjen, samo vnem vrednost direktno iz njega. Cache se vedno napolni takoj ob vsaki spremembi konfiguracije (mode, nrMonthsAvg, timeSlice)
    }

    let tmpValue;

    //---- če ni nič povprečenja podatkov, potem kar vrnem konkretno vrednost podatka (4.12.2023)
    if (vp_nrMonthsAvg == 0) {
        //---- tu je potrebno upoštevati vp_timeSlice, se pravi ali delamo za vse, za mesec, ali za letni čas (9.12.2023)
        switch (vp_timeSlice) {
            case cv_timeSliceAll: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                //---- če delamo na vseh podatkih, ali pa na podatkih samo za določen mesec v letu, potem samo vrnemo pravi podatek
                tmpValue = avgTemp[vp_place][vp_month];      //19.12.2023
                avgTempCache[vp_place][vp_month] = tmpValue; //19.12.2023 sem pridem samo ob spremembi konfiguracije in to med polnenjem cache-a
                return tmpValue;
                break;
            case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                //---- če delamo za letni čas, je potrebno vrniti povprečje zadnjih treh mesecev
                tmpValue = (avgTemp[vp_place][vp_month - 2] + avgTemp[vp_place][vp_month - 1] + avgTemp[vp_place][vp_month]) / 3; //19.12.2023
                avgTempCache[vp_place][vp_month] = tmpValue; //19.12.2023 sem pridem samo ob spremembi konfiguracije in to med polnenjem cache-a
                return tmpValue;
                break;
        }        
    }

    //.... imamo povprečenje
    let month1, nrMonths, nrMonthsUsed, tmpMonth, tmpMonthValue, tmpMonthValue2
    //month1 = vp_month - vp_nrMonthsAvg + 1
    //if (month1 < 1) { month1 = 1 }
    if (vp_nrMonthsAvg <= vp_month) {
        month1 = vp_month - vp_nrMonthsAvg + 1
    } else {
        //if (vp_month >= 12) {
        //    month1 = vp_month - 12 * Math.trunc(vp_month / 12) + 1;
        //} else {
        //    month1 = 1;
        //}
        //17.12.2023 rajši kar vedno takole. Če je mesec<12, dobim neregularen interval povprečenja in na grafu se ne izriše nič, kar je bolje, 
        //           kot pa da bi imel tisti velik nihaj od začetnih vrednosti proti povprečju.
        //           tudi tiste začetne oscilacija lahko potem mirno po default-u prikazujem! (gl_showAvgFuzzyStartOscilations = true;)
        month1 = vp_month - 12 * Math.trunc(vp_month / 12) + 1; 
    }
    nrMonths = vp_month - month1 + 1
    nrMonthsUsed = 0;
    tmpValue = 0
    // zanka čez vse zahtevane mesece znotraj serije podatkov lokacije (ne globalno!!!)
    for (tmpMonth = month1; tmpMonth <= vp_month; tmpMonth++) {
        //---- tu je potrebno upoštevati vp_timeSlice, se pravi ali delamo za vse, za mesec, ali za letni čas (9.12.2023)
        switch (vp_timeSlice) {
            case cv_timeSliceAll:
                //---- mesec je tu sigurno pravi, ga uporabim
                tmpValue += avgTemp[vp_place][tmpMonth];
                break;
            case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                //---- uporabimo samo mesec, ki je določen z vp_timeSlice
                if (lf_monthValue(tmpMonth + offsetMonths[vp_place]) !== vp_timeSlice) { continue }; //če ni pravi mesec, ga preskočim
                tmpValue += avgTemp[vp_place][tmpMonth];
                nrMonthsUsed += 1;
                break;
            case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                //---- povprečju dodajamo le na zadnjem mesecu ustreznega letnega časa, dodamo mu pa povprečje zadnjih treh mesecev
                tmpMonthValue = lf_monthValue(tmpMonth + offsetMonths[vp_place]);
                tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                if (tmpMonthValue !== tmpMonthValue2) { continue };             //računam pri zadnjem mesecu letnega časa
                if (!valueBetween(tmpMonth, 3, nrMonths[place])) { continue } //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                //---- očitno imam primerne podatke tega letnega časa
                tmpValue += (avgTemp[vp_place][tmpMonth - 2] + avgTemp[vp_place][tmpMonth - 1] + avgTemp[vp_place][tmpMonth]);
                nrMonthsUsed += 3;
                break;
        } 
    }
    //---- tu je spet potrebno upoštevati vp_timeSlice, število upoštevanih podatkov je namreč lahko različno glede na to, ali delamo za vse, za mesec, ali za letni čas (9.12.2023)
    switch (vp_timeSlice) {
        case cv_timeSliceAll: //vsi meseci
            tmpValue /= nrMonths; //uporabljeni so bili vsi meseci v razponu
            break;
        default: //določen mesec ali letni čas
            tmpValue /= nrMonthsUsed; //uporabljenih je bilo samo del mesecev
            break;
    }
    avgTempCache[vp_place][vp_month] = tmpValue; //19.12.2023 sem pridem samo ob spremembi konfiguracije in to med polnenjem cache-a
    return tmpValue;
}

function lf_getPlaceMonthDataIndex(vp_place, vp_month) {

    //let offsetPlaceMonths = (12 * minYear[vp_place] + minMonth[vp_place]) - (12 * minYearAll + minMonthAll);
    //return (vp_month - offsetPlaceMonths);
    return vp_month - offsetMonths[vp_place]; //15.12.2023

}

function lf_getMonthDataIndex(vp_month, vp_year) {

    return 1 + (12 * vp_year + vp_month) - (12 * minYearAll + minMonthAll);

}

function lf_inspectDataValues(vp_place, vp_timeSlice, vp_monthStart, vp_monthEnd, vp_nrMonthsAvg) {
    //----------------------------------------------
    //
    // ... 9.12.2023 dodal upoštevanje vp_timeSlice
    //----------------------------------------------

    //console.log("------------------------")

    let minY = 101
    let maxY = -50
    let tmpValue, tmpMonthValue, tmpMonthValue2, placeStart, placeEnd, offsetPlaceMonths, placeMonth;
    let vl_placeMonthStart, vl_placeMonthEnd;
    switch (vp_place) {
        case cv_allPlace: placeStart = 1; placeEnd = nrPlaces; break;
        default: placeStart = vp_place; placeEnd = vp_place; break;
    }
    for (place = placeStart; place <= placeEnd; place++) {
        //---- znotraj lokacije preverim, da z meseci ne bom brez veze hodil preko indeksov, kjer sploh ni podatkov te lokacije
        vl_placeMonthStart = vp_monthStart; if (vp_monthStart < firstMonth[place]) { vl_placeMonthStart = firstMonth[place] };
        vl_placeMonthEnd = vp_monthEnd; if (vp_monthEnd > lastMonth[place]) { vl_placeMonthEnd = lastMonth[place] };
        //---- zanka čez ustrezne mesece tekoče lokacije
        //for (month = vp_monthStart; month <= vp_monthEnd; month++) {
        for (month = vl_placeMonthStart; month <= vl_placeMonthEnd; month++) {
            //placeMonth = month - offsetPlaceMonths;
            placeMonth = month - offsetMonths[place];
            if (valueBetween(placeMonth, 1, nrMonths[place])) {  //zaporedna številka meseca mora biti znotraj razpona mesecev za to merilno lokacijo
                //---- smo znotraj razpona podatkov za trenutno lokacijo
                //---- zdaj je potrebno upoštevati vp_timeSlice, se pravi ali delamo za vse, za mesec, ali za letni čas (9.12.2023)
                switch (vp_timeSlice) {
                    case cv_timeSliceAll: break; //podatek v vsakem primeru upoštevamo
                    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                        if (lf_monthValue(month) !== vp_timeSlice) { continue };
                        break;
                    case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                        tmpMonthValue = lf_monthValue(month);
                        tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter);   //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                        if (tmpMonthValue !== tmpMonthValue2) { continue };             //računam pri zadnjem mesecu letnega časa
                        if (!valueBetween(placeMonth, 3, nrMonths[place])) { continue }; //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                        break;
                }
                tmpValue = lf_getAvgValue(place, vp_timeSlice, placeMonth, cv_nrMonthsAvgMult * vp_nrMonthsAvg)
                if (tmpValue < minY) {
                    minY = tmpValue
                    //console.log("place=" + place + " month=" + month + " minY=" + minY + " (maxY="+maxY+")")
                }
                if (tmpValue > maxY) {
                    maxY = tmpValue
                    //console.log("place=" + place + " month=" + month + " maxY=" + maxY + " (minY="+minY+")")
                }
            }
        }
    }
    if (minY > 0) { minY = 0 };
    return [minY, maxY, maxY - minY]
}

function lf_inspectDataValuesAvgAllPlace(vp_timeSlice, vp_monthStart, vp_monthEnd, vp_nrMonthsAvg) {
    //----------------------------------------------
    // 22.12.2023
    //----------------------------------------------

    //console.log("------------------------")

    let minY = 101
    let maxY = -50
    let tmpValue, tmpMonthValue, tmpMonthValue2, placeMonth;

    //---- zanka čez ustrezne mesece povprečja vseh lokacij
    for (month = vp_monthStart; month <= vp_monthEnd; month++) {
        //---- potrebno je upoštevati vp_timeSlice, se pravi ali delamo za vse, za mesec, ali za letni čas
        switch (vp_timeSlice) {
            case cv_timeSliceAll: break; //podatek v vsakem primeru upoštevamo
            case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
                if (lf_monthValue(month) !== vp_timeSlice) { continue };
                break;
            case cv_timeSliceWinter: case cv_timeSliceSpring: case cv_timeSliceSummer: case cv_timeSliceAutumn:
                tmpMonthValue = lf_monthValue(month);
                tmpMonthValue2 = 2 + 3 * (vp_timeSlice - cv_timeSliceWinter); //mora priti 2 za zimo, 5 za pomlad, 8 za poletje in 11 za jesen, primer za poletje: 2+3*(15-13)=8
                if (tmpMonthValue !== tmpMonthValue2) { continue };           //računam pri zadnjem mesecu letnega časa
                if (!valueBetween(month, 3, nrMonthsAll)) { continue };       //podatki morajo biti prisotni za vse tri mesece tega letnega časa, torej tudi za prva dva meseca tega letnega časa
                break;
        }
        tmpValue = avgTempCacheAll[month];
        if (tmpValue < minY) {
            minY = tmpValue
            //console.log("AllPlaceAvg: month=" + month + " minY=" + minY + " (maxY="+maxY+")")
        }
        if (tmpValue > maxY) {
            maxY = tmpValue
            //console.log("AllPlaceAvg: month=" + month + " maxY=" + maxY + " (minY="+minY+")")
        }

    }
    if (minY > 0) { minY = 0 };
    return [minY, maxY, maxY - minY]
}

function paint_author() {

    //======== AVTOR
    let tmpStr = "Peter Malovrh, 2023"
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


function gf_alphaColor(vp_alpha, vp_color) {
    return colorToHexRGB(vp_color) + byteToHex(vp_alpha)
}


window.onresize = function (event) {
    resizeCanvas();
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

//===========================================================================================================

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
  
function genPlaceTemplate(name, start, end) {
    //primer: addAvgTempYear(cv_placePostojna, 1950, 1, []);
    let year
    for (year = start; year <= end; year++) {
        console.log("addAvgTempYear(" + name + ", " + year.toString() + ", 1, []);");
    }
}

function addPlace(name, shortName, abbr, location, color, colorAnti) {
    //---- 2.12.2023
    nrPlaces += 1;
    //----
    placeName[nrPlaces] = name;
    placeNameShort[nrPlaces] = shortName;
    placeNameAbbr[nrPlaces] = abbr;
    placeLocation[nrPlaces] = location; // 16.12.2023
    placeColor[nrPlaces] = color;
    placeColorAnti[nrPlaces] = colorAnti;
    placeHaveUndefPeriods[nrPlaces] = false; //14.12.2023 po default dam na false, kasneje pri dodajanju undefPeriods pa se tudi tu vpiše true
    //----
    minMonth[nrPlaces] = 0;
    minYear[nrPlaces] = 0;
    maxMonth[nrPlaces] = 0;
    maxYear[nrPlaces] = 0;
    nrMonths[nrPlaces] = 0;
    //----
    avgTemp[nrPlaces] = [];
    avgTempCache[nrPlaces] = [];
    //----
    return nrPlaces; //14.12.2023
}

function addUndefPlaceDataPeriod(place, monthStart, yearStart, monthEnd, yearEnd) {
    //---- 14.12.2023
    
    nrUndefDataPeriods += 1;

    undefDataPeriodPlace[nrUndefDataPeriods] = place;
    undefDataPeriodMonthStart[nrUndefDataPeriods] = monthStart;
    undefDataPeriodYearStart[nrUndefDataPeriods] = yearStart;
    undefDataPeriodMonthEnd[nrUndefDataPeriods] = monthEnd;
    undefDataPeriodYearEnd[nrUndefDataPeriods] = yearEnd;
    //----
    undefDataPeriodMonthIndexStart[nrUndefDataPeriods] = 0;
    undefDataPeriodMonthIndexEnd[nrUndefDataPeriods] = 0;
    undefDataPeriodPlaceMonthIndexStart[nrUndefDataPeriods] = 0;
    undefDataPeriodPlaceMonthIndexEnd[nrUndefDataPeriods] = 0;
    //----
    placeHaveUndefPeriods[place] = true;

}

function normalizePlaceDataPeriod(place, monthStart, yearStart, monthEnd, yearEnd, valueCorrection) {
    //---- 15.12.2023
    
    let placeMonthIndexStart = lf_getPlaceMonthDataIndex(place, lf_getMonthDataIndex(monthStart, yearStart));
    let placeMonthIndexEnd = lf_getPlaceMonthDataIndex(place, lf_getMonthDataIndex(monthEnd, yearEnd));

    //---- na vseh zahtevanih podatkih lokacije naredim korekcijo temperature
    let placeMonthIndex;
    for (placeMonthIndex = placeMonthIndexStart; placeMonthIndex <= placeMonthIndexEnd; placeMonthIndex++) {
        avgTemp[place][placeMonthIndex] += valueCorrection;
    }

}

function addNormalizePeriod(place, station, monthStart, yearStart, monthEnd, yearEnd, valueCorrection) {
    //-------------------------------------------------
    // 16.12.2023
    // addNormalizePeriod(cv_placeKrvavec, 1, 1961, 4, 1973, -1.2);
    //-------------------------------------------------
    nrNormalizePeriods += 1;
    //----
    normalizePeriodPlace[nrNormalizePeriods] = place;
    normalizePeriodStation[nrNormalizePeriods] = station;
    normalizePeriodMonthStart[nrNormalizePeriods] = monthStart;
    normalizePeriodYearStart[nrNormalizePeriods] = yearStart;
    normalizePeriodMonthEnd[nrNormalizePeriods] = monthEnd;
    normalizePeriodYearEnd[nrNormalizePeriods] = yearEnd;
    normalizePeriodValueCorrection[nrNormalizePeriods] = valueCorrection;
}

function addStation(place, arsoId, name, lon, lat, type, height, monthStart, yearStart, monthEnd, yearEnd) {
    //-------------------------------------------------
    // 14.12.2023
    // station = addStation(cv_placeBrnikLetalisce, 1076, "BRNIK - LETALIŠČE", "14.4574", "46.2288", 380, 1, 1964, 4, 1966);
    //-------------------------------------------------
    nrStations += 1;
    //----
    stationPlace[nrStations] = place;
    stationArsoId[nrStations] = arsoId;
    stationName[nrStations] = name;
    stationLon[nrStations] = lon;
    stationLat[nrStations] = lat;
    stationType[nrStations] = type; //19.12.2023
    stationHeight[nrStations] = height;
    stationMonthStart[nrStations] = monthStart;
    stationYearStart[nrStations] = yearStart;
    stationMonthEnd[nrStations] = monthEnd;
    stationYearEnd[nrStations] = yearEnd;

    return nrStations; //16.12.2023
}

function isNormalizedStation(station) {
    //-------------------------------------------
    // 16.12.2023 pogleda, če med normaliziranimi podatki najde tudi iskano postajo.
    //            če jo najde, vrne korekcijo temperature zanjo, sicer vrne 0
    //-------------------------------------------
    
    let normalizePeriod;
    //if (station == 23) {
    //    station = station;
    //}
    for (normalizePeriod = 1; normalizePeriod <= nrNormalizePeriods; normalizePeriod++) {
        if (normalizePeriodStation[normalizePeriod] == station) { return normalizePeriodValueCorrection[normalizePeriod] };
    }
    return 0;
}

function addAvgTemp(vp_place, vp_year, vp_month, vp_avgTemp) {
    //---- 2.12.2023
    
    //let vl_month = (13 - minMonth[vp_place]) + 12 * (maxYear[vp_place] - minYear[vp_place] - 1) + maxMonth[vp_place];
    
    //---- začetni mesec podatkov za to lokacijo
    if (minMonth[vp_place] == 0) {
        minMonth[vp_place] = vp_month;
        minYear[vp_place] = vp_year;
    };
    if (monthYearBeforeMonthYear(vp_month, vp_year, minMonthAll, minYearAll)) {
        minMonthAll = vp_month;
        minYearAll = vp_year;
    }
    
    //---- končni mesec podatkov za to lokacijo
    maxMonth[vp_place] = vp_month;
    maxYear[vp_place] = vp_year;
    if (monthYearAfterMonthYear(vp_month, vp_year, maxMonthAll, maxYearAll)) {
        maxMonthAll = vp_month;
        maxYearAll = vp_year;
    }

    //---- število mesecev s podatki za to lokacijo
    let vl_month = nrMonths[vp_place] + 1;
    nrMonths[nrPlaces] = vl_month;
    nrMonthsAll = 12 * (maxYearAll - minYearAll) + (maxMonthAll - minMonthAll) + 1;

    //---- vpis podatka o temperaturi
    avgTemp[vp_place][vl_month] = vp_avgTemp;
    avgTempCache[vp_place][vl_month] = vp_avgTemp; // 19.12.2023
}

function addAvgTempYear(vp_place, vp_year, vp_month, vp_arrTemp) {
    //---- 4.12.2023 -----------------------------
    // vp_place ... za katero lokacijo meritev
    // vp_year,vp_month ... od katerega meseca/leta naprej so ti podatki
    // vp_arrTemp       ... polje podatkov o temperaturah za podani mesec in naprej proti koncu leta (ni nujno, da čisto do konca!!)
    //--------------------------------------------

    //let vl_month = (13 - minMonth[vp_place]) + 12 * (maxYear[vp_place] - minYear[vp_place] - 1) + maxMonth[vp_place];
    
    //---- za koliko mesecev so prisotni podatki v vp_arrTemp[]
    let nrData = vp_arrTemp.length;
    if (nrData <= 0) { return };

    //---- začetni mesec podatkov za to lokacijo
    if (minMonth[vp_place] == 0) {
        minMonth[vp_place] = vp_month;
        minYear[vp_place] = vp_year;
    };
    if (monthYearBeforeMonthYear(vp_month, vp_year, minMonthAll, minYearAll)) {
        minMonthAll = vp_month;
        minYearAll = vp_year;
    }
      
    //---- končni mesec podatkov za to lokacijo
    let vl_monthEnd = vp_month + nrData - 1;
    maxMonth[vp_place] = vl_monthEnd;
    maxYear[vp_place] = vp_year;
    if (monthYearAfterMonthYear(vl_monthEnd, vp_year, maxMonthAll, maxYearAll)) {
        maxMonthAll = vl_monthEnd;
        maxYearAll = vp_year;
    }

    //---- vpis podatkov o temperaturi
    let vl_month, vl_monthIndex
    for (vl_monthIndex = 1; vl_monthIndex <= nrData; vl_monthIndex++)    {
        vl_month = nrMonths[vp_place] + vl_monthIndex;
        avgTemp[vp_place][vl_month] = vp_arrTemp[vl_monthIndex - 1];
        avgTempCache[vp_place][vl_month] = avgTemp[vp_place][vl_month]; // 19.12.2023
    }
        
    //---- število mesecev s podatki za to lokacijo
    nrMonths[vp_place] += nrData;
    nrMonthsAll = 12 * (maxYearAll - minYearAll) + (maxMonthAll - minMonthAll) + 1;

}

function monthYearBeforeMonthYear(vp_month, vp_year, vp_monthRef, vp_yearRef) {
    if ((12 * vp_year + vp_month) < (12 * vp_yearRef + vp_monthRef)) { return true } else { return false };
}

function monthYearAfterMonthYear(vp_month, vp_year, vp_monthRef, vp_yearRef) {
    if ((12 * vp_year + vp_month) > (12 * vp_yearRef + vp_monthRef)) { return true } else { return false };
}

function mouseInsideRect(vp_mouseX, vp_mouseY, x0, y0, x1, y1) {
    if (valueBetween(vp_mouseX, x0, x1) && valueBetween(vp_mouseY, y0, y1)) { return true } else { return false };
}

function gf_withinUndefPeriod(vp_place, vp_month) {

    //---- 14.12.2023 če smo na mesecu in lokaciji znotraj katerega od nedefiniranih intervalov podatkov
    if (placeHaveUndefPeriods[vp_place]) {
        for (undefDataPeriodIndex = 1; undefDataPeriodIndex <= nrUndefDataPeriods; undefDataPeriodIndex++) {
            if (undefDataPeriodPlace[undefDataPeriodIndex] == vp_place) {
                if (valueBetween(vp_month, undefDataPeriodMonthIndexStart[undefDataPeriodIndex], undefDataPeriodMonthIndexEnd[undefDataPeriodIndex])) {
                    return true;
                }
            }
        }
    }

    return false;
    
}

function cLogVarStr(myVar) {
    //return Object.keys({ myVar })[0] + "=" + myVar.toString();

    //a = window[myVar];
    return myVar + '=' + window[myVar]; //tole deluje, ampak samo za globalne spremenljivke!!! 14.12.2023

}