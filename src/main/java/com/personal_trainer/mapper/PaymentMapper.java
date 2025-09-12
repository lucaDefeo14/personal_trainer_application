package com.personal_trainer.mapper;

import com.personal_trainer.dto.PaymentDto;
import com.personal_trainer.entity.Payment;
import com.personal_trainer.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    private final UserRepository userRepository;

    public PaymentMapper(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public PaymentDto toPaymentDto(Payment payment){

        if (payment==null) return null;
        return new PaymentDto(
                payment.getId(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getMethod(),
                payment.getStatus(),
                payment.getUser().getId()
        );
    }

    public Payment toPayment(PaymentDto paymentDto){
        if (paymentDto==null) return null;

        Payment payment = new Payment();
        payment.setId(paymentDto.getId());
        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentDate(paymentDto.getPaymentDate());
        payment.setMethod(paymentDto.getMethod());
        payment.setStatus(paymentDto.getStatus());
        payment.setUser(userRepository.findById(paymentDto.getUser()).orElseThrow(
                () -> new RuntimeException("Nessuno utente trovato con id: " + paymentDto.getUser())
        ));

        return payment;
    }
}
