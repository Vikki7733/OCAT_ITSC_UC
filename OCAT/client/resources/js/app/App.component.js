import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DashboardBulletin } from '../components/Dashboard/bulletin';
import { AssessmentNew } from '../components/Assessments/new';
import { AssessmentList } from '../components/Assessments/list';
import 'bootstrap/dist/css/bootstrap.min.css';
export function App() {
  return <>
       <BrowserRouter>
        <Route path="/" component={DashboardBulletin} />
        <Route path="/assessment/new" component={AssessmentNew} />
        <Route path="/assessment/list" component={AssessmentList} />
      </BrowserRouter>
  </>;
}