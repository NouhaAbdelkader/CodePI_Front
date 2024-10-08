import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';
import { FileclassserviceService } from 'src/app/Services/AcademicProgramServices/Course/fileclassservice.service';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.css']
})
export class ViewfileComponent {

  selectedFile: File | null = null;
  courseId: string = '';
  courseInfo: any;
  downloadUrl: string = '';
  fileContent: any;
  contentType: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fileService: FileclassserviceService,
    private courseService: CourseserviceService,
    private router: Router,
    private route: ActivatedRoute ,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // Retrieve courseId from route parameters automatically
    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      // Fetch course information based on the courseId
      this.fetchCourseInfo();
    });
  }

  fetchCourseInfo() {
    // Implement the logic to fetch course information based on courseId
    this.courseService.getcourse(this.courseId).subscribe(
      (info) => {
        this.courseInfo = info;
      },
      (error) => {
        console.error('Error fetching course information:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const inputElement = this.fileInput.nativeElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log(`Selected File: ${this.selectedFile?.name}, Type: ${this.selectedFile?.type}, Size: ${this.selectedFile?.size} bytes`);
      // Reset content and downloadUrl when a new file is selected
      this.fileContent = null;
      this.downloadUrl = '';
    } else {
      console.log('No file selected');
    }
  }

  onCourseIdChange(courseId: string): void {
    this.courseId = courseId;
    // Fetch course information when the courseId changes
    this.fetchCourseInfo();
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileService.uploadF(this.selectedFile, this.courseId).subscribe(
        (response: any) => {
          console.log('Server Response:', response);
          // Update the UI based on the response
          this.downloadUrl = response.downloadURL; // Save the download URL
          // Fetch the content of the uploaded file
          this.fetchFileContent(response.fileId);
        },
        (error: any) => {
          console.error('Error uploading file:', error);
          // Display an error message to the user
        }
      );
    } else {
      console.warn('No file selected');
    }
  }

  fetchFileContent(fileId: string) {
    this.fileService.getFileContent(fileId).subscribe(
      (content: any) => {
        this.handleFileContent(content);
      },
      (error: any) => {
        console.error('Error fetching file content:', error);
        // Display an error message to the user
      }
    );
  }

  handleFileContent(data: any) {
    const headers = data.headers;
    const contentDisposition = headers.get('content-disposition');
    this.contentType = headers.get('content-type') || '';

    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      this.handleDownload(data);
    } else {
      this.displayFileContent(data);
    }
  }

  handleDownload(data: any) {
    const blob = new Blob([data.body], { type: this.contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  displayFileContent(data: any) {
    const headers = data.headers;
    this.contentType = headers.get('content-type') || '';
  
    if (this.contentType.startsWith('text')) {
      this.fileContent = data.body;
    } else if (this.contentType.startsWith('application/pdf')) {
      // Display PDF using an embed tag
      const blob = new Blob([data.body], { type: this.contentType });
      const url = window.URL.createObjectURL(blob);
      this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (this.contentType.startsWith('image')) {
      // Display images as base64-encoded data
      const uint8Array = new Uint8Array(data.body);
      const binaryString = uint8Array.reduce((str, byte) => str + String.fromCharCode(byte), '');
      this.fileContent = 'data:' + this.contentType + ';base64,' + btoa(binaryString);
    } else {
      console.warn('Unsupported content type for direct display.');
      this.fileContent = 'Unsupported content type. Download the file to view.';
    }
  }
  
}