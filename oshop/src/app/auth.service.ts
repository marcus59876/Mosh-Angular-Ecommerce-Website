import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from '../../node_modules/rxjs';
import { ActivatedRoute } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
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
}
