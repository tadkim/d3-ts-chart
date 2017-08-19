import { ScaleParamInterface } from './chart.config.interface';
import { scaleBand, scaleLinear } from 'd3-scale';
import { min, max } from 'd3';

import { extent } from 'd3';


export class ChartScale {

    domain: Array<any> = []; // 어떤 데이터가 들어올지 모르니까 any.
    range: Array<number> = [];
    scale: any; // d3 scale 계산 결과를 가지고 있는 변수.
    config: ScaleParamInterface;

    constructor(config: ScaleParamInterface) {
        this.config = config;
        this._setRange();
        this._generateScale();
    }

    _setRange() {
        if (this.config.position.includes('x')) {
            this.range.push(0);
            this.range.push(this.config.width);
        } else {
            // 높이를 정하는 부분이다. 데카르트좌표체계와는 반대
            this.range.push(this.config.height);
            this.range.push(0);
        }
    }



    _generateScale() {
        // 여기서 numeric, category는 custom variable name.
        if (this.config.type === 'numeric') {

            const minData = min(this.config.data);
            const maxData = max(this.config.data);

            this.domain.push(minData);
            this.domain.push(maxData);
            this.scale = scaleLinear()
                .domain(this.domain)
                .range([this.range[0], this.range[1]])
                .nice();
            
        } else if (this.config.type === 'category') {
            this.scale = scaleBand()
                .domain(this.config.data)
                .range([this.range[0], this.range[1]])
                .padding(.2);
        } else {

        }
    }





}