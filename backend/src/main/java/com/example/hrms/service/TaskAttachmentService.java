package com.example.hrms.service;
 
import com.example.hrms.entity.TaskAttachment;
import com.example.hrms.repository.TaskAttachmentRepository;

import java.io.File;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
 
@Service
public class TaskAttachmentService {

    private final TaskAttachmentRepository repo;

    private final String BASE_DIR = "uploads/tasks/";

    public TaskAttachmentService(TaskAttachmentRepository repo) {
        this.repo = repo;
    }

    public TaskAttachment upload(Integer taskId, MultipartFile file) {
        try {
            File dir = new File(BASE_DIR + taskId);
            if (!dir.exists()) dir.mkdirs();

            String filePath = dir.getAbsolutePath() + "/" + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            TaskAttachment ta = new TaskAttachment();
            ta.setTaskId(taskId);
            ta.setFileName(file.getOriginalFilename());
            ta.setFilePath(filePath);
            ta.setUploadedBy(1); 

            return repo.save(ta);
        } catch (Exception e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    public List<TaskAttachment> getAttachmentsByTaskId(Integer taskId) {
        return repo.findByTaskId(taskId);
    }
}
