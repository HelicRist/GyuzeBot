import { IContext } from '../../../types/context';
import { AudioPlayer, AudioPlayerStatus, createAudioResource, joinVoiceChannel} from '@discordjs/voice';
import { search, stream, YouTubeVideo } from 'play-dl';
import { DiscordGatewayAdapterCreator } from '@discordjs/voice';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
	queue: YouTubeVideo[];
}

const play = {
	async execute(args: Iargs) {
		const { ctx, interaction, song, player, queue } = args;

		if(interaction.member.voice.channelId === null) {
			return await interaction.reply('You are not in a voice channel');
		}

		let songPlayer;
		if(song == null){
			if(player.state.status === AudioPlayerStatus.Playing) {
				return await interaction.reply('Already playing');
			}
			if(queue.length === 0) {
				return await interaction.reply('Queue is empty');
			}
			songPlayer = queue.shift()?.url as string;
		}
		else{
			songPlayer = song;
		}

		const yt_info = await search(songPlayer, {
			limit: 1
		});

		if(player.state.status === AudioPlayerStatus.Playing) {
			queue.push(yt_info[0]);
			const songEmbed = {
				color: 0x0099ff,
				title: 'Added to queue',
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
				
		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: ctx.config.GUILD_ID,
			adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
		});
	
		const streamer = await stream(yt_info[0].url);
	
		const resource = createAudioResource(streamer.stream, {
			inputType: streamer.type
		});
		resource.volume?.setVolume(0.5);
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