import { ChartSeriesParamInterface } from './chart.config.interface';




export class ChartColumnSeries {
    config: ChartSeriesParamInterface;
    data: Array<any>;
    x: number;
    y: number;
    w: number;
    h: number;
    width: number;
    height: number;
    target: any;

    constructor(config: ChartSeriesParamInterface) {
        this.config = config;
        this._createSeriesContainer(this.config.target);
        this._dataSetting();
    }

    _createSeriesContainer(prentTarget: any) {
        this.target = prentTarget.append("g").attr("class", this.config.displayStandard)
    }

    _dataSetting() {
        this.config.dataProvider.map((data: any, i: number) => {
            this._positionSetting(data, i);
        });
    }


    _positionSetting(data: any, index: number ) {
        if (this.config.scaleX) {
            this.x = this.config.scaleX(data[this.config.fieldX]);
            this.w = this.config.scaleX.bandwidth();
        }
        if (this.config.scaleY) {
            this.y = this.config.scaleY(data[this.config.fieldY]);
            this.h = this.config.scaleY.range()[0] - this.y;
        }

        this._createSingleSeries(data[this.config.displayStandard], index);

        
    }

    _createSingleSeries(value: any, index: number) {
        let rectElement: any = this.target.select(`.${this.config.displayStandard + index}`);
        if (!rectElement._groups[0][0]) {
            rectElement = this._createItem(value, index);

        } else {
            rectElement.datum(value);
        }

        rectElement.attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.w)
            .attr("height", this.h);
    }
    

  _createItem(value: any, index: number) {
        return this.target.datum(value)
                                .append('rect')
                                .attr('class',this.config.displayStandard + index)
                                .attr('value',value)
                                .attr('fill','skyblue');
    }

}