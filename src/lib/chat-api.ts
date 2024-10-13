import axios from 'axios';
import qs from 'qs';
import { DateTime } from 'luxon';
import { Message } from '../types.d';

type MessageJson = Message & { datetime: string };

const baseUrl = 'http://146.185.154.90:8000';

const headers = {
  Accept: 'application/json',
};

export const getMessages = async (since?: DateTime): Promise<Message[]> => {
  const endpoint = 'messages';

  const url = new URL(endpoint + (since === undefined ? '' : `?datetime=${since.toUTC().toISO()}`), baseUrl);
  const { data, status } = await axios.get<MessageJson[]>(url.href, { headers });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return data.map((x) => ({ ...x, datetime: DateTime.fromISO(x.datetime) }));
};

export const postMessage = async (author: string, message: string): Promise<Message> => {
  const endpoint = 'messages';

  const url = new URL(endpoint, baseUrl);

  const { data, status } = await axios.post<MessageJson>(url.href, qs.stringify({ author, message }), {
    headers: { ...headers },
  });

  if (status !== 200) {
    throw new Error(`${status}`);
  }

  return { ...data, datetime: DateTime.fromISO(data.datetime) };
};
