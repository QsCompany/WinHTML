function $f(s, st) {
    return $(s, st)[0];
}
function getMenu(s) {
    return $('.menu', s)[0]
}
function getPanel(s) {
    return $('.panel', s)[0]
}
function PSlideout(menu, panel, toggle) {
    if (menu == null || panel == null) return null;
    var self = this;
    this.panel = panel;
    panel.menus = panel.menus || [];
    this.menu = menu;
    this.toggle = toggle;
    panel.menus.push(this);

    this.slideout = new Slideout({
        'panel': this.panel,
        'menu': this.menu,
        'duration': 1000
    });
    function OpenByCloseOthers(self, slides, i) {
        if (i >= slides.length) {
            self.slideout.open();
            return;
        }
        var mn = slides[i]
        if (self != mn) {
            if (mn.slideout.isOpen()) {
                var f;
                mn.slideout.on('close', f = function () {
                    mn.slideout.off('close', f);
                    OpenByCloseOthers(self, slides, i + 1);
                });
                mn.slideout.close();

                return;
            }
        }
        OpenByCloseOthers(self, slides, i + 1);
    }
    this.slideout
      .on('beforeopen', function () {
          self.menu.style.display = 'block';
          beforeopenEvent = true;
      })
      .on('open', function () {
          this.openEvent = true;
      })
      .on('beforeclose', function () {
          this.beforecloseEvent = true;
      })
      .on('close', function () {
          this.menu.style.display = 'none';
          this.closeEvent = true;
      });
    this.toggle = function () {
        if (self.slideout.isOpening()) {
            self.slideout.close();
        }
        else if (self.slideout.isClosing()) {
            self.slideout.open();
        }
        else if (self.slideout.isOpen())
            self.slideout.close();
        else
            OpenByCloseOthers(self, panel.menus, 0);
    };
    if (toggle != null)
        toggle.addEventListener('click', this.toggle);
    menu.addEventListener('click', function (eve) {
        if (eve.target.nodeName === 'A') { slideout.close(); }
    });
};

var m1 = $f('.menu1');
var m2 = $f('.menu2');

var tg1 = $f('#tg1');
var tg2 = $f('#tg2');

var pnl = getPanel();

var my = new PSlideout(m1, pnl, tg1);
var my2 = new PSlideout(m2, pnl, tg2);
