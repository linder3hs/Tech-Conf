import { getTicketRecord } from "@services/config";

export default function useUserSubscriber() {
  const handleIsSubscribed = async (
    event_id: string,
    user_id: string
  ): Promise<boolean> => {
    const { length } = await getTicketRecord(event_id, user_id);
    return length > 0;
  };

  return { handleIsSubscribed };
}
