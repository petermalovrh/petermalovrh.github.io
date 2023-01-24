//------------------------------------
const gl_versionNr = "v1.0"
const gl_versionDate = "24.1.2023"
const gl_versionNrDate = gl_versionNr + " " + gl_versionDate
//------------------------------------

const cv_eu27 = 1
const cv_bel = 2
const cv_bul = 3
const cv_cze = 4
const cv_den = 5
const cv_ger = 6
const cv_est = 7
const cv_ire = 8
const cv_gre = 9
const cv_spa = 10
const cv_fra = 11
const cv_cro = 12
const cv_ita = 13
const cv_cyp = 14
const cv_lat = 15
const cv_lit = 16
const cv_lux = 17
const cv_hun = 18
const cv_mal = 19
const cv_ned = 20
const cv_aut = 21
const cv_pol = 22
const cv_por = 23
const cv_rom = 24
const cv_svn = 25
const cv_svk = 26
const cv_fin = 27
const cv_swe = 28
const cv_ice = 29
const cv_lie = 30
const cv_nor = 31
const cv_swi = 32
//----
const cv_maxCountry = 32

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
countryNameLong[cv_eu27] = "European Union - 27 countries (from 2020)"
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

// https://ourworldindata.org/covid-vaccinations
const countryVaccByMonth = new Array(cv_maxCountry)
countryVaccByMonth[cv_aut] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 2.8, 5.3, 9.8, 17.9, 35.7, 52.5, 59.3, 61.7, 63.9, 67.7, 73.4, 76.3, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76]
countryVaccByMonth[cv_bel] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 3.0, 4.9, 7.5, 19.2, 35.2, 59.5, 70.4, 72.7, 74.0, 74.9, 75.8, 76.3, 78, 78, 78, 78, 79, 79, 79, 79, 79, 79]
countryVaccByMonth[cv_bul] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.6, 1.4, 8.2, 11.9, 14.7, 17.3, 19.6, 22.3, 26.1, 28.2, 29.4, 30.2, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
countryVaccByMonth[cv_cro] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 1.5, 2.2, 4.4, 11.9, 26.9, 35.5, 40.0, 41.3, 44.6, 47.9, 48.4, 54.7, 55, 56, 56, 56, 56, 56, 56, 56, 56, 56]
countryVaccByMonth[cv_cze] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 2.3, 5.0, 9.7, 14.4, 31.5, 46.4, 54.9, 57.0, 58.2, 60.8, 63.4, 64.7, 65, 65, 65, 66, 66, 66, 66, 66, 66, 66]
countryVaccByMonth[cv_cyp] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.5, 5.0, 7.7, 21.4, 38.7, 50.2, 58.1, 62.1, 63.7, 65.3, 68.2, 70.5, 71, 72, 72, 72, 72, 72, 72, 72, 72, 72]
countryVaccByMonth[cv_den] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2, 2.7, 5.8,10.0, 20.0, 32.2, 53.0, 70.2, 73.0, 74.1, 75.1, 77.3, 80.3, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_est] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9, 2.7, 5.2,10.1, 20.0, 33.0, 42.6, 48.2, 53.8, 57.2, 59.3, 61.5, 62.5, 63, 63, 64, 64, 64, 64, 64, 64, 64, 64]
countryVaccByMonth[cv_eu27]= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.6, 5.0, 8.9, 18.5, 33.4, 48.8, 57.6, 62.3, 64.6, 66.4, 68.4, 70.4, 72, 72, 72, 73, 73, 73, 73, 73, 73, 73]
countryVaccByMonth[cv_fin] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 1.4, 1.7, 3.2,  8.9, 19.0, 35.5, 50.5, 63.0, 70.1, 72.9, 73.6, 74.6, 76, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_fra] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 2.4, 4.3, 9.7, 17.1, 30.7, 47.8, 59.7, 65.8, 68.0, 69.7, 73.2, 76.2, 77, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_ger] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 2.6, 5.1, 7.9, 18.2, 37.6, 52.5, 60.6, 64.3, 66.4, 68.3, 71.0, 73.8, 75, 76, 76, 76, 76, 76, 76, 76, 76, 76]
countryVaccByMonth[cv_gre] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 3.0, 5.8, 9.1, 19.8, 36.5, 49.7, 55.2, 59.0, 61.4, 63.7, 67.8, 70.6, 73, 73, 74, 74, 74, 74, 74, 74, 74, 74]
countryVaccByMonth[cv_hun] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 2.5, 7.9,19.5, 36.7, 49.4, 54.5, 55.3, 56.7, 57.5, 58.7, 60.0, 61.2, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62]
countryVaccByMonth[cv_ice] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3, 3.4, 6.4, 9.7, 25.0, 51.5, 68.3, 70.5, 74.2, 74.8, 75.4, 76.2, 76.7, 77, 78, 78, 78, 78, 78, 78, 78, 78, 78]
countryVaccByMonth[cv_ire] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 3.1, 5.5, 9.6, 19.0, 37.6, 56.7, 68.7, 74.4, 75.7, 76.5, 77.3, 78.0, 80, 80, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_ita] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.1, 2.4, 5.5,10.3, 20.8, 32.1, 53.6, 62.3, 69.5, 73.0, 74.7, 75.8, 78.1, 80, 81, 81, 81, 81, 81, 81, 81, 81, 81]
countryVaccByMonth[cv_lat] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0.9, 1.3, 3.0, 14.9, 29.8, 36.9, 41.1, 46.2, 54.8, 64.4, 68.2, 69.6, 70, 70, 71, 71, 71, 71, 71, 71, 71, 71]
countryVaccByMonth[cv_lie] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 2.1, 5.0,11.0, 23.4, 34.2, 48.2, 52.5, 58.4, 62.1, 63.7, 65.1, 66.2, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67]
countryVaccByMonth[cv_lit] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 2.7, 6.1,10.9, 22.2, 38.3, 45.4, 55.1, 59.9, 62.7, 64.8, 66.6, 67.7, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68]
countryVaccByMonth[cv_lux] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 1.6, 3.5, 8.9, 18.5, 33.4, 48.8, 57.6, 62.3, 64.6, 66.4, 68.4, 70.4, 72, 72, 72, 73, 73, 73, 73, 73, 73, 73] //POZOR: podatki samo za prve 3 mesece, potem naprej kopiral od EU27, ker tudi tisti gredo proti 73% !!
countryVaccByMonth[cv_mal] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 4.7,10.2,20.1, 39.5, 61.1, 71.7, 77.4, 79.1, 80.3, 81.1, 81.7, 84.6, 87, 88, 88, 88, 88, 88, 88, 88, 88, 88]
countryVaccByMonth[cv_ned] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 1.8, 4.3, 6.9, 16.3, 34.5, 50.9, 61.7, 63.5, 64.9, 66.0, 67.1, 67.5, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68]
countryVaccByMonth[cv_nor] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 3.2, 5.5, 7.2, 19.2, 29.0, 33.8, 57.3, 67.6, 69.2, 70.8, 72.3, 73.5, 74, 74, 75, 75, 75, 75, 75, 75, 75, 75]
countryVaccByMonth[cv_pol] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 2.9, 5.1, 7.2, 17.6, 33.3, 43.8, 47.1, 48.7, 50.1, 51.3, 52.8, 54.6, 56, 57, 57, 57, 57, 57, 57, 57, 57, 57]
countryVaccByMonth[cv_por] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 2.6, 5.3, 8.9, 19.6, 36.6, 58.0, 71.5, 80.2, 81.8, 82.3, 83.0, 83.8, 86, 87, 87, 87, 87, 87, 87, 87, 87, 87]
countryVaccByMonth[cv_rom] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 3.1, 5.5, 9.8, 18.7, 23.1, 24.7, 26.1, 27.4, 31.9, 37.8, 39.8, 40.6, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41]
countryVaccByMonth[cv_svk] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 3.2, 4.9,10.3, 17.7, 31.0, 37.4, 40.6, 42.2, 43.4, 43.6, 43.8, 45.1, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46]
countryVaccByMonth[cv_svn] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.3, 2.6, 5.5,10.0, 19.6, 32.5, 39.5, 43.9, 48.8, 52.7, 54.2, 56.1, 57.1, 57, 58, 58, 58, 58, 58, 58, 58, 58, 58]
countryVaccByMonth[cv_spa] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 2.6, 5.7, 9.9, 19.5, 37.8, 57.1, 70.2, 77.1, 78.5, 79.1, 79.6, 80.5, 82, 85, 85, 85, 85, 85, 85, 85, 85, 85]
countryVaccByMonth[cv_swe] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 2.5, 4.4, 6.9, 14.2, 30.0, 40.1, 53.9, 62.2, 64.8, 67.1, 69.2, 70.8, 71, 72, 72, 72, 72, 72, 72, 72, 72, 72]
countryVaccByMonth[cv_swi] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 3.0, 6.6,11.3, 21.7, 37.1, 50.1, 53.9, 58.1, 63.5, 65.4, 66.7, 67.7, 68, 69, 69, 69, 69, 69, 69, 69, 69, 69]

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
countryColor[cv_fra] = "cyan"
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

