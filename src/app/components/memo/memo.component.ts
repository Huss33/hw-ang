import { Component, Input, OnInit } from '@angular/core';
import { Memo } from 'src/app/Memo';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  @Input() memo: Memo = {createdOn: new Date, text: 'default text here'}

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  onEdit(): void {
    if (this.memo.id !== undefined)
    this.uiService.startEditing(this.memo.id)
    else
    console.log('ID is undefined. Cannot start editing');
    
  }

  onDelete(): void {
    if (this.memo.id !== undefined)
    this.uiService.deleteMemoHappened(this.memo.id)
    else 
      console.log('ID is undefined. Cannot delete')
      
  }

}
