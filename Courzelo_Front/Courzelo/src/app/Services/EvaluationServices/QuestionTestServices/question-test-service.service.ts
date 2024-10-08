import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionTest } from '../../../Models/EvaluationEntities/QuestionTest';
import { Observable } from 'rxjs';
import { QAnswer } from 'src/app/Models/EvaluationEntities/QAnswer';
@Injectable({
  providedIn: 'root'
})
export class QuestionTestServiceService {
  private baseUrl = "http://localhost:8081/QuestionTests";

  constructor(private http: HttpClient) { }

    
  getAllQuestionTests(): Observable<QuestionTest[]> {
    return this.http.get<QuestionTest[]>(`${this.baseUrl}/all`);
  }

  getQuestionTestById(id: string): Observable<QuestionTest> {
    return this.http.get<QuestionTest>(`${this.baseUrl}/get/${id}`);
  }

  addQuestionTest(QuestionTest: QuestionTest): Observable<QuestionTest> {
    return this.http.post<QuestionTest>(`${this.baseUrl}/add`, QuestionTest);
  }

  updateQuestionTest(QuestionTest: QuestionTest): Observable<QuestionTest> {
    return this.http.put<QuestionTest>(`${this.baseUrl}/update`, QuestionTest);
  }

  deleteQuestionTest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  
  }
  assignQuestionToAnswers(idQuestionTest: string, qAnswers: QAnswer[]): Observable<QuestionTest> {
    return this.http.post<QuestionTest>(`${this.baseUrl}/addAndAsign/${idQuestionTest}`, qAnswers);
  }
  
}

