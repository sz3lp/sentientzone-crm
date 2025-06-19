export type Status = 'assigned' | 'in_progress' | 'needs_qa' | 'complete' | 'rework';

export interface Zone {
  zoneName: string;
  installMode: 1 | 2 | 3;
  quoteLineItems: string[];
  notes: string;
}

export interface Job {
  id: string;
  customerName: string;
  address: string;
  status: Status;
  installerId: string;
  zones: Zone[];
}

export const jobs: Job[] = [
  {
    id: 'job1',
    customerName: 'Alice Smith',
    address: '123 Main St, Springfield',
    status: 'assigned',
    installerId: 'installer1',
    zones: [
      {
        zoneName: 'Kitchen',
        installMode: 1,
        quoteLineItems: ['Controller', 'Relay'],
        notes: 'Install near pantry'
      },
      {
        zoneName: 'Living Room',
        installMode: 2,
        quoteLineItems: ['Sensors'],
        notes: 'Existing sensors present'
      }
    ]
  },
  {
    id: 'job2',
    customerName: 'Bob Johnson',
    address: '456 Oak Ave, Shelbyville',
    status: 'in_progress',
    installerId: 'installer2',
    zones: [
      {
        zoneName: 'Main Entrance',
        installMode: 3,
        quoteLineItems: ['Software'],
        notes: 'Remote configuration'
      }
    ]
  }
];
