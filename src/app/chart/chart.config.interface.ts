export interface ChartConfigInterface {
    info: ChartInfoConfigInterface;
    data: Array<any>;
    axis?: Array<ChartAxisConfigInterface>;
    series: Array<any>;
}


interface ChartInfoConfigInterface {
    width: number;
    height: number;
    selector?: string;

    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
}

export interface ChartAxisConfigInterface {
    field: string;
    type: string;
    position: string;
    displayStandard: string;
}


export interface ChartAxisParamInterface extends ChartAxisConfigInterface {
    width: number;
    height: number;
    margin: any;

    dataProvider?: Array<any>; // data()
    data?: any; // datum()

    scale: any;
    target: any;
}



export interface ScaleParamInterface {
    data: Array<any>; 
    type: string; // linear? numeric? character?
    position: string;
    width: number;
    height: number;
}


export interface ChartSeriesConfigInterface {
    fieldX: string;
    fieldY: string;
    type: string;
    displayStandard: string;
    textLabel?: {
        show: boolean;
        orient: string;
    }
}


export interface ChartSeriesParamInterface extends ChartSeriesConfigInterface {
    scaleX: any;
    scaleY: any;
    target: any; // ?

    dataProvider?: Array<any>; // data()
    data?: Array<any>; // datum()


    width: number;
    height: number;
}