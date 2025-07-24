FROM gradle:8.8.0-jdk17-jammy as builder

WORKDIR /app

# 먼저 Gradle 설정 파일만 복사하여 의존성 다운로드 레이어를 캐시합니다。
# settings.gradle과 gradle/libs.versions.toml은 WORKDIR의 상위 디렉토리에 있으므로,
# Dockerfile의 빌드 컨텍스트가 find-jeja-be-v2 디렉토리여야 합니다。
# docker-compose.yml에서 build.context: ./find-jeja-be-v2 로 설정되어 있습니다。
COPY settings.gradle ./
COPY gradle/ ./gradle/
COPY app/build.gradle app/

# 의존성 다운로드 (실제 빌드 전에)
# 이 단계에서 의존성만 다운로드하고 캐시합니다。
RUN gradle dependencies

# 나머지 소스 코드 복사
COPY . .

# bootJar만 실행 (clean 제거)
RUN gradle bootJar

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
