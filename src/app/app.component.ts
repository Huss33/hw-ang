import { Component } from '@angular/core';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string | undefined

  constructor(private uiService: UiService) {
    uiService.whenUsernameChanges().subscribe(
      username => {
        console.log(username)
        this.username = username
    })
  }
}
