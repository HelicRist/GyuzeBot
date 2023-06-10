import { Collection, REST, Routes } from 'discord.js';
import path from 'path';
import fs from 'fs';
import { Command } from '../types/command';

export default function loadCommands() {
	const slashCommands: unknown[] = [];
	const commands = new Collection<string, Command>();

	const commandsPath = path.resolve(__dirname, '../commands');

	const commandFolders = fs.readdirSync(`${commandsPath}`);
	for(const commandFolder of commandFolders){
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const command = require(`${commandsPath}/${commandFolder}/${commandFolder}`).default;
		commands.set(command.data.name, command);
		slashCommands.push(command.data);
	}
	registerCommands(slashCommands);
	return commands;
}

async function registerCommands(commands: unknown[]) {
	const rest = new REST().setToken(process.env.TOKEN as string);
	try{
		console.log('[SLASH] Started refreshing application (/) commands.');

		const commandList = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), { body: commands },
		);

		console.log('[SLASH] Successfully reloaded application (/) commands.');
		
	}
	catch(err){
		console.log('Error');
		
		throw err;
	}
	
}