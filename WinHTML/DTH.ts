enum accessType {
    None=0,
    Read=1,
    Write=2,
    ReadWrite= 3,
    seeckable=4,
}
enum seekType {
    Begin,
    End,
}
enum baseObjects {
    byte=1,
    ubyte=2,
    short=3,
    ushort=4,
    int=5,
    uint=6,
    float=7,
    double=8,
}

var getsize =
(() =>{
    var i = [1, 1, 2, 2, 4, 4, 4, 8];
    return (bo :baseObjects) => i[bo]
})();

class exdv {
    public curso_write :number=0;
    public curso_read :number=0;

    constructor(public byteLength :number, public bufferOffset :number= 0, public buffer :DataView= new DataView(new ArrayBuffer(byteLength))){
        
    }

    public reset(zeromem :boolean){
        this.byteLength = this.buffer.byteLength;
        this.curso_read = 0;
        this.curso_write = 0;
        this.bufferOffset = 0;
        if(zeromem) this.zeroMemory()
    }

    public zeroMemory(){
        var sel = this.buffer;
        for(var i = sel.byteLength - 1;i >= 8;i -= 8) (<any>sel).setFloat64(i, 0);
        (<any>sel).setFloat64(0, 0.0);
    }
    public get(curso :number, type :baseObjects):number{
        switch(type){
            case baseObjects.byte:
                return (<any>this.buffer).getInt8(curso);
            case baseObjects.ubyte:
                return (<any>this.buffer).getUint8(curso);
            case baseObjects.short:
                return (<any>this.buffer).getInt16(curso);
            case baseObjects.ushort:
                return (<any>this.buffer).getUint16(curso);
            case baseObjects.int:
                return (<any>this.buffer).getInt32(curso);
            case baseObjects.uint:
                return (<any>this.buffer).getUint32(curso);
            case baseObjects.float:
                return (<any>this.buffer).getFloat32(curso);
            case baseObjects.double:
                return (<any>this.buffer).getFloat64(curso);
        }
        return null
    }
    public  set(curso: number,value:number, type: baseObjects):void {
        switch (type) {
            case baseObjects.byte:
                (<any>this.buffer).setInt8(curso, value);
                break;
            case baseObjects.ubyte:
                (<any>this.buffer).setUint8(curso, value);
                break;
            case baseObjects.short:
                (<any>this.buffer).setInt16(curso, value);
                break;
            case baseObjects.ushort:
                (<any>this.buffer).setUint16(curso, value);
                break;
            case baseObjects.int:
                (<any>this.buffer).setInt32(curso, value);
                break;
            case baseObjects.uint:
                (<any>this.buffer).setUint32(curso, value);
                break;
            case baseObjects.float:
                (<any>this.buffer).setFloat32(curso, value);
                break;
            case baseObjects.double:
                (<any>this.buffer).setFloat64(curso, value);
                break;
        }
    }
}
class streamStat {
    
    public readercursor;
    public writtercurrsor;
    public starttime: Date;
    public endtime: Date;
    public notactive:number=0;
    constructor(public reader :exdv, public writter :exdv){
        this.readercursor = reader.curso_read + reader.bufferOffset;
        this.writtercurrsor = writter.curso_write + writter.bufferOffset;
        this.endtime = this.starttime = new Date();
    }
    public newVisite(reader: exdv, writter: exdv){
        var ro = reader.curso_read + reader.bufferOffset;
        var wo = writter.curso_write + writter.bufferOffset;
        var ret = true;
        if (ro + 8 >= wo);
        if (ro == wo) ret = false;
        else if (ro == this.readercursor) if (wo == this.writtercurrsor) ret = false;
        this.reader = reader;
        this.writter = writter;
        if(!ret) this.notactive++;
        else this.notactive = 0;
        return ret;
    }
}
class stream {
    private static buffers_garbage :List< exdv >=new List< exdv >(10);

    private getBuffer(cap :number, zeromem? :boolean) :exdv{
        if(stream.buffers_garbage.length < 1) sel = new exdv(cap);
        else{
            var sel = stream.buffers_garbage.First;
            var j = 0;
            stream.buffers_garbage.foreach((k :number, v :exdv) =>{
                if(v.byteLength > cap){
                    j = k;
                    return true;
                }
                j = v.byteLength > sel.byteLength ? k : j;
                return false;
            });
            sel = stream.buffers_garbage[j];
            stream.buffers_garbage.removeAt(j);
            var last = this.arraybuffer.Last;
            sel.bufferOffset = last.bufferOffset + last.byteLength;
        }
        this.arraybuffer.push(sel);
        sel.reset(zeromem)
        return sel;
    }

    private static dispose(array :exdv){
        array.reset(false);
        stream.buffers_garbage.push(array);
    }

    private accesstype :accessType;
    private reader :exdv;
    private writter: exdv;
    private arraybuffer :List< exdv > = new List< exdv >(5);

    

    public adjustable :boolean=false;

    get Writtable() :boolean{ return (this.accesstype & 2) != 0; }

    get Readable() :boolean{ return (this.accesstype & 1) != 0; }

