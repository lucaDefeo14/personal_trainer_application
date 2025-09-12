package com.personal_trainer.entity;

import com.personal_trainer.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String firstName;

    @Column(name = "last_name") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String lastName;

    private String email;

    @Column(name = "cel_number") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String cellNumber;

    private String password;

   @Enumerated(EnumType.STRING)
   private Role role;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String email, String cellNumber, String password, Role role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.cellNumber = cellNumber;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellNumber() {
        return cellNumber;
    }

    public void setCellNumber(String cellNumber) {
        this.cellNumber = cellNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
