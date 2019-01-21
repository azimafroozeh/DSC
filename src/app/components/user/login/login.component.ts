import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MyUser } from '../../../models/myuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  myUser: MyUser;

  ngOnInit() {
    this.myUser = new MyUser();
  }

  onSubmit(){

    this.authService.login(this.myUser).subscribe();
  }

}
