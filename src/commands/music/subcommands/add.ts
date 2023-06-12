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
		const songEmbed = {
			color: 0x0099ff,
			title: 'Added to queue',
			description: yt_info[0].title,
			fields: [
				{
					name: 'Author',
					value: yt_info[0].channel?.name,
				},
				{
					name: 'Duration',
					value: yt_info[0].durationRaw,
				}
			],
			authror: {
				name: yt_info[0].channel?.name,
			},
			thumbnail: { url: yt_info[0].thumbnails[0].url },
		};
		return await interaction.reply({ embeds: [songEmbed] });
	}
};

export default add;