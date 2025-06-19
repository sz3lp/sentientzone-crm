import { NextRequest, NextResponse } from 'next/server';
import { jobs } from '../../../lib/mockJobs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installerId = searchParams.get('installerId');
  const filtered = installerId
    ? jobs.filter(job => job.installerId === installerId)
    : jobs;
  return NextResponse.json(filtered);
}
