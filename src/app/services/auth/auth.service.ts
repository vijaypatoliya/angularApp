import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from '../localstorage.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService implements HttpInterceptor {

  constructor(private localstorageService: LocalstorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localstorageService.GetValueFromLocalStorage() || '';
    // set hearder authentication
    const authReq = req.clone({
      headers: req.headers.append('Content-Type', 'application/json')
      .append('Authorization', token)
      .append('Accept', 'multipart/form-data')
    });

    return next.handle(authReq)
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
