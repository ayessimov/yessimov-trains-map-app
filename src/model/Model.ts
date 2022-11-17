export interface ITrainData {
    name: string,
    seria: string,
    sectionsCount: number,
    coord: [number, number],
    id: any
}

export interface ITrains {
    data: ITrainData[]
}