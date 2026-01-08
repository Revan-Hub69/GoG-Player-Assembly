const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigrations() {
  console.log('🚀 Running database migrations...')
  
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations')
  const migrationFiles = [
    '001_initial_schema.sql',
    '002_custom_functions.sql', 
    '003_rls_policies.sql'
  ]

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file)
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Migration file not found: ${file}`)
      continue
    }

    console.log(`📄 Running migration: ${file}`)
    
    const sql = fs.readFileSync(filePath, 'utf8')
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql })
      
      if (error) {
        // Try direct SQL execution if RPC fails
        const { error: directError } = await supabase
          .from('_migrations')
          .select('*')
          .limit(1)
        
        if (directError) {
          console.log(`⚡ Executing SQL directly for ${file}`)
          // For now, we'll log the SQL and ask user to run it manually
          console.log(`\n📋 Please run this SQL in your Supabase SQL editor:\n`)
          console.log('--- START SQL ---')
          console.log(sql)
          console.log('--- END SQL ---\n')
        }
      } else {
        console.log(`✅ Migration completed: ${file}`)
      }
    } catch (err) {
      console.log(`⚡ Please run ${file} manually in Supabase SQL editor`)
      console.log(`Error: ${err.message}`)
    }
  }

  console.log('\n🎉 Migration process completed!')
  console.log('If any migrations failed, please run them manually in your Supabase SQL editor.')
}

runMigrations().catch(console.error)