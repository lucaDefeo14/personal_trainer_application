package com.personal_trainer.service;

import com.personal_trainer.dto.PaymentDto;
import com.personal_trainer.entity.Payment;
import com.personal_trainer.mapper.PaymentMapper;
import com.personal_trainer.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
    }

    public PaymentDto addPayment(PaymentDto paymentDto) {
        Payment payment = paymentMapper.toPayment(paymentDto);

        Payment saved = paymentRepository.save(payment);

        return paymentMapper.toPaymentDto(saved);
    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toPaymentDto)
                .toList();
    }

    public PaymentDto getPaymentById(Long id) {
        return paymentMapper.toPaymentDto(paymentRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Nessun pagamento presente con questo id: " + id)
        ));
    }


}
