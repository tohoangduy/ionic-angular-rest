import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the AdduserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  user = { name: '', username: '', email: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', bs: '', catchPhrase: '' }};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestProvider,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad dduserPage');
  }

  saveUser() {
    this.restProvider.addUser(this.user).then((result) => {
      console.log(result);
      // alert("Add user success!"); //this code is a Javascript
      // Code bellow is a ionic 3.9.2
      this.alertController.create({
          title: "Alert",
          subTitle: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK']
        }).present();
      }, err => {
        console.log(err);
      });
  }

}
