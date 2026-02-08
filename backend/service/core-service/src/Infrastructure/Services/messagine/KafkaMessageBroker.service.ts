import { IMessageBroker } from "../../../Application/Interfaces/IMessageBroker.interface";
import { Kafka, Producer } from "kafkajs"

export class KafkaMessageBroker implements IMessageBroker {
  private static instance: KafkaMessageBroker;
  private producer: Producer;
  private isConnected: boolean = false;

  private constructor() {
    const kafka = new Kafka({
      clientId: "student-nest-core",
      brokers: ["localhost:9092"],
    });
    this.producer = kafka.producer();
  }

  public static getInstance(): KafkaMessageBroker {
    if (!KafkaMessageBroker.instance) {
      KafkaMessageBroker.instance = new KafkaMessageBroker();
    }
    return KafkaMessageBroker.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.producer.connect();
        this.isConnected = true;
        console.log(" Kafka Producer Connected Successfully");
      } catch (error) {
        console.error(" Failed to connect to Kafka:", error);
        throw error;
      }
    }
  }

  public async send(topic: string, message: any): Promise<void> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      await this.producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      console.error(` Error sending message to topic ${topic}:`, error);
      throw error;
    }
  }
}
