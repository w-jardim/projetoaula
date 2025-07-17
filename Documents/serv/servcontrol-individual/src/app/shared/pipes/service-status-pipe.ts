import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceStatus'
})
export class ServiceStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
