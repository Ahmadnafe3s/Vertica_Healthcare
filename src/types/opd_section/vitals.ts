
export interface VitalType {
  id: number,
  caseId: number,
  value: string,
  date: string,
  setup_VitalId: number,
  vital: {
    name: string
  }
}

