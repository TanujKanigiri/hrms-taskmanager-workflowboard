package com.example.hrms.service;

import com.example.hrms.entity.Project;
import com.example.hrms.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public Project createProject(Project project) {
        return repo.save(project);
    }

    public List<Project> getAllProjects() {
        return repo.findAll();
    }
}
