import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MyUser } from '../../../models/myuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private authService: AuthService) { }

    myUser: MyUser;

    ngOnInit() {
      this.myUser = new MyUser();
    }

    onSubmit(){

      this.authService.registerMyUser(this.myUser).subscribe();
    }
}
