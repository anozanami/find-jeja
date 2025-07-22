# 1. Build with Gradle
FROM gradle:8.8.0-jdk17-jammy as builder

WORKDIR /app

COPY build.gradle ./
COPY gradle/ gradle/
COPY gradlew ./
RUN chmod +x gradlew

# Download dependencies first to leverage caching
RUN ./gradlew dependencies

COPY . .

RUN ./gradlew bootJar

# 2. Run with JRE
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
