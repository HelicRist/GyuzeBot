import { Client, Events, GatewayIntentBits } from 'discord.js';
const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates } = GatewayIntentBits;
import 'dotenv/config';
import loadCommands from './functions/LoadCommands';
import interactionCreate from './events/interactionCreate';
import fs from 'fs';
import path from 'path';
import { NoSubscriberBehavior, createAudioPlayer } from '@discordjs/voice';
import { IContext } from './types/context';

const client = new Client({ intents: [Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates] });
const commands = loadCommands();
const player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Play
	}
});

const ctx: IContext = {
	client: client,
	config: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf-8')),
	commands: commands,
	player: player
};


interactionCreate(ctx, commands);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);