import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authServece:AuthService) { }

  ngOnInit() {
  }
 onSubmit(formValue){
      this.authServece.login(formValue.email,formValue.password);
}
}
