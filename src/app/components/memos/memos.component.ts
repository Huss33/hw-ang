import { Component, OnInit } from '@angular/core';
import { Memo } from 'src/app/Memo';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-memos',
  templateUrl: './memos.component.html',
  styleUrls: ['./memos.component.css']
})
export class MemosComponent implements OnInit {
  addingMemo: boolean = false
  memos: Memo[] = []
  memoToEditID: number | undefined

  constructor(private uiService: UiService) {
    const doThis = (showAddMemo: boolean) => this.addingMemo = showAddMemo
    uiService.whenAddMemoChanges().subscribe(doThis)

    uiService.whenMemosListUpdated()
    .subscribe(memos => this.memos = memos)

    uiService.whenEditingStarts()
    .subscribe(id => this.memoToEditID = id)
  }

  ngOnInit(): void {
    this.uiService.dummyMemosUpdate()
  }

  onAddMemoClicked(): void {
    this.uiService.startAddMemo()
  }

  onCreateMemo(memo: Memo): void {
    this.uiService.applyCreateMemoHappend(memo.text)
  }

  onCancelCreate(): void {
    this.uiService.cancelAddMemo()
  }
  
  onApplyEdit(memo: Memo): void {
    if (memo.id !== undefined)
    this.uiService.applyTheEdit(memo.id, memo.text)
    else
    console.log('ID undefined. Cannot apply edit');
    
  }

  onCancelEdit(): void {
    this.uiService.cancelEditing()
  }

}
