import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, linkedSignal, Resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import {
  applyEach,
  createManagedMetadataKey,
  form,
  FormField,
  metadata,
} from '@angular/forms/signals';
import { Character, RmLocation } from '../../types';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-location-view',
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe, FormField, LowerCasePipe],
  templateUrl: './location-view.html',
  styleUrl: './location-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationView {
  readonly data = input.required<RmLocation>();

  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly residentResourceKey = createManagedMetadataKey<
    Resource<Character | undefined>,
    string
  >((url) => httpResource<Character>(url));

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          characters: this.data().residents,
        }) as const,
    ),
    (path) => {
      applyEach(path.characters, (eachPath) => {
        metadata(eachPath, this.residentResourceKey, ({ value }) => value());
      });
    },
  );
}
