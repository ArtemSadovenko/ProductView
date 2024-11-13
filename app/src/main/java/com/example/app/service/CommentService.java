package com.example.app.service;

import com.example.app.Repos.CommentRepository;
import com.example.app.enity.CommentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentService {
    final private CommentRepository commentRepository;

    public void save(CommentEntity comment) {
        commentRepository.save(comment);
    }
    public List<CommentEntity> findAll() {
        return commentRepository.findAll();
    }

    public CommentEntity findById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }
    public void update(CommentEntity comment) {
        commentRepository.save(comment);
    }
}
