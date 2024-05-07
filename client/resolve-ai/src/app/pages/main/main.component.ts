import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  hintContent: string = 'É o quarto número primo começando em 0';
  remainingHints: string = '7';

  constructor(public baseService: BaseService) {}
}
