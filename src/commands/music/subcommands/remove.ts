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
const remove = {
	async execute(args: Iargs) {
		const { interaction, queue, song } = args;
		const yt_info = await search(song, {
			limit: 1
		});
		queue.find((v, i) => {
			if(v.id === yt_info[0].id) {
				queue.splice(i, 1);
			}
		});
        
		return await interaction.reply({ content: 'Removed' });
	}
};

export default remove;