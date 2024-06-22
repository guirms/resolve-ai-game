import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { UserService } from '../../services/pages/user/user.service';
import { takeUntil } from 'rxjs';
import { RankingResponse } from '../../components/data-types/responses';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  isLoading = false;
  rankingResponse!: RankingResponse[];
  currentPage: number = 1;

  constructor(public baseService: BaseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getRanking(this.currentPage);
  }

  getRanking(currentPage: number): void {
    this.isLoading = true;

    this.userService.getRanking(currentPage)
      .pipe(takeUntil(this.baseService.ngUnsubscribe))
      .subscribe({
        next: (result) => {
          this.currentPage = currentPage;

          this.rankingResponse = result;

          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;          

          alert(error.error?.message ?? 'Erro de comunicação com o serviço');
        }
      });
  }

  changePage(nextPage: number): void {
    let currentPage = this.currentPage;

    if (currentPage === 1 && nextPage === -1) {
      alert('Página inválida');
      return;
    }

    currentPage += nextPage;

    this.getRanking(currentPage);
  }
}
