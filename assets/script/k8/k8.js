var Utils = require('Utils');
var dataConfig = require('DataConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        yqs: {
            default: [],
            type: cc.Node
        },
        yqBtnSF: {
            default: [],
            type: cc.SpriteFrame
        },
        packs: {
            default: [],
            type: cc.Node
        },
        yqSon: cc.Prefab,
        pack1YqSonSFDef: {
            default: [],
            type: cc.SpriteFrame
        },
        pack1YqSonSFDown: {
            default: [],
            type: cc.SpriteFrame
        },
        pack1BallList: cc.Node,
        pack1yqSonList: cc.Node,
        ball: cc.Prefab,
        tip: cc.Prefab,
        ballNub: 80,
        canvas: cc.Node,
        bet: cc.Node,

        pack2YqSonSFDef: {
            default: [],
            type: cc.SpriteFrame
        },
        pack2YqSonSFDown: {
            default: [],
            type: cc.SpriteFrame
        },
        pack3YqSonSFDef: {
            default: [],
            type: cc.SpriteFrame
        },
        pack3YqSonSFDown: {
            default: [],
            type: cc.SpriteFrame
        },
        pack2BallList: cc.Node,
        pack3BallList: cc.Node,
        pack6BallList: cc.Node,
        pack2yqSonList: cc.Node,
        pack3yqSonList: cc.Node,
        pack2Tools: {
            default: [],
            type: cc.Node
        },
        pack2ToolXks: {
            default: [],
            type: cc.Node
        },
        pack6Tool: cc.Node,
        pack6ToolText: {
            default: [],
            type: cc.String
        },
        toolBtn: cc.Prefab,
        toolText: {
            default: [],
            type: cc.String
        },
        pack6ToolXk: cc.Node,

        pack6XKSF: {
            default: [],
            type: cc.SpriteFrame
        },
        pack6XK: cc.Sprite,
        kjxx_K8: cc.Prefab,
        kjxxList: cc.Node,

        icons: {
            default: [],
            type: cc.SpriteFrame
        },
        icon: cc.Sprite,
        texts: {
            default: [],
            type: cc.String
        },
        text: cc.Label,
        packBallGroups: cc.Node,
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

    onLoad: function () {
        this.setAttr();
        this.setZIndex(0);
        this.addEventYqs();
        this.addPack1YqSon();
        this.pack1AddBall();
        this.addTip();
        this.addToolBtn();
        this.addKjxx();
        this.noteList.getComponent('noteList').init(this);

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

    //设置玩法标题
    setIcon: function (n) {
        this.icon.spriteFrame = this.icons[n];
        this.text.string = this.texts[n];
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


    //添加开奖信息
    addKjxx: function () {
        var data = dataConfig.k8Kjxxdata;
        for (var i = 0; i < data.length; i++) {
            var kjxx_K8 = cc.instantiate(this.kjxx_K8);
            var kjxx_K8M = kjxx_K8.getComponent('kjxx_K8');
            kjxx_K8M.init(data[i])
            this.kjxxList.addChild(kjxx_K8);

        }
    },


    //属性重置
    setAttr: function () {
        //玩法类型
        this.betType = [0, 0];
        //界面1子页签实例
        this.pack1yqSons = [];
        this.pack2yqSons = [];
        this.pack3yqSons = [];
        //界面球的实例
        this.pack1Balls = [];
        this.pack2Balls = [];
        this.pack3Balls = [];
        this.pack6Balls = [];
        //行选按钮实例
        this.dxBtns = [];


        //选中数据
        this.selectionData = [];

        //多注数据
        this.noteListData = {
            betType: '快乐8',
            stage: 0,
            totalAmount: 0,
            totalBetNum: 0,
            chaseStage: 1,
            betNumSelectionData: [],
        };
    },


    //页签深度以及背景设置
    setZIndex: function (n) {
        var yqs = this.yqs,
            pack = this.packs;

        for (var i = 0; i < yqs.length; i++) {
            var yqSF = yqs[i].getComponent(cc.Sprite);
            if (i == n) {
                yqSF.spriteFrame = this.yqBtnSF[0];
                yqs[i].zIndex = 1;
                pack[i].active = true;
            } else {
                yqs[i].zIndex = 0;
                yqSF.spriteFrame = this.yqBtnSF[1];
                pack[i].active = false;

            }
        }
    },

    //添加多个页签点击事件
    addEventYqs: function (n) {
        var yqs = this.yqs;
        for (var i = 0; i < yqs.length; i++) {
            this.addEventYq(yqs[i]);
        }
    },


    //添加页签点击事件
    addEventYq: function (yq) {
        var self = this
        yq.on('touchend', function (event) {
            var yq = event.target,
                index = yq.getSiblingIndex();
            self.setZIndex(index);
            self.yqRoute(index);
        }, this);
    },
    //页签路由
    yqRoute: function (n) {
        this.betType[0] = n;
        this.betType[1] = 0;
        var pack1Balls = this.pack1Balls,
            pack2Balls = this.pack2Balls,
            pack3Balls = this.pack3Balls;
        this.delBall(pack1Balls);
        this.delBall(pack2Balls);
        this.delBall(pack3Balls);
        this.setYqBg(0);
        this.setIcon(n)


        this.delToolBtnBg(this.dxBtns);
        this.hideTool();


    },

    //界面1,2子页签添加
    addPack1YqSon: function () {
        var pack1YqSonSFDef = this.pack1YqSonSFDef,
            pack1YqSonSFDown = this.pack1YqSonSFDown,
            pack2YqSonSFDef = this.pack2YqSonSFDef,
            pack2YqSonSFDown = this.pack2YqSonSFDown,
            pack3YqSonSFDef = this.pack3YqSonSFDef,
            pack3YqSonSFDown = this.pack3YqSonSFDown;
        for (var i = 0; i < pack1YqSonSFDef.length; ++i) {
            var pack1yqSon = cc.instantiate(this.yqSon),
                pack2yqSon = cc.instantiate(this.yqSon);
            this.pack1yqSons.push(pack1yqSon);
            this.pack2yqSons.push(pack2yqSon);
            if (i == 0) {
                pack1yqSon.getComponent(cc.Sprite).spriteFrame = pack1YqSonSFDef[i];
                pack2yqSon.getComponent(cc.Sprite).spriteFrame = pack2YqSonSFDef[i];
            } else {
                pack1yqSon.getComponent(cc.Sprite).spriteFrame = pack1YqSonSFDown[i];
                pack2yqSon.getComponent(cc.Sprite).spriteFrame = pack2YqSonSFDown[i];
            }

            this.addEventYqSon(pack1yqSon);
            this.addEventYqSon(pack2yqSon);
            this.pack1yqSonList.addChild(pack1yqSon);
            this.pack2yqSonList.addChild(pack2yqSon);

            if (i < 4) {
                var pack3yqSon = cc.instantiate(this.yqSon);
                this.pack3yqSons.push(pack3yqSon);
                if (i == 0) {
                    pack3yqSon.getComponent(cc.Sprite).spriteFrame = pack3YqSonSFDef[i];
                } else {
                    pack3yqSon.getComponent(cc.Sprite).spriteFrame = pack3YqSonSFDown[i];
                }
                this.addEventYqSon(pack3yqSon);
                this.pack3yqSonList.addChild(pack3yqSon);
            }


        }
    },
    //添加子页签点击事件
    addEventYqSon: function (yq) {
        var self = this
        yq.on('touchend', function (event) {
            var yq = event.target,
                index = yq.getSiblingIndex();
            self.setYqBg(index);
            self.yqSonRoute(index);
        }, this);
    },

    //子页签背景 以及提示设置
    setYqBg: function (n) {
        var seedWFType = this.betType[0];
        var x, yqSons = this.pack1yqSons;
        var YqSonSFDef = this.pack1YqSonSFDef,
            YqSonSFDown = this.pack1YqSonSFDown;
        this.setIcon(n + 6);
        if (seedWFType == 1) {
            YqSonSFDef = this.pack2YqSonSFDef;
            YqSonSFDown = this.pack2YqSonSFDown;
            yqSons = this.pack2yqSons;
            this.setIcon(n + 16);

        } else if (seedWFType == 2) {
            YqSonSFDef = this.pack3YqSonSFDef;
            YqSonSFDown = this.pack3YqSonSFDown;
            yqSons = this.pack3yqSons;
            this.setIcon(n + 26);
        }
        for (x in yqSons) {
            var yqBg = yqSons[x].getComponent(cc.Sprite);
            if (x == n) {
                yqBg.spriteFrame = YqSonSFDef[x];
            } else {
                yqBg.spriteFrame = YqSonSFDown[x];
            }
        }
    },

    //子页签路由
    yqSonRoute: function (n) {
        var pack1Balls = this.pack1Balls,
            pack2Balls = this.pack2Balls,
            pack3Balls = this.pack3Balls,
            pack6xk = this.pack6ToolXk;
        this.betType[1] = n;
        this.delBall(pack1Balls);
        this.delBall(pack2Balls);
        this.delBall(pack3Balls);
        this.delToolBtnBg(this.dxBtns);
        pack6xk.active = false;


        if (this.betType[0] == 1) {
            if (this.betType[1] > 5) {
                this.hideTool();
                this.togglePackBall(false);
                this.showTool(this.betType[1]);
            } else {
                this.hideTool();
                this.togglePackBall(true);
            }
        }

    },

    //工具栏和选框隐藏
    hideTool: function () {
        var pack2Tools = this.pack2Tools,
            pack2ToolXks = this.pack2ToolXks,
            pack6xk = this.pack6ToolXk;
        for (var i = 0; i < pack2Tools.length; ++i) {
            pack2Tools[i].active = false;
            pack2ToolXks[i].active = false;
        }
        pack6xk.active = false;
    },

    //工具栏按钮添加
    addToolBtn: function () {
        for (var i = 1; i < 11; ++i) {
            var toolBtn = cc.instantiate(this.toolBtn);
            var toolBtnL = cc.instantiate(this.toolBtn);
            var toolBtnH = cc.instantiate(this.toolBtn);


            var toolBtnN = toolBtn.getComponent('toolBtn');
            var toolBtnNL = toolBtnL.getComponent('toolBtn');
            var toolBtnNH = toolBtnH.getComponent('toolBtn');


            toolBtnN.setNub(this.toolText[i - 1]);
            toolBtnNL.setNub(i);

            this.addToolEvent(1, toolBtnL);
            this.pack2Tools[1].addChild(toolBtnL);

            this.dxBtns.push(toolBtnL);
            this.dxBtns.push(toolBtn);


            if (i < 5) {
                this.addToolEvent(2, toolBtn);
                this.pack2Tools[2].addChild(toolBtn);
                var toolBtnPack6 = cc.instantiate(this.toolBtn);
                var toolBtnNPack6 = toolBtnPack6.getComponent('toolBtn');
                toolBtnNPack6.setNub(this.pack6ToolText[i - 1]);
                this.dxBtns.push(toolBtnPack6);
                this.addToolEvent(4, toolBtnPack6);
                this.pack6Tool.addChild(toolBtnPack6);
            } else if (i > 4 && i < 10) {
                this.addToolEvent(3, toolBtn);
                this.pack2Tools[3].addChild(toolBtn);
            }
            if (i < 9) {
                this.dxBtns.push(toolBtnH);
                this.addToolEvent(0, toolBtnH);
                toolBtnNH.setNub(i);
                this.pack2Tools[0].addChild(toolBtnH);
            }
        }


    },
    //工具选择点击事件添加
    addToolEvent: function (type, toolBtn) {
        toolBtn.on('touchend', function (event) {
            this.clickTool(type, event);
        }, this);
    },

    //工具按钮点击处理
    clickTool: function (type, event) {
        var toolBtn = event.target;
        var index = toolBtn.getSiblingIndex();
        var btnSF = toolBtn.getComponent('toolBtn');
        var hxkN = this.pack2ToolXks[0].getComponent('xkMoveTo');
        var hxk = this.pack2ToolXks[0],
            lxk = this.pack2ToolXks[1],
            sHxk = this.pack2ToolXks[2],
            sLxk = this.pack2ToolXks[3],
            pack6xk = this.pack6ToolXk;
        var pack2Balls = this.pack2Balls;
        this.delToolBtnBg(this.dxBtns);
        btnSF.setBg(0);
        if (type == 0) {
            hxk.active = true;
            if (index == 0) {
                pack2Balls = pack2Balls.slice(0, 10);
                hxk.runAction(hxkN.moveToy(190));
            } else if (index == 1) {
                pack2Balls = pack2Balls.slice(10, 20);
                hxk.runAction(hxkN.moveToy(125));
            } else if (index == 2) {
                pack2Balls = pack2Balls.slice(20, 30);
                hxk.runAction(hxkN.moveToy(62));
            } else if (index == 3) {
                pack2Balls = pack2Balls.slice(30, 40);
                hxk.runAction(hxkN.moveToy(-1));
            } else if (index == 4) {
                pack2Balls = pack2Balls.slice(40, 50);
                hxk.runAction(hxkN.moveToy(-66));
            } else if (index == 5) {
                pack2Balls = pack2Balls.slice(50, 60);
                hxk.runAction(hxkN.moveToy(-130));
            } else if (index == 6) {
                pack2Balls = pack2Balls.slice(60, 70);
                hxk.runAction(hxkN.moveToy(-195));
            } else if (index == 7) {
                pack2Balls = pack2Balls.slice(70, 80);
                hxk.runAction(hxkN.moveToy(-257));
            }


        } else if (type == 1) {
            lxk.active = true;
            if (index == 0) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(-248));
            } else if (index == 1) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(-178));
            } else if (index == 2) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(-108));
            } else if (index == 3) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(-38));
            } else if (index == 4) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(32));
            } else if (index == 5) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(102));
            } else if (index == 6) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(172));
            } else if (index == 7) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(242));
            } else if (index == 8) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(312));
            } else if (index == 9) {
                pack2Balls = this.interceptArr(index, 1, pack2Balls);
                lxk.runAction(hxkN.moveTox(382));
            }

        } else if (type == 2) {
            sHxk.active = true;
            if (index == 0) {
                pack2Balls = pack2Balls.slice(0, 20);
                sHxk.runAction(hxkN.moveToy(160));
            } else if (index == 1) {
                pack2Balls = pack2Balls.slice(20, 40);
                sHxk.runAction(hxkN.moveToy(30));
            } else if (index == 2) {
                pack2Balls = pack2Balls.slice(40, 60);
                sHxk.runAction(hxkN.moveToy(-100));
            } else if (index == 3) {
                pack2Balls = pack2Balls.slice(60, 80);
                sHxk.runAction(hxkN.moveToy(-230));
            }

        } else if (type == 3) {
            sLxk.active = true;
            if (index == 0) {
                pack2Balls = this.interceptArr(index, 2, pack2Balls);
                sLxk.runAction(hxkN.moveTox(-213));
            } else if (index == 1) {
                pack2Balls = this.interceptArr(index + 1, 2, pack2Balls);
                sLxk.runAction(hxkN.moveTox(-73));
            } else if (index == 2) {
                pack2Balls = this.interceptArr(index + 2, 2, pack2Balls);
                sLxk.runAction(hxkN.moveTox(67));
            } else if (index == 3) {
                pack2Balls = this.interceptArr(index + 3, 2, pack2Balls);
                sLxk.runAction(hxkN.moveTox(205));
            } else if (index == 4) {
                pack2Balls = this.interceptArr(index + 4, 2, pack2Balls);
                sLxk.runAction(hxkN.moveTox(345));
            }
        } else {
            pack6xk.active = true;
            if (index == 0) {
                pack2Balls = [];
                this.selectionData.push('东');
                this.pack6XK.spriteFrame = this.pack6XKSF[0];
                pack6xk.runAction(hxkN.moveTo(-180, 115));
            } else if (index == 1) {
                pack2Balls = [];
                this.selectionData.push('南');
                this.pack6XK.spriteFrame = this.pack6XKSF[1];
                pack6xk.runAction(hxkN.moveTo(241, 115));
            } else if (index == 2) {
                pack2Balls = [];
                this.selectionData.push('西');
                this.pack6XK.spriteFrame = this.pack6XKSF[2];
                pack6xk.runAction(hxkN.moveTo(-180, -145));
            } else if (index == 3) {
                pack2Balls = [];
                this.selectionData.push('北');
                this.pack6XK.spriteFrame = this.pack6XKSF[3];
                pack6xk.runAction(hxkN.moveTo(241, -145));
            }
        }
        this.delBall(this.pack2Balls);
        this.toolXBall(pack2Balls);
        this.dsZSCalculate();
    },

    //工具选球
    toolXBall: function (balls) {
        for (var i = 0; i < balls.length; ++i) {
            var ballN = balls[i].getComponent('pickBall');
            var id = ballN.id;
            this.selectionData.push(id);
            ballN.setBg(0);
        }
    },
    //规律截取数组
    interceptArr: function (index, n, arr) {
        var newArr = [];
        var newArrS = [];
        for (var i = index; i < arr.length; i += 10) {
            newArrS.push(arr.slice(i, i + n));
        }
        for (var i = 0; i < newArrS.length; i++) {
            newArr = newArr.concat(newArrS[i]);
        }
        return newArr;
    },


    //幸运号多选玩法注数计算
    dsZSCalculate: function () {
        var bet = this.bet.getComponent('betType'),
            data = this.selectionData;
        var dataL = data.length;
        bet.zhSf(data, dataL);
    },


    //工具按钮选中清空
    delToolBtnBg: function (toolBtnS) {
        var bet = this.bet.getComponent('betType');
        for (var i = 0; i < toolBtnS.length; ++i) {
            var toolBtn = toolBtnS[i].getComponent('toolBtn');
            toolBtn.setBg(1);
        }
        this.selectionData = [];
        bet.setBetNub();
    },


    //工具栏和选框显示隐藏
    showTool: function (nub) {
        var pack2Tools = this.pack2Tools,
            n = nub - 6;
        pack2Tools[n].active = true;
    },
    //删除球的点击事件
    togglePackBall: function (enable) {
        var group = this.packBallGroups;
        if (!enable) {
            cc.eventManager.pauseTarget(group, true);
        } else {
            cc.eventManager.resumeTarget(group, true);
        }
    },

    //添加球的点击事件
    addBallEvent: function (balls) {
        var self = this;
        for (var i = 0; i < balls.length; ++i) {
            balls[i].on('touchend', function (event) {
                var seedWFType = this.betType[0];
                if (seedWFType == 0) {
                    self.pack1BallClick(event);
                } else if (seedWFType == 1) {
                    self.pack2BallClick(event);
                } else if (seedWFType == 2) {
                    self.pack3BallClick(event);
                }
            }, this);
        }
    },


    //球的添加
    pack1AddBall: function () {
        for (var i = 0; i < this.ballNub; ++i) {
            var pack1ball = cc.instantiate(this.ball);
            var pack1ballN = pack1ball.getComponent('pickBall');
            var pack2ball = cc.instantiate(this.ball);
            var pack2ballN = pack2ball.getComponent('pickBall');
            var pack3ball = cc.instantiate(this.ball);
            var pack3ballN = pack3ball.getComponent('pickBall');
            var pack6ball = cc.instantiate(this.ball);
            var pack6ballN = pack6ball.getComponent('pickBall');
            var miss = Utils.getRandomNum(0, 50);
            var nub = Utils.parseNum2Num(i + 1);
            this.pack1Balls.push(pack1ball);
            this.pack2Balls.push(pack2ball);
            this.pack3Balls.push(pack3ball);
            this.pack6Balls.push(pack6ball);
            pack1ballN.setNub(nub, miss);
            pack2ballN.setNub(nub, miss);
            pack3ballN.setNub(nub, miss);
            pack6ballN.setNub(nub, miss);
            this.pack1BallList.addChild(pack1ball);
            this.pack2BallList.addChild(pack2ball);
            this.pack3BallList.addChild(pack3ball);
            this.pack6BallList.addChild(pack6ball);

        }
        this.addBallEvent(this.pack1Balls);
        this.addBallEvent(this.pack2Balls);
        this.addBallEvent(this.pack3Balls);
        this.addBallEvent(this.pack6Balls);
    },


    //清空所有的球
    delBall: function (balls) {
        var bet = this.bet.getComponent('betType');
        for (var i = 0; i < balls.length; ++i) {
            var ballN = balls[i].getComponent('pickBall');
            ballN.setBg(1);
        }
        this.selectionData = [];
        bet.setBetNub();
    },

    //号码玩法 点击事件处理
    pack1BallClick: function (event) {
        var ball = event.target,
            ballN = ball.getComponent('pickBall'),
            index = ball.getSiblingIndex() + 1,
            type = ballN.type,
            bet = this.bet.getComponent('betType'),
            data = this.selectionData;
        var seedXWFType = this.betType[1];

        if (data.indexOf(index) !== -1) {
            data.splice(data.indexOf(index), 1);
        } else {
            data.push(index);
        }
        ballN.setBg(type);

        var dataL = data.length;

        if (seedXWFType === 0) {
            //任选1
            if (dataL > 0) {
                bet.zhSf(data, 1);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 1) {
            //任选2
            if (dataL > 1 && dataL < 36) {
                bet.zhSf(data, 2);
            } else if (dataL > 35) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选35个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 2) {
            //任选3
            if (dataL > 2 && dataL < 16) {
                bet.zhSf(data, 3);
            } else if (dataL > 15) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选15个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 3) {
            //任选4
            if (dataL > 3 && dataL < 13) {
                bet.zhSf(data, 4);
            } else if (dataL > 12) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选12个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 4) {
            //任选5
            if (dataL > 4 && dataL < 12) {
                bet.zhSf(data, 5);
            } else if (dataL > 11) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选11个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 5) {
            //任选6
            if (dataL > 5 && dataL < 12) {
                bet.zhSf(data, 6);
            } else if (dataL > 11) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选11个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 6) {
            //任选7
            if (dataL > 6 && dataL < 12) {
                bet.zhSf(data, 7);
            } else if (dataL > 11) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选11个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 7) {
            //任选8
            if (dataL > 7 && dataL < 13) {
                bet.zhSf(data, 8);
            } else if (dataL > 12) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选12个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 8) {
            //任选9
            if (dataL > 8 && dataL < 13) {
                bet.zhSf(data, 9);
            } else if (dataL > 12) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选12个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 9) {
            //任选10
            if (dataL > 9 && dataL < 14) {
                bet.zhSf(data, 10);
            } else if (dataL > 13) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选13个号码');
            } else {
                bet.setBetNub();
            }
        }
    },


    //幸运号 福1——福6 点击事件处理
    pack2BallClick: function (event) {
        var ball = event.target,
            ballN = ball.getComponent('pickBall'),
            index = ball.getSiblingIndex() + 1,
            type = ballN.type,
            bet = this.bet.getComponent('betType'),
            data = this.selectionData;
        var seedXWFType = this.betType[1];

        if (data.indexOf(index) !== -1) {
            data.splice(data.indexOf(index), 1);
        } else {
            data.push(index);
        }
        ballN.setBg(type);

        var dataL = data.length;


        if (seedXWFType === 0) {
            //福1
            if (dataL > 0 && dataL < 2) {
                bet.zhSf(data, 1);
            } else if (dataL > 1) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选1个号码');
                bet.zhSf(data, 1);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 1) {
            //福2
            if (dataL > 0 && dataL < 3) {
                bet.zhSf(data, 2);
            } else if (dataL > 2) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选2个号码');
                bet.zhSf(data, 2);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 2) {
            //福3
            if (dataL > 0 && dataL < 4) {
                bet.zhSf(data, 3);
            } else if (dataL > 3) {
                data.pop();
                this.tipShow('最多只能选3个号码');
                bet.zhSf(data, 3);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 3) {
            //福4
            if (dataL > 0 && dataL < 5) {
                bet.zhSf(data, 4);
            } else if (dataL > 4) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选4个号码');
                bet.zhSf(data, 4);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 4) {
            //福5
            if (dataL > 0 && dataL < 6) {
                bet.zhSf(data, 5);
            } else if (dataL > 5) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选5个号码');
                bet.zhSf(data, 5);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 5) {
            //福6
            if (dataL > 0 && dataL < 7) {
                bet.zhSf(data, 6);
            } else if (dataL > 6) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选6个号码');
                bet.zhSf(data, 6);
            } else {
                bet.setBetNub();
            }
        }


    },
    //全不中  点击事件处理
    pack3BallClick: function (event) {
        var ball = event.target,
            ballN = ball.getComponent('pickBall'),
            index = ball.getSiblingIndex() + 1,
            type = ballN.type,
            bet = this.bet.getComponent('betType'),
            data = this.selectionData;
        var seedXWFType = this.betType[1];

        if (data.indexOf(index) !== -1) {
            data.splice(data.indexOf(index), 1);
        } else {
            data.push(index);
        }
        ballN.setBg(type);

        var dataL = data.length;

        if (seedXWFType === 0) {
            //任选6
            if (dataL > 0 && dataL < 7) {
                bet.zhSf(data, 6);
            } else if (dataL > 6) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选6个号码');
                bet.zhSf(data, 6);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 1) {
            //任选8
            if (dataL > 0 && dataL < 9) {
                bet.zhSf(data, 8);
            } else if (dataL > 8) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选8个号码');
                bet.zhSf(data, 8);
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 2) {
            //任选10
            if (dataL > 0 && dataL < 11) {
                bet.zhSf(data, 10);
            } else if (dataL > 10) {
                data.pop();
                bet.zhSf(data, 10);
                this.tipShow('最多只能选10个号码');
            } else {
                bet.setBetNub();
            }
        } else if (seedXWFType === 3) {
            //任选12
            if (dataL > 0 && dataL < 13) {
                bet.zhSf(data, 4);
            } else if (dataL > 12) {
                data.pop();
                ballN.setBg(1);
                this.tipShow('最多只能选12个号码');
                bet.zhSf(data, 12);
            } else {
                bet.setBetNub();
            }
        }


    },

    //大 单
    bigClick: function () {
        var bet = this.bet.getComponent('betType');
        var seedWFType = this.betType[0];

        this.selectionData = [];
        this.selectionData.push(seedWFType == 3 ? '大' : '单');

        console.log(seedWFType, this.selectionData)
        bet.setBetNub(1);
    },
    //和
    andClick: function () {
        var bet = this.bet.getComponent('betType');
        this.selectionData = [];
        this.selectionData.push('和');
        console.log(this.selectionData)
        bet.setBetNub(1);
    },
    //小 双
    smallClick: function () {
        var bet = this.bet.getComponent('betType');
        var seedWFType = this.betType[0];
        this.selectionData = [];
        this.selectionData.push(seedWFType == 3 ? '小' : '双');
        console.log(seedWFType, this.selectionData)
        bet.setBetNub(1);
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
            this.delBall(this.pack1Balls);
            this.delBall(this.pack2Balls);
            this.delBall(this.pack3Balls);

            this.delToolBtnBg(this.dxBtns);

            if (this.betType[0] == 1) {
                if (this.betType[1] > 5) {
                    this.hideTool();
                    this.showTool(this.betType[1]);
                } else {
                    this.hideTool();
                }
            }


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
