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
const add = {
	async execute(args: Iargs) {
		const { interaction, queue, song } = args;
		const yt_info = await search(song, {
			limit: 1
		});
		queue.push(yt_info[0]);
		return await interaction.reply({ content: 'Added' });
	}
};

export default add;