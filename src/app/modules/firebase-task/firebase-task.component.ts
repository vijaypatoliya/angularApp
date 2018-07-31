import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { FirebaseTaskService } from '../../services/firebaseTask/firebase-task.service';
import { Task } from '../../services/firebaseTask/task';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FirebaseTaskmodalComponent } from './firebase-taskmodal/firebase-taskmodal.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-firebase-task',
  templateUrl: './firebase-task.component.html',
  styleUrls: ['./firebase-task.component.css']
})

export class FirebaseTaskComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @Input() tasks: Task;

  bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tasksdetails: any;

  constructor(private taskSer: FirebaseTaskService, private modalService: BsModalService) { }

  openTaskModal(task): void {
    if (task) {
      this.tasksdetails = {
        key: task.key, content: task.content, clientname: task.clientname
      };
    } else {
      this.tasksdetails = {
        key: '', content: '', clientname: ''
      };
    }
    const initialState = {
      rerender: this.rerender,
      dtElement: this.dtElement,
      dtTrigger: this.dtTrigger,
      tasksdetails: this.tasksdetails
    };
    this.bsModalRef = this.modalService.show(FirebaseTaskmodalComponent, { initialState });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.taskSer.getTaskList()
        .subscribe(respons => {
            this.tasks = respons;
            callback({
              recordsTotal: respons.length,
              recordsFiltered: respons.length,
              data: []
            });
          });
      },
      columns: [
        { orderable: false, searchable: false },
        { data: 'content', name: 'content' },
        { data: 'clientname', name: 'clientname' },
        { orderable: false, searchable: false }
      ],
      retrieve: true
    };
  }

  deleteTask(key): void {
    this.taskSer.deleteTask(key)
    .subscribe();
    this.rerender();
  }

  toggleDone(task): void {
    this.taskSer.updateTask(task.key, { done: !task.done })
    .subscribe();
    this.rerender();
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
