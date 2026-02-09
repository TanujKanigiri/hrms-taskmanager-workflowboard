package com.example.hrms.repository;

import com.example.hrms.dto.TaskAssigneeDTO;
import com.example.hrms.entity.TaskAssignee;
import com.example.hrms.entity.TaskAssigneeId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface TaskAssigneeRepository
        extends JpaRepository<TaskAssignee, TaskAssigneeId> {

    List<TaskAssignee> findById_TaskId(Integer taskId);

    @Query("""
    SELECT new com.example.hrms.dto.TaskAssigneeDTO(
        ta.id.employeeId, e.name
    )
    FROM TaskAssignee ta
    JOIN Employee e ON ta.id.employeeId = e.id
    WHERE ta.id.taskId = :taskId
    """)
    List<TaskAssigneeDTO> findAssigneesWithNames(@Param("taskId") Integer taskId);
}
