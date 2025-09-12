package com.personal_trainer.controller;

import com.personal_trainer.dto.UserDto;
import com.personal_trainer.entity.Training;
import com.personal_trainer.repository.TrainingRepository;
import com.personal_trainer.repository.UserRepository;
import com.personal_trainer.service.PaymentService;
import com.personal_trainer.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/user")
public class UserController {

    private final UserService userService;
    private final PaymentService paymentService;
    private final TrainingRepository trainingRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, PaymentService paymentService, TrainingRepository trainingRepository, UserRepository userRepository) {
        this.userService = userService;
        this.paymentService = paymentService;
        this.trainingRepository = trainingRepository;
        this.userRepository = userRepository;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addUser")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.addUser(userDto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/userList")
    public ResponseEntity<List<UserDto>> getAllUsers(UserDto userDto) {
        List<UserDto> user = userService.getAllUsers();
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENT')")
    @GetMapping("/readUserById/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
/*
    @PutMapping("/update/user/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDetails) {
        User user = trainingRepository.findBy(id);
        return ResponseEntity.ok(user);
    }
 */

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }
}
