import { SlashCommandBuilder } from 'discord.js';
import path from 'path';
import { IContext } from '../../types/context';
import { NoSubscriberBehavior, createAudioPlayer } from '@discordjs/voice';

/**
 * BUTTONS
 * /music pause/resume
 * /music stop
 * /music skip

 * COMMANDS:
 * /music play <song name>.
 * /music nowplaying.
 * /music remove <song number>.
 * /music shuffle.
 * /music clear
 * /music lyrics
 * /music queue
 */


const infos = new SlashCommandBuilder()
	.setName('music')
	.setDefaultMemberPermissions(0)
	.setDescription('music player from youtube')
	.addSubcommand(subcommand => subcommand
		.setName('play')
		.setDescription('play a song')
		.addStringOption(option => option
			.setName('song')
			.setDescription('song name')
			.setRequired(true)))
	.addSubcommand(subcommand => subcommand //subsitute with button
		.setName('pause')
		.setDescription('Pause the current song')) //subsitute with button
	.addSubcommand(subcommand => subcommand
		.setName('resume')
		.setDescription('Resume the current song'))
	.addSubcommand(subcommand => subcommand
		.setName('queue')
		.setDescription('show the queue'))
	.addSubcommand(subcommand => subcommand
		.setName('clear')
		.setDescription('clear the queue'))
	.addSubcommand(subcommand => subcommand
		.setName('remove')
		.setDescription('remove a song from the queue')
		.addIntegerOption(option => option
			.setName('song')
			.setDescription('song number')
			.setRequired(true)))
//forse
	.addSubcommand(subcommand => subcommand
		.setName('shuffle')
		.setDescription('shuffle the queue'))
	.addSubcommand(subcommand => subcommand
		.setName('nowplaying')
		.setDescription('show the current song'))
	.addSubcommand(subcommand => subcommand
		.setName('lyrics')
		.setDescription('show the lyrics of the current song'));


const music = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {      
		const subcommand = interaction.options.getSubcommand();
		const subCommandPath = path.join(__dirname, './subcommands');
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const command = require(`${subCommandPath}/${subcommand}`).default;
		const song = interaction.options.getString('song');
		command.execute({ctx, interaction, song, player: ctx.player});
		return;
	}
};

export default music;