const cv_minMonth = 1
const cv_minYear = 2020
const cv_maxMonth = 11
const cv_maxYear = 2022

//---- datum podatkov: 21.1.2023
// https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/Ddn-20230117-1
// https://ec.europa.eu/eurostat/databrowser/view/DEMO_MEXRT__custom_4624832/default/table?lang=en
const countryExcessDeath = new Array(cv_maxCountry)
countryExcessDeath[cv_eu27] = [-5.7, -2.5, 13.7, 25.2, 3.1, 1.8, 2.8, 7.7, 8.0, 17.3, 40.0, 29.7, 17.3, 5.9, 10.7, 20.9, 10.6, 6.9, 5.6, 9.0, 12.8, 18.2, 26.5, 23.6, 8.0, 8.1, 6.6, 11.7, 7.7, 8.2, 16.8, 13.5, 9.7, 10.6, 6.7]
countryExcessDeath[cv_bel] = [-4.1, -4.9, 11.8, 73.1, 8.1, -1.1, -7.1, 17.8, 1.7, 22.5, 58.8, 18.9, 1.5, -9.2, -10.5, 6.6, 4.9, 0.9, -1.8, -0.8, 3.0, 11.2, 16.7, 13.1, -0.6, 0.1, 0.6, 16.3, 4.3, 6.8, 5.4, 10.2, 6.2, 9.9, 1.2]
countryExcessDeath[cv_bul] = [-11.8, -0.2, -7.0, -4.2, -3.0, -0.4, 5.5, 5.9, 4.9, 12.6, 94.0, 74.3, 0.1, 5.7, 53.4, 76.9, 26.5, 8.8, 7.9, 19.7, 51.4, 74.0, 88.5, 43.2, 27.4, 46.8, 18.6, 6.7, -1.0, -6.6, 2.5, 8.4, 3.6, -0.2, -2.6]
countryExcessDeath[cv_cze] = [-2.0, 0.0, -0.9, 2.9, -1.3, 3.9, 4.1, 6.9, 11.4, 52.8, 75.8, 44.9, 54.6, 41.1, 62.1, 31.1, 7.4, 1.2, 0.0, -0.6, 4.8, 8.8, 43.4, 41.0, 5.3, 6.0, 3.1, 11.2, 4.0, 2.4, 4.6, 7.2, 11.1, 9.8, 4.1]
countryExcessDeath[cv_den] = [-2.1, -7.0, -3.9, 6.4, -0.9, 0.8, 2.2, 1.5, 4.2, 1.8, 5.5, 10.6, 10.8, -7.3, -12.1, -2.3, 5.8, 6.1, 8.2, 12.3, 11.1, 13.9, 14.0, 17.9, 10.5, 6.8, 6.3, 10.6, 4.8, 10.8, 10.5, 14.1, 7.3, 12.7, 7.0]
countryExcessDeath[cv_ger] = [-2.4, -4.3, -2.6, 9.0, 1.7, 2.5, -0.5, 7.2, 6.0, 5.4, 13.0, 30.9, 23.4, -1.7, -9.0, 7.1, 8.2, 8.7, 3.5, 4.3, 11.4, 12.4, 23.4, 24.2, 3.5, -1.1, 3.9, 12.8, 9.4, 11.8, 16.2, 17.2, 15.3, 23.2, 15.6]
countryExcessDeath[cv_est] = [-9.5, -5.7, -0.9, 5.0, 1.2, 1.9, 3.6, 4.1, 7.3, 0.7, 5.8, 13.6, 12.0, 8.3, 29.6, 26.9, 13.1, 19.1, 13.8, 9.3, 19.6, 25.7, 38.9, 16.3, 6.1, 20.5, 16.0, 4.9, 3.2, 17.8, 12.6, 12.1, 16.4, 8.7, 13.0]
countryExcessDeath[cv_ire] = [-9.2, -1.8, 3.6, 38.0, 7.1, -4.5, -3.2, 1.9, 0.0, 5.5, -2.5, -7.5, 21.4, 17.7, -4.8, -0.2, 6.2, 0.5, 10.1, 11.7, 12.5, 14.2, 16.3, 5.8, -4.2, 2.7, 7.0, 19.2, 13.4, 12.2, 16.4, 16.9, 11.2, 15.6, 14.9]
countryExcessDeath[cv_gre] = [0.8, 6.6, 7.6, 1.3, 3.5, -1.5, 5.6, 6.5, 10.3, 4.2, 28.1, 19.9, -7.8, -2.8, 16.1, 24.8, 21.4, 12.8, 21.2, 34.1, 24.8, 18.0, 31.3, 32.1, 19.8, 20.2, 24.9, 21.4, 12.7, 6.8, 23.3, 18.9, 10.9, 7.8, 14.9]
countryExcessDeath[cv_spa] = [-4.8, -2.7, 54.3, 80.8, 5.5, -3.0, 6.6, 12.3, 15.0, 22.1, 24.4, 7.6, 16.4, 8.0, -2.2, 1.8, 2.7, 2.1, 7.7, 18.5, 9.8, 5.8, 8.3, 9.0, 5.2, 3.6, 1.0, 8.7, 14.2, 16.3, 36.8, 19.5, 8.6, 8.5, 3.0]
countryExcessDeath[cv_fra] = [-5.4, -2.0, 15.5, 36.4, 2.2, 2.5, -0.6, 6.4, 7.6, 16.3, 31.3, 15.8, 10.2, 9.0, 7.2, 17.0, 9.3, 2.6, 2.7, 11.2, 9.2, 7.7, 7.3, 15.1, 10.3, 8.6, 4.6, 14.8, 6.7, 6.7, 15.1, 13.3, 7.9, 11.2, 8.1]
countryExcessDeath[cv_cro] = [-13.7, -2.1, 2.2, -3.6, -6.1, 1.1, 2.3, 2.3, 7.9, 12.2, 44.7, 60.6, 7.9, 2.3, 2.5, 30.9, 24.5, 15.2, 5.9, 7.6, 19.9, 22.6, 60.4, 44.7, 18.3, 25.4, 8.2, 6.7, 1.0, 1.5, 12.5, 9.1, 5.9, 3.8, 4.5]
countryExcessDeath[cv_ita] = [-9.7, -0.7, 49.6, 41.7, 3.9, -0.1, 3.0, 5.1, 6.2, 15.8, 51.6, 27.4, 9.4, 5.1, 18.8, 23.3, 8.2, 7.3, 6.8, 11.3, 10.6, 5.4, 6.0, 10.6, 8.3, 6.4, 7.0, 10.4, 8.2, 6.5, 28.8, 12.0, 6.3, 2.8, 0.5]
countryExcessDeath[cv_cyp] = [15.9, 1.9, 10.8, 5.0, 28.4, 10.8, 10.8, 3.4, 10.1, 10.6, 15.6, 26.7, 10.8, -4.1, 7.3, 31.2, 16.8, 17.1, 41.9, 55.8, 30.4, 20.9, 24.9, 28.2, 29.8, 26.3, 38.9, 38.0, 14.4, 10.9, 31.5, 15.4, 14.0, 19.3, 23.8]
countryExcessDeath[cv_lat] = [-8.3, -9.1, -12.6, -2.6, -1.0, 4.2, -0.7, 4.4, -0.8, 3.7, 10.9, 29.8, 30.6, 15.1, -0.8, 6.4, 16.2, 22.0, 14.9, 9.0, 17.6, 52.4, 57.4, 19.5, 5.9, 11.9, 8.9, 2.9, 0.6, 6.6, -0.3, 7.3, 4.7, 7.0, 4.0]
countryExcessDeath[cv_lit] = [-12.4, -11.2, -1.2, 2.4, -2.1, 8.2, 3.8, 6.9, 7.0, 10.1, 36.3, 70.1, 29.1, 2.3, 6.0, 10.6, 13.5, 15.4, 10.6, 12.5, 32.9, 43.6, 35.9, 29.5, 5.5, 7.6, 14.6, 8.0, -1.5, 4.6, 0.9, 11.8, 7.6, 8.1, 1.3]
countryExcessDeath[cv_lux] = [-8.0, -11.1, 6.0, 18.5, 7.4, -0.2, -0.4, 12.0, 6.5, 5.9, 45.2, 32.9, 8.1, -3.8, 8.9, 7.3, 1.3, 5.7, 0.4, -1.9, 6.6, 9.4, 17.9, 15.7, 0.9, 5.9, -1.4, 17.9, 2.8, 8.8, 11.5, 10.5, 1.5, 7.4, 3.2]
countryExcessDeath[cv_hun] = [-9.9, -5.7, -1.5, 1.1, -2.6, -0.1, -1.9, -0.5, 4.0, 16.1, 59.2, 46.3, 6.0, 0.4, 50.6, 50.0, 10.2, 8.4, 4.4, -1.3, 3.9, 10.3, 51.3, 40.1, 1.3, 5.5, 4.8, 8.5, 1.0, 2.6, 8.2, 5.4, 4.9, 5.9, 6.7]
countryExcessDeath[cv_mal] = [-3.8, -7.3, 17.0, 13.8, 3.1, -2.7, 11.3, 24.4, 22.6, 21.4, 40.2, 41.9, 4.1, 17.7, 32.5, 0.4, 13.3, 3.6, 20.4, 39.2, 18.0, 12.2, 14.8, 19.8, 15.7, 19.2, 22.8, 30.7, 4.2, 17.0, 27.7, 9.0, 17.6, 22.1, 11.8]
countryExcessDeath[cv_ned] = [-3.9, -4.1, 14.9, 53.8, 4.4, 0.9, -2.5, 8.6, 5.8, 18.4, 20.5, 22.9, 18.6, 3.6, -2.7, 10.6, 7.8, 7.2, 5.7, 11.0, 12.4, 14.7, 35.0, 31.2, -0.8, -1.5, 8.8, 19.2, 11.0, 14.0, 15.2, 15.0, 12.9, 19.1, 12.9]
countryExcessDeath[cv_aut] = [-2.7, -0.8, 4.9, 10.5, 1.5, 1.9, 2.2, 4.3, 8.7, 11.6, 47.3, 38.0, 8.8, -3.4, -0.2, 11.4, 8.7, 11.8, 5.5, 8.8, 12.3, 12.2, 34.3, 19.4, -2.5, 2.9, 15.1, 18.3, 9.8, 13.7, 17.8, 11.2, 12.4, 18.3, 13.5]
countryExcessDeath[cv_pol] = [-6.0, -2.0, -0.5, 3.5, 4.2, 5.4, 5.9, 11.3, 11.1, 45.2, 97.0, 49.9, 26.1, 11.0, 38.3, 65.4, 27.0, 13.7, 7.5, 5.8, 10.1, 14.6, 51.0, 69.1, 24.5, 15.1, 7.8, 11.4, 6.9, 7.2, 6.0, 11.6, 12.2, 9.1, 2.8]
countryExcessDeath[cv_por] = [-3.7, -3.7, 5.6, 15.8, 10.4, 3.5, 25.8, 7.1, 13.5, 14.7, 26.5, 21.1, 60.5, 24.6, -4.6, -6.4, -0.8, -0.2, 6.3, 9.3, 8.9, 7.9, 14.2, 6.8, -4.3, 4.2, 7.1, 12.6, 19.3, 24.4, 29.1, 9.4, 11.4, 8.8, 12.8]
countryExcessDeath[cv_rom] = [-9.0, -2.0, -3.4, 2.6, -0.1, 3.8, 11.8, 16.2, 15.0, 25.5, 62.6, 45.2, 13.1, 6.8, 26.2, 39.6, 16.1, 4.9, 6.5, 2.9, 33.0, 110.6, 69.2, 9.1, 2.9, 30.9, 11.2, 4.5, -1.8, -6.6, 3.6, 10.3, 3.2, -5.0, -6.2]
countryExcessDeath[cv_svn] = [-6.1, 0.3, -1.2, 5.5, 1.8, 9.5, 3.5, 2.9, 8.0, 26.1, 91.3, 79.0, 26.8, -1.7, 2.9, 10.7, 10.2, 14.6, 0.8, -4.1, 15.6, 18.6, 50.5, 25.5, 3.8, 14.7, 8.9, 13.5, 7.9, 10.7, 15.6, 12.6, 3.4, 7.2, 14.7]
countryExcessDeath[cv_svk] = [-4.4, -1.6, 2.1, -1.2, 0.4, 0.4, 1.6, 5.1, 5.0, 20.7, 39.3, 57.9, 74.9, 68.8, 55.1, 29.0, 10.5, 9.1, 2.4, 1.1, 12.8, 27.0, 73.0, 64.5, 9.7, 8.5, 22.0, 13.4, 5.4, 8.3, 10.9, 12.3, 5.1, 9.6, -1.6]
countryExcessDeath[cv_fin] = [-9.7, -0.4, 0.6, 8.1, 5.6, 5.7, 1.7, 3.5, 7.2, 2.3, 6.1, 4.1, -1.7, -1.7, -3.6, -0.5, 5.9, 6.0, 10.4, 13.2, 12.7, 12.9, 15.4, 16.1, 11.5, 12.4, 13.4, 20.8, 15.5, 10.2, 12.2, 19.6, 18.9, 19.3, 20.5]
countryExcessDeath[cv_swe] = [-2.6, -5.0, 1.5, 38.2, 23.9, 10.7, -0.7, -1.2, -1.9, -3.3, 10.7, 24.5, 18.4, -4.8, -7.5, -4.1, 0.9, -1.7, -1.6, -0.2, 3.7, 0.1, 2.8, 4.4, 7.0, 3.6, -4.5, -4.3, 1.7, 4.6, 3.3, 7.3, 6.9, 0.8, 2.3]
countryExcessDeath[cv_ice] = [13.8, 3.6, -0.9, 4.7, 7.9, -20.2, -5.0, -6.6, -0.1, 11.0, 5.0, 5.2, 4.5, 2.0, -4.6, 2.9, 3.0, 2.6, 10.3, 16.8, -11.8, -14.1, 9.1, 17.3, 15.3, 22.5, 53.9, 12.8, 13.4, 9.9, 35.8, 11.1, 6.5, -2.5, 11.3]
countryExcessDeath[cv_lie] = [-15.9, 46.0, -10.1, -0.2, 12.2, -17.4, -4.3, 11.0, 29.3, 17.2, 74.4, 115.8, 24.2, 17.5, -35.0, 34.5, 18.0, -39.5, 23.1, -9.4, -5.2, -19.1, 7.4, 12.5, 37.3, 46.0, 8.3, -9.0, -3.1, -1.8, 29.2, -20.9, 4.1, -27.9, 5.6]
countryExcessDeath[cv_nor] = [-3.4, -2.4, -0.6, 2.9, -3.0, -1.6, -1.9, 1.7, 4.9, 1.9, 0.7, -2.2, -5.4, -10.5, -8.4, -3.3, -1.7, -1.3, 1.5, 8.7, 11.5, 11.4, 20.5, 16.5, -1.9, 6.3, 16.0, 11.9, 11.0, 14.0, 15.5, 11.1, 13.4, 12.5, 12.8]
countryExcessDeath[cv_swi] = [-3.7, -0.6, 12.1, 27.6, -1.4, 1.5, 1.6, 4.9, 4.5, 15.2, 66.1, 59.9, 23.8, -5.0, -5.5, 3.3, 3.4, 2.8, 2.6, 8.9, 12.7, 7.1, 16.5, 25.7, 4.8, 3.5, 13.8, 14.2, 5.4, 13.3, 21.9, 15.1, 8.4, 13.7, 11.6]

