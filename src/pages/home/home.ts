import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { DispensersProvider } from '../../providers/dispensers/dispensers';
import { bb } from 'billboard.js';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('SplineChart') domSpline;
  @ViewChild('LineChart') domLine;
  @ViewChild('GaugeChart1') domGauge1;
  @ViewChild('GaugeChart2') domGauge2;
  @ViewChild('GaugeChart3') domGauge3;

  splineChart: any;
  lineChart: any;
  gaugeChart1: any;
  gaugeChart2: any;
  gaugeChart3: any;

  dispenserName:any;
  dispenserId: any;

  dispensers: any = [];

  racks: any = [];
  constructor(public navCtrl: NavController, private dispProvider: DispensersProvider) {

  }

  ionViewDidEnter() {
    //this.loadSplineChart();
    //this.loadLineChart();
    this.loadGaugeChart1();
    this.loadGaugeChart2();
    this.loadGaugeChart3();

    this.getDispensers();
  }

  getDispensers() {
    this.dispProvider.getDispensers().then((res) => {
      this.dispensers = res;
      this.dispenserName = this.dispensers[0].name;
      this.racks = this.dispensers[0];
      this.dispenserId = this.dispensers[0]._id;
      this.updateGaugeChart1Data();
      this.updateGaugeChart2Data();
      this.updateGaugeChart3Data();
      this.updateGauge();
    }).catch((err) => {
      console.log(err);
    });
  }

  valueChange() {
    this.dispProvider.getDispenser(this.dispenserId).then((res) => {
      console.log(res);
      this.dispenserName = "";
      this.racks = res;
      this.updateGaugeChart1Data();
      this.updateGaugeChart2Data();
      this.updateGaugeChart3Data();
      this.updateGauge();
    }).catch((err) => {
      console.log(err);
    });
  }

  updateGauge() {
    setInterval(() => {
      this.dispProvider.getDispenser(this.dispenserId).then((res) => {
        //console.log(res);
        this.racks = res;
        this.updateGaugeChart1Data();
        this.updateGaugeChart2Data();
        this.updateGaugeChart3Data();
      }).catch((err) => {
        console.log(err);
      });
    }, 5000);
  }

  loadSplineChart() {
    this.splineChart = bb.generate({
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25]
        ],
        type: "spline"
      },
      legend: {
        position: "right"
      },
      bindto: this.domSpline.nativeElement
    });

    this.updateSplineChartData();
  }

  updateSplineChartData() {
    setInterval(() => {

    }, 1000)
  }

  loadLineChart() {
    this.lineChart = bb.generate({
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25]
        ]
      },
      legend: {
        position: "right"
      },
      bindto: this.domLine.nativeElement
    });
  }

  loadGaugeChart1() {
    this.gaugeChart1 = bb.generate({
      data: {
        columns: [
          ["data", 0]
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
            20,
            40,
            60,
            100
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge1.nativeElement
    });
  }

  loadGaugeChart2() {
    this.gaugeChart2 = bb.generate({
      data: {
        columns: [
          ["data", 0]
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
            20,
            40,
            60,
            100
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge2.nativeElement
    });
  }

  loadGaugeChart3() {
    this.gaugeChart3 = bb.generate({
      data: {
        columns: [
          ["data", 0]
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
            20,
            40,
            60,
            100
          ]
        }
      },
      size: {
        height: 180
      },
      bindto: this.domGauge3.nativeElement
    });
  }

  updateGaugeChart1Data() {
    let data = this.racks.racks[0].quantity;
    let current = this.gaugeChart1.data("data");
    if(current[0].values[0].value != data){
      this.gaugeChart1.load({
        columns: [["data", data]]
      });
    }
  }

  updateGaugeChart2Data() {
    let data = this.racks.racks[1].quantity;
    let current = this.gaugeChart2.data("data");
    if(current[0].values[0].value != data){
      this.gaugeChart2.load({
        columns: [["data", data]]
      });
    }
  }

  updateGaugeChart3Data() {
    let data = this.racks.racks[2].quantity;
    let current = this.gaugeChart3.data("data");
    if(current[0].values[0].value != data){
      this.gaugeChart3.load({
        columns: [["data", data]]
      });
    }
  }
}
