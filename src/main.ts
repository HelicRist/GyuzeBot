import { Client, Events, GatewayIntentBits } from 'discord.js';
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
import 'dotenv/config';
import loadCommands from './functions/LoadCommands';
import interactionCreate from './events/interactionCreate';

const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]});
const commands = loadCommands();
interactionCreate(client, commands);

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);