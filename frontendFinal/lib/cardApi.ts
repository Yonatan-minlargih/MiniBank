// lib/cardApi.ts
const API_BASE = "http://localhost:8084";

export const cardApi = {
  // 1. Get all cards for one account
  getCards: async (accountId: number) => {
    const res = await fetch(`${API_BASE}/cards/account/${accountId}`);
    if (!res.ok) throw new Error("Failed to fetch cards");
    return res.json();
  },

  // 2. Create a new card
  createCard: async (data: any) => {
    const res = await fetch(`${API_BASE}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create card");
    return res.json();
  },

  // 3. Freeze card
  freezeCard: async (cardId: number) => {
    const res = await fetch(`${API_BASE}/cards/freeze/${cardId}`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to freeze card");
    return res.ok;
  },

  // 4. Block card
  blockCard: async (cardId: number) => {
    const res = await fetch(`${API_BASE}/cards/block/${cardId}`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to block card");
    return res.ok;
  },

  // 5. Change PIN
  changePin: async (cardId: number, newPin: string) => {
    const res = await fetch(`${API_BASE}/cards/pin`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId, newPin }),
    });
    if (!res.ok) throw new Error("Failed to change PIN");
    return res.ok;
  },

  // 6. Update spending limit
  setLimit: async (cardId: number, spendingLimit: number) => {
    const res = await fetch(`${API_BASE}/cards/limit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId, spendingLimit }),
    });
    if (!res.ok) throw new Error("Failed to update limit");
    return res.ok;
  },
};