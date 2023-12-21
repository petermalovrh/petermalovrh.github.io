//------------------------------------
const gl_versionNr = "v1.38"
const gl_versionDate = "21.12.2023"
const gl_versionNrDate = gl_versionNr + " " + gl_versionDate
//------------------------------------

// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics#Excess_mortality_in_the_EU_between_January_2020_and_November_2022
// https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_5743640/default/table?lang=en
// https://ec.europa.eu/eurostat/databrowser/view/demo_mexrt/default/table?lang=en
// https://jsfiddle.net/ ... code snippets, playground
// https://codepen.io/   ... The best place to build, test, and discover front-end code. (primer: https://codepen.io/alterebro/pen/VNJmEJ)

const cv_aut = 1
const cv_bel = 2
const cv_bul = 3
const cv_cro = 4
const cv_cyp = 5
const cv_cze = 6
const cv_den = 7
const cv_est = 8
const cv_eu27 = 9
const cv_fin = 10
const cv_fra = 11
const cv_ger = 12
const cv_gre = 13
const cv_hun = 14
const cv_ice = 15
const cv_ire = 16
const cv_ita = 17
const cv_lat = 18
const cv_lie = 19
const cv_lit = 20
const cv_lux = 21
const cv_mal = 22
const cv_ned = 23
const cv_nor = 24
const cv_pol = 25
const cv_por = 26
const cv_rom = 27
const cv_spa = 28
const cv_svk = 29
const cv_svn = 30
const cv_swe = 31
const cv_swi = 32
//----
const cv_minCountry = 1
const cv_maxCountry = 32
const cv_allCountry = -1
const cv_countryNone = 0
var lo_focusCountry = cv_countryNone;
var lo_focusMonth = 0;

const countryNameShort2 = new Array(cv_maxCountry)
countryNameShort2[cv_eu27] = "EU27"
countryNameShort2[cv_bel] = "BE"
countryNameShort2[cv_bul] = "BL"
countryNameShort2[cv_cze] = "CZ"
countryNameShort2[cv_den] = "DE"
countryNameShort2[cv_ger] = "GE"
countryNameShort2[cv_est] = "ES"
countryNameShort2[cv_ire] = "IR"
countryNameShort2[cv_gre] = "GR"
countryNameShort2[cv_spa] = "SP"
countryNameShort2[cv_fra] = "FR"
countryNameShort2[cv_cro] = "CR"
countryNameShort2[cv_ita] = "IT"
countryNameShort2[cv_cyp] = "CY"
countryNameShort2[cv_lat] = "LA"
countryNameShort2[cv_lit] = "LT"
countryNameShort2[cv_lux] = "LX"
countryNameShort2[cv_hun] = "HU"
countryNameShort2[cv_mal] = "MA"
countryNameShort2[cv_ned] = "NE"
countryNameShort2[cv_aut] = "AU"
countryNameShort2[cv_pol] = "PL"
countryNameShort2[cv_por] = "PR"
countryNameShort2[cv_rom] = "RO"
countryNameShort2[cv_svn] = "SI"
countryNameShort2[cv_svk] = "SK"
countryNameShort2[cv_fin] = "FI"
countryNameShort2[cv_swe] = "SE"
countryNameShort2[cv_ice] = "IC"
countryNameShort2[cv_lie] = "LI"
countryNameShort2[cv_nor] = "NO"
countryNameShort2[cv_swi] = "SU"

const countryNameShort3 = new Array(cv_maxCountry)
countryNameShort3[cv_eu27] = "EU27"
countryNameShort3[cv_bel] = "BEL"
countryNameShort3[cv_bul] = "BUL"
countryNameShort3[cv_cze] = "CZE"
countryNameShort3[cv_den] = "DEN"
countryNameShort3[cv_ger] = "GER"
countryNameShort3[cv_est] = "EST"
countryNameShort3[cv_ire] = "IRL"
countryNameShort3[cv_gre] = "GRE"
countryNameShort3[cv_spa] = "SPA"
countryNameShort3[cv_fra] = "FRA"
countryNameShort3[cv_cro] = "CRO"
countryNameShort3[cv_ita] = "ITA"
countryNameShort3[cv_cyp] = "CYP"
countryNameShort3[cv_lat] = "LAT"
countryNameShort3[cv_lit] = "LIT"
countryNameShort3[cv_lux] = "LUX"
countryNameShort3[cv_hun] = "HUN"
countryNameShort3[cv_mal] = "MAL"
countryNameShort3[cv_ned] = "NED"
countryNameShort3[cv_aut] = "AUT"
countryNameShort3[cv_pol] = "POL"
countryNameShort3[cv_por] = "POR"
countryNameShort3[cv_rom] = "ROM"
countryNameShort3[cv_svn] = "SVN"
countryNameShort3[cv_svk] = "SVK"
countryNameShort3[cv_fin] = "FIN"
countryNameShort3[cv_swe] = "SWE"
countryNameShort3[cv_ice] = "ICE"
countryNameShort3[cv_lie] = "LIE"
countryNameShort3[cv_nor] = "NOR"
countryNameShort3[cv_swi] = "SUI"

const countryNameLong = new Array(cv_maxCountry)
countryNameLong[cv_eu27] = "EU - 27 countries" //"European Union - 27 countries" // (from 2020)"
countryNameLong[cv_bel] = "Belgium"
countryNameLong[cv_bul] = "Bulgaria"
countryNameLong[cv_cze] = "Czechia"
countryNameLong[cv_den] = "Denmark"
countryNameLong[cv_ger] = "Germany"
countryNameLong[cv_est] = "Estonia"
countryNameLong[cv_ire] = "Ireland"
countryNameLong[cv_gre] = "Greece"
countryNameLong[cv_spa] = "Spain"
countryNameLong[cv_fra] = "France"
countryNameLong[cv_cro] = "Croatia"
countryNameLong[cv_ita] = "Italy"
countryNameLong[cv_cyp] = "Cyprus"
countryNameLong[cv_lat] = "Latvia"
countryNameLong[cv_lit] = "Lithuania"
countryNameLong[cv_lux] = "Luxembourg"
countryNameLong[cv_hun] = "Hungary"
countryNameLong[cv_mal] = "Malta"
countryNameLong[cv_ned] = "Netherlands"
countryNameLong[cv_aut] = "Austria"
countryNameLong[cv_pol] = "Poland"
countryNameLong[cv_por] = "Portugal"
countryNameLong[cv_rom] = "Romania"
countryNameLong[cv_svn] = "Slovenia"
countryNameLong[cv_svk] = "Slovakia"
countryNameLong[cv_fin] = "Finland"
countryNameLong[cv_swe] = "Sweden"
countryNameLong[cv_ice] = "Iceland"
countryNameLong[cv_lie] = "Liechtenstein"
countryNameLong[cv_nor] = "Norway"
countryNameLong[cv_swi] = "Switzerland"

//https://ourworldindata.org/covid-vaccinations
//https://coronavirus.jhu.edu/region/slovenia
const countryVacc = new Array(cv_maxCountry)
countryVacc[cv_eu27] = 73
countryVacc[cv_bel] = 79
countryVacc[cv_bul] = 27
countryVacc[cv_cze] = 66
countryVacc[cv_den] = 81
countryVacc[cv_ger] = 76
countryVacc[cv_est] = 64
countryVacc[cv_ire] = 81
countryVacc[cv_gre] = 74
countryVacc[cv_spa] = 86
countryVacc[cv_fra] = 78
countryVacc[cv_cro] = 56
countryVacc[cv_ita] = 81
countryVacc[cv_cyp] = 72
countryVacc[cv_lat] = 71
countryVacc[cv_lit] = 68
countryVacc[cv_lux] = 73
countryVacc[cv_hun] = 62
countryVacc[cv_mal] = 88
countryVacc[cv_ned] = 68
countryVacc[cv_aut] = 76
countryVacc[cv_pol] = 57
countryVacc[cv_por] = 87
countryVacc[cv_rom] = 40
countryVacc[cv_svn] = 58
countryVacc[cv_svk] = 46
countryVacc[cv_fin] = 78
countryVacc[cv_swe] = 72
countryVacc[cv_ice] = 78
countryVacc[cv_lie] = 67
countryVacc[cv_nor] = 75
countryVacc[cv_swi] = 69

const cv_minMonth = 1
const cv_minYear = 2020
//const cv_maxMonth = 11 //21.1.2023
//const cv_maxMonth = 12   //17.2.2023
//const cv_maxMonth = 1   //11.4.2023
//const cv_maxMonth = 2   //8.5.2023
//const cv_maxMonth = 3   //19.5.2023
//const cv_maxMonth = 4   //23.6.2023
//const cv_maxMonth = 5   //17.7.2023
//const cv_maxMonth = 6   //18.8.2023
//const cv_maxMonth = 7   //18.9.2023
//const cv_maxMonth = 8   //21.10.2023
//const cv_maxMonth = 9     //18.11.2023
const cv_maxMonth = 10     //20.12.2023
//const cv_maxYear = 2022
const cv_maxYear = 2023   //11.4.2023
var cv_nrMonths = (13 - cv_minMonth) + 12 * (cv_maxYear - cv_minYear - 1) + cv_maxMonth

// https://ourworldindata.org/covid-vaccinations
const countryVaccByMonth = new Array(cv_maxCountry)
countryVaccByMonth[cv_aut] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 2.8, 5.3, 9.8, 17.9, 35.7, 52.5, 59.3, 61.7, 63.9, 67.7, 73.4, 76.3, 76.3]                     //, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76]
countryVaccByMonth[cv_bel] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 3.0, 4.9, 7.5, 19.2, 35.2, 59.5, 70.4, 72.7, 74.0, 74.9, 75.8, 76.3, 78, 78.2, 78.4, 78.7, 79] //, 79, 79, 79, 79, 79, 79]
countryVaccByMonth[cv_bul] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.6, 1.4, 8.2, 11.9, 14.7, 17.3, 19.6, 22.3, 26.1, 28.2, 29.4, 30.0]                           //, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
countryVaccByMonth[cv_cro] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 1.5, 2.2, 4.4, 11.9, 26.9, 35.5, 40.0, 41.3, 44.6, 47.9, 48.4, 54.7, 55, 56]                   //, 56, 56, 56, 56, 56, 56, 56, 56, 56]
countryVaccByMonth[cv_cze] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 2.3, 5.0, 9.7, 14.4, 31.5, 46.4, 54.9, 57.0, 58.2, 60.8, 63.4, 64.7, 65, 65, 65, 66]           //, 66, 66, 66, 66, 66, 66, 66]
countryVaccByMonth[cv_cyp] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.5, 5.0, 7.7, 21.4, 38.7, 50.2, 58.1, 62.1, 63.7, 65.3, 68.2, 70.5, 71, 72]                   //, 72, 72, 72, 72, 72, 72, 72, 72, 72]
countryVaccByMonth[cv_den] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2, 2.7, 5.8,10.0, 20.0, 32.2, 53.0, 70.2, 73.0, 74.1, 75.1, 77.3, 80.3, 81.6]                     //, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_est] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9, 2.7, 5.2,10.1, 20.0, 33.0, 42.6, 48.2, 53.8, 57.2, 59.3, 61.5, 62.5, 63, 63, 64]               //, 64, 64, 64, 64, 64, 64, 64, 64]
countryVaccByMonth[cv_eu27]= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.6, 5.0, 8.9, 18.5, 33.4, 48.8, 57.6, 62.3, 64.6, 66.4, 68.4, 70.4, 72, 72, 72, 72.8]         //, 73, 73, 73, 73, 73, 73, 73]
countryVaccByMonth[cv_fin] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 1.4, 1.7, 3.2,  8.9, 19.0, 35.5, 50.5, 63.0, 70.1, 72.9, 73.6, 74.6, 76, 77.7]                 //, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_fra] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 2.4, 4.3, 9.7, 17.1, 30.7, 47.8, 59.7, 65.8, 68.0, 69.7, 73.2, 76.2, 77, 78]                   //, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_ger] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 2.6, 5.1, 7.9, 18.2, 37.6, 52.5, 60.6, 64.3, 66.4, 68.3, 71.0, 73.8, 75.8]                     //, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76]
countryVaccByMonth[cv_gre] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 3.0, 5.8, 9.1, 19.8, 36.5, 49.7, 55.2, 59.0, 61.4, 63.7, 67.8, 70.6, 73, 73, 74]               //, 74, 74, 74, 74, 74, 74, 74, 74]
countryVaccByMonth[cv_hun] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.5, 7.9,19.5, 36.7, 49.4, 54.5, 55.3, 56.7, 57.5, 58.7, 60.0, 61.2, 62]                       //, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62]
countryVaccByMonth[cv_ice] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3, 3.4, 6.4, 9.7, 25.0, 51.5, 68.3, 70.5, 74.2, 74.8, 75.4, 76.2, 76.7, 77.5, 78.3]               //, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_ire] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 3.1, 5.5, 9.6, 19.0, 37.6, 56.7, 68.7, 74.4, 75.7, 76.5, 77.3, 78.0, 80, 80, 81]               //, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_ita] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.1, 2.4, 5.5,10.3, 20.8, 32.1, 53.6, 62.3, 69.5, 73.0, 74.7, 75.8, 78.1, 80, 81.3]                 //, 81, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_lat] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0.9, 1.3, 3.0, 14.9, 29.8, 36.9, 41.1, 46.2, 54.8, 64.4, 68.2, 69.6, 70, 70, 71]               //, 71, 71, 71, 71, 71, 71, 71, 71]
countryVaccByMonth[cv_lie] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 2.1, 5.0,11.0, 23.4, 34.2, 48.2, 52.5, 58.4, 62.1, 63.7, 65.1, 66.2, 67]                       //, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67]
countryVaccByMonth[cv_lit] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 2.7, 6.1,10.9, 22.2, 38.3, 45.4, 55.1, 59.9, 62.7, 64.8, 66.6, 67.7, 68.2]                     //, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68]
countryVaccByMonth[cv_lux] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 1.6, 3.5, 8.9, 18.5, 33.4, 48.8, 57.6, 62.3, 64.6, 66.4, 68.4, 70.4, 72, 72, 72, 73, 73.2]     //, 73, 73, 73, 73, 73, 73] //POZOR: podatki samo za prve 3 mesece, potem naprej kopiral od EU27, ker tudi tisti gredo proti 73% !!
countryVaccByMonth[cv_mal] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 4.7,10.2,20.1, 39.5, 61.1, 71.7, 77.4, 79.1, 80.3, 81.1, 81.7, 84.6, 87, 88]                   //, 88, 88, 88, 88, 88, 88, 88, 88, 88]
countryVaccByMonth[cv_ned] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 1.8, 4.3, 6.9, 16.3, 34.5, 50.9, 61.7, 63.5, 64.9, 66.0, 67.1, 67.5, 67.8]                     //, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68]
countryVaccByMonth[cv_nor] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 3.2, 5.5, 7.2, 19.2, 29.0, 33.8, 57.3, 67.6, 69.2, 70.8, 72.3, 73.5, 74, 74, 75]               //, 75, 75, 75, 75, 75, 75, 75, 75]
countryVaccByMonth[cv_pol] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 2.9, 5.1, 7.2, 17.6, 33.3, 43.8, 47.1, 48.7, 50.1, 51.3, 52.8, 54.6, 56, 57]                   //, 57, 57, 57, 57, 57, 57, 57, 57, 57]
countryVaccByMonth[cv_por] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 2.6, 5.3, 8.9, 19.6, 36.6, 58.0, 71.5, 80.2, 81.8, 82.3, 83.0, 83.8, 86, 87]                   //, 87, 87, 87, 87, 87, 87, 87, 87, 87]
countryVaccByMonth[cv_rom] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 3.1, 5.5, 9.8, 18.7, 23.1, 24.7, 26.1, 27.4, 31.9, 37.8, 39.8, 40.6, 41]                       //, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41]
countryVaccByMonth[cv_svk] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 3.2, 4.9,10.3, 17.7, 31.0, 37.4, 40.6, 42.2, 43.4, 43.6, 43.8, 45.1, 46]                       //, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46]
countryVaccByMonth[cv_svn] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3, 2.6, 5.5,10.0, 19.6, 32.5, 39.5, 43.9, 48.8, 52.7, 54.2, 56.1, 57.1, 57, 58]                   //, 58, 58, 58, 58, 58, 58, 58, 58, 58]
countryVaccByMonth[cv_spa] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 2.6, 5.7, 9.9, 19.5, 37.8, 57.1, 70.2, 77.1, 78.5, 79.1, 79.6, 80.5, 82, 85]                   //, 85, 85, 85, 85, 85, 85, 85, 85, 85]
countryVaccByMonth[cv_swe] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 2.5, 4.4, 6.9, 14.2, 30.0, 40.1, 53.9, 62.2, 64.8, 67.1, 69.2, 70.8, 71.5, 72.5]               //, 72, 72, 72, 72, 72, 72, 72, 72, 72]
countryVaccByMonth[cv_swi] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 3.0, 6.6,11.3, 21.7, 37.1, 50.1, 53.9, 58.1, 63.5, 65.4, 66.7, 67.7, 68, 69]                   //, 69, 69, 69, 69, 69, 69, 69, 69, 69]

//19.2.2023 v1.20 da linije v raztresenem diagramu niso čosto navpične, dodajam ves čas po malo dodatne vakcinacije. Tiste države, ki so imele enak končni procent vacc., sem ločil po 0.3%, tako da se ne prekrivajo več!
//                in po tem sistemu mi vsak naslednji mesec ne bo treba dodadaji pri vsaki državi po enega podatka na koncu, to bo zdaj avtomatsko in bom moral prepisati le nove eurostat excess death podatke
let country, month, vacc, lastValidVacc, lastValidVaccMonth;
for (country = cv_minCountry; country <= cv_maxCountry; country++) {
    for (month = 1; month <= cv_nrMonths; month++) {
        vacc = countryVaccByMonth[country][month - 1];
        //if (month == 27) {
        //    month = month
        //}
        switch (vacc) {
            case undefined:
                vacc = lastValidVacc + (month - lastValidVaccMonth) * 0.02;
                countryVaccByMonth[country][month - 1] = vacc;
                break;
            default:
                lastValidVacc = vacc;
                lastValidVaccMonth = month;
                break;
        }
    }
}

const countryColor = new Array(cv_maxCountry)
countryColor[cv_eu27] = "slateBlue"
countryColor[cv_bel] = "peru"
countryColor[cv_bul] = "darkGreen"
countryColor[cv_cze] = "steelBlue"
countryColor[cv_den] = "plum"
countryColor[cv_ger] = "goldenrod"
countryColor[cv_est] = "purple"
countryColor[cv_ire] = "limeGreen"
countryColor[cv_gre] = "royalBlue"
countryColor[cv_spa] = "red"
countryColor[cv_fra] = "turquoise" //"cyan"
countryColor[cv_cro] = "dodgerBlue"
countryColor[cv_ita] = "darkTurquoise"
countryColor[cv_cyp] = "indigo"
countryColor[cv_lat] = "darkRed"
countryColor[cv_lit] = "yellowGreen"
countryColor[cv_lux] = "deepSkyBlue"
countryColor[cv_hun] = "darkSeaGreen"
countryColor[cv_mal] = "mediumVioletRed"
countryColor[cv_ned] = "orange"
countryColor[cv_aut] = "salmon"
countryColor[cv_pol] = "lightPink"
countryColor[cv_por] = "peru"
countryColor[cv_rom] = "darkKhaki"
countryColor[cv_svn] = "green"
countryColor[cv_svk] = "cadetBlue"
countryColor[cv_fin] = "blue"
countryColor[cv_swe] = "yellowGreen"
countryColor[cv_ice] = "silver"
countryColor[cv_lie] = "tan"
countryColor[cv_nor] = "indianRed"
countryColor[cv_swi] = "orchid"

//---- koordinate multi-country grafov (14.2.2023 v1.15)
const countryGraphLeft = new Array(cv_maxCountry)
const countryGraphLeftAxis = new Array(cv_maxCountry)
const countryGraphLeftData = new Array(cv_maxCountry)
const countryGraphRightData = new Array(cv_maxCountry)
const countryGraphRight = new Array(cv_maxCountry)
const countryGraphKx = new Array(cv_maxCountry)
//
const countryGraphTop = new Array(cv_maxCountry)
const countryGraphTopData = new Array(cv_maxCountry)
const countryGraphBottomAxis = new Array(cv_maxCountry)
const countryGraphBottom = new Array(cv_maxCountry)
const countryGraphKy = new Array(cv_maxCountry)
//
const countryGraphWidth = new Array(cv_maxCountry)
const countryGraphHeight = new Array(cv_maxCountry)
//
for (country = cv_minCountry; country <= cv_maxCountry; country++) {
    countryGraphLeft[country] = 0;
    countryGraphLeftAxis[country] = 0;
    countryGraphLeftData[country] = 0;
    countryGraphRightData[country] = 0;
    countryGraphRight[country] = 0;
    countryGraphKx[country] = 0;
    countryGraphTop[country] = 0;
    countryGraphTopData[country] = 0;
    countryGraphBottomAxis[country] = 0;
    countryGraphBottom[country] = 0;
    countryGraphKy[country] = 0;
    countryGraphWidth[country] = 0;
    countryGraphHeight[country] = 0;
}
// še za primer all-country gradov - bodo kar globalne spremenljivke (14.2.2023 v1.15)
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

