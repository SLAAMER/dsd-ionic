import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { bb } from 'billboard.js';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('SplineChart') domSpline;
  @ViewChild('LineChart') domLine;
  @ViewChild('GaugeChart') domGauge;

  splineChart:any;
  lineChart:any;
  gaugeChart:any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.loadSplineChart();
    this.loadLineChart();
    this.loadGaugeChart();
  }

  loadSplineChart(){
    this.splineChart = bb.generate({
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25]
        ],
        type: "spline"
      },
      legend:{
        position: "right"
      },
      bindto: this.domSpline.nativeElement
    });

    this.updateSplineChartData();
  }

  updateSplineChartData(){
    setInterval(()=>{
      
    }, 1000)
  }

  loadLineChart(){
    this.lineChart = bb.generate({
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25]
        ]
      },
      legend:{
        position: "right"
      },
      bindto: this.domLine.nativeElement
    });
  }

  loadGaugeChart(){
    this.gaugeChart = bb.generate({
      data: {
        columns: [
      ["data", 91.4]
        ],
        type: "gauge",
      },
      gauge: {},
      color: {
        pattern: [
          "#FF0000",
          "#F97600",
          "#F6C600",
          "#60B044"
        ],
        threshold: {
          values: [
            30,
            60,
            90,
            100
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge.nativeElement
    });

    this.updateGaugeChartData();
  }

  updateGaugeChartData(){
    setTimeout(()=> {
      this.gaugeChart.load({
        columns: [["data", 10]]
      });
    }, 1000);
  }
}
