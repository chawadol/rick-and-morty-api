import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LocationView } from '../../components/location-view/location-view';
import { ModuleRoute } from '../../tokens';
import { locationResource } from '../../helpers';

@Component({
  selector: 'app-location-view-page',
  imports: [LocationView],
  templateUrl: './location-view-page.html',
  styleUrl: './location-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationViewPage {
  readonly id = input.required<string>();

  protected moduleRoute = inject(ModuleRoute);

  protected readonly dataResource = locationResource(() => this.id());

  protected readonly locationWithImage = computed(() => {
    const data = this.dataResource.value();
    if (!data) return null;

    return {
      ...data,
      // สร้าง path รูปภาพตาม ID ของ episode
      displayImage: `images/locations/${data.id}.jpg`,
    };
  });
  protected goBack(): void {
    history.back();
  }
}
