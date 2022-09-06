import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Memo } from '../Memo';

@Injectable({
  providedIn: 'root'
})
export class MemosService {

  private apiUrl = 'https://localhost:7231/Memos'

  constructor(private http: HttpClient) { }

  getByUserID(userID: number): Observable<Memo[]> {
    return this.http
      .get<Memo[]>(`${this.apiUrl}?userID=${userID}`)
  }

  add(memo: Memo): Observable<undefined> {
    return this.http.post<undefined>(this.apiUrl, memo)
  }
}