var lo_nrMonthsAvg = 5
var cv_nrMonths = (13 - cv_minMonth) + 12 * (cv_maxYear - cv_minYear - 1) + cv_maxMonth
var gl_monthEnd = cv_nrMonths
var gl_tailMonths = 5 //za koliko mesecev nazaj se še riše od trenutno izbranega meseca gl_monthEnd
var gl_monthStart = gl_monthEnd - gl_tailMonths  //28=apr2022 30=jun2022 35=nov2022

var lo_keyDownA = false
var lo_keyDownT = false

var lo_showGUI = true

//var cv_privateFormBorder  = 2
var lo_backgroundColor = "whiteSmoke"
//var lo_penFrg1 As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpPen As Pen = New Pen(Color.DarkSlateGray, 1)
//var lo_tmpBrush As SolidBrush = New SolidBrush(Color.DarkSlateGray)

var lo_frmTitleBarHeight =0
var lo_frmBorderWidth =0
var lo_formLoaded  = false

var lo_mouseMoveX  = 0
var lo_mouseMoveY  = 0 

var lo_mouseDown = false
var lo_borderless = false
var lo_lastMouseLocation 

var lo_mouseAboveSliderMonthEnd = false
var lo_dragMonthEndActive = false
var lo_dragMonthEndAddX = 0; var lo_dragMonthEndAddY = 0

