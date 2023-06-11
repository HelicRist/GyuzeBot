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

const resume = {
	async execute(args: Iargs) {
		const { interaction, player } = args;
		player.unpause();
		return await interaction.reply({ content: 'Resumed' });
	}
};

export default resume;