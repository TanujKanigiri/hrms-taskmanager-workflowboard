package com.example.hrms.controller;

import com.example.hrms.dto.ProjectMemberDTO;
import com.example.hrms.entity.ProjectMember;
import com.example.hrms.service.ProjectMemberService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project-members")
@CrossOrigin
public class ProjectMemberController {

    private final ProjectMemberService service;

    public ProjectMemberController(ProjectMemberService service) {
        this.service = service;
    }

    @PostMapping
    public ProjectMember addMember(@RequestBody ProjectMember member) {
        return service.addMember(member);
    }
    @GetMapping("/project/{projectId}")
    public List<ProjectMember> getMembersByProject(
            @PathVariable Integer projectId) {
        return service.getMembersByProject(projectId);
    }
    @GetMapping("/project/{projectId}/details")
    public List<ProjectMemberDTO> getMembersWithDetails(
            @PathVariable Integer projectId) {
        return service.getMembersWithDetails(projectId);
    }
    


}
