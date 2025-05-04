# Covid-19 Görselleştirme Demo Uygulaması

Bu proje; **React 19** tabanlı bir frontend ve **Spring Boot 3** tabanlı bir backend içerir. Veriler MongoDB'de saklanır, Covid verilerinin görselleştirilmesini sağlar.

---

## Gereksinimler

- **Backend:**
  - Java 17+
  - Maven (veya mvnw ile otomatik)
  - Yerel MongoDB (varsayılan: `mongodb://localhost:27017/korona-demo`)
- **Frontend:**
  - Node.js 16+
  - npm 8+

> Kullanılan ana bağımlılık ve tam sürümler için ilgili `korona/pom.xml` ve `korona-frontend/package.json` dosyalarına bakınız.

---

## Kurulum

### 1. MongoDB başlatın (varsayılan port: 27017)

### 2. Backend (Spring Boot)

```
cd korona
./mvnw spring-boot:run veya mvn spring-boot:run
 ```

Uygulama çalışınca erişim adresi: http://localhost:8080

MongoDB bağlantı ayarları için:
korona/src/main/resources/application.properties dosyasını düzenleyebilirsiniz:

**PROPERTIES**
```
spring.data.mongodb.uri=mongodb://localhost:27017/korona-demo
spring.data.mongodb.database=korona-demo
server.port=8080
```
### 3. Frontend (React)

```
cd korona-frontend
npm install
```
.env dosyanız mutlaka bulunmalı:
REACT_APP_API_URL=http://localhost:8080


Çalıştırmak için:
```
npm start
```

Uygulama çalışınca erişim adresi: http://localhost:3000

### 4. Testler

**Backend:**
```
cd korona
./mvnw test veya mvnw.cmd test
```
**Frontend:**
```

cd korona-frontend
npm test
```

**Mevlüt Batuhan SAAR**
