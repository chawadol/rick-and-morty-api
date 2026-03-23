import { ChangeDetectionStrategy, Component, inject, Injector, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Character } from '../../types';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-characters-list',
  imports: [RouterLink, ExtractIdPipe, LowerCasePipe],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersList {
  readonly data = input.required<readonly Character[]>();

  private readonly injector = inject(Injector);
}
