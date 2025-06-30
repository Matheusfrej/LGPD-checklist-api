@echo off
:: Define a senha do PostgreSQL como uma variável de ambiente temporária
set PGPASSWORD=alterar_para_senha_do_bd

:: Define o padrão UTF8 para evitar caracteres estranhos
set PGCLIENTENCODING=UTF8

echo.
echo ===================================================
echo   INICIANDO SCRIPT DE POPULACAO DE BANCO DE DADOS
echo ===================================================
echo.
echo Inserindo dados de teste no banco 'bdchecklist'...

:: Executa o arquivo .sql usando psql
psql -U postgres -h localhost -d bdchecklist -f InserirDadosTeste.sql

echo.
echo ===================================================
echo   SCRIPT FINALIZADO
echo ===================================================
echo.
echo Pressione qualquer tecla para sair...
pause >nul