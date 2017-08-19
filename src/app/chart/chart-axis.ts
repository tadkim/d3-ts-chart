import { ChartAxisParamInterface } from './chart.config.interface';
import { axisTop, axisBottom, axisLeft, axisRight } from 'd3';

import { min } from 'd3-array';
import { select } from 'd3-selection';


export class ChartAxis {
    config: ChartAxisParamInterface;
    target: any;
    axe: any;
    _zeroElement;


    constructor(config: ChartAxisParamInterface) {
        this.config = config;
        this._createAxisContainer(this.config.target);
        this._createAxis();    
        this._makeAxisLabel();

        if(this.config.type === 'numeric'){
            this._makeZeroLine();
        }
    }

    _createAxisContainer(parentTarget: any) {
        this.target = parentTarget.append('g')
            .attr('class', `${this.config.displayStandard} ${this.config.position}`);
    }
    
    _createAxis() {
        let positionX = 0;
        let positionY = 0;

        if (this.config.position.includes('b')) {
            this.axe = axisBottom(this.config.scale);
            positionX = this.config.margin.left;
            positionY = this.config.height + this.config.margin.top;

        } else if (this.config.position.includes('l')) {

            this.axe = axisLeft(this.config.scale);
            positionX = this.config.margin.left;
            positionY = this.config.margin.top;
        } else if(this.config.position.includes('r')){
            // 우측 vertical
            this.axe = axisRight(this.config.scale);
            positionX = this.config.margin.left + this.config.width;
            positionY = this.config.margin.top;
        } else {
            // 상단 horizontal
            this.axe = axisTop(this.config.scale);
            positionX = this.config.margin.left;
            positionY = this.config.margin.top;
        }
        
        this.target.attr('transform', `translate(${positionX}, ${positionY})`);
    }

    _makeAxisLabel() {
        this.target.call(this.axe);
    }

    _makeZeroLine(){
        const minValue:number = +min(this.config.dataProvider);
        if(minValue < 0){
            if(!this._zeroElement){
                // root element를 잡는 방법 예시
                // const rootSvg: any = select(this.config.target.node());
                const rootSvg: any = select(this.config.target.node().nearestViewportElement);
                
                this._zeroElement = rootSvg.append('g').attr('class', 'zero');
                const line = this._zeroElement.select('line');
            }
            
            this._zeroElement
                .attr('transform', `translate(${this.config.margin.left}, ${this.config.scale(0) + this.config.margin.top})`);
                
            const line = this._zeroElement.select('line');

            if(this.config.position.includes('y')){
                line.attr('x1', 0)
                    .attr('y1', 0)
                    .attr('x2', this.config.width)
                    .attr('y2', this.config.height)
                    .attr('stroke-width', 1)
                    .attr('stroke', 'black');
            }
        }
    }


}
