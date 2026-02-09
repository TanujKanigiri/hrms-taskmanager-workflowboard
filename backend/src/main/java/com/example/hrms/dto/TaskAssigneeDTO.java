package com.example.hrms.dto;

public class TaskAssigneeDTO {
    private Integer employeeId;
    private String employeeName;

    public TaskAssigneeDTO(Integer employeeId, String employeeName) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
    }

    public Integer getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
}
