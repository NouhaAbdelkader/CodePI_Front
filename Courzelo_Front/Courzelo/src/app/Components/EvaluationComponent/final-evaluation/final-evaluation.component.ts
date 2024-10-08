import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'src/app/Models/EvaluationEntities/Evaluation';
import { EvaluationService } from 'src/app/Services/EvaluationServices/evalServices/evaluation.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-final-evaluation',
  templateUrl: './final-evaluation.component.html',
  styleUrls: ['./final-evaluation.component.css']
})
export class FinalEvaluationComponent implements OnInit {
  finalEvaluation!: Evaluation; // Propriété pour stocker l'évaluation finale de l'étudiant
  evaluations! : Evaluation[]
  finalevaluations! : Evaluation[] 

  EvaluationData!: Evaluation;
  idUser!: string;
   roles: string[] = [];
   username!:string
  constructor(private evaluationService: EvaluationService) { }
  avatarColor: string = '';
  ngOnInit(): void {

    let user = sessionStorage.getItem('auth-user');
    console.log('User from sessionStorage:', user);
    if (user) {
      let userData = JSON.parse(user);
      console.log('Parsed user data:', userData);
      this.idUser = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      console.log('Roles:', this.roles);
    }
    this.loadGrades();
  
    this.loadFinalGrade();
    this.generateRandomColor();
     console.log("***********final ev",this.finalEvaluation)
  }




  calculFinals(): void {
    this.evaluationService.calculfinals().subscribe(
      (data: Evaluation[]) => {

        // Stockez l'évaluation finale de l'étudiant dans `finalEvaluation`
        this.finalevaluations = data;
        // Maintenant, vous pouvez utiliser `finalEvaluation` dans votre template HTML pour afficher les informations
      },
      (error) => {
        console.error('Error fetching final grade: ', error);
        // Vous pouvez ajouter une logique pour gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    );
  }

  loadFinalGrade(): void {
    this.evaluationService.getStudentfinalGrade(this.idUser).subscribe(
      (data: Evaluation) => {
        this.finalEvaluation = data;
        console.log("********",this.finalEvaluation)
      },
      (error) => {
        console.error('Error fetching final grade: ', error);
      }
    );
  }
  generateRandomColor(): void {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.avatarColor = `#${randomColor}`;
}




printReport(): void {
  const printContents = document.querySelector('.final-evaluation-card')?.innerHTML;
  
  if (printContents) {
      // Si printContents est défini, procédez à l'impression
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      
      document.body.innerHTML = originalContents;
      window.location.reload();
  } else {
      console.error('No content to print.');
  }
}


downloadReport(): void {
  const element = document.querySelector('.final-evaluation-card') as HTMLElement;
  html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Largeur du PDF en mm
      const pageHeight = 297; // Hauteur du PDF en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
      }

      pdf.save('final_evaluation_report.pdf'); // Enregistrer le PDF
  });
}

loadGrades(): void {
  this.evaluationService.getAllEvaluationsByStudent(this.idUser).subscribe(
    (data: Evaluation[]) => {
      this.evaluations = data;
      
    },
    (error) => {
      console.error('Error fetching modules: ', error);
    }
  );

}
}



