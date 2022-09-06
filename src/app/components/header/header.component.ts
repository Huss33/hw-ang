import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = "default"

  constructor(private uiService: UiService) {
    uiService.whenUsernameChanges()
    .subscribe(username => {
      if (username !== undefined) 
        this.username = username
      })
  }

  ngOnInit(): void {
    this.uiService.dummyUsernameUpdate()
  }

  onLogout(): void {
    this.uiService.logout()
  }
    
}
