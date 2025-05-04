package com.korona.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Objects;

class CovidReportParserTest {

    @Test
    void testParseNews_basicCase() {
        String sample = "Ankara'da 19.04.2020 tarihinde 25 yeni vaka tespit edildi. 3 kişi hayatını kaybetti. 10 kişi iyileşti.";
        Map<String, Object> result = CovidReportParser.parseNews(sample);
        assertEquals("Ankara", result.get("city"));
        assertEquals(LocalDate.of(2020, 4, 19), result.get("date"));
        assertEquals(25, result.get("caseCount"));
        assertEquals(3, result.get("deathCount"));
        assertEquals(10, result.get("recoveredCount"));
    }

    @Test
    void testParseNews_otherDateFormat() {
        String sample = "İzmir'de 19/05/2021 günü 50 pozitif vaka açıklandı. 5 kişi yaşamını yitirdi. 10 kişi taburcu oldu.";
        Map<String, Object> result = CovidReportParser.parseNews(sample);
        assertEquals("İzmir", result.get("city"));
        assertEquals(LocalDate.of(2021, 5, 19), result.get("date"));
        assertEquals(50, result.get("caseCount"));
        assertEquals(5, result.get("deathCount"));
        assertEquals(10, result.get("recoveredCount"));
    }

    @Test
    void testParseNews_missingFields_returnsPartialMap() {
        String text = "İstanbul'da vaka sayısı 10 olarak açıklandı.";
        Map<String, Object> result = CovidReportParser.parseNews(text);
        assertTrue(result.size() < 5); 
    }

    @Test
    void testParseNews_humanMonthFormat() {
        String sample = "Bursa'da 2 Nisan 2020 tarihinde 100 vaka bildirildi. Vefat eden sayısı: 8. 25 kişi taburcu oldu.";
        Map<String, Object> result = CovidReportParser.parseNews(sample);
        assertEquals("Bursa", result.get("city"));
        assertEquals(LocalDate.of(2020, 4, 2), result.get("date"));
        assertEquals(100, result.get("caseCount"));
        assertEquals(8, result.get("deathCount"));
        assertEquals(25, result.get("recoveredCount"));
    }

    @Test
    void testParseNews_withThousandSeparators() {
        String sample = "İstanbul'da 25.10.2021 tarihinde 15.780 yeni vaka tespit edildi. 2,150 kişi vefat etti. " +
                        "Taburcu olan sayısı ise 14 500 olarak açıklandı.";
        Map<String, Object> result = CovidReportParser.parseNews(sample);
        assertEquals("İstanbul", result.get("city"));
        assertEquals(LocalDate.of(2021, 10, 25), result.get("date"));
        assertEquals(15780, result.get("caseCount"));
        assertEquals(2150, result.get("deathCount"));
        assertEquals(14500, result.get("recoveredCount"));
    }

    @Test
    void testParseNews_noData() {
        String sample = "Bugün hava çok güzeldi, herhangi bir koronavirüs vakası olmadı.";
        Map<String, Object> result = CovidReportParser.parseNews(sample);
        assertTrue(result.isEmpty() || result.values().stream().allMatch(Objects::isNull));
    }
}