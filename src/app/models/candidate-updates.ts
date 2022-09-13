export interface CandidateUpdates {
  id: number,
  source: string,
  updateDate: string,
  changeSet: ChangeSet[]
}

interface ChangeSet {
  newValue: string,
  oldValue: string,
  type: {[key:string]:string | number | boolean}
}
