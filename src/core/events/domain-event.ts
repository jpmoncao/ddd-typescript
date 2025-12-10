export interface DomainEvent {
    occurredAt: Date;
    eventName: string;
    payload: any;
}