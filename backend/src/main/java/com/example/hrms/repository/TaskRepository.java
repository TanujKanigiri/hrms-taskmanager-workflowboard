package com.example.hrms.repository;

import com.example.hrms.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    @Query("""
        SELECT t FROM Task t
        WHERE t.id IN (
            SELECT ta.id.taskId FROM TaskAssignee ta
            WHERE ta.id.employeeId = :employeeId
        )
    """)
    List<Task> findTasksByEmployeeId(@Param("employeeId") Integer employeeId);
}
