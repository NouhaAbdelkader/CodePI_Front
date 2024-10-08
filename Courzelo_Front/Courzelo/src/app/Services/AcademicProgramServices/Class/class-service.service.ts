import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { Level } from 'src/app/Models/AcademicProgramEntities/Level';

const getclassurl = "http://localhost:8081/listofclass";
const Updateclassurl ="http://localhost:8081/updateClasses";
const deleteclassurl = "http://localhost:8081/DeleteClass";
const addclass = "http://localhost:8081/addclass";
const getidclassurl = "http://localhost:8081/getclassbyid";

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {
  
  constructor(private http: HttpClient) { }


  addclass(classData: { name: string, id: string }): Observable<any> {
    return this.http.post(`${addclass}?id=${classData.id}`, classData);
  }


  updatedclass(Class: Class): Observable<Class> {
    // Replace with your actual update endpoint
      return this.http.put<Class>(Updateclassurl, Class);
    }


  getclass(id: any) {
    return this.http.get(`${getidclassurl}/${id}`);
  }
  getAllclass(): Observable<Class[]> {
    return this.http.get<Class[]>(getclassurl);
  }

  delete(id: any) {
    return this.http.delete(`${deleteclassurl}/${id}`);
  }
}
