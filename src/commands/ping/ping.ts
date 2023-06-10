import { SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../types/context';

const infos = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('pong the pings')
	.setDefaultMemberPermissions(0);

const ping = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		return interaction.reply('pong!');
	}
};

export default ping;