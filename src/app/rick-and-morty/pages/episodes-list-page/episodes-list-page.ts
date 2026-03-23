import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { disabled, form, FormField, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { EpisodesList } from '../../components/episodes-list/episodes-list';
import { episodesListResource, purnEmptyProperties } from '../../helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { Episode } from '../../types';

@Component({
  selector: 'app-episodes-list-page',
  imports: [FormField, RouterLink, DecimalPipe, EpisodesList],
  templateUrl: './episodes-list-page.html',
  styleUrl: './episodes-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesListPage {
  readonly name = input<string>();
  readonly page = input<string>();
  readonly episode = input<string>();

  protected readonly params = computed(
    () =>
      ({
        name: this.name() ?? '', // ใช้ name
        page: this.page() ?? '',
        episode: this.episode() ?? '',
      }) as const,
  );

  protected readonly seasons = [
    { label: 'All Seasons', value: '' },
    { label: 'Season 1', value: 'S01' },
    { label: 'Season 2', value: 'S02' },
    { label: 'Season 3', value: 'S03' },
    { label: 'Season 4', value: 'S04' },
    { label: 'Season 5', value: 'S05' },
  ];

  protected readonly resource = episodesListResource(() =>
    purnEmptyProperties(this.params()),
  ).asReadonly();

  protected readonly episodesWithImages = computed<readonly Episode[]>(() => {
    const data = this.resource.value();
    if (!data) return [];

    return data.results.map((episode) => ({
      ...episode,
      // ไม่ต้องมี assets/ หรือ public/ นำหน้า
      displayImage: `images/episodes/${episode.id}.jpg`,
    }));
  });

  protected readonly currentPage = computed(() => +(this.params().page ? this.params().page : '1'));

  protected readonly previousPage = computed(() => {
    if (this.resource.error()) return null; // ถ้ามี Error ให้คืนค่า null ทันที
    const prevUrl = this.resource.value()?.info?.prev;
    return prevUrl ? new URL(prevUrl).searchParams.get('page') : null;
  });

  protected readonly nextPage = computed(() => {
    if (this.resource.error()) return null; // เช็ก Error ด้วย
    const nextUrl = this.resource.value()?.info?.next;
    return nextUrl ? new URL(nextUrl).searchParams.get('page') : null;
  });

  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          name: this.params().name,
          episode: this.params().episode,
        }) as const,
    ),
    (path) => {
      disabled(path, () => this.resource.isLoading());
    },
  );

  private readonly router = inject(Router);

  protected onSearch(): void {
    submit(this.form, async (formValue) => {
      void this.router.navigate([], {
        queryParams: purnEmptyProperties({ ...formValue().value(), page: null }),
        replaceUrl: true,
      });
    });
  }

  protected clearSearch(): void {
    this.form.name().value.set('');
    this.form.episode().value.set(''); // ล้างค่า Season
    this.onSearch();
  }

  protected readonly errorMessage = computed(() => {
    const err = this.resource.error();
    if (!err) return null;
    if (err instanceof HttpErrorResponse) {
      if (err.status === 404) return 'No Episodes found matching your search.';
      return err.error?.error || err.message;
    }
    return 'An unexpected error occurred.';
  });

  protected readonly Math = Math;

  protected readonly pages = computed(() => {
    if (this.resource.error()) return []; // ถ้า Error ไม่ต้องโชว์เลขหน้า

    const totalPages = this.resource.value()?.info?.pages ?? 0;
    if (totalPages <= 1) return [];

    const current = this.currentPage();
    const startPage = Math.floor((current - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  });
}
