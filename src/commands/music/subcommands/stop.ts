import { AudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { IContext } from '../../../types/context';
import { YouTubeVideo } from 'play-dl';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
	queue: YouTubeVideo[];
}
const stop = {
	async execute(args: Iargs) {
		const { interaction, player } = args;
		
		if(player.state.status === AudioPlayerStatus.Idle) return await interaction.reply('Nothing is playing');
		player.stop();
        
		return await interaction.reply('Stopped');
	}
};

export default stop;