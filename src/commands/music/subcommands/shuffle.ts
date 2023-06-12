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

const shuffle = {
	async execute(args: Iargs) {
		const { interaction, queue } = args;
		queue.sort(() => Math.random() - 0.5);
		return await interaction.reply('Queue shuffled!');
	}
};

export default shuffle;