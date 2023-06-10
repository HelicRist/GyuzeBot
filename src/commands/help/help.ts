import { Collection, SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../types/context';
import { Command } from '../../types/command';

const infos = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Displays help menu')
	.setDefaultMemberPermissions(0);

const help = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		const fields = getCommands(ctx.commands);
		const menu = {
			color: 0x0099ff,
			title: 'Help menu',
			author: {
				name: 'Rimaro03, Heldin',
				iconURL: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png',
				url: 'https://github.com/HelicRist/GyuzeBot'
			},
			description: 'Your fav bot Gyuza here to help!',
			thumbnail: { url: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png' },
			fields: fields,
		};
		return await interaction.reply({ embeds: [menu] });
	}
};

const getCommands = (commands: Collection<string, Command>) => {
	const fields: unknown[] = [];
	commands.map(command => {
		const item = {
			name: command.data.name.toUpperCase(),
			value: ' `' + `/${command.data.name}`+'`'+`\n${command.data.description}`,
		};
		fields.push(item);
	});
	
	return fields;
};
export default help;