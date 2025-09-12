package com.personal_trainer.dto;

import com.personal_trainer.entity.User;


import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentDto {


    private Long id;

    private BigDecimal amount;
    private String paymentDate;
    private String method;
    private String status;
    private Long user;

    public PaymentDto() {
    }

    public PaymentDto(Long id, BigDecimal amount, String paymentDate, String method, String status, Long user) {
        this.id = id;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.method = method;
        this.status = status;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }
}
