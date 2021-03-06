module MyGame {

	export class MainMenu extends Phaser.State {

		background: Phaser.Sprite;
		logo: Phaser.Sprite;
		music: Phaser.Sound;

		create() {

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

		

		}

		fadeOut() {

			this.add.tween(this.background).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
			var tween = this.add.tween(this.logo).to({ y: 1500 }, 1000, Phaser.Easing.Linear.None, true);

			tween.onComplete.add(this.startGame, this);

		}

		startGame() {

			this.music.stop();
			this.game.state.start('Level1', true, false);

		}

		
		setRelativeSizeFromWidth(width_percentage: number, scale_ratio: number) {  //TO keep the proportion of sprite
			let new_width = width_percentage*this.game.world.width/100;
			let new_height = new_width / scale_ratio;
			return {
				width: new_width,
				height: new_height
			};
		}
	}

}