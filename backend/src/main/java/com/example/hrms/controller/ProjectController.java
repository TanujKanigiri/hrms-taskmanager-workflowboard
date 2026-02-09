package com.example.hrms.controller;

import com.example.hrms.entity.Project;
import com.example.hrms.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return service.createProject(project);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return service.getAllProjects();
    }
}
