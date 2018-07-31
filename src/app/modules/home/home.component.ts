import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any = {
    username: '',
    _id: '',
    uploadImgName: ''
  };
  empListData: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe(response => {
      this.empListData = response;
      this.data._id = response._id;
      this.data.username = response.username;

    });
  }
}
