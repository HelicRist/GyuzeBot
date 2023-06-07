import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

export interface Command {
  data: ReturnType<SlashCommandBuilder['toJSON']>;
  execute: (
    interaction: CommandInteraction,
  ) => Promise<Message<boolean>>;
}

