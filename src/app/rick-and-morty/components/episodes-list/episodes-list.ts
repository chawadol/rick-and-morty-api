import { ChangeDetectionStrategy, Component, inject, Injector, input } from '@angular/core';
import { Episode } from '../../types';
import { RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';

@Component({
  selector: 'app-episodes-list',
  imports: [RouterLink, ExtractIdPipe],
  templateUrl: './episodes-list.html',
  styleUrl: './episodes-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesList {
  readonly data = input.required<readonly Episode[]>();

  private readonly injector = inject(Injector);
}
