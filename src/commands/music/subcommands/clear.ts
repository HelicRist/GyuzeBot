import { AudioPlayer } from '@discordjs/voice';
import { IContext } from '../../../types/context';
import { YouTubeVideo, search } from 'play-dl';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
	queue: YouTubeVideo[];
}
const clear = {
	async execute(args: Iargs) {
		const { interaction, queue } = args;
		
		queue.length = 0;
        
		return await interaction.reply('Queue cleared');
	}
};

export default clear;