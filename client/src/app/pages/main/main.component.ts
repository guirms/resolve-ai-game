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
  dayContent!: DailyChallengeResponse[];
  currentNumber!: CurrentNumber;
  totalRemainingHints: number = 9;
  numberRemainingHints: number = 4;
  numberRemainingAttempts: number = 5;
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
          this.dayContent = result;

          this.currentNumber = {
            number: this.dayContent[0].number,
            hint: this.dayContent[0].hints[0],
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

    if (this.numberRemainingAttempts === 0) {
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
        this.numberRemainingAttempts--;
      }
    }
    else {
      if (this.numberRemainingAttempts === 1) {
        this.disableButtons = true;
        alert('Você perdeu. Tente novamente outro dia!');
      }
      else {
        alert('Você errou. Tente novamente!');
      }

      this.numberRemainingAttempts--;
    }

    this.guessNumber = null;
  }

  changeHint(): void {
    if (this.totalRemainingHints === 0 || this.numberRemainingHints === 0) {
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

    this.currentNumber.number = this.dayContent[dayContentIndex].number;
    this.currentNumber.hint = this.dayContent[dayContentIndex].hints[hintIndex];
    this.currentNumber.dayContentIndex = dayContentIndex;
    this.currentNumber.hintIndex = hintIndex;

    this.totalRemainingHints--;
    this.numberRemainingHints--;
  }

  private changeNumber(): void {
    const dayContentIndex = this.currentNumber.dayContentIndex += 1;
    const hintIndex = 0;

    this.currentNumber = {
      number: this.dayContent[dayContentIndex].number,
      hint: this.dayContent[dayContentIndex].hints[hintIndex],
      dayContentIndex: dayContentIndex,
      hintIndex: hintIndex
    };

    this.numberRemainingAttempts = 5;
    this.numberRemainingHints = this.totalRemainingHints >= 4 ? 4 : this.totalRemainingHints;
  }
}
