import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { CurrentNumber } from '../../components/data-types/dtos';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../services/pages/main/main.service';
import { takeUntil } from 'rxjs';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { DailyChallengeResponse } from '../../components/data-types/responses';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  dailyChallengeResponse!: DailyChallengeResponse[];
  currentNumber!: CurrentNumber;
  totalremainingHintsPerNumber: number = 9;
  numberremainingHintsPerNumber: number = 4;
  remainingAttemptsPerNumber: number = 5;
  guessNumber!: number | null;
  disableButtons = false;
  isLoading = false;

  constructor(public baseService: BaseService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getChallenge();
  }

  getChallenge(): void {
    this.isLoading = true;

    this.mainService.getChallenge()
      .pipe(takeUntil(this.baseService.ngUnsubscribe))
      .subscribe({
        next: (result) => {
          this.dailyChallengeResponse = result;

          this.currentNumber = {
            number: this.dailyChallengeResponse[0].number,
            hint: this.dailyChallengeResponse[0].hints[0],
            dayContentIndex: 0,
            hintIndex: 0
          };


          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          alert(error.error?.message ?? 'Erro de comunicação com o serviço');
        }
      });
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
      return;
    }

    if (this.guessNumber === this.currentNumber.number) {
      if (this.currentNumber.dayContentIndex === 2) {
        alert('Você venceu e ganhou 100 pontos, parabéns!');
      }
      else {
        alert('Você acertou. Próximo número!');
        this.changeNumber();
        this.remainingAttemptsPerNumber--;
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
  }

  changeHint(): void {
    if (this.totalremainingHintsPerNumber === 0 || this.numberremainingHintsPerNumber === 0) {
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

    this.currentNumber.number = this.dailyChallengeResponse[dayContentIndex].number;
    this.currentNumber.hint = this.dailyChallengeResponse[dayContentIndex].hints[hintIndex];
    this.currentNumber.dayContentIndex = dayContentIndex;
    this.currentNumber.hintIndex = hintIndex;

    this.totalremainingHintsPerNumber--;
    this.numberremainingHintsPerNumber--;
  }

  private changeNumber(): void {
    const dayContentIndex = this.currentNumber.dayContentIndex += 1;
    const hintIndex = 0;

    this.currentNumber = {
      number: this.dailyChallengeResponse[dayContentIndex].number,
      hint: this.dailyChallengeResponse[dayContentIndex].hints[hintIndex],
      dayContentIndex: dayContentIndex,
      hintIndex: hintIndex
    };

    this.remainingAttemptsPerNumber = 5;
    this.numberremainingHintsPerNumber = this.totalremainingHintsPerNumber >= 4 ? 4 : this.totalremainingHintsPerNumber;
  }
}
