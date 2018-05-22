module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.Sprite;
		music: Phaser.Sound;
		player: MyGame.Player;

		create() {
			this.background = this.add.sprite(0, 0, 'level1');
			
			
			this.player = new Player(this.game, 130, this.getRelativeY(80));



			//set sizes 
			let new_player_size = this.setRelativeSizeFromWidth(10,this.player.scale_ratio);

			this.player.width = new_player_size.width;
			this.player.height = new_player_size.height;

			this.background.width = window.innerWidth; //Background is deformed, but should not be a problem
			this.background.height = window.innerHeight;
		}

		getRelativeY(y_percentage: number) {
			return y_percentage*this.game.world.height/100;
		}

		setRelativeSizeFromWidth(width_percentage: number, scale_ratio: number) {  //To keep the proportion of sprite
			let new_width = width_percentage*this.game.world.width/100;
			let new_height = new_width / scale_ratio;
			return {
				width: new_width,
				height: new_height
			};
		}

	}

} 