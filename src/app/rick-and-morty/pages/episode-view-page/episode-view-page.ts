import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { EpisodeView } from '../../components/episode-view/episode-view';
import { ModuleRoute } from '../../tokens';
import { episodeResource } from '../../helpers';

@Component({
  selector: 'app-episode-view-page',
  imports: [EpisodeView],
  templateUrl: './episode-view-page.html',
  styleUrl: './episode-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeViewPage {
  readonly id = input.required<string>();

  protected moduleRoute = inject(ModuleRoute);

  protected readonly dataResource = episodeResource(() => this.id());

  protected readonly episodeWithImage = computed(() => {
    const data = this.dataResource.value();
    if (!data) return null;

    return {
      ...data,
      // สร้าง path รูปภาพตาม ID ของ episode
      displayImage: `images/episodes/${data.id}.jpg`,
    };
  });

  protected goBack(): void {
    history.back();
  }
}
