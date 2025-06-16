import { NextRequest, NextResponse } from 'next/server';
import { jobs, Zone } from '../../../../lib/mockJobs';

const checklistTemplates: Record<number, string[]> = {
  1: ['Install Controller', 'Wire Relay', 'Attach Sensors'],
  2: ['Install Controller', 'Check Existing Sensors'],
  3: ['Software-only Verification']
};

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const job = jobs.find(j => j.id === id);
  if (!job) {
    return new NextResponse(null, { status: 404 });
  }

  const zonesWithChecklist = job.zones.map(zone => ({
    ...zone,
    checklist: checklistTemplates[zone.installMode]
  }));

  const result = {
    ...job,
    siteNotes: `Notes for job ${job.id}`,
    zones: zonesWithChecklist
  };

  return NextResponse.json(result);
}
