import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser(): Observable<firebase.User | null> {
    return this.asAuth.authState;
  }
  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private asAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    // Check for user data in localStorage during app initialization
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      this.loggedIn.next(true); // Update the logged-in status
    }
  }

  login(email: string, password: string) {
    this.asAuth.auth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success("logged Successfully");
      this.loadUser();
      this.loggedIn.next(true); // Update the logged-in status
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(e => {
      this.toastr.warning(e);
    });
  }

  loadUser() {
    this.asAuth.authState.subscribe(user => {
      console.log(user,"name");

      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.asAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.toastr.success("user Logged Out Successfully");
      this.loggedIn.next(false); // Update the logged-in status
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getGoogleUser() {
    const user = this.asAuth.auth.currentUser;
    if (user) {
      const name = user.displayName;
      const uid = user.uid;
      return {
        name,
        uid
      };
    } else {
      return null;
    }
  }
  getLoggedInUserData(): Observable<firebase.User | null> {
    return this.asAuth.authState;
  }
}