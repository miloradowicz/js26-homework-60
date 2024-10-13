import { DateTime } from 'luxon';

export enum Alignment {
  Left = 'left',
  Right = 'right',
}

export interface Message {
  get _id(): string;
  get message(): string;
  get author(): string;
  get datetime(): DateTime;
}

export interface MessageFormData {
  get message(): string;
}

export interface MessageView extends Message {
  get alignment(): Alignment;
}

export interface UsernameFormData {
  get username(): string;
}
