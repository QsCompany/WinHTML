var accessType;
(function (accessType) {
    accessType[accessType["None"] = 0] = "None";
    accessType[accessType["Read"] = 1] = "Read";
    accessType[accessType["Write"] = 2] = "Write";
    accessType[accessType["ReadWrite"] = 3] = "ReadWrite";
    accessType[accessType["seeckable"] = 4] = "seeckable";
})(accessType || (accessType = {}));
var seekType;
(function (seekType) {
    seekType[seekType["Begin"] = 0] = "Begin";
    seekType[seekType["End"] = 1] = "End";
})(seekType || (seekType = {}));
var baseObjects;
(function (baseObjects) {
    baseObjects[baseObjects["byte"] = 1] = "byte";
    baseObjects[baseObjects["ubyte"] = 2] = "ubyte";
    baseObjects[baseObjects["short"] = 3] = "short";
    baseObjects[baseObjects["ushort"] = 4] = "ushort";
    baseObjects[baseObjects["int"] = 5] = "int";
    baseObjects[baseObjects["uint"] = 6] = "uint";
    baseObjects[baseObjects["float"] = 7] = "float";
    baseObjects[baseObjects["double"] = 8] = "double";
})(baseObjects || (baseObjects = {}));
var getsize = (function () {
    var i = [1, 1, 2, 2, 4, 4, 4, 8];
    return function (bo) { return i[bo]; };
})();
var exdv = (function () {
    function exdv(byteLength, bufferOffset, buffer) {
        if (bufferOffset === void 0) { bufferOffset = 0; }
        if (buffer === void 0) { buffer = new DataView(new ArrayBuffer(byteLength)); }
        this.byteLength = byteLength;
        this.bufferOffset = bufferOffset;
        this.buffer = buffer;
        this.curso_write = 0;
        this.curso_read = 0;
    }
    exdv.prototype.reset = function (zeromem) {
        this.byteLength = this.buffer.byteLength;
        this.curso_read = 0;
        this.curso_write = 0;
        this.bufferOffset = 0;
        if (zeromem)
            this.zeroMemory();
    };
    exdv.prototype.zeroMemory = function () {
        var sel = this.buffer;
        for (var i = sel.byteLength - 1; i >= 8; i -= 8)
            sel.setFloat64(i, 0);
        sel.setFloat64(0, 0.0);
    };
    exdv.prototype.get = function (curso, type) {
        switch (type) {
            case baseObjects.byte:
                return this.buffer.getInt8(curso);
            case baseObjects.ubyte:
                return this.buffer.getUint8(curso);
            case baseObjects.short:
                return this.buffer.getInt16(curso);
            case baseObjects.ushort:
                return this.buffer.getUint16(curso);
            case baseObjects.int:
                return this.buffer.getInt32(curso);
            case baseObjects.uint:
                return this.buffer.getUint32(curso);
            case baseObjects.float:
                return this.buffer.getFloat32(curso);
            case baseObjects.double:
                return this.buffer.getFloat64(curso);
        }
        return null;
    };
    exdv.prototype.set = function (curso, value, type) {
        switch (type) {
            case baseObjects.byte:
                this.buffer.setInt8(curso, value);
                break;
            case baseObjects.ubyte:
                this.buffer.setUint8(curso, value);
                break;
            case baseObjects.short:
                this.buffer.setInt16(curso, value);
                break;
            case baseObjects.ushort:
                this.buffer.setUint16(curso, value);
                break;
            case baseObjects.int:
                this.buffer.setInt32(curso, value);
                break;
            case baseObjects.uint:
                this.buffer.setUint32(curso, value);
                break;
            case baseObjects.float:
                this.buffer.setFloat32(curso, value);
                break;
            case baseObjects.double:
                this.buffer.setFloat64(curso, value);
                break;
        }
    };
    return exdv;
})();
var streamStat = (function () {
    function streamStat(reader, writter) {
        this.reader = reader;
        this.writter = writter;
        this.notactive = 0;
        this.readercursor = reader.curso_read + reader.bufferOffset;
        this.writtercurrsor = writter.curso_write + writter.bufferOffset;
        this.endtime = this.starttime = new Date();
    }
    streamStat.prototype.newVisite = function (reader, writter) {
        var ro = reader.curso_read + reader.bufferOffset;
        var wo = writter.curso_write + writter.bufferOffset;
        var ret = true;
        if (ro + 8 >= wo)
            ;
        if (ro == wo)
            ret = false;
        else if (ro == this.readercursor)
            if (wo == this.writtercurrsor)
                ret = false;
        this.reader = reader;
        this.writter = writter;
        if (!ret)
            this.notactive++;
        else
            this.notactive = 0;
        return ret;
    };
    return streamStat;
})();
var stream = (function () {
    function stream(accessType, capacity) {
        if (capacity === void 0) { capacity = 4048; }
        this.capacity = capacity;
        this.arraybuffer = new List(5);
        this.adjustable = false;
        this.SpeedUP = true;
        this.currentT = -1;
        this.accesstype = accessType;
        this.capacity = 'number' == typeof capacity ? (capacity > 0 ? (capacity + (capacity % 8 != 0 ? 8 - capacity % 8 : 0)) : 4048) : 4048;
        this.writter = this.reader = this.getBuffer(this.capacity);
        this.streamStat = new streamStat(this.reader, this.writter);
    }
    stream.prototype.getBuffer = function (cap, zeromem) {
        if (stream.buffers_garbage.length < 1)
            sel = new exdv(cap);
        else {
            var sel = stream.buffers_garbage.First;
            var j = 0;
            stream.buffers_garbage.foreach(function (k, v) {
                if (v.byteLength > cap) {
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
        sel.reset(zeromem);
        return sel;
    };
    stream.dispose = function (array) {
        array.reset(false);
        stream.buffers_garbage.push(array);
    };
    Object.defineProperty(stream.prototype, "Writtable", {
        get: function () { return (this.accesstype & 2) != 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(stream.prototype, "Readable", {
        get: function () { return (this.accesstype & 1) != 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(stream.prototype, "Seekable", {
        get: function () { return (this.accesstype & 4) != 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(stream.prototype, "ReaderPosition", {
        get: function () { return this.reader.curso_read + this.reader.bufferOffset; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(stream.prototype, "WritterPosition", {
        get: function () { return this.writter.curso_write + this.writter.bufferOffset; },
        enumerable: true,
        configurable: true
    });
    stream.prototype.Optimize = function (tobufferoptimize) {
        if (tobufferoptimize === void 0) { tobufferoptimize = -1; }
        if (tobufferoptimize == -1)
            tobufferoptimize = this.arraybuffer.indexOf(this.reader) - 1;
        for (var i = tobufferoptimize; i >= 0; i--)
            stream.dispose(this.arraybuffer.pop());
    };
    /**
    * Seek to written region data stream
    */
    stream.prototype.seek_writtendata = function (offset) {
        var _this = this;
        if (this.Position + offset >= this.writter.curso_write + this.writter.bufferOffset)
            return false;
        var ri = -1;
        var ret;
        this.arraybuffer.foreach(function (i, v) {
            if (_this.reader == v) {
                var rst = v.byteLength - _this.reader.curso_read;
                if (offset <= rst) {
                    _this.reader.curso_read += offset;
                    return ret = true;
                }
                offset -= rst;
                ri = i;
            }
            else if (ri != -1) {
                var is_currbufferwrite = v == _this.writter;
                if (is_currbufferwrite)
                    var disp = _this.writter.curso_write - 1;
                else
                    disp = v.byteLength;
                if (offset <= disp) {
                    _this.reader.curso_read = offset;
                    _this.reader = v;
                    return ret = true;
                }
                if (is_currbufferwrite)
                    return !(ret = false);
                offset -= v.byteLength;
            }
            return false;
        });
        return ret;
    };
    stream.prototype.internal_seek = function (offset) {
        if (offset < 0 || offset >= this.writter.bufferOffset + this.writter.curso_write)
            return false;
        if (offset > this.writter.bufferOffset) {
            this.reader.curso_read = offset - this.writter.bufferOffset;
            this.reader = this.writter;
            return true;
        }
        else if (Math.abs(offset - this.reader.bufferOffset) < this.reader.curso_read) {
            this.reader.curso_read = offset - this.reader.bufferOffset;
            return true;
        }
        else {
            var bi = 0;
            var bo = 0;
            var out;
            var lstbuffer;
            this.arraybuffer.foreach(function (i, v) {
                out = true;
                if (offset > bo && offset < (bo + v.byteLength))
                    return (out = true);
                bo += v.byteLength;
                lstbuffer = v;
                return false;
            });
            if (!out)
                return false;
            var foffset = offset - bo;
            if (lstbuffer == this.writter && this.writter.curso_write <= foffset)
                return false;
            if (lstbuffer == this.reader && this.reader.curso_read < foffset)
                return false;
            this.reader.bufferOffset = bo;
            this.reader.curso_read = foffset;
            this.reader = lstbuffer;
            if (this.adjustable)
                this.Optimize(bi - 1);
            return true;
        }
    };
    /**
    * seek between data in the stream only.
    */
    stream.prototype.seek = function (offset, mode) {
        switch (mode) {
            case seekType.Begin:
                if (this.adjustable)
                    return false;
                else
                    return this.internal_seek(offset);
            case seekType.End:
                if (offset < 0)
                    if (this.adjustable)
                        return false;
                    else
                        return this.internal_seek(this.reader.bufferOffset + this.reader.curso_read + offset);
                else
                    return this.seek_writtendata(offset);
        }
        return false;
    };
    stream.prototype.internal_expand_write = function (by) {
        by = by < this.capacity ? this.capacity : by;
        if (by + this.writter.curso_write <= this.writter.byteLength)
            return;
        by = by - this.writter.byteLength - this.writter.curso_write;
        by = by > this.capacity ? by : this.capacity;
        var c = new exdv(by);
        c.bufferOffset = this.writter.bufferOffset + this.writter.byteLength;
        this.arraybuffer.push(c);
    };
    Object.defineProperty(stream.prototype, "Position", {
        set: function (v) {
            if (this.Seekable)
                if (this.seek(v, seekType.Begin))
                    return;
            throw 'stream not seeckable or out of index';
        },
        enumerable: true,
        configurable: true
    });
    stream.prototype.readbetween = function (from, to, type, size) {
        if (to == null)
            return null;
        var j = 0;
        for (var i = from.curso_read; i < from.byteLength; i++, j++) {
            stream.tempexdv.buffer.setInt8(j, from.buffer.getInt8(i));
        }
        if (to.curso_write > (size - j))
            for (i = 0; j < size; j++, i++) {
                stream.tempexdv.buffer.setInt8(j, to.buffer.getInt8(i));
            }
        else
            return null;
        to.curso_read = i;
        from.curso_read = from.byteLength;
        return { val: stream.tempexdv.get(0, type), end: j };
    };
    stream.prototype.read = function (type, array, start, count) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = -1; }
        if (count < 0 || count > array.length)
            count = array.length;
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
            while (curso < to && count > 0) {
                if (curso + esize <= to)
                    array[start++] = cur.get(curso, type);
                else {
                    end = true;
                    if ((nxt = this.arraybuffer.get(++icur)) != null && (x = this.readbetween(cur, nxt, type, esize)) != null) {
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
            if (end == null)
                continue;
            else if (end || to < cur.byteLength)
                break;
            else if (count <= 0)
                break;
            // if you are here then your stream reader can't reache the end of buffer .
            //  ==> update values for next stream
            cur = this.arraybuffer.get(++icur);
            if (cur == null)
                break;
            this.reader = cur;
            curso = 0;
        } while (true);
        // update curso 
        this.reader.curso_read = curso;
        return scount - count;
    };
    stream.prototype.writebuferarray = function (array, start, count) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = -1; }
        var nexdv;
        if (count < 0 || count > array.byteLength)
            count = array.byteLength;
        nexdv = new exdv(array.byteLength, this.writter.bufferOffset + this.writter.curso_write, new DataView(array));
        nexdv.curso_write = array.byteLength;
        this.arraybuffer.push(nexdv);
        if (this.writter.curso_write == 0) {
            stream.dispose(this.writter);
            if (this.reader == this.writter)
                this.reader = nexdv;
        }
        else
            this.writter.byteLength = this.writter.curso_write;
        this.writter = nexdv;
    };
    stream.prototype.write = function (type, array, start, count) {
        if (start === void 0) { start = 0; }
        if (count === void 0) { count = -1; }
        if (count < 0 || count > array.length)
            count = array.length;
        if (array instanceof ArrayBuffer)
            return this.writebuferarray(array);
        var esize = getsize(type);
        if ((this.writter.byteLength - this.writter.curso_write) < count * esize)
            this.internal_expand_write((count - start) * esize + 80);
        var cur = this.writter;
        var icur = this.arraybuffer.indexOf(cur);
        var curso = this.writter.curso_write;
        var _pb = this.writter.bufferOffset;
        do {
            var to = cur.byteLength;
            while (curso + esize <= to && count > 0) {
                cur.set(curso, array[start], type);
                start++;
                count--;
                curso += esize;
            }
            if (count <= 0)
                break;
            // if you are here then your stream writer can't add the current value because there no space enaught .
            //  ==> resize the current stream and move to the next stream
            cur.byteLength = cur.curso_write;
            _pb += cur.curso_write;
            if (this.arraybuffer.Last == cur)
                break;
            cur = this.arraybuffer.get(++icur);
            cur.bufferOffset = _pb;
            this.writter = cur;
            curso = 0;
        } while (true);
        // update curso 
        this.writter.curso_write = curso;
    };
    stream.prototype.dispacheCallBackRead = function () { if (this.streamStat.newVisite(this.reader, this.writter))
        this.callbackreads(this.thisread); };
    stream.prototype.syncread = function (callback) {
        if (this.currentT != -1)
            throw "the handle was taken";
        setInterval(this.dispacheCallBackRead.bind(this), 100);
        this.callbackreads = callback;
        this.thisread = this.read.bind(this);
    };
    stream.buffers_garbage = new List(10);
    stream.tempexdv = new exdv(8);
    return stream;
})();
var xstream = null;
function test() {
    var c = [1, 2, 3, 0, 0, 0];
    xstream = new stream(accessType.ReadWrite, 8);
    xstream.syncread(function (read) {
        var rst = xstream.WritterPosition - xstream.ReaderPosition;
        var lm = new Array(rst < 100 ? 100 : rst / 100 >> 0);
        var xm = read(baseObjects.byte, lm, 0, lm.length);
        document.title = xstream.WritterPosition - xstream.ReaderPosition + "";
        return true;
    });
    return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './JavaScript1.js');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('loadend', function (ev) {
        xstream.write(baseObjects.byte, xhr.response);
    });
    xhr.addEventListener('error', function (ev) {
        alert('error');
        return false;
    });
    xhr.addEventListener('progress', function (ev) {
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
//# sourceMappingURL=DTH.js.map