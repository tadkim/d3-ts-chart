import { ChartSeriesParamInterface } from './chart.config.interface';
import { extent } from 'd3';

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
            const min: number = this.config.scaleY.domain()[0];
            const max: number = this.config.scaleY.domain()[1];
            const value: number = data[this.config.fieldY];

            // console.log(min);
            // console.log(data);
            // console.log(extent(data));

            if(min < 0){
                if(value < 0){
                    this.y = this.config.scaleY(0);
                    this.h = this.config.scaleY(0) - this.config.scaleY(-1*value);
                } else {
                    this.y = this.config.scaleY(value);
                    this.h = this.config.scaleY(0) - this.config.scaleY(value);
                }

            } else {
                this.y = this.config.scaleY(data[this.config.fieldY]);
                this.h = this.config.scaleY.range()[0] - this.y;

            }


            
        }

        this._createSingleSeries(data[this.config.displayStandard], index);

        
    }

    _createSingleSeries(value: any, index: number) {
        //rect 만든 부분
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


        const labelInfo = {
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h,
            value: value
        };

        // interface에 show가 있을 때만 label을 호출
        if(this.config.textLabel.show){
            this._createLabel(this.config.textLabel.orient, labelInfo, rectElement);
        }
        
    }
    

    _createItem(value: any, index: number) {
        return this.target.datum(value)
                                .append('rect')
                                .attr('class',this.config.displayStandard + index)
                                .attr('value',value)
                                .attr('fill','skyblue');
    }


    _createLabel(orient: string, labelInfo: any, rect: any){
        let textLabel: any = this.target
            .select(`.${rect.attr('class')}label`);

        // 노드의 groups의 [0][0]을 가져오라는 api (비었는지 체크)
        if(!textLabel.node()){
            textLabel = this.target.append('text')
                .text(labelInfo.value)
                .attr('fill', 'black')
                .attr('class',`${rect.attr('class')}label`);
        }

        const labelWidth: number = textLabel.node().getBoundingClientRect().width;

        if(orient === 'top'){
            const x: number = labelInfo.x + (labelInfo.width/2) - (labelWidth/2);
            const y: number = labelInfo.y - 3;
            
            textLabel
                .attr('x', x)
                .attr('y', y);
        }

    }

}