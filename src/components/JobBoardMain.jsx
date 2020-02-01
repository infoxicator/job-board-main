import React from 'react';
import { Route, IndexRoute } from '@americanexpress/one-app-router';
import csp from '../csp';
import JobBoard from './JobBoard';
import JobDetail from './JobDetail';

const JobBoardMain = ({ children }) => (
  <div>
    { children }
  </div>
);

// Read about childRoutes: https://github.com/americanexpress/one-app#routing
JobBoardMain.childRoutes = () => ([
  <Route path="/jobs" component={JobBoardMain}>
    <IndexRoute component={JobBoard} />
    <Route path=":jobId" component={JobDetail} />
  </Route>,
]);

// Read about appConfig: https://github.com/americanexpress/one-app#appconfig
if (!global.BROWSER) {
  JobBoardMain.appConfig = {
    csp,
  };
}

export default JobBoardMain;
