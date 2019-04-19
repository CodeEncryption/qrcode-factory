import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'param'})
export class ParamPipe implements PipeTransform {
  transform(value: string): string {
    var reg=new RegExp(/\//,'g');
    return value.replace(reg,'%2f');
  }
}