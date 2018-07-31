import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }

  // Set Authentication Token
  public SetAuthorizationData(auth): void {
    localStorage.setItem('Authorization', auth);
  }

  // Get Authentication Token
  public GetValueFromLocalStorage(): string {
    const tokendata = localStorage.getItem('Authorization');

    return tokendata;
  }

  // Remove Authentication Token
  public RemoveValueFromLocalStorage(): void {
    localStorage.removeItem('Authorization');
  }
}
