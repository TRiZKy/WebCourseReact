const mockCrops = [
  {
    id: 'crop-1',
    name: 'Wheat',
    plantingDate: '2024-03-01',
    growthStage: 'Vegetative',
    expectedHarvestDate: '2024-08-15',
    notes: [
      { date: '2024-03-10', text: 'Sprouted' },
      { date: '2024-04-05', text: 'First leaves appeared' }
    ]
  },
  {
    id: 'crop-2',
    name: 'Corn',
    plantingDate: '2024-04-15',
    growthStage: 'Emerging',
    expectedHarvestDate: '2024-09-20',
    notes: [
      { date: '2024-05-01', text: 'Sprouted' },
      { date: '2024-05-25', text: 'First leaves appeared' }
    ]
  }
];

export default mockCrops;
