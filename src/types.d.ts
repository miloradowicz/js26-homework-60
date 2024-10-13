import { DateTime } from 'luxon';

export interface MessageFormData {
  get message(): string;
}

export interface UsernameFormData {
  get username(): string;
}

export interface Message {
  get _id(): string;
  get message(): string;
  get author(): string;
  get datetime(): DateTime;
}
