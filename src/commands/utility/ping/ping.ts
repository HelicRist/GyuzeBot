import { SlashCommandBuilder } from 'discord.js';

const infos = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('pong the pings')
	.setDefaultMemberPermissions(0);

const ping = {
	data: infos.toJSON(),
	async execute(interaction: any) {
		return interaction.reply('pong!');
	}
};

export default ping;