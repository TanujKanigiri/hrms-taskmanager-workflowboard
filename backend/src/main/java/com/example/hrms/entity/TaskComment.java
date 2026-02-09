package com.example.hrms.entity;
 
import jakarta.persistence.*;
import java.time.LocalDateTime;
 
@Entity
@Table(name = "task_comments")
public class TaskComment {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
 
    @Column(name = "task_id", nullable = false)
    private Integer taskId;
 
    @Column(name = "user_id", nullable = false)
    private Integer userId;
 
    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;
 
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
 
    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
 
    public Integer getId() { return id; }
 
    public Integer getTaskId() { return taskId; }
    public void setTaskId(Integer taskId) { this.taskId = taskId; }
 
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
 
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
 
    public LocalDateTime getCreatedAt() { return createdAt; }
}                                                                     
 