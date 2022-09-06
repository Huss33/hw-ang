import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Memo } from 'src/app/Memo';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-memo',
  templateUrl: './edit-memo.component.html',
  styleUrls: ['./edit-memo.component.css']
})
export class EditMemoComponent implements OnInit {
  // @Input does not load the value right away so it must 
  // be initailized, or allowed to be undefined
  @Input() memo: Memo = {createdOn: new Date, text: ''}
  @Output() apply: EventEmitter<Memo> = new EventEmitter()
  @Output() cancel: EventEmitter<undefined> = new EventEmitter() 
  newText: string = ''

  constructor(private uiService: UiService) { }

  // just before this is called, this.memo has been loaded 
  // with the correct value from the html via @Input
  ngOnInit(): void {
    this.newText = this.memo.text
  }

  onApply(): void {
    this.apply.emit({...this.memo, text: this.newText})
  }

  onCancel(): void {
    this.cancel.emit()
  }

}
