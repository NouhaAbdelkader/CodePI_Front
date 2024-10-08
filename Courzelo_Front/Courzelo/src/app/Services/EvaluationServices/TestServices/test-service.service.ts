import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../../../Models/EvaluationEntities/Test';
import { QuestionTest } from 'src/app/Models/EvaluationEntities/QuestionTest';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private baseUrl = "http://localhost:8081/Tests";

  constructor(private http: HttpClient) { }

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}/all`);
  }

  getTestById(id: string): Observable<Test> {
    return this.http.get<Test>(`${this.baseUrl}/get/${id}`);
  }

  addTest(moduleId : string ,teacherId : string ,test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.baseUrl}/add/${moduleId}/${teacherId}`, test);
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.baseUrl}/update`, test);
  }

  deleteTest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }
  assignTestToQuestiions(idTest: string, questions: QuestionTest[]): Observable<QuestionTest> {
    return this.http.post<QuestionTest>(`${this.baseUrl}/addAndAsign/${idTest}`, questions);
  }
  retrieveTestsSortedByAttributeAndValue(attributeName: string, attributeValue: any): Observable<Test[]> {
    // Utilisation de HttpParams pour passer les paramètres de requête
    const params = new HttpParams().set('attributeName', attributeName).set('attributeValue', attributeValue.toString());
    return this.http.get<Test[]>(`${this.baseUrl}/sorted`, { params: params });
  }
}