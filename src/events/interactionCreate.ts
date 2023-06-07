import { Collection, InteractionType } from 'discord.js';
import { Command } from '../types/command';
import { IContext } from '../types/context';

export default function interactionCreate(ctx: IContext, commands: Collection<string, Command>){
	ctx.client.on('interactionCreate', async(interaction) => {
		if(
			interaction.type === InteractionType.ApplicationCommand &&
            commands.has(interaction.commandName)
		){
			try{
				const res = await commands.get(interaction.commandName)?.execute(ctx, interaction);
			//TODO: LOG
			}
			catch(err){
				console.log(`Error executing the **${interaction.commandName}** command!`);
				throw err;
			}
		}
	});
}