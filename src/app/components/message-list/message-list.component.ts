import { Component, input } from '@angular/core'; 
import { Message } from '../../models/message.model';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItemComponent],
  template: `
    @for (msg of messages(); track msg.id) {
      <app-message-item [message]="msg"></app-message-item>
    } @empty {
      <p>Aucun message, commencez une conversation !</p>
    }
  `
})
export class MessageListComponent {
  messages = input<Message[]>([]); 
}