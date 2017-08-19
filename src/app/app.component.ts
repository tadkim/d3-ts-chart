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
          field: 'category', // data mapping field (데이터랑 매칭되는 부분)
          type: 'category',   // axis type (c3, 빌보드도 axis type이 있음)
          position: 'xb', // axis position
          displayStandard: 'category'   // display axis class name
        },
        {
          field: 'numeric1', // data mapping field
          type: 'numeric',   // axis type
          position: 'yl', // axis position
          displayStandard: 'numeric1'   // display axis class name
        },
        // 여기서부터 chapter2에서 추가한 부분.
         {
          field: 'numeric2', // data mapping field
          type: 'numeric',   // axis type
          position: 'yr', // axis position
          displayStandard: 'numeric2'   // display axis class name
        },
         {
          field: 'datetime', // data mapping field
          type: 'date',   // axis type
          position: 'xt', // axis position
          displayStandard: 'datetime'   // display axis class name
        }
      ],
      series: [
        {
          fieldX: 'category',
          fieldY: 'numeric1',
          displayStandard: 'numeric1',  // 이게 column graph라서 
          type: 'column',
          textLabel: {
            show: true,
            orient: 'top'
          }
        },
        { 
          fieldX: 'category',
          fieldY: 'numeric1',
          displayStandard: 'numeric1',  // 이게 column graph라서 
          type: 'line',
        }
      ],
      data: undefined
    }
    this.chartCore = new ChartCore(config);
  }

}
