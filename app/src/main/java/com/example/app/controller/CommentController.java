package com.example.app.controller;

import com.example.app.enity.CommentEntity;
import com.example.app.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    final private CommentService commentService;

    @PostMapping("/create")
    public void create(@RequestBody CommentEntity comment) {
        commentService.save(comment);
    }

    @GetMapping("/all")
    public List<CommentEntity> getAll() {
        return commentService.findAll();
    }

    @GetMapping("/{id}")
    public CommentEntity getById(@PathVariable Long id) {
        return commentService.findById(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        commentService.deleteById(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody CommentEntity comment) {
        commentService.update(comment);
    }
}
