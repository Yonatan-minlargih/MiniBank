package com.nigusbank.transaction;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.nigusbank.transaction.client")
@EnableDiscoveryClient
public class TransactionApplication {

    public static void main(String[] args) {
        SpringApplication.run(TransactionApplication.class, args);
    }

}
