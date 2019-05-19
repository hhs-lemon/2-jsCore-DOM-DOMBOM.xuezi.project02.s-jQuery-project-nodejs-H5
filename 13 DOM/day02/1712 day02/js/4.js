var sheet=document.styleSheets[1];
var ruleS=sheet.cssRules[4];
var ruleS_0=ruleS.cssRules[0];
var ruleS_100=ruleS.cssRules[1];

var ruleM=sheet.cssRules[5];
var ruleM_0=ruleM.cssRules[0];
var ruleM_100=ruleM.cssRules[1];

var ruleH=sheet.cssRules[6];
var ruleH_0=ruleH.cssRules[0];
var ruleH_100=ruleH.cssRules[1];

var now=new Date();
var s=now.getSeconds();
var m=now.getMinutes();
var h=now.getHours();
//if(h>12) h-=12;
h>12&&(h-=12);
var sDeg=s/60*360;
var mDeg=m/60*360;
var hDeg=(h*60+m)/(60*12)*360;

ruleS_0.style.transform="rotate("+sDeg+"deg)";
ruleS_100.style.transform=
	"rotate("+(sDeg+360)+"deg)";
ruleM_0.style.transform="rotate("+mDeg+"deg)";
ruleM_100.style.transform=
	"rotate("+(mDeg+360)+"deg)";
ruleH_0.style.transform="rotate("+hDeg+"deg)";
ruleH_100.style.transform=
	"rotate("+(hDeg+360)+"deg)";