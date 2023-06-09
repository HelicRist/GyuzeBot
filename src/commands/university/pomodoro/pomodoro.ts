import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Message, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { IContext } from '../../../types/context';
import {VoiceConnectionStatus, DiscordGatewayAdapterCreator, getVoiceConnection } from '@discordjs/voice';
import { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { join } from 'node:path';
import cron from 'node-cron';

// /pomodoro studyTime pauseTime - bot get in vc - play chill music - /media/audio/pause and study
// stop 	-pause the timer
// resume	- if it was stopped it resume the timer in the correct timer
// if its been manually disconnected -> reply @user ive been disconnected
const infos = new SlashCommandBuilder()
	.setName('pomodoro')
	.setDescription('pomodoro ')
	.setDefaultMemberPermissions(0)

	.addSubcommand(subcommand =>
		subcommand
			.setName('start')
			.setDescription('Start the pomodori timer.')
			.addChannelOption(option =>
				option.setName('study_channel')

					.setDescription('Chose the VC.')
					.setRequired(true)
					.addChannelTypes(ChannelType.GuildVoice)
			)
			.addIntegerOption(option =>
				option.setName('study_time')

					.setDescription('Set amount of study in minutes')
					.setRequired(false)
					.setMinValue(1)
					.setMaxValue(120))
			.addIntegerOption(option =>
				option.setName('relax_time')

					.setDescription('Set amount of the relax time in minutes')
					.setRequired(false)
					.setMinValue(1)
					.setMaxValue(60)
			)
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName('pause')
			.setDescription('Stop the pomodori timer.')
			.addIntegerOption(option =>
				option.setName('pause_time')
					.setDescription('Set amount of minutes for timer to be paused')
					.setRequired(false)
					.addChoices(
						{ name: '1', value: 1 },
						{ name: '5', value: 5 },
						{ name: '10', value: 10 },
					))
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName('end')
			.setDescription('End the pomodori timer.')
			.addStringOption(option =>
				option.setName('end_now_or_wait_last_session')
					.setDescription('Chose to end the timer right now or to sudy one last session.')
					.setRequired(true)
					.addChoices(
						{ name: 'End now', value: 'now'},
						{ name: 'Do last session', value: 'last'},
					))
	)
	;


//Command
const pomodoro = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		let timeoutID: NodeJS.Timeout;

		function delayedMessage() {
			// console.log('First: ' + timeoutID);
			
			timeoutID = setTimeout(setOutput, 20 * 1000, 'That was really slow!');
			// console.log('After assign: ' + timeoutID);

		}
		function clearMessage() {
			console.log('When clear: ' + timeoutID);

			clearTimeout(timeoutID);
		}
	
		function setOutput(out:string){
			console.log(out);
			
		}
		//Subcommands division
		
		startComand();
	


		async function startComand(){
			console.log('\nIn start');
			
			const player = createAudioPlayer();
			const studyTime = typeof interaction.options._hoistedOptions[1]?.value !=='undefined' ? interaction.options._hoistedOptions[1]:45  ;
			const relaxTime = (typeof interaction.options._hoistedOptions[2]?.value  !=='undefined' )? interaction.options._hoistedOptions[2]:7  ;

			let pomodoriCounter = 0;
			pomodoriCounter++;
			const connection = joinVoiceChannel({
				channelId: interaction.options._hoistedOptions[0].value,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator //ctx?.client?.guilds?.cache?.get((guildId))?.voiceAdapterCreator //@tts-ignore
			});

			//fix this
		
			const resource = createAudioResource(join(__dirname, 'study.mp3'), { inlineVolume: true });
			resource.volume?.setVolume(0.5);
			player.play(resource);
	
			
			// delayedMessage();
			// clearMessage();

			//Buttons
			const end = new ButtonBuilder()
				.setCustomId('end')
				.setLabel('End')
				.setStyle(ButtonStyle.Danger);
			const pause = new ButtonBuilder()
				.setCustomId('pause/resume')
				.setLabel('⏸&⏵')
				.setStyle(ButtonStyle.Primary );
			
				
			const selectMusic = new StringSelectMenuBuilder()
				.setCustomId('starter')
				.setPlaceholder('Make a selection!')
				.addOptions(
					new StringSelectMenuOptionBuilder()
						.setLabel('Chill low-fi')
						.setDescription('Chill or low-fi music.')
						.setValue('chill'),
					new StringSelectMenuOptionBuilder()
						.setLabel('Videogames')
						.setDescription('Music themes from videogames.')
						.setValue('games'));

			const rowTimer = new ActionRowBuilder()
				.addComponents(pause, end);
			const rowMusic = new ActionRowBuilder()
				.addComponents(selectMusic);
			const startMessage = {
				color: 0xA000A0 ,
				title: 'Study Time! <#' + interaction.options._hoistedOptions[0].channel+'>',
				author: {
					name: 'Rimaro03, Heldin',
					iconURL: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png', 
					url: 'https://github.com/HelicRist/GyuzeBot'
				},
				description: 'Pomodori ( '  +pomodoriCounter+' /? )',
				thumbnail: { url: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png' },
				fields: [
					{ name: 'Study time ', value: studyTime.toString() +' minutes' },
					{ name: 'Relax time ', value: relaxTime.toString() +' minutes'}
				]
			};


			await interaction.reply({
				content: 'Choose your starter!',
				components:[rowMusic],


			});
			return await interaction.reply({embeds: [startMessage], 
				components:[rowTimer],
				content: 'Choose your starter!',

			});
		}
		return; //await interaction.reply('pomodoro');
	}
};

export default pomodoro;