const guiPanelLeft = 100; const guiPanelTop = 80

var lo_repaintTimerActive  = false
var lo_hasRepaintRequest  = false

var lo_fullScreen = false

var vl_frmW, vl_frmH

//document.getElementById("checkShowZnacilniKoti").innerHTML = "XCVBRREE"
//document.getElementById("checkShowZnacilniKoti").textContent = "XCVBRREE"
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

//---- 26.12.2022
var tmCalcId

function tmCalc_tick() {
    lf_calculate()
}

var lo_noChange = ""

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.
// Add the event listeners for mousedown, mousemove, and mouseup
elMyCanvas.addEventListener('mousedown', (e) => {
    lo_mousedownX = e.offsetX;
    lo_mouseDownY = e.offsetY;
    lo_mouseDown = true
    //10.12.2022 v1.0.0.0 Ali hoče vleči celotno sliko enotskega kroga?
    lo_dragMonthEndActive = lo_mouseAboveSliderMonthEnd
    //console.log("dragEnotskiKrogActive: " + lo_dragMonthEndActive)

});
elMyCanvas.addEventListener('mouseup', (e) => {
    lo_mouseDown = false
    lo_dragMonthEndActive = false
    //console.log("dragEnotskiKrogActive: FALSE")
});

elMyCanvas.addEventListener('click', (e) => {

    let rslt
    let vl_end = false
    if (!vl_end) {
        rslt = lf_executeClick_intChooser(e.offsetX, e.offsetY, guiPanelLeft, guiPanelTop+10, 180, 5, lo_nrMonthsAvg, 1, 1)
        if (rslt >= 1 && rslt != lo_nrMonthsAvg) {
            lo_nrMonthsAvg = rslt
            paint()
            vl_end = true
        }
    }
    if (!vl_end) {
        rslt = lf_executeClick_slider(e.offsetX, e.offsetY, guiPanelLeft, guiPanelTop+42, 500, cv_nrMonths, gl_tailMonths, 0, 1, 0, 0)
        if (rslt >= 0 && rslt != gl_tailMonths) {
            gl_tailMonths = rslt
            paint()
            vl_end = true
        }
    }
    if (!vl_end) {
        rslt = lf_executeClick_slider(e.offsetX, e.offsetY, guiPanelLeft, guiPanelTop+90, 500, cv_nrMonths, gl_monthEnd, 1, 1, 0, 0)
        if (rslt >= 1 && rslt != gl_monthEnd) {
            gl_monthEnd = rslt
            paint()
            vl_end = true
        }
    }

});

