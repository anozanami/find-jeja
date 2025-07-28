#!/bin/bash

# =================================================================
# 데이터베이스 접속 정보 (사용자 환경에 맞게 수정해주세요)
# =================================================================
DB_USER="root"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="find_jeja"
# =================================================================

# 실행할 SQL 파일 목록 (순서대로 실행됩니다)
SQL_FILES=(
  "01_schema.sql"
  "02_teams.sql"
  "03_answers.sql"
)

# mysql 명령어가 존재하는지 확인
if ! command -v mysql &> /dev/null
then
    echo "오류: 'mysql' 명령어를 찾을 수 없습니다. MySQL 클라이언트가 설치되어 있는지 확인해주세요."
    exit 1
fi

echo "데이터베이스 스크립트 실행을 시작합니다. 설정된 데이터베이스: $DB_NAME"
echo "-----------------------------------------------------"

# SQL 파일 순차 실행
for sql_file in "${SQL_FILES[@]}"
do
  if [ ! -f "$sql_file" ]; then
    echo "오류: SQL 파일 '$sql_file'을(를) 찾을 수 없습니다. 파일이 현재 디렉토리에 있는지 확인해주세요."
    exit 1
  fi

  echo "Executing $sql_file..."
  mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" --password="$DB_PASSWORD" "$DB_NAME" < "$sql_file"
  
  # 명령어 실행 결과 확인
  if [ $? -eq 0 ]; then
    echo "성공: $sql_file 스크립트가 성공적으로 실행되었습니다."
  else
    echo "오류: $sql_file 스크립트 실행 중 오류가 발생했습니다. 스크립트를 중단합니다."
    exit 1
  fi
  echo "" # 가독성을 위한 빈 줄
done

echo "-----------------------------------------------------"
echo "✅ 모든 SQL 스크립트가 성공적으로 실행되었습니다."
