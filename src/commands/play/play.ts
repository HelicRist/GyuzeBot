import { SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../types/context';
import { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior,} from '@discordjs/voice';
import { search, stream } from 'play-dl';
import { DiscordGatewayAdapterCreator } from '@discordjs/voice';

const infos = new SlashCommandBuilder()
	.setName('play')
	.setDescription('music player from youtube')
	.setDefaultMemberPermissions(0)
	.addStringOption(option => option
		.setName('song')
		.setDescription('song name')
		.setRequired(true));

const play = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: ctx.config.GUILD_ID,
			adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
		});

		const songName = interaction.options._hoistedOptions[0].value;
		const yt_info = await search(songName, {
			limit: 1
		});

		const streamer = await stream(yt_info[0].url);

		const resource = createAudioResource(streamer.stream, {
			inputType: streamer.type
		});
		resource.volume?.setVolume(0.5);

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Play
			}
		});
        
		player.play(resource);
		connection.subscribe(player);
        
		const songEmbed = {
			color: 0x0099ff,
			title: 'Now playing',
			description: yt_info[0].title,
			fields: [
				{
					name: 'Author',
					value: yt_info[0].channel?.name,
				},
				{
					name: 'Duration',
					value: yt_info[0].durationRaw,
				}
			],
			authror: {
				name: yt_info[0].channel?.name,
			},
			thumbnail: { url: yt_info[0].thumbnails[0].url },
		};

		return await interaction.reply({ embeds: [songEmbed] });
	}
};

export default play;