import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule], // j'importe 
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {


  // signal pour lier le textarea au code
  messageText = signal('');


  // Evenement de sortie
  onSendMessage = output<string>();

  handleSubmit() {
    const text = this.messageText().trim();
    if (text) {
      this.onSendMessage.emit(text); 
      this.messageText.set(''); 
    }
  }

  // Cela permet l'envoi avec entree
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      this.handleSubmit();
    }
  }
}