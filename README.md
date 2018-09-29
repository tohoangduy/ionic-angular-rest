This tutorial aims to simplified consuming REST API on Ionic 3 mobile apps using the new Angular 4.3 HttpClient. You can compare this new way of accessing or consuming REST API with the previous way on Angular 2 or 4. Still the same with the previous tutorial, we will use free REST API testing endpoint from JSONPlaceholder.



Before you started, this tasks should be accomplished:

- Install or update the latest Node.js
- Install or update Ionic 3 using this command

sudo npm install -g ionic
- Optionally install or update Cordova if you're using it for run on the Android or iOS device

sudo npm install -g cordova

1. Create the New Ionic 3 App
As usual, we are creating new Ionic 3 app from scratch. Open the terminal or Node command line then type this command.

ionic start ionic3-angular43-rest blank
If there comes this question.

? Would you like to integrate your new app with Cordova to target native iOS and Android? No
For now, choose 'n'. It will include 'npm install' and will take some minutes. Go to the newly created app project folder.

cd ionic3-angular43-rest
To make sure everything working properly run the app in labs mode, it will open automatically in the browser.

ionic serve --lab
Ionic 3 Consuming REST API using New Angular 4.3 HttpClient - Ionic Serve


2. Install and Configure the New Angular 4.3 HttpClient
By default in the last version of Ionic 3 (when this tutorial created) it still using old Angular HTTP module. For this, we have to install a different module for the new Angular 4.3 HTTPClient. Angular use different module name for HTTP, so the developer can migrate to the new Angular 4.3 HTTPClient slowly because old HTTP module still can be used. For safe use with Ionic 3, update all '@angular' dependencies with the latest version.

npm install @angular/common@latest --save
npm install @angular/compiler@latest --save
npm install @angular/compiler-cli@latest --save
npm install @angular/core@latest --save
npm install @angular/forms@latest --save
npm install @angular/http@latest --save
npm install @angular/platform-browser@latest --save
npm install @angular/platform-browser-dynamic@latest --save
Notes: Angular 4.3 HTTPClient and HTTPClientModule modules get from '@angular/common' dependencies.

Now, your 'package.json' dependencies look like this.

"dependencies": {
  "@angular/common": "^4.3.4",
  "@angular/compiler": "^4.3.4",
  "@angular/compiler-cli": "^4.3.4",
  "@angular/core": "^4.3.4",
  "@angular/forms": "^4.3.4",
  "@angular/http": "^4.3.4",
  "@angular/platform-browser": "^4.3.4",
  "@angular/platform-browser-dynamic": "^4.3.4",
  "@ionic-native/core": "3.12.1",
  "@ionic-native/splash-screen": "3.12.1",
  "@ionic-native/status-bar": "3.12.1",
  "@ionic/storage": "2.0.1",
  "ionic-angular": "3.6.0",
  "ionicons": "3.0.0",
  "rxjs": "5.4.0",
  "sw-toolbox": "3.6.0",
  "zone.js": "0.8.12"
},
Next, open and edit 'src/app/app.module.ts' then add this import.

import { HttpClientModule } from '@angular/common/http';

Then register it to '@NgModule' imports after 'BrowserModule', so it will look like this.

imports: [
  BrowserModule,
  HttpClientModule,
  IonicModule.forRoot(MyApp)
],

3. Create Ionic 3 Service or Provider
This time we will implement the new Angular 4.3 HTTPClient on the Ionic 3 service or provider. Create the service or provider file by type this command.


ionic g provider Rest
It will create 'rest.ts' file and 'rest' folder inside 'providers' folder and also register it on 'app.module.ts'. Now, open and edit 'providers/rest/rest.ts' then replace 'http' import by new Angular 4.3 HTTPClient.

import { HttpClient } from '@angular/common/http';
Also, replace 'Http' injection in the constructor.

constructor(public http: HttpClient) {
  console.log('Hello RestServiceProvider Provider');
}
Next, we will create all REST API call inside 'rest.ts' file. Add this line before the constructor.

apiUrl = 'https://jsonplaceholder.typicode.com';
Add this functions after constructors.

