package com.nigusbank.transaction.dto;

import com.nigusbank.transaction.entity.Transaction;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {

    private Long id;

    private Long accountId;

    private BigDecimal amount;          // positive for deposit/incoming, negative for withdrawal/outgoing

    private String type;                // DEPOSIT, WITHDRAWAL, TRANSFER_OUT, TRANSFER_IN

    private String currency;

    private String description;

    private LocalDateTime createdAt;

    // Optional - useful for frontend display
    private String formattedAmount;     // e.g. "ETB 1,250.00" or "-ETB 500.00"

    // Constructor mapping from entity (you can call this in service)
    public static TransactionResponse fromEntity(Transaction transaction) {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .accountId(transaction.getAccountId())
                .amount(transaction.getAmount())
                .type(transaction.getType().name())
                .currency(transaction.getCurrency())
                .description(transaction.getDescription())
                .createdAt(transaction.getCreatedAt())
                .formattedAmount(formatAmount(transaction.getAmount(), transaction.getCurrency()))
                .build();
    }

    private static String formatAmount(BigDecimal amount, String currency) {
        // Very simple formatting — in real app use NumberFormat or DecimalFormat
        String sign = amount.compareTo(BigDecimal.ZERO) >= 0 ? "" : "-";
        return sign + currency + " " + amount.abs().toPlainString();
    }
}