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
├───README.md
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
*   **Docker 설정:**
    *   `./find-jeja-fe` 디렉토리의 `Dockerfile`을 사용하여 빌드됩니다.
    *   Nginx를 웹 서버로 사용하며, 호스트의 80번 (HTTP) 및 443번 (HTTPS) 포트와 연결됩니다.
    *   `nginx.conf` 파일을 통해 Nginx 설정이 이루어집니다.
    *   `backend-v2` 서비스가 시작된 후에 실행됩니다.

### 2. Backend (find-jeja-be-v2)

*   **기술 스택:** Java Spring Boot (Gradle 빌드 도구 사용)
*   **Docker 설정:**
    *   `./find-jeja-be-v2` 디렉토리의 `Dockerfile`을 사용하여 빌드됩니다.
    *   호스트의 8080번 포트와 연결됩니다.
    *   `db` 서비스가 건강한 healthy가 된 후에 실행됩니다.

### 3. Database (db)

*   **기술 스택:** MySQL 8.0
*   **Docker 설정:**
    *   `mysql:8.0` 공식 Docker 이미지를 사용합니다.
    *   `hint_game_db` 데이터베이스를 생성합니다.
    *   `mysql_data` 볼륨을 사용하여 데이터가 컨테이너 재시작 시에도 유지되도록 합니다.
    *   `01_schema.sql`, `02_teams.sql`, `03_answers.sql` 파일을 컨테이너 시작 시 자동으로 실행하여 데이터베이스 스키마를 생성하고 초기 데이터를 삽입합니다.
