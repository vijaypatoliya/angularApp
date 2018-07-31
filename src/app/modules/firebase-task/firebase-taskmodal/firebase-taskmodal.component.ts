import { Component, OnInit } from '@angular/core';
import { Task } from '../../../services/firebaseTask/task';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FirebaseTaskService } from '../../../services/firebaseTask/firebase-task.service';

@Component({
  selector: 'app-firebase-taskmodal',
  templateUrl: './firebase-taskmodal.component.html',
  styleUrls: ['./firebase-taskmodal.component.css']
})
export class FirebaseTaskmodalComponent implements OnInit {
  title: string;
  tasks: Task = new Task();
  list: Array<any> = [];
  tasksdetails;
  dtTrigger;
  dtElement;
  rerender;

  constructor(public bsModalRef: BsModalRef, private taskSer: FirebaseTaskService) { }

  ngOnInit(): void {
    if (this.tasksdetails.key) {
      this.tasks.key = this.tasksdetails.key;
      this.tasks.content = this.tasksdetails.content;
      this.tasks.clientname = this.tasksdetails.clientname;
    }
  }

  save(): void {
    this.taskSer.createTask(this.tasks)
    .subscribe();
    this.rerender();
  }

  updateActive(taskdet): void {
    this.taskSer.updateTask(this.tasks.key, {
      content: taskdet.content,
      clientname: taskdet.clientname
    })
    .subscribe();
    this.rerender();
  }
}
