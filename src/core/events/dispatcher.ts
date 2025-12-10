import { DomainEvent } from "./domain-event";

type EventHandler = (event: DomainEvent) => Promise<void>;

export class DomainEventDispatcher {
    private handlers: Map<string, EventHandler[]> = new Map();

    public register(eventName: string, handler: EventHandler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)?.push(handler);
    }

    public async dispatch(event: DomainEvent) {
        const handlers = this.handlers.get(event.eventName);
        if (handlers) {
            for (const handler of handlers) {
                await handler(event);
            }
        }
    }
}