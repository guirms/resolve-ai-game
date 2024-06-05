import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  constructor(public baseService: BaseService) { }
}
