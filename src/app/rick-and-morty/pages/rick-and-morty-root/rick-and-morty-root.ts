import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rick-and-morty-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './rick-and-morty-root.html',
  styleUrl: './rick-and-morty-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RickAndMortyRoot {}
