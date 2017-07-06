/* With this function, you can made an  unitary vector sum only with angles, angles are on sexagesimal (0-360) */

module.exports = function(a,b) {
    if(a<0) a+=360;
    if(a>360) a-=360;

    if(b<0) b+=360;
    if(b>360) b-=360;


    var A = {
        y : Math.sin((2*Math.PI*a)/360),
        x : Math.cos((2*Math.PI*a)/360),
    };
    var B = {
        y : Math.sin((2*Math.PI*b)/360),
        x : Math.cos((2*Math.PI*b)/360),
    };

    var C = {
        x : A.x + B.x,
        y : A.y + B.y
    };

    return (Math.atan(C.y,C.x)*360)/(2*Math.PI);
};
