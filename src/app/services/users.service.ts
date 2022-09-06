import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User';
import { map, Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:5000/users'

  constructor(private http: HttpClient) { }

  // create a method to get a particular user by username and password
  get(username: string, password: string): Observable<User | undefined> {
  // make an http request of the type GET to http:localhost:5000/users?username=mad&password=pass
  // before I can make an http request, I must have an httpClient object
  return this.http
  .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`) // returns an observable of an array of user objects
  .pipe(map(users => { // map all events from a User[] to a User | undefined
    if (users.length === 0)
      return undefined

    return users[0]
  }))
  
}

// implement registering w/ the json-server backend

  add(user: User): Observable<undefined> {
    return this.http.post<undefined>(this.apiUrl, user)
  }

}
