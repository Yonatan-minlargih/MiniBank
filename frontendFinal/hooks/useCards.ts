// hooks/useCards.ts
import { useState, useEffect } from "react";
import { cardApi } from "@/lib/cardApi";   // ← this line must match your file path

export function useCards(accountId: number) {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        setError(null);
        const data = await cardApi.getCards(accountId);
        setCards(data);
      } catch (err: any) {
        setError(err.message || "Failed to load cards");
      } finally {
        setLoading(false);
      }
    }

    if (accountId) {   // only fetch if accountId exists
      fetchCards();
    }
  }, [accountId]);

  return { cards, loading, error };
}