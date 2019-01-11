import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { BingoPage } from '../bingo/bingo';
import jsSHA from 'jssha'

import firebase from 'firebase';
import 'firebase/firestore/';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

    @ViewChild('firstName') firstName;
    @ViewChild('lastName') lastName;
    @ViewChild('password') password;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  openHome(){
      this.navCtrl.push(HomePage)
  }

  openSignUp(){
      this.navCtrl.push(SignUpPage)
  }

  processSignIn(){
      if(this.firstName.value == "" || this.lastName.value == "" || this.password.value == ""){
          let alert = this.alertCtrl.create({
            title: 'Please Enter All Required Credentials',
            buttons: ['Dismiss']
          });
          alert.present();
      } else {
          let shaObj = new jsSHA("SHA-256", "TEXT");
          shaObj.update(this.password.value);
          let hash = shaObj.getHash("HEX");
          var db = firebase.firestore().collection("users");
          var self = this;
          var found = false;
          db.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(self.firstName.value == doc.data().FirstName && self.lastName.value == doc.data().LastName && hash == doc.data().PasswordHash.toLowerCase()){
                    let shaObj_ = new jsSHA("SHA-256", "TEXT");
                    shaObj_.update(doc.data().InitPassword);
                    let hash_ = shaObj_.getHash("HEX");
                    if(hash_ != hash){
                        self.navCtrl.push(BingoPage, {
                            firstName:doc.data().FirstName,
                            lastName: doc.data().LastName,
                            id:doc.id
                        });
                        found = true;
                    }
                }
            });
            if(found == false){
                var alert = self.alertCtrl.create({
                    title: "User Not Found." ,
                    buttons: ['Dismiss']
                });
                alert.present();
            }
         })
      }
  }

}
