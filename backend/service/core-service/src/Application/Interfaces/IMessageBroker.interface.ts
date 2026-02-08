export interface IMessageBroker {
  connect(): Promise<void>;
  send(topic: string, message: any): Promise<void>;
}
