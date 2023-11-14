import Router from './router/router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer className={'text-xs'} />
      <Router />
    </div>
  );
};

export default App;
