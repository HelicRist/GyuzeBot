import { Message, SlashCommandBuilder } from 'discord.js';
import { IContext } from '../../../types/context';

// /pomodoro studyTime pauseTime - bot get in vc - play chill music - /media/audio/pause and study
// stop 	-pause the timer
// resume	- if it was stopped it resume the timer in the correct timer
// if its been manually disconnected -> reply @user ive been disconnected
const infos = new SlashCommandBuilder()
	.setName('pomodoro')
	.setDescription('pomodoro the pings')
	.setDefaultMemberPermissions(0);

const { joinVoiceChannel } = require('@discordjs/voice');
function voice(){
	console.log("test");
	
}
const channel = {
	'id':'992086622659153920',
	guild:{
		id: '666312151354572801',
		voiceAdapterCreator: voice
	}
}

const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});
const pomodoro = {
	data: infos.toJSON(),
	async execute(ctx: IContext, interaction: any) {
		return await interaction.reply('pomodoro');
	}
};

export default pomodoro;