elMyCanvas.addEventListener('mousemove', (e) => {

    //console.log("mouse_move() enter")

    //Vlečenje okna / enotskega kroga
    if (lo_mouseDown) {
        switch (lo_dragMonthEndActive) {
            case true:
                //let circleCenterPos = lf_setCircleCenterPos()
                //let vl_xCircleCenter = circleCenterPos[0]
                //let vl_yCircleCenter = circleCenterPos[1]
                //lo_dragMonthEndAddX = e.offsetX - vl_xCircleCenter
                //lo_dragMonthEndAddY = e.offsetY - vl_yCircleCenter
                //paint()
                let rslt = lf_executeClick_slider(e.offsetX, e.offsetY, guiPanelLeft, guiPanelTop+90, 500, cv_nrMonths, gl_monthEnd, 1, 1, 100, 100)
                if (rslt >= 1) {
                    gl_monthEnd = rslt
                    paint()
                }
                return
            default:
                //Me.Location = New Point((Me.Location.X - lo_lastMouseLocation.X) + e.X, (Me.Location.Y - lo_lastMouseLocation.Y) + e.Y)
                //Me.Update()
                //console.log("mouse_move-drag")
                //return
        }
    }

    //23.1.2023 v1.0 Je miška nad sliderjem za izbiro meseca?
    lo_mouseAboveSliderMonthEnd = false
    let x0, x1, y0, y1;
    x0 = guiPanelLeft; x1 = x0 + 500; y0 = guiPanelTop + 79; y1 = guiPanelTop + 103;
    if (e.offsetX >= x0 && e.offsetX <= x1 && e.offsetY >= y0 && e.offsetY <= y1) {
        lo_mouseAboveSliderMonthEnd = true
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
        lo_nrMonthsAvg -= delta;
        if (lo_nrMonthsAvg > 5) { lo_nrMonthsAvg = 5 };
        if (lo_nrMonthsAvg < 1) { lo_nrMonthsAvg = 1 };
        paint();
        return
    } else if (lo_keyDownT) {
        gl_tailMonths -= delta;
        if (gl_tailMonths > (cv_nrMonths - 1)) { gl_tailMonths = (cv_nrMonths - 1) };
        if (gl_tailMonths < 0) { gl_tailMonths = 0 };
        paint();
        return
    }
    //---- ... sicer spreminja mesec prikaza
    gl_monthEnd -= delta;
    if (gl_monthEnd > cv_nrMonths) { gl_monthEnd = cv_nrMonths };
    if (gl_monthEnd < 1) { gl_monthEnd = 1 };
    paint();
});

function lf_changeVar(vp_var, vp_change, vp_min, vp_max) {
    vp_var += vp_change;
    if (vp_var > vp_max) { vp_var = vp_max };
    if (vp_var < vp_min) { vp_var = vp_min };
    return vp_var
}

