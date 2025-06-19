import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const payload = await req.json();
  console.log('Checklist submission for job', context.params.id, payload);
  return NextResponse.json({ success: true });
}
