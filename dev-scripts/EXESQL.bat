@echo off
:: ===== CONFIGURAÇÃO =====
set "PGUSER=postgres"
set "PGPASSWORD=alterar_para_senha_do_bd"
set "PGDB=bdchecklist"
set "PGHOST=localhost"
set "SQLFILE=InserirDadosTeste.sql"

:: ===== VARIÁVEIS DE AMBIENTE =====
set PGCLIENTENCODING=UTF8

echo.
echo ===================================================
echo   INICIANDO SCRIPT DE POPULACAO DE BANCO DE DADOS
echo ===================================================
echo.
echo Inserindo dados de teste no banco '%PGDB%'...

:: Executa o arquivo .sql usando psql
psql -U %PGUSER% -h %PGHOST% -d %PGDB% -f %SQLFILE%

echo.
echo ===================================================
echo   SCRIPT FINALIZADO
echo ===================================================
echo.
echo Pressione qualquer tecla para sair...
pause >nul
