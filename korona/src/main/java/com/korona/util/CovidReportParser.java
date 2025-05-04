package com.korona.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.*;

/**
 * Regex ve Parse işlemleri
 */

public class CovidReportParser {

    private static final List<String> cities = Arrays.asList(
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
        "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
        "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
        "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul",
        "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
        "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
        "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
        "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
    );
    private static final Pattern datePattern = Pattern.compile(
        "\\b(\\d{2}\\.\\d{2}\\.\\d{4})\\b" // 19.04.2020
        + "|\\b(\\d{2}/\\d{2}/\\d{4})\\b" // 19/04/2020
        + "|\\b(\\d{2}-\\d{2}-\\d{4})\\b" // 19-04-2020
        + "|\\b(\\d{1,2}\\s+(?:Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylül|Ekim|Kasım|Aralık)\\s+\\d{4})\\b", // 19 Nisan 2020
        Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);

    private static final Pattern casePattern = Pattern.compile(
    "(\\d+(?:[\\., ]\\d{3})*)\\s*(?:yeni\\s*)?" +
    "(?:" +
        "vaka(?:\\s*(?:tespit edil(?:di|miştir)?|bulundu|saptandı|açıklandı)?)?" +
        "|pozitif\\s*vaka" +
        "|hasta\\s*sayısı" +
        "|enfekte\\s*kişi(?:\\s*sayısı)?" +
        "|kişinin\\s*(?:daha\\s*)?(?:\\w+\\s*){0,5}?" +
            "(?:koronavirüs|covid(?:[-\\s]?19)?|kovid(?:[-\\s]?19)?|pozitif|enfekte)" +
            "(?:\\s*olduğu|testinin pozitif çıktığı)?(?:\\s*anlaşıldı|bildirildi|duyuruldu)?" +
        "|(?:covid|kovid|covid[-\\s]?19|kovid[-\\s]?19|koronavirüs|korona)(?:\\s*vaka\\s*sayısı)?" +
    ")\\b",
    Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);


    private static final Pattern deathPattern = Pattern.compile(
    "(\\d+(?:[\\., ]\\d{3})*)\\s*(?:kişi(?:nin|de)?)?" +
    "(?:\\s+[\\wçğıöşüİĞÜŞÖÇ'-]+){0,3}?" +
    "\\s*(?:vefat etti|vefat ettiği öğrenildi|öldü|hayatını kaybetti|yaşamını yitirdi|yaşamını kaybetti|koronadan öldü|korona nedeniyle hayatını kaybetti|covid[-\\s]?19 nedeniyle öldü|kovid[-\\s]?19 nedeniyle öldü)" +
    "|(?:(?:vefat\\s*sayısı|vefat eden(?:lerin)?\\s*sayısı|ölüm\\s*sayısı|korona\\s*ölümü|covid[-\\s]?19\\s*ölümü|kovid[-\\s]?19\\s*ölümü)\\s*:?)\\s*(\\d+(?:[\\., ]\\d{3})*)",
    Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);


    private static final Pattern recoveredPattern = Pattern.compile(
    "(?:taburcu(?:\\s*sayısı)?(?:\\s*ise)?\\s*[:\\s]*)?(\\d+(?:[\\., ]\\d{3})*)(?:\\s*kişi)?\\s*(?:taburcu (?:oldu|edildi|olduğu bildirildi|olduğu açıklandı|olduğu duyuruldu))?" + 
    "|(\\d+(?:[\\., ]\\d{3})*)\\s*kişi\\s*(?:iyileşti|sağlığına kavuştu)" +
    "|(?:(?:iyile[şs]en(?:\\s*sayısı)?|tedavi edilen hasta sayısı|sağlığına kavuşan sayısı|iyileşen hasta\\s*sayısı|covid[-\\s]?19'dan iyileşen(?:\\s*kişi)?))\\s*:?[\\s]*(\\d+(?:[\\., ]\\d{3})*)",
    Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE);


