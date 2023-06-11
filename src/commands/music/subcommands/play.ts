import { IContext } from '../../../types/context';
import { AudioPlayer, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior,} from '@discordjs/voice';
import { search, stream } from 'play-dl';
import { DiscordGatewayAdapterCreator } from '@discordjs/voice';

interface Iargs {
	ctx: IContext;
	interaction: any;
	song: string;
	player: AudioPlayer;
}

const play = {
	async execute(args: Iargs) {

		const { ctx, interaction, song, player } = args;
		console.log(song);
		

		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channelId,
			guildId: ctx.config.GUILD_ID,
			adapterCreator: interaction.member.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
		});

		const yt_info = await search(song, {
			limit: 1
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