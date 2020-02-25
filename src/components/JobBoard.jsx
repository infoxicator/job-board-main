import React from 'react';
import JobList from './JobList';
import { jobs } from '../fake-data';

const JobBoard = () => (
  <div>
    <h1 className="title">Job Board v1.1.0</h1>
    <JobList jobs={jobs} />
  </div>
);

export default JobBoard;
