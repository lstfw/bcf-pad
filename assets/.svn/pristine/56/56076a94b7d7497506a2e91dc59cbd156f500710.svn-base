var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        kjxxList: cc.Node,
        kjxx_pk10: cc.Prefab,
        choiceSF: {
            default: [],
            type: cc.SpriteFrame
        },
        choiceBtn: cc.Prefab,
        choiceList: cc.Node,
        packs: {
            default: [],
            type: cc.Node
        },
        packLists: {
            default: [],
            type: cc.Node
        },
        startPosition: 362.5,
        moveRange: 748,
        moveObjW: 46,
        PK10BtnSFDef: {
            default: [],
            type: cc.SpriteFrame
        },
        PK10Btn: cc.Prefab,
        tip: cc.Prefab,
        canvas: cc.Node,
        bet: cc.Node,
        icons: {
            default: [],
            type: cc.SpriteFrame
        },
        icon: cc.Sprite,
        homeBtnGroups: {
            default: [],
            type: cc.Node
        },

        head: cc.Node,
        noteList: cc.Node,
        noteItem_pk10: cc.Prefab,
        nubListC: cc.Node,
        totalAmountL: cc.Label,
        totalBetNumL: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.setAttr();
        this.addKjxx();
        this.addChoiceBtn();
        this.addBtnS();
        this.addTip();
        this.noteList.getComponent('noteList').init(this);

    },

    //属性设置
    setAttr: function () {

        //小玩法按钮实例
        this.choiceBtns = [];
        this.PK10BtnS = [];


        //玩法类型
        this.betType = [5, 0];


        this.selectionData = [];
        //多注数据
        this.noteListData = {
            betType: 'PK10',
            stage: 0,
            totalAmount: 0,
            totalBetNum: 0,
            chaseStage: 1,
            betNumSelectionData: [],
        };
    },

    //添加提示弹窗
    addTip: function () {
        var tip = cc.instantiate(this.tip);
        this.tipModule = tip.getComponent('tip');
        this.canvas.addChild(tip);
    },


    //弹出提示
    tipShow: function (data) {
        this.tipModule.init(data, this);
        this.tipModule.show();
    },

    //弹窗层以下所有按钮不可点
    toggleHomeBtns: function (enable) {
        for (var i = 0; i < this.homeBtnGroups.length; ++i) {
            var group = this.homeBtnGroups[i];
            if (!enable) {
                cc.eventManager.pauseTarget(group, true);
            } else {
                cc.eventManager.resumeTarget(group, true);
            }
        }
    },


    //设置玩法标题
    setIcon: function (n) {
        this.icon.spriteFrame = this.icons[n];
    },


    //添加开奖信息
    addKjxx: function () {
        var data = dataConfig.KjxxData_PK10;
        for (var i = 0; i < data.length; i++) {
            var kjxx_pk10 = cc.instantiate(this.kjxx_pk10);
            var kjxx_pk10M = kjxx_pk10.getComponent('kjxx_pk10');
            kjxx_pk10M.init(data[i])
            this.kjxxList.addChild(kjxx_pk10);

        }
    },

    //添加小玩法按钮
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
        this.choiceBtns[0].setBg(0);
    },

    //点击事件添加
    addEventChoiceBtn: function (choiceBtn) {
        var self = this
        choiceBtn.on('touchend', function (event) {
            var choiceBtn = event.target,
                choiceBtnN = choiceBtn.getComponent('choice_btn'),
                index = choiceBtn.getSiblingIndex();
            self.showPack(index + 1);
            self.delBg(self.choiceBtns);
            choiceBtnN.setBg(0);
            self.delBtnS(self.PK10BtnS);
        }, this);
    },

    //背景清除函数
    delBg: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].setBg(1);
        }
    },

    //显示指定的界面
    showPack: function (index) {
        var packs = this.packs;
        var start = this.positionReckon(index),
            intervalL = this.positionReckon(index) + 19;
        this.setIcon(index - 1);
        for (var i = 0; i < packs.length; i++) {
            var packN = packs[i].getComponent('xkMoveTo'),
                pack = packs[i];
            if (i < index) {
                pack.active = true;
                pack.runAction(packN.moveTo(start, 0));
                start = start + intervalL;
            } else {
                pack.active = false;
                pack.setPosition(this.startPosition, 0);
            }
        }
        this.betType[1] = index - 1;
    },

    //位置计算
    positionReckon: function (n) {
        var intervalL;
        intervalL = (this.moveRange - this.moveObjW * n / 2) / (n + 1);
        return intervalL;
    },

    //添加按钮界面
    addBtnS: function () {
        var packLists = this.packLists,
            PK10BtnSFDef = this.PK10BtnSFDef;
        for (var i = 0; i < packLists.length; i++) {
            for (var y = 0; y < PK10BtnSFDef.length; y++) {
                var PK10Btn = cc.instantiate(this.PK10Btn);
                var PK10BtnN = PK10Btn.getComponent('pk10_btn');
                this.addEventPK10Btn(PK10Btn);
                PK10BtnN.setText(PK10BtnSFDef[i], i);
                packLists[i].addChild(PK10Btn);
            }
        }
    },
    //添加按钮点击事件
    addEventPK10Btn: function (btn) {
        btn.on('touchend', function (event) {
            var seedWFType = this.betType[1];
            if (seedWFType < 4 && seedWFType > 0) {
                this.sameCheck(event);
            } else {
                this.sameRadio(event);
            }
            this.betTypeJudge();
        }, this);
    },

    //多选数据设置
    setSelectionData: function () {
        for (var i = 0; i < this.betType[1] + 1; i++) {
            this.selectionData[i] = [];
        }
    },

    //清除已选中按钮
    delBtnS: function (btns) {
        var bet = this.bet.getComponent('betType')

        for (var i = 0; i < btns.length; i++) {
            var btnN = btns[i],
                id = btnN.id;
            btnN.setBg(1, id);
        }
        this.PK10BtnS = [];
        this.selectionData = [];
        if (this.betType[1] < 4 && this.betType[1] > 0) {
            this.setSelectionData();
        }
        bet.setBetNub();
    },

    //同号多选
    sameCheck: function (event) {
        var btn = event.target,
            btnN = btn.getComponent('pk10_btn'),
            index = btn.getSiblingIndex() + 1,
            type = btnN.type,
            id = btnN.id,
            data = this.selectionData,
            PK10BtnS = this.PK10BtnS;

        if (data[id].indexOf(index) !== -1) {
            data[id].splice(data.indexOf(index), 1);
            PK10BtnS.splice(PK10BtnS.indexOf(btnN), 1);
            btnN.setBg(1, id);
        } else {
            data[id].push(index);
            PK10BtnS.push(btnN);
            btnN.setBg(type, id);
        }
    },


    //同号单选
    sameRadio: function (event) {
        var btn = event.target,
            btnN = btn.getComponent('pk10_btn'),
            index = btn.getSiblingIndex() + 1,
            type = btnN.type,
            id = btnN.id,
            data = this.selectionData,
            PK10BtnS = this.PK10BtnS;


        if (data.indexOf(index) !== -1) {
            if (PK10BtnS.indexOf(btnN) !== -1) {
                data.splice(data.indexOf(index), 1);
                PK10BtnS.splice(PK10BtnS.indexOf(btnN), 1);
                btnN.setBg(1, id);
            } else {
                this.tipShow('不能选择重复号码')
            }
        } else {
            data.push(index);
            PK10BtnS.push(btnN);
            btnN.setBg(type, id);
        }
    },

    //玩法注数计算

    betTypeJudge: function () {
        var data = this.selectionData;
        var bet = this.bet.getComponent('betType');
        var seedWFType = this.betType[1];
        if (seedWFType === 0) {
            var dataOL = data.length;
            if (dataOL > 0) {
                bet.zhSf(data, 1);
            } else {
                bet.setBetNub();
            }
        } else if (seedWFType === 1) {
            var total = 0;
            var a = data[0],
                b = data[1];
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    if (a[i] != b[j])
                        if (b[j] != a[i]) {
                            total++;
                        }
                }
            }
            bet.setBetNub(total);
        } else if (seedWFType === 2) {
            var total = 0;
            var a = data[0],
                b = data[1],
                c = data[2];
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    for (var k = 0; k < c.length; k++) {
                        if (a[i] != b[j] && a[i] != c[k])
                            if (c[k] != a[i] && c[k] != b[j])
                                if (b[j] != a[i] && b[j] != c[k]) {
                                    total++;
                                }
                    }
                }
            }
            bet.setBetNub(total);
        } else if (seedWFType === 3) {
            var total = 0;
            var a = data[0],
                b = data[1],
                c = data[2],
                d = data[3];
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    for (var k = 0; k < c.length; k++) {
                        for (var l = 0; l < d.length; l++) {
                            if (d[l] != c[k] && d[l] != b[j] && d[l] != a[i])
                                if (a[i] != b[j] && a[i] != c[k] && a[i] != d[l])
                                    if (c[k] != a[i] && c[k] != b[j] && c[k] != d[l])
                                        if (b[j] != a[i] && b[j] != c[k] && b[j] != d[l]) {
                                            total++;
                                        }
                        }
                    }
                }
            }
            bet.setBetNub(total);
        } else if (seedWFType + 1 === data.length) {
            bet.setBetNub(1);
        } else {
            bet.setBetNub();
        }


    },


    //获取单注数据
    getNoteOneData: function () {
        var seedWFType = this.betType[1];
        var noteOneData = {
            amountInf: '',
            selectionData: [],
            betType: '',
            stageInf: '',
            multipleNum: 0,
            betNum: 0,
            price: 0,

        }
        var bet = this.bet.getComponent('betType');
        var head = this.head.getComponent('headUIBar');

        if (seedWFType === 0) {
            noteOneData.betType = '猜冠军';
        } else if (seedWFType === 1) {
            noteOneData.betType = '猜亚军';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前三名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前四名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前五名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前六名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前七名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前八名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前九名';
        } else if (seedWFType === 0) {
            noteOneData.betType = '猜前十名';
        }
        noteOneData.stage = head.qh.string;
        noteOneData.amountInf = bet.betInfo.string;
        noteOneData.multipleNum = bet.multipleNum;
        noteOneData.betNum = bet.betNum;
        noteOneData.price = (bet.multipleNum * bet.betNum * bet.price);
        noteOneData.selectionData = this.selectionData.slice(0);


        return noteOneData;


    },


    //获取总数据
    getNoteListData: function () {
        var betNumSelectionData = this.noteListData.betNumSelectionData;
        var totalAmount = 0;
        var totalBetNum = 0;


        if (betNumSelectionData.length > 0) {
            for (var i = 0; i < betNumSelectionData.length; i++) {
                totalAmount += betNumSelectionData[i].price;
                totalBetNum += betNumSelectionData[i].betNum;
            }

            this.noteListData.stage = betNumSelectionData[0].stage.slice(3);
        }

        this.noteListData.totalAmount = totalAmount;
        this.noteListData.totalBetNum = totalBetNum;

        this.refreshNoteList();
    },


    //刷新列表信息
    refreshNoteList: function () {
        this.totalAmountL.string = '共' + this.noteListData.totalAmount + '元'
        this.totalBetNumL.string = this.noteListData.totalBetNum + '注' + this.noteListData.chaseStage + '期'
    },


    //立即投注
    instantlyBet: function () {
        var bet = this.bet.getComponent('betType');
        var noteOneData = this.getNoteOneData();
        var noteList = this.noteList.getComponent('noteList');
        var noteItem_pk10 = cc.instantiate(this.noteItem_pk10);
        var noteItem_pk10N = noteItem_pk10.getComponent('noteitme_pk10');

        if (bet.betNum > 0) {
            noteItem_pk10N.init(noteOneData, this.noteListData.betType);
            this.nubListC.addChild(noteItem_pk10);
            this.noteListData.betNumSelectionData.push(noteOneData);
            this.getNoteListData();
            noteList.show();
            this.delBtnS(this.PK10BtnS);
        } else {
            this.tipShow('请至少选择1注号码投注');
        }
    },


    //删除一行
    delLine: function (i) {
        this.noteListData.betNumSelectionData.splice(i, 1);
        this.getNoteListData();
    },


});
