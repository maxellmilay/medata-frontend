import { ProgressStatus } from '../enums/ProgressStatus';
import { MediaInfoType } from '../interface/MediaInterface';

export function validateInput(media: MediaInfoType) {
  if (
    media.title === '' ||
    media.statusType === ProgressStatus.NONE ||
    media.total === 0
  ) {
    alert(
      'Please fill out the title, status type, or choose a total greater than 0'
    );
    return false;
  }
  return true;
}
