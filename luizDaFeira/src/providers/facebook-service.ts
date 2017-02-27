import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
<<<<<<< HEAD
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';
=======
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
>>>>>>> 4143e7300c39961e007f36d7c5116c87d2f77cda



/*
  Generated class for the FacebookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookService {

<<<<<<< HEAD
  private authState: FirebaseAuthState;

  constructor(
    public http: Http,
    public angularFire: AngularFireAuth,
     private platform: Platform
  ) {
    this.authState = angularFire.getAuth();
    angularFire.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    })
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.angularFire.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }

  }

  signOut(): void {
    this.angularFire.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }



=======
  constructor(public http: Http) {
    Facebook.browserInit(1369381413123566, "v2.8");
  }

  doFbLogin(): Promise<any> {

    return Facebook.login(["public_profile"])
      .then(function (response) {
        this.apiFacebook(response);
    }).catch(error => {
      alert("Erro ao se logar no facebook");
    })
  }

  apiFacebook(response, type): Promise<any> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result =>{
      result;
    });
  }

>>>>>>> 4143e7300c39961e007f36d7c5116c87d2f77cda
}
