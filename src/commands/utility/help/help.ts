import { Message, SlashCommandBuilder } from 'discord.js';

const infos = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Displays help menu')
	.setDefaultMemberPermissions(0);

const help = {
	data: infos.toJSON(),
	async execute(interaction: any){
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
		console.log(interaction);
		
		return await interaction.reply({embeds: [menu]});
	}
};

export default help;