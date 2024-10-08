import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filecalss } from 'src/app/Models/AcademicProgramEntities/Filecalss';

const upload = "http://localhost:8081/upload";
const baseUrl = "http://localhost:8081/content"

@Injectable({
  providedIn: 'root'
})
export class FileclassserviceService {

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData, courseId: string): Observable<Object> {
    return this.http.post<Object>(`${upload}`, file);
  }
  
  uploadF(file: File, courseId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const params = new HttpParams()
      .set('courseId', courseId);

    const headers = new HttpHeaders();

    return this.http.post(`${upload}`, formData, {
      params: params,
      headers: headers
    });
  }


  getFileContent(fileId: string): Observable<any> {
    return this.http.get(`${baseUrl}/${fileId}`, { responseType: 'arraybuffer' });
  }
}
