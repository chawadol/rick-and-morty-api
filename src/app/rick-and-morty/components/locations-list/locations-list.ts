import { ChangeDetectionStrategy, Component, inject, Injector, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { RmLocation } from '../../types';

@Component({
  selector: 'app-locations-list',
  imports: [RouterLink, ExtractIdPipe],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsList {
  readonly data = input.required<readonly RmLocation[]>();

  private readonly injector = inject(Injector);
}
