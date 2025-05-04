package com.korona.service;

import com.korona.model.CovidReport;
import com.korona.repository.CovidReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Covid raporları üzerinde iş mantığı işlemlerini yöneten servis katmanı.
 */

@Service
public class CovidReportService {

    private final CovidReportRepository repository;

    @Autowired
    public CovidReportService(CovidReportRepository repository) {
        this.repository = repository;
    }

    public CovidReport save(CovidReport report) {
        return repository.save(report);
    }

    public List<CovidReport> getAllReports() {
        return repository.findAll();
    }
}