import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'convertToFormatDateBr'
})
export class ConvertToFormatDateBrPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value) {
      return moment(value).format('DD/MM/YYYY');
    }
  }

}
