FROM gradle:8.8.0-jdk17-jammy as builder

WORKDIR /app

COPY settings.gradle ./settings.gradle
COPY gradle/ ./gradle/
COPY app/build.gradle app/build.gradle

RUN gradle dependencies

COPY . .

RUN gradle bootJar

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]