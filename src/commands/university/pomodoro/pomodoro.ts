import { Message, SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../../types/context';

const infos = new SlashCommandBuilder()
	.setName('pomodoro')
	.setDescription('pomodoro the pings')
	.setDefaultMemberPermissions(0);

const pomodoro = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		return await interaction.reply('pomodoro');
	}
};

export default pomodoro;