//---- toggles for countries
var lo_enabledCountryAll = true;
var lo_enabledCountry = new Array(cv_maxCountry)
for (country = cv_minCountry; country <= cv_maxCountry; country++) {
    lo_enabledCountry[country] = true;
}
var nrSelectedCountries = 0; //12.2.2023 v1.13

//---- datum podatkov: 21.1.2023
// https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/Ddn-20230117-1
// https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_4624832/default/table?lang=en
const countryExcessDeath = new Array(cv_maxCountry)
//---- 21.1.2023
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.7, 25.2, 3.1, 1.8, 2.8, 7.7, 8.0, 17.3, 40.0, 29.7, 17.3, 5.9, 10.7, 20.9, 10.6, 6.9, 5.6, 9.0, 12.8, 18.2, 26.5, 23.6, 8.0, 8.1, 6.6, 11.7, 7.7, 8.2, 16.8, 13.5, 9.7, 10.6, 6.7]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.6, 0.1, 0.6, 16.3, 4.3, 6.8, 5.4, 10.2, 6.2, 9.9, 1.2]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.4, 46.8, 18.6, 6.7, -1.0, -6.6, 2.5, 8.4, 3.6, -0.2, -2.6]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 41.0, 5.3, 6.0, 3.1, 11.2, 4.0, 2.4, 4.6, 7.2, 11.1, 9.8, 4.1]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.3, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.8, 10.5, 14.1, 7.3, 12.7, 7.0]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 30.9, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.1, 3.9, 12.8, 9.4, 11.8, 16.2, 17.2, 15.3, 23.2, 15.6]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.1, 20.5, 16.0, 4.9, 3.2, 17.8, 12.6, 12.1, 16.4, 8.7, 13.0]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.6, 14.9]
//countryExcessDeath[cv_gre] = [0.8, 6.6, 7.6, 1.3, 3.5, -1.5, 5.6, 6.5, 10.3, 4.2, 28.1, 19.9, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.2, 34.1, 24.8, 18.0, 31.3, 32.1, 19.8, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.9, 10.9, 7.8, 14.9]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.4, 8.0, -2.2, 1.8, 2.7, 2.1, 7.7, 18.5, 9.8, 5.8, 8.3, 9.0, 5.2, 3.6, 1.0, 8.7, 14.2, 16.3, 36.8, 19.5, 8.6, 8.5, 3.0]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.3, 8.6, 4.6, 14.8, 6.7, 6.7, 15.1, 13.3, 7.9, 11.2, 8.1]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.3, 25.4, 8.2, 6.7, 1.0, 1.5, 12.5, 9.1, 5.9, 3.8, 4.5]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.4, 5.1, 18.8, 23.3, 8.2, 7.3, 6.8, 11.3, 10.6, 5.4, 6.0, 10.6, 8.3, 6.4, 7.0, 10.4, 8.2, 6.5, 28.8, 12.0, 6.3, 2.8, 0.5]
//countryExcessDeath[cv_cyp] = [15.9, 1.9, 10.8, 5.0, 28.4, 10.8, 10.8, 3.4, 10.1, 10.6, 15.6, 26.7, 10.8, -4.1, 7.3, 31.2, 16.8, 17.1, 41.9, 55.8, 30.4, 20.9, 24.9, 28.2, 29.8, 26.3, 38.9, 38.0, 14.4, 10.9, 31.5, 15.4, 14.0, 19.3, 23.8]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.6, -0.3, 7.3, 4.7, 7.0, 4.0]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 15.7, 0.9, 5.9, -1.4, 17.9, 2.8, 8.8, 11.5, 10.5, 1.5, 7.4, 3.2]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.3, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.4, 4.9, 5.9, 6.7]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.1, 11.8]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.0, 12.9, 19.1, 12.9]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.4, -2.5, 2.9, 15.1, 18.3, 9.8, 13.7, 17.8, 11.2, 12.4, 18.3, 13.5]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.2, 6.0, 11.6, 12.2, 9.1, 2.8]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.1, 12.6, 19.3, 24.4, 29.1, 9.4, 11.4, 8.8, 12.8]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.1, 6.8, 26.2, 39.6, 16.1, 4.9, 6.5, 2.9, 33.0, 110.6, 69.2, 9.1, 2.9, 30.9, 11.2, 4.5, -1.8, -6.6, 3.6, 10.3, 3.2, -5.0, -6.2]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.7, 15.6, 12.6, 3.4, 7.2, 14.7]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 64.5, 9.7, 8.5, 22.0, 13.4, 5.4, 8.3, 10.9, 12.3, 5.1, 9.6, -1.6]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.5, 12.4, 13.4, 20.8, 15.5, 10.2, 12.2, 19.6, 18.9, 19.3, 20.5]
//countryExcessDeath[cv_swe] = [-2.6, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.4, -4.8, -7.5, -4.1, 0.9, -1.7, -1.6, -0.2, 3.7, 0.1, 2.8, 4.4, 7.0, 3.6, -4.5, -4.3, 1.7, 4.6, 3.3, 7.3, 6.9, 0.8, 2.3]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, -0.1, 11.0, 5.0, 5.2, 4.5, 2.0, -4.6, 2.9, 3.0, 2.6, 10.3, 16.8, -11.8, -14.1, 9.1, 17.3, 15.3, 22.5, 53.9, 12.8, 13.4, 9.9, 35.8, 11.1, 6.5, -2.5, 11.3]
//countryExcessDeath[cv_lie] = [-15.9, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 115.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 12.5, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 5.6]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.6, 2.9, -3.0, -1.6, -1.9, 1.7, 4.9, 1.9, 0.7, -2.2, -5.4, -10.5, -8.4, -3.3, -1.7, -1.3, 1.5, 8.7, 11.5, 11.4, 20.5, 16.5, -1.9, 6.3, 16.0, 11.9, 11.0, 14.0, 15.5, 11.1, 13.4, 12.5, 12.8]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 4.8, 3.5, 13.8, 14.2, 5.4, 13.3, 21.9, 15.1, 8.4, 13.7, 11.6]
//---- 17.2.2023
//countryExcessDeath[cv_eu27] = [-5.8, -2.6, 13.6, 25.2, 3.0, 1.8, 2.8, 7.6, 8.0, 17.3, 39.9, 29.6, 15.4, 5.9, 10.6, 20.9, 10.6, 6.8, 5.6, 9.0, 12.7, 18.2, 26.5, 23.6, 7.5, 7.9, 6.6, 11.9, 7.9, 8.3, 17.0, 13.8, 10.1, 11.4, 8.4, 19.0]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.1, 0.6, 16.4, 4.4, 6.9, 5.5, 10.4, 6.3, 10.1, 1.8, 19.1]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.8, 47.1, 18.9, 6.9, -0.6, -6.2, 3.1, 9.2, 5.0, 0.5, -0.9, -6.0]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 41.0, 5.3, 6.0, 3.1, 11.3, 4.1, 2.4, 4.9, 7.8, 11.6, 10.3, 6.4, 23.2]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.3, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.8, 10.5, 14.1, 7.3, 12.7, 7.0, 22.4]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 30.9, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 3.9, 12.9, 9.5, 11.9, 16.4, 17.5, 15.7, 24.0, 15.8, 37.3]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.5, 16.0, 4.9, 3.2, 17.8, 12.6, 12.1, 16.5, 8.9, 13.5, 22.6]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.4]  //za dec22 dal vrednost iz grafike na https://ec.europa.eu/eurostat/web/products-eurostat-news/w/DDN-20230217-1 , ker Ireland v novih podatkih ni!!! Vsi ostali podatki za Ireland so torej še "stari" od januarja
//countryExcessDeath[cv_gre] = [0.8, 6.6, 7.6, 1.3, 3.5, -1.5, 5.6, 6.5, 10.3, 4.2, 28.1, 19.9, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.2, 34.1, 24.8, 18.0, 31.3, 32.1, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 10.5, 17.4]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.6, 1.0, 8.7, 14.2, 16.3, 36.8, 19.5, 8.7, 8.7, 4.9, 9.6]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.3, 8.6, 4.6, 14.9, 6.7, 6.7, 15.2, 13.4, 8.0, 11.3, 8.7, 24.5]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.4, 25.5, 8.2, 6.7, 1.0, 1.5, 12.5, 9.1, 5.9, 3.7, 3.5, 10.9]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 5.5, 4.8, 6.9, 11.2, 9.0, 6.9, 29.5, 12.6, 8.1, 6.4, 9.4, 9.4]     //za dec22 podvojil vrednosti iz nov22, ker za dec22 podatek manjka!!
//countryExcessDeath[cv_cyp] = [15.9, 1.9, 10.8, 5.0, 28.4, 10.8, 10.8, 3.4, 10.1, 10.6, 15.6, 26.7, 10.8, -4.1, 7.3, 31.2, 16.8, 17.1, 41.9, 55.8, 30.4, 20.9, 24.9, 28.2, 29.8, 26.5, 37.8, 37.4, 14.4, 10.9, 31.3, 15.7, 14.4, 20.0, 27.7, 19.2]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.8, 7.1, 4.0, 17.8]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 15.7, 0.9, 5.9, -1.4, 17.9, 2.8, 8.8, 11.5, 10.5, 1.5, 7.4, 3.2, 9.5]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.3, 5.4, 4.8, 8.5, 1.0, 2.6, 8.2, 5.4, 5.0, 6.3, 6.1, 2.8]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 16.8, 9.7]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.0, 12.9, 19.1, 12.9, 22.7]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.4, -2.5, 2.9, 15.1, 18.3, 9.8, 13.7, 17.8, 11.2, 12.4, 18.3, 13.8, 27.4]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.2, 6.0, 11.6, 12.3, 9.1, 2.8, 17.8]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.1, 12.6, 19.3, 24.4, 29.1, 9.4, 11.4, 8.8, 12.9, 14.8]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -4.8, -5.5]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.8, 6.9, 13.6, 25.9]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 64.5, 9.8, 8.6, 22.2, 13.5, 5.6, 8.7, 11.2, 12.8, 6.0, 10.9, 5.9, 16.7]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.5, 12.4, 13.4, 20.8, 15.5, 10.2, 12.2, 19.6, 19.0, 19.6, 22.7, 21.1]
//countryExcessDeath[cv_swe] = [-8.6, -7.0, -0.4, 35.4, 20.9, 8.0, -4.0, -3.4, -4.9, -6.3, 8.3, 21.3, 12.4, -7.5, -10.3, -6.3, -1.9, -4.9, -4.5, -3.1, 0.6, -3.0, -0.4, 1.1, 4.3, 4.8, -3.9, -4.3, 2.3, 4.1, 3.0, 8.0, 6.5, 1.6, 2.2, 2.2]    //za dec22 podvojil vrednosti iz nov22, ker za dec22 podatek manjka!!
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, -0.1, 11.0, 5.0, 5.2, 4.5, 2.0, -4.6, 2.9, 3.0, 2.6, 10.3, 16.8, -11.8, -14.1, 9.1, 17.3, 15.4, 23.0, 53.9, 13.3, 13.4, 9.9, 35.8, 11.1, 6.5, -1.9, 12.3, 43.1]
//countryExcessDeath[cv_lie] = [-15.9, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 115.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 12.5, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -20.9]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.6, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.7, -2.2, -5.4, -10.5, -8.4, -3.3, -1.7, -1.3, 1.5, 8.7, 11.5, 11.4, 20.6, 16.5, -1.8, 6.3, 16.1, 11.9, 11.1, 14.0, 15.6, 11.2, 13.5, 12.8, 13.7, 21.0]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 4.9, 3.5, 13.9, 14.2, 5.4, 13.4, 22.0, 15.3, 8.8, 14.6, 12.1, 22.9]
//---- 11.4.2023 (podatki za jan/2023 so bili objavljeni 31.3.2023)
//countryExcessDeath[cv_eu27] = [-4.2, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 5.9, 10.7, 20.9, 10.6, 6.9, 5.6, 9.0, 12.9, 18.2, 26.5, 23.7, 7.7, 8.0, 6.7, 12.0, 7.9, 8.4, 17.1, 13.9, 10.2, 11.6, 8.6, 19.6, 2.7]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.6, 0.1, 0.6, 16.4, 4.4, 6.9, 5.5, 10.4, 6.4, 10.2, 1.9, 19.6, 5.0]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.9, 47.3, 19.1, 7.2, -0.4, -6.1, 3.4, 9.5, 5.4, 1.1, -0.8, -4.6, -14.1]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.5, 5.0, 7.9, 11.7, 10.9, 6.4, 24.3, 7.1]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.3, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.5, 14.1, 7.3, 12.8, 7.1, 23.1, 11.5]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.5, 12.0, 16.4, 17.6, 15.8, 24.3, 16.3, 37.8, 13.5]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.6, 16.1, 4.9, 3.2, 17.8, 12.6, 12.3, 16.5, 8.9, 14.0, 24.0, 9.8]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.3]
//countryExcessDeath[cv_gre] = [0.4, 6.2, 7.2, 0.9, 3.1, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -8.2, -3.2, 15.6, 24.3, 20.9, 12.4, 20.7, 33.6, 24.3, 17.5, 30.7, 31.6, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 11.1, 8.9]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.7, 8.8, 4.9, 9.9, -1.7]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.3, 8.6, 4.6, 14.9, 6.7, 6.7, 15.2, 13.4, 8.0, 11.4, 8.9, 26.0, 3.8]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.5, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 5.9, 3.8, 3.4, 9.4, -5.9]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.4, 5.1, 18.8, 23.3, 8.2, 7.3, 6.8, 11.3, 10.6, 5.4, 6.0, 10.6, 5.5, 4.8, 6.9, 11.2, 9.0, 6.9, 29.5, 12.6, 8.1, 6.4, 9.4, 13.7, -4.3]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 7.8]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.1, 4.1, 17.8, 7.6]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.6, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 15.7, 1.9, 6.9, -0.4, 19.1, 3.8, 9.9, 12.6, 11.7, 2.5, 8.5, 4.3, 10.6, 15.7]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.2, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.4, 5.0, 6.4, 6.2, 7.9, -11.4]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 16.8, 10.6, 3.4]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.2]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 4.9]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 12.9, 14.7, -3.3]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -15.7]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.8, 6.9, 13.5, 24.7, 6.7]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.7, 15.8, 7.8, 10.9, 13.5, 15.1, 8.2, 13.2, 7.9, 18.0, 1.0]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.5, 12.4, 13.4, 20.8, 15.5, 10.2, 12.2, 19.6, 19.0, 19.6, 22.7, 21.2, 8.5]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 7.2, 3.6, -4.5, -4.2, 1.7, 4.6, 3.3, 7.3, 7.0, 0.8, 2.6, 19.7, 7.5]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, -0.1, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.3, 3.0, 10.6, 17.2, -11.5, -13.9, 9.5, 17.7, 15.7, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.5, 7.4, -1.0, 12.7, 30.2, 30.7]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 115.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 21.0, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.7, 7.0]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.6, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.7, -2.2, -5.4, -10.5, -8.4, -3.3, -1.7, -1.3, 1.5, 8.7, 11.5, 11.4, 20.6, 16.5, -1.7, 6.5, 16.3, 12.2, 11.3, 14.2, 15.8, 11.4, 13.7, 13.0, 13.9, 21.2, 8.3]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.1, 4.0, 14.2, 14.5, 5.9, 13.8, 22.6, 16.0, 9.5, 15.5, 13.3, 23.8, 4.5]
//---- 8.5.2023 (podatki za feb/2023 so bili objavljeni 28?.4?.2023)
//countryExcessDeath[cv_eu27] = [-4.2, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 5.9, 10.7, 20.9, 10.6, 6.9, 5.6, 9.0, 12.9, 18.2, 26.5, 23.7, 7.7, 8.0, 6.7, 12.0, 7.9, 8.4, 17.1, 13.9, 10.3, 11.6, 8.6, 19.7, 2.9, -2.3]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.1, 0.7, 16.4, 4.4, 6.9, 5.5, 10.4, 6.4, 10.3, 2.0, 19.7, 5.3, -5.1]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 28.0, 47.3, 19.2, 7.2, -0.4, -6.0, 3.5, 9.5, 5.5, 1.3, -0.6, -4.3, -13.7, -10.8]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.5, 5.0, 7.9, 11.7, 10.9, 6.4, 24.3, 7.1, -8.2]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.3, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.3, 12.8, 7.1, 23.1, 11.7, -2.0]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.6, 12.0, 16.4, 17.6, 15.9, 24.4, 16.4, 38.2, 13.6, -1.2]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.6, 16.1, 4.9, 3.2, 17.8, 12.6, 12.3, 16.5, 8.9, 14.0, 24.0, 9.8, -8.0]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.7]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -8.2, -3.2, 15.7, 24.3, 20.9, 12.4, 20.8, 33.8, 24.4, 17.5, 30.8, 31.8, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 11.1, 9.0, 12.3]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.7, 8.8, 4.9, 9.9, -1.7, 3.9]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.0, 26.4, 5.2, -1.6]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.8, -2.0]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.4, 5.1, 18.8, 23.3, 8.2, 7.3, 6.8, 11.3, 10.6, 5.4, 6.0, 10.6, 5.5, 4.8, 6.9, 11.2, 9.0, 6.9, 29.5, 12.6, 8.1, 6.4, 9.4, 13.7, -4.7, 0.8]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 3.6, 12.5]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.1, 4.1, 17.8, 7.7, -3.7]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 15.7, 1.9, 6.9, -0.4, 19.1, 3.8, 9.9, 12.6, 11.7, 2.5, 8.5, 4.3, 10.6, 15.9, -9.4]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.2, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.5, 5.0, 6.4, 6.2, 8.0, -10.1, -8.4]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 3.8, 1.7]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.3, 4.0]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.5]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.2, 5.8]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -15.7, -12.6]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.8, 6.9, 13.5, 24.7, 6.2, -4.4]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.7, 15.8, 7.8, 10.9, 13.5, 15.1, 8.2, 13.2, 7.9, 18.0, 1.0, -14.9]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.5, 12.4, 13.4, 20.8, 15.5, 10.2, 12.2, 19.6, 19.0, 19.6, 22.7, 21.2, 8.5, 0.0]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 7.2, 3.6, -4.5, -4.2, 1.7, 4.6, 3.3, 7.3, 7.0, 0.8, 2.6, 19.7, 8.3, -8.7]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, -0.1, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.3, 3.0, 10.6, 17.2, -11.5, -13.9, 9.5, 17.7, 15.7, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.5, 7.9, -1.0, 12.7, 29.8, 29.0, 10.7]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 7.0, 5.9]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.6, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.7, -2.2, -5.4, -10.5, -8.4, -3.3, -1.7, -1.3, 1.5, 8.7, 11.5, 11.4, 20.6, 16.5, -1.7, 6.5, 16.3, 12.2, 11.3, 14.2, 15.8, 11.4, 13.7, 13.0, 13.9, 21.2, 8.3, -5.6]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.1, 4.0, 14.2, 14.5, 5.9, 13.8, 22.7, 16.1, 9.7, 15.8, 13.8, 24.5, 6.4, -5.5]
//---- 19.5.2023 (podatki za mar/2023 so bili objavljeni 15.5.2023)
//---- https://ec.europa.eu/eurostat/web/products-eurostat-news/w/DDN-20230516-1
//---- https://ec.europa.eu/eurostat/databrowser/bookmark/fdf06357-d1cc-4bf4-918c-5e902dc087f6?lang=en
countryExcessDeath[cv_eu27] = [-4.2, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.6, 6.9, 5.6, 9.0, 12.9, 18.3, 26.5, 23.7, 7.7, 8.0, 6.7, 12.0, 7.9, 8.4, 17.1, 13.9, 10.3, 11.6, 8.7, 19.8, 3.6, -1.7, 0.3]
countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.1, 0.7, 16.5, 4.4, 6.9, 5.6, 10.5, 6.5, 10.3, 2.0, 19.8, 5.4, -4.9, -2.6]
countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 28.0, 47.3, 19.2, 7.2, -0.4, -6.0, 3.5, 9.6, 5.5, 1.3, -0.6, -4.9, -13.4, -9.1, -10.3]
countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.7, 8.2, -7.1, -6.0]
countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.3, 12.8, 7.1, 23.2, 11.8, -1.9, 0.8]
countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.6, 12.0, 16.4, 17.6, 15.9, 24.4, 16.4, 38.2, 14.2, -1.3, 4.2]
countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.7, 16.2, 5.0, 3.2, 17.8, 12.6, 12.4, 16.6, 9.0, 14.1, 24.0, 10.1, -7.6, -7.3]
countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.1]
countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.9, 11.0, 10.3]
countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.7, 8.8, 4.9, 10.0, -1.6, 5.9, 6.4]
countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.0, 26.4, 5.3, -1.2, -0.1]
countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.8, -2.5, -9.4]
countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.4, 5.1, 18.8, 23.3, 8.2, 7.3, 6.8, 11.3, 10.6, 5.4, 6.0, 10.6, 5.5, 4.8, 6.9, 11.2, 9.0, 6.9, 29.5, 12.6, 8.1, 6.4, 9.4, 13.7, -3.5, 1.6, 1.6]      //za mar23 podvojil vrednosti iz feb23, ker za mar23 podatek manjka!!
countryExcessDeath[cv_cyp] = [15.9, 1.9, 10.8, 5.0, 28.4, 10.8, 10.8, 3.4, 10.1, 10.6, 15.6, 26.8, 12.2, -2.5, 8.3, 33.2, 18.3, 20.9, 44.0, 57.2, 33.8, 22.5, 28.0, 34.0, 39.4, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 7.8, 11.7, 8.4]
countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.7, -3.6, -13.9]
countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7]
countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4]
countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.2, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.5, 5.0, 6.4, 6.2, 8.0, -9.9, -6.7, -0.8]
countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 3.8, 1.7, 5.8]
countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.4, 4.2, 12.3]
countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.5, 9.1]
countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.5, -1.2]
countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.2, 5.7, 4.1]
countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -8.8, -10.7, -12.7]
countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.9, 7.6, 14.2, 22.3, 5.8, -4.3, -2.3]
countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 0.9, -9.6, -3.6]
countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.4, 1.8, 0.0]
countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 7.2, 3.6, -4.5, -4.2, 1.7, 4.6, 3.3, 7.3, 7.0, 0.8, 2.6, 19.7, 8.7, -8.5, -3.8]
countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.5, 7.9, -1.0, 12.7, 29.8, 28.8, 10.5, 3.1]
countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 11.0, 0.7, -1.5]
countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.2, -5.4, -10.5, -8.4, -3.2, -1.6, -1.2, 1.5, 8.7, 11.5, 11.4, 20.6, 16.6, -1.6, 6.5, 16.3, 12.2, 11.3, 14.3, 15.9, 11.6, 13.9, 13.1, 14.2, 21.9, 9.9, -3.5, -0.2]
countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.7, 16.2, 9.8, 15.9, 14.1, 25.0, 5.5, -5.2, 4.4]
//---- 23.6.2023 (podatki za apr/2023 so bili objavljeni 16.6.2023)
//---- Excess, mortality, by, month, [DEMO_MEXRT__custom_6650997]
//---- https://ec.europa.eu/eurostat/databrowser/bookmark/024afeab-d6c9-4b4d-9125-60e4bfa1de36?lang=en
//European, Union, -, 27, countries, (from, 2020), -5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.4, 17.1, 13.9, 10.3, 11.6, 8.7, 20.0, 3.7, -1.5, 0.6, 2.7
//Belgium, -4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.1, 0.7, 16.5, 4.4, 6.9, 5.6, 10.5, 6.5, 10.3, 2.1, 19.8, 5.5, -4.8, -2.4, -0.5
//Bulgaria, -11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -5.1, -13.2, -9.4, -9.9, -8.7
//Czechia, -2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.7, 8.4, -7.0, -4.5, -1.1
//Denmark, -2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.3, 12.8, 7.1, 23.2, 11.8, -1.9, 0.8, 8.9
//Germany, (until, 1990, former, territory, of, the, FRG), -2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.6, 12.0, 16.4, 17.6, 15.9, 24.4, 16.4, 38.2, 14.4, -0.8, 4.3, 9.5
//Estonia, -9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.7, 16.2, 5.0, 3.3, 17.8, 12.7, 12.4, 16.6, 9.1, 14.5, 24.1, 10.3, -7.4, -6.6, 3.7
//Ireland, -9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.1, 12.2
//Greece, 0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 8.0, 8.0, 9.2
//Spain, -4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.5, 6.0, 6.1, 2.2
//France, -5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.4, 5.3, -1.1, 0.6, 3.9
//Croatia, -13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.7, -2.5, -9.6, -0.1
//Italy, -9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.1, -3.0, 2.2, -4.2, :
//Cyprus, 14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 10.3, 14.6, 11.8, 3.5
//Latvia, -8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.7, -3.6, -13.9, -3.6
//Lithuania, -12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7
//Luxembourg, -8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3
//Hungary, -9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.2, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.5, 5.0, 6.4, 6.2, 8.0, -9.8, -6.5, 0.8, -2.2
//Malta, -3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.3, 7.9
//Netherlands, -3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.4, 4.2, 12.3, 9.7
//Austria, -2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.5, 9.1, 13.2
//Poland, -6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.2, 0.5
//Portugal, -3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.8, 4.6, 2.0
//Romania, -9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -8.6, -11.0, -9.9, -12.2
//Slovenia, -6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.9, 7.6, 14.2, 22.3, 5.8, -4.3, -2.3, 1.6
//Slovakia, -4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.3, -9.5, 2.2, -1.1
//Finland, -9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 6.0, 1.9, -0.5, 12.4
//Sweden, -5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 9.0, -8.4, -3.6, 0.2
//Iceland, 13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.5, 7.9, -1.0, 12.7, 29.8, 29.3, 10.2, 5.7, -5.5
//Liechtenstein, -24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 4.4, -2.6, -8.2
//Norway, -3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.2, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.5, 8.7, 11.5, 11.5, 20.6, 16.6, -1.6, 6.5, 16.3, 12.2, 11.4, 14.4, 15.9, 11.7, 13.9, 13.2, 14.3, 21.9, 10.2, -3.2, 0.4, 4.1
//Switzerland, -3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.1, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 5.9, -4.3, 4.4, 7.6

