package com.korona.repository;

import com.korona.model.CovidReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CovidReportRepository extends MongoRepository<CovidReport, String> {
}
