export interface FlowEntry{
    source: string;
    destination: string;
    resources: {bandwidth: number, cost: number}
}