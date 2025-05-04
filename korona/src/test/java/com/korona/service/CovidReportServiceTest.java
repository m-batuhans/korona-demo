package com.korona.service;

import com.korona.model.CovidReport;
import com.korona.repository.CovidReportRepository;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class CovidReportServiceTest {

    @Test
    void testSave() {
        CovidReportRepository mockRepo = mock(CovidReportRepository.class);
        CovidReportService service = new CovidReportService(mockRepo);

        CovidReport report = new CovidReport();

        when(mockRepo.save(report)).thenReturn(report);

        CovidReport result = service.save(report);

        assertNotNull(result);
        assertEquals(report, result);

        verify(mockRepo, times(1)).save(report);
    }

    @Test
    void testGetAllReports() {
        CovidReportRepository mockRepo = mock(CovidReportRepository.class);
        CovidReportService service = new CovidReportService(mockRepo);

        CovidReport report1 = new CovidReport();
        CovidReport report2 = new CovidReport();
        List<CovidReport> reportList = Arrays.asList(report1, report2);

        when(mockRepo.findAll()).thenReturn(reportList);

        List<CovidReport> result = service.getAllReports();

        assertEquals(2, result.size());
        assertEquals(reportList, result);
        verify(mockRepo, times(1)).findAll();
    }
}