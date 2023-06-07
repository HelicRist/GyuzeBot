import { SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../../types/context';

const infos = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Displays help menu')
	.setDefaultMemberPermissions(0);

const help = {
	data: infos.toJSON(),
	async execute( ctx: IContext, interaction: any){
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
			fields: [
				{ name: 'Help', value: 'Display this help menu' }
			]
		};
		
		return await interaction.reply({embeds: [menu]});
	}
};

export default help;