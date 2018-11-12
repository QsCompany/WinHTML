declare enum accessType {
    None = 0,
    Read = 1,
    Write = 2,
    ReadWrite = 3,
    seeckable = 4,
}
declare enum seekType {
    Begin = 0,
    End = 1,
}
declare enum baseObjects {
    byte = 1,
    ubyte = 2,
    short = 3,
    ushort = 4,
    int = 5,
    uint = 6,
    float = 7,
    double = 8,
}
declare var getsize: (bo: baseObjects) => number;
declare class exdv {
    byteLength: number;
    bufferOffset: number;
    buffer: DataView;
    curso_write: number;
    curso_read: number;
    constructor(byteLength: number, bufferOffset?: number, buffer?: DataView);
    reset(zeromem: boolean): void;
    zeroMemory(): void;
    get(curso: number, type: baseObjects): number;
    set(curso: number, value: number, type: baseObjects): void;
}
declare class streamStat {
    reader: exdv;
    writter: exdv;
    readercursor: any;
    writtercurrsor: any;
    starttime: Date;
    endtime: Date;
    notactive: number;
    constructor(reader: exdv, writter: exdv);
    newVisite(reader: exdv, writter: exdv): boolean;
}
declare class stream {
    private capacity;
    private static buffers_garbage;
    private getBuffer(cap, zeromem?);
    private static dispose(array);
    private accesstype;
    private reader;
    private writter;
    private arraybuffer;
    adjustable: boolean;
    Writtable: boolean;
    Readable: boolean;
    Seekable: boolean;
    ReaderPosition: number;
    WritterPosition: number;
    Optimize(tobufferoptimize?: number): void;
    /**
    * Seek to written region data stream
    */
    private seek_writtendata(offset);
    private internal_seek(offset);
    /**
    * seek between data in the stream only.
    */
    seek(offset: number, mode: seekType): boolean;
    private internal_expand_write(by);
    Position: number;
    constructor(accessType: accessType, capacity?: number);
    private static tempexdv;
    private readbetween(from, to, type, size);
    read(type: baseObjects, array: any[], start?: number, count?: number): number;
    SpeedUP: boolean;
    writebuferarray(array: ArrayBuffer, start?: number, count?: number): void;
    write(type: baseObjects, array: any[], start?: number, count?: number): void;
    private currentT;
    private thisread;
    private streamStat;
    private nonresponse;
    private dispacheCallBackRead();
    syncread(callback: (read: (type: baseObjects, array: any[], start: number, count: number) => void) => boolean): void;
    private callbackreads;
}
declare var xstream: stream;
declare function test(): void;
