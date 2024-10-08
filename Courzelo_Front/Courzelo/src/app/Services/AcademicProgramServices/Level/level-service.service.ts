import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Level } from 'src/app/Models/AcademicProgramEntities/Level';


const addlevelurl = "http://localhost:8081/addlevel";

const getlevelurl = "http://localhost:8081/listoflevel";

const Updatelevelurl ="http://localhost:8081/Updatelevel";
const deletelevelurl = "http://localhost:8081/Deletelevel";

const getidlevelurl = "http://localhost:8081/getlevelbyid";

@Injectable({
  providedIn: 'root'
})
export class LevelServiceService {
 
  constructor(private http: HttpClient) { }

  updateLevel(level: Level): Observable<Level> {
  // Replace with your actual update endpoint
    return this.http.put<Level>(Updatelevelurl, level);
  }

  addlevel(data: any) {
    return this.http.post(addlevelurl, data);
  }
  
  getlevel(id: any) {
    return this.http.get(`${getidlevelurl}/${id}`);
  }
  getAlllevel() {
    return this.http.get(getlevelurl);
  }

 
  delete(id: any) {
    return this.http.delete(`${deletelevelurl}/${id}`);
  }

}
