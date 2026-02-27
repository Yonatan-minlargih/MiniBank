"use client";

import { Sidebar } from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";
import { DebitCard } from "@/components/debit-card";
import { CardActions } from "@/components/card-actions";
import { CardTransactions } from "@/components/card-transactions";
import { useCards } from "@/hooks/useCards";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CardsPage() {
  // Hardcoded for now — later get from logged-in user (auth context)
  const accountId = 1;

  const { cards, loading, error } = useCards(accountId);

  // State for manage sheet
  const [isManageOpen, setIsManageOpen] = useState(false);

  // For testing: which card to show in main view (default first one)
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="ml-56 flex flex-1 flex-col items-center justify-center">
          <p className="text-xl text-muted-foreground">Loading your cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="ml-56 flex flex-1 flex-col items-center justify-center">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  const selectedCard = cards[selectedCardIndex];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-56 flex flex-1 flex-col">
        {/* Top Header */}
        <TopHeader />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Page Title */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">My Cards</h1>

            {/* Manage All Cards Button */}
            <button
              onClick={() => setIsManageOpen(true)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Manage All Cards &gt;
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="text-center p-10 text-muted-foreground">
              <p className="text-xl">No cards yet</p>
              <p className="mt-2">Create your first card to get started!</p>
            </div>
          ) : (
            <>
              {/* Main Card + Actions Row */}
              <div className="mb-6 flex w-full flex-col gap-4 lg:flex-row lg:items-start">
                {/* Debit Card */}
                <div className="min-w-0 lg:flex-[2]">
                  {selectedCard ? (
                    <DebitCard
                      cardNumber={selectedCard.maskedCardNumber}
                      cardHolder={selectedCard.cardHolderName}
                      expiry={selectedCard.expirationDate}
                      status={selectedCard.status}
                    />
                  ) : (
                    <p>Loading selected card...</p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="lg:flex-1">
                  <CardActions />
                </div>
              </div>

              {/* Transactions */}
              <CardTransactions />
            </>
          )}
        </main>
      </div>

      {/* Manage All Cards Sheet */}
      <Sheet open={isManageOpen} onOpenChange={setIsManageOpen}>
        <SheetContent side="right" className="w-[90%] max-w-2xl bg-background p-6">
          <SheetHeader>
            <SheetTitle className="text-foreground text-2xl mb-6">
              Manage All Cards
            </SheetTitle>
          </SheetHeader>

          {/* Card List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Cards</h3>

            {cards.length === 0 ? (
              <p className="text-muted-foreground">No cards found.</p>
            ) : (
              <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {cards.map((card: any) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-md bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-white text-xs font-bold">
                        {card.category}
                      </div>
                      <div>
                        <p className="font-medium">{card.maskedCardNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {card.cardHolderName} • {card.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        Expires {card.expirationDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create New Card Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                alert("Create new card form coming soon! (We can build this next)");
              }}
              className="w-full rounded-lg bg-primary py-3.5 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Create New Card
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
