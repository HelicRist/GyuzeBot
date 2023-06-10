import { Client, Collection } from 'discord.js';
import { Command } from './command';

export interface IContext {
  client: Client;
  config: {
    GUILD_ID: string;
  };
  commands: Collection<string, Command>;
}