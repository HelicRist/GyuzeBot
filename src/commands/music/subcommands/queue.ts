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
const queue = {
	async execute(args: Iargs) {
		const { interaction, queue } = args;
		const fields: unknown[] = [];
		queue.forEach((v, i) => {
			fields.push({
				name: `${i + 1}. ${v.title}`,
				value: v.channel?.name,
			});
		});
		const queueEmbed = {
			color: 0x0099ff,
			title: 'Queue',
			fields: fields,
		};
		return await interaction.reply({ embeds: [queueEmbed] });
	}
};

export default queue;