import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  Resource,
  resource,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Character, Episode, RmLocation } from '../../types';
import { fetchResource } from '../../helpers';
import {
  applyEach,
  createManagedMetadataKey,
  form,
  FormField,
  metadata,
} from '@angular/forms/signals';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-character-view',
  standalone: true,
  imports: [DatePipe, AsyncPipe, RouterLink, ExtractIdPipe, LowerCasePipe, FormField],
  templateUrl: './character-view.html',
  styleUrl: './character-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterView {
  readonly data = input.required<Character>();

  readonly moduleRoute = input.required<ActivatedRoute>();

  // 1. ดึงข้อมูลบ้านเกิด (Origin)
  protected readonly originResource = resource({
    params: () => this.data().origin.url,
    loader: async ({ params: url }) => {
      if (!url) return undefined;
      // แก้จาก fetchResource<Location>({ url }) เป็นส่ง url ไปเลย
      return fetchResource<RmLocation>(url);
    },
  });

  // 2. ดึงข้อมูลที่อยู่ปัจจุบัน (Location)
  protected readonly locationResource = resource({
    params: () => this.data().location.url,
    loader: async ({ params: url }) => {
      if (!url) return undefined;
      return fetchResource<RmLocation>(url);
    },
  });

  protected readonly episodeResourceKey = createManagedMetadataKey<
    Resource<Episode | undefined>,
    string
  >((url) => httpResource<Episode>(url));

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          episodes: this.data().episode,
        }) as const,
    ),
    (path) => {
      applyEach(path.episodes, (eachPath) => {
        metadata(eachPath, this.episodeResourceKey, ({ value }) => value());
      });
    },
  );

  protected readonly origin = computed(() => this.originResource.value());
  protected readonly location = computed(() => this.locationResource.value());
}
