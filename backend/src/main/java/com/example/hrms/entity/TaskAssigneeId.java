package com.example.hrms.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TaskAssigneeId implements Serializable {

    private Integer taskId;
    private Integer employeeId;

    public TaskAssigneeId() {}

    public TaskAssigneeId(Integer taskId, Integer employeeId) {
        this.taskId = taskId;
        this.employeeId = employeeId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TaskAssigneeId)) return false;
        TaskAssigneeId that = (TaskAssigneeId) o;
        return Objects.equals(taskId, that.taskId) &&
               Objects.equals(employeeId, that.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId, employeeId);
    }
}
