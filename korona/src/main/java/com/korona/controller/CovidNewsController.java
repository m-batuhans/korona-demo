package com.korona.controller;

import com.korona.model.CovidReport;
import com.korona.repository.CovidReportRepository;
import com.korona.util.CovidReportParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Haber metni üzerinden Covid raporunu parse edip kaydeden controller.
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/news")
public class CovidNewsController {

    @Autowired
    private CovidReportRepository repository;

    @PostMapping
    public String parseAndSaveNews(@RequestBody String newsText) {

        Map<String, Object> parsed = CovidReportParser.parseNews(newsText);

        // Minimum gerekli alan kontrolü
        if (parsed.size() < 5) {
            return "Insufficient data could not be extracted from the news text. Date, City, case, death, recovered information should be included in the news text";
        }

        try {
            //Model nesnesi oluştur ve veritabanına kaydet
            CovidReport report = new CovidReport();
            report.setCity((String) parsed.get("city"));
            report.setDate((java.time.LocalDate) parsed.get("date"));
            report.setCaseCount((Integer) parsed.get("caseCount"));
            report.setDeathCount((Integer) parsed.get("deathCount"));
            report.setRecoveredCount((Integer) parsed.get("recoveredCount"));
            report.setOriginalText(newsText);

            repository.save(report);
            return "News successfully saved";
        } catch (Exception e) {
            return "Error saving data: " + e.getMessage();
        }
    }
}
