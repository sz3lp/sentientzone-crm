import React from 'react';
import { useJobs } from '../../lib/hooks';

const statusColors: Record<string, string> = {
  assigned: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  needs_qa: 'bg-orange-500',
  complete: 'bg-green-500',
  rework: 'bg-red-500',
};

export default function DashboardPage() {
  const { jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (error) {
    return <div className="text-red-600">{String(error)}</div>;
  }

  const statusCounts: Record<string, number> = {
    assigned: 0,
    in_progress: 0,
    needs_qa: 0,
    complete: 0,
    rework: 0,
  };

  jobs?.forEach(job => {
    statusCounts[job.status]++;
  });

  const todaysInstalls = jobs?.filter(
    job => job.status === 'assigned' || job.status === 'in_progress'
  ) || [];

  const attentionRequired = jobs?.filter(
    job => job.status === 'needs_qa' || job.status === 'rework'
  ) || [];

  return (
    <div className="space-y-8 p-4">
      {/* Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className={`${statusColors[status]} text-white rounded-md p-4 flex flex-col items-center justify-center`}
          >
            <div className="text-2xl font-bold">{count}</div>
            <div className="capitalize">{status.replace('_', ' ')}</div>
          </div>
        ))}
      </div>

      {/* Today’s Installs Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Today’s Installs</h2>
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-left">Installer</th>
              <th className="px-2 py-1 text-left">Address</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysInstalls.map(job => (
              <tr key={job.id} className="border-t">
                <td className="px-2 py-1">{job.installerId}</td>
                <td className="px-2 py-1">{job.address}</td>
                <td className="px-2 py-1 capitalize">{job.status.replace('_', ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attention Required Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Attention Required</h2>
        <ul className="list-disc ml-5 space-y-1">
          {attentionRequired.map(job => (
            <li key={job.id}>
              Job #{job.id} — {job.status === 'needs_qa' ? 'Needs QA' : 'Rework'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
