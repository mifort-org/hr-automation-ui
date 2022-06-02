import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: any): string {
    if (value?.firsname && value?.lastname) return `${value?.firstname} ${value?.lastname}`;
    return 'No name';
  }
}
