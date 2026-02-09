package com.example.hrms.controller;

import com.example.hrms.entity.TaskAttachment;
import com.example.hrms.service.TaskAttachmentService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/task-attachments")
@CrossOrigin
public class TaskAttachmentController {

    private final TaskAttachmentService service;

    public TaskAttachmentController(TaskAttachmentService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TaskAttachment> upload(
            @RequestParam("taskId") Integer taskId,
            @RequestParam("file") MultipartFile file
    ) {
        return ResponseEntity.ok(service.upload(taskId, file));
    }

    @GetMapping("/{taskId}")
    public List<TaskAttachment> getByTask(@PathVariable Integer taskId) {
        return service.getAttachmentsByTaskId(taskId);
    }
}
