import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { LocalstorageService } from '../../services/localstorage.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  baseurl = 'http://localhost:8000';
  public uploader = new FileUploader({
    url: `${this.baseurl}/user/uploadImage/upload`,
    headers: [{ name: 'Authorization', value: this.localstorageService.GetValueFromLocalStorage() }]
  });

  // Add in the other upload form parameters.
  iFullname;
  iUsername;
  iEmail;
  iMoreInfo;
  iAddress;
  iCompany;
  iCity;
  iZip;
  iPhone;
  iPassword;
  user: any = {
    _id: String,
    fullname: String,
    usename: String,
    moreInfo: String,
    email: String,
    address: String,
    zip: Number,
    phone: Number,
    city: String,
    uploadImgName: '',
    passwordClear: String
  };

  constructor(private userService: UserService,
    private ac: ActivatedRoute,
    private httpClient: HttpClient,
    private toast: ToastrService,
    private localstorageService: LocalstorageService) {

    // read the route parameter in constructor
    const self = this;
    ac.params.forEach((param: any) => {
      self.user._id = param['id'];
    });
  }

  ngOnInit(): void {
    const data = { id: this.user._id };
    this.userService.getUserInfoById(data)
      .subscribe((res: any) => {
        this.user = res;
        if (!res.uploadImgName) {
          this.user.uploadImgName = `${this.baseurl}/profilePhotos/test-img.png`;
        } else {
          this.user.uploadImgName = `${this.baseurl}/profilePhotos/${res.uploadImgName}`;
        }
      });

    this.uploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('uploadImgTitle', fileItem.file.name);
    };
    this.uploader.onCompleteItem = (
      item: any, response: any, status: number, headers: any
    ): void => {
      response = JSON.parse(response);
      this.user.uploadImgName = `${this.baseurl}/profilePhotos/${response.uploadImgName}`;
      this.userService.changeData(this.user);
      if (response) {
        this.user.uploadImgID = response.public_id;
      }
    };
  }

  update(): void {
    const updateData = {
      _id: this.user._id,
      fullname: this.user.fullname,
      username: this.user.username,
      moreInfo: this.user.moreInfo,
      email: this.user.email,
      phone: this.user.phone,
      zip: this.user.zip,
      company: this.user.company,
      address: this.user.address,
      city: this.user.city,
      newPassword: this.user.passwordClear
    };

    this.userService.updateUserInfo(updateData)
    .subscribe((response: any) => {
      if (response) {
        this.toast.success('Successfully!', 'Update!');
        this.iFullname = false;
        this.iUsername = false;
        this.iEmail = false;
        this.iMoreInfo = false;
        this.iCompany = false;
        this.iAddress = false;
        this.iCity = false;
        this.iZip = false;
        this.iPhone = false;
        this.iPassword = false;
      }
    });
  }

  deleteProfile(data): void {
    this.userService.deleteImg(data)
    .subscribe((response: any) => {
      if (response) {
        this.user.uploadImgName = `${this.baseurl}/profilePhotos/test-img.png`;
        response.uploadImgName = `${this.baseurl}/profilePhotos/test-img.png`;
        this.userService.changeData(response);
      }
    });
  }
}
