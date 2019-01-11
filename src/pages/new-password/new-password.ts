import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BingoPage } from '../bingo/bingo';


import jsSHA from 'jssha'

import firebase from 'firebase';
import 'firebase/firestore/';


@IonicPage()
@Component({
  selector: 'page-new-password',
  templateUrl: 'new-password.html',
})
export class NewPasswordPage {

    @ViewChild('firstPassword') firstPassword;
    @ViewChild('secondPassword') secondPassword;

  fullName: string;
  firstName: string;
  lastName: string;
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
      this.firstName = navParams.get('firstName');
      this.lastName = navParams.get('lastName');
      this.id = navParams.get('id');
      this.fullName =  this.firstName + " " + this.lastName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPasswordPage');
    console.log(this.fullName);
  }

  updatePassword() {
      if(this.firstPassword.value == "" || this.secondPassword.value == ""){
          let alert = this.alertCtrl.create({
              title: 'Please Enter All Required Credentials',
              buttons: ['Dismiss']
          });
          alert.present();
      } else {
          if(this.firstPassword.value == this.secondPassword.value){
              var db = firebase.firestore().collection("users");
              let shaObj = new jsSHA("SHA-256", "TEXT");
              shaObj.update(this.firstPassword.value);
              let hash = shaObj.getHash("HEX");
              db.doc(this.id).update({
                  PasswordHash: hash
              }).then((data)=>{
                  console.log("Updated password for " + this.fullName)
                  this.navCtrl.push(BingoPage, {
                      firstName:this.firstName,
                      lastName: this.lastName,
                      id:this.id
                  });
              }).catch((error)=>{
                  console.log(error)
              })
          } else {
              let alert = this.alertCtrl.create({
                  title: 'Passwords Do Not Match!',
                  buttons: ['Dismiss']
              });
              alert.present();
          }

      }
  }

}
