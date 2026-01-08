const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔗 Testing Supabase connection...')
  console.log(`📍 URL: ${supabaseUrl}`)
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (error) {
      if (error.message.includes('relation "profiles" does not exist')) {
        console.log('⚠️  Database tables not created yet')
        console.log('📋 Please run the SQL migrations in your Supabase SQL editor')
        console.log('   The SQL was shown in the previous migration script output')
        return
      }
      throw error
    }

    console.log('✅ Supabase connection successful!')
    console.log('✅ Database tables are accessible')
    
    // Test if we can create a simple query
    const { data: testData, error: testError } = await supabase
      .from('servers')
      .select('*')
      .limit(1)

    if (testError) {
      console.log('⚠️  Tables exist but may need RLS policies configured')
    } else {
      console.log('✅ Server table is accessible')
    }

  } catch (err) {
    console.error('❌ Connection failed:', err.message)
  }
}

testConnection()