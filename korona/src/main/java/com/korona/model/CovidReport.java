package com.korona.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "covid_reports")
public class CovidReport {

    @Id
    private String id;
    private String city;
    private LocalDate date;
    private Integer caseCount;
    private Integer deathCount;
    private Integer recoveredCount;
    private String originalText;

    //  Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer  getCaseCount() { return caseCount; }
    public void setCaseCount(int caseCount) { this.caseCount = caseCount; }

    public Integer  getDeathCount() { return deathCount; }
    public void setDeathCount(int deathCount) { this.deathCount = deathCount; }

    public Integer  getRecoveredCount() { return recoveredCount; }
    public void setRecoveredCount(int recoveredCount) { this.recoveredCount = recoveredCount; }

    public String getOriginalText() { return originalText; }
    public void setOriginalText(String originalText) { this.originalText = originalText; }
}
