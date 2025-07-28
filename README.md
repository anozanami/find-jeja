# find-jeja
### 2025 삼광교회 청년회 하계수련회 제자를 찾아라

이 프로젝트는 2025년 삼광교회 청년회 하계수련회를 위한 '제자를 찾아라' 게임 애플리케이션입니다. 프론트엔드, 백엔드, 데이터베이스로 구성된 Docker 기반의 서비스입니다.

## 프로젝트 구조

```
/root/find-jeja/
├───.gitignore
├───01_schema.sql
├───02_teams.sql
├───03_answers.sql
├───docker-compose.yml
├───my.cnf
├───README.md
├───run_sql.sh
├───wait-for-it.sh
├───.git/
├───.github/
│   └───workflows/
│       └───deploy.yml
├───find-jeja-be-v2/
│   ├───.gitattributes
│   ├───.gitignore
│   ├───Dockerfile
│   ├───gradlew
│   ├───gradlew.bat
│   ├───settings.gradle
│   ├───.gradle/
│   ├───app/
│   │   ├───build.gradle
│   │   └───src/
│   ├───gradle/
│   └───gradle-8.8/
└───find-jeja-fe/
    ├───.gitignore
    ├───Dockerfile
    ├───eslint.config.js
    ├───index.html
    ├───nginx.conf
    ├───package-lock.json
    ├───package.json
    ├───postcss.config.js
    ├───README.md
    ├───vite.config.js
    ├───dist/
    ├───node_modules/
    ├───public/
    └───src/
```

## 서비스 구성 요소

이 프로젝트는 Docker Compose를 사용하여 다음과 같은 서비스들로 구성됩니다.

### 1. Frontend (find-jeja-fe)

*   **기술 스택:** Node.js 기반의 React.js (Vite 빌드 도구 사용)
*   **역할:** 사용자 인터페이스를 제공하며, 백엔드 API와 통신하여 데이터를 주고받습니다.
*   **Docker 설정:**
    *   `./find-jeja-fe` 디렉토리의 `Dockerfile`을 사용하여 빌드됩니다.
    *   Nginx를 웹 서버로 사용하며, 호스트의 80번 (HTTP) 및 443번 (HTTPS) 포트와 연결됩니다.
    *   `nginx.conf` 파일을 통해 Nginx 설정이 이루어집니다.
    *   `backend-v2` 서비스가 시작된 후에 실행됩니다.

### 2. Backend (find-jeja-be-v2)

*   **기술 스택:** Java Spring Boot (Gradle 빌드 도구 사용)
*   **역할:** 게임 로직, 데이터 처리, 데이터베이스 연동 등 핵심 비즈니스 로직을 담당합니다.
*   **Docker 설정:**
    *   `./find-jeja-be-v2` 디렉토리의 `Dockerfile`을 사용하여 빌드됩니다.
    *   호스트의 8080번 포트와 연결됩니다.
    *   환경 변수를 통해 데이터베이스 연결 정보 (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`)가 설정됩니다.
    *   `db` 서비스가 건강한 상태(healthy)가 된 후에 실행됩니다.

### 3. Database (db)

*   **기술 스택:** MySQL 8.0
*   **역할:** 게임 데이터 (팀 정보, 정답, 힌트, 제출 기록 등)를 저장하고 관리합니다.
*   **Docker 설정:**
    *   `mysql:8.0` 공식 Docker 이미지를 사용합니다.
    *   `hint_game_db` 데이터베이스를 생성하고, `root` 사용자의 비밀번호를 `root`로 설정합니다.
    *   `mysql_data` 볼륨을 사용하여 데이터가 컨테이너 재시작 시에도 유지되도록 합니다.
    *   `01_schema.sql`, `02_teams.sql`, `03_answers.sql` 파일을 컨테이너 시작 시 자동으로 실행하여 데이터베이스 스키마를 생성하고 초기 데이터를 삽입합니다.
    *   `my.cnf` 파일을 통해 MySQL 설정이 이루어집니다.
    *   `healthcheck`를 통해 데이터베이스가 정상적으로 실행 중인지 지속적으로 확인합니다.

## Docker Compose 사용법

*   **서비스 시작:** `docker compose up -d`
*   **서비스 중지:** `docker compose down`
*   **볼륨 포함 모든 서비스 중지 및 제거:** `docker compose down -v`
*   **컨테이너 상태 확인:** `docker compose ps`
*   **로그 확인:** `docker compose logs -f [서비스명]` (예: `docker compose logs -f backend-v2`)

## 초기 설정 및 실행

1.  **필수 파일 확인:** `01_schema.sql`, `02_teams.sql`, `03_answers.sql`, `my.cnf` 파일이 프로젝트 루트 디렉토리에 있는지 확인합니다.
2.  **Docker Compose 실행:** 프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 모든 서비스를 빌드하고 시작합니다.
    ```bash
    docker compose up -d --build
    ```
3.  **접속:** 서비스가 정상적으로 시작되면 웹 브라우저에서 `http://localhost` 또는 `http://localhost:80`으로 접속하여 프론트엔드 애플리케이션에 접근할 수 있습니다. 백엔드 API는 `http://localhost:8080`에서 접근 가능합니다.