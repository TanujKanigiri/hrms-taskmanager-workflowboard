package com.example.hrms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    private Integer id;

    private String name;
    private String email;

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
