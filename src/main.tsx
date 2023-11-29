import { createRoot } from 'react-dom/client';

import { RuntimeProvider } from './context';
import { Auth0Provider } from '@auth0/auth0-react';
import { Demo } from './Demo';

const auth0Config = {
  domain: import.meta.env.VF_AUTH0_DOMAIN,
  clientId: import.meta.env.VF_AUTH0_CLIENT_ID,
  audience: import.meta.env.VF_AUTH0_AUDIENCE
};

createRoot(document.getElementById('root')!).render(
  <Auth0Provider {...auth0Config}>
    <RuntimeProvider>
      <Demo />
    </RuntimeProvider>
  </Auth0Provider>
);

