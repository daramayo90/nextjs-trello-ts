interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending: This is a new line to put something as an example',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In-Progress: This is a new line to put something as an example',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finished: This is a new line to put something as an example',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
