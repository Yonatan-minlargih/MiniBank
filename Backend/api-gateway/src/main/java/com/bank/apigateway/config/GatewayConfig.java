@Bean
public KeyResolver userKeyResolver() {
    return exchange -> Mono.just(
            exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()  // IP-based
    );
}