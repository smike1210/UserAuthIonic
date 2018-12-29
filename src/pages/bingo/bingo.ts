import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import jsSHA from 'jssha'

import firebase from 'firebase';
import 'firebase/firestore/';

/**
 * Generated class for the BingoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bingo',
  templateUrl: 'bingo.html',
})
export class BingoPage {

  fullName: string;
  firstName: string;
  lastName: string;
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.firstName = navParams.get('firstName');
      this.lastName = navParams.get('lastName');
      this.id = navParams.get('id');
      this.fullName =  this.firstName + " " + this.lastName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BingoPage');
  }

  logout(){
      this.navCtrl.push(HomePage)
  }

}