//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.4, 17.1, 13.9, 10.3, 11.6, 8.7, 20.0, 3.7, -1.5, 0.6, 2.7]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.1, 0.7, 16.5, 4.4, 6.9, 5.6, 10.5, 6.5, 10.3, 2.1, 19.8, 5.5, -4.8, -2.4, -0.5]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -5.1, -13.2, -9.4, -9.9, -8.7]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.7, 8.4, -7.0, -4.5, -1.1]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.3, 12.8, 7.1, 23.2, 11.8, -1.9, 0.8, 8.9]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.6, 12.0, 16.4, 17.6, 15.9, 24.4, 16.4, 38.2, 14.4, -0.8, 4.3, 9.5]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.2, 20.7, 16.2, 5.0, 3.3, 17.8, 12.7, 12.4, 16.6, 9.1, 14.5, 24.1, 10.3, -7.4, -6.6, 3.7]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.1, 12.2]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 8.0, 8.0, 9.2]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.5, 6.0, 6.1, 2.2]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.4, 5.3, -1.1, 0.6, 3.9]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.7, -2.5, -9.6, -0.1]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.1, -3.0, 2.2, -4.2, -4.2]      //za apr23 podvojil vrednosti iz mar23, ker za apr23 podatek manjka!!
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 10.3, 14.6, 11.8, 3.5]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.7, -3.6, -13.9, -3.6]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.2, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.5, 5.0, 6.4, 6.2, 8.0, -9.8, -6.5, 0.8, -2.2]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.3, 7.9]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.4, 4.2, 12.3, 9.7]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.5, 9.1, 13.2]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.2, 0.5]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.8, 4.6, 2.0]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -8.6, -11.0, -9.9, -12.2]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.8, 16.3, 13.8, 3.9, 7.6, 14.2, 22.3, 5.8, -4.3, -2.3, 1.6]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.3, -9.5, 2.2, -1.1]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 6.0, 1.9, -0.5, 12.4]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 9.0, -8.4, -3.6, 0.2]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.5, 7.9, -1.0, 12.7, 29.8, 29.3, 10.2, 5.7, -5.5]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 4.4, -2.6, -8.2]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.2, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.5, 8.7, 11.5, 11.5, 20.6, 16.6, -1.6, 6.5, 16.3, 12.2, 11.4, 14.4, 15.9, 11.7, 13.9, 13.2, 14.3, 21.9, 10.2, -3.2, 0.4, 4.1]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.1, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 5.9, -4.3, 4.4, 7.6]

//---- 17.7.2023 (podatki za maj/2023 so bili objavljeni 17.7.2023)
//---- Excess, mortality, by, month, [DEMO_MEXRT__custom_6650997]
//---- https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20230714-2
//---- https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_6911775/default/table?lang=en
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.4, 17.1, 13.9, 10.3, 11.6, 8.7, 20.0, 3.9, -1.4, 0.9, 3.3, 2.9]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.5, 0.2, 0.7, 16.5, 4.4, 6.9, 5.6, 10.5, 6.5, 10.4, 2.1, 19.9, 5.5, -4.7, -2.3, -0.3, -0.5]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.5, -8.5, -9.7, -8.1, -7.7]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 8.7, -6.7, -4.5, 0.0, -3.4]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.1, 23.2, 11.8, -1.9, 0.9, 9.3, 6.6]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.0, 4.0, 12.9, 9.6, 12.0, 16.4, 17.6, 15.9, 24.4, 16.4, 38.2, 14.6, -0.7, 4.8, 10.1, 8.3]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 9.8, -7.3, -6.1, 4.4, -0.7]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.3]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.9, 5.7, 10.1]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.5, 6.1, 6.3, 3.0, 1.1]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.5, 5.4, -1.0, 0.9, 5.1, 4.4]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.7, -2.5, -9.6, -2.4, -3.2]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.1, -2.7, 2.9, -2.8, 1.2, 1.2]      //za maj23 podvojil vrednosti iz apr23, ker za maj23 podatek manjka!!
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 8.3, 12.3, 10.0, -0.7, 2.4]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.7, -3.6, -13.9, -3.6, -6.0]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.8, -6.4, 1.2, 0.3, -0.9]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 7.5]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.5, 4.2, 12.5, 9.9, 7.5]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 9.9]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.2, 0.5, 1.7]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.8, 4.7, 1.9, 4.4]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.1, 31.1, 11.5, 4.9, -1.5, -6.1, 4.0, 10.6, 3.6, -4.4, -5.3, -11.2, -8.5, -10.8, -9.9, -6.9, -8.8]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.6, 3.9, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.5, 6.3, -4.3, -2.3, 1.6, 8.1]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.3, -9.1, 2.4, 1.8, -6.2]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.5, 1.9, -0.5, 12.1, 14.3]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 9.3, -8.4, -3.5, 0.5, 0.9]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -1.1, 12.2, 29.8, 29.4, 10.6, 5.5, -4.7, 4.5]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 4.4, 1.2, -0.2, 5.6]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.2, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.1, 14.2, 15.7, 11.4, 13.7, 13.0, 14.1, 21.7, 10.1, -3.3, 0.5, 3.9, 4.4]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 5.1, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.2, -3.7, 5.6, 8.1, 6.4]

//---- 18.8.2023 (podatki za jun/2023 so bili objavljeni 17.8.2023)
//---- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
//---- https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_7188040/default/table?lang=en
//---- 
//---- 
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.7, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.5, 17.1, 13.9, 10.3, 11.7, 8.8, 20.4, 4.0, -1.2, 1.0, 3.8, 2.9, 2.5]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.8, -0.1, 0.4, 16.3, 4.2, 6.8, 5.3, 10.3, 6.3, 10.2, 1.8, 19.4, 5.5, -4.7, -2.2, -0.2, -0.3, 6.3]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.3, -8.3, -9.5, -7.9, -7.2, -9.7]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 9.1, -6.4, -3.9, 0.1, -1.8, -3.9]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.2, 23.2, 11.9, -1.8, 0.9, 9.4, 6.7, 5.2]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.8, -1.0, 4.1, 13.0, 9.7, 12.1, 16.6, 17.8, 16.2, 24.6, 16.9, 39.0, 14.7, -0.5, 5.1, 10.7, 8.5, 7.8]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 9.9, -7.2, -5.8, 4.6, 0.0, 10.4]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.2, 13.6]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.7, 2.8, 5.7, -0.5]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.5, 6.1, 6.4, 3.0, 1.3, 1.4]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.5, 5.4, -0.9, 0.9, 5.2, 5.0, 4.3]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.7, -2.5, -9.5, -2.2, -2.8, -3.2]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.1, -2.5, 3.1, -2.6, 1.8, -1.8, 2.5]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 39.2, 29.3, 42.5, 36.8, 16.0, 16.3, 30.3, 17.3, 17.6, 21.8, 28.9, 21.0, 9.3, 13.1, 9.9, -0.5, -0.5, 13.3]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.8, -3.6, -13.9, -3.6, -6.0, -1.9]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7, -5.0]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5, 1.9]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.8, -6.4, 1.2, 0.4, -0.3, -3.8]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 8.7, 7.6]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.4, 13.5, 4.3, 12.5, 10.0, 7.7, 14.0]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 10.0, 8.0]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.1, 0.6, 1.8, 1.2]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.9, 4.8, 2.1, 5.5, 6.6]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.4, 31.1, 11.5, 4.9, -1.5, -6.1, 4.1, 10.6, 3.7, -4.2, -5.0, -7.0, -7.9, -10.6, -9.7, -6.9, -4.5, -17.3]
//countryExcessDeath[cv_svn] = [-5.1, 1.3, -0.2, 6.6, 2.8, 10.6, 4.5, 3.9, 9.1, 27.4, 93.2, 80.8, 28.0, -0.7, 4.0, 11.8, 11.4, 15.7, 1.8, -3.1, 16.8, 19.7, 52.1, 26.8, 4.0, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.6, 6.9, -3.9, -1.8, 1.6, 8.5, 11.3]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.4, -8.9, 2.6, 1.5, -1.5, -4.2]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.5, 2.0, -0.4, 12.1, 13.7, 14.4]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 9.6, -8.4, -3.4, 0.6, 1.2, 2.6]
//countryExcessDeath[cv_ice] = [14.1, 3.9, -0.6, 5.0, 8.2, -19.9, -4.7, -6.3, 0.7, 11.3, 5.3, 5.5, 4.8, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -1.1, 12.2, 29.8, 29.4, 10.6, 5.4, -4.7, 4.5, 4.5]      //za jun23 podvojil vrednosti iz maj23, ker za jun23 podatek manjka!!
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 9.5, 1.2, -0.2, 4.9, -0.5]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.2, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.1, 14.2, 15.7, 11.4, 13.7, 13.0, 14.1, 21.7, 10.1, -3.3, 0.5, 4.0, 4.5, 7.9]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.2, 60.1, 23.9, -5.0, -5.5, 3.3, 3.5, 2.8, 2.6, 9.0, 12.7, 7.1, 16.6, 25.9, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.3, -3.5, 6.0, 8.8, 4.1, 3.1]

//---- 18.9.2023 (podatki za jul/2023 so bili objavljeni 14.9.2023)
//---- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics&oldid=509982
//---- https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_7188040/default/table?lang=en
//----
//----
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.5, 17.1, 13.9, 10.3, 11.7, 8.8, 20.4, 4.1, -1.2, 1.1, 4.0, 3.3, 2.5, 1.8]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.8, -0.1, 0.4, 16.3, 4.2, 6.8, 5.3, 10.3, 6.3, 10.2, 1.8, 19.4, 5.6, -4.7, -2.2, -0.1, -0.1, 6.7, -4.2]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.2, -8.1, -9.3, -7.5, -6.4, -8.6, -3.4]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 9.2, -6.3, -3.7, 0.3, -1.8, -1.3, -4.7]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.2, 23.2, 11.9, -1.8, 0.9, 9.4, 6.7, 5.2, 7.9]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.8, -1.0, 4.1, 13.0, 9.7, 12.1, 16.6, 17.8, 16.2, 24.6, 16.9, 39.0, 14.7, -0.4, 5.3, 11.0, 9.2, 7.8, 1.7]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 9.9, -7.1, -5.8, 4.7, 0.1, 10.8, -0.9]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.2, 14.0, 13.7]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.7, 2.9, 5.2, -2.6, 19.6]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.7, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.7, 5.8, 6.1, 2.8, 1.2, 2.5, 3.1]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.5, 5.4, -0.9, 1.0, 5.3, 5.4, 5.9, 0.4]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.7, -2.4, -9.5, -2.0, -2.7, -4.2, -2.1]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.1, -2.1, 3.4, -2.2, 2.4, -0.9, -3.3, 6.9]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 37.8, 27.8, 39.1, 34.1, 13.5, 13.2, 27.3, 14.8, 13.0, 17.2, 25.8, 22.8, 9.7, 13.6, 10.9, -0.1, 0.4, 12.6, 20.4]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.8, -3.6, -13.9, -3.6, -5.9, -1.7, -12.6]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7, -5.0, -6.6]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5, 1.9, -2.6]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.8, -6.4, 1.3, 0.4, -0.4, -3.0, -3.2]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 8.7, 7.6, 53.3]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.1, 12.9, 19.2, 13.1, 23.6, 13.5, 4.3, 12.5, 10.0, 7.8, 14.3, 6.0]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 10.1, 8.1, 7.3]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.1, 0.6, 1.8, 1.3, -1.6]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.9, 4.8, 2.1, 5.7, 6.7, 5.3]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.4, 31.1, 11.5, 4.9, -1.5, -6.1, 4.1, 10.6, 3.7, -4.2, -5.0, -7.0, -7.8, -10.5, -9.5, -6.6, -4.4, -10.5, -8.3]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.6, 3.9, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.6, 6.9, -3.9, -1.8, 1.6, 8.1, 10.4, 9.1]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.7, -8.6, 3.1, 2.1, -0.7, 3.0, 1.1]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.5, 2.1, -0.3, 12.2, 13.7, 13.9, 5.5]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 9.8, -8.3, -3.4, 0.6, 1.3, 3.1, -3.2]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -1.1, 12.2, 29.8, 29.4, 10.6, 5.9, -4.2, 6.9, 5.3, 15.9]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 9.5, 1.2, -0.2, 10.0, 1.8, -47.6]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.1, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.2, 14.2, 15.7, 11.4, 13.7, 13.0, 14.1, 21.7, 10.1, -3.2, 0.6, 4.1, 5.0, 9.2, 1.2]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.2, 60.1, 23.9, -5.0, -5.5, 3.3, 3.5, 2.8, 2.6, 9.0, 12.7, 7.1, 16.6, 25.9, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.3, -3.4, 6.1, 9.1, 5.1, 3.8, 3.3]


//---- 21.10.2023 (podatki za avg/2023 so bili objavljeni 17.10.2023)
//---- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
//---- https://ec.europa.eu/eurostat/databrowser/view/demo_mexrt__custom_7998268/default/table?lang=en
//----
//----
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 11.9, 7.9, 8.4, 17.1, 13.9, 10.3, 11.7, 8.8, 20.4, 4.1, -1.1, 1.2, 4.1, 3.4, 2.7, 2.1, 3.1]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.8, -0.1, 0.4, 16.3, 4.2, 6.8, 5.3, 10.3, 6.3, 10.2, 1.8, 19.4, 5.6, -4.7, -2.1, -0.1, 0.0, 6.9, -3.9, -0.6]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.2, -8.1, -9.2, -7.4, -6.2, -8.4, -3.0, -6.3]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 9.2, -6.3, -3.7, 0.4, -1.7, -1.4, -3.4, -1.7]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.2, 23.2, 11.9, -1.8, 0.9, 9.4, 6.7, 5.2, 7.9, 4.4]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.8, -1.0, 4.1, 13.0, 9.7, 12.1, 16.6, 17.8, 16.2, 24.6, 16.9, 39.0, 14.8, -0.4, 5.4, 11.1, 9.5, 8.3, 1.4, 5.4]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 9.9, -7.1, -5.6, 4.9, 0.4, 11.0, 0.1, -1.3]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.3, 14.0, 13.7, 21.1]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.7, 2.9, 5.3, -2.9, 17.8, 6.9]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 4.9, 3.5, 0.8, 8.4, 13.9, 16.1, 36.5, 19.3, 8.5, 8.5, 4.7, 9.7, -1.7, 5.8, 6.1, 2.8, 1.2, 2.6, 3.3, 9.1]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.5, 9.1, 26.5, 5.4, -0.9, 1.0, 5.4, 5.4, 6.0, 0.7, 6.6]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.6, -2.3, -9.5, -2.0, -2.7, -3.7, -1.3, -1.6]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.2, -2.1, 3.6, -2.0, 2.6, -0.7, -3.0, 7.7, -0.2]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 37.8, 27.8, 39.1, 34.1, 13.5, 13.2, 27.3, 14.8, 13.0, 17.2, 25.8, 22.8, 9.7, 13.5, 10.6, -0.1, 0.7, 13.9, 19.0, 5.9]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.8, -3.6, -13.9, -3.5, -5.8, -1.7, -12.7, -3.6]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7, -5.0, -6.6, -4.9]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5, 1.9, -2.6, 7.8]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.8, -6.4, 1.3, 0.4, -0.4, -2.9, -2.1, -3.7]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 8.7, 7.6, 54.0, 16.9]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 23.0, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.5, 14.7, 35.2, 31.9, -0.7, -1.4, 8.9, 19.2, 11.1, 14.1, 15.2, 15.2, 13.0, 19.4, 13.3, 23.9, 13.5, 4.3, 12.5, 10.0, 7.8, 14.4, 6.2, 9.4]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 10.1, 8.2, 7.5, 7.7]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.1, 0.6, 1.9, 1.3, -1.5, 1.1]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.9, 4.8, 2.1, 5.7, 6.8, 5.3, 12.7]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.4, 31.1, 11.5, 4.9, -1.5, -6.1, 4.1, 10.6, 3.7, -4.2, -5.0, -7.0, -7.7, -10.4, -9.4, -6.4, -4.1, -10.5, -6.0, -8.4]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.6, 3.9, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.6, 6.9, -3.9, -1.9, 1.6, 8.1, 10.4, 9.1, 4.2]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.7, -8.6, 3.1, 2.1, -0.7, 3.0, 1.1, -5.7]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.5, 2.0, -0.3, 12.2, 13.8, 14.1, 4.8, 9.2]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 10.0, -8.3, -3.4, 0.7, 1.3, 3.2, -2.8, -1.3]
//countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, 0.4, 11.0, 5.0, 5.2, 4.7, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -0.6, 12.2, 30.3, 29.5, 10.6, 5.9, -3.7, 6.9, 6.2, 16.8, 14.9]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -16.0, 12.2, 9.5, 1.2, -0.2, 10.0, 1.8, -47.6, 0]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.1, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.2, 14.2, 15.7, 11.4, 13.8, 13.0, 14.0, 21.8, 10.2, -3.2, 0.6, 4.1, 5.2, 9.6, 2.4, 4.2]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.2, 60.1, 23.9, -5.0, -5.5, 3.3, 3.5, 2.8, 2.6, 9.0, 12.7, 7.1, 16.6, 25.9, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.4, -3.4, 6.2, 9.3, 5.4, 4.2, 3.5, 11.8]

