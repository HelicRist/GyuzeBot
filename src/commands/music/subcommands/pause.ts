import { AudioPlayer } from '@discordjs/voice';
import { IContext } from '../../../types/context';
import { YouTubeVideo } from 'play-dl';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
	queue: YouTubeVideo[];
}

const pause = {
	async execute(args: Iargs) {
		const { interaction, player } = args;
		console.log(player);
		player.pause(true);
		return await interaction.reply({ content: 'Paused' });
	}
};

export default pause;