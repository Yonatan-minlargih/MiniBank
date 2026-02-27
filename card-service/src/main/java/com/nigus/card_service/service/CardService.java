package com.nigus.card_service.service;

import com.nigus.card_service.client.AccountClient;
import com.nigus.card_service.dto.*;
import com.nigus.card_service.entity.*;
import com.nigus.card_service.repository.CardRepository;
import com.nigus.card_service.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import com.nigus.card_service.exception.CardNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final AccountClient accountClient;  // ← add this field

    // 🔥 Create card (MOST IMPORTANT METHOD)
    public CardResponse createCard(CardCreateRequest request) {

        // Check if the current logged-in user owns this account
        checkAccountOwnership(request.getAccountId());

        String rawNumber = CardNumberGenerator.generate();

        Card card = Card.builder()
                .accountId(request.getAccountId())
                .cardHolderName(request.getCardHolderName())
                .category(request.getCategory())
                .cardNumberHash(HashUtil.hash(rawNumber))
                .maskedCardNumber(MaskUtil.maskCardNumber(rawNumber))
                .cvvHash(HashUtil.hash(request.getCvv()))
                .pinHash(HashUtil.hash(request.getPin()))
                .status(CardStatus.ACTIVE)
                .expirationDate(LocalDate.now().plusYears(3))
                .spendingLimit(request.getSpendingLimit())
                .createdAt(LocalDateTime.now())
                .build();

        Card saved = cardRepository.save(card);

        return mapToResponse(saved);
    }

    public List<CardResponse> getCards(Long accountId) {
        // Optional: protect list too (uncomment if you want strict ownership)
        // checkAccountOwnership(accountId);
        checkAccountOwnership(accountId);
        return cardRepository.findByAccountId(accountId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void freeze(Long cardId) {
        Card card = get(cardId);

        // Check ownership before allowing freeze
        checkAccountOwnership(card.getAccountId());

        card.setStatus(CardStatus.FROZEN);
        cardRepository.save(card);
    }

    public void block(Long cardId) {
        Card card = get(cardId);

        // Check ownership before allowing block
        checkAccountOwnership(card.getAccountId());

        card.setStatus(CardStatus.BLOCKED);
        cardRepository.save(card);
    }

    public void changePin(ChangePinRequest request) {
        Card card = get(request.getCardId());

        // Check ownership before allowing PIN change
        checkAccountOwnership(card.getAccountId());

        card.setPinHash(HashUtil.hash(request.getNewPin()));
        cardRepository.save(card);
    }

    public void setLimit(SpendingLimitRequest request) {
        Card card = get(request.getCardId());

        // Check ownership before allowing limit change
        checkAccountOwnership(card.getAccountId());

        card.setSpendingLimit(request.getSpendingLimit());
        cardRepository.save(card);
    }

    // Helper method: get the current user's ID from JWT token
    private String getCurrentUserId() {
       /* var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof Jwt jwt) {
            return jwt.getSubject();
        }

        throw new IllegalStateException("Principal is not a JWT");*/
        return "test-user-123";
    }

    // Helper method: check if current user owns this account
    private void checkAccountOwnership(Long accountId) {
        String userIdFromToken = getCurrentUserId();

        // === FAKE CHECK FOR NOW (replace later with real call) ===
        // For testing: pretend accountId must match userId (as string)
        // In real app: call account-service via Feign: "does account X belong to user Y?"
        boolean isOwner = true;//accountClient.doesAccountBelongToUser(accountId, userIdFromToken);

        if (!isOwner) {
            throw new AccessDeniedException("This account does not belong to you");
        }
    }

    private Card get(Long id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new CardNotFoundException(id));
    }

    private CardResponse mapToResponse(Card card) {
        return CardResponse.builder()
                .id(card.getId())
                .accountId(card.getAccountId())
                .maskedCardNumber(card.getMaskedCardNumber())
                .cardHolderName(card.getCardHolderName())
                .status(card.getStatus().name())
                .category(card.getCategory())
                .expirationDate(card.getExpirationDate())
                .spendingLimit(card.getSpendingLimit())
                .build();
    }
}