    public static Map<String, Object> parseNews(String newsText) {
        Map<String, Object> result = new HashMap<>();

        // Metin Normalizasyonu
        newsText = normalizeText(newsText);

        //  Şehir Bulma
        for (String city : cities) {
            String cityPattern = "(?i)(?:\\s|^)" + Pattern.quote(city) + "(?:['’]?(da|de|ta|te|ya|ye|dan|den|tan|ten|nın|nin|nun|nün))?\\b";
            Pattern cityPat = Pattern.compile(cityPattern, Pattern.UNICODE_CASE);
            Matcher m = cityPat.matcher(newsText);
            if (m.find()) {
                result.put("city", city);
                break;
            }
        }

        // Tarih bulma
        Matcher dateMatcher = datePattern.matcher(newsText);
        if (dateMatcher.find()) {
            String dateStr = null;
            for (int i = 1; i <= dateMatcher.groupCount(); i++) {
                if (dateMatcher.group(i) != null) {
                    dateStr = dateMatcher.group(i);
                    break;
                }
            }
            try {
                DateTimeFormatter formatter;
                if (dateStr.contains(".")) {
                    formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
                } else if (dateStr.contains("/")) {
                    formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                } else if (dateStr.contains("-")) {
                    formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                } else {
                    formatter = DateTimeFormatter.ofPattern("d MMMM yyyy", Locale.forLanguageTag("tr-TR"));
                }
                LocalDate date = LocalDate.parse(dateStr, formatter);
                result.put("date", date);
            } catch (Exception e) {
                System.err.println("Date parsing error for: " + dateStr + ", error: " + e.getMessage());
            }
        }

        // Cümlelere bölme
        String[] sentences = newsText.split("(?<=[\\.!?])\\s+");

        // Vaka sayısı
        for (String sentence : sentences) {
            Matcher caseMatcher = casePattern.matcher(sentence);
            if (caseMatcher.find()) {
                String numStr = caseMatcher.group(1);
                numStr = numStr.replace(".", "").replace(",", "").replace(" ", "");
                 try {
                    result.put("caseCount", Integer.parseInt(numStr));
                    break;
                } catch (NumberFormatException e) {
                    System.err.println("Error parsing case count number: '" + numStr + "' in sentence: '" + sentence + "'");
                }
            }
        }

        // Vefat sayısı
        for (String sentence : sentences) {
            Matcher deathMatcher = deathPattern.matcher(sentence);
            if (deathMatcher.find()) {
                String numStr = deathMatcher.group(1) != null ? deathMatcher.group(1) : deathMatcher.group(2);
                if (numStr != null && !numStr.isEmpty()) {
                    numStr = numStr.replace(".", "").replace(",", "").replace(" ", "");
                    try {
                        result.put("deathCount", Integer.parseInt(numStr));
                        break;
                    } catch (NumberFormatException e) {
                         System.err.println("Error parsing death count number: '" + numStr + "' in sentence: '" + sentence + "'");
                    }
                }
            }
        }

        // Taburcu/iyileşen sayısı
        for (String sentence : sentences) {
            if (sentence.toLowerCase().contains("taburcu") || sentence.toLowerCase().contains("iyileş")) {
                Matcher recoveredMatcher = recoveredPattern.matcher(sentence);
                String numStr = null;
                if (recoveredMatcher.find()) {
                    if (recoveredMatcher.group(1) != null) numStr = recoveredMatcher.group(1);
                    else if (recoveredMatcher.group(2) != null) numStr = recoveredMatcher.group(2);
                    else if (recoveredMatcher.group(3) != null) numStr = recoveredMatcher.group(3);

                    if (numStr != null && !numStr.isEmpty()) {
                        numStr = numStr.replace(".", "").replace(",", "").replace(" ", "");
                        try {
                            result.put("recoveredCount", Integer.parseInt(numStr));
                            break;
                        } catch (NumberFormatException e) {
                             System.err.println("Error parsing recovered count number: '" + numStr + "' in sentence: '" + sentence + "'");
                        }
                    }
                }
            }
        }

        return result;
    }

    // Metin normalize fonksiyonu

    private static String normalizeText(String text) {
        text = text.replace('\u00a0', ' '); // non-breaking karakterlerini normal boşluğa çevirir
        text = text.replaceAll("[“”]", "\"");
        text = text.replaceAll("['’]", "'"); // Tüm kesmeleri tek tipe indir
        text = text.replaceAll(" +", " "); // Fazla boşlukları kaldır
        text = text.replaceAll("([\\.,!?:;])([\\p{L}])", "$1 $2"); // Noktalama sonrası boşluk ekle
        text = text.replaceAll("\\s+([\\.,!?:;])", "$1"); // Noktalama öncesi boşluk yok et
        text = text.trim(); // Baştaki ve sondaki boşlukları siler
        text = text.replaceAll("([a-zA-ZçğıöşüÇĞİÖŞÜ]+) ([dt]e|[dt]a|[dt]en|[dt]an|nın|nin|nun|nün|ya|ye|da|de|ta|te)\\b", "$1$2"); // Şehir adı ve ek arasındaki boşluğu kaldırır
        return text;
    }
}