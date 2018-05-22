

module MyGame {
	export class Player extends Phaser.Sprite {

		scale_ratio: number;

		velocity: number = 0;

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'simon', 0);

			this.game.physics.arcade.enableBody(this);
			
			this.anchor.setTo(0.5, 1);

			game.add.existing(this);

			this.scale.setTo(0.2,0.2);

			this.scale_ratio = this.width/this.height;

			this.velocity = Number(Game.xmlDoc.getElementsByTagName("velocity")[0].childNodes[0].nodeValue);
		}

		update() {

			this.body.velocity.x = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

				this.body.velocity.x = -this.getRelativeVel(this.velocity); //It will take 4 seconds to travel across the width of the screen
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

				this.body.velocity.x = this.getRelativeVel(this.velocity);
			}

		}

		getRelativeVel(vel: number) {  //velocity in percentage of pixels per second
			return  vel * (this.game.width / 100);
		}



	}

}