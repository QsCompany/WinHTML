export declare module my.utils {
    enum Keys {
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        esc = 27,
        enter = 13,
        ctrl = 17,
        tab = 9,
        back = 8,
        menu = 93,
        suppr = 46,
        capsLock = 20,
        shift = 16,
        f1 = 112,
        inser = 45,
        alt = 18,
        pause = 19,
        attn = 3,
        mediaNext = 176,
        mediaPrevieus = 177,
        mediaStop = 178,
        mediaPlay = 179,
        help = 255,
    }
    class delegater {
        private f1;
        private f2;
        constructor(f1: Function, f2: Function);
        static merge(f1: Function, f2: Function): Function;
        private static isDelegate(f);
        static Delete(deleg: Function, f2: Function, out?: {
            val: boolean;
        }): Function;
    }
    class out {
        public value: Object;
        constructor(value?: Object);
    }
    class _pg {
        public init: () => Object;
        public lst: Stack<Object>;
        constructor(init: () => Object, lst: Stack<Object>);
    }
    class _void {
    }
    class Garbage {
        private static _garbag;
        static Initialize(type: Function, init: () => Object): Stack<Object>;
        private static k;
        static get<T>(type: Function, out: out): T;
        static Add(type: Function, o: Object): void;
    }
}
export declare module my.controls {
    class Control {
        public pt: HTMLElement;
        private _size;
        public init: void;
        public Size : size;
        private _mxsize;
        public MaxSize : size;
        private _mnsize;
        public MinSize : size;
        public setSize(size: size, minSize: size, maxSize: size): void;
        constructor(pt: HTMLElement);
        public Movable : HTMLElement;
        private static isParent(child, parent);
        static Movable(target: HTMLElement, handle: HTMLElement): void;
        private static keydownQueeq;
        private static keydownQueeqcount;
        public OnKeyDown(fn: (sender: Control, e: KeyboardEvent) => void): void;
        private static focused;
        static startListening(): void;
    }
    class Spliter extends Control {
        public roomLeft: HTMLLIElement;
        public roomRight: HTMLLIElement;
        public Splliter: HTMLLIElement;
        constructor();
    }
    class GroupBox extends Control {
        public title: HTMLSpanElement;
        public content: HTMLDivElement;
        public textTitle: Text;
        public Title : string;
        constructor(title?: string);
    }
    class TopPage extends Control {
        private _head;
        private _content;
        private _title;
        private items;
        constructor();
        public setTitle(index: number, name: string): void;
        private selectedItem;
        public appendTab(name: string): KeyValue<HTMLElement, HTMLElement>;
        public remove(index: number): boolean;
        public select(index: number): boolean;
        public add(index: number, el: HTMLElement): boolean;
    }
    class TabPanel {
        public Tab: HTMLLIElement;
        public Panel: HTMLDivElement;
        constructor(Tab: HTMLLIElement, Panel: HTMLDivElement);
    }
    class LayoutItem extends Control {
        public head: HTMLDivElement;
        public content: HTMLDivElement;
        public rigth: HTMLDivElement;
        public left: HTMLDivElement;
        public main: HTMLDivElement;
        public lefthead: HTMLAnchorElement;
        public leftbody: HTMLDivElement;
        public righthead: HTMLAnchorElement;
        public rightbody: HTMLDivElement;
        private _title;
        private _leftHead;
        private _rigthHead;
        public Title : string;
        public leftTitle : string;
        public rightTitle : string;
        public leftDetail : string[];
        public rightDetail : string[];
        public Content : HTMLElement;
        constructor();
    }
    class FlowLayout extends Control {
        private items;
        public paddingHorizontal: number;
        public paddingVertical: number;
        constructor();
        public add(item: LayoutItem, index?: number): void;
    }
    class MetroLayout extends Control {
        private moy;
        constructor();
        public add(item: HTMLElement): void;
        public selectedIndexes: number[];
        public selectedItem: HTMLElement;
        private activeItem;
        public deselect(index: number): void;
        public select(index: number, multiselect: boolean): void;
        public setActive(item: HTMLElement): void;
        public multiSelect: boolean;
        public nonSelect(i: HTMLElement): void;
        public setSelect(i: HTMLElement): void;
    }
    class TabPage extends Control {
        private static garbage;
        private children;
        private runtabs;
        private run_panels;
        private _select;
        public SelectedTab : TabPanel;
        static Parse(p: HTMLElement): TabPage;
        constructor(pt: HTMLElement, parse?: boolean);
        private Parse();
        public SelectOne(): void;
        public SelectAt(i: number): boolean;
        public AddTab(head: Node, panel: Element): void;
        private selectTP(tp);
        public Select(t: any): boolean;
    }
    class boxInfo {
        public name: string;
        public iconClass: string;
        public title: string;
        constructor(name: string, iconClass: string, title?: string);
    }
    class box {
        private static Boxes;
        public close: boolean;
        public min: boolean;
        public max: boolean;
        public restore: boolean;
        public top: boolean;
        constructor(param: string);
        static GetInfo(bname: string): boxInfo;
        static Add(name: string, iconClass: string, title?: string): void;
    }
    class size {
        public width: string;
        public height: string;
        constructor(width: string, height: string);
    }
    class Dialog extends Control {
        public box: box;
        private static dialogs;
        private static czindex;
        constructor(pt: HTMLElement);
        static Focuson(diag: Dialog): void;
        private pointIsInRect(px, py, x, y, w, h);
        /**
        @(parms x y w h) outside rect
        @(parms x1 y1 w1 h1) inside rect
        */
        private isIn(x, y, w, h, x1, y1, w1, h1, px, py);
        private isSizing;
        private onMouseEnter(e);
        private gettitle(cont);
        private getbbox(i, bname);
        public getBarTitle(): HTMLDivElement;
        public getContentPanel(): HTMLDivElement;
        private swapTitle();
        static i: number;
        public swapDialog(): void;
        public Parse(): void;
    }
    class ColumnData {
        public name: string;
        private getcellulNode;
        public head: Node;
        constructor(name: string, getcellulNode: (dataRow: any, column: ColumnData) => Node, head?: Node);
        public getCellulNode(dataRow: any): Node;
        public getCell(dataRow: any): Node;
    }
    class Row extends Control {
        public data: Object;
        constructor(pt: HTMLElement);
    }
    var hSP: any;
    class Table extends Control {
        private scroll;
        private getNewRow;
        private columns;
        private rows;
        private header;
        private table;
        private static isSafe;
        private onKeyDown(sender, e);
        constructor(pt: HTMLElement, scroll: HTMLElement, getNewRow?: (index: number) => HTMLElement);
        public addColumn(column: ColumnData): void;
        private selectedRow;
        private addNewRow();
        private selectedIndex;
        private getIndexOf(row);
        static sIVIN: boolean;
        private select(row);
        public addRow(data: any, addCellToRow: (row: HTMLElement, data: Object, column: ColumnData) => void): void;
        static Standard(pt: HTMLElement, scroll: HTMLElement): void;
    }
    class CardVisit {
        constructor(fb: Mesure, fr: Mesure, bsv: Mesure, $ff: Mesure[], $bf: Mesure[]);
    }
}
export declare module my.data {
    class sql {
        private openRequest;
        private db;
        public isConnected: boolean;
        constructor(libraryName: any);
    }
}
export declare function main(): any;
