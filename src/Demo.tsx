import 'react-calendar/dist/Calendar.css';

import { Chat, ChatWindow, Launcher, RuntimeAPIProvider, SessionStatus, SystemResponse, TurnType, UserResponse } from '@voiceflow/react-chat';
import { useContext, useState } from 'react';
import { match } from 'ts-pattern';

import { RuntimeContext } from './context';
import { CustomMessage } from './custom-message.enum';
import { DemoContainer } from './styled';

import { LoginMessage } from './messages/LoginMessage.component';
const IMAGE = 'https://picsum.photos/seed/1/200/300';
const AVATAR = 'https://picsum.photos/seed/1/80/80';

export const Demo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { runtime } = useContext(RuntimeContext)!;

  const handleLaunch = async () => {
    setOpen(true);
    await runtime.launch();
  };

  const handleEnd = () => {
    runtime.setStatus(SessionStatus.ENDED);
    setOpen(false);
  };

  const handleSend = (message: string) => {
      runtime.reply(message);
  };

  if (!open) {
    return (
      <span
        style={{
          position: 'absolute',
          right: '2rem',
          bottom: '2rem',
        }}
      >
        <Launcher onClick={handleLaunch} />
      </span>
    );
  }

  return (
    <DemoContainer>
      <ChatWindow.Container>
        <RuntimeAPIProvider {...runtime}>
          <Chat
            title="My Assistant"
            description="welcome to my assistant"
            image={IMAGE}
            avatar={AVATAR}
            withWatermark
            startTime={runtime.session.startTime}
            hasEnded={runtime.isStatus(SessionStatus.ENDED)}
            isLoading={!runtime.session.turns.length}
            onStart={runtime.launch}
            onEnd={handleEnd}
            onSend={handleSend}
            onMinimize={handleEnd}
          >
            {runtime.session.turns.map((turn, turnIndex) =>
              match(turn)
                .with({ type: TurnType.USER }, ({ id, type: _, ...rest }) => <UserResponse {...rest} key={id} />)
                .with({ type: TurnType.SYSTEM }, ({ id, type: _, ...rest }) => (
                  <SystemResponse
                    {...rest}
                    key={id}
                    Message={({ message, ...props }) =>
                      match(message)
                         .with({ type: CustomMessage.LOGIN}, ({ payload: { today } }) => (
                          <LoginMessage {...props} value={"foo"} runtime={runtime} />
                        ))
                        .otherwise(() => <SystemResponse.SystemMessage {...props} message={message} />)
                    }
                    avatar={AVATAR}
                    isLast={turnIndex === runtime.session.turns.length - 1}
                  />
                ))
                .exhaustive()
            )}
            {runtime.indicator && <SystemResponse.Indicator avatar={AVATAR} />}
          </Chat>
        </RuntimeAPIProvider>
      </ChatWindow.Container>
    </DemoContainer>
  );
};
