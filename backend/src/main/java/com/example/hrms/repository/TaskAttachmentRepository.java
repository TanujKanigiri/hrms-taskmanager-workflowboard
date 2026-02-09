package com.example.hrms.repository;
 
import com.example.hrms.entity.TaskAttachment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
public interface TaskAttachmentRepository extends JpaRepository<TaskAttachment, Integer> {
    List<TaskAttachment> findByTaskId(Integer taskId);
}

