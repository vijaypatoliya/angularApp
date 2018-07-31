import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-taskmodal',
  templateUrl: './taskmodal.component.html',
  styleUrls: ['./taskmodal.component.css']
})
export class TaskmodalComponent implements OnInit {
  title: string;
  list: Array<any> = [];
  tasksdetails;
  dtTrigger;
  dtElement;
  rerender;
  update = false;
  task = {
    id: '',
    isComplete: false,
    content: '',
    taskName: ''
  };
  constructor(private taskSer: TaskService, public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    if (this.tasksdetails.id) {
      this.update = true;
      this.task.id = this.tasksdetails.id;
      this.task.isComplete = this.tasksdetails.isComplete;
      this.task.content = this.tasksdetails.content;
      this.task.taskName = this.tasksdetails.taskName;
    }
  }

  save(task): void {
    this.taskSer.addTodo(task)
    .subscribe();
    this.task.content = '';
    this.rerender();
  }

  updateActive(taskdet): void {
    this.taskSer.updateTodo(taskdet)
    .subscribe(data => {
      this.rerender();
    });

  }
}
