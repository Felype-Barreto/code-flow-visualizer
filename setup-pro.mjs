#!/usr/bin/env node

import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://neondb_owner:npg_Cs0QgleyoJ7F@ep-shiny-frost-af8gn4gt-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function setupProAccount() {
  try {
    await client.connect();
    console.log('✅ Conectado ao Neon!');
    
    // 1. Tornar conta Pro
    console.log('\n📝 Tornando conta Pro...');
    await client.query(`
      UPDATE users 
      SET 
        is_pro = true,
        pro_expires_at = null,
        premium_purchases = premium_purchases + 1
      WHERE email = 'felypexelepe@hotmail.com'
    `);
    
    // 2. Adicionar 10k coins
    console.log('💰 Adicionando 10.000 FlowCoins...');
    await client.query(`
      UPDATE users 
      SET coins = coins + 10000
      WHERE email = 'felypexelepe@hotmail.com'
    `);
    
    // 3. Verificar resultado
    console.log('🔍 Verificando resultado...\n');
    const result = await client.query(`
      SELECT 
        id,
        email,
        first_name || ' ' || last_name as name,
        is_pro,
        pro_expires_at,
        coins,
        premium_purchases,
        created_at
      FROM users
      WHERE email = 'felypexelepe@hotmail.com'
    `);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('✅ SUCESSO! Conta atualizada:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Nome: ${user.name}`);
      console.log(`👑 Pro: ${user.is_pro ? 'SIM ✓' : 'NÃO'}`);
      console.log(`⏰ Expira: ${user.pro_expires_at || 'NUNCA (Vitalício)'}`);
      console.log(`🪙 Coins: ${user.coins}`);
      console.log(`📦 Compras: ${user.premium_purchases}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('❌ Usuário não encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupProAccount();
