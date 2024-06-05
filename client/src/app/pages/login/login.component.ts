import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountyInfo } from '../../components/data-types/dto';
import { environment } from '../../../environments/environment.development';
import { BaseService } from '../../services/base/base.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoggedIn = false;
  buttonText!: string;
  countryList: CountyInfo[] = [];

  constructor(public baseService: BaseService) {
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