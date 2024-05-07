import { Component } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { DayContent } from '../../components/data-types/dto';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  dayContent: DayContent[] = [
    {
      number: 7,
      hints: [
        "É o número de cores no arco-íris",
        "É o número da camiseta do jogador Cristiano Ronaldo",
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
        "É o dobro do número de jogadores em um time de futebol",
        "É o resultado da equação x * 2 = 88/2",
        "É a subtração dos números 3921 e 3899",
      ]
    }
  ];
  remainingHints: string = '7';

  constructor(public baseService: BaseService) { }
}
