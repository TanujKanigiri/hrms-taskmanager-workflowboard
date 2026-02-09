package com.example.hrms.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_members")
public class ProjectMember {

    @EmbeddedId
    private ProjectMemberId id;

    private String role;

    @Column(name = "joined_at", updatable = false)
    private LocalDateTime joinedAt;

    public ProjectMember() {}

    public ProjectMember(Integer projectId, Integer employeeId, String role) {
        this.id = new ProjectMemberId(projectId, employeeId);
        this.role = role;
    }

    @PrePersist
    void onCreate() {
        joinedAt = LocalDateTime.now();
    }

    public ProjectMemberId getId() { return id; }
    public String getRole() { return role; }
}
