package com.korona.controller;

import com.korona.model.CovidReport;
import com.korona.service.CovidReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * CovidReport CRUD işlemlerini sağlayan REST controller.
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reports")
public class CovidReportController {

    private final CovidReportService service;

    @Autowired
    public CovidReportController(CovidReportService service) {
        this.service = service;
    }

    @PostMapping
    public CovidReport addReport(@RequestBody CovidReport report) {
        return service.save(report);
    }

    @GetMapping
    public List<CovidReport> getReports() {
        return service.getAllReports();
    }
}