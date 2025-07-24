FROM gradle:8.8.0-jdk17-jammy as builder

WORKDIR /app

COPY settings.gradle ./
COPY gradle/ ./gradle/
COPY app/build.gradle app/

RUN gradle dependencies

COPY . .

RUN gradle bootJar

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/app/build/libs/*.jar app.jar

# 데이터베이스가 준비될 때까지 대기하는 스크립트를 추가합니다.
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 8080

# wait-for-it.sh 스크립트를 사용하여 DB가 준비될 때까지 대기한 후 애플리케이션을 실행합니다.
ENTRYPOINT ["wait-for-it.sh", "db:3306", "--", "java", "-jar", "app.jar"]