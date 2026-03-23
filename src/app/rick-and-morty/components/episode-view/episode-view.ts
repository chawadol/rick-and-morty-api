import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  Resource,
  resource,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import {
  applyEach,
  createManagedMetadataKey,
  form,
  FormField,
  metadata,
} from '@angular/forms/signals';
import { Character, Episode } from '../../types';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-episode-view',
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe, FormField, LowerCasePipe],
  templateUrl: './episode-view.html',
  styleUrl: './episode-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeView {
  readonly data = input.required<Episode>();

  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly characterResourceKey = createManagedMetadataKey<
    Resource<Character | undefined>,
    string
  >((url) => httpResource<Character>(url));

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          characters: this.data().characters,
        }) as const,
    ),
    (path) => {
      applyEach(path.characters, (eachPath) => {
        metadata(eachPath, this.characterResourceKey, ({ value }) => value());
      });
    },
  );
}
