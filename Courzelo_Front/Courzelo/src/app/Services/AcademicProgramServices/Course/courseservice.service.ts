import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Models/AcademicProgramEntities/Course';
const getallcoursesurl = "http://localhost:8081/listofcourses";
const Updateourseurl ="http://localhost:8081/updateCourses";
const deletecourseurl = "http://localhost:8081/DeleteCourse";
const getidcourseurl = "http://localhost:8081/getcoursebyid";
const addcourse= "http://localhost:8081/addcourse";
const getcoursebymoduleidurl= "http://localhost:8081/getcoursebymodule";
 
@Injectable({
  providedIn: 'root'
})
export class CourseserviceService {

  constructor(private http: HttpClient) { }


  addcourse(courseData: { name: string , id: string }): Observable<any> {
    return this.http.post(`${addcourse}?id=${courseData.id}`, courseData);
  }


  updatedcourse(course: Course): Observable<Course> {
    // Replace with your actual update endpoint
      return this.http.put<Course>(Updateourseurl, course);
    }

  getcourse(id: any) {
    return this.http.get(`${getidcourseurl}/${id}`);
  }
  getAllcourses(): Observable<Course[]> {
    return this.http.get<Course[]>(getallcoursesurl);
  }

  delete(id: any) {
    return this.http.delete(`${deletecourseurl}/${id}`);
  }

  getCoursesByModuleId(moduleId: string): Observable<Course[]> {
    
    return this.http.get<Course[]>(`${getcoursebymoduleidurl}/${moduleId}`);
  }


}
