package com.example.hrms.repository;

import com.example.hrms.entity.ProjectMember;
import com.example.hrms.entity.ProjectMemberId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectMemberRepository
        extends JpaRepository<ProjectMember, ProjectMemberId> {

    boolean existsById_ProjectIdAndId_EmployeeId(
            Integer projectId,
            Integer employeeId
    );
    List<ProjectMember> findById_ProjectId(Integer projectId);
    @Query(value = """
    	    SELECT 
    	        pm.project_id,
    	        pm.employee_id,
    	        e.name,
    	        e.email,
    	        pm.role
    	    FROM project_members pm
    	    JOIN employees e ON pm.employee_id = e.id
    	    WHERE pm.project_id = :projectId
    	""", nativeQuery = true)
    	List<Object[]> findMembersWithEmployeeDetails(Integer projectId);

}
