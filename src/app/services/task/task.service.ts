import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) { }
  baseurl = 'http://localhost:8000/task';

  getTodoList(dataTablesParameters, perpg, serch: any): Observable<any> {
    let pagenum;
    let page;
    let sortCol;
    let count = -1;
    dataTablesParameters.columns.forEach(element => {
      count++;
      if (dataTablesParameters.order[0].column === count) {
        sortCol = dataTablesParameters.columns[count].name;
      }
    });

    page = dataTablesParameters.start / dataTablesParameters.length;
    if (page >= 0) { pagenum = page + 1; }
    const setdata = {
      pagenumber: pagenum,
      perpage: perpg,
      sortColumn: sortCol,
      sortType: dataTablesParameters.order[0].dir,
      search: serch
    };

    return this.httpClient.post(`${this.baseurl}/getAll`, setdata)
    .map(response => {
      return response;
    });
  }

  addTodo(todo): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/TaskSet`, todo);
  }

  deleteTodo(todo_id): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}/Delete/${todo_id}`);
  }

  toggleDone(todo): Observable<any> {
    return this.httpClient.put(`${this.baseurl}/Complete/${todo._id}`, todo);
  }

  updateTodo(todo): Observable<any> {
    return this.httpClient.put(`${this.baseurl}/Update/${todo.id}`, todo);
  }
}
