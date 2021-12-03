import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: '',
    password: '',
    _id: ''
  };
  warning: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.user.userName && this.user.password) {
      this.loading = true;

      this.authService.login(this.user).subscribe({
        next: success => {
          this.loading = false;
          
          localStorage.setItem('access_token', success.token);
          this.router.navigateByUrl('/newReleases');
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      });
    } 
  }
}
