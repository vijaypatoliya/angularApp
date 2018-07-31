import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import { NgSwitch } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.css']
})
export class UsermodalComponent implements OnInit {
  userdetails;
  dtTrigger;
  dtElement;
  rerender;
  user = {
    _id: '',
    fullname: '',
    username: '',
    email: '',
    company: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    moreInfo: '',
    phone: '',
    status: Boolean
  };

  constructor(
    public bsModalRef: BsModalRef,
    private userSer: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.user._id = this.userdetails._id;
    this.user.fullname = this.userdetails.fullname;
    this.user.username = this.userdetails.username;
    this.user.email = this.userdetails.email;
    this.user.company = this.userdetails.company;
    this.user.zip = this.userdetails.zip;
    this.user.city = this.userdetails.city;
    this.user.address = this.userdetails.address;
    this.user.country = this.userdetails.country;
    this.user.moreInfo = this.userdetails.moreInfo;
    this.user.phone = this.userdetails.phone;
    this.user.status = this.userdetails.status;
  }

  update(): void {
    const updateData = {
      _id: this.user._id,
      fullname: this.user.fullname,
      username: this.user.username,
      company: this.user.company,
      address: this.user.address,
      city: this.user.city,
      zip: this.user.zip,
      country: this.user.country,
      moreInfo: this.user.moreInfo,
      phone: this.user.phone,
      email: this.user.email,
      status: this.user.status
    };

    this.userSer.updateOneAffiliate(updateData)
      .subscribe(result => {
        this.toastrService.success('User Details updated!');
        this.rerender();
      });
  }
}
