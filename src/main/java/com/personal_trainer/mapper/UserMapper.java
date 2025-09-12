package com.personal_trainer.mapper;

import com.personal_trainer.dto.UserDto;
import com.personal_trainer.entity.User;
import com.personal_trainer.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final UserRepository userRepository;

    public UserMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto maptoUserDto(User user) {
        if( user == null )  return null;
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getCellNumber(),
                user.getPassword(),
                user.getRole()
        );
    }
    public User maptoUser(UserDto userDto ) {
        if( userDto == null )  return null;

        User user = new User();
        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setCellNumber(userDto.getCellNumber());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        return user;
    }
}
