import { ChartAxis } from './chart-axis';
import { ChartScale } from './chart-scale';
import {
    ChartConfigInterface,
    ChartAxisConfigInterface,
    ScaleParamInterface, ChartAxisParamInterface,
    ChartSeriesConfigInterface, ChartSeriesParamInterface
} from './chart.config.interface';

import { ChartColumnSeries } from './chart-column-series';

import { select } from 'd3-selection';


export class ChartCore {
    config: ChartConfigInterface;
    target: any;
    _dataProvider: Array<any> | any[]; // 데이터 전체를 담고 있는 것. 언더바쓴 이유는 getter,setter

    width: number;
    height: number;

    scales: any = {}; // 가지고만있는 변수
    axisGroupElement: any;

    axis: Array<any> = [];
    series: Array<any> = [];

    seriesGroupElement: any;


    constructor(config: ChartConfigInterface) {
        this.config = config;
        this._createRootSvg(); // for make container.
        this._setSize(); // svg width, height setting.
        this.dataProvider = this.config.data; //setter라서 할당해야함.
        this._createScale(); // make scale.
        this._createAxis();
        this._createSeries();
    } 

    
    set dataProvider(value: Array<any>) {
        
        if (value) { this._dataProvider = value;
        } else { this._dataProvider = this._setDefaultData(); }
    }
    

    get dataProvider() {
        return this._dataProvider;
    }



    _setDefaultData(): Array<any>{
        const testData: Array<any> = [];
        for (let i = 0; i < 20; i++){
            testData.push(
                {
                    category: 'A' + i,
                    datetime: new Date(2017, 0, i).getTime(),
                    numeric1: Math.round(Math.random()*100),
                    numeric2: Math.round(Math.random()*100)
                }
            )
        }
        return testData;
    }


    _setSize() {
        this.width = this.config.info.width - (this.config.info.margin.left + this.config.info.margin.right);
        this.height = this.config.info.height - (this.config.info.margin.top + this.config.info.margin.bottom);
    }


    _createRootSvg() {
        //select에서 넘어온 결과를 target에 담아준다.
        this.target = select('#' + this.config.info.selector).append('svg')
            .attr('width', this.config.info.width)
            .attr('height', this.config.info.height);
    }
    




    _createScale() {
        console.log(this.config);
        this.config.axis.map( (axis: ChartAxisConfigInterface) => {
            const data = this.dataProvider.map((d: any) => {
                return d[axis.field];
            });
            const scaleParam: ScaleParamInterface = {
                data: data,
                type: axis.type,
                position: axis.position,
                width: this.width,
                height: this.height
            }
            this.scales[axis.field] = new ChartScale(scaleParam);
        });
    }



    _createAxis() {

        this.axisGroupElement =  this.target
            .append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,0)');

        this.config.axis.map((axis: ChartAxisConfigInterface) => {
            const axisParam: ChartAxisParamInterface = {
                field: axis.field,
                type: axis.type,
                scale: this.scales[axis.field].scale,
                position: axis.position,
                width: this.width,
                height: this.height,
                margin: this.config.info.margin,
                displayStandard: axis.displayStandard,
                target: this.axisGroupElement
            };

            this.axis.push(new ChartAxis(axisParam))
        


        });

    }

    _createSeries() {
        this._createSeriesGroupContainer();

        this.config.series.map((series: ChartSeriesConfigInterface) => {
            const seriesParam: ChartSeriesParamInterface = {
                width: this.width,
                height: this.height,
                scaleX: this.scales[series.fieldX].scale,
                scaleY: this.scales[series.fieldY].scale,
                target: this.seriesGroupElement,
                dataProvider: this.dataProvider,
                displayStandard: series.displayStandard,
                fieldX: series.fieldX,
                fieldY: series.fieldY,
                type: series.type
            };
            let seriesTemp: any;
            if (series.type === 'column') {
                seriesTemp = new ChartColumnSeries(seriesParam);
            } else {

            }
            this.series.push(seriesTemp);
        });

    }

    _createSeriesGroupContainer() {
        
        this.seriesGroupElement =  this.target
            .append('g')
            .attr('class', 'series')
            .attr('transform', `translate(${this.config.info.margin.left}, ${this.config.info.margin.top})`);
        
    }



}