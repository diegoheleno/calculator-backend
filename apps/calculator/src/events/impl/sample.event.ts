import { Event } from '@app/bcl/event-sourcing'

export class SampleEvent extends Event {

    constructor(
        public readonly prop: string) {
            
            super('SampleEvent', 'Sample', prop)
        }
}