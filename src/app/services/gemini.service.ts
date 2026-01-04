import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { GeminiResponse } from '../models/gemini-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private http = inject(HttpClient);
  private apiUrl = environment.geminiApiUrl;
  private apiKey = environment.geminiApiKey;

  sendMessage(prompt: string): Observable<string> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    
    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    // Appel HTTP POST et transformation de la réponse
    return this.http.post<GeminiResponse>(url, body).pipe(
      map(response => response.candidates[0].content.parts[0].text)
    );
  }
}