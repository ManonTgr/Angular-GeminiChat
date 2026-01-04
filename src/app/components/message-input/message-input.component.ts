import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Indispensable pour le [(ngModel)]

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule], // On importe FormsModule ici
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  // Signal pour lier le textarea au code
  messageText = signal('');

  // Définition de l'événement de sortie
  onSendMessage = output<string>();

  handleSubmit() {
    const text = this.messageText().trim();
    if (text) {
      this.onSendMessage.emit(text); 
      this.messageText.set(''); 
    }
  }

  // Permet l'envoi avec Entrée (mais pas Shift+Entrée)
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      this.handleSubmit();
    }
  }
}