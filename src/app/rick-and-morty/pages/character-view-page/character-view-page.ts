import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CharacterView } from '../../components/character-view/character-view';
import { ModuleRoute } from '../../tokens';
import { characterResource } from '../../helpers';

@Component({
  selector: 'app-character-view-page',
  imports: [CharacterView],
  templateUrl: './character-view-page.html',
  styleUrl: './character-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterViewPage {
  readonly id = input.required<string>();

  protected moduleRoute = inject(ModuleRoute);

  protected readonly dataResource = characterResource(() => this.id());

  protected goBack(): void {
    history.back();
  }
}