getUsers() {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/users').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
You can see the difference in getting data more simple than using the previous HTTP and it also added retry function if something happens with the request. Now, add again function to post new data.

addUser(data) {
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/users', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
For posting data, still, use the same way as previously. If your REST API backend needs additional headers and URL params you can add them like this.

this.http.post(this.apiUrl+'/users', JSON.stringify(data), {
    headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    params: new HttpParams().set('id', '3'),
  })
  .subscribe(res => {
    resolve(res);
  }, (err) => {
    reject(err);
  });

4. Display Data in View
To displaying data in the view, open and edit `src/pages/home/home.ts` then add this import.

import { RestProvider } from '../../providers/rest/rest';
Inject the `RestProvider` to the constructor.

constructor(public navCtrl: NavController, public restProvider: RestProvider) {}
Add variable for holds users data before the constructor.

users: any;
Create a function below the constructor for calling the users from the provider then fill users variable.

getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }
Now, call that function inside the constructor.

constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
  }
Then, open and edit 'src/pages/home/home.html' then replace '<ion-content>' and it's content using this.

<ion-content>
  <ion-list inset>
    <ion-item *ngFor="let user of users">
      <h2>{{user.name}}</h2>
      <p>{{user.email}}</p>
    </ion-item>
  </ion-list>
</ion-content>
Now, you can see the data on the browser like this.

Ionic 3 Consuming REST API using New Angular 4.3 HttpClient - List of users


5. Post Data to REST API
For posting data to REST API, we need to create a new page. Type this command to generate it.

ionic g page adduser
Open and edit 'src/pages/adduser/adduser.html' then replace '<ion-content>' contents with this.

<ion-content padding>
  <h2>Add User</h2>
  <form (ngSubmit)="saveUser()">
    <ion-item>
      <ion-label>Name</ion-label>
      <ion-input type="text" [(ngModel)]="user.name" name="name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Username</ion-label>
      <ion-input type="text" [(ngModel)]="user.username" name="username"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Email</ion-label>
      <ion-input type="email" [(ngModel)]="user.email" name="email"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Phone</ion-label>
      <ion-input type="text" [(ngModel)]="user.phone" name="phone"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Website</ion-label>
      <ion-input type="url" [(ngModel)]="user.website" name="website"></ion-input>
    </ion-item>
    <ion-item-divider color="light">Address</ion-item-divider>
    <ion-item>
      <ion-label>Street</ion-label>
      <ion-input type="text" [(ngModel)]="user.address.street" name="street"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Suite</ion-label>
      <ion-input type="text" [(ngModel)]="user.address.suite" name="suite"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>City</ion-label>
      <ion-input type="text" [(ngModel)]="user.address.city" name="city"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Zip Code</ion-label>
      <ion-input type="text" [(ngModel)]="user.address.zipcode" name="zipcode"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Geo</ion-label>
      <ion-input type="text" [(ngModel)]="user.address.geo.lat" name="lat" placeholder="Latitude"></ion-input>
      <ion-input type="text" [(ngModel)]="user.address.geo.lng" name="lng" placeholder="Longitude"></ion-input>
    </ion-item>
    <ion-item-divider color="light">Company</ion-item-divider>
    <ion-item>
      <ion-label>Name</ion-label>
      <ion-input type="text" [(ngModel)]="user.company.name" name="name"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Business</ion-label>
      <ion-input type="text" [(ngModel)]="user.company.bs" name="bs"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label>Catch Phrase</ion-label>
      <ion-input type="text" [(ngModel)]="user.company.catchPhrase" name="catchPhrase"></ion-input>
    </ion-item>
    <button ion-button type="submit" block>Add User</button>
  </form>
</ion-content>
Now, for the controller. Open and edit 'src/pages/adduser/adduser.ts' then add import of RestProvider.

import { RestProvider } from '../../providers/rest/rest';
Inject RestProvider in the constructor params.



constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
}
Then add this variable before the constructors.

user = { name: '', username: '', email: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', bs: '', catchPhrase: '' }};
Next, add a function for saving or post the data from the form.

saveUser() {
  this.restapiService.saveUser(this.user).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });
}
Don't forget to add button on 'home.html' that call 'adduser' page. Now, you can run again the Ionic 3 app and test receives or posts data.

Above example just the basic of the new Angular 4.3 HTTPClient. There is more advanced feature comes with Angular 4.3 HTTPClient that will be covered another time in another tutorial.
