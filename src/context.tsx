import { useRuntime } from '@voiceflow/react-chat';
import { createNanoEvents } from 'nanoevents';
import { createContext, useMemo } from 'react';

import { LoginTrace } from './traces/login.trace.ts';

export interface RuntimeContextValue {
  runtime: ReturnType<typeof useRuntime>;
  subscribe: <K extends keyof RuntimeEvents>(event: K, callback: RuntimeEvents[K]) => void;
}

export const RuntimeContext = createContext<RuntimeContextValue | null>(null);

export const RuntimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const emitter = useMemo(() => createNanoEvents<RuntimeEvents>(), []);
  const runtime = useRuntime({
    verify: { projectID: '65423ee96a2a540007613de5', versionID:'production' },
    session: { userID: `anonymous-${Math.random()}` },
    traces: [LoginTrace],
  });


  const subscribe = (event: keyof RuntimeEvents, callback: (data?: any) => void) => emitter.on(event, callback);

  return <RuntimeContext.Provider value={{ runtime, subscribe }}>{children}</RuntimeContext.Provider>;
};
