import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';
import { FileclassserviceService } from 'src/app/Services/AcademicProgramServices/Course/fileclassservice.service';

@Component({
  selector: 'app-filecomponent',
  templateUrl: './filecomponent.component.html',
  styleUrls: ['./filecomponent.component.css']
})
export class FilecomponentComponent implements OnInit {
  selectedFile: File | null = null;
  courseId: string = '';
  courseInfo: any;
  downloadUrl: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fileService: FileclassserviceService,
    private courseService: CourseserviceService,
    private router: Router,
    private route: ActivatedRoute
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
    } else {
      console.log('Aucun fichier sélectionné');
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
          console.log('Réponse du serveur:', response);
          // Mettez à jour l'interface utilisateur en fonction de la réponse
          this.downloadUrl = response.downloadURL; // Sauvegardez l'URL de téléchargement
        },
        (error: any) => {
          console.error('Erreur lors du téléchargement du fichier:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.warn('Aucun fichier sélectionné');
    }
  }
}