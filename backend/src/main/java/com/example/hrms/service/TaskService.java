package com.example.hrms.service;

import com.example.hrms.entity.Task;
import com.example.hrms.entity.TaskStatus;
import com.example.hrms.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        if (task.getProjectId() == null) {
            throw new RuntimeException("Task must belong to a project");
        }
        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Integer taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Integer taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> getMyTasks(Integer employeeId) {
        return taskRepository.findTasksByEmployeeId(employeeId);
    }
    
    public Task updateTask(Integer id, Task updated) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setPriority(updated.getPriority());
        existing.setStatus(updated.getStatus());
        existing.setDueDate(updated.getDueDate());

        return taskRepository.save(existing);
    }

}
