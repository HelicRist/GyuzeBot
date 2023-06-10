import { SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../../types/context';

const infos = new SlashCommandBuilder()
	.setName('button')
	.setDescription('return button')
	.setDefaultMemberPermissions(0);

const buttons = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		return interaction.reply('BTN!');
	}
};

export default buttons;