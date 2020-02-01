import React, { useState } from 'react';
import { Link } from '@americanexpress/one-app-router';
import { jobs } from '../fake-data';

const JobDetail = ({ params }) => {
  const { jobId } = params;
  const [Job] = useState(jobs.find((job) => job.id === jobId));

  return (
    <div>
      <h1 className="title">{Job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${Job.company.id}`}>{Job.company.name}</Link>
      </h2>
      <div className="box">{Job.description}</div>
    </div>
  );
};

export default JobDetail;
