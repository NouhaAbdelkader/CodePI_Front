import { Component, OnInit } from '@angular/core';
interface TimelineEvent {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}
@Component({
  selector: 'app-acceuil-prim',
  templateUrl: './acceuil-prim.component.html',
  styleUrls: ['./acceuil-prim.component.css']
})


export class AcceuilPrimComponent implements OnInit {
  events: TimelineEvent[] = [
    {
      title: 'Valid Votes',
      description: 'If a professor reaches 5 valid votes, they can\'t vote for 24 hours.',
      icon: 'mdi-circle',
      iconColor: 'bg-danger'
    },
    {
      title: 'Accumulating Incentive Votes',
      description: 'Each valid vote contributes to the accumulation of incentive votes for the professor.',
      icon: 'mdi-circle',
      iconColor: 'bg-success'
    },
    // Add more events as needed...
  ];

  constructor() { }

  ngOnInit(): void {
  }
}