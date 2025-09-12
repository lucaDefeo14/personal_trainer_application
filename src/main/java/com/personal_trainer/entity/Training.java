package com.personal_trainer.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    private User user;

    @Column(name = "client_name") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String clientName;


    @Column(name = "pt_name") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String ptName;

    @Column(name = "start_date") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String  startDate;

    @Column(name = "end_date") //per i nomi camelCase ricordati di usare lo snake_case per il DB
    private String endDate;

    private String description;

    public Training() {
    }

    public Training(Long id, String title, String clientName, String ptName, String startDate, String endDate, String description) {
        this.id = id;
        this.title = title;
        this.clientName = clientName;
        this.ptName = ptName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getPtName() {
        return ptName;
    }

    public void setPtName(String ptName) {
        this.ptName = ptName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

