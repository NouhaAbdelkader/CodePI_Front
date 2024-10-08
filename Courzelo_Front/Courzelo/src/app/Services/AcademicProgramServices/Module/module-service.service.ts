import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
const addmoduleurl = "http://localhost:8081/addModuleToClasses";

const getmoduleurl = "http://localhost:8081/getAllModules";

const Updatemoduleurl ="http://localhost:8081/updateModule";
const deletemoduleurl = "http://localhost:8081/DeleteModule";

const getidmoduleurl = "http://localhost:8081/getmodulebyid";
@Injectable({
  providedIn: 'root'
})
export class ModuleServiceService {

  constructor(private http: HttpClient) { }

  updateModule(module: Module): Observable<Module> {
    console.log('Before update request:', module);
    return this.http.put<Module>(Updatemoduleurl, module)
      .pipe(
        tap(updatemodule => console.log('After update request:', updatemodule))
      );
  }

  addModule(data: any) {
    return this.http.post(addmoduleurl, data);
  }
  
  getmodule(id: any) {
    return this.http.get(`${getidmoduleurl}/${id}`);
  }
  getAllmodule(): Observable<Module[]> {
    return this.http.get<Module[]>(getmoduleurl); // Specify the type as Module[]
  }

 
  delete(id: any) {
    return this.http.delete(`${deletemoduleurl}/${id}`);
  }
}
