import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
const progurl = "http://localhost:8081/classs";
@Injectable({
  providedIn: 'root'
})
export class ProgramserviceService {

  constructor(private http: HttpClient) {}
  getModulesByClass(className: string): Observable<Module[]> {
    const url = `${progurl}/${className}`;
    return this.http.get<Module[]>(url);
  }
 
}
