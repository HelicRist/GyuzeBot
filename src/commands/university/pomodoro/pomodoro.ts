/* eslint-disable quotes */
/* eslint-disable prefer-const */
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Message, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { IContext } from '../../../types/context';
import { VoiceConnectionStatus, DiscordGatewayAdapterCreator, getVoiceConnection } from '@discordjs/voice';
import { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { join } from 'node:path';

// /pomodoro studyTime pauseTime - bot get in vc - play chill music - /media/audio/pause and study
// stop 	-pause the timer
// resume	- if it was stopped it resume the timer in the correct timer
// if its been manually disconnected -> reply @user ive been disconnected
const infos = new SlashCommandBuilder()
	.setName('pomodoro')
	.setDescription('pomodoro ')
	.setDefaultMemberPermissions(0)

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
			.setMaxValue(60))
	.addIntegerOption(option =>
		option.setName('relax_time')

			.setDescription('Set amount of the relax time in minutes')
			.setRequired(false)
			.setMinValue(1)
			.setMaxValue(30)
	)
	;

//Command
const pomodoro = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		let timeoutID: NodeJS.Timeout;


		startComand();
		async function startComand() {

			let pomodoriCounter = 0;
			pomodoriCounter++;
			const studyTime = (typeof interaction.options._hoistedOptions[1]?.value !== 'undefined') ? interaction.options._hoistedOptions[1].value : 45;
			const relaxTime = (typeof interaction.options._hoistedOptions[2]?.value !== 'undefined') ? interaction.options._hoistedOptions[2].value : 7;
			const player = createAudioPlayer();

			// const connection = getVoiceConnection( interaction.member.guild.id);
			const connection= joinVoiceChannel({
				channelId: interaction.options._hoistedOptions[0].value,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator //ctx?.client?.guilds?.cache?.get((guildId))?.voiceAdapterCreator //@tts-ignore
			});
			const subscription = connection.subscribe(player);


			//fix this
			connection?.on(VoiceConnectionStatus.Ready, () => {
				console.log('Ready');
				
				const resource = createAudioResource(join(__dirname, '../../../public/audio/study.mp3'), { inlineVolume: true });
				console.log(join(__dirname, '../../../public/audio/study.mp3'));
				
				resource.volume?.setVolume(0.5);
				player.play(resource);

			});

			
			// delayedMessage();
			// clearMessage();

			//Buttons
			const end = new ButtonBuilder()
				.setCustomId('end')
				.setLabel('End')
				.setStyle(ButtonStyle.Danger);
			const pause = new ButtonBuilder()
				.setCustomId('pause_resume')
				.setLabel('⏸/⏵')
				.setStyle(ButtonStyle.Primary);
			const getTime = new ButtonBuilder()
				.setCustomId('get_time')
				.setLabel('⏳')
				.setStyle(ButtonStyle.Success);
			const selectMusic = new StringSelectMenuBuilder()
				.setCustomId('music')
				.setPlaceholder('Choose your music!')
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
				.addComponents(pause, getTime, end,);
			const rowMusic = new ActionRowBuilder()
				.addComponents(selectMusic);
			const startMessage = {
				color: 0xD000D0,
				title: 'Study Time! <#' + interaction.options._hoistedOptions[0].channel + '>',
				author: {
					name: 'Rimaro03, Heldin',
					iconURL: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png',
					url: 'https://github.com/HelicRist/GyuzeBot'
				},
				description: 'Study with <@' + interaction.member + '>\nPomodori counter: ( ' + pomodoriCounter + ' /? )',
				thumbnail: { url: 'https://www.iconspng.com/uploads/gyoza-colour/gyoza-colour.png' },
				fields: [
					{ name: 'Study time ', value: studyTime.toString() + ' minutes' },
					{ name: 'Relax time ', value: relaxTime.toString() + ' minutes' }
				]
			};
			timer(studyTime, relaxTime);


			// await interaction
			// 	.reply({
			// 		embeds: [startMessage],
			// 		components: [rowMusic, rowTimer,],

			// 	});
		}
		async function timer(studyTime: number, relaxTime: number) {
			const m = studyTime % 60;
			const d = new Date();
			let time = d.getTime();
			const st = setInterval(async () => {
				
				console.log();


				const re = setTimeout(async () => {
					console.log();
					
					
				}, relaxTime * 1000);
			}, studyTime * 1000);
		}
		return; //await interaction.reply('pomodoro');
	}
};

export default pomodoro;


