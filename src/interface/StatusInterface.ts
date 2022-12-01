import { ProgressStatus } from '../enums/ProgressStatus';

export interface StatusInterface {
  statusType: ProgressStatus;
  progress: number;
  total: number;
}
