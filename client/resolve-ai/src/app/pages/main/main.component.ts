import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { CurrentNumber, DayContent } from '../../components/data-types/dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  dayContent: DayContent[] = [
    {
      number: 7,
      hints: [
        "É o número da camiseta do jogador Cristiano Ronaldo",
        "É o número de cores no arco-íris",
        "É o quarto número primo começando em 0",
        "É a raíz quadrada de 49",
        "É o número de dias em uma semana"
      ]
    },
    {
      number: 15,
      hints: [
        "É o menor número triangular que é divisível por 5",
        "É o número de cartas em um jogo de pôquer",
        "É um número divisível por 5 e 3",
        "É o número de itens em uma dúzia e meia",
        "É o número de dias em metade de um mês"
      ]
    },
    {
      number: 22,
      hints: [
        "É o número de letras no alfabeto hebraico",
        "É o número de jogadores em um time de futebol americano",
        "É o dobro do número de jogadores de um time de futebol",
        "É o resultado da equação x * 2 = 88/2",
        "É a subtração dos números 3921 e 3899",
      ]
    }
  ];
  currentNumber: CurrentNumber = {
    number: this.dayContent[0].number,
    hint: this.dayContent[0].hints[0],
    dayContentIndex: 0,
    hintIndex: 0
  };

  totalRemainingHints: number = 9;
  numberRemainingHints: number = 4;
  guessNumber!: number | null;

  constructor(public baseService: BaseService) { }

  sendGuess(): void {
    if (this.guessNumber === this.currentNumber.number) {
      if (this.currentNumber.dayContentIndex === 2) {
        alert('Você venceu e ganhou 100 pontos, parabéns!');
      }
      else {
        alert('Você acertou. Próximo número!');
        this.changeNumber();
      }
    }
    else {
      alert('Você errou. Tente novamente!');
    }

    this.guessNumber = null;
  }

  changeNumber() {
    const dayContentIndex = this.currentNumber.dayContentIndex += 1;
    const hintIndex = 0;

    this.currentNumber = {
      number: this.dayContent[dayContentIndex].number,
      hint: this.dayContent[dayContentIndex].hints[hintIndex],
      dayContentIndex: dayContentIndex,
      hintIndex: hintIndex
    };

    this.numberRemainingHints = this.totalRemainingHints >= 4 ? 4 : this.totalRemainingHints;
  }

  changeHint(): void {
    if (this.totalRemainingHints === 0 || this.numberRemainingHints === 0) {
      alert('Você perdeu. Tente novamente outro dia!');
      return;
    }

    let dayContentIndex = this.currentNumber.dayContentIndex;
    let hintIndex = 0;

    if (this.currentNumber.hintIndex === 4) {
      alert('Você perdeu. Tente novamente outro dia!s');

      return;
    }
    else {
      hintIndex = this.currentNumber.hintIndex += 1;
    }

    this.currentNumber = {
      number: this.dayContent[dayContentIndex].number,
      hint: this.dayContent[dayContentIndex].hints[hintIndex],
      dayContentIndex: dayContentIndex,
      hintIndex: hintIndex
    };

    this.totalRemainingHints--;
    this.numberRemainingHints--;
  }
}
