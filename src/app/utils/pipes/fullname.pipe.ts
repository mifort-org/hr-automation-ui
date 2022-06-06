import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(attribute: any): string {
    if (attribute?.firstname?.value && attribute?.lastname?.value)
      return `${attribute?.firstname?.value} ${attribute?.lastname?.value}`;
    return 'No name';
  }
}
