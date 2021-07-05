import { SampleEvent } from '../impl/sample.event';
import { IEventHandler, EventsHandler, EventPublisher } from "@nestjs/cqrs";

@EventsHandler(SampleEvent)
export class SampleHandler implements IEventHandler{

    constructor( ){}

    async handle(event: SampleEvent) {

    }
}