    get Seekable() :boolean{ return (this.accesstype & 4) != 0; }

    get ReaderPosition(): number{ return this.reader.curso_read + this.reader.bufferOffset; }

    get WritterPosition() :number{ return this.writter.curso_write + this.writter.bufferOffset; }

    public Optimize(tobufferoptimize :number=-1){
        if(tobufferoptimize == -1) tobufferoptimize = this.arraybuffer.indexOf(this.reader) - 1;
        for(var i = tobufferoptimize;i >= 0;i--) stream.dispose(this.arraybuffer.pop());
    }

    /**
    * Seek to written region data stream
    */
    private seek_writtendata(offset :number) :boolean{
        if(this.Position + offset >= this.writter.curso_write + this.writter.bufferOffset) return false;
        var ri = -1;
        var ret;
        this.arraybuffer.foreach((i :number, v :exdv) =>{
            if(this.reader == v){
                var rst = v.byteLength - this.reader.curso_read;
                if(offset <= rst){
                    this.reader.curso_read += offset;
                    return ret = true;
                }
                offset -= rst;
                ri = i;
            } else if(ri != -1){
                var is_currbufferwrite = v == this.writter;
                if(is_currbufferwrite) var disp = this.writter.curso_write - 1;
                else disp = v.byteLength;
                if(offset <= disp){
                    this.reader.curso_read = offset;
                    this.reader = v;
                    return ret = true;
                }
                if(is_currbufferwrite) return!(ret = false);
                offset -= v.byteLength;
            }
            return false;
        });
        return ret;
    }

    private internal_seek(offset :number) :boolean{
        if(offset < 0 || offset >= this.writter.bufferOffset + this.writter.curso_write) return false;
        if(offset > this.writter.bufferOffset){
            this.reader.curso_read = offset - this.writter.bufferOffset;
            this.reader = this.writter;
            return true;
        } else if(Math.abs(offset - this.reader.bufferOffset) < this.reader.curso_read){
            this.reader.curso_read = offset - this.reader.bufferOffset;
            return true;
        } else{
            var bi = 0;
            var bo = 0;
            var out;
            var lstbuffer;
            this.arraybuffer.foreach((i :number, v :exdv) =>{
                out = true;
                if(offset > bo && offset < (bo + v.byteLength)) return (out = true);
                bo += v.byteLength;
                lstbuffer = v;
                return false;
            });
            if(!out) return false;
            var foffset = offset - bo;
            if(lstbuffer == this.writter && this.writter.curso_write <= foffset) return false;
            if(lstbuffer == this.reader && this.reader.curso_read < foffset) return false;
            this.reader.bufferOffset = bo;
            this.reader.curso_read = foffset;
            this.reader = lstbuffer;
            if(this.adjustable) this.Optimize(bi - 1);
            return true;
        }
    }

    /**
    * seek between data in the stream only.
    */
    public seek(offset :number, mode :seekType) :boolean{
        switch(mode){
            case seekType.Begin:
                if(this.adjustable) return false;
                else return this.internal_seek(offset);
            case seekType.End:
                if(offset < 0)
                    if(this.adjustable) return false;
                    else return this.internal_seek(this.reader.bufferOffset + this.reader.curso_read + offset);
                else return this.seek_writtendata(offset);
        }
        return false;
    }

    private internal_expand_write(by :number){
        by = by < this.capacity ? this.capacity : by;
        if(by + this.writter.curso_write <= this.writter.byteLength) return;
        by = by - this.writter.byteLength - this.writter.curso_write;
        by = by > this.capacity ? by : this.capacity;
        var c = new exdv(by);
        c.bufferOffset = this.writter.bufferOffset + this.writter.byteLength;
        this.arraybuffer.push(c);
    }

    set Position(v :number){
        if(this.Seekable) if(this.seek(v, seekType.Begin)) return;
        throw 'stream not seeckable or out of index';
    }

    constructor(accessType :accessType, private capacity :number=4048){
        this.accesstype = accessType;
        this.capacity = 'number' == typeof capacity ? (capacity > 0 ? (capacity + (capacity % 8 != 0 ? 8 - capacity % 8 : 0)) : 4048) : 4048;
        this.writter = this.reader = this.getBuffer(this.capacity);
        this.streamStat = new streamStat(this.reader, this.writter);
    }

    private static tempexdv :exdv=new exdv(8);

    private readbetween(from: exdv, to: exdv, type: baseObjects, size: number): any{
        if(to == null) return null;
        var j = 0;
        for(var i = from.curso_read;i < from.byteLength;i++, j++){
            stream.tempexdv.buffer.setInt8(j, from.buffer.getInt8(i));
        }
        if(to.curso_write > (size - j))
            for(i = 0;j < size;j++, i++){
                stream.tempexdv.buffer.setInt8(j, to.buffer.getInt8(i));
            }
        else return null;
        to.curso_read = i;
        from.curso_read = from.byteLength;
        return { val :stream.tempexdv.get(0, type), end :j }
    }

