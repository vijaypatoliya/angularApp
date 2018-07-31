import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UsermodalComponent } from './usermodal/usermodal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

class DataTablesResponse {
  data: Array<any>;
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users;

  constructor(private modalService: BsModalService, private userService: UserService) { }

  // Open modal for delete confirmation
  openModal(template: TemplateRef<any>): void {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-sm modal-delete' });
  }
  confirm(id): void {
    this.userService.deleteUser(id)
    .subscribe();
    this.bsModalRef.hide();
    this.rerender();
  }
  decline(): void {
    this.bsModalRef.hide();
  }

  openTaskModal(user): void {
    const initialState = {
      rerender: this.rerender,
      dtElement: this.dtElement,
      dtTrigger: this.dtTrigger,
      userdetails: {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        moreInfo: user.moreInfo,
        city: user.city,
        company: user.company,
        zip: user.zip,
        address: user.address,
        phone: user.phone,
        status: user.status
      }
    };
    this.bsModalRef = this.modalService.show(UsermodalComponent, { initialState });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.userService.getAllForAffiliatesTable(
          dataTablesParameters, dataTablesParameters.length, dataTablesParameters.search.value)
          .subscribe(respons => {
            this.users = respons.data;
            callback({
              recordsTotal: respons.recordsTotal,
              recordsFiltered: respons.recordsTotal,
              data: []
            });
          });
      },
      columns: [
        { data: 'username', name: 'username' },
        { data: 'fullname', name: 'fullname' },
        { data: 'email', name: 'email' },
        { data: 'status', name: 'status' },
        { orderable: false, searchable: false }
      ]
    };
  }

  deleteUser(id): void {
    this.userService.deleteUser(id)
    .subscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
