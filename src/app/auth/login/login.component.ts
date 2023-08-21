import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    const { email, password } = loginForm.value;
    const fixedPassword = 'bike@123';

    if (password === fixedPassword) {
      this.authService.login(email, password);
    } else {
      // Handle invalid password
      // For example, display an error message
      console.log('Invalid password');
    }
  }
}
