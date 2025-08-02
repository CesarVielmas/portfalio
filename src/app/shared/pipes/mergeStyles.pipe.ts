import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeStyles',
  pure:true
}) 
export class MergeStylesPipe implements PipeTransform {
  transform(stylesArray: Array<Record<string, any>>): Record<string, any> {
    let result:Object = {};
    stylesArray.forEach(element => {
        result = {...result,...element}
    });
    return Object.assign(result);
  }
}
