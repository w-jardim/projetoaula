import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'graduation'
})
export class GraduationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
