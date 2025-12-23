export interface JobQueue<JobNames = string> {
    queueName: string;
    add<T>(name: JobNames, data: T): Promise<void>;
}