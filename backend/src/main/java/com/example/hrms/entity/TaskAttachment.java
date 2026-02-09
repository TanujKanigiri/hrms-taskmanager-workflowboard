package com.example.hrms.entity;
 
import jakarta.persistence.*;
import java.time.LocalDateTime;
 
@Entity
@Table(name = "task_attachments")
public class TaskAttachment {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
 
    @Column(name = "task_id", nullable = false)
    private Integer taskId;
 
    @Column(name = "file_name")
    private String fileName;
 
    @Column(name = "file_path")
    private String filePath;
 
    @Column(name = "uploaded_by")
    private Integer uploadedBy;
 
    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt;
 
    @PrePersist
    void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
 
    // Getters & Setters
    public Integer getId() { return id; }
    public Integer getTaskId() { return taskId; }
    public void setTaskId(Integer taskId) { this.taskId = taskId; }
 
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
 
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
 
    public Integer getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(Integer uploadedBy) { this.uploadedBy = uploadedBy; }
 
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
 