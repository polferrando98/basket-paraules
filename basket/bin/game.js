var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1920, 1080);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            var game_width = window.innerWidth * window.devicePixelRatio;
            var game_height = window.innerHeight * window.devicePixelRatio;
            _this = _super.call(this, game_width, game_height, Phaser.AUTO, 'content', null) || this;
            _this.loadConfig();
            _this.state.add('Boot', MyGame.Boot, false);
            _this.state.add('Preloader', MyGame.Preloader, false);
            _this.state.add('MainMenu', MyGame.MainMenu, false);
            _this.state.add('Level1', MyGame.Level1, false);
            _this.state.start('Boot');
            return _this;
        }
        Game.prototype.loadConfig = function () {
            var xhttp = new XMLHttpRequest();
            console.log("Pene2");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    Game.xmlDoc = this.responseXML;
                }
            };
            xhttp.open("GET", "assets/config.xml", true);
            xhttp.send();
        };
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            this.player = new MyGame.Player(this.game, 130, this.getRelativeY(80));
            var new_player_size = this.setRelativeSizeFromWidth(10, this.player.scale_ratio);
            this.player.width = new_player_size.width;
            this.player.height = new_player_size.height;
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;
        };
        Level1.prototype.getRelativeY = function (y_percentage) {
            return y_percentage * this.game.world.height / 100;
        };
        Level1.prototype.setRelativeSizeFromWidth = function (width_percentage, scale_ratio) {
            var new_width = width_percentage * this.game.world.width / 100;
            var new_height = new_width / scale_ratio;
            return {
                width: new_width,
                height: new_height
            };
        };
        return Level1;
    }(Phaser.State));
    MyGame.Level1 = Level1;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;
            this.background.width = window.innerWidth;
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
            this.add.tween(this.logo).to({ y: 220 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 1500 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.music.stop();
            this.game.state.start('Level1', true, false);
        };
        MainMenu.prototype.setRelativeSizeFromWidth = function (width_percentage, scale_ratio) {
            var new_width = width_percentage * this.game.world.width / 100;
            var new_height = new_width / scale_ratio;
            return {
                width: new_width,
                height: new_height
            };
        };
        return MainMenu;
    }(Phaser.State));
    MyGame.MainMenu = MainMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.velocity = 0;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 1);
            game.add.existing(_this);
            _this.scale.setTo(0.2, 0.2);
            _this.scale_ratio = _this.width / _this.height;
            _this.velocity = Number(MyGame.Game.xmlDoc.getElementsByTagName("velocity")[0].childNodes[0].nodeValue);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -this.getRelativeVel(this.velocity);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = this.getRelativeVel(this.velocity);
            }
        };
        Player.prototype.getRelativeVel = function (vel) {
            return vel * (this.game.width / 100);
        };
        return Player;
    }(Phaser.Sprite));
    MyGame.Player = Player;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(300, 400, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.image('simon', 'assets/simon.png');
            this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=game.js.map