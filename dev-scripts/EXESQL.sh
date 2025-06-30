#!/bin/bash

# ===== CONFIGURAÇÃO =====
PGUSER="postgres"
PGPASSWORD="postgres"
PGDB="lgpd_checklist_local"
PGHOST="localhost"
SQLFILE="InserirDadosTeste.sql"

# ===== VARIÁVEIS DE AMBIENTE =====
export PGPASSWORD
export PGCLIENTENCODING=UTF8

# ===== EXECUÇÃO =====
echo
echo "==================================================="
echo "  INICIANDO SCRIPT DE POPULACAO DE BANCO DE DADOS"
echo "==================================================="
echo
echo "Inserindo dados de teste no banco '$PGDB'..."

psql -U "$PGUSER" -h "$PGHOST" -d "$PGDB" -f "$SQLFILE"

echo
echo "==================================================="
echo "  SCRIPT FINALIZADO"
echo "==================================================="
echo

read -n 1 -s -r -p "Pressione qualquer tecla para sair..."
echo
