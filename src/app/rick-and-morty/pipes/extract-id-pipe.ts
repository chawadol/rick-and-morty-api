import { Pipe, PipeTransform } from '@angular/core';
import { extractId } from '../helpers';

@Pipe({
  name: 'extractId',
})
export class ExtractIdPipe implements PipeTransform {
  transform(url: string): string | null {
    return extractId(url);
  }
}
