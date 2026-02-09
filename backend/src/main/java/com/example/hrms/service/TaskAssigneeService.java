package com.example.hrms.service;

import com.example.hrms.dto.TaskAssigneeDTO;
import com.example.hrms.entity.Task;
import com.example.hrms.entity.TaskAssignee;
import com.example.hrms.repository.ProjectMemberRepository;
import com.example.hrms.repository.TaskAssigneeRepository;
import com.example.hrms.repository.TaskRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TaskAssigneeService {

    private final TaskAssigneeRepository assigneeRepo;
    private final TaskRepository taskRepo;
    private final ProjectMemberRepository memberRepo;

    public TaskAssigneeService(
            TaskAssigneeRepository assigneeRepo,
            TaskRepository taskRepo,
            ProjectMemberRepository memberRepo
    ) {
        this.assigneeRepo = assigneeRepo;
        this.taskRepo = taskRepo;
        this.memberRepo = memberRepo;
    }

    public TaskAssignee assignTask(Integer taskId, Integer employeeId) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        boolean isMember = memberRepo
                .existsById_ProjectIdAndId_EmployeeId(
                        task.getProjectId(),
                        employeeId
                );

        if (!isMember) {
            throw new RuntimeException("Employee not part of project");
        }

        return assigneeRepo.save(new TaskAssignee(taskId, employeeId));
    }

    public List<TaskAssignee> getAssigneesByTaskId(Integer taskId) {
        return assigneeRepo.findById_TaskId(taskId);
    }
    public List<TaskAssignee> getAllAssignees() {
        return assigneeRepo.findAll();
    }

    public List<TaskAssigneeDTO> getAssigneesWithNames(Integer taskId) {
        return assigneeRepo.findAssigneesWithNames(taskId);
    }

}
