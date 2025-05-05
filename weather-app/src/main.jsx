import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
// import SignIn from './components/signIn';
import './index.css'

import('./components/signIn').then(({ default: SignIn }) => {
  const root = createRoot(document.getElementById('root')).render(
    <StrictMode>
      <SignIn />
    </StrictMode>
  );
});