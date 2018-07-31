import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  baseurl = 'http://localhost:8000';
  forgot;
  user = {
    username: '',
    password: ''
  };
  iuser = { usermail: '' };

  constructor(private userService: UserService, private router: Router,
    private toastrService: ToastrService, private localstorageService: LocalstorageService
  ) { }

  ngOnInit(): void { }

  login(userData): void {
    let res;
    this.userService.logIn(userData)
    .subscribe((response: any) => {
      res = response;
      if (res) {
        this.localstorageService.SetAuthorizationData(res.token);
        this.toastrService.success('Successfully!', 'Login!');
        if (!res.uploadImgName) {
          res.uploadImgName = `${this.baseurl}/profilePhotos/test-img.png`;
        } else {
          res.uploadImgName = `${this.baseurl}/profilePhotos/${res.uploadImgName}`;
        }
        this.userService.changeData(res);
        this.router.navigate(['home']);
      }
    });
    setTimeout(() => {
      if (!res) {
        this.toastrService.error('User not found or not activated yet!');
      }
    }, 500);
  }

  forgotPass(userData): void {
    this.userService.resetPassword(userData)
    .subscribe((response: any) => {});
  }

}
