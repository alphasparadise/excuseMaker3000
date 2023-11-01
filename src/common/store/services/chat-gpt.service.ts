import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  apiCallInProgress = false;

  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) { }

  chatWithGpt(prompt: string) {
    this.apiCallInProgress = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const searchQuery: {role: string, content: string}[] = [
      {
        role: 'system',
        content: prompt
      }
    ]

    const requestBody = {
      messages: searchQuery,
      model: "gpt-3.5-turbo",
    };

    return this.http.post(this.apiUrl, requestBody, { headers }).pipe(
      map((data) => {
        this.apiCallInProgress = false;
        return data;
      }),
      catchError((error) => {
        this.apiCallInProgress = false;
        console.log(error);
        return [];
      })
    );
  }
}
