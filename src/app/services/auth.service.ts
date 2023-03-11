import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoggedInGuard:boolean=false;
  constructor(private asAuth:AngularFireAuth,private toastr:ToastrService,private router:Router) {
   }
  login(email,password){
    this.asAuth.auth.signInWithEmailAndPassword(email,password).then(logRef=>{
      this.toastr.success("logged Successfully");
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard=true;
      this.router.navigate(['/']);
    }).catch(e=>{
      this.toastr.warning(e);
    })

         
  }
  loadUser(){
    this.asAuth.authState.subscribe(user=>{
      //console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem('user',JSON.stringify(user));
    });
  }
  logOut(){
    this.asAuth.auth.signOut().then(()=>{
      this.toastr.success("user Logged Out Successfully");
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
      this.router.navigate(['/login']);
    })
  }
  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
