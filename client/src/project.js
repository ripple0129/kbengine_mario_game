require=function t(n,e,o){function i(c,l){if(!e[c]){if(!n[c]){var r="function"==typeof require&&require;if(!l&&r)return r(c,!0);if(s)return s(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var u=e[c]={exports:{}};n[c][0].call(u.exports,function(t){var e=n[c][1][t];return i(e?e:t)},u,u.exports,t,n,e,o)}return e[c].exports}for(var s="function"==typeof require&&require,c=0;c<o.length;c++)i(o[c]);return i}({loginClick:[function(t,n,e){"use strict";cc._RFpush(n,"fc31bfD6BtBhbvbWCWahkJL","loginClick"),cc.Class({"extends":cc.Component,properties:{accountInput:{"default":null,type:cc.EditBox},passwordInput:{"default":null,type:cc.EditBox},username:{"default":null},password:{"default":null}},onLoad:function(){},accountInputDidChanged:function(t,n){this.username=t},passwordInputDidChanged:function(t,n){this.password=t},onLoginButtonClicked:function(){KBEngine.Event.fire("login",this.username,this.password,"web-mobile")},onCreateButtonClicked:function(){KBEngine.Event.fire("createAccount",this.username,this.password,"web-mobile")}}),cc._RFpop()},{}],loginScene:[function(t,n,e){"use strict";cc._RFpush(n,"d8857rnjXRHXJif1j+e2m24","loginScene"),cc.Class({"extends":cc.Component,properties:{money:{"default":null}},onLoad:function(){var t=new KBEngine.KBEngineArgs;KBEngine.create(t),this.installEvents()},installEvents:function(){KBEngine.Event.register("onKicked",this,"onKicked"),KBEngine.Event.register("onDisconnected",this,"onDisconnected"),KBEngine.Event.register("onConnectionState",this,"onConnectionState"),KBEngine.Event.register("onCreateAccountResult",this,"onCreateAccountResult"),KBEngine.Event.register("onLoginFailed",this,"onLoginFailed"),KBEngine.Event.register("onVersionNotMatch",this,"onVersionNotMatch"),KBEngine.Event.register("onScriptVersionNotMatch",this,"onScriptVersionNotMatch"),KBEngine.Event.register("onLoginBaseappFailed",this,"onLoginBaseappFailed"),KBEngine.Event.register("onLoginSuccessfully",this,"onLoginSuccessfully"),KBEngine.Event.register("onReloginBaseappFailed",this,"onReloginBaseappFailed"),KBEngine.Event.register("onReloginBaseappSuccessfully",this,"onReloginBaseappSuccessfully"),KBEngine.Event.register("onLoginBaseapp",this,"onLoginBaseapp"),KBEngine.Event.register("Loginapp_importClientMessages",this,"Loginapp_importClientMessages"),KBEngine.Event.register("Baseapp_importClientMessages",this,"Baseapp_importClientMessages"),KBEngine.Event.register("Baseapp_importClientEntityDef",this,"Baseapp_importClientEntityDef")},onKicked:function(t){console.log("kick, disconnect!, reason="+KBEngine.app.serverErr(t))},onDisconnected:function(){console.log("disconnect! will try to reconnect..."),this.reloginCount=0,this.scheduleOnce(function(){this.onReloginBaseappTimer(this)},1)},onReloginBaseappTimer:function(t){if(void 0===KBEngine.app.socket||null===KBEngine.app.socket){if(this.reloginCount>=3)return void cc.director.runScene(new StartScene);this.reloginCount+=1,console.log("will try to reconnect("+this.reloginCount+")..."),KBEngine.app.reloginBaseapp(),this.scheduleOnce(function(){t.onReloginBaseappTimer(t)},1)}},onReloginBaseappFailed:function(t){console.log("reogin is failed(断线重连失败), err="+KBEngine.app.serverErr(t))},onReloginBaseappSuccessfully:function(){console.log("reogin is successfully!(断线重连成功!)")},onConnectionState:function(t){t?cc.log("Connect successfully, please wait...(连接成功，请等候...)"):console.log("Connect("+KBEngine.app.ip+":"+KBEngine.app.port+") is error! (连接错误)")},onCreateAccountResult:function(t,n){return 0!==t?void console.log("CreateAccount is error(注册账号错误)! err="+t):(cc.log("createAccount is successfully, Please activate your Email!(注册账号成功，请激活Email!)"),void console.log("CreateAccount is successfully!(注册账号成功!)"))},onLoginFailed:function(t){20==t?console.log("Login is failed(登陆失败), err="+KBEngine.app.serverErr(t)+", "+KBEngine.app.serverdatas):console.log("Login is failed(登陆失败), err="+KBEngine.app.serverErr(t))},onVersionNotMatch:function(t,n){console.log("Version not match(curr="+t+", srv="+n+" )(版本不匹配)"),this.serverScriptVersion.setString("serverScriptVersion: "+KBEngine.app.serverScriptVersion),this.serverVersion.setString("serverVersion: "+KBEngine.app.serverVersion)},onScriptVersionNotMatch:function(t,n){console.log("ScriptVersion not match(curr="+t+", srv="+n+" )(脚本版本不匹配)"),this.serverScriptVersion.setString("serverScriptVersion: "+KBEngine.app.serverScriptVersion),this.serverVersion.setString("serverVersion: "+KBEngine.app.serverVersion)},onLoginBaseappFailed:function(t){console.log("LoginBaseapp is failed(登陆网关失败), err="+KBEngine.app.serverErr(t))},onLoginSuccessfully:function(t,n,e){console.log("Login is successfully!(登陆成功!)"),this.setEntity(e),cc.game.addPersistRootNode(this.node),cc.director.loadScene("lobby")},setEntity:function(t){this.accEntity=t},getEntity:function(){return this.accEntity},onLoginBaseapp:function(){console.log("Connect to loginBaseapp, please wait...(连接到网关， 请稍后...)")},Loginapp_importClientMessages:function(){console.log("Loginapp_importClientMessages ...")},Baseapp_importClientMessages:function(){console.log("Baseapp_importClientMessages ...")},Baseapp_importClientEntityDef:function(){console.log("Baseapp_importClientEntityDef ...")},sleep:function(t){for(var n=(new Date).getTime(),e=0;e<1e7&&!((new Date).getTime()-n>t);e++);}}),cc._RFpop()},{}],logoDone:[function(t,n,e){"use strict";cc._RFpush(n,"8047a/0cipJ26g6hpg16Lna","logoDone"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},changeToLoginScene:function(){cc.director.loadScene("login")}}),cc._RFpop()},{}],playCtrl:[function(t,n,e){"use strict";cc._RFpush(n,"32623zwx+1P2IUKPX7VNlYp","playCtrl"),cc.Class({"extends":cc.Component,properties:{money:{"default":null,type:cc.Label},backButton:{"default":null,type:cc.Button},extractButton:{"default":null,type:cc.Button},light:{"default":null,type:cc.Sprite},light2:{"default":null,type:cc.Sprite},barNum:{"default":null,type:cc.Label},sevenNum:{"default":null,type:cc.Label},starNum:{"default":null,type:cc.Label},watermelonNum:{"default":null,type:cc.Label},bellNum:{"default":null,type:cc.Label},snakemelonNum:{"default":null,type:cc.Label},orangeNum:{"default":null,type:cc.Label},appleNum:{"default":null,type:cc.Label},barButton:{"default":null,type:cc.Button},sevenButton:{"default":null,type:cc.Button},starButton:{"default":null,type:cc.Button},watermelonButton:{"default":null,type:cc.Button},bellButton:{"default":null,type:cc.Button},snakemelonButton:{"default":null,type:cc.Button},orangeButton:{"default":null,type:cc.Button},appleButton:{"default":null,type:cc.Button},startButton:{"default":null,type:cc.Button},bigButton:{"default":null,type:cc.Button},smallButton:{"default":null,type:cc.Button},winScore:{"default":null,type:cc.Label},accEntity:{"default":null}},onLoad:function(){var t=cc.find("accEntity").getComponent("loginScene");this.accEntity=t.getEntity(),this.accEntity.getAccountInfo(),KBEngine.Event.register("onGetAccountInfo",this,"onGetAccountInfo")},onGetAccountInfo:function(t){cc.log(t);var n=this;setTimeout(function(){n.money.string=t.money,n.barNum.string=t.barNum,n.sevenNum.string=t.sevenNum,n.starNum.string=t.starNum,n.watermelonNum.string=t.watermelonNum,n.bellNum.string=t.bellNum,n.snakemelonNum.string=t.snakemelonNum,n.orangeNum.string=t.orangeNum,n.appleNum.string=t.appleNum,n.winScore.string=t.winScore,n.resultItemHandler(t.resultItem),n.bigSmallHandler(t.bigSmall)},10)},resultItemHandler:function(t){var n=193,e=226,o=288,i=355,s=421,c=485,l=513,r=560,a=531,u=469,p=406,g=342,f=281,d=254,y=this.light.node;if(y.active=!0,"right_once_again"==t)y.x=l,y.y=p;else if("left_once_again"==t)y.x=n,y.y=p;else if("little_apple"==t)y.x=c,y.y=r;else if("little_orange"==t)y.x=l,y.y=f;else if("little_snakemelon"==t)y.x=e,y.y=d;else if("little_bell"==t)y.x=n,y.y=a;else if("little_watermelon"==t)y.x=l,y.y=u;else if("little_star"==t)y.x=n,y.y=g;else if("little_seven"==t)y.x=s,y.y=d;else if("little_bar"==t)y.x=o,y.y=r;else if("bar"==t)y.x=i,y.y=r;else if("seven"==t)y.x=i,y.y=d;else if("star"==t)y.x=n,y.y=f;else if("watermelon"==t)y.x=l,y.y=a;else if("bell"==t)1==Math.floor(2*Math.random()+1)?(y.x=e,y.y=r):(y.x=c,y.y=d);else if("snakemelon"==t)1==Math.floor(2*Math.random()+1)?(y.x=l,y.y=r):(y.x=n,y.y=d);else if("orange"==t)1==Math.floor(2*Math.random()+1)?(y.x=n,y.y=r):(y.x=l,y.y=d);else if("apple"==t){var B=Math.floor(4*Math.random()+1);1==B?(y.x=s,y.y=r):2==B?(y.x=n,y.y=u):3==B?(y.x=o,y.y=d):(y.x=l,y.y=g)}else y.active=!1},bigSmallHandler:function(t){1==t?(this.light2.node.setPosition(257,285),this.light2.node.active=!0):2==t?(this.light2.node.setPosition(451,285),this.light2.node.active=!0):this.light2.node.active=!1},pressBarButton:function(){"99"!=this.barNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressBarButton(),this.accEntity.getAccountInfo())},pressSevenButton:function(){"99"!=this.sevenNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressSevenButton(),this.accEntity.getAccountInfo())},pressStarButton:function(){"99"!=this.starNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressStarButton(),this.accEntity.getAccountInfo())},pressWatermelonButton:function(){"99"!=this.watermelonNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressWatermelonButton(),this.accEntity.getAccountInfo())},pressBellButton:function(){"99"!=this.bellNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressBellButton(),this.accEntity.getAccountInfo())},pressSnakemelonButton:function(){"99"!=this.snakemelonNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressSnakemelonButton(),this.accEntity.getAccountInfo())},pressOrangeButton:function(){"99"!=this.orangeNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressOrangeButton(),this.accEntity.getAccountInfo())},pressAppleButton:function(){"99"!=this.appleNum.string&&parseInt(this.money.string)>=5&&(this.accEntity.pressAppleButton(),this.accEntity.getAccountInfo())},pressStartButton:function(){this.accEntity.pressStartButton(),this.accEntity.getAccountInfo()},pressBackButton:function(){cc.director.loadScene("lobby")},pressWinScoreToMoneyButton:function(){this.accEntity.pressWinScoreToMoneyButton(),this.accEntity.getAccountInfo()},pressClearButton:function(){this.accEntity.pressClearButton(),this.accEntity.getAccountInfo()},pressBigButton:function(){this.accEntity.pressBigButton(),this.accEntity.getAccountInfo()},pressSmallButton:function(){this.accEntity.pressSmallButton(),this.accEntity.getAccountInfo()}}),cc._RFpop()},{}],sceneCtrl:[function(t,n,e){"use strict";cc._RFpush(n,"b66f09FIN1Ip4Ad2Lw8aLZ7","sceneCtrl"),cc.Class({"extends":cc.Component,properties:{doDepositButton:{"default":null,type:cc.Button},lobbyDepositButton:{"default":null,type:cc.Button},playButton:{"default":null,type:cc.Button},doCancelButton:{"default":null,type:cc.Button},layout:{"default":null,type:cc.Layout},accEntity:{"default":null},loginScene:{"default":null}},onLoad:function(){this.layout.node.active=!1;this.loginScene=cc.find("accEntity").getComponent("loginScene"),this.accEntity=this.loginScene.getEntity()},onPlayButtonClicked:function(){cc.director.loadScene("machine")},onDepositButtonClicked:function(){this.lobbyDepositButton.node.active=!1,this.playButton.node.active=!1,this.layout.node.active=!0},onLogoutButtonClicked:function(){cc.director.loadScene("logout")},onBackToLobbyButtonClicked:function(){cc.director.loadScene("lobby")},doDepositBoxInputDidChanged:function(t,n){this.depositMoney=t},doDepositButtonOneClicked:function(){this.accEntity.depositOne()},doDepositButtonTwoClicked:function(){this.accEntity.depositTwo()},doCancelButtonClicked:function(){this.layout.node.active=!1,this.playButton.node.active=!0,this.lobbyDepositButton.node.active=!0},updateMoney:function(t){this.money.string=t}}),cc._RFpop()},{}]},{},["loginClick","loginScene","logoDone","playCtrl","sceneCtrl"]);