//---- 18.11.2023 (podatki za sep/2023 so bili objavljeni 17.11.2023)
//---- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
//---- https://ec.europa.eu/eurostat/databrowser/view/demo_mexrt__custom_8566883/default/table?lang=en
//----
//----
//countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 12.0, 8.0, 8.5, 17.1, 13.9, 10.3, 11.7, 8.8, 20.4, 4.1, -1.1, 1.3, 4.2, 3.5, 2.9, 2.3, 3.7, 3.2]
//countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.8, -0.1, 0.4, 16.3, 4.2, 6.8, 5.3, 10.3, 6.3, 10.2, 1.8, 19.4, 5.6, -4.7, -2.1, -0.1, 0.0, 6.9, -3.7, -0.2, 4.1]
//countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.1, -8.0, -9.1, -7.3, -6.0, -8.1, -2.6, -5.0, -6.3]
//countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 9.2, -6.2, -3.6, 1.0, -0.9, -0.6, -3.3, 0.5, -4.3]
//countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.2, 23.2, 11.9, -1.8, 0.9, 9.4, 6.7, 5.2, 7.9, 4.4, 7.6]
//countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.8, -1.0, 4.1, 13.0, 9.7, 12.1, 16.6, 17.8, 16.2, 24.6, 16.9, 39.0, 14.8, -0.3, 5.4, 11.2, 9.6, 8.5, 1.9, 5.2, 7.3]
//countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 10.0, -7.1, -5.4, 5.3, 0.6, 11.3, 0.3, -0.5, -0.5]
//countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.3, 14.0, 13.7, 21.3, 12.5]
//countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.7, 2.9, 5.3, -2.9, 17.3, 5.2, 12.0]
//countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 5.2, 3.8, 1.0, 8.7, 14.2, 16.4, 36.8, 19.6, 8.8, 8.8, 5.0, 10.0, -1.7, 5.8, 6.1, 2.8, 1.2, 2.6, 3.4, 9.6, 5.7]
//countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.6, 9.1, 26.5, 5.4, -0.9, 1.0, 5.4, 5.5, 6.0, 0.9, 7.4, 5.5]
//countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.6, -2.3, -9.5, -2.0, -2.6, -3.6, -1.0, 0.0, 1.2]
//countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.2, -2.0, 3.7, -1.8, 2.9, -0.4, -2.7, 8.2, 0.5, 1.9]
//countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 37.8, 27.8, 39.1, 34.1, 13.5, 13.2, 27.3, 14.8, 13.0, 17.2, 25.8, 22.8, 9.9, 13.8, 10.7, -0.1, 0.4, 14.3, 20.0, 4.3, 13.9]
//countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.8, -3.6, -13.9, -3.5, -5.8, -1.6, -12.7, -3.5, -7.3]
//countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7, -5.0, -6.6, -4.9, -1.9]
//countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5, 1.9, -2.6, 7.8, 8.0]
//countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.7, -6.4, 1.3, 0.4, -0.4, -2.9, -2.1, -2.8, -6.4]
//countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 8.7, 7.6, 54.0, 16.9, 8.8]
//countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 23.0, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.5, 14.7, 35.2, 31.9, -0.7, -1.4, 8.9, 19.2, 11.1, 14.1, 15.2, 15.2, 13.0, 19.4, 13.3, 23.9, 13.5, 4.3, 12.6, 10.1, 7.8, 14.5, 6.4, 9.7, 12.7]
//countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 10.1, 8.2, 7.5, 8.2, 8.9]
//countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.1, 0.6, 1.9, 1.3, -1.5, 1.2, -1.6]
//countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.9, 4.8, 2.1, 5.7, 6.8, 5.3, 12.7, 9.7]
//countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.4, 31.1, 11.5, 4.9, -1.5, -6.1, 4.1, 10.6, 3.7, -4.2, -5.0, -7.0, -7.7, -10.3, -9.2, -6.2, -3.9, -10.2, -6.2, -5.1, -12.6]
//countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.6, 3.9, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.6, 6.9, -3.9, -1.8, 2.7, 8.8, 11.2, 9.1, 4.3, 1.5]
//countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.7, -8.6, 3.2, 2.2, -0.5, 3.6, 1.7, 2.1, -6.9]
//countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.6, 2.1, -0.3, 12.3, 13.9, 14.2, 5.0, 8.6, 13.4]
//countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 10.3, -8.3, -3.3, 0.7, 1.4, 3.3, -2.7, -1.0, 1.6]
//countryExcessDeath[cv_ice] = [14.1, 3.9, -0.6, 5.0, 8.2, -19.9, -4.7, -6.3, 0.7, 11.3, 5.3, 5.5, 4.8, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -0.6, 12.2, 30.3, 29.5, 10.6, 5.9, -3.7, 6.9, 6.2, 16.6, 14.7, 16.5]
//countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -38.0, 12.7, 9.5, 1.2, -0.2, 10.0, 1.8, -46.0, -10.7, -13.7]
//countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.1, -5.4, -10.5, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.2, 14.2, 15.7, 11.4, 13.8, 13.0, 14.0, 21.8, 10.2, -3.2, 0.6, 4.2, 5.2, 9.8, 2.6, 4.8, 11.9]
//countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.2, 60.1, 23.9, -5.0, -5.5, 3.3, 3.5, 2.8, 2.6, 9.0, 12.7, 7.1, 16.6, 25.9, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.4, -3.3, 6.3, 9.4, 5.7, 4.7, 4.6, 11.9, 5.5]

//---- 20.12.2023 (podatki za oct/2023 so bili objavljeni 17.12.2023)
//---- // https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Excess_mortality_-_statistics
//---- https://ec.europa.eu/eurostat/databrowser/view/demo_mexrt__custom_9088145/default/table?lang=en
//---- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Figure_1_Monthly_excess_mortality_Oct.png
countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.6, 25.2, 3.1, 1.8, 2.8, 7.6, 8.0, 17.3, 40.0, 29.7, 17.3, 6.0, 10.7, 20.9, 10.7, 6.8, 5.7, 9.1, 12.8, 18.3, 26.6, 23.7, 8.1, 8.3, 6.7, 11.9, 7.9, 8.4, 17.1, 13.9, 10.3, 11.6, 8.8, 20.3, 4.2, -1.1, 1.3, 4.2, 3.6, 3.0, 2.5, 4.0, 4.0, 3.9]
countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.8, -0.1, 0.4, 16.3, 4.2, 6.8, 5.3, 10.3, 6.3, 10.2, 1.8, 19.4, 5.6, -4.6, -2.1, -0.1, 0.1, 6.9, -3.6, 0.0, 4.6, 3.5]
countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.7, 47.0, 18.9, 7.0, -0.6, -6.2, 3.2, 9.3, 5.3, 1.1, -0.8, -4.9, -12.1, -7.9, -9.1, -7.2, -6.0, -8.0, -2.3, -4.7, -5.5, -6.6]
countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 40.9, 5.3, 6.0, 3.2, 11.3, 4.1, 2.4, 5.0, 7.9, 11.6, 10.8, 6.5, 23.8, 9.2, -6.1, -3.5, 1.1, -0.8, -0.6, -3.1, 0.5, -2.7, 0.5]
countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.4, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.9, 10.6, 14.1, 7.4, 12.8, 7.2, 23.2, 11.9, -1.8, 0.9, 9.4, 6.7, 5.2, 7.9, 4.4, 7.6, 9.8]
countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 31.0, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.8, -1.0, 4.1, 13.0, 9.7, 12.1, 16.6, 17.8, 16.2, 24.6, 16.9, 39.0, 14.9, -0.3, 5.5, 11.3, 9.7, 8.6, 2.1, 5.8, 7.3, 10.7]
countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 4.9, 20.2, 14.4, 3.2, 1.9, 15.9, 11.6, 9.0, 14.4, 6.5, 12.4, 19.8, 10.0, -7.1, -5.4, 5.3, 0.6, 11.3, 0.3, -0.5, -0.5, 7.0]
countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.7, 15.5, 25.7, 15.4, 0.8, 9.2, 12.2, 13.3, 14.0, 13.7, 21.3, 12.7, 17.8]
countryExcessDeath[cv_gre] = [0.3, 6.1, 7.2, 0.9, 3.0, -1.9, 5.2, 6.1, 9.9, 3.8, 27.6, 19.5, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.3, 34.3, 24.9, 18.0, 31.3, 32.3, 19.9, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.8, 10.8, 7.2, 9.6, 10.7, 4.6, 7.7, 4.7, 2.9, 5.3, -2.9, 17.3, 4.7, 9.9, 3.6]
countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.3, 8.0, -2.2, 1.7, 2.6, 2.1, 7.7, 18.5, 9.7, 5.8, 8.3, 9.1, 4.7, 3.5, 0.8, 8.2, 13.9, 15.8, 36.6, 19.3, 7.8, 7.8, 4.3, 9.0, -1.7, 5.9, 6.2, 2.9, 1.2, 2.6, 3.5, 9.8, 7.1, 3.4]
countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.3, 9.2, 7.7, 7.3, 15.1, 10.4, 8.6, 4.6, 14.9, 6.7, 6.8, 15.2, 13.4, 8.1, 11.6, 9.1, 26.5, 5.5, -0.8, 1.0, 5.4, 5.5, 6.1, 1.0, 7.6, 6.3, 6.2]
countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.5, 25.7, 8.2, 6.7, 1.0, 1.5, 12.6, 9.1, 6.0, 3.8, 3.4, 9.5, -5.6, -2.3, -9.4, -2.0, -2.5, -3.6, -0.9, 0.1, -0.3, -2.2]
countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.1, 5.1, 18.6, 23.2, 8.7, 7.0, 7.1, 11.4, 10.0, 5.7, 6.3, 10.5, 8.5, 7.2, 6.9, 11.3, 9.2, 7.0, 29.6, 12.7, 8.2, 6.6, 9.9, 15.2, -1.9, 3.8, -1.7, 3.0, -0.2, -2.4, 8.6, 0.9, 2.5, -2.3]
countryExcessDeath[cv_cyp] = [14.2, 0.4, 9.1, 3.5, 26.4, 9.2, 9.1, 1.8, 8.5, 9.0, 13.8, 24.9, 10.5, -3.9, 6.7, 31.2, 16.5, 19.1, 41.8, 54.9, 31.8, 20.7, 26.0, 32.0, 37.8, 27.8, 39.1, 34.1, 13.5, 13.2, 27.3, 14.8, 13.0, 17.2, 25.8, 22.8, 10.3, 13.8, 11.0, 0.3, 1.0, 14.8, 20.2, 4.9, 10.4, 17.4]
countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.7, -0.3, 7.4, 4.9, 7.2, 4.1, 17.9, 7.8, -3.6, -13.8, -3.5, -5.8, -1.6, -12.6, -3.5, -7.6, -0.6]
countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3, 20.6, -1.5, -22.8, -6.7, -7.7, -3.7, -5.0, -6.6, -4.9, -1.9, -3.8]
countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 20.0, 1.6, 4.7, -1.3, 19.5, 1.9, 8.3, 10.9, 10.1, 1.0, 6.1, 2.6, 9.6, 15.9, -9.3, -2.4, 12.3, 17.5, 1.9, -2.6, 7.8, 8.0, 12.3]
countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.3, 1.4, 5.5, 4.8, 8.5, 1.1, 2.6, 8.2, 5.5, 5.0, 6.4, 5.5, 7.6, -9.8, -6.4, 1.3, 0.4, -0.4, -2.9, -2.0, -2.7, -5.9, 0.7]
countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.5, 17.2, 11.2, 4.3, 1.8, 11.7, 9.3, 8.7, 7.6, 54.0, 16.9, 10.8, 13.9]
countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 23.0, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.5, 14.7, 35.2, 31.9, -0.7, -1.4, 8.9, 19.2, 11.1, 14.1, 15.2, 15.2, 13.0, 19.4, 13.3, 23.9, 13.5, 4.3, 12.6, 10.1, 7.8, 14.5, 6.4, 9.9, 12.8, 15.1]
countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.8, -0.5, 5.0, 17.4, 20.8, 12.0, 16.0, 20.2, 13.5, 14.7, 20.7, 16.1, 30.1, 14.0, 0.6, 9.1, 13.2, 10.1, 8.2, 7.5, 7.9, 8.9, 10.7]
countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.3, 6.0, 11.6, 12.3, 9.1, 2.9, 17.8, 5.0, -8.4, -1.1, 0.6, 1.9, 1.3, -1.5, 1.3, -1.3, 0.9]
countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.3, 12.6, 19.3, 24.4, 29.2, 9.4, 11.4, 8.8, 13.0, 14.7, -3.1, 5.9, 4.8, 2.1, 5.8, 6.9, 5.4, 12.9, 12.1, 6.5]
countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.2, 7.0, 26.4, 39.8, 16.3, 5.2, 6.7, 3.3, 33.4, 111.2, 70.1, 10.4, 3.4, 31.1, 11.5, 4.9, -1.5, -6.1, 4.1, 10.6, 3.7, -4.2, -5.0, -7.0, -7.5, -10.2, -9.0, -6.1, -3.7, -10.0, -5.4, -4.8, -5.6, -9.6]
countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.6, 3.9, 14.8, 9.0, 13.7, 8.1, 11.2, 16.5, 14.1, 4.1, 7.6, 14.2, 25.6, 6.9, -3.9, -1.8, 2.7, 8.8, 11.2, 9.1, 4.3, 1.5, 8.8]
countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 65.0, 12.0, 10.8, 24.8, 15.8, 7.9, 11.0, 13.7, 15.2, 8.6, 13.6, 8.8, 21.2, 1.8, -8.5, 3.4, 2.4, -0.4, 3.8, 2.1, 2.6, 0.6, -2.3]
countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.3, 12.4, 13.4, 20.9, 15.5, 10.2, 12.2, 19.7, 19.0, 19.8, 22.9, 27.7, 9.6, 2.1, -0.2, 12.3, 13.9, 14.3, 5.1, 8.7, 12.5, 19.8]
countryExcessDeath[cv_swe] = [-5.4, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.6, -4.8, -7.4, -4.2, 0.9, -1.7, -1.6, -0.3, 3.7, 0.1, 2.8, 4.4, 6.5, 3.6, -4.5, -4.3, 1.6, 4.6, 3.2, 7.1, 6.6, 0.8, 2.6, 19.7, 10.6, -8.3, -3.3, 0.7, 1.4, 3.4, -2.7, -0.9, 2.0, 6.1]
countryExcessDeath[cv_ice] = [14.1, 3.9, -0.6, 5.0, 8.2, -19.9, -4.7, -6.3, 0.7, 11.3, 5.3, 5.5, 4.8, 2.3, -4.3, 3.2, 3.8, 3.0, 10.6, 17.7, -11.5, -13.9, 9.5, 19.1, 15.9, 23.4, 54.4, 13.6, 13.7, 10.3, 36.2, 11.7, 8.2, -0.6, 12.2, 30.3, 29.5, 10.6, 5.9, -3.7, 6.9, 6.2, 16.6, 14.5, 16.3, 0.1]
countryExcessDeath[cv_lie] = [-24.5, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 117.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 22.1, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 8.1, -38.0, 12.7, 9.5, 1.2, -0.2, 10.0, 1.8, -45.3, -2.4, -12.4, -13.2]
countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.5, 2.9, -3.1, -1.6, -1.8, 1.7, 4.9, 1.9, 0.8, -2.1, -5.4, -10.4, -8.3, -3.2, -1.6, -1.2, 1.6, 8.7, 11.5, 11.5, 20.6, 16.6, -1.8, 6.3, 16.1, 12.0, 11.2, 14.2, 15.7, 11.5, 13.8, 13.0, 14.0, 21.8, 10.2, -3.2, 0.6, 4.2, 5.2, 9.8, 2.9, 5.2, 12.8, 9.0]
countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.2, 60.1, 23.9, -5.0, -5.5, 3.3, 3.5, 2.8, 2.6, 9.0, 12.7, 7.1, 16.6, 25.9, 5.2, 4.0, 14.3, 14.6, 5.9, 13.8, 22.8, 16.2, 9.8, 16.0, 14.1, 25.3, 6.4, -3.3, 6.4, 9.5, 5.8, 5.0, 5.1, 12.9, 6.3, 9.1]

const cv_mode_vaccExcessDeath = 1;
const cv_mode_vaccExcessDeathMulti = 2;
const cv_mode_timeExcessDeathSingle = 3;
const cv_mode_timeExcessDeathMulti = 4;
const cv_maxMode = 4;
var gl_mode = cv_mode_vaccExcessDeath;
var gl_sameScaleY = false; //24.10.2023

const cv_graphType_vaccExcessDeath = 1;
const cv_graphType_timeExcessDeath = 2;

var lo_nrMonthsAvg = 5
var lo_nrMonthsAvgOld = 5                   // 25.1.2023 v1.1
var lo_nrMonthsAvgAll = false               // 25.1.2023 v1.1
var lo_enabledIntChooserNrMonthsAvg = true; // 25.1.2023 v1.1
var gl_monthEnd = cv_nrMonths
var gl_tailMonths = 5  //za koliko mesecev nazaj se še riše od trenutno izbranega meseca gl_monthEnd
var gl_monthStart = 1; //gl_monthEnd - gl_tailMonths  //28=apr2022 30=jun2022 35=nov2022 36=dec2022
var lo_tipMonth = 0;

var lo_keyDownA = false
var lo_keyDownT = false
var lo_keyDown0 = false; //2.2.2023 v1.11

var lo_graphMarginLeft, lo_graphMarginTop, lo_graphMarginRight, lo_graphMarginBottom;

var lo_showGUI = true
var lo_showHelpTips = true

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

var lo_frmTitleBarHeight =0
var lo_frmBorderWidth =0
var lo_formLoaded  = false

var lo_mouseMoveX  = 0
var lo_mouseMoveY  = 0 

var lo_mouseDown = false
var lo_mouseDownX, lo_mouseDownY;

var lo_borderless = false
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

