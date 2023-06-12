import { SlashCommandBuilder, REST, Routes } from 'discord.js';
import { IContext } from '../../types/context';

const infos = new SlashCommandBuilder()
	.setName('cmdremove')
	.setDescription('remove a registered (/) command')
	.setDefaultMemberPermissions(0)
	.addStringOption(option => option.setName('id').setDescription('the id of the command to remove').setRequired(true));

const cmdremove = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		if(interaction.user.id !== process.env.RIMARO_ID! || interaction.user.id !== process.env.RIMARO_ID!){
			return interaction.reply('You don\'t have the permission to use this command!');
		}
		const rest = new REST().setToken(process.env.TOKEN!);
		rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID!, process.env.GUILD_ID!, interaction.options.getString('id')!))
			.then(() => {
				console.log('Successfully deleted guild command');
				return interaction.reply('Successfully deleted guild command!');
			})
			.catch(err => {
				console.error(err);
				return interaction.reply('An error occured');
			});
	}
};

export default cmdremove;