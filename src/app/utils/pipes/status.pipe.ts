import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ECandidateStatus } from '@constants/candidates';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: unknown): ThemePalette {
    switch (value) {
      case ECandidateStatus.CREATED:
        return 'primary';
      case ECandidateStatus.EMPLOYED:
        return 'accent';
      case ECandidateStatus.UNEMPLOYED:
        return 'warn';
      default:
        return 'primary';
    }
  }
}
