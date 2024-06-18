import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountyInfo } from '../../components/data-types/dtos';
import { environment } from '../../../environments/environment.development';
import { BaseService } from '../../services/base/base.service';
import { UserService } from '../../services/pages/user/user.service';
import { takeUntil } from 'rxjs';
import { LoginRequest } from '../../components/data-types/requests';
import { AuthToken } from '../../../assets/constants/storage-key';
import { ERoutePath } from '../../components/data-types/enums';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  isRegistering = false;
  buttonText!: string;
  countryList: CountyInfo[] = [];
  nickName!: string | null;
  password!: string | null;
  isLoading = false;

  constructor(public baseService: BaseService,
    private userService: UserService) {
    this.buttonText = this.isRegistering ? 'ENTRAR' : 'CRIAR CONTA';

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

  login(): void {
    this.isLoading = true;

    if (!this.nickName || !this.password) {
      alert('Entradas incorretas. Digite novamente por favor');
      return;
    }

    const loginRequest: LoginRequest = {
      name: this.nickName,
      password: this.password
    };

    this.userService.login(loginRequest)
      .pipe(takeUntil(this.baseService.ngUnsubscribe))
      .subscribe({
        next: (result) => {
          localStorage.setItem(AuthToken, result.authToken);

          this.baseService.navigateByUrl(ERoutePath.main);

          this.isLoading = false;
          alert('Login realizado com sucesso');
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          alert(error.error.message);
        }
      });
  }

  saveUser(): void {

  }

  changeBox(): void {
    this.isRegistering = !this.isRegistering;

    this.nickName = this.password = null;
  }
}
