import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('3rufbl/prcnhrms');
  setupLogRocketReact(LogRocket);
}
