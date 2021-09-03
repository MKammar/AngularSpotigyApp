import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortFormat'
})

export class ShortFormatPipe implements PipeTransform {

  transform(number: number, args?: any):any {
    if(number > 999 && number < 1000000){
      return (number/1000).toFixed(1) + 'K';
  }else if(number > 1000000){
      return (number/1000000).toFixed(1) + 'M';
  }else if(number < 900){
      return number;
  }
  }
}
