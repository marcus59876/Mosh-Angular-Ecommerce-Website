import { Injectable } from '@angular/core';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from '../../node_modules/rxjs';
import { ActivatedRoute } from '../../node_modules/@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('retrurnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return Observable.of(null);
      });
  }
}
