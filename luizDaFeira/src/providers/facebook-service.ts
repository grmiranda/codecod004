import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';
import { Publicacao } from '../model/publicacao';
import { User } from '../model/User';
import 'rxjs/add/operator/map';
<<<<<<< HEAD
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import 'rxjs/add/operator/toPromise';
<<<<<<< HEAD
import { Facebook } from 'ionic-native';
import { Platform } from 'ionic-angular';
import firebase from 'firebase';
=======
import 'rxjs/add/operator/toPromise';
import { Facebook } from 'ionic-native';
>>>>>>> 4143e7300c39961e007f36d7c5116c87d2f77cda

=======
>>>>>>> 25b96e6f6f556462c992300facf1a706b3a6d563


@Injectable()
export class FacebookService {

<<<<<<< HEAD
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
=======
  private linkLogin: string = "http://dsoutlet.com.br/igrejaApi/loginFace.php";
  private headers = new Headers({ 'Content-Type': 'application/json' });

>>>>>>> 25b96e6f6f556462c992300facf1a706b3a6d563
  constructor(public http: Http) {
    //id do aplicativo: 1297281393651334
    Facebook.browserInit(1297281393651334, "v2.8");
  }

  logar(): Promise<any> {
    return Facebook.login(["public_profile"]).then(response =>
      this.api(response, "logar")).catch(this.erro);
  }

  erro() {
    alert("erro ao tentar se conectar com o servidor");
  }

  api(response, type): Promise<any> {
    let userID = response.authResponse.userID;
    return Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender,email,picture', []).then(result => {
      
      alert(JSON.stringify(result));
    }
    );
  }

<<<<<<< HEAD
>>>>>>> 4143e7300c39961e007f36d7c5116c87d2f77cda
=======

  status(): Promise<any> {
    return Facebook.getLoginStatus().then(response => response.status);
  }

  logout(): Promise<any> {
    return Facebook.logout().then(response => alert("deslogado com Sucesso"));
  }


>>>>>>> 25b96e6f6f556462c992300facf1a706b3a6d563
}
