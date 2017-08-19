import { ChartSeriesParamInterface } from './chart.config.interface';
import { line } from 'd3-shape';
// import { curveCatmullRom } from 'd3';



export class ChartLineSeries {
    config: ChartSeriesParamInterface;
    target: any;
    lineInfo: any;

    constructor(config: ChartSeriesParamInterface){
        this.config = config;
        this._createSeriesContainer(this.config.target)
        this._dataSetting();

    }

    _createSeriesContainer(prentTarget: any) {
        this.target = prentTarget.append("g").attr("class", this.config.displayStandard)
    }

    // line chart 에서는 데이터를 통째로 넣어준다.
    _dataSetting() {
        if(this.config.dataProvider){
            this._positionSetting();
        }
    }

    
    _positionSetting() {
        this.lineInfo = line()
            .x((d:any) => {
                let returnValue: number = 0;
                if(this.config.scaleX.bandWidth){
                    returnValue = (this.config.scaleX.bandWidth() / 2) + this.config.scaleX(d[this.config.fieldX]);
                } else {
                    returnValue = this.config.scaleX(d[this.config.fieldX]);
                }
                return returnValue;
            })
            .y((d: any)=>{
                return this.config.scaleY(d[this.config.fieldY]);
            });
            // .curve(curveCatmullRomm);

            this._createSingleSeries();
    }
    _createSingleSeries(){
        let lineElement: any = this.target.select(`.${this.config.displayStandard}`);
        if(!lineElement.node()){
            lineElement = this._createItem();
        } else {
            // line chart가 있다면, datum으로 데이터만 매핑하ㅐ준다.
            lineElement.datum(this.config.dataProvider); 
        }
        lineElement.attr('d', this.lineInfo);
    }

    _createItem(){
        return this.target.datum(this.config.dataProvider)
            .append('path')
            .attr('class', this.config.displayStandard)
            .style('fill', 'none')
            .style('stroke-width', 1)
            .style('stroke', 'red');
    }
}