import type { APIRequestContext } from '@playwright/test'

type Address = { Name: string; Address: string }

type MessageSummary = { ID: string; ReplyTo: Address[] }

export type DeliveredMessage = { replyTo: string[]; text: string }

export class Mailbox {
  constructor(private readonly api: APIRequestContext) {}

  async messagesFrom(name: string): Promise<DeliveredMessage[]> {
    const response = await this.api.get('/api/v1/search', {
      params: { query: `subject:"New message from ${name}"` },
    })
    const { messages } = (await response.json()) as {
      messages: MessageSummary[]
    }

    return Promise.all(messages.map((message) => this.read(message)))
  }

  async close() {
    await this.api.dispose()
  }

  private async read(message: MessageSummary): Promise<DeliveredMessage> {
    const response = await this.api.get(`/api/v1/message/${message.ID}`)
    const { Text } = (await response.json()) as { Text: string }

    return {
      replyTo: message.ReplyTo.map((address) => address.Address),
      text: Text,
    }
  }
}
