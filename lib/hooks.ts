import { useEffect, useState } from 'react';
import type { Job, Zone } from './mockJobs';

export interface ZoneWithChecklist extends Zone {
  checklist: string[];
}

export interface JobDetail extends Job {
  siteNotes: string;
  zones: ZoneWithChecklist[];
}

export function useJobs(installerId?: string) {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const url = installerId
      ? `/api/jobs?installerId=${encodeURIComponent(installerId)}`
      : '/api/jobs';
    setIsLoading(true);
    setError(null);
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [installerId]);

  return { jobs, isLoading, error };
}

export function useJob(jobId: string) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!jobId) return;
    const url = `/api/jobs/${jobId}`;
    setIsLoading(true);
    setError(null);
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => setJob(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [jobId]);

  return { job, isLoading, error };
}

export function useSubmitChecklist() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function submitChecklist(payload: any) {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${payload.jobId}/checklist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      console.log('Checklist submitted:', data);
    } catch (err) {
      console.error('Checklist submission failed:', err);
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submitChecklist, isSubmitting, error };
}

export default { useJobs, useJob, useSubmitChecklist };
