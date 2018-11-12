var makeMovable = function(target, handle) {
    if (!handle) handle = target;
    handle.onmousedown = function(event) {
        var xy = target.position();
        var mxy = target.currentMouseXY(event);
        var originalPositionX = xy[0];
        var originalPositionY = xy[1];
        target.style.position = 'absolute';
        target.style.left = originalPositionX + "px";
        target.style.top = originalPositionY + "px";
        target.style.marginLeft = "0px";
        target.style.marginTop = "0px";
        target.style.overflowY = "hidden";
        var currentPosX = mxy[0];
        var currentPosY = mxy[1];
        document.onmousemove = function(event) {
            var mxy = target.currentMouseXY(event);
            target.style.left = originalPositionX + (mxy[0] - currentPosX) + "px";
            target.style.top = originalPositionY + (mxy[1] - currentPosY) + "px";
            return false;
        };
        document.onmouseup = function() {
            target.style.overflowY = "";
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    };
    target.position = function() {
        var obj = target;
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    };
    target.currentMouseXY = function (event) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (!e) var e = event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return [posx, posy];
    }
}