import { CustomMessage } from '../custom-message.enum';
import { LoginMessage } from '../messages/LoginMessage.tsx';
import { Trace } from './types';

export const LoginTrace: Trace = {
  canHandle: ({ type }) => type === 'login',
  handle: ({ context }, trace) => {
    context.messages.push({ type: CustomMessage.LOGIN, payload: JSON.parse(trace.payload) });
    return context;
  },
};
