import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  baseurl = 'http://localhost:8000';
  pic: any;
  data: any;
  defaultImgUrl = `${this.baseurl}/profilePhotos/test-img.png`;
  constructor(private userService: UserService, private router: Router, public localStrgService: LocalstorageService) {
    this.userService.currentUser.subscribe(data => this.data = data);
  }

  ngOnInit(): void {
    if (localStorage.getItem('Authorization')) {
      this.userService.getCurrentUser()
      .subscribe(response => {
        this.data = response;
      });
      setTimeout(() => {
        const data = { id: this.data._id };
        this.userService.getUserInfoById(data)
        .subscribe((res: any) => {
          this.data = res;
          if (res.uploadImgName) {
            this.data.uploadImgName = `${this.baseurl}/profilePhotos/${res.uploadImgName}`;
          } else {
            this.data.uploadImgName = this.defaultImgUrl;
          }
          this.userService.changeData(this.data);
        });
      }, 600);

    }
  }

  logout(): void {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('uploadImgName');
    this.userService.changeData({ username: '' });
    this.router.navigate(['login']);
  }

}
