import { Component, signal, computed, inject, OnInit } from '@angular/core'; // 1. Ajoutez OnInit ici
import { Message } from '../../models/message.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { GeminiService } from '../../services/gemini.service';
import { StorageService } from '../../services/storage.service'; // 2. Importez votre nouveau service

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [MessageListComponent, MessageInputComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnInit { // 3. Ajoutez "implements OnInit"
  private geminiService = inject(GeminiService);
  private storageService = inject(StorageService); // 4. Injectez le StorageService

  messages = signal<Message[]>([]);
  isLoading = signal<boolean>(false);
  messageCount = computed(() => this.messages().length);

  // 5. Cette méthode charge l'historique au lancement de l'application
  ngOnInit() {
    const savedMessages = this.storageService.loadMessages();
    this.messages.set(savedMessages);
  }

  addNewMessage(text: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: text,
      role: 'user',
      timestamp: new Date()
    };

    // Mise à jour et SAUVEGARDE du message utilisateur
    this.messages.update(prev => [...prev, userMessage]);
    this.storageService.saveMessages(this.messages());

    this.isLoading.set(true);

    this.geminiService.sendMessage(text).subscribe({
      next: (aiResponse) => {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          text: aiResponse,
          role: 'assistant',
          timestamp: new Date()
        };
        
        // Mise à jour et SAUVEGARDE de la réponse de l'IA
        this.messages.update(prev => [...prev, assistantMessage]);
        this.storageService.saveMessages(this.messages());
      },
      error: (err) => {
        console.error('Erreur Gemini:', err);
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          text: "Désolé, j'ai rencontré une erreur. Vérifiez votre clé API.",
          role: 'assistant',
          timestamp: new Date()
        };
        this.messages.update(prev => [...prev, errorMessage]);
        this.storageService.saveMessages(this.messages()); // Sauvegarde aussi l'erreur si besoin
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}