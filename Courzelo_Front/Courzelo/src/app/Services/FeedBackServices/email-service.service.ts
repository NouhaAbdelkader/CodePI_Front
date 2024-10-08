import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EmailServiceService {
  private emailUrl = "http://localhost:8081/sendEmail";

  constructor(private http: HttpClient) {}

  sendEmail(recipient: string, subject: string, message: string) {
    const body = { recipient, subject, message };
    return this.http.post<any>(this.emailUrl, body);
  }
}
