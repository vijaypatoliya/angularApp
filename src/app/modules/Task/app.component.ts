import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TaskmodalComponent } from './taskmodal/taskmodal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

class DataTablesResponse {
  data: Array<any>;
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tasks;

  constructor(private taskSer: TaskService, private modalService: BsModalService) { }

  openTaskModal(task): void {
    const initialState = {
      rerender: this.rerender,
      dtElement: this.dtElement,
      dtTrigger: this.dtTrigger,
      tasksdetails: {
        id: task._id, isComplete: task.isComplete, taskName: task.taskName, content: task.content
      }
    };
    this.bsModalRef = this.modalService.show(TaskmodalComponent, { initialState });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.taskSer.getTodoList(
          dataTablesParameters, dataTablesParameters.length, dataTablesParameters.search.value)
          .subscribe(respons => {
            this.tasks = respons.data;
            callback({
              recordsTotal: respons.recordsTotal,
              recordsFiltered: respons.recordsTotal,
              data: []
            });
          });
      },
      columns: [
        { name: 'content', orderable: false, searchable: false },
        { data: 'taskName', name: 'taskName'},
        { data: 'content', name: 'content' },
        { orderable: false, searchable: false }
      ]
    };
  }

  deleteTask(task): void {
    this.taskSer.deleteTodo(task._id)
    .subscribe((data: any) => {
      this.rerender();
    });
  }

  toggleDone(task): void {
    task.isComplete = !task.isComplete;
    this.taskSer.toggleDone(task)
    .subscribe((data: any) => {
      this.rerender();
    });

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