window.addEventListener("keydown", (event) => {

    switch (event.code) {
        case 'KeyA':
            lo_keyDownA = true; break;
        case 'KeyT':
            lo_keyDownT = true; break;
        case 'ArrowRight':
            gl_monthEnd = lf_changeVar(gl_monthEnd, 1, 1, cv_nrMonths);
            paint();
            break;
        case 'ArrowLeft':
            gl_monthEnd = lf_changeVar(gl_monthEnd, -1, 1, cv_nrMonths);
            paint();
            break;
        case 'Home':
            gl_monthEnd = 1; paint(); break;
        case 'End':
            gl_monthEnd = cv_nrMonths; paint(); break;
        case 'KeyH':
            lo_showGUI = !lo_showGUI; paint(); break;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code == 'KeyA') { lo_keyDownA = false }
    if (event.code == 'KeyT') { lo_keyDownT = false }
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


resizeCanvas();
paint();



// var elMainDate = document.getElementById("mainDate");
// elMainDate.width = 300     //
// elMainDate.height = 30 //
// elMainDate.style.left = "30px";             //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.top = "1px";              //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS
// elMainDate.style.position = "absolute"     //tole je treba imeti v narekovajih!!! To bi sicer pasalo v CSS



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

    paint_eDeath(8, 8, ctxW - 16, ctxH - 22); //spodaj pustim malo več, ker je recimo zdaj tam izpis porbljenega časa za izris
    paint_GUI()
    paint_author();
    paint_version();

    let myTime2 = Date.now()
    //console.log(myTime2-myTime1 + "ms")
    tmpStr = "izris: " + (myTime2-myTime1).toString() + " ms"
    gText(tmpStr, "italic 10pt sans serif", "gray", ctxW - 65, ctxH - 3)
    
}

function paint_GUI() {

    let x = guiPanelLeft; let y = guiPanelTop + 130;
    if (!lo_showGUI) { x = 8; y = ctxH - 8 };
    x = 8; y = ctxH - 8; //kar vedno spodaj levo naj bo
    gText("data: Eurostat (excess death), OWID (vaccination)", "italic 11pt serif", "maroon", x, y);

    if (!lo_showGUI) { return };

    let tmpStr, tmpStr2

    paint_GUI_intChooser(guiPanelLeft, guiPanelTop+10, 180, 5, lo_nrMonthsAvg, 1, 1)
    gText("(A+kole" + scSchLow + scTchLow + "ek)", "italic 10pt serif", "gray", guiPanelLeft + 196, guiPanelTop + 3);
    
    paint_GUI_slider(guiPanelLeft, guiPanelTop+42, 500, cv_nrMonths, gl_tailMonths, 0, 1)
    tmpStr = "Risanje tudi za predhodnih: " + gl_tailMonths.toString()
    if (gl_tailMonths == 0) { tmpStr2 = " mesecev" }
    else if (gl_tailMonths == 1) { tmpStr2 = " mesec" }
    else if (gl_tailMonths == 2) { tmpStr2 = " meseca" }
    else if (gl_tailMonths == 3) { tmpStr2 = " mesece" }
    else if (gl_tailMonths == 4) { tmpStr2 = " mesece" }
    else {tmpStr2 = " mesecev"}
    tmpStr += tmpStr2
    gText(tmpStr, "normal 10pt verdana", "gray", guiPanelLeft, guiPanelTop+33)
    gText("(T+kole" + scSchLow + scTchLow + "ek)", "italic 10pt serif", "gray", guiPanelLeft + 418, guiPanelTop + 31);
    gText("(H=skrij/prika" + scZhLow + "i)", "italic 10pt serif", "gray", guiPanelLeft + 398, guiPanelTop + 11);

    paint_GUI_slider(guiPanelLeft, guiPanelTop+90, 500, cv_nrMonths, gl_monthEnd, 1, 1)
    tmpStr = "Risanje za mesec: " + gl_monthEnd.toString() + " (" + lf_monthStr(gl_monthEnd) + ")"
    gText(tmpStr, "normal 10pt verdana", "gray", guiPanelLeft, guiPanelTop+81)
    gText("(kole" + scSchLow + scTchLow + "ek, levo/desno, Home/End)", "italic 10pt serif", "gray", guiPanelLeft + 310, guiPanelTop + 80);

    
}

function lf_monthStr(vp_month) {

    let nrLet = Math.trunc((vp_month - 1) / 12)
    let leto = 2020 + nrLet
    let mesec = vp_month - 12 * nrLet
    
    return (lf_mesecName(mesec) + "/" + leto.toString())
    
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

function paint_GUI_slider(vp_left, vp_bodyMiddle, vp_width, vp_items, vp_value, vp_minItemValue, vp_step) {

    let myColor="burlyWood"
    let valueItem = Math.round((vp_value - vp_minItemValue) / vp_step) + 1
    let itemWidth = vp_width / vp_items; let itemWidthHalf = itemWidth / 2
    const chooserHeight = 12; const chooserWidth = 13; const chooserWidthHalf = Math.trunc(chooserWidth / 2)
    const bodyHeight = 7; const bodyHeightHalf = Math.trunc(bodyHeight / 2);
    const bodyBottom = vp_bodyMiddle + bodyHeightHalf; const bodyTop = vp_bodyMiddle - bodyHeightHalf
    gLine(vp_left, vp_bodyMiddle, vp_left + vp_width, vp_bodyMiddle, bodyHeight, myColor, [])
    
    let step, x, tmpStr, tmpStr2, tmpW, tmpH, vl_value
    //let font = "normal verdana 10pt"
    let font="italic Cambria 20pt"
    for (step = 1; step <= vp_items; step++) {
        vl_value = vp_minItemValue + (step - 1) * vp_step
        x = vp_left + itemWidthHalf + (step - 1) * itemWidth
        gLine(x, bodyBottom + 2, x, bodyBottom + 4, 3, myColor, [])
        if (step == valueItem) {
            let x1 = x - chooserWidthHalf; let x2 = x + chooserWidthHalf;
            let y1 = bodyBottom + chooserHeight
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y1)
            ctx.lineTo(x, bodyBottom)
            ctx.closePath()  //ctx.lineTo(x0, top) ... zadnjo ni treba vleči črte, ampak samo zapreš pot
            ctx.fillStyle = myColor
            ctx.fill()
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 1;
            ctx.stroke();
            //gLine(x1 + 1, y1 + 1, x2 + 1, y1 + 1, 1, "gray", [])
            //gLine(x2 + 1, y1 + 1, x + 1, bodyBottom + 1, 1, "gray", [])
        }
        else if (step == 1 || step == vp_items) {
            tmpStr = vl_value.toString();
            ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            gText(tmpStr, "bold 9pt cambria", "gray", x - tmpW/2, bodyBottom + 6 + tmpH)
        }
    }
}

function lf_executeClick_slider(vp_mouseX, vp_mouseY, vp_left, vp_bodyMiddle, vp_width, vp_items, vp_value, vp_minItemValue, vp_step, vp_addZoneUp, vp_addZoneBottom) {

    let valueItem = Math.round((vp_value - vp_minItemValue) / vp_step) + 1
    let itemWidth = vp_width / vp_items; let itemWidthHalf = itemWidth / 2
    const chooserHeight = 12; const chooserWidth = 13; const chooserWidthHalf = Math.trunc(chooserWidth / 2)
    const bodyHeight = 7; const bodyHeightHalf = Math.trunc(bodyHeight / 2);
    const bodyBottom = vp_bodyMiddle + bodyHeightHalf; const bodyTop = vp_bodyMiddle - bodyHeightHalf
    let step, x, tmpStr, tmpStr2, tmpW, tmpH, vl_value
    for (step = 1; step <= vp_items; step++) {
        vl_value = vp_minItemValue + (step - 1) * vp_step
        x = vp_left + itemWidthHalf + (step - 1) * itemWidth
        x0 = x - itemWidthHalf; x1 = x + itemWidthHalf
        y0 = bodyTop - 8 - vp_addZoneUp; y1 = bodyBottom + 10 + vp_addZoneBottom
        if (vp_mouseX >= x0 && vp_mouseX <= x1 && vp_mouseY >= y0 && vp_mouseY <= y1) {
            return vl_value
        }
    }
    return (vp_minItemValue - 1)
}

function paint_GUI_intChooser(vp_left, vp_top, vp_width, vp_items, vp_value, vp_minItemValue, vp_step) {

    let myColor="burlyWood"
    let valueItem = Math.round((vp_value - vp_minItemValue) / vp_step) + 1
    let outRadij = 7; let inRadij=5; let selRadij=4
    const cv_bodyWidth = 7; const cv_bodyWidthHalf = 3
    let yBodyMiddle=vp_top-outRadij 
    gLine(vp_left + 2 * outRadij - 2, yBodyMiddle, vp_left + vp_width - 2 * outRadij + 2, yBodyMiddle, cv_bodyWidth, myColor, [])
                   
    let xStep = (vp_width-2*outRadij) / (vp_items - 1)
    let step, x, tmpStr, tmpStr2, tmpW, tmpH
    //let font = "normal verdana 10pt"
    let font="italic Cambria 20pt"
    for (step = 1; step <= vp_items; step++) {
        x = vp_left + outRadij + (step - 1) * xStep
        gEllipse(x, yBodyMiddle, outRadij, outRadij, 0, myColor, 0, "")        
        gEllipse(x, yBodyMiddle, inRadij, inRadij, 0, "white", 0, "") 
        if (step == valueItem) {
            gEllipse(x, yBodyMiddle, selRadij, selRadij, 0, "orangeRed", 0, "") 
            //tmpStr = vp_value.toString();
            //;[tmpW, tmpH] = gMeasureText(tmpStr, font);
            //gText(vp_value.toString(), font, "darkSlateGray", x - tmpW/2, yBodyMiddle - outRadij - 2)
        }
    }
    tmpStr = "Povpre" + scTchLow + "enje: " + vp_value.toString()
    if (vp_value == 1) { tmpStr2 = " mesec (=brez)" }
    else if (vp_value == 2) { tmpStr2 = " meseca" }
    else if (vp_value == 3) { tmpStr2 = " mesece" }
    else if (vp_value == 4) { tmpStr2 = " mesece" }
    else if (vp_value == 5) {tmpStr2 = " mesecev"}
    tmpStr += tmpStr2
    gText(tmpStr, "normal 10pt verdana", "gray", vp_left, yBodyMiddle - outRadij - 5)
}

function lf_executeClick_intChooser(vp_mouseX, vp_mouseY, vp_left, vp_top, vp_width, vp_items, vp_value, vp_minItemValue, vp_step) {

    let valueItem = Math.round((vp_value - vp_minItemValue) / vp_step) + 1
    let outRadij = 7; let inRadij=5; let selRadij=4
    const cv_bodyWidth = 7; const cv_bodyWidthHalf = 3
    let yBodyMiddle=vp_top-outRadij 
    let xStep = (vp_width - 2 * outRadij) / (vp_items - 1)
    let step, x, dx, dy, dist
    let y = yBodyMiddle
    for (step = 1; step <= vp_items; step++) {
        x = vp_left + outRadij + (step - 1) * xStep
        dx = x - vp_mouseX; dy = y - vp_mouseY; 
        dist = Math.sqrt(dx * dx + dy * dy)
        if (dist <= (outRadij + 5)) {
            //if (step == valueItem) { return (vp_value) }
            //else { return (vp_minItemValue + (step - 1) * vp_step) }
            return (vp_minItemValue + (step - 1) * vp_step)
        }
    }
    return (vp_minItemValue - 1)

}

function paint_eDeath(vp_left, vp_top, vp_width, vp_height) {

    const cv_graphLeft = vp_left + 20 //X koordinata Y osi oziroma začetka X osi
    const cv_graphRight = vp_left + vp_width - 15 //X koordinata konca X osi
    const cv_graphLeftData = cv_graphLeft + 2 //X koordinata začetka področja podatkov
    const cv_graphRightData = cv_graphRight - 5 //X koordinata konca področja podatkov
    const cv_graphRangeX = cv_graphRightData - cv_graphLeftData //X koordinata konca področja podatkov
    const kx = cv_graphRangeX/100
    //----
    const cv_graphTopAxis = vp_top + 10 //Y koordinata vrha Y osi
    const cv_graphTopData = cv_graphTopAxis + 5 //Y koordinata vrha območja podatkov
    const cv_graphBottom = vp_top + vp_height - 15 //Y koordinata X osi oziroma začetka Y osi
    const cv_graphRangeY = cv_graphBottom - cv_graphTopData //X koordinata konca področja podatkov
    
    //---- konfiguracija diagrama
    //gl_monthEnd = cv_nrMonths
    gl_monthStart = gl_monthEnd - gl_tailMonths //30 //25//1  28=apr2022 30=jun2022 35=nov2022

    //---- pregled Y vrednosti presežne smrtnosti in določanje ky
    let vl_nrMonths = gl_tailMonths + 1
    let vl_minY, vl_maxY, vl_dataRange;
    ;[vl_minY, vl_maxY, vl_dataRange] = lf_inspectDataValues(gl_monthStart, gl_monthEnd, lo_nrMonthsAvg)
    const ky = cv_graphRangeY / vl_dataRange
    
    //---- Y koordinata Y osi
    let cv_graphY0 = cv_graphBottom
    if (vl_minY<0) {cv_graphY0=cv_graphBottom-ky*Math.abs(vl_minY)}

    //---- risanje koordinatnih osi
    gLine(cv_graphLeft, cv_graphBottom, cv_graphLeft, cv_graphTopAxis, 2, "gray", [])
    gLine(cv_graphLeft, cv_graphY0, cv_graphRight, cv_graphY0, 2, "gray", [])
    
    //---- oznake na Y osi
    gText("Excess death [%]", "bold italic 11pt cambria", "darkSlateGray", cv_graphLeft - 17, cv_graphTopAxis - 3);
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
    paint_eDeath_corelationLine(gl_monthEnd, lo_nrMonthsAvg, kx, ky, cv_graphLeftData, cv_graphY0)

    //---- risanje raztresenega diagrama    
    let xValue, yValue, monthIndex, vl_xOld, vl_yOld
    font = "bold 10pt verdana"
    let kk = 2; if (gl_tailMonths>10) {kk=1}
    for (country = 1; country <= cv_maxCountry; country++) {
        //---- najprej za linije med krogci točk
        for (month = gl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - gl_monthStart + 1
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
        for (month = gl_monthStart; month <= gl_monthEnd; month++) {
            monthIndex = month - gl_monthStart +1
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
        month = gl_monthEnd
        monthIndex = month - gl_monthStart + 1
        //xValue = countryVacc[country]
        xValue = countryVaccByMonth[country][month - 1]
        x = cv_graphLeftData + kx * xValue
        yValue = lf_getAvgValue(country, month, lo_nrMonthsAvg)
        y = cv_graphY0 - ky * yValue
        x = x - kk * (vl_nrMonths / 2 - monthIndex + 1);
        ;[tmpW, tmpH] = gMeasureText(countryNameShort3[country], font);
        gBannerRectWithText(x + 10, y - 8, x + tmpW+9, y + 4, 3, "white", 1, "lightGray", "bold 10pt verdana", countryColor[country], countryNameShort3[country], "lightGray", 2, 2)
        vl_xOld = x; vl_yOld = y 
    }

    //Izpis tekočega meseca
    tmpStr = lf_monthStr(gl_monthEnd);
    font = "bold 14pt verdana";
    ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
    let tmpLeft = 400; let tmpTop = 20;
    gBannerRectWithText(tmpLeft, tmpTop, tmpLeft + tmpW, tmpTop + tmpH, 6, "azure", 1, "lightGray", font, "darkSlateGray", tmpStr, "lightGray", 2, 2)
    
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
        tmpExcessDeath = (lo_mouseMoveY - cv_graphY0) / ky;
        tmpStr = tmpExcessDeath.toFixed(1) + "%";
        ;[tmpW, tmpH] = gMeasureText(tmpStr, font);
        gText(tmpStr, font, "dimGray", cv_graphLeft + 3, lo_mouseMoveY - 3);
    }
}

function paint_eDeath_corelationLine(vp_month, vp_nrMonthsAvg, vp_kx, vp_ky, vp_graphLeftData, vp_graphY0) {

    //---- pred feb 2021 ne rišem korelacije, ker je še premalo cepljenih
    if (vp_month < 14) { return };

    //---- ugotavljanje težišča za vse države skupaj
    let minVacc = 1000; let maxVacc = 0;
    let sumVacc = 0; let sumExcessDeath = 0; let sumCountry = 0;
    for (country = 1; country <= cv_maxCountry; country++) {
        if (country==cv_eu27) {continue}
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

    //---- ugotavljanje težišča za vse države skupaj
    let sumVaccLeft = 0; let sumExcessDeathLeft = 0; let sumCountryLeft = 0;
    for (country = 1; country <= cv_maxCountry; country++) {
        if (country==cv_eu27) {continue}
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
    let k = (avgExcessDeathAll - avgExcessDeathLeft) / (avgVaccAll - avgVaccLeft)
    //console.log("k=" + k)
    //---- začetna in končna točka smerne linije
    //let vacc0 = 22; let vacc1 = 95
    let vacc0 = minVacc - 4; if (vacc0 < 0) { vacc0 = 0 };
    let vacc1 = maxVacc + 4; if (vacc1 >100) { vacc1 = 100 };
    let excessDeath0 = avgExcessDeathAll - k * (avgVaccAll - vacc0)
    let excessDeath1 = avgExcessDeathAll + k * (vacc1 - avgVaccAll)
    let x0 = vp_graphLeftData + vp_kx * vacc0
    let x1 = vp_graphLeftData + vp_kx * vacc1
    let y0 = vp_graphY0 - vp_ky * excessDeath0
    let y1 = vp_graphY0 - vp_ky * excessDeath1

    //---- risanje smerne linije
    const cv_dashWidth = 7
    gLine(x0 - 2, y0 - 2, x1 - 2, y1 - 2, 4, "white", [cv_dashWidth, cv_dashWidth])
    gLine(x0+1, y0+1, x1+1, y1+1, 4, "gray", [cv_dashWidth, cv_dashWidth])
    gLine(x0, y0, x1, y1, 4, "darkGray", [cv_dashWidth, cv_dashWidth])
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

function lf_inspectDataValues(vp_monthStart, vp_monthEnd, vp_nrMonthsAvg) {

    //console.log("------------------------")

    let minY = 1000
    let maxY = 0
    let tmpValue
    for (country = 1; country <= cv_maxCountry; country++) {
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
    let tmpStr = "Peter Malovrh, 2022"
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
    gBannerRectWithText(x0, y0, x1, y1, dd, "white", 1, "lightGray", font, "gray", tmpStr, "#D0D0D040", 4, 4)
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
    gBannerRectWithText(x0, y0, x1, y1, dd, "#FFF800B0", 1, "lightGray", font, "blue", tmpStr, "#D0D0D040", 3, 3)

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
    gBannerRectWithText(x0, y0, x1, y1, dd, "white", 1, "lightGray", "italic 12px cambria", "gray", tmpStr, "", 3, 3)
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

function gBannerRectWithText(x0, y0, x1, y1, dd, fillColor, strokeWidth, strokeColor, font, fontColor, tmpStr, shaddowColor, xShaddow, yShaddow) {
    //-------------------------------
    // x0,y0,x1,y1 ... notranji nevidni okvir, tudi tekst se spodaj izpisuje na y1 (nad y1)
    // dd          ... toliko od notranjega okvirja od zunanjega izrisanega okvirja
    // x(y)Shaddow ... kako daleč pade senca desno in navzdol
    //-------------------------------
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
            paint()
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
  


