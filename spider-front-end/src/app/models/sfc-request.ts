import { FlowEntry } from "./flow_entry";
import { Vnf } from "./vnf";

export interface SfcRequest{
    _id: number;
    name: string;
    source: string;
    destination: string;
    VNFs: Vnf[];
    flow_entries: FlowEntry[];
    requirements: {availability: number}
}