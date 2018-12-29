import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { SignUpPage } from '../sign-up/sign-up';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openSignIn() {
      this.navCtrl.push(SignInPage)
  }

  openSignUp() {
      this.navCtrl.push(SignUpPage)
  }

}
