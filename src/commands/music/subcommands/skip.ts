import { AudioPlayer, createAudioResource } from '@discordjs/voice';
import { IContext } from '../../../types/context';
import { YouTubeVideo, search, stream } from 'play-dl';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
	queue: YouTubeVideo[];
}
const skip = {
	async execute(args: Iargs) {
		const { ctx, interaction, player, queue } = args;

		if(ctx.client.voice.adapters.size == 0) {
			return await interaction.reply('Not in a voice channel');
		}

		if(player.state.status === 'idle') return await interaction.reply('Nothing is playing');
        
		if(queue.length === 0) {
			player.stop();
		}
		else{
			const streamer = await stream(queue.shift()?.url as string);
	
			const resource = createAudioResource(streamer.stream, {
				inputType: streamer.type
			});
			player.play(resource);        
		}

		return await interaction.reply('Skipped');
	}
};

export default skip;