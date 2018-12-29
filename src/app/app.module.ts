import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { NewPasswordPage } from '../pages/new-password/new-password';
import { BingoPage } from '../pages/bingo/bingo';


const config = {
    apiKey: "AIzaSyAZfHk8Z8_nHp8ir4n0kGg7FIpdvz0zfCU",
    authDomain: "userauthtest-78822.firebaseapp.com",
    databaseURL: "https://userauthtest-78822.firebaseio.com",
    projectId: "userauthtest-78822",
    storageBucket: "userauthtest-78822.appspot.com",
    messagingSenderId: "1025484954137"
 };
 firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    NewPasswordPage,
    BingoPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    NewPasswordPage,
    BingoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