    public read(type: baseObjects, array: any[], start: number= 0, count: number= -1){
        if (count < 0 || count > array.length) count = array.length;
        var scount = count;
        var esize = getsize(type);
        var cur = this.reader;
        var curso = cur.curso_read;
        var icur = this.arraybuffer.indexOf(cur);
        var nxt;
        var x;
       
        do {
            var end = false;
            var to = cur.curso_write;
            while(curso < to && count > 0){
                if(curso + esize <= to) array[start++] = cur.get(curso, type);
                else{
                    end = true;
                    if((nxt = this.arraybuffer.get(++icur)) != null && (x = this.readbetween(cur, nxt, type, esize)) != null){
                        array[start++] = x.val;
                        this.reader = cur = nxt;
                        curso = nxt.curso_read;
                        end = null;
                    }
                    break;
                }
                count--;
                curso += esize;
            }
            if(end == null) continue;
            else if(end || to < cur.byteLength) break;
            else if(count <= 0) break;
            // if you are here then your stream reader can't reache the end of buffer .
            //  ==> update values for next stream
            cur = this.arraybuffer.get(++icur);
            if(cur == null) break;
            this.reader = cur;
            curso = 0;
        } while(true)
        // update curso 
        this.reader.curso_read = curso;
        return scount - count;
    }
    public SpeedUP=true;
    public writebuferarray(array: ArrayBuffer, start: number= 0, count: number= -1){
        var nexdv :exdv;
        if (count < 0 || count > array.byteLength) count = array.byteLength;
        nexdv = new exdv(array.byteLength, this.writter.bufferOffset + this.writter.curso_write, new DataView(array));
        nexdv.curso_write = array.byteLength;
        this.arraybuffer.push(nexdv);
        if(this.writter.curso_write == 0){
            stream.dispose(this.writter);
            if(this.reader == this.writter) this.reader = nexdv;
        } else this.writter.byteLength = this.writter.curso_write;
        this.writter = nexdv;
    }
    public write(type :baseObjects, array :any[], start :number= 0, count :number= -1){
        if (count < 0 || count > array.length) count = array.length;
        if(array instanceof ArrayBuffer) return this.writebuferarray(<ArrayBuffer><any>array);

        var esize = getsize(type);
        if((this.writter.byteLength - this.writter.curso_write) < count * esize) this.internal_expand_write((count - start) * esize + 80);
        var cur = this.writter;
        var icur = this.arraybuffer.indexOf(cur);
        var curso = this.writter.curso_write;
        var _pb = this.writter.bufferOffset;
        do{
            var to = cur.byteLength;
            while(curso + esize <= to && count > 0){
                cur.set(curso, array[start], type);
                start++;
                count--;
                curso += esize;
            }
            if (count <= 0) break;
            // if you are here then your stream writer can't add the current value because there no space enaught .
            //  ==> resize the current stream and move to the next stream
            cur.byteLength = cur.curso_write;
            _pb += cur.curso_write;
            if(this.arraybuffer.Last == cur) break;
            cur = this.arraybuffer.get(++icur);
            cur.bufferOffset = _pb;
            this.writter = cur;
            curso = 0;
        } while(true)
        // update curso 
        this.writter.curso_write = curso;
    }
    private currentT = -1;
    private thisread;
    private streamStat :streamStat;
    private nonresponse: Date;

    private dispacheCallBackRead(){ if(this.streamStat.newVisite(this.reader, this.writter)) this.callbackreads(this.thisread); }

    public syncread(callback :(read :(type :baseObjects, array :any[], start :number, count :number) => void) => boolean){
        if(this.currentT != -1) throw "the handle was taken";
        setInterval(this.dispacheCallBackRead.bind(this), 100);
        this.callbackreads = callback;
        this.thisread = this.read.bind(this);
    }

    private callbackreads: (read: (type: baseObjects, array: any[], start: number, count: number) => void) => boolean;
}

var xstream :stream = null;
function test(){
    var c = [1, 2, 3, 0, 0, 0];
    xstream = new stream(accessType.ReadWrite, 8);
    xstream.syncread((read) =>{
        var rst = xstream.WritterPosition - xstream.ReaderPosition;
        var lm = new Array(rst < 100 ? 100 : rst / 100 >> 0);
        var xm = read(baseObjects.byte, lm, 0, lm.length);
        document.title = xstream.WritterPosition - xstream.ReaderPosition + "";
        return true;
    });
    return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET','./JavaScript1.js');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('loadend', (ev :ProgressEvent) =>{
        xstream.write(baseObjects.byte, xhr.response);
    });
    xhr.addEventListener('error', (ev: ProgressEvent) => {
        alert('error')
        return false;

        
    });
    xhr.addEventListener('progress', (ev: ProgressEvent) => {
        return false;
    });

    xhr.send(null);
    xstream.write(baseObjects.byte, c);
    xstream.write(baseObjects.int, [0x01010000, 2]);
    xstream.write(baseObjects.byte, [1, 1]);
    //var l = new Array(3);
    //var v = x.read(baseObjects.byte, l);
    //var li = new Array(3);
    //var vi = x.read(baseObjects.int, li);
}
test();

