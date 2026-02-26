package com.nigusbank.transaction.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.math.BigDecimal;

@FeignClient(name = "account-service")
public interface AccountServiceClient {

    @PutMapping("/accounts/{accountId}/debit")
    void debit(@PathVariable Long accountId,
               @RequestParam BigDecimal amount,
               @RequestParam String description);

    @PutMapping("/accounts/{accountId}/credit")
    void credit(@PathVariable Long accountId,
                @RequestParam BigDecimal amount,
                @RequestParam String description);
}