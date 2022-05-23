export interface IMessage {
  id?: string;
  name?: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  create_at: string;
}
