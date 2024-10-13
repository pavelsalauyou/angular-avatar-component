import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
