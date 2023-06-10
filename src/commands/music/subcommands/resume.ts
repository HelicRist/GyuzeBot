import { AudioPlayer } from '@discordjs/voice';
import { IContext } from '../../../types/context';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
}

const resume = {
	async execute(args: Iargs) {
		const { interaction, player } = args;
		player.unpause();
		return await interaction.reply({ content: 'Resumed' });
	}
};

export default resume;