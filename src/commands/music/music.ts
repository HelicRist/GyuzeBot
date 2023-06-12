import { SlashCommandBuilder } from 'discord.js';
import path from 'path';
import { IContext } from '../../types/context';
import { AudioPlayerStatus, createAudioResource } from '@discordjs/voice';
import { stream } from 'play-dl';

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
			.setRequired(false)))
	.addSubcommand(subcommand => subcommand
		.setName('add')
		.setDescription('add a song to the queue')
		.addStringOption(option => option
			.setName('song')
			.setDescription('song name')
			.setRequired(true)))
	.addSubcommand(subcommand => subcommand
		.setName('stop')
		.setDescription('stop the current song'))
	.addSubcommand(subcommand => subcommand
		.setName('skip')
		.setDescription('skip the current song'))
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
		.addStringOption(option => option
			.setName('song')
			.setDescription('song name')
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
		
		const player = ctx.music.player;

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
			player.stop();
		});

		player.on('stateChange', async(oldState, newState) => {
			if (newState.status === AudioPlayerStatus.Idle) {
				if (oldState.status === AudioPlayerStatus.Playing) {
					if (interaction && interaction.data.name !== 'stop' && ctx.music.queue.length > 0) {
						const streamer = await stream(ctx.music.queue.shift()?.url as string);
	
						const resource = createAudioResource(streamer.stream, {
							inputType: streamer.type
						});
						player.play(resource);  
					}
				}
			}
		});
		
		command.execute({ctx, interaction, song, player: ctx.music.player, queue: ctx.music.queue});
		return;
	}
};

export default music;