class countryPanel {
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
        this.textRight = this.right - pickCountryLeftDiff;
    }
    paint() {
        if (!this.visible) { return };
        let tmpW, tmpH, x, y, color
        if (this.backColor != "") {
            for (country = 1; country <= cv_maxCountry; country++) {
                ;[tmpW, tmpH] = gMeasureText(countryNameShort3[country], this.font);
                x = this.textRight - tmpW;
                y = this.textTop + (country - 1) * this.itemHeight;
                if (!lo_enabledCountry[country]) { color = this.disabledColor }
                switch (country) {
                    case 1: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 9, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                    case cv_maxCountry: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 11, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                    default: gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 16, this.backColor, 0, "", "", "", "", "", 0, 0); break;
                }
                //if (country == 1 || country == cv_maxCountry) {
                //    gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 9, this.backColor, 0, "", "", "", "", "", 0, 0)
                //} else { gBannerRectWithText(x, y, x + tmpW, y + tmpH, 10, 16, this.backColor, 0, "", "", "", "", "", 0, 0) }
            }
        }
        for (country = 1; country <= cv_maxCountry; country++) {
            ;[tmpW, tmpH] = gMeasureText(countryNameShort3[country], this.font);
            //x = ctxW - tmpW - pickCountryLeftDiff; y = pickCountryTop + (country - 1) * pickCountryHeight;
            x = this.textRight - tmpW;
            y = this.textTop + (country - 1) * this.itemHeight;
            color = countryColor[country]
            if (!lo_enabledCountry[country]) { color = this.disabledColor }
            gBannerRectWithText(x, y, x + tmpW, y + tmpH, 3, 3, this.fillColor, this.strokeWidth, this.strokeColor, this.font, color, countryNameShort3[country], this.shaddowColor, this.shaddowX, this.shaddowY)
        }
    }
    eventMouseWithin(mouseX, mouseY) {
        if (!this.visible || !this.enabled) { return false; };
        //---- če miška ni nad področjem gumbov držav
        if (mouseX >= (this.left) && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + cv_maxCountry * this.itemHeight))
             { return true; }
        else { return false; };
    }
    eventClick(mouseX, mouseY) {
        if (!this.visible) { return cv_countryNone };
        //---- če klik ni bil na državah
        if (!this.eventMouseWithin(mouseX, mouseY)) { return cv_countryNone };
        //if (!(mouseX >= (this.left) && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + cv_maxCountry * this.itemHeight))) {
        //    return -100;
        //}
        //---- na katero državo je bil klik
        let y0, y1;
        for (country = cv_minCountry; country <= cv_maxCountry; country++) {
            y0 = this.top + (country - 1) * this.itemHeight;
            y1 = this.top + country * this.itemHeight;
            if (mouseY >= y0 && mouseY <= y1) {
                return country
            }
        }
        return cv_countryNone;  //-100;
    }
    eventDblClick(mouseX, mouseY) {
        if (!this.visible) { return false };
        //---- če dvojni klik ni bil na državah
        if (!(mouseX >= this.left && mouseX <= (this.right) && mouseY >= (this.top) && mouseY <= (this.top + cv_maxCountry * this.itemHeight)))
             { return false }
        else { return true };
    }
    eventMouseOverValue(mouseX, mouseY) {
        return this.eventClick(mouseX, mouseY); //ker eventClick() ne postavlja nobenega propertija objekta, lahko uporabim kar ta surogat
    }
    adjustToCtxWidth() {
        this.left = ctxW - pickCountryLeftDiff - 45;
        this.textRight = ctxW - pickCountryLeftDiff;
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
        let x1, x2, y1
        x1 = xx - chooserWidthHalf;
        x2 = xx + chooserWidthHalf;
        y1 = bodyBottom + this.selHeight
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
        y0 = bodyTop - 8; y1 = bodyBottom + this.selHeight;
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
        x0 = this.left; x1 = this.left + this.width;
        if (mouseX < x0 || mouseX > x1) { return (this.minItemValue - 1); }
        //---- miška je znotraj območja možnega klika
        vl_value = Math.round(this.minItemValue + (mouseX - this.left - itemWidthHalf) / itemWidth);
        vl_value = fixForRange(vl_value, this.minItemValue, this.minItemValue + (this.items - 1) * this.step);
        //console.log("  mouse over value=" + vl_value);
        return vl_value;
    }
}

