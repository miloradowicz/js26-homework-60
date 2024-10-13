import axios from 'axios';
import { DateTime } from 'luxon';
import { Message } from '../types.d';

const baseUrl = 'http://146.185.154.90:8000';

const headers = {
  Accept: 'application/json',
};

export const getMessages = async (since?: DateTime) => {
  const endpoint = 'messages';

  const url = new URL(endpoint + (since === undefined ? '' : `?datetime=${since.toISO()}`), baseUrl);
  const { data, status } = await axios.get<Message[]>(url.href, { headers });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data;
};

export const postMessage = async (author: string, message: string) => {
  const endpoint = 'messages';

  const url = new URL(endpoint, baseUrl);
  const { data, status } = await axios.post<Message>(url.href, { author, message }, { headers: { ...headers, 'Content-Type': 'application/json' } });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data;
};
