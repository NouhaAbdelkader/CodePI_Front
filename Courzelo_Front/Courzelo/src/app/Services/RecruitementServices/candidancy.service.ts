import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
const baseurl = "http://localhost:8081/candidancy";
const baseurlgetall = "http://localhost:8081/candidancy/all";
const baseurladd = "http://localhost:8081/candidancy/add";
const baseurlupdate = "http://localhost:8081/candidancy/update";
const baseurldelete = "http://localhost:8081/candidancy/delete";
const baseurlgetbyid = "http://localhost:8081/candidancy/id";

@Injectable({
  providedIn: "root",
})
export class CandidancyService {
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
  createCandidancy(data: any, jobOfferId: any, userId: string) {
    const urladd = `http://localhost:8081/candidancy/add/${jobOfferId}/${userId}`;
    return this.http.post(urladd, data);
  }
  updateCandidacy(id: string, candidacy: any) {
    const url = `http://your-backend-url/candidacies/${id}`;
    return this.http.put(url, candidacy);
  }
}
