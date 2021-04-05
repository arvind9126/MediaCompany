import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData;
  userLocal;
  userName;
  passWord;
  isErr = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLocal();
    if(this.userLocal && this.userLocal.loggedIn){
      this.router.navigate(['myaccount']);
    }
  }
  getLocal(){
    //--get localStorage
    this.userLocal = JSON.parse(localStorage.getItem("userLocal"));
    console.log('this.userLocal->>', this.userLocal);
  }
  login(){
    var user = this.getData();
    console.log('userName->>', this.userName);
    console.log('passWord->>', this.passWord);

    // --this function should come from API
    this.userData = user[user.findIndex(u => u.userName === this.userName && u.passWord === this.passWord)];
    if(!this.userData){
      this.userData = {loggedIn: false, data: {}};
      this.isErr = true;
    }else{
      this.isErr = false;
      //--set localStorage
      let _tmp = {loggedIn: true, data: this.userData};
      localStorage.setItem("userLocal", JSON.stringify(_tmp));
      // console.log('this.userData->>', this.userData);
      // console.log('this.userLocal->>', this.userLocal);
      window.location.reload();
    }
    return false;
  }

  getData(){
    return [{
              id: 1,
              userName: "abc@media.com",
              passWord: "abc123",
              userid: "Tom"
            },
            {
              id: 2,
              userName: "def@media.com",
              passWord: "def123",
              userid: "Dick"
            },
            {
              id: 3,
              userName: "ghi@media.com",
              passWord: "ghi123",
              userid: "Harry"
            }
          ];
  }
}
