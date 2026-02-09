package com.example.hrms.service;

import com.example.hrms.dto.ProjectMemberDTO;
import com.example.hrms.entity.ProjectMember;
import com.example.hrms.repository.ProjectMemberRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProjectMemberService {

    private final ProjectMemberRepository repo;

    public ProjectMemberService(ProjectMemberRepository repo) {
        this.repo = repo;
    }

    public ProjectMember addMember(ProjectMember member) {

        Integer projectId = member.getId().getProjectId();
        Integer employeeId = member.getId().getEmployeeId();

        if (repo.existsById_ProjectIdAndId_EmployeeId(projectId, employeeId)) {
            throw new RuntimeException("Employee already exists in project");
        }

        return repo.save(member);
    }
    public List<ProjectMember> getMembersByProject(Integer projectId) {
        return repo.findById_ProjectId(projectId);
    }
    public List<ProjectMemberDTO> getMembersWithDetails(Integer projectId) {

        List<Object[]> rows =
                repo.findMembersWithEmployeeDetails(projectId);

        return rows.stream()
                .map(r -> new ProjectMemberDTO(
                        ((Number) r[0]).intValue(),
                        ((Number) r[1]).intValue(),
                        (String) r[2],
                        (String) r[3],
                        (String) r[4]
                ))
                .toList();
    }

}
