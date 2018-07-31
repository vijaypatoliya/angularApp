import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookstoreService {
  baseurl = 'http://localhost:8000/books';

  constructor(private httpClient: HttpClient) { }

  getBookList(dataTablesParameters, perpg, serch: any): Observable<any> {
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
      .map((response: any) => {
        return response;
      })
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error);
      });
  }

  getByFilter(): Observable<any> {
    const data = {
      bname: 'bname',
      bprise: 'bprise'
    };

    return this.httpClient.post(`${this.baseurl}/getByFilter`, data);
  }

  getBookbyhighPrice(): Observable<any> {
    const setdata = {
      pagenumber: 1,
      perpage: 1,
      sortColumn: 'bprice',
      sortType: 'desc'
    };

    return this.httpClient.post(`${this.baseurl}/getAll`, setdata);
  }

  getBookById(shwbyid): Observable<any> {
    const data = { showbyid: shwbyid };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByName(bookname): Observable<any> {
    const data = { showbyname: bookname };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByPage(bpageno): Observable<any> {
    const data = { showbypage: bpageno };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByPagefilter(pageg, pagel, ntequal): Observable<any> {
    const data = { gpage: pageg, lpage: pagel, notequal: ntequal };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByzeroPage(bpgsize): Observable<any> {
    const data = { bpagesize: bpgsize };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  getBookByYear(year): Observable<any> {
    const data = { showbyyear: year };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }
  getBookByYearfilter(yr2001, yr2015): Observable<any> {
    const data = { yr1: yr2001, yr15: yr2015 };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  showbooklang(): Observable<any> {
    const data = { bLanguage: 'bLanguage' };

    return this.httpClient.post(`${this.baseurl}/getAll`, data);
  }

  addBook(bookdetails): Observable<any> {
    return this.httpClient.post(`${this.baseurl}/bookSet`, bookdetails);
  }

  deleteBookbyid(bid): Observable<any> {
    const data = { bookid: bid };

    return this.httpClient.delete(`${this.baseurl}/deleteById/${bid}`);
  }

  deleteBookbyName(bookname): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}/deleteByName/${bookname}`);
  }

  deleteBookbyAuthor(bookauthor): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}/deleteByAuthor/${bookauthor}`);
  }

  deleteBookbyAuthDesc(auth, desc): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}/deleteByNameAuthor/${auth}/${desc}`);
  }

  deleteBookbyNameCate(name, category): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}/deleteByNameCategory/${name}/${category}`);
  }

  updateBookbyid(book): Observable<any> {
    return this.httpClient.put(`${this.baseurl}/updateById/${book.bookId}`, book);
  }

  updateBookbyname(book): Observable<any> {
    return this.httpClient.put(`${this.baseurl}/updateByName/${book.bname}`, book);
  }

  updateBookbyNameAuthor(book): Observable<any> {
    return this.httpClient.put(`${this.baseurl}/updateByNameAuth/${book.bname}/${book.bauthorname}`,
      book);
  }
}
