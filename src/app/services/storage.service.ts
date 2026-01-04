import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'gemini_chat_history';

  // Permet d'enregistrer les messages dans le navigateur
  saveMessages(messages: Message[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
  }

  // Permet de récupérer les messages quand on rafraîchit la page
  loadMessages(): Message[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  // Optionnel : Pour effacer la conversation
  clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}