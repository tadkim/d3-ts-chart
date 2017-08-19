import { ChartAxisParamInterface } from './chart.config.interface';
import { axisTop, axisBottom, axisLeft, axisRight } from 'd3';

export class ChartAxis {
    config: ChartAxisParamInterface;
    target: any;
    axe: any;


    constructor(config: ChartAxisParamInterface) {
        this.config = config;
        this._createAxisContainer(this.config.target);
        this._createAxis();    
        this._makeAxisLabel();
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
        } else {

        }
        console.log(positionY);
        this.target.attr('transform', `translate(${positionX}, ${positionY})`);
    }

    _makeAxisLabel() {
        this.target.call(this.axe);
    }
}
