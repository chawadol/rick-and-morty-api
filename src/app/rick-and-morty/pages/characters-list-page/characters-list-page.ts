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
import { CharactersList } from '../../components/characters-list/characters-list';
import { charactersListResource, purnEmptyProperties } from '../../helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { CharacterGender, CharacterStatus } from '../../types';

@Component({
  selector: 'app-characters-list-page',
  imports: [FormField, RouterLink, DecimalPipe, CharactersList],
  templateUrl: './characters-list-page.html',
  styleUrl: './characters-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListPage {
  readonly name = input<string>(); // เปลี่ยน search เป็น name ให้ตรง API
  readonly page = input<string>();
  readonly status = input<CharacterStatus>();
  readonly gender = input<CharacterGender>();

  protected readonly params = computed(
    () =>
      ({
        name: this.name() ?? '', // ใช้ name
        page: this.page() ?? '',
        status: this.status() ?? '',
        gender: this.gender() ?? '',
      }) as const,
  );

  protected readonly resource = charactersListResource(() =>
    purnEmptyProperties(this.params()),
  ).asReadonly();

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

  // ใช้ linkedSignal ผูกกับ name()
  protected readonly form = form(
    linkedSignal(
      () =>
        ({
          name: this.params().name,
          status: this.params().status,
          gender: this.params().gender, // ผูก gender เข้ากับ Form
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
        // เมื่อกรองใหม่ ให้ reset กลับไปหน้า 1 เสมอ
        queryParams: purnEmptyProperties({
          ...formValue().value(),
          page: null,
        }),
        replaceUrl: true,
      });
    });
  }

  protected clearSearch(): void {
    this.form.name().value.set('');
    this.form.status().value.set('');
    this.form.gender().value.set(''); // ล้างค่า gender ด้วย
    this.onSearch();
  }

  protected readonly errorMessage = computed(() => {
    const err = this.resource.error();
    if (!err) return null;

    if (err instanceof HttpErrorResponse) {
      if (err.status === 404) return 'No characters found matching your search.';
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
