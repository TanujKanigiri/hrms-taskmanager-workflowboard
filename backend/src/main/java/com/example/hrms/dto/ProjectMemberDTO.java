package com.example.hrms.dto;

public class ProjectMemberDTO {

    private Integer projectId;
    private Integer employeeId;
    private String employeeName;
    private String employeeEmail;
    private String role;

    public ProjectMemberDTO(
            Integer projectId,
            Integer employeeId,
            String employeeName,
            String employeeEmail,
            String role) {

        this.projectId = projectId;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
        this.role = role;
    }

    public Integer getProjectId() { return projectId; }
    public Integer getEmployeeId() { return employeeId; }
    public String getEmployeeName() { return employeeName; }
    public String getEmployeeEmail() { return employeeEmail; }
    public String getRole() { return role; }
}
