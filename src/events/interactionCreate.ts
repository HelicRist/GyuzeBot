import { Client, Collection, InteractionType } from 'discord.js';
import { Command } from '../types/command';

export default function interactionCreate(client: Client, commands: Collection<string, Command>){
	client.on('interactionCreate', async(interaction) => {
		if(
			interaction.type === InteractionType.ApplicationCommand &&
            commands.has(interaction.commandName)
		){
			try{
				const res = await commands.get(interaction.commandName)?.execute(interaction);
			//TODO: LOG
			}
			catch(err){
				console.log(`Error executing the **${interaction.commandName}** command!`);
				throw err;
			}
		}
	});
}