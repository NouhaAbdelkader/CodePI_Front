import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
const baseurl = "http://localhost:8081/questionFeedback";
const baseurlgetall = "http://localhost:8081/questionFeedback/all";
const baseurladd = "http://localhost:8081/questionFeedback/add";
const baseurlupdate = "http://localhost:8081/questionFeedback/update";
const baseurldelete = "http://localhost:8081/questionFeedback/delete";
const baseurlgetbyid = "http://localhost:8081/questionFeedback/id";
@Injectable({
  providedIn: "root",
})
export class QuestionfeedbackService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(baseurlgetall);
  }
  get(id: any) {
    return this.http.get(`${baseurlgetbyid}/${id}`);
  }
  create(data: any) {
    return this.http.post(baseurladd, data);
  }
  update(id: any, data: any) {
    return this.http.put(`${baseurlupdate}/${id}`, data);
  }
  delete(id: any) {
    return this.http.delete(`${baseurldelete}/${id}`);
  }
}
