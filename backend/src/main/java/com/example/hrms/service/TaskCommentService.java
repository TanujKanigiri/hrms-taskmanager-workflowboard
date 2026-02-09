package com.example.hrms.service;
 
import com.example.hrms.entity.TaskComment;
import com.example.hrms.repository.TaskCommentRepository;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
 
@Service
public class TaskCommentService {

    private final TaskCommentRepository repo;

    public TaskCommentService(TaskCommentRepository repo) {
        this.repo = repo;
    }

    public TaskComment addComment(TaskComment comment) {
        return repo.save(comment);
    }

    public List<TaskComment> getCommentsByTaskId(Integer taskId) {
        return repo.findByTaskId(taskId);
    }
}

 