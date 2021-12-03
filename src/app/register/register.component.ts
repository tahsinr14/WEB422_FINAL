import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: ''
  };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (
      this.registerUser.userName
      &&
      this.registerUser.password == this.registerUser.password2
    ) {
      this.loading = true;

      this.authService.register(this.registerUser).subscribe({
        next: () => {
          this.success = true;
          this.warning = '';
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      });
    }
  }
}
