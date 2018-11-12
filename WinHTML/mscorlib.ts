///<reference path="./app.ts"/>
var _classCallCheck = (instance, Constructor) => {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};
namespace("System", function() {

    this.addScript = () =>{
        var scripts = [];
        var stat = {};
        var current = 0;
        var reading = false;

        function addScript(path :any){
            if(typeof path == 'string') path = [path];
            else if(!(path instanceof Array)) return;
            for(var i = 0;i < path.length;i++) scripts.push(path[i]);

            function ls(){
                reading = true;
                if(scripts.length <= current){
                    reading = false;
                    return;
                }
                var nxt;
                var www = (<any>$).getScript(scripts[current], nxt = (ev) =>{
                    stat[scripts[current]] = ev;
                    current++;
                    ls();
                });
                www.fail = nxt;
                return www;
            }

            if(!reading) ls();
        }

        return addScript;
    }
    this.usingcss = (path :any) =>{
        if(typeof path == 'string') path = [path];
        else if(!(path instanceof Array)) throw Error('param must be array-of-string || string');
        for(var i = 0;i < path.length;i++){
            var s = document.createElement('link');
            s.href = path[i];
            s.rel = 'stylesheet';
            document.head.appendChild(s);
        }
    };
    return this.addScript;
});



