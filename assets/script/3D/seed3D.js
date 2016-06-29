var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        choiceSF: {
            default: [],
            type: cc.SpriteFrame
        },
        choiceBtn: cc.Prefab,
        choiceList: cc.Node,
        ballLists: {
            default: [],
            type: cc.Node,
        },
        pack1Ball: 10,
        ball: cc.Prefab,
        bxList: cc.Node,
        digits: {
            default: [],
            type: cc.Node,
        },
        tools: {
            default: [],
            type: cc.Node,
        },
        label: cc.Node,
        packs: {
            default: [],
            type: cc.Node,
        },
        splitLine: {
            default: [],
            type: cc.Node,
        },


    },

    onLoad: function () {
        this.setAttr();
        this.addChoiceBtn();
        this.pick1AddBall();

    },

    //属性设置
    setAttr: function () {

        //小玩法按钮实例
        this.choiceBtns = [];

        this.ballBs = [];
        this.ballSs = [];
        this.ballGs = [];
        //全部选中的球
        this.ballS = [];

        //玩法类型
        this.betType = [5, 0];


        this.selectionData = [[], [], []];
        //多注数据
        this.noteListData = {
            betType: '3D',
            stage: 0,
            totalAmount: 0,
            totalBetNum: 0,
            chaseStage: 1,
            betNumSelectionData: [],
        };
    },

    //添加玩法选择
    addChoiceBtn: function () {
        var choiceSFDef = this.choiceSF;
        for (var i = 0; i < choiceSFDef.length; i++) {
            var choiceBtn = cc.instantiate(this.choiceBtn);
            var choiceBtnN = choiceBtn.getComponent('choice_btn');
            this.choiceBtns.push(choiceBtnN);
            this.addEventChoiceBtn(choiceBtn);
            choiceBtnN.init(choiceSFDef[i]);
            this.choiceList.addChild(choiceBtn);
        }
        this.choiceBtns[6].setBg(0);
    },

    //点击事件添加
    addEventChoiceBtn: function (choiceBtn) {
        var self = this
        choiceBtn.on('touchend', function (event) {
            var choiceBtn = event.target,
                choiceBtnN = choiceBtn.getComponent('choice_btn'),
                index = choiceBtn.getSiblingIndex();
            self.delBg(self.choiceBtns);
            self.choiceRoute(index);
            choiceBtnN.setBg(0);
        }, this);
    },

    //背景清除函数
    delBg: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].setBg(1);
        }
    },

    //玩法选择路由
    choiceRoute: function (n) {

        switch (n) {
            case 0:
                this.packShow({b: 1, s: 1, g: 1, t: 1, bx: 0, bq: 1, pack: 0, line: 1});
                break;
            case 1:
                this.packShow({b: 1, s: 1, g: 1, t: 1, bx: 0, bq: 1, pack: 0, line: 1});
                break;
            case 2:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 3:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 4:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 5:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 6:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 7:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 8:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 9:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
            case 10:
                this.packShow({b: 1, s: 0, g: 0, t: 1, bx: 0, bq: 0, pack: 0, line: 0});
                break;
        }
    },


    //玩法界面显示  1表示显示  0表示不显示  b表示百位   s表示十位 g表示个位 t表示工具栏 bx表示包选导航
    packShow: function (config) {
        var digits = this.digits;
        var b = config.b === 1 ? true : false,
            s = config.s === 1 ? true : false,
            g = config.g === 1 ? true : false,
            t = config.t === 1 ? true : false,
            bx = config.bx === 1 ? true : false,
            bq = config.bq === 1 ? true : false,
            pack = config.pack,
            line = config.line === 1 ? true : false;

        //百十个位
        digits[0].active = b;
        digits[1].active = s;
        digits[2].active = g;
        //包选菜单
        this.bxList.active = bx;
        //百位标签
        this.label.active = bq;
        for (var i = 0; i < this.tools.length; i++) {
            this.tools[i].active = t;
        }
        for (var i = 0; i < this.packs.length; i++) {
            if (i == pack) {
                this.packs[pack].active = true;
            } else {
                this.packs[i].active = false;
            }
        }

        for (var i = 0; i < this.splitLine.length; i++) {
            this.splitLine[i].active = line;
        }


    },


    //添加界面1的球
    pick1AddBall: function () {
        for (var y = 0; y < this.ballLists.length; y++) {
            for (var i = 0; i < this.pack1Ball; i++) {
                var ball = cc.instantiate(this.ball);
                var miss = Utils.getRandomNum(0, 50);
                ball.getComponent('pickBall').setNub(i, miss);
                this.ballLists[y].addChild(ball);
            }
        }

    },


});
