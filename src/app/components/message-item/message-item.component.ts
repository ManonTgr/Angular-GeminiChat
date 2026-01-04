import { Component, input } from '@angular/core';
import { Message } from '../../models/message.model';
import { DatePipe } from '@angular/common'; // Pour formater l'heure

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  
  message = input.required<Message>(); 
}