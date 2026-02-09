package com.example.hrms.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "task_assignees")
public class TaskAssignee {

    @EmbeddedId
    private TaskAssigneeId id;

    @Column(name = "assigned_at", updatable = false)
    private LocalDateTime assignedAt;

    public TaskAssignee() {}

    public TaskAssignee(Integer taskId, Integer employeeId) {
        this.id = new TaskAssigneeId(taskId, employeeId);
        this.assignedAt = LocalDateTime.now();
    }

    public TaskAssigneeId getId() { return id; }
}
