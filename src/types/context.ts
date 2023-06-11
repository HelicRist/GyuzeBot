import { Client, Collection } from 'discord.js';
import { Command } from './command';
import { AudioPlayer } from '@discordjs/voice';

export interface IContext {
  client: Client;
  config: {
    GUILD_ID: string;
  };
  commands: Collection<string, Command>;
  player: AudioPlayer;
}