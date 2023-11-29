import { useEffect } from 'react';
import { Message, SystemResponse, useRuntime } from '@voiceflow/react-chat';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginMessage: React.FC<SystemMessageProps> = ({ value, runtime, ...props }) => {
  const { loginWithPopup, isAuthenticated, user } = useAuth0();


  const handleDone = async () => {
      return runtime.interact({ type: 'login_successful', payload: null });
  };

  const handleFail = async () => {
      return runtime.interact({ type: 'login_fail', payload: null });
  };

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (error) {
      handleFail();
    }
  };

  if (isAuthenticated) {
    return (
      <SystemResponse.SystemMessage {...props}>
         <Message from="system">
          {`Welcome back ${user.name}`}
	  <button onClick={handleDone}>
            continue
          </button>  
      </Message>
      </SystemResponse.SystemMessage>
    );
  } else {
    return (
      <button onClick={handleLogin}>
        Log In
      </button>  
    );
  }
};
