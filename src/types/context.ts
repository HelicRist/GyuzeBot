import { Client, Collection } from 'discord.js';
import { Command } from './command';

export interface IContext {
  client: Client;
  config: object;
  commands: Collection<string, Command>;
}