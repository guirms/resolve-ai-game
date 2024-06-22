import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { CurrentNumber } from '../../components/data-types/dtos';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../services/pages/main/main.service';
import { takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserChallengeResponse } from '../../components/data-types/responses';
import { ProgressRequest } from '../../components/data-types/requests';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  userChallengeResponse!: UserChallengeResponse;
  currentNumber!: CurrentNumber;
  remainingAttemptsPerNumber!: number;
  remainingHintsPerNumber!: number;
  totalRemainingHints!: number;
  guessNumber!: number | null;
  disableButtons = false;
  isLoading = false;

  constructor(public baseService: BaseService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getChallenge();
  }

  sendGuess(): void {
    if (!this.guessNumber || isNaN(this.guessNumber)) {
      alert('Por favor digite um número válido');
      return;
    }

    if (this.remainingAttemptsPerNumber === 0) {
      this.guessNumber = null;
      this.disableButtons = true;
      alert('Você perdeu. Tente novamente outro dia!');
      this.saveProgress();
      return;
    }

    let totalPoints = 0;
    let isCurrentNumber = true;

    if (this.guessNumber === this.currentNumber.number) {
      if (this.currentNumber.dayContentIndex === 2) {
        alert('Você venceu e ganhou 100 pontos, parabéns!');
        totalPoints += 10 - 4 + this.remainingHintsPerNumber - 5 + this.remainingAttemptsPerNumber;
      }
      else {
        alert('Você acertou. Próximo número!');
        totalPoints += 10 - 4 + this.remainingHintsPerNumber - 5 + this.remainingAttemptsPerNumber;
        isCurrentNumber = false;
        this.changeNumber();
      }
    }
    else {
      if (this.remainingAttemptsPerNumber === 1) {
        this.disableButtons = true;
        alert('Você perdeu. Tente novamente outro dia!');
      }
      else {
        alert('Você errou. Tente novamente!');
      }

      this.remainingAttemptsPerNumber--;
    }

    this.guessNumber = null;
    this.saveProgress(totalPoints, isCurrentNumber);
  }

  changeHint(): void {
    if (this.totalRemainingHints === 0 || this.remainingHintsPerNumber === 0) {
      alert('Suas dicas acabaram!');
      return;
    }

    let dayContentIndex = this.currentNumber.dayContentIndex;
    let hintIndex = 0;

    if (this.currentNumber.hintIndex === 4) {
      alert('As dicas desse número acabaram!');

      return;
    }
    else {
      hintIndex = this.currentNumber.hintIndex += 1;
    }

    this.currentNumber.dailyChallengeId = this.userChallengeResponse.dailyChallenges[dayContentIndex].dailyChallengeId;
    this.currentNumber.number = this.userChallengeResponse.dailyChallenges[dayContentIndex].number;
    this.currentNumber.hint = this.userChallengeResponse.dailyChallenges[dayContentIndex].hints[hintIndex];
    this.currentNumber.dayContentIndex = dayContentIndex;
    this.currentNumber.hintIndex = hintIndex;

    this.remainingHintsPerNumber--;
    this.totalRemainingHints--;
  }

  private getChallenge(): void {
    this.isLoading = true;

    this.mainService.getChallenge()
      .pipe(takeUntil(this.baseService.ngUnsubscribe))
      .subscribe({
        next: (result) => {
          this.userChallengeResponse = result;

          this.currentNumber = {
            dailyChallengeId: this.userChallengeResponse.dailyChallenges[0].dailyChallengeId,
            number: this.userChallengeResponse.dailyChallenges[0].number,
            hint: this.userChallengeResponse.dailyChallenges[0].hints[0],
            dayContentIndex: 0,
            hintIndex: 0
          };

          this.remainingAttemptsPerNumber = this.userChallengeResponse.remainingAttemptsPerNumber;
          this.remainingHintsPerNumber = this.userChallengeResponse.remainingHintsPerNumber;
          this.totalRemainingHints = this.userChallengeResponse.totalRemainingHints;

          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          alert(error.error?.message ?? 'Erro de comunicação com o serviço');
        }
      });
  }

  private saveProgress(totalPoints: number = 0, isCurrentNumber: boolean = true): void {
    const progressRequest: ProgressRequest = {
      pointsToAdd: totalPoints,
      remainingAttemptsPerNumber: this.remainingAttemptsPerNumber,
      remainingHintsPerNumber: this.remainingHintsPerNumber,
      totalRemainingHints: this.totalRemainingHints,
      lastDailyChallengeId: isCurrentNumber ? this.currentNumber.dailyChallengeId : this.currentNumber.dailyChallengeId - 1
    };

    this.mainService.saveProgress(progressRequest)
      .pipe(takeUntil(this.baseService.ngUnsubscribe))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          alert(error.error?.message ?? 'Erro de comunicação com o serviço');
        }
      });
  }

  private changeNumber(): void {
    const dayContentIndex = this.currentNumber.dayContentIndex += 1;
    const hintIndex = 0;

    this.currentNumber = {
      dailyChallengeId: this.userChallengeResponse.dailyChallenges[dayContentIndex].dailyChallengeId,
      number: this.userChallengeResponse.dailyChallenges[dayContentIndex].number,
      hint: this.userChallengeResponse.dailyChallenges[dayContentIndex].hints[hintIndex],
      dayContentIndex: dayContentIndex,
      hintIndex: hintIndex
    };

    this.remainingAttemptsPerNumber = 5;
    this.remainingHintsPerNumber = this.totalRemainingHints >= 4 ? 4 : this.remainingHintsPerNumber;
  }
}
