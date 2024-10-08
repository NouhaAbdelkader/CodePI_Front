import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
const baseurl = "http://localhost:8081/feedback";
const baseurlgetall = "http://localhost:8081/feedback/all";
const baseurladd = "http://localhost:8081/feedback/add";
const baseurlupdate = "http://localhost:8081/feedback/update";
const baseurldelete = "http://localhost:8081/feedback/delete";
const baseurlgetbyid = "http://localhost:8081/feedback/id";
const baseurladdteacher = "http://localhost:8081/feedback/addTeacher";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseurlgetall);
  }
  get(id: any) {
    return this.http.get(`${baseurlgetbyid}/${id}`);
  }
  create(data: any, userId: string) {
    return this.http.post(`${baseurladd}/${userId}`, data);
  }
  createteacher(data: any, userId: string) {
    return this.http.post(`${baseurladdteacher}/${userId}`, data);
  }
  update(id: any, data: any) {
    return this.http.put(`${baseurlupdate}/${id}`, data);
  }
  delete(id: any) {
    return this.http.delete(`${baseurldelete}/${id}`);
  }
}
