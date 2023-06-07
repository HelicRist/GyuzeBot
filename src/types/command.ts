import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';
import { IContext } from './context';

export interface Command {
  data: ReturnType<SlashCommandBuilder['toJSON']>;
  execute: (
    ctx: IContext,
    interaction: CommandInteraction,
  ) => Promise<Message<boolean>>;
}

