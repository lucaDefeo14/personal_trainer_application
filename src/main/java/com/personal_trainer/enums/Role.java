package com.personal_trainer.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN("Personal Trainer"),
    CLIENT("Client");

    private final String description;

    Role(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static Role fromDescription(String description) {
        for (Role role : Role.values()) {
            if (role.description.equalsIgnoreCase(description)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Ruolo sconosciuto: " + description);
    }
}

