import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignInPage } from '../sign-in/sign-in';
import { NewPasswordPage } from '../new-password/new-password';

import jsSHA from 'jssha'

import firebase from 'firebase';
import 'firebase/firestore/';


@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})

@Injectable()
export class SignUpPage {

    @ViewChild('firstName') firstName;
    @ViewChild('lastName') lastName;
    @ViewChild('broID') broID;



    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
        // let db = firebase.firestore();
        // db.collection("usersTest").add({
        //     first_name: "Mike",
        //     last_name: "Sheaa"
        // }).then((data)=>{
        //     console.log(data)
        // }).catch((error)=>{
        //     console.log(error)
        // })

        // let shaObj = new jsSHA("SHA-256", "TEXT");
        // shaObj.update("This is a test");
        // let hash = shaObj.getHash("HEX");
        // console.log(hash)
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }

    openHome(){
        this.navCtrl.push(HomePage)
    }

    openSignIn() {
        this.navCtrl.push(SignInPage)
    }

    processSignUp(){
        console.log(this.firstName.value, this.lastName.value, this.broID.value)
        if(this.firstName.value == "" || this.lastName.value == "" || this.broID.value == ""){
            let alert = this.alertCtrl.create({
                title: 'Please Enter All Required Credentials',
                buttons: ['Dismiss']
            });
            alert.present();
        }
        else {
            var db = firebase.firestore().collection("users");
            var self = this;
            db.doc(this.broID.value).get().then(function(doc) {
                if (doc.exists) {
                    if(self.firstName.value == doc.data().FirstName && self.lastName.value == doc.data().LastName){
                        let shaObj = new jsSHA("SHA-256", "TEXT");
                        shaObj.update(doc.data().InitPassword);
                        let hash = shaObj.getHash("HEX");
                        if(hash == doc.data().PasswordHash.toLowerCase()){
                            self.navCtrl.push(NewPasswordPage, {
                                firstName:doc.data().FirstName,
                                lastName: doc.data().LastName,
                                id:doc.id
                            });
                        } else {
                            var alert = self.alertCtrl.create({
                                title: "This User Was Already Created." ,
                                buttons: ['Dismiss']
                            });
                            alert.present();
                        }
                    } else {
                        var alert = self.alertCtrl.create({
                            title: "Information Entered Does Not Match Our Records! Please Verify Input Information." ,
                            buttons: ['Dismiss']
                        });
                        alert.present();
                    }
                } else {
                    var alert = self.alertCtrl.create({
                        title: "Information Entered Does Not Match Our Records! Please Verify Input Information." ,
                        buttons: ['Dismiss']
                    });
                    alert.present();
                }
            }).catch((error)=>{
                var alert = self.alertCtrl.create({
                    title: "Information Entered Does Not Match Our Records! Please Verify Input Information." ,
                    buttons: ['Dismiss']
                });
                alert.present();
            })
        }
    }
}
