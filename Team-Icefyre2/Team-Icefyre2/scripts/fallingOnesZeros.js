var digitmax = 35
var digitcolor = new Array("#aaaacc", "#ddddFF", "#ccccDD")
var digittype = new Array("Arial Black", "Arial Narrow", "Times", "Comic Sans MS");
var sinkspeed = 0.6;

var digitmaxsize = 22;

var digitminsize = 8;

var snowingzone = 1;

var digit = new Array();
var marginbottom;
var marginright;
var timer;
var i_digit = 0;
var x_mv = new Array();
var crds = new Array();
var lftrght = new Array();
var browserinfos = navigator.userAgent;
var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
var ns6 = document.getElementById && !document.all;
var opera = browserinfos.match(/Opera/);
var browserok = ie5 || ns6 || opera;

function randommaker(range) {
    rand = Math.floor(range * Math.random());
    return rand;
}
function digitLetterMaker() {
    var randNum = Math.floor((Math.random() * 10) + 1);
    if (randNum > 5) {
        var digitletter = "0";
    }
    else {
        digitletter = "1";
    }
    return digitletter;
}

function initdigit() {
    if (ie5 || opera) {
        marginbottom = document.body.clientHeight;
        marginright = document.body.clientWidth;
    }
    else if (ns6) {
        marginbottom = window.innerHeight;
        marginright = window.innerWidth;
    }
    var digitsizerange = digitmaxsize - digitminsize;
    for (i = 0; i <= digitmax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;
        digit[i] = document.getElementById("s" + i);
        digit[i].style.fontFamily = digittype[randommaker(digittype.length)];
        digit[i].size = randommaker(digitsizerange) + digitminsize;
        digit[i].style.fontSize = digit[i].size;
        digit[i].style.color = digitcolor[randommaker(digitcolor.length)];
        digit[i].sink = sinkspeed * digit[i].size / 5;
        if (snowingzone == 1) { digit[i].posx = randommaker(marginright - digit[i].size) }
        if (snowingzone == 2) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) }
        if (snowingzone == 3) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) + marginright / 4 }
        if (snowingzone == 4) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) + marginright / 2 }
        digit[i].posy = randommaker(6 * marginbottom - marginbottom - 6 * digit[i].size);
        digit[i].style.left = digit[i].posx;
        digit[i].style.top = digit[i].posy;
    }
    movedigit();
}

function movedigit() {
    for (i = 0; i <= digitmax; i++) {
        crds[i] += x_mv[i];
        digit[i].posy += digit[i].sink;
        digit[i].style.left = digit[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
        digit[i].style.top = digit[i].posy + "px";

        if (digit[i].posy >= marginbottom - 6 * digit[i].size || parseInt(digit[i].style.left) > (marginright - 3 * lftrght[i])) {
            if (snowingzone == 1) { digit[i].posx = randommaker(marginright - digit[i].size) }
            if (snowingzone == 2) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) }
            if (snowingzone == 3) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) + marginright / 4 }
            if (snowingzone == 4) { digit[i].posx = randommaker(marginright / 2 - digit[i].size) + marginright / 2 }
            digit[i].posy = 0;
        }
    }
    var timer = setTimeout("movedigit()", 50);
}

for (i = 0; i <= digitmax; i++) {
    document.write("<span id='s" + i + "' style='position:absolute;top:-" + digitmaxsize + "'>" + digitLetterMaker() + "</span>");
}
if (browserok) {
    window.onload = initdigit;
}
