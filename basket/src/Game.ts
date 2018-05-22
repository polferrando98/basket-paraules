module MyGame {

	export class Game extends Phaser.Game {

		static xmlDoc: Document;


		constructor() {
			let game_width: number = window.innerWidth * window.devicePixelRatio;
			let game_height: number = window.innerHeight * window.devicePixelRatio;

			super(game_width, game_height, Phaser.AUTO, 'content', null);

			this.loadConfig();

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Level1', Level1, false);

			this.state.start('Boot');


		}

		loadConfig() {
			var xhttp = new XMLHttpRequest();
			console.log("Pene2");
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					Game.xmlDoc = this.responseXML;
				}
			};

			xhttp.open("GET", "assets/config.xml", true);
			xhttp.send();
		}


	}

}