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
import { LocationsList } from '../../components/locations-list/locations-list';
import { locationsListResource, purnEmptyProperties } from '../../helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { LOCATION_TYPES, LocationType, RmLocation } from '../../types';

@Component({
  selector: 'app-locations-list-page',
  imports: [FormField, RouterLink, DecimalPipe, LocationsList],
  templateUrl: './locations-list-page.html',
  styleUrl: './locations-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsListPage {
  readonly name = input<string>();
  readonly page = input<string>();
  readonly type = input<LocationType>();

  protected readonly params = computed(
    () =>
      ({
        name: this.name() ?? '', // ใช้ name
        page: this.page() ?? '',
        type: this.type() ?? '',
      }) as const,
  );

  protected readonly resource = locationsListResource(() =>
    purnEmptyProperties(this.params()),
  ).asReadonly();

  protected readonly locationTypes = LOCATION_TYPES;

  protected readonly locationsWithImages = computed<readonly RmLocation[]>(() => {
    const data = this.resource.value();
    if (!data) return [];

    return data.results.map((loc) => ({
      ...loc,
      // ไม่ต้องมี assets/ หรือ public/ นำหน้า
      displayImage: `images/locations/${loc.id}.jpg`,
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
          type: this.params().type, // ผูกค่าจาก URL params เข้ากับฟอร์ม
        }) as const,
    ),
    (path) => {
      disabled(path, () => this.resource.isLoading());
    },
  );

  private readonly router = inject(Router);

  protected onSearch(): void {
    submit(
      this.form,
      async (form) =>
        void this.router.navigate([], {
          // ล้างค่า page ทิ้งเมื่อ search ใหม่ เพื่อให้กลับไปเริ่มหน้า 1
          queryParams: purnEmptyProperties({ ...form().value(), page: null }),
          replaceUrl: true,
        }),
    );
  }

  protected clearSearch(): void {
    this.form.name().value.set('');
    this.form.type().value.set(''); // ล้างค่า Filter type
    this.onSearch();
  }

  protected readonly errorMessage = computed(() => {
    const err = this.resource.error();
    if (!err) return null;

    if (err instanceof HttpErrorResponse) {
      if (err.status === 404) return 'No Locations found matching your search.';
      return err.error?.error || err.message; // ดึงข้อความ "There is nothing here" จาก API
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
