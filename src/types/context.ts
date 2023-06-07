import { Client } from 'discord.js';

export interface IContext {
  client: Client;
  config: object;
}