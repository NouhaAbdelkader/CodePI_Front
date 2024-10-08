import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QAnswer } from 'src/app/Models/EvaluationEntities/QAnswer';
@Injectable({
  providedIn: 'root'
})
export class QAnswerService {
  private baseUrl = "http://localhost:8081/QAnswers";

  constructor(private http: HttpClient) { }

    
  getAllQAnswers(): Observable<QAnswer[]> {
    return this.http.get<QAnswer[]>(`${this.baseUrl}/all`);
  }

  getQAnswerById(id: string): Observable<QAnswer> {
    return this.http.get<QAnswer>(`${this.baseUrl}/get/${id}`);
  }

  addQAnswer(QAnswer: QAnswer): Observable<QAnswer> {
    return this.http.post<QAnswer>(`${this.baseUrl}/add`, QAnswer);
  }

  updateQAnswer(QAnswer: QAnswer): Observable<QAnswer> {
    return this.http.put<QAnswer>(`${this.baseUrl}/update`, QAnswer);
  }

  deleteQAnswer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  
  }
}