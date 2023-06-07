import { Message, SlashCommandBuilder } from 'discord.js';

const infos = new SlashCommandBuilder()
	.setName('pomodoro')
	.setDescription('pomodoro the pings')
	.setDefaultMemberPermissions(0);

const pomodoro = {
	data: infos.toJSON(),
	async execute(interaction: any) {
		return await interaction.reply('pomodoro');
	}
};

export default pomodoro;