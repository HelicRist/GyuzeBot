import { Client, Events, GatewayIntentBits } from 'discord.js';
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
import 'dotenv/config';
import loadCommands from './functions/LoadCommands';
import interactionCreate from './events/interactionCreate';
import fs from 'fs';
import path from 'path';

const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]});
const ctx = {
	client: client,
	config: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf-8')),
};

const commands = loadCommands();

interactionCreate(ctx, commands);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);