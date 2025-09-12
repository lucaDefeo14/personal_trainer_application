package com.personal_trainer.service;

import com.personal_trainer.dto.UserDto;
import com.personal_trainer.entity.User;
import com.personal_trainer.enums.Role;
import com.personal_trainer.mapper.UserMapper;
import com.personal_trainer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDto addUser(UserDto userDto) {
        User user = userMapper.maptoUser(userDto);

        User saved = userRepository.save(user);

        return userMapper.maptoUserDto(saved);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::maptoUserDto)
                .toList();
        /*
        @Alessandro
         */
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
        return userMapper.maptoUserDto(user);
    }

    public void deleteUserById(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
        userRepository.deleteById(existingUser.getId());
    }

    public UserDto updateUser (Long id, UserDto userDto ) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("utente inesistente" + id));

        if(userDto.getFirstName() != null) {
            existingUser.setFirstName(userDto.getFirstName());
        }
        if(userDto.getLastName() != null) {
            existingUser.setLastName(userDto.getLastName());
        }
        if(userDto.getEmail() != null) {
            existingUser.setEmail(userDto.getEmail());
        }
        if(userDto.getCellNumber() != null) {
            existingUser.setCellNumber(userDto.getCellNumber());
        }
        if(userDto.getPassword() != null) {
            existingUser.setPassword(userDto.getPassword());
        }
        if(Stream.of(Role.ADMIN,Role.CLIENT)
                .anyMatch(role -> role == userDto.getRole())) {
            try{
                if (!userDto.getRole().equals(existingUser.getRole())){
                    existingUser.setRole(userDto.getRole());
                }
                existingUser.setRole(userDto.getRole());
            }catch (IllegalArgumentException e){
                throw new RuntimeException("Role non trovato");
            }
        }

        User updateUser = userRepository.save(existingUser);
        return userMapper.maptoUserDto(updateUser);
    }
}
