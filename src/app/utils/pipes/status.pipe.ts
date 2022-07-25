import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CandidateStatus } from '@constants/candidates';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: unknown): ThemePalette {
    switch (value) {
      case CandidateStatus.CREATED:
        return 'primary';
      case CandidateStatus.EMPLOYED:
        return 'accent';
      case CandidateStatus.UNEMPLOYED:
        return 'warn';
      default:
        return 'primary';
    }
  }
}
