import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GroupProject } from 'src/app/Models/ProjectEntities/GroupProject';
import { Project } from 'src/app/Models/ProjectEntities/Project';

import { Tasks, status } from 'src/app/Models/ProjectEntities/Tasks';

const addprojecturl ="http://localhost:8081/addProject";
const getallprojecturl ="http://localhost:8081/listofProjects";
const deleteprojecturl="http://localhost:8081/DeleteProject";
const Updateprojeturl="http://localhost:8081/UpdatelProject";
const getidprojecturl = "http://localhost:8081/getProjectbyid";
const getgeneratgroupurl="http://localhost:8081/projects/assignStudentsToGroup";
const baseUrl= "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class ProjetserviceService {
  private projectIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) { }

  addproject(data: any) : Observable<any> {
    return this.http.post(addprojecturl , data);
  }
  
  getAllproject(): Observable<Project[]> {
    return this.http.get<Project[]>(getallprojecturl); 
  }

  delete(id: any) {
    return this.http.delete(`${deleteprojecturl}/${id}`);
  }

  updateproject(project: Project): Observable<Project> {
    // Replace with your actual update endpoint
      return this.http.put<Project>(Updateprojeturl, project);
    }

    getproject(id: any) {
      return this.http.get(getidprojecturl);
    }

    assignStudentsToGroup(projectId: string): Observable<string> {
      return this.http.post(`${getgeneratgroupurl}?projectId=${projectId}`, null, { responseType: 'text' });
    }

   
    getProjectsForUser(studentId: string): Observable<GroupProject[]> {
      return this.http.get<GroupProject[]>(`${baseUrl}/userproject/${studentId}`);
    }


    
  

    getTasksByProject(projectId: string): Observable<Tasks[]> {
      return this.http.get<Tasks[]>(`${baseUrl}/${projectId}/tasks`);
    }

    
  setProjectId(projectId: string): void {
    this.projectIdSubject.next(projectId);
  }

  getProjectId(): Observable<string | null> {
    return this.projectIdSubject.asObservable();
  }


  getTasksByStatus(status: status){
    return this.http.get<Tasks[]>(`${baseUrl}/tasks/status/${status}`);
  }
  moveTask(id: string, newStatus: string) {
    console.log(id)
    console.log(newStatus)
    return this.http.put<Tasks>(`${baseUrl}/${id}/move?newStatus=${newStatus}`, {});
  }
}

