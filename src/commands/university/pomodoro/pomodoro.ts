import { ChannelType, Message, SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../../types/context';
import {VoiceConnectionStatus, DiscordGatewayAdapterCreator, getVoiceConnection } from '@discordjs/voice';
import { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import { join } from 'node:path';
import voice from '@discordjs/voice';

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
					.setMinValue(0)
					.setMaxValue(120))
			.addIntegerOption(option =>
				option.setName('relax_time')

					.setDescription('Set amount of the relax time in minutes')
					.setRequired(false)
					.setMinValue(0)
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


const guildId: string = process.env.GUILD_ID!;
const connection = getVoiceConnection(guildId);

const pomodoro = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {

		switch (interaction.options._subcommand) {
		case 'start':{

			const player = createAudioPlayer();
			const connection = joinVoiceChannel({
				channelId: interaction.options._hoistedOptions[0].value,
				guildId: guildId,
				adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator //ctx?.client?.guilds?.cache?.get((guildId))?.voiceAdapterCreator //@tts-ignore
			});
			//fix this
			

				
			const studyTimer = (typeof interaction.options._hoistedOptions[1]?.value ===undefined )? 45: typeof interaction.options._hoistedOptions[1];
			const relaxTimer = (typeof interaction.options._hoistedOptions[2]?.value  ===undefined )? 7: typeof interaction.options._hoistedOptions[2];
				
			break;
		}
		case 'stop':{
			console.log('Stop');
			
			break;
		} 
			
		case 'resume':{

			console.log('Resume');
		}
			break;
		case 'end':{

			
			if(interaction.options._hoistedOptions[0].value=='now'){
				connection?.disconnect;

			}

			break;
		}
					
		}



		return; //await interaction.reply('pomodoro');
	}
};

export default pomodoro;