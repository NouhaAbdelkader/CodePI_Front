import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { VoteConsumerService } from 'src/app/Services/ForumService/vote-consumer.service';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.css']
})
export class ChartComponentComponent {
  x=80;
  b=10;
  lineChart!: Chart;
  rangeVote!:number
  rangeExp!:number;
  rangeBadge!:number;
  constructor(private voteService:VoteConsumerService){}
  ngOnInit(): void {
    this.voteService.getRangeIncentiveVote().subscribe(
      (data) => {
        this.rangeVote = data;
        this.createChart();
      }
    );

    this.voteService.getRangeIncentiveExp().subscribe(
      (data) => {
        this.rangeExp = data;
        this.createChart();
      }
    );

    this.voteService.getRangeBadge().subscribe(
      (data) => {
        this.rangeBadge = data;
        this.createChart();
      }
    );
  }

  createChart(): void {
    if (this.rangeVote !== undefined && this.rangeExp !== undefined && this.rangeBadge !== undefined) {
      this.lineChart = new Chart({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Linechart'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
          {
            type: "pie",
            data: [
              { name: "Incetive vote ", y: this.rangeVote, color: "#00FF00" },
              { name: "Incentive Explantion", y: this.rangeExp, color: "#FF0000" },
              { name: "Badge ", y: this.rangeBadge, color: "#0000FF" },
            ]
          }
        ]
      });
    }
  }

}
