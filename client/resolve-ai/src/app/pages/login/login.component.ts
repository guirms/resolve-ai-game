import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountyInfo } from '../../components/data-types/dto';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoggedIn = false;
  buttonText!: string;
  countryList: CountyInfo[] = [];

  constructor() {
    this.buttonText = this.isLoggedIn ? 'ENTRAR' : 'CRIAR CONTA';

    environment.countryList.forEach(c => {
      let count = 0;

      this.countryList.push(
        {
          name: c.name,
          value: count,
          isSelected: c.name === 'Brasil'
        });

      count++;
    });
  }
}
