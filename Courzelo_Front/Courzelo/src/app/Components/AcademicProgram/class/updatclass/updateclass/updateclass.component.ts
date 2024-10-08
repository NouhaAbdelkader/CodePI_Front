import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';

@Component({
  selector: 'app-updateclass',
  templateUrl: './updateclass.component.html',
  styleUrls: ['./updateclass.component.css']
})
export class UpdateclassComponent {
  message = '';
  currentclass: any = {}
  updatedclass: any; // Define the 'updatedLevel' property here

  constructor(
    private ls: ClassServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = '';
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getclass(id);
    });
  }

  getclass(id: any) {
    this.ls.getclass(id).subscribe(
      (data) => {
        this.currentclass = data;
        console.log('class retrieved:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateclass(): void {
    if (this.currentclass) {
      this.ls.updatedclass(this.currentclass).subscribe(updatedclass => {
        // Handle the updated class as needed
        console.log('Class updated:', updatedclass);
        
        // Navigate to the '/getallclasses' route after updating
        this.router.navigate(['/getallclasses']);
      });
    }
  }

}

