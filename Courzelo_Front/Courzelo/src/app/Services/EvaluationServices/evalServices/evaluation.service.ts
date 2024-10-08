import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from 'src/app/Models/EvaluationEntities/Evaluation'; // Assurez-vous d'importer votre modèle Evaluation
import { Module } from 'src/app/Models/AcademicProgramEntities/Module'; // Assurez-vous d'importer votre modèle Evaluation
import { UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private baseUrl = "http://localhost:8081/evaluations";

  constructor(private http: HttpClient) { }

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.baseUrl}/add`, evaluation);
  }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.baseUrl}/all`);
  }

  updateEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.baseUrl}/update`, evaluation);
  }

  getEvaluationById(idEvaluation: string): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.baseUrl}/get/${idEvaluation}`);
  }

  removeEvaluation(idEvaluation: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/remove/${idEvaluation}`);
  }

  takeTest(testId: string, studentId: string, studentAnswers: any): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.baseUrl}/${testId}/${studentId}/takeTest`, studentAnswers);
  }

  findModule(testId: string, studentId: string): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.baseUrl}/findModule/${testId}/${studentId}`);
  }

  assignTestToModule(moduleId: string, testId: string): Observable<Module> {
    const params = { moduleId, testId };
    return this.http.post<Module>(`${this.baseUrl}/assignTestToModule`, params);
  }

  assignStudentToEvaluation(evaluationId: string, studentId: string, moduleId: string): Observable<Evaluation> {
    const params = { evaluationId, studentId, moduleId };
    return this.http.post<Evaluation>(`${this.baseUrl}/assignStudentAndModuleToEvaluation`, params);
  }
  

  moduleEvaluation(moduleId: string, studentId: string): Observable<Evaluation> {
    const params = { moduleId, studentId };
    const options = {
        params: new HttpParams()
            .set('moduleId', moduleId)
            .set('studentId', studentId)
    };

    return this.http.post<Evaluation>(`${this.baseUrl}/module-evaluation`, null, options);
}


  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl}/allModules`);
  }
  getStudentPerformanceStatistics(studentId: string): Observable<UserCourzelo> {
    return this.http.get<UserCourzelo>(`${this.baseUrl}/statistics/${studentId}`);
  }
  getAllEvaluationsByStudent(studentId: string): Observable<Evaluation[]> {
 
    return this.http.get<Evaluation[]>(`${this.baseUrl}/allbystudent/${studentId}`);
}

getStudentById(studentId: string): Observable<UserCourzelo> {
    return this.http.get<UserCourzelo>(`${this.baseUrl}/getStudent/${studentId}`);
}
calculfinals() : Observable<Evaluation[]>{
  return this.http.get<Evaluation[]>(`${this.baseUrl}/finals`);
}

getStudentSilverBadges( studentId: string): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/SilverBadges/${studentId}`);
}

getStudentgoldBadges( studentId: string): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/goldBadges/${studentId}`);
}
getStudentDimondBadges( studentId: string): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/dimondBadges/${studentId}`);
}
getStudentbronzeBadges( studentId: string): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/bronzeBadges/${studentId}`);
  
}
getStudentfinalGrade( studentId: string): Observable<Evaluation> {
  return this.http.get<Evaluation>(`${this.baseUrl}/getmyfinal/${studentId}`);
}
getStrengths(studentId: string) {
  return this.http.get<string[]>(`${this.baseUrl}/strengths/${studentId}`);
}

getWeaknesses(studentId: string) {
  return this.http.get<string[]>(`${this.baseUrl}/weaknesses/${studentId}`);
}
}
