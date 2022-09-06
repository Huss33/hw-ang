import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Memo } from '../Memo';
import { UsersService } from './users.service';
import { User } from '../User';
import { MemosService } from './memos.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
// keep track of events
showCreateMemoSubject: Subject<boolean> = new Subject()
memosSubject: Subject<Memo[]> = new Subject()
private nextID: number = 0
memos: Memo[]= []
editSubject: Subject<number | undefined> = new Subject()
userSubject: Subject<string | undefined> = new Subject()
username: string | undefined
userID: number | undefined
isLoggingIn: boolean = true
isLoggingInSubject: Subject<boolean> = new Subject()

  constructor(private usersService: UsersService, private memosService: MemosService) { }
// actions that happen to the application

dummyMemosUpdate(): void {
  this.memosSubject.next(this.memos)
}

whenMemosListUpdated(): Observable<Memo[]> {
  return this.memosSubject.asObservable()
}

startAddMemo(): void {
  this.showCreateMemoSubject.next(true)
}

whenAddMemoChanges(): Observable<boolean> {
  return this.showCreateMemoSubject.asObservable()

}
cancelAddMemo(): void {
  this.showCreateMemoSubject.next(false)
}

applyCreateMemoHappend(text: string): void {
  // notify the observable that the event occured
  const newMemo: Memo = {
    userID: this.userID,
    createdOn: new Date(),
    text 
  }

  this.memosService.add(newMemo).subscribe(() => {
    this.refreshMemos()
    this.showCreateMemoSubject.next(false)
  })

}

deleteMemoHappened(id: number): void {
  this.memos = this.memos.filter(memo => memo.id !== id)
  this.memosSubject.next(this.memos)
}

startEditing(id: number): void {
  this.editSubject.next(id)
}

whenEditingStarts(): Observable<number | undefined> {
  return this.editSubject.asObservable()
}

cancelEditing(): void {
  this.editSubject.next(undefined)
}

applyTheEdit(id: number, text: string) {
  const memoToEdit = this.memos.find(memo => memo.id === id)

  if (memoToEdit) {
    memoToEdit.text = text
    this.memosSubject.next(this.memos)
    this.editSubject.next(undefined)
  }else
    console.log('ID not found. Cannot apply edit');
  
}

private refreshMemos(): void {
  if (this.userID !== undefined)
    this.memosService.getByUserID(this.userID)
        .subscribe(memos => {
          this.memos = memos
          this.memosSubject.next(memos)
})
else
  console.log('Backend returned a user w/o an id');
}
  

attemptLogin(credentials: {username: string, password: string}): void {
  this.usersService.get(credentials.username, credentials.password)
  .subscribe((maybeAUser: User | undefined) => {
    if (maybeAUser !== undefined) {
      this.username = credentials.username
      this.userID = maybeAUser.id
      this.userSubject.next(this.username)
      this.refreshMemos()
    } else
      console.log('Login failed');
  })
}

attemptRegister(credentials: { username: string; password: string; }) {
  if (credentials.username !== '' && credentials.password !== '') {
    this.usersService.add(credentials).subscribe(() => {
    this.attemptLogin(credentials) 
  })
} else
    alert('You must enter a vaild username and password')
    return   
}

whenUsernameChanges(): Observable<string | undefined> {
  return this.userSubject.asObservable()
}

dummyUsernameUpdate(): void {
  this.userSubject.next(this.username)
}

logout(): void {
  this.userSubject.next(undefined)
}

whenIsLoggingInChanges(): Observable<boolean> {
  return this.isLoggingInSubject.asObservable()
}

showRegisterPage(): void {
  this.isLoggingIn = false
  this.isLoggingInSubject.next(this.isLoggingIn)
}

showLoginPage(): void {
  this.isLoggingIn = true
  this.isLoggingInSubject.next(this.isLoggingIn)
}

}