class intChooser {
    constructor(left, top, width, items, value, minItemValue, step, color, fillColor, crossColor, outRadij, inRadij, selRadij, bodyWidth, text, font, gap, posAlign, textColor, clickGap, enabled, disabledColor, disabledTextColor, visible) {
        this.left = left; this.top = top; this.width = width; // top: zgornji rob krogcev
        this.items = items; this.value = value; this.minItemValue = minItemValue; this.step = step;
        this.color = color;
        this.fillColor = fillColor;
        this.crossColor = crossColor;
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
    }
    paint() {
        if (!this.visible) { return };
        let myColor = this.color; let myCrossColor = this.crossColor;
        if (!this.enabled) { myColor = this.disabledColor; myCrossColor = this.disabledColor }
        let focused = (this.enabled && this.eventMouseWithin(lo_mouseMoveX, lo_mouseMoveY)) ? true : false;
        let valueItem = Math.round((this.value - this.minItemValue) / this.step) + 1
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
            gEllipse(x, yBodyMiddle, this.outRadij, this.outRadij, 0, myColor, 0, "")        
            gEllipse(x, yBodyMiddle, this.inRadij, this.inRadij, 0, this.fillColor, 0, "") 
            if (step == valueItem) {
                gEllipse(x, yBodyMiddle, this.selRadij, this.selRadij, 0, myCrossColor, 0, "") 
                //tmpStr = this.value.toString();
                //;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                //gText(this.value.toString(), font, "darkSlateGray", x - tmpW/2, yBodyMiddle - this.outRadij - 2)
            }
        }
        //---- izpis teksta
        switch (this.posAlign) {
            case "above-left":
                ;[tmpW, tmpH] = gMeasureText(this.text, this.font);
                let myTextColor = this.enabled ? this.textColor : this.disabledTextColor;
                gText(this.text, this.font, myTextColor, this.left, yBodyMiddle - this.outRadij - this.gap);
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
        if (!this.visible || !this.enabled) { return (this.minItemValue - 1); };
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
    constructor(left, top, width, lineWidth, smoothPx, text, textColor, font, gap, posAlign, value, color, fillColor, crossColor, enabled, disabledLineColor, disabledFillColor, disabledTextColor, visible) {
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
const pickCountryTop = 65; const pickCountryTopText = pickCountryTop + 5; const pickCountryHeight = 20; const pickCountryLeftDiff = 10; //6
const cv_guiLayoutA = 1;
const cv_guiLayoutB = 2;
var lo_GUI_layout = cv_guiLayoutB;
switch (lo_GUI_layout) {
    case cv_guiLayoutA:
        guiPanelLeft = 100; guiPanelTop = 80; guiPanelWidth = 500; guiPanelHeight = 80;
        var checkBoxNrMonthsAvgAll = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "vse", "gray", "normal 10pt verdana", 4, "above-middle", lo_nrMonthsAvgAll, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true);
        var intChooserNrMonthsAvg = new intChooser(guiPanelLeft, guiPanelTop - 4, 180, 5, lo_nrMonthsAvg, 1, 1, "burlyWood", "white", "orangeRed", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserNrMonthsAvg, disabledControlLineColor, disabledControlTextColor, true);
        var countryPanelToggle = new countryPanel(ctxW - pickCountryLeftDiff - 41, pickCountryTop, ctxW, pickCountryHeight, true, "darkGray", "bold 10pt verdana", "white", 1, "lightGray", "gray", 2, 2, "#E0E0E0FF", true);
        var sliderTailMonths = new slider(guiPanelLeft, guiPanelTop + 42, 500, cv_nrMonths, gl_tailMonths, 0, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        var sliderMonthEnd = new slider2(guiPanelLeft, guiPanelTop + 90, 500, cv_nrMonths, gl_monthStart, false, gl_monthEnd, 1, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
    case cv_guiLayoutB:
        guiPanelLeft = 8; guiPanelTop = 8; guiPanelWidth = 500; guiPanelHeight = 80;
        var buttonMode = new button(guiPanelLeft, guiPanelTop + 10, 60, 28, "Mode", "bold 10pt verdana", "gray", "darkSlateGray", 1, "gray", "darkSlateGray", "lightGoldenrodYellow", 2, 0, 0, 0, 0, "middle", "middle", "lightGray", 2, 2, false, true, disabledControlBackColor, disabledControlTextColor, true);
        var intChooserNrMonthsAvg = new intChooser(guiPanelLeft, guiPanelTop + 16, 180, 5, lo_nrMonthsAvg, 1, 1, "burlyWood", "white", "orangeRed", 7, 5, 4, 7, "", "normal 10pt verdana", 4, "above-left", "gray", 5, lo_enabledIntChooserNrMonthsAvg, disabledControlLineColor, disabledControlTextColor, true);
        var checkBoxNrMonthsAvgAll = new checkBox(guiPanelLeft + 194, guiPanelTop - 8, 18, 2, 2, "all", "gray", "normal 10pt verdana", 4, "above-middle", lo_nrMonthsAvgAll, "burlyWood", "white", "peru", true, disabledControlLineColor, disabledControlBackColor, disabledControlTextColor, true);
        var sliderTailMonths = new slider(guiPanelLeft, guiPanelTop + 42, 500, cv_nrMonths, gl_tailMonths, 0, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        var sliderMonthEnd = new slider2(guiPanelLeft, guiPanelTop + 90, 500, cv_nrMonths, gl_monthStart, true, gl_monthEnd, 1, 1, true, "burlyWood", "lightGray", 7, 13, 12, "gray", "", "normal 10pt verdana", 6, "above-left", "gray", disabledControlTextColor, "bold 9pt cambria", "gray", 6, 0, 0, true);
        var buttonPlay = new buttonPlayPauseStop(sliderMonthEnd.right + 10, guiPanelTop + 6, 23, 24, "play", 1, "gray", "darkSlateGray", "honeydew", 2, "lightGray", 2, 2, false, true, disabledControlBackColor, true);
        var countryPanelToggle = new countryPanel(ctxW - pickCountryLeftDiff - 41, pickCountryTop, ctxW, pickCountryHeight, true, "darkGray", "bold 10pt verdana", "white", 1, "lightGray", "gray", 2, 2, "#E0E0E0FF", true);
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
//countryPanelToggle.right = ctxW - pickCountryLeftDiff; // 27.1.2023 v1.4
//countryPanelToggle.left = countryPanelToggle.right - 41;
countryPanelToggle.adjustToCtxWidth();

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

//https://www.w3schools.com/charsets/ref_utf_basic_latin.asp
//https://stackoverflow.com/questions/13093126/insert-unicode-character-into-javascript
// � (U+00B0)   � (U+00B6)    ? (U+03B1)   ? (U+221A)
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
const scZhLow = String.fromCharCode(0x17E)
//----
const scCopyright = String.fromCharCode(0xA9)
const scDoubleQuote = String.fromCharCode(0x22)
const scSingleQuote = String.fromCharCode(0x27)

//---- 25.12.2022 na enem mestu zberem uporabljene fizične barve
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
    lf_changeTailMonths(gl_tailMonths, false);
    lf_setMode(cv_mode_vaccExcessDeath, false)
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
    lo_mouseDownX = e.offsetX;
    lo_mouseDownY = e.offsetY;
    lo_mouseDown = true
    //10.12.2022 v1.0.0.0 Ali hoče vleči celotno sliko enotskega kroga?
    lo_dragMonthEndActive = sliderMonthEnd.eventMouseWithin(e.offsetX, e.offsetY); //lo_mouseAboveSliderMonthEnd
    lo_dragTailMonthsActive = sliderTailMonths.eventMouseWithin(e.offsetX, e.offsetY); 
    //console.log("---------------------------------------------------------")
    //console.log("mousedown(): dragMonthEndActive=" + lo_dragMonthEndActive)

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
            lf_changeMode(true)
            vl_end = true
        }
    }
    if (!vl_end && lo_showGUI && lo_enabledIntChooserNrMonthsAvg) {
        rslt = intChooserNrMonthsAvg.eventClick(e.offsetX, e.offsetY)
        if (rslt >= 1 && rslt != lo_nrMonthsAvg) {
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
        rslt = sliderTailMonths.eventClick(e.offsetX, e.offsetY);
        if (rslt >= 0 && rslt != gl_tailMonths) {
            lf_changeTailMonths(rslt, true);
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
        rslt = countryPanelToggle.eventClick(e.offsetX, e.offsetY);
        if (rslt >= 1 && rslt <= cv_maxCountry) {
            lo_enabledCountry[rslt] = !lo_enabledCountry[rslt];
            paint()
            vl_end = true
        }
    }
    if (lo_dragIntervalIgnoreFirstClick) { lo_dragIntervalIgnoreFirstClick = false; } //4.2.2023 v1.12
});

elMyCanvas.addEventListener('dblclick', (e) => {

    let rslt, country
    let vl_end = false
    if (!vl_end && lo_showGUI) {
        rslt = countryPanelToggle.eventDblClick(e.offsetX, e.offsetY);
        if (rslt) {
            lf_changeEnableCountryAll(!lo_enabledCountryAll, true);
            vl_end = true
        }
    }

});

elMyCanvas.addEventListener('mousemove', (e) => {

    //console.log("mouse_move() enter")
    //console.log("mouseMove:mouseIn x=" + e.offsetX.toString() + " y=" + e.offsetY.toString())
    
    //if (lo_mouseOut) { console.log("mouseMove:mouseIn x=" + e.offsetX.) }
    lo_mouseOut = false; //29.7.2023

    // mouse cursors: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_cursor2

    let vl_oldFocusCountry = lo_focusCountry;
    lo_focusCountry = cv_countryNone;

    //Vlečenje okna / GUI elementov
    if (lo_mouseDown) {
        if (lo_dragMonthEndActive) {
            //console.log("mousemove(): drag interval:")
            sliderMonthEnd.setAddZone(100, 100)
            let rslt = sliderMonthEnd.eventMouseOverValue(e.offsetX, e.offsetY)
            sliderMonthEnd.setAddZone(0, 0)
            //console.log("  mousemove(): drag interval: overValue=" + rslt)
            if (rslt >= 0) { lf_dragInterval(rslt); }
            return;
        }
        else if (lo_dragTailMonthsActive) {
            sliderTailMonths.setAddZone(100, 100)
            let rslt = sliderTailMonths.eventClick(e.offsetX, e.offsetY)
            sliderTailMonths.setAddZone(0, 0)
            if (rslt >= 0) { lf_changeTailMonths(rslt, true); }
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
    if (buttonMode.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (intChooserNrMonthsAvg.eventMouseOverOption(e.offsetX, e.offsetY, false)) { document.body.style.cursor = "pointer" }
    else if (checkBoxNrMonthsAvgAll.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (buttonPlay.eventMouseWithin(e.offsetX, e.offsetY)) { document.body.style.cursor = "pointer" }
    else if (countryPanelToggle.eventMouseWithin(e.offsetX, e.offsetY)) {
        document.body.style.cursor = "pointer";
        let country = countryPanelToggle.eventMouseOverValue(e.offsetX, e.offsetY);
        lo_focusCountry = cv_countryNone;
        if (lf_regularCountry(country)) {
            if (lo_enabledCountry[country]) { lo_focusCountry = country; };
        } else {
            document.body.style.cursor = "default"
        }
    }
    else if (lf_mouseOverScatterPlotDataPoint(e.offsetX, e.offsetY)) { }
    else { document.body.style.cursor = "default"; };

    if (lo_focusCountry != vl_oldFocusCountry) {
        //console.log("focusCountry=" + lo_focusCountry);
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
    //---- če vrti kolešček miške ob pritisnjeni tipki T, s tem spreminja dolžino "repa"
    if (lo_keyDownA) {
        if (lo_enabledIntChooserNrMonthsAvg) {
            lo_nrMonthsAvg -= delta;
            if (lo_nrMonthsAvg > 5) { lo_nrMonthsAvg = 5 };
            if (lo_nrMonthsAvg < 1) { lo_nrMonthsAvg = 1 };
            lf_changeNrMonthsAvg(lo_nrMonthsAvg, true);
        }
        return
    } else if (lo_keyDownT) {
        if (sliderTailMonths.visible && sliderTailMonths.enabled) {
            gl_tailMonths -= delta;
            if (gl_tailMonths > (cv_nrMonths - 1)) { gl_tailMonths = (cv_nrMonths - 1) };
            if (gl_tailMonths < 0) { gl_tailMonths = 0 };
            lf_changeTailMonths(gl_tailMonths, true);
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
    //---- ... sicer spreminja (končni) mesec prikaza
    gl_monthEnd -= delta;
    if (gl_monthEnd > cv_nrMonths) { gl_monthEnd = cv_nrMonths };
    switch (gl_mode) {
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (gl_monthEnd < 1) { gl_monthEnd = 1 }; break;
        case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
            if (gl_monthEnd < gl_monthStart) { gl_monthEnd = gl_monthStart }; break;
    }
    lf_changeMonthEnd(gl_monthEnd, true);
});

window.addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'KeyA':
            lo_keyDownA = true; break;
        case 'KeyT':
            lo_keyDownT = true; break;
        case 'Digit0':
            lo_keyDown0 = true; break;
        case 'ArrowRight':
            lf_changeMonthEnd(lf_changeVar(gl_monthEnd, 1, 1, cv_nrMonths), true)
            break;
        case 'ArrowLeft':
            lf_changeMonthEnd(lf_changeVar(gl_monthEnd, -1, 1, cv_nrMonths), true)
            break;
        case 'Home':
            if (sliderMonthEnd.useValue0) { lf_changeMonthEnd(gl_monthStart, true) } else { lf_changeMonthEnd(1, true) }; break;
        case 'End':
            lf_changeMonthEnd(cv_nrMonths, true); break;
        case 'KeyH':
            lo_showGUI = !lo_showGUI; lo_GUIlayoutHasChanged = true; paint(); break;
        case 'KeyS':
            lf_changeNrMonthsAvgAll(!lo_nrMonthsAvgAll, true); break;
        case 'KeyC':
            lf_changeEnableCountryAll(!lo_enabledCountryAll, true); break;
        case 'KeyN': case 'F2':
            lf_changeShowHelpTips(!lo_showHelpTips, true); break;
        case 'KeyI':
            lf_changeShowToolTips(!lo_showToolTips, true); break;
        //case 'F5':
            //console.log("F5 pressed"); lf_changeAutoPlay(!lo_autoPlay); break;
        case 'KeyP' :
            //console.log("P pressed");
            lf_changeAutoPlay(!lo_autoPlay); break;
        case 'KeyM' :
            //console.log("M pressed"); 
            lf_changeMode(true); break;
        case 'KeyY' : case 'KeyZ' : //24.10.2023
            //console.log("Y pressed");
            lf_changeSameScaleY(!gl_sameScaleY, true); break;
        case 'KeyW' : //18.11.2023
            //console.log("W pressed");
            lf_resizeWindowToFullHD(true); break;
    }
});

window.addEventListener("keyup", (event) => {
    
    switch (event.code) {
        case 'KeyA':
            lo_keyDownA = false; break;
        case 'KeyT':
            lo_keyDownT = false; break;
        case 'Digit0':
            lo_keyDown0 = false; break;
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
    ctxH = window.innerHeight - 6;
    ctxMinDim = Math.min(ctxW, ctxH)
    elMyCanvas.width = ctxW     //da je na obeh straneh minimalen rob
    elMyCanvas.height = ctxH //da je na obeh straneh minimalen rob
    elMyCanvas.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
    elMyCanvas.style.left = "2px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
    elMyCanvas.style.top = "2px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS

    //countryPanelToggle.right = ctxW - pickCountryLeftDiff; // 27.1.2023 v1.4
    //countryPanelToggle.left = countryPanelToggle.right - 41;
    countryPanelToggle.adjustToCtxWidth();

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
    //paint_graph_timeExcessDeath(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_timeExcessDeath, cv_allCountry, 45); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
    
    //preštetje selektiranih držav
    lf_getNrSelectedCountries();

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
            paint_graph_timeExcessDeath(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_vaccExcessDeath, cv_allCountry, 45, false, 0, 0, 0); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
            break;
        case cv_mode_vaccExcessDeathMulti:
            if (lo_showGUI) { marginRight += 55; lo_graphMarginRight = marginRight; };
            paint_graph_timeExcessDeath_multi(marginLeft, marginTop, marginRight, marginBottom, cv_graphType_vaccExcessDeath); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris, pa tudi vir podatkov
            break;
        case cv_mode_timeExcessDeathSingle:
            paint_graph_timeExcessDeath(marginLeft, marginTop, ctxW - marginLeft - marginRight, ctxH - marginTop - marginBottom, cv_graphType_timeExcessDeath, cv_allCountry, 45, false, 0, 0, 0); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
            break;
        case cv_mode_timeExcessDeathMulti:
            if (lo_showGUI) { marginRight += 55; lo_graphMarginRight = marginRight; };
            paint_graph_timeExcessDeath_multi(marginLeft, marginTop, marginRight, marginBottom, cv_graphType_timeExcessDeath); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris, pa tudi vir podatkov
            break;
    }
    
    paint_GUI()
    paint_author();
    paint_version();

 
    //test_arcTo();
    //test_bezierCurveTo()
    //test_rotate();

    let myTime2 = Date.now()
    //console.log(myTime2-myTime1 + "ms")
    tmpStr = "izris: " + (myTime2-myTime1).toString() + " ms"
    gText(tmpStr, "italic 10pt sans serif", "gray", ctxW - 65, ctxH - 3)
    
}

function lf_mouseOverScatterPlotDataPoint(mouseX, mouseY) {

    lo_focusCountry = cv_countryNone;
    lo_focusMonth = 0;
    
    //---- mora biti raztreseni diagram vacc-excDeaths
    switch (gl_mode) {
        case cv_mode_timeExcessDeathMulti: case cv_mode_timeExcessDeathSingle: { return false; }
    }
    //---- miška mora biti znotraj področja grafa
    if (mouseX < lo_graphLeft || mouseX > lo_graphRight || mouseY < lo_graphTop || mouseY > lo_graphBottom) { return false };
    //--- gremo po državah in pogledamo, ali je miška blizu kakšnega dataPint-a
    let x, y, yValue, dx, dy, dist;
    let vl_startMonth = gl_monthEnd - gl_tailMonths;
    if (vl_startMonth < 1) { vl_startMonth = 1 };
    for (country = cv_minCountry; country <= cv_maxCountry; country++) {
        //---- država ne sme biti disabled
        if (!lo_enabledCountry[country]) { continue };
        if (country == cv_aut) {
            country = country;
        }
        //---- če v multi-country mode nisem z miško znotraj področja grafa tekoče države, ne smem nič skenirati
        if (gl_mode == cv_mode_vaccExcessDeathMulti) {
            if (mouseX < countryGraphLeft[country] || mouseX > countryGraphRight[country] || mouseY < countryGraphTop[country] || mouseY > countryGraphBottom[country]) {
                continue;
            }
        };
        //---- zdaj sledi skeniranje data point-s znotraj grafa tekoče države
        for (month = vl_startMonth; month <= gl_monthEnd; month++) {
            //---- izračun koordinat tekočega data point-a
            switch (gl_mode) {
                case cv_mode_vaccExcessDeathMulti:
                    x = countryGraphLeftData[country] + countryVaccByMonth[country][month - 1] * countryGraphKx[country];
                    yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg);
                    y = countryGraphBottomAxis[country] - yValue * countryGraphKy[country];
                    break;
                case cv_mode_vaccExcessDeath:
                    x = lo_graphLeftData + countryVaccByMonth[country][month - 1] * lo_graphKx;
                    yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg);
                    y = lo_graphBottomAxis - yValue * lo_graphKy;
                    break;
            }
            //---- koliko je točka data point-a (x,y) oddaljena od pozicije miške v oknu (mouseX,mouseY)?
            dx = x - mouseX;
            dy = y - mouseY; 
            dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= 5) {
                //našli smo data point, na katerega kaže miška
                lo_focusCountry = country;
                lo_focusMonth = month;
                return true;
            }
        }

    }
}

function lf_regularCountry(vp_country) {

    if (valueBetween(vp_country, cv_minCountry, cv_maxCountry)) { return true } else { return false };
}

function lf_regularMonth(vp_month) {

    if (valueBetween(vp_month, 1, cv_nrMonths)) { return true } else { return false };
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
        case cv_guiLayoutB:
            tmpStr = "Average: "
            tmpStr2 = lo_nrMonthsAvg.toString()
            if (lo_nrMonthsAvg == 1) { tmpStr2 = "none" }
            else { tmpStr2 += " months" }
            tmpStr += tmpStr2
    }
    intChooserNrMonthsAvg.text = tmpStr;
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
        case cv_guiLayoutB:
            tmpStr = "Tail months: " + gl_tailMonths.toString() + " months";
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
    gText("data: Eurostat (excess death), OWID (vaccination)", "italic 11pt serif", "maroon", x, y);

    if (!lo_showGUI) {
        //---- on-screen namigi/pomoč
        if (lo_showHelpTips) { paint_tips() };
        return
    };

    //---- mode button
    buttonMode.paint();
    
    //---- izbiranje števila mesecev za povprečenje   
    intChooserNrMonthsAvg.paint()
    //intChooserNrMonthsAvg2.paint()
    
    //---- check box za povprečenje čez vse mesece covid epidemije
    checkBoxNrMonthsAvgAll.paint();
    
    //---- za koliko časa nazaj se bo risal "rep"
    sliderTailMonths.paint();

    //---- izbira meseca za prikaz
    sliderMonthEnd.paint();

    //---- button play/stop
    buttonPlay.paint();
    
    //---- toggle za države (zahteval Žiga Vipotnik @ZVipotnik 25.1.2023)
    countryPanelToggle.paint();

    //28.6.2023 dodan izpis trenutnega mode
    tmpStr=gl_mode.toString()
    gBannerRoundRectWithText(buttonMode.left+buttonMode.width-15-(4-gl_mode)*13, buttonMode.top+buttonMode.height-1, 9, 9, "bold 10pt verdana", "darkSlateGray", tmpStr, 4, 4, 8, "white", 1, "lightGray", "lightGray", 2, 2, false)
    
    //---- on-screen namigi/pomoč
    if (lo_showHelpTips) { paint_tips() };

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
            gText("(C)", "italic 10pt serif", lo_tipsColor, ctxW - 20, pickCountryTop + cv_maxCountry * pickCountryHeight + 17);
            gText("(dblClick)", "italic 10pt serif", lo_tipsColor, ctxW - 56, pickCountryTop + cv_maxCountry * pickCountryHeight + 31);
            break;
        
        case cv_guiLayoutB:
            
            let x0 = 20; let x1 = x0 + 160;
            let y0 = 70; let vStep = 25; let y = y0 - vStep;
            let font = "normal 12pt serif";
            let font2 = "italic 12pt serif";
            let font3 = "bold 12pt serif";
            let nrTipRows = 14;
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
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
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
            gBannerRectWithText2("A", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change average period", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("S", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... all time average", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("T", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("+", x0 + 18, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("mouseWheel", x0 + 35, y, font, 4, 3, 2, 2, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... change tail months", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("Y", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... normalize Y scale", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("H", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... hide/show controls", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
            //
            y += vStep;
            gBannerRectWithText2("C", x0, y, font, 3, 3, 1, 1, "seaShell", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("/", x0 + 21, y + 1, font3, 0, 0, 0, 0, "", 0, "", lo_tipsColor, "", 0, 0);
            gBannerRectWithText2("dblClick", x0 + 35, y, font, 3, 3, 1, 1, "azure", 1, "darkSlateGray", "darkSlateGray", "lightGray", 2, 2);
            gBannerRectWithText2("... select/unselect all countries", x1, y, font2, 2, 2, 1, 1, "", 0, "", lo_tipsColor, "", 0, 0);
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

    const xAuthor = 200;
    guiPanelLeft = 8; guiPanelTop = 8; guiPanelWidth = ctxW - guiPanelLeft - xAuthor; guiPanelHeight = 50;
    if (guiPanelWidth < 300) { guiPanelWidth = 300 };
    lo_layout_marginTop = guiPanelTop + guiPanelHeight;
    if (!lo_showGUI) {
        switch (gl_mode) {
            case cv_mode_vaccExcessDeathMulti: case cv_mode_timeExcessDeathMulti:
                guiPanelHeight = 0;
                lo_layout_marginTop = guiPanelTop + guiPanelHeight;
                lo_currentMonthTextLeft = 10;
                lo_currentMonthTextTop = 11;
                return;
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
    checkBoxNrMonthsAvgAll.left = intChooserNrMonthsAvg.left + intChooserNrMonthsAvg.width + 10;
    checkBoxNrMonthsAvgAll.top = intChooserNrMonthsAvg.top - 3;
    checkBoxNrMonthsAvgAll.width = 18;
    //----
    let x1, x2, gap1, gap2, d1, d2, dHalf;
    const minTailWidth = 100; const maxTailWidth = 300;
    const minMonthEndWidth = 100; const maxMonthEndWidth = 500;
    switch (sliderTailMonths.visible) {
        case true:
            gap1 = 30; // od checkBox-a do prvega sliderja
            x1 = checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width + gap1;
            x2 = ctxW - xAuthor;
            d1 = x2 - x1;
            gap2 = 200; //med obema sliderjema
            dHalf = (d1 - gap2) / 2;
            //----
            sliderTailMonths.left = x1;
            sliderTailMonths.bodyMiddle = guiPanelTop + 22;
            if (dHalf > maxTailWidth) { sliderTailMonths.width = maxTailWidth; }
            else if (dHalf < minTailWidth) { sliderTailMonths.width = minTailWidth; }
            else { sliderTailMonths.width = dHalf; };
            //----
            sliderMonthEnd.left = sliderTailMonths.left + sliderTailMonths.width + gap2;
            sliderMonthEnd.bodyMiddle = sliderTailMonths.bodyMiddle;
            d2 = x2 - sliderTailMonths.left - sliderTailMonths.width - gap2;
            if (d2 > maxMonthEndWidth) { sliderMonthEnd.width = maxMonthEndWidth; }
            else if (d2 < minMonthEndWidth) { sliderMonthEnd.width = minMonthEndWidth; }
            else { sliderMonthEnd.width = d2; };
            //----
            //lo_currentMonthTextLeft = sliderTailMonths.left + sliderTailMonths.width + 50;
            lo_currentMonthTextLeft = sliderTailMonths.left + sliderTailMonths.width + 37; //zaradi buttonPlay
            lo_currentMonthTextTop = 17;
            break;
        case false:
            gap2 = 200; //prostor za izpis tekočega meseca
            x1 = checkBoxNrMonthsAvgAll.left + checkBoxNrMonthsAvgAll.width;
            //x2 = x1 + gap2;
            x2 = x1 + gap2 + 20;
            x3 = ctxW - xAuthor;
            //----
            lo_currentMonthTextLeft = x1 + 50;
            lo_currentMonthTextTop = 17;
            //----
            sliderMonthEnd.left = x2;
            sliderMonthEnd.bodyMiddle = sliderTailMonths.bodyMiddle;
            d2 = x3 - x2;
            if (d2 > maxMonthEndWidth) { sliderMonthEnd.width = maxMonthEndWidth; }
            else if (d2 < minMonthEndWidth) { sliderMonthEnd.width = minMonthEndWidth; }
            else { sliderMonthEnd.width = d2; };
            break;
    }
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
    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (lf_mesecName(mesec) + "/" + leto.toString())
}

function lf_monthStrMMYY(vp_month) {
    // format: "9/21"
    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (mesec.toString() + "/" + leto.toString().substring(2, 4))
}

function lf_monthStrMMMYY(vp_month) {
    // format: "sep/21"
    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (lf_mesecName(mesec) + "/" + leto.toString().substring(2, 4))
}

function lf_monthStrMMM(vp_month) {
    // format: "sep"
    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (lf_mesecName(mesec))
}

function lf_monthStrM(vp_month) {
    // format: "S"
    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (lf_mesecNameM(mesec))
}

function lf_monthValue(vp_month) {

    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (mesec)
}

function lf_yearValue(vp_month) {

    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return (leto)
}

function lf_yearStrShort(vp_month) {

    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    return ("'" + leto.toString().substring(2, 4));
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
            lo_nrMonthsAvg = cv_nrMonths;
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

function lf_changeEnableCountryAll(vp_newValue, vp_paint) {

    lo_enabledCountryAll = vp_newValue;
    let country;
    for (country = 1; country <= cv_maxCountry; country++) {
        lo_enabledCountry[country] = lo_enabledCountryAll;
    }
    if (vp_paint) { paint() }
}

function lf_changeShowHelpTips(vp_newValue, vp_paint) {

    lo_showHelpTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeShowToolTips(vp_newValue, vp_paint) {

    lo_showToolTips = vp_newValue;
    if (vp_paint) { paint() }
}

function lf_changeMode(vp_paint) {

    gl_mode += 1;
    if (gl_mode > cv_maxMode) { gl_mode = 1 };
    lf_setMode(gl_mode, vp_paint);
}

function lf_changeSameScaleY(vp_newValue, vp_paint) {
    //24.10.2023
    gl_sameScaleY = vp_newValue;
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
        case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
            if (gl_monthEnd < gl_monthStart) { //16.2.2023 v1.17
                gl_monthEnd = cv_nrMonths;
                sliderMonthEnd.value = gl_monthEnd;
            }
            sliderMonthEnd.useValue0 = true;
            sliderTailMonths.visible = false; break;
    }
    lf_setMonthIntervalText();
    lo_GUIlayoutHasChanged = true;
    if (vp_paint) { paint() }
}

function lf_changeNrMonthsAvg(vp_newValue, vp_paint) {

    //console.log("lf_changeNrMonthsAvg: newValue=" + vp_newValue)
    
    if (vp_newValue < 1 || vp_newValue > cv_nrMonths) { return };

    lo_nrMonthsAvg = vp_newValue;

    lf_setNrMonthsAvgText();
    intChooserNrMonthsAvg.value = lo_nrMonthsAvg;

    if (vp_paint) {
        //console.log("lf_changeNrMonthsAvg: call Paint() now ...")
        paint()
    }
}

function lf_changeTailMonths(vp_newValue, vp_paint) {

    //console.log("lf_changeTailMonths: newValue=" + vp_newValue)
    
    if (vp_newValue < 0 || vp_newValue >= cv_nrMonths) { return };

    gl_tailMonths = vp_newValue;

    lf_setTailMonthsText();
    sliderTailMonths.value = gl_tailMonths;
    
    if (vp_paint) {
        //console.log("lf_changeTailMonths: call Paint() now ...")
        paint()
    }
}

function lf_changeMonthEnd(vp_newValue, vp_paint) {

    //console.log("lf_changeMonthEnd: newValue=" + vp_newValue)
    
    //if (vp_newValue < 1 || vp_newValue > cv_nrMonths) { return };
    if (!valueBetween(vp_newValue, 1, cv_nrMonths)) { return };
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
    
    //if (vp_newValue < 1 || vp_newValue > cv_nrMonths) { return };
    //if (vp_newValue > gl_monthEnd) { return };
    if (!valueBetween(vp_newValue, 1, gl_monthEnd)) { return };
    
    gl_monthStart = vp_newValue;

    lf_setMonthStartText();
    sliderMonthEnd.value0 = gl_monthStart;
    //console.log("lf_changeMonthStart(): sliderMonthEnd.value0=" + gl_monthStart);

    if (vp_paint) {
        //console.log("lf_changeMonthStart: call Paint() now ...")
        paint()
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
            if (gl_monthEnd == cv_nrMonths) {
                switch (gl_mode) {
                    case cv_mode_timeExcessDeathMulti: case cv_mode_timeExcessDeathSingle: gl_monthEnd = gl_monthStart; break;
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
        if (gl_monthEnd >= cv_nrMonths) {
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
            if (gl_monthEnd >= cv_nrMonths) {
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

function lf_getNrSelectedCountries() {

    nrSelectedCountries = 0;
    for (let country = 1; country <= cv_maxCountry; country++) {
        if (lo_enabledCountry[country]) { nrSelectedCountries += 1 };
    }
}

function paint_graph_timeExcessDeath_multi(marginLeft, marginTop, marginRight, marginBottom, vp_graphType) {

    let rows, cols, row, col, x, y, itemWidth, itemHeight, country, ih, iw, k;
    let fx, fy, fiw, fih, haveFocusCountry;
    let vGap = 10; let hGap = 10;
    //---- kakšna država mora biti selektirana
    if (nrSelectedCountries <= 0) { return };
    //---- dimenzije matrike
    cols = Math.trunc(Math.sqrt(nrSelectedCountries - 1)) + 1;
    let ratio = ctxW / (ctxH + 1);
    if (ratio > 1.7) { cols += 1 }; if (ratio > 2.5) { cols += 1 }; if (ratio > 3.3) { cols += 1 }; if (ratio > 5) { cols += 1 };
    if (cols > nrSelectedCountries) { cols = nrSelectedCountries };
    rows = Math.trunc((nrSelectedCountries - 1) / cols) + 1;
    //----
    itemWidth = (ctxW - marginLeft - marginRight - (cols - 1) * hGap) / cols;
    itemHeight = (ctxH - marginTop - marginBottom - (rows - 1) * vGap) / rows;
    //---- pregled Y vrednosti presežne smrtnosti in določanje ky
    let vl_minY, vl_maxY, vl_dataRange;
    let vl_forceDataRangeY = false;
    if (gl_sameScaleY && vp_graphType==cv_graphType_timeExcessDeath) { //24.10.2023 normalizacija po Y v Mode=4       
        ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(cv_allCountry, gl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
        vl_forceDataRangeY = true;
    }
    //----
    col = 1; row = 1;
    k = 0.15; //30.7.2023 v1.31
    haveFocusCountry = false;
    for (country = 1; country <= cv_maxCountry; country++) {
        if (!lo_enabledCountry[country]) { continue };
        ;[x, y, iw, ih] = paint_graph_timeExcessDeath_multi_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, country, row, col, itemWidth, itemHeight, k)
        //30.7.2023 državo v fokusu preskočim in jo izrišem na koncu po zanki držav
        if (country == lo_focusCountry) {
            ;[fx, fy, fiw, fih] = [x, y, iw, ih];
            haveFocusCountry = true;
        } else {
            paint_graph_timeExcessDeath_multi_drawSingleCountry(country, x, y, iw, ih, vp_graphType, vl_forceDataRangeY, vl_minY, vl_maxY, vl_dataRange)
        }
        col += 1;
        if (col > cols) { col = 1; row += 1 };
    }
    //30.7.2023 po potrebi izrišem še državo v fokusu
    if (haveFocusCountry) {
        paint_graph_timeExcessDeath_multi_drawSingleCountry(lo_focusCountry, fx, fy, fiw, fih, vp_graphType, vl_forceDataRangeY, vl_minY, vl_maxY, vl_dataRange)
    }
}

function paint_graph_timeExcessDeath_multi_setPosition(marginLeft, marginTop, marginRight, marginBottom, hGap, vGap, rows, cols, country, row, col, itemWidth, itemHeight, k) {

    let x, y, iw, ih, newY, yDiff, x0, y0;
 
    x = marginLeft + (col - 1) * (hGap + itemWidth);
    y = marginTop + (row - 1) * (vGap + itemHeight);
    iw = itemWidth; ih = itemHeight;
        
    //30.7.2023 državo v fokusu izrišem nekoliko večjo
    if (cols > 1 && rows > 1) {
        if (country == lo_focusCountry) {
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

function paint_graph_timeExcessDeath_multi_drawSingleCountry(country, x, y, iw, ih, vp_graphType, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange) {
    //24.10.2023 uvedeni vhodni parametri vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange
    gLine(x + 1, y + 2, x + iw - 1, y + 2, 2, "white", []);
    gLine(x + 2, y + 1, x + 2, y + ih - 2, 2, "white", []);
    gLine(x + 1, y + ih + 2, x + iw + 1, y + ih + 2, 2, "white", []);
    gLine(x + iw + 2, y + 1, x + iw + 2, y + ih + 1, 2, "white", []);
    ctx.beginPath(); ctx.rect(x, y, iw, ih); ctx.closePath();
    ctx.fillStyle = "#FBFBFBFF";
    if (country == lo_focusCountry) { ctx.fillStyle = "floralWhite"; };
    ctx.fill();
    ctx.setLineDash([]); ctx.strokeStyle = "lightGray"; ctx.strokeWidth = 1; ctx.stroke();
    //paint_graph_timeExcessDeath(x, y, iw, ih, cv_graphType_timeExcessDeath, country, 2);
    paint_graph_timeExcessDeath(x, y, iw, ih, vp_graphType, country, 2, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange);
    
}

function paint_graph_timeExcessDeath(vp_left, vp_top, vp_width, vp_height, vp_graphType, vp_country, vp_marginRight, vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange) {
    //24.10.2023 uvedeni vhodni parametri vp_forceDataRangeY, vp_minY, vp_maxY, vp_dataRange
    
    let country, yValue;
    //
    let cv_graphMarginLeft, cv_graphMarginRight, cv_graphMarginTop, cv_graphMarginBottom;
    let cv_graphGapLeft, cv_graphGapRight, cv_graphGapTop, cv_graphGapBottom;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath:
            cv_graphMarginLeft = 20; cv_graphMarginRight = vp_marginRight; cv_graphMarginTop = 20; cv_graphMarginBottom = 16;
            cv_graphGapLeft = 0; cv_graphGapRight = 5; cv_graphGapTop = 5; cv_graphGapBottom = 0;
            break;
        case cv_graphType_timeExcessDeath:
            cv_graphMarginLeft = 20; cv_graphMarginRight = vp_marginRight; cv_graphMarginTop = 20; cv_graphMarginBottom = 16;
            cv_graphGapLeft = 14; cv_graphGapRight = 70; cv_graphGapTop = 5; cv_graphGapBottom = 0;
            if (vp_country != cv_allCountry) { cv_graphGapRight = 20 };
            break;
    }
    const cv_graphLeft = vp_left + cv_graphMarginLeft //X koordinata Y osi oziroma začetka X osi
    const cv_graphRight = vp_left + vp_width - vp_marginRight //X koordinata konca X osi
    const cv_graphLeftData = cv_graphLeft + cv_graphGapLeft //X koordinata začetka področja podatkov
    const cv_graphRightData = cv_graphRight - cv_graphGapRight //X koordinata konca področja podatkov
    const cv_graphRangeX = cv_graphRightData - cv_graphLeftData //X koordinata konca področja podatkov
    //----
    const cv_graphTopAxis = vp_top + cv_graphMarginTop //Y koordinata vrha Y osi
    const cv_graphTopData = cv_graphTopAxis + cv_graphGapTop //Y koordinata vrha območja podatkov
    const cv_graphBottom = vp_top + vp_height - cv_graphMarginBottom //Y koordinata dna grafa
    const cv_graphRangeY = cv_graphBottom - cv_graphTopData //X koordinata konca področja podatkov
    
    //---- določanje začetnega meseca
    let vl_monthStart
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath: vl_monthStart = gl_monthEnd - gl_tailMonths; break;
        //case cv_graphType_timeExcessDeath: vl_monthStart = 1; break;
        case cv_graphType_timeExcessDeath: vl_monthStart = gl_monthStart; break;
    }
    let vl_nrMonths = gl_monthEnd - vl_monthStart + 1;
    let kx;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath:
            kx = cv_graphRangeX / 100; break; // največ je 100% vaccinated
        case cv_graphType_timeExcessDeath:
            switch (vl_nrMonths - 1) {
                case 0: kx = 100; break; //raje nisem dal 0, ker bi bil potem problem pri označevanju pozicije miške na X osi!
                default: kx = cv_graphRangeX / (vl_nrMonths - 1); break;
            }
    }
    //---- pregled Y vrednosti presežne smrtnosti in določanje ky
    let vl_minY, vl_maxY, vl_dataRange;
    switch (vp_forceDataRangeY) { //24.10.2023 je Y range že vnaprej določen za vse države enako?
        case false:
            ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(vp_country, vl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
            break;
        default:
            vl_minY = vp_minY; vl_maxY = vp_maxY; vl_dataRange = vp_dataRange;
            break;
    }
    const ky = cv_graphRangeY / vl_dataRange
    
    //---- Y koordinata vodoravne X osi
    let cv_graphY0 = cv_graphBottom // Y koordinata X osi
    if (vl_minY<0) {cv_graphY0=cv_graphBottom-ky*Math.abs(vl_minY)}

    //---- risanje koordinatnih osi
    gLine(cv_graphLeft, cv_graphBottom, cv_graphLeft, cv_graphTopAxis, 2, "gray", [])
    gLine(cv_graphLeft, cv_graphY0, cv_graphRight, cv_graphY0, 2, "gray", [])
    
    //---- nastavitev globalnih spremenljivk za pozicije in dimenzije multi-country ter all-country grafov
    switch (vp_country) {
        case cv_allCountry:
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
            countryGraphLeft[vp_country] = vp_left;
            countryGraphLeftAxis[vp_country] = cv_graphLeft;
            countryGraphLeftData[vp_country] = cv_graphLeftData;
            countryGraphRightData[vp_country] = cv_graphRightData;
            countryGraphRight[vp_country] = cv_graphRight;
            countryGraphKx[vp_country] = kx;
            countryGraphTop[vp_country] = vp_top;
            countryGraphTopData[vp_country] = cv_graphTopData;
            countryGraphBottomAxis[vp_country] = cv_graphY0;
            countryGraphBottom[vp_country] = cv_graphBottom;
            countryGraphKy[vp_country] = ky;
            countryGraphWidth[vp_country] = vp_width;
            countryGraphHeight[vp_country] = vp_height;
            break;
    }
    //---- oznake na Y osi
    gText("Excess death [%]", "bold italic 11pt cambria", "darkSlateGray", cv_graphLeft - 17, cv_graphTopAxis - 6);
    let x, y, font, tmpW, tmpH
    let tmpExcessDeath, tmpExcessDeathAbs
    let yMark10 = true; let yMark5 = true; let yMark1 = true;
    if (vl_dataRange > 30) { yMark1 = false }
    if (vl_dataRange > 100) { yMark5 = false }
    font = "italic 9pt cambria";
    for (tmpExcessDeath = -150; tmpExcessDeath <= 150; tmpExcessDeath++) {
        if (tmpExcessDeath == 0) {
            tmpStr = tmpExcessDeath.toString(); 
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            x = cv_graphLeft - tmpW - 4
            y = cv_graphY0
            gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            continue
        }
        tmpExcessDeathAbs = Math.abs(tmpExcessDeath)
        //---- gosta temnejša linija na vsakih 10% presežne smrtnosti
        if (yMark10 && (Math.abs(tmpExcessDeathAbs - 10 * Math.trunc(tmpExcessDeathAbs / 10)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpExcessDeath
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 2])
                tmpStr = tmpExcessDeath.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        //---- srednje gosta srednje temna linija na vsakih 5% presežne smrtnosti
        if (yMark5 && (Math.abs(tmpExcessDeathAbs - 5 * Math.trunc(tmpExcessDeathAbs / 5)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpExcessDeath
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 5])
                tmpStr = tmpExcessDeath.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "darkGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        //---- redka svetlejša linija na vsakih 1% presežne smrtnosti
        if (yMark1 && ky > 12) {
            y = cv_graphY0 - ky * tmpExcessDeath
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "silver", [2, 10])
            }
        }
    }
    
    //---- oznake na X osi
    let tmpVacc, tmpMonth, vl_xOld, vl_yOld;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath:
            switch (vp_country) {
                case cv_allCountry:
                    font = "bold italic 11pt cambria";
                    tmpStr = "Vaccinated [%]";
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    x = cv_graphRight - tmpW + 10;
                    y = cv_graphY0 + 15;
                    break;
                default:
                    font = "bold italic 10pt cambria";
                    tmpStr = "V";
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    x = cv_graphRight - tmpW - 2;
                    y = cv_graphY0 + 13;
                    break;
            }
            gText(tmpStr, font, "darkSlateGray", x, y);
            font = "italic 9pt cambria";
            for (tmpVacc = 10; tmpVacc <= 100; tmpVacc += 10) {
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
            break;
        case cv_graphType_timeExcessDeath:
            //---- oznake mesecev
            font = "normal 9pt cambria";
            vl_xOld = 0;
            let singleYear = false;
            if (lf_yearValue(vl_monthStart) == lf_yearValue(gl_monthEnd)) { singleYear = true };
            for (tmpMonth = vl_monthStart; tmpMonth <= gl_monthEnd; tmpMonth++) {
                x = cv_graphLeftData + kx * (tmpMonth - vl_monthStart);
                if (x >= cv_graphLeftData && x <= cv_graphRightData) {
                    gLine(x, cv_graphY0 - 2, x, cv_graphY0 + 2, 1, "darkSlateGray", [])
                    tmpStr = ""
                    if (kx < 4) {
                        if (lf_monthValue(tmpMonth) == 1 && tmpMonth != vl_monthStart) {
                            tmpStr = lf_yearStrShort(tmpMonth);
                            x -= (x - vl_xOld) / 2;
                            gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "darkGray", []);
                            x += 8;
                        };
                    }
                    else if (kx < 17) {
                        if (lf_monthValue(tmpMonth) == 1 && tmpMonth != vl_monthStart) {
                            tmpStr = lf_yearValue(tmpMonth);
                            x -= (x - vl_xOld) / 2;
                            gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "darkGray", []);
                            x += 15;
                        } else {
                            if (singleYear && kx > 6) { tmpStr = lf_monthStrM(tmpMonth); }
                        }
                    }
                    else if (kx < 25) { tmpStr = tmpMonth.toString(); }
                    else if (kx < 37) { tmpStr = lf_monthStrMMM(tmpMonth); }
                    else if (kx < 60) { tmpStr = lf_monthStrMMYY(tmpMonth); }
                    else { tmpStr = lf_monthStrMY(tmpMonth); }
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    gText(tmpStr, font, "dimGray", x - tmpW / 2, cv_graphY0 + 13);
                }
                vl_xOld = x;
            }
            //---- oznaka osi
            font = "bold italic 11pt cambria";
            switch (vp_country) {
                case cv_allCountry:
                    tmpStr = "Time";
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    x = cv_graphRight - tmpW + 10
                    y = cv_graphY0 + 15;
                    break;
                default:
                    tmpStr = "t";
                    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                    x = cv_graphRight - tmpW - 2;
                    y = cv_graphY0 + 14;
                    break;
            }
            ctx.beginPath; ctx.rect(x - 1, y - tmpH - 1, tmpW + 2, tmpH + 2); ctx.closePath; ctx.fillStyle = bckgColor; ctx.fill();
            gText(tmpStr, font, "darkSlateGray", x, y);
    }

    //---- risanje backround tullTip krogcev in vertikalne linije zanje
    paint_graph_timeExcessDeath_tipBeforeGraph(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky, cv_graphLeft, cv_graphRight, cv_graphTopData, cv_graphBottom);

    //---- risanje korelacijske linije precepljenost/excessDeaths
    if (vp_graphType == cv_graphType_vaccExcessDeath) {
        paint_graph_vaccExcessDeath_corelationLine(gl_monthEnd, lo_nrMonthsAvg, kx, ky, cv_graphLeftData, cv_graphY0, cv_graphTopData, cv_graphBottom, vp_country)
    }

    //---- risanje diagrama    
    let xValue, xValue0, monthIndex;
    let dataLineColor, dataPointColor, countryNameColor, dataLineWidth;
    switch (vp_graphType) {
        case cv_graphType_vaccExcessDeath: xValue0 = 0; break;
        case cv_graphType_timeExcessDeath: xValue0 = vl_monthStart; break;
    }
    font = "bold 10pt verdana"
    let kk = 0;
    if (gl_monthEnd > 26) {
        kk = 2; if (gl_tailMonths > 10) { kk = 1 }; if (gl_tailMonths > 20) { kk = 0 }
    }
    kk = 0;

    //---- debelina markerja je odvisna od gostote izpisa
    let countryStart, countryEnd;
    let dataPointRadij = 3;
    switch (vp_country) {
        case cv_allCountry:
            countryStart = 1; countryEnd = cv_maxCountry; break;
        default:
            countryStart = vp_country; countryEnd = vp_country;
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    if (kx < 1.3) { dataPointRadij=1 }
                    else if (kx < 2.6) { dataPointRadij = 2 };
                    break;
                case cv_graphType_timeExcessDeath:
                    if (kx < 4) { dataPointRadij=1 }
                    else if (kx < 7) { dataPointRadij = 2 };
                    break;
            }
            break;
    }
    let vl_focus, vl_disabled;
    //---- risanje grafov po vrsti za vsako državo
    for (countryLoopIndex = countryStart; countryLoopIndex <= countryEnd; countryLoopIndex++) {
        
        country = countryLoopIndex;
        //13.2.2023 v1.14
        vl_focus = false; vl_disabled = false;
        if (lf_regularCountry(lo_focusCountry)) {
            if (country == lo_focusCountry) { vl_focus = true }
            else { vl_disabled = true };
        }
        //17.5.2023 v1.22 državo, ki je v fokusu (miška nad državo v legendi držav) izrišem zadnjo, da je risana čez sive črte drugih držav in jo te ne prekrivajo
        switch (vp_country) {
            case cv_allCountry:
                switch (vl_focus) { 
                    case true: //smo na državi s fokusom
                        //če država s fokusom ni zadnja država, potem najprej prikažem naslednjo državo in to kot disabled
                        if (countryLoopIndex < countryEnd) {
                            vl_focus = false; vl_disabled = true;  //false;
                            country = countryLoopIndex + 1;
                        }
                        break;
                    default: //nismo na državi s fokusom
                        //če ena država ima fokus, in je ta država že pred trenutno državo, potem je treba prikazati naslednjo državo, razen če je to zadnja država v zanki (takrat je treba prikazati državo s fokusom)
                        switch (lf_regularCountry(lo_focusCountry)) { 
                            case true: //na eni drugi državi je trenutno fokus
                                if (countryLoopIndex == countryEnd) {
                                    //ena država ima fokus, mi pa smo sedaj na zadnji državi v zanki, zato je zdaj čas, da se nariše še državo v fokusu, ki bo tako narisana čez vse
                                    vl_focus = true; vl_disabled = false;
                                    country = lo_focusCountry;
                                } else if (countryLoopIndex > lo_focusCountry) {
                                    //ena država ima fokus, mi pa smo sedaj za njo, kar pomeni, da moramo risati eno naprej in to v disabled načinu 
                                    vl_focus = false; vl_disabled = true;
                                    country = countryLoopIndex + 1;
                                }
                                break;
                            default: //nobena država nima fokusa
                                //normalno rišemo tekočo državo
                                break;
                        }
                        break;
                }
                break;
            default:
                break;
        }
        //---- če je prikaz države izključen, potem to državo preskočim (25.1.2023 v1.1)
        if (!lo_enabledCountry[country]) { continue };
        //
        //if (country == cv_fin) {
        //    country = country
        //};
        countryNameColor = countryColor[country];
        dataLineWidth = 1;
        switch (vp_graphType) {
            case cv_graphType_vaccExcessDeath:
                switch (vp_country) {
                    case cv_allCountry: dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(80, countryColor[country]); break;
                    default: dataLineColor = countryColor[country]; dataPointColor = countryColor[country]; break;
                }
                break;
            case cv_graphType_timeExcessDeath:
                dataLineColor = countryColor[country]; dataPointColor = countryColor[country]; break;
                //24.7.2023 tole spodaj sem raje spet ukinil, ker je delalo narobe
                //switch (vp_country) {
                //    case cv_allCountry: dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(80, countryColor[country]); break;
                //    default: dataLineColor = countryColor[country]; dataPointColor = countryColor[country]; break;
                //}
                //break;            
        }
        if (vl_focus) { dataLineColor = countryColor[country]; dataPointColor = countryColor[country]; dataLineWidth = 2;};
        //if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = "lightGray"; countryNameColor = "lightGray"; };
        if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = gf_alphaColor(35, countryColor[country]); countryNameColor = "lightGray";};
        //console.log("countryNameColor=" + countryNameColor);
        //---- najprej za linije med krogci točk
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart + 1
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath: xValue = countryVaccByMonth[country][month - 1]; break;
                case cv_graphType_timeExcessDeath: xValue = month; break;
            }
            x = cv_graphLeftData + kx * (xValue - xValue0);
            yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    kk = 0; if (month > 26) { kk = 2; if (gl_tailMonths > 10) { kk = 1 }; } // if (gl_tailMonths > 20) { kk = 0 }
                    kk = 0;
                    x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
                    break;
            }
            if (monthIndex > 1) {
                //gLine(vl_xOld, vl_yOld, x, y, 1, dataLineColor, []);
                gLine(vl_xOld, vl_yOld, x, y, dataLineWidth, dataLineColor, []);
            }
            vl_xOld = x; vl_yOld = y
        }
        //---- zdaj pa še za krogce točk, zato da so ti risani preko linij
        ctx.setLineDash([]);
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart +1
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath: xValue = countryVaccByMonth[country][month - 1]; break;
                case cv_graphType_timeExcessDeath: xValue = month; break;
            }
            x = cv_graphLeftData + kx * (xValue - xValue0);
            yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            switch (vp_graphType) {
                case cv_graphType_vaccExcessDeath:
                    kk = 0; if (month > 26) { kk = 2; if (gl_tailMonths > 10) { kk = 1 }; } // if (gl_tailMonths > 20) { kk = 0 }
                    kk = 0;
                    x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
                    break;
            }
            if (month == gl_monthEnd) {
                switch (vp_graphType) {
                    case cv_graphType_vaccExcessDeath: gEllipse(x, y, 5, 5, 0, countryNameColor, 1, "dimGray"); break;
                    case cv_graphType_timeExcessDeath: gEllipse(x, y, dataPointRadij, dataPointRadij, 0, dataPointColor, 0, ""); break;
                }
            } else {
                gEllipse(x, y, dataPointRadij, dataPointRadij, 0, dataPointColor, 0, "");
            }
            vl_xOld = x; vl_yOld = y
        }
    }
    //---- zdaj pa še za oznake držav, zato da so te v vsakem primeru preko krogcev točk in linij med krogci (ta problem je sicer le pri VACC-ExcessDeath diagramu)
    for (countryLoopIndex = countryStart; countryLoopIndex <= countryEnd; countryLoopIndex++) {
        country = countryLoopIndex;
        //13.2.2023 v1.14
        vl_focus = false; vl_disabled = false;
        if (lf_regularCountry(lo_focusCountry)) {
            if (country == lo_focusCountry) { vl_focus = true }
            else { vl_disabled = true };
        }
        //17.5.2023 v1.22 državo, ki je v fokusu (miška nad državo v legendi držav) izrišem zadnjo, da je risana čez sive črte drugih držav in jo te ne prekrivajo
        //srednji pogoj spodaj dodal 24.7.2023, da naslednje države od fokusirane ne izpiše z neko srednje močno barvo
        switch (vp_country) {
            case cv_allCountry:
                if (vl_focus && countryLoopIndex < countryEnd) {
                    vl_focus = false; vl_disabled = true;
                    country = countryLoopIndex + 1;
                } else if (!vl_focus && lf_regularCountry(lo_focusCountry) && countryLoopIndex > lo_focusCountry && countryLoopIndex < countryEnd) {
                    vl_focus = false; vl_disabled = true;
                    country = countryLoopIndex + 1;
                } else if (!vl_focus && lf_regularCountry(lo_focusCountry) && countryLoopIndex == countryEnd) {
                    vl_focus = true; vl_disabled = false;
                    country = lo_focusCountry;
                }
                break;
            default:
                break;
        }
        //---- če je prikaz države izključen, potem to državo preskočim (25.1.2023 v1.1)
        if (!lo_enabledCountry[country]) { continue };
        month = gl_monthEnd
        monthIndex = month - vl_monthStart + 1
        switch (vp_graphType) {
            case cv_graphType_vaccExcessDeath: xValue = countryVaccByMonth[country][month - 1]; break;
            case cv_graphType_timeExcessDeath: xValue = month; break;
        }
        x = cv_graphLeftData + kx * (xValue - xValue0);
        yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
        y = cv_graphY0 - ky * yValue
        //switch (vp_graphType) {
        //    case cv_graphType_vaccExcessDeath: x = x - kk * (vl_nrMonths / 2 - monthIndex + 1); break;
        //}
        
        //
        //if (country == cv_fin) {
        //    country = country
        //};
        countryNameColor = countryColor[country];
        //if (vl_focus) { dataLineColor = countryColor[country]; dataPointColor = countryColor[country]; };
        //if (vl_disabled) { dataLineColor = "lightGray"; dataPointColor = "lightGray"; countryNameColor = "lightGray" };
        if (vl_disabled) { countryNameColor = "lightGray" };
        //console.log("countryNameColor=" + countryNameColor);
        switch (vp_graphType) {
            case cv_graphType_vaccExcessDeath:
                kk = 0;
                x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
                switch (vp_country) {
                    case cv_allCountry:
                        tmpStr = countryNameShort3[country];
                        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                        //gBannerRectWithText(x + 10, y - 8, x + tmpW + 9, y + 4, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], tmpStr, "lightGray", 2, 2)
                        gBannerRectWithText(x + 10, y - 8, x + tmpW + 9, y + 4, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryNameColor, tmpStr, "lightGray", 2, 2)
                        break;
                    default:
                        tmpStr = countryNameLong[country];
                        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                        //gBannerRectWithText(x + 10, y - 8, x + tmpW + 9, y + 4, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], tmpStr, "lightGray", 2, 2)
                        //gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], tmpStr, "lightGray", 2, 2);
                        gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryNameColor, tmpStr, "lightGray", 2, 2);
                        break;
                }
                break;
            case cv_graphType_timeExcessDeath:
                //tmpStr = countryNameShort3[country];
                tmpStr = countryNameLong[country];
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                //gBannerRectWithText(x + 10, y - 8, x + tmpW + 9, y + 4, 3, 3, "", 1, "lightGray", "bold 10pt verdana", countryColor[country], tmpStr, "lightGray", 2, 2)
                switch (vp_country) {
                    case cv_allCountry:
                        //gText(tmpStr, "normal 9pt verdana", countryColor[country], x + 8, y + 3);
                        gText(tmpStr, "normal 9pt verdana", countryNameColor, x + 8, y + 3);
                        break;
                    default:
                        //gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], tmpStr, "lightGray", 2, 2);
                        gBannerRectWithText(vp_left + vp_width - 6 - tmpW, vp_top + 5, vp_left + vp_width - 6, vp_top + 15, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryNameColor, tmpStr, "lightGray", 2, 2);
                        break;
                }
                break;
        }
        vl_xOld = x; vl_yOld = y 
    }

    //---- foreground toolTip krogci
    paint_graph_timeExcessDeath_tipAfterGraph(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);

    //Izpis tekočega meseca
    tmpStr = lf_monthStrMY(gl_monthEnd);
    font = "bold 14pt verdana";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    //let tmpLeft = 400; let tmpTop = 20;
    //gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
    //gBannerRectWithText(lo_currentMonthTextLeft+400, lo_currentMonthTextTop, lo_currentMonthTextLeft + tmpW, lo_currentMonthTextTop + tmpH, 6, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)

    lo_radialGradientFill = true;
    rgfc1x = lo_currentMonthTextLeft + 0.7 * tmpW; rgfc1y = lo_currentMonthTextTop + 0.3 * tmpH; rgfc1r = 0.5 * tmpH;
    rgfc2x = lo_currentMonthTextLeft + 0.3 * tmpW; rgfc2y = lo_currentMonthTextTop + 0.7 * tmpH; rgfc2r = Math.max(tmpW, tmpH);
    rgfcs1 = 0; rgfc1 = "greenYellow";
    rgfcs2 = 0.6; rgfc2 = "gold";
    rgfcs3 = 1; rgfc3 = "azure";
    gBannerRoundRectWithText(lo_currentMonthTextLeft, lo_currentMonthTextTop, tmpW, tmpH, font, "darkSlateGray", tmpStr, 8, 9, 15, "azure", 1, "lightGray", "lightGray", 3, 3, false)

    //oznake koordinat miške
    font = "italic 9pt cambria";
    let tmpValue;
    //if (lo_mouseMoveX > 1.005 * cv_graphLeftData && lo_mouseMoveX < 0.995 * cv_graphRightData) {
    if (!lo_mouseOut && lo_mouseMoveX > 1.005 * cv_graphLeftData && lo_mouseMoveX < 0.995 * cv_graphRightData && lo_mouseMoveY > 1.005 * cv_graphTopData && lo_mouseMoveY < 0.995 * cv_graphBottom) {
        gLine(lo_mouseMoveX, cv_graphY0 - 30, lo_mouseMoveX, cv_graphY0 + 10, 1, "gray", [2, 2]);
        tmpValue = xValue0 + (lo_mouseMoveX - cv_graphLeftData) / kx;
        switch (vp_graphType) {
            case cv_graphType_vaccExcessDeath: tmpStr = tmpValue.toFixed(2) + "%"; break;
            case cv_graphType_timeExcessDeath: tmpStr = tmpValue.toFixed(2); break;
        }
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", lo_mouseMoveX + 2, cv_graphY0 - 4);
        //if (lo_mouseMoveY > 1.005 * cv_graphTopData && lo_mouseMoveY < 0.995 * cv_graphBottom && ky != 0) {
        if (ky != 0) {
            gLine(cv_graphLeft - 10, lo_mouseMoveY, cv_graphLeft + 40, lo_mouseMoveY, 1, "gray", [2, 2]);
            tmpExcessDeath = (cv_graphY0 - lo_mouseMoveY) / ky;
            tmpStr = tmpExcessDeath.toFixed(1) + "%";
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            gText(tmpStr, font, "dimGray", cv_graphLeft + 3, lo_mouseMoveY - 3);
        }
    }

    //---- risanje toolTip okvirja in vsebine
    paint_graph_timeExcessDeath_tipContent(vp_country, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);

}

function paint_graph_timeExcessDeath_tipContent(vp_country, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    //prikaz tipsov glede na vrsto grafa
    switch (gl_mode) {
        case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
            paint_graph_timeExcessDeath_tipContent_timeExcessDeath(vp_country, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);
            break;
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (lf_regularCountry(lo_focusCountry) && lf_regularMonth(lo_focusMonth)) {
                if (gl_mode == cv_mode_vaccExcessDeath || (gl_mode == cv_mode_vaccExcessDeathMulti && vp_country == lo_focusCountry)) {
                    paint_graph_timeExcessDeath_tipContent_vaccExcessDeath(lo_focusCountry, lo_focusMonth, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom);    
                }
            }
            break;
    }
}

function paint_graph_timeExcessDeath_tipContent_vaccExcessDeath(vp_country, vp_month, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {
    
    if (!lo_enabledCountry[vp_country]) { return };

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
    let tmpStr, tmpW, tmpH, font, x, y, country;
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
    gText(countryVaccByMonth[vp_country][vp_month - 1].toFixed(1) + "%", font, "darkSlateGray", cv_xDvopicje + cv_gapRight, y);
    //----
    y += cv_heightSingle;
    tmpStr = "excess death";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = cv_xDvopicje - cv_gapLeft - tmpW;
    gText(tmpStr, font, "darkSlateGray", x, y);
    gText(":", font, "darkSlateGray", cv_xDvopicje, y);
    gText(lf_getAvgValue(vp_country, vp_month, lo_nrMonthsAvg).toFixed(1)+"%", font, "darkSlateGray", cv_xDvopicje + cv_gapRight, y);
}

function paint_graph_timeExcessDeath_tipContent_timeExcessDeath(vp_country, vp_left, vp_top, cv_graphLeft, cv_graphRight, cv_graphBottom) {
    
    //miška mora biti nad tekočim grafom
    if (lo_tipMonth <= 0) { return };
    
    const basicFrameWidth = 170;
    let frameWidth = basicFrameWidth;
    const cv_heightMonth = 30;
    const cv_heightSingle = 16;
    let cv_heightBody;
    //prilagoditev širine in višine toolTip okvirja
    switch (vp_country) {
        case cv_allCountry:
            if (!lo_enabledCountry[cv_eu27]) {
                frameWidth = basicFrameWidth - 20;
                if (!lo_enabledCountry[cv_lie] && !lo_enabledCountry[cv_lux] && !lo_enabledCountry[cv_ned] && !lo_enabledCountry[cv_swi]) {
                    frameWidth = basicFrameWidth - 45;
                };
            };
            cv_heightBody = nrSelectedCountries * cv_heightSingle
            break;
        default:
            if (vp_country!=cv_eu27) {
                frameWidth = basicFrameWidth - 20;
                if (vp_country!=cv_lie && vp_country!=cv_lux && vp_country!=cv_ned && vp_country!=cv_swi) {
                    frameWidth = basicFrameWidth - 45;
                };
            };
            cv_heightBody = cv_heightSingle
            break
    }
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
    let tmpStr, tmpW, tmpH, font, x, y, country;
    font = "bold 13px verdana";
    tmpStr = lf_monthStrMMMYY(lo_tipMonth) + "  (#" + lo_tipMonth.toString() + ")";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    x = frameLeft + frameWidth / 2 - tmpW / 2;
    y = frameTop + 4 + tmpH;
    gText(tmpStr, font, "darkSlateGray", x, y);

    //---- pa še podatki za državo/države
    const cv_gapLeft = 6; const cv_gapRight = 10; const cv_xDvopicje = frameLeft + frameWidth - 50;
    y += 20;
    font = "normal 12px verdana";
    for (country = 1; country <= cv_maxCountry; country++) {
        if (!lo_enabledCountry[country]) { continue };
        if (vp_country != cv_allCountry && country != vp_country) { continue };
        //----
        tmpStr = countryNameLong[country];
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        x = cv_xDvopicje - cv_gapLeft - tmpW;
        gText(tmpStr, font, countryColor[country], x, y);
        //----
        gText(":", font, "darkSlateGray", cv_xDvopicje, y);
        //----
        gText(lf_getAvgValue(country, lo_tipMonth, lo_nrMonthsAvg).toFixed(1), font, countryColor[country], cv_xDvopicje + cv_gapRight, y);
        //----
        y += cv_heightSingle;
    }
}

function paint_graph_timeExcessDeath_tipBeforeGraph(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky, cv_graphLeft, cv_graphRight, cv_graphTopData, cv_graphBottom) {

    lo_tipMonth = 0;

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    let country;

    if (lo_mouseMoveX > cv_graphLeft && lo_mouseMoveX < cv_graphRight && lo_mouseMoveY > cv_graphTopData && lo_mouseMoveY < cv_graphBottom) {
        //---- določanje tipMonth
        switch (gl_mode) {
            case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
                lo_tipMonth = Math.round(vl_monthStart + (lo_mouseMoveX - cv_graphLeftData) / kx);
                if (lo_tipMonth < vl_monthStart) { lo_tipMonth = vl_monthStart };
                if (lo_tipMonth > gl_monthEnd) { lo_tipMonth = gl_monthEnd };
        }
        //---- risanje background toolTip krogcev
        switch (gl_mode) {
            case cv_mode_timeExcessDeathSingle:
                for (country = 1; country <= cv_maxCountry; country++) {
                    paint_graph_timeExcessDeath_tipMarkerDown(country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                }
                break;
            case cv_mode_timeExcessDeathMulti:
                paint_graph_timeExcessDeath_tipMarkerDown(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                break;
            case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
                if (lf_regularCountry(lo_focusCountry) && lf_regularMonth(lo_focusMonth)) {
                    paint_graph_timeExcessDeath_tipMarkerDown(lo_focusCountry, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
                }
                break;
        }
        //---- risanje vertikalne linije za toolTip
        switch (gl_mode) {
            case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
                paint_graph_timeExcessDeath_tipVerticalLine(vl_monthStart, kx, cv_graphLeftData, cv_graphTopData, cv_graphBottom);
        }
    }
}

function paint_graph_timeExcessDeath_tipAfterGraph(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {

    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    //---- risanje foreground toolTip krogcev
    let country;
    switch (gl_mode) {
        case cv_mode_timeExcessDeathSingle:
            //miška mora biti nad grafom
            if (lo_tipMonth <= 0) { return };
            //grem čez vse države in pri vsaki za lo_tipMonth narišem foreground marker
            for (country = 1; country <= cv_maxCountry; country++) {
                paint_graph_timeExcessDeath_tipMarkerUp(country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            }
            break;
        case cv_mode_timeExcessDeathMulti:
            //miška mora biti nad tekočim grafom
            if (lo_tipMonth <= 0) { return };
            //za to državo za lo_tipMonth narišem foreground marker
            paint_graph_timeExcessDeath_tipMarkerUp(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            break;
        case cv_mode_vaccExcessDeath: case cv_mode_vaccExcessDeathMulti:
            if (lf_regularCountry(lo_focusCountry) && lf_regularMonth(lo_focusMonth)) {
                paint_graph_timeExcessDeath_tipMarkerUp(lo_focusCountry, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky);
            }
            break;
    }
}

function paint_graph_timeExcessDeath_tipMarkerDown(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    //država mora biti selektirana
    if (!lo_enabledCountry[vp_country]) { return };

    //---- izračun koordinat tekočega data point-a
    let x, y, yValue;
    switch (gl_mode) {
        case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
            x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
            yValue = lf_getAvgValue(vp_country, lo_tipMonth, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            break;
        case cv_mode_vaccExcessDeathMulti:
            x = countryGraphLeftData[vp_country] + countryVaccByMonth[vp_country][lo_focusMonth - 1] * countryGraphKx[vp_country];
            yValue = lf_getAvgValue(vp_country, lo_focusMonth, lo_nrMonthsAvg);
            y = countryGraphBottomAxis[vp_country] - yValue * countryGraphKy[vp_country];
            break;
        case cv_mode_vaccExcessDeath:
            x = lo_graphLeftData + countryVaccByMonth[vp_country][lo_focusMonth - 1] * lo_graphKx;
            yValue = lf_getAvgValue(vp_country, lo_focusMonth, lo_nrMonthsAvg);
            y = lo_graphBottomAxis - yValue * lo_graphKy;
            break;
    }
    
    //risanje background krogca za to državo in mesec
    gEllipse(x, y, 9, 9, 0, gf_alphaColor(96, countryColor[vp_country]), 0, "");
}

function paint_graph_timeExcessDeath_tipMarkerUp(vp_country, vl_monthStart, kx, cv_graphLeftData, cv_graphY0, ky) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo

    //država mora biti selektirana
    if (!lo_enabledCountry[vp_country]) { return };
    
    //---- izračun koordinat tekočega data point-a
    let x, y, yValue;
    switch (gl_mode) {
        case cv_mode_timeExcessDeathSingle: case cv_mode_timeExcessDeathMulti:
            x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
            yValue = lf_getAvgValue(vp_country, lo_tipMonth, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            break;
        case cv_mode_vaccExcessDeathMulti:
            x = countryGraphLeftData[vp_country] + countryVaccByMonth[vp_country][lo_focusMonth - 1] * countryGraphKx[vp_country];
            yValue = lf_getAvgValue(vp_country, lo_focusMonth, lo_nrMonthsAvg);
            y = countryGraphBottomAxis[vp_country] - yValue * countryGraphKy[vp_country];
            break;
        case cv_mode_vaccExcessDeath:
            x = lo_graphLeftData + countryVaccByMonth[vp_country][lo_focusMonth - 1] * lo_graphKx;
            yValue = lf_getAvgValue(vp_country, lo_focusMonth, lo_nrMonthsAvg);
            y = lo_graphBottomAxis - yValue * lo_graphKy;
            break;
    }
    
    //risanje foreground krogca za to državo in mesec
    gEllipse(x, y, 5, 5, 0, "white", 0, "");
    gEllipse(x, y, 3, 3, 0, gf_alphaColor(192, countryColor[vp_country]), 0, "");

}

function paint_graph_timeExcessDeath_tipVerticalLine(vl_monthStart, kx, cv_graphLeftData, cv_graphTopData, cv_graphBottom) {
    
    //prikaz tipsov mora biti vključen
    if (!lo_showToolTips) { return };
    if (lo_mouseOut) { return }; //29.7.2023 če je miška izven okna, se toolTip-i ne rišejo
    
    //risanje background krogca za to državo in mesec
    let x = cv_graphLeftData + kx * (lo_tipMonth - vl_monthStart);
    gLine(x, cv_graphTopData, x, cv_graphBottom, 1, "silver", [3, 1]);

}

function paint_graph_vaccExcessDeath(vp_left, vp_top, vp_width, vp_height) {
    //----
    //24.10.2023 ta funkcija se že nekaj mesecev ne uporablja več. Nadomeščata jo univerzalni funkciji paint_graph_timeExcessDeath() in paint_graph_timeExcessDeath_multi() !!
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
    ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(cv_allCountry, vl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
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
    let tmpExcessDeath, tmpExcessDeathAbs
    let yMark10 = true; let yMark5 = true; let yMark1 = true;
    if (vl_dataRange > 30) { yMark1 = false }
    if (vl_dataRange > 100) { yMark5 = false }
    font = "italic 9pt cambria";
    for (tmpExcessDeath = -150; tmpExcessDeath <= 150; tmpExcessDeath++) {
        if (tmpExcessDeath == 0) {
            tmpStr = tmpExcessDeath.toString(); 
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            x = cv_graphLeft - tmpW - 4
            y = cv_graphY0
            gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            continue
        }
        tmpExcessDeathAbs = Math.abs(tmpExcessDeath)
        if (yMark10 && (Math.abs(tmpExcessDeathAbs - 10 * Math.trunc(tmpExcessDeathAbs / 10)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpExcessDeath
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 2])
                tmpStr = tmpExcessDeath.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "dimGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        if (yMark5 && (Math.abs(tmpExcessDeathAbs - 5 * Math.trunc(tmpExcessDeathAbs / 5)) < 0.00001)) {
            y = cv_graphY0 - ky * tmpExcessDeath
            if (y <= cv_graphBottom && y >= cv_graphTopData) {
                gLine(cv_graphLeft - 2, y, cv_graphRightData, y, 1, "darkGray", [2, 5])
                tmpStr = tmpExcessDeath.toString();
                ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
                x = cv_graphLeft - tmpW - 4
                gText(tmpStr, font, "darkGray", x, y + tmpH / 2 - 1);
            }
            continue;
        }
        if (yMark1) {
            y = cv_graphY0 - ky * tmpExcessDeath
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
    for (country = 1; country <= cv_maxCountry; country++) {
        //---- če je prikaz države izključen, potem to državo preskočim (25.1.2023 v1.1)
        if (!lo_enabledCountry[country]) { continue };
        //---- najprej za linije med krogci točk
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart + 1
            //xValue = countryVacc[country]
            xValue = countryVaccByMonth[country][month - 1]
            x = cv_graphLeftData + kx * xValue
            yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            x = x - kk * (vl_nrMonths / 2 - monthIndex + 1)
            if (monthIndex > 1) { gLine(vl_xOld, vl_yOld, x, y, 1, "lightGray", []) }
            vl_xOld = x; vl_yOld = y
        }
        //---- zdaj pa še za krogce točk, zato da so ti risani preko linij
        for (month = vl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - vl_monthStart +1
            //xValue = countryVacc[country]
            xValue = countryVaccByMonth[country][month - 1]
            x = cv_graphLeftData + kx * xValue
            yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
            y = cv_graphY0 - ky * yValue
            x = x - kk * (vl_nrMonths / 2 - monthIndex + 1)
            if (month == gl_monthEnd) {
                gEllipse(x, y, 5, 5, 0, countryColor[country], 1, "dimGray");
            } else {
                gEllipse(x, y, 3, 3, 0, gf_alphaColor(80, countryColor[country]), 0, "")
            }
            vl_xOld = x; vl_yOld = y
        }
    }
    //---- zdaj pa še za oznake držav, zato da so te v vsakem primeru preko krogcev točk in linij med krogci
    for (country = 1; country <= cv_maxCountry; country++) {
         //---- če je prikaz države izključen, potem to državo preskočim (25.1.2023 v1.1)
         if (!lo_enabledCountry[country]) { continue };
        month = gl_monthEnd
        monthIndex = month - vl_monthStart + 1
        //xValue = countryVacc[country]
        xValue = countryVaccByMonth[country][month - 1]
        x = cv_graphLeftData + kx * xValue
        yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
        y = cv_graphY0 - ky * yValue
        x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
        ;[tmpW, tmpH] = gMeasureText(countryNameShort3[country], font);
        gBannerRectWithText(x + 10, y - 8, x + tmpW+9, y + 4, 3, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], countryNameShort3[country], "lightGray", 2, 2)
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
        tmpExcessDeath = (cv_graphY0 - lo_mouseMoveY) / ky;
        tmpStr = tmpExcessDeath.toFixed(1) + "%";
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", cv_graphLeft + 3, lo_mouseMoveY - 3);
    }
}

function paint_graph_vaccExcessDeath_corelationLine(vp_month, vp_nrMonthsAvg, vp_kx, vp_ky, vp_graphLeftData, vp_graphY0, vp_topData, vp_bottomData, vp_country) {

    //---- pred feb 2021 ne rišem korelacije, ker je še premalo cepljenih
    if (vp_month < 14) { return };

    //---- ugotavljanje težišča za vse države skupaj
    let minVacc = 1000; let maxVacc = 0;
    let sumVacc = 0; let sumExcessDeath = 0; let sumCountry = 0;
    for (country = 1; country <= cv_maxCountry; country++) {
        if (country == cv_eu27) { continue }
        //sumVacc += countryVacc[country]
        sumVacc += countryVaccByMonth[country][vp_month - 1]
        sumExcessDeath += lf_getAvgValue(country, vp_month, vp_nrMonthsAvg)
        sumCountry += 1
        if (countryVaccByMonth[country][vp_month - 1] < minVacc) { minVacc = countryVaccByMonth[country][vp_month - 1] };
        if (countryVaccByMonth[country][vp_month - 1] > maxVacc) { maxVacc = countryVaccByMonth[country][vp_month - 1] };
    }
    let avgVaccAll = sumVacc / sumCountry
    let avgExcessDeathAll = sumExcessDeath / sumCountry
    //console.log("avgVaccAll=" + avgVaccAll + " avgExcessDeathAll=" + avgExcessDeathAll)

    //---- ugotavljanje težišča za države levo od težišča
    let sumVaccLeft = 0; let sumExcessDeathLeft = 0; let sumCountryLeft = 0;
    for (country = 1; country <= cv_maxCountry; country++) {
        if (country == cv_eu27) { continue }
        //if (countryVacc[country] < avgVaccAll) {
        if (countryVaccByMonth[country][vp_month - 1] < avgVaccAll) {
            //sumVaccLeft += countryVacc[country]
            sumVaccLeft += countryVaccByMonth[country][vp_month - 1]
            sumExcessDeathLeft += lf_getAvgValue(country, vp_month, vp_nrMonthsAvg)
            sumCountryLeft += 1
        }
    }
    let avgVaccLeft = sumVaccLeft / sumCountryLeft
    let avgExcessDeathLeft = sumExcessDeathLeft / sumCountryLeft
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
    if (vp_country == cv_allCountry) {
        let alphaStr
        if ((avgVaccAll - avgVaccLeft) == 0) { alphaStr = "90" + scStopinj } else { alphaStr = (Math.abs(Math.atan(k)) * 180 / Math.PI).toFixed(1) + scStopinj }
        gText(alphaStr, "italic 10pt serif", "gray", x1 + 5, y1 + 4)
    }
}

function lf_getAvgValue(vp_country, vp_month, vp_nrMonthsAvg) {

    let month1, nrMonths, tmpValue, tmpMonth
    month1 = vp_month - vp_nrMonthsAvg + 1
    if (month1 < 1) { month1 = 1 }
    nrMonths = vp_month - month1 + 1
    tmpValue=0
    for (tmpMonth = month1; tmpMonth <= vp_month; tmpMonth++) {
        tmpValue+=countryExcessDeath[vp_country][tmpMonth - 1]
    }
    tmpValue/=nrMonths
    return tmpValue
}

function lf_inspectDataValues(vp_country, vp_monthStart, vp_monthEnd, vp_nrMonthsAvg) {

    //console.log("------------------------")

    let minY = 1000
    let maxY = 0
    let tmpValue, countryStart, countryEnd;
    switch (vp_country) {
        case cv_allCountry: countryStart = 1; countryEnd = cv_maxCountry; break;
        default: countryStart = vp_country; countryEnd = vp_country; break;
    }
    for (country = countryStart; country <= countryEnd; country++) {
        for (month = vp_monthStart; month <= vp_monthEnd; month++) {
            tmpValue = lf_getAvgValue(country, month, vp_nrMonthsAvg)
            if (tmpValue < minY) {
                minY = tmpValue
                //console.log("country=" + country + " month=" + month + " minY=" + minY + " (maxY="+maxY+")")
            }
            if (tmpValue > maxY) {
                maxY = tmpValue
                //console.log("country=" + country + " month=" + month + " maxY=" + maxY + " (minY="+minY+")")
            }
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
    ctx.font = font
    let msrText = ctx.measureText(text);
    //if (text == gl_versionDate) { console.log("msrText.width=" + msrText.width) }
    //let tmpWidth = msrText.width;
    //let tmpHeight = msrText.actualBoundingBoxAscent;
    return [msrText.width, msrText.actualBoundingBoxAscent]
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
    let bottom = yiBottom + yGap;
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
  


