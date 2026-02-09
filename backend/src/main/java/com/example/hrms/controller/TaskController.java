package com.example.hrms.controller;

import com.example.hrms.entity.Task;
import com.example.hrms.entity.TaskStatus;
import com.example.hrms.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Integer id) {
        return service.getTaskById(id);
    }

    @GetMapping("/my-tasks/{employeeId}")
    public List<Task> getMyTasks(@PathVariable Integer employeeId) {
        return service.getMyTasks(employeeId);
    }

    
    @PutMapping("/{id}/status")
    public Task updateTaskStatus(
        @PathVariable Integer id,
        @RequestBody Map<String, String> body
    ) {
        TaskStatus status = TaskStatus.valueOf(body.get("status"));
        return service.updateTaskStatus(id, status);
    }

    
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Integer id,
            @RequestBody Task updatedTask
    ) {
        return service.updateTask(id, updatedTask);
    }


}
