package com.nigusbank.transaction.implmentation;

import com.nigusbank.transaction.client.AccountServiceClient;
import com.nigusbank.transaction.dto.*;
import com.nigusbank.transaction.entity.Transaction;
import com.nigusbank.transaction.exception.TransactionException;
import com.nigusbank.transaction.repository.TransactionRepository;
import com.nigusbank.transaction.service.TransactionService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountServiceClient accountClient;

    @Override
    @Transactional
    public TransactionResponse deposit(DepositRequest request) {
        try {
            accountClient.credit(
                    request.getAccountId(),
                    request.getAmount(),
                    "Deposit" + (request.getDescription() != null ? " - " + request.getDescription() : "")
            );

            Transaction tx = Transaction.builder()
                    .accountId(request.getAccountId())
                    .amount(request.getAmount())
                    .type(Transaction.TransactionType.DEPOSIT)
                    .currency(request.getCurrency())
                    .description(request.getDescription())
                    .build();

            transactionRepository.save(tx);
            return TransactionResponse.fromEntity(tx);

        } catch (FeignException e) {
            throw new TransactionException("Failed to credit account: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public TransactionResponse withdraw(WithdrawRequest request) {
        try {
            accountClient.debit(
                    request.getAccountId(),
                    request.getAmount(),
                    "Withdrawal" + (request.getDescription() != null ? " - " + request.getDescription() : "")
            );

            Transaction tx = Transaction.builder()
                    .accountId(request.getAccountId())
                    .amount(request.getAmount().negate())
                    .type(Transaction.TransactionType.WITHDRAWAL)
                    .currency(request.getCurrency())
                    .description(request.getDescription())
                    .build();

            transactionRepository.save(tx);
            return TransactionResponse.fromEntity(tx);

        } catch (FeignException e) {
            throw new TransactionException("Failed to debit account: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public void transfer(TransferRequest request) {
        Long from = request.getFromAccountId();
        Long to = request.getToAccountId();
        String desc = request.getDescription() != null ? request.getDescription() : "Transfer";

        try {
            // 1. Debit source
            accountClient.debit(from, request.getAmount(), "Transfer to " + to + " - " + desc);
            Transaction out = Transaction.builder()
                    .accountId(from)
                    .amount(request.getAmount().negate())
                    .type(Transaction.TransactionType.TRANSFER_OUT)
                    .currency(request.getCurrency())
                    .description(desc + " → " + to)
                    .build();
            transactionRepository.save(out);

            // 2. Credit destination
            accountClient.credit(to, request.getAmount(), "Transfer from " + from + " - " + desc);
            Transaction in = Transaction.builder()
                    .accountId(to)
                    .amount(request.getAmount())
                    .type(Transaction.TransactionType.TRANSFER_IN)
                    .currency(request.getCurrency())
                    .description(desc + " ← " + from)
                    .build();
            transactionRepository.save(in);

        } catch (Exception e) {
            // Spring rolls back everything (both account changes + inserted transactions)
            throw new TransactionException("Transfer failed and was rolled back: " + e.getMessage(), e);
        }
    }

    @Override
    public List<TransactionResponse> getHistory(Long accountId) {
        return transactionRepository.findByAccountId(accountId)
                .stream()
                .map(TransactionResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
