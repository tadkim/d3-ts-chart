import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartConfigInterface } from './chart/chart.config.interface';
import { ChartCore } from './chart/chart-core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  
  @ViewChild('svgContainer') svgContainer: ElementRef;
  chartCore: ChartCore;

  ngOnInit(){
    const config: ChartConfigInterface = {
      info: {
        width: this.svgContainer.nativeElement.offsetWidth,
        height: this.svgContainer.nativeElement.offsetHeight,
        margin: {
          left: 50,
          right: 50,
          bottom: 50,
          top: 50
        },
       selector: 'svgContainer'
      },
      axis: [
        {
          field: 'category', // data mapping field
          type: 'category',   // axis type
          position: 'xb', // axis position
          displayStandard: 'category'   // display axis class name
        },
        {
          field: 'numeric1', // data mapping field
          type: 'numeric',   // axis type
          position: 'yl', // axis position
          displayStandard: 'numeric1'   // display axis class name
        }
      ],
      series: [
        {
          fieldX: 'category',
          fieldY: 'numeric1',
          displayStandard: 'numeric1',  // 이게 column graph라서 
          type: 'column'
        }
      ],
      data: undefined
    }
    this.chartCore = new ChartCore(config);
  }

}
