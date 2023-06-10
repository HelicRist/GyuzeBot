import { AudioPlayer } from '@discordjs/voice';
import { IContext } from '../../../types/context';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
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