import Dexie from 'dexie';
import Papa from 'papaparse';
import axios from 'axios';

class DatabaseService {
  // Initialize the database with a name and schema
  static db: any;

  static async initializeDatabase() {
    // Define the database schema
    // Define the database and schema
    this.db = new Dexie('fmsca_db');
    this.db.version(1).stores({
      records: '++id,created_dt,data_source_modified_dt,entity_type,operating_status,legal_name,dba_name,physical_address,p_street,p_city,p_state,p_zip_code,phone,mailing_address,m_street,m_city,m_state,m_zip_code,usdot_number,mc_mx_ff_number,power_units,mcs_150_form_date,out_of_service_date,state_carrier_id_number,duns_number,drivers,mcs_150_mileage_year,credit_score,record_status'
    });

    // Open the database
    await this.db.open();
  }

  static async isDataLoaded() {
    // Check if the database is initialized and has data
    const count = await this.db?.records.count();
    return count > 0;
  }

  static async loadDataFromCSV() {
    try {
      // Fetch the CSV data using axios from public directory
      const response = await axios.get("/data/FMSCA_records.csv");
      const csvText = response.data;
  
      // Parse the CSV data with PapaParse
      const results = await new Promise<any>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => resolve(results),
          error: (error) => window.location.reload(),
        });
      });
  
      // Save the parsed data to IndexedDB
      if (results && results.data) {
        await this.db?.records.bulkPut(results.data);
      }
  
    } catch (error) {
      console.error('Error loading CSV data:', error);
      throw error;
    }
  }

  static async initDatabase() {
        this.initializeDatabase();
    if(await this.isDataLoaded()) {
      return true;
    } else {
      await this.loadDataFromCSV();
      return true;
    }
  }

  static async getRecords(): Promise<any[]> {
    try {
      return await this.db.records.toArray();
    } catch (error) {
      console.error('Error retrieving records:', error);
      throw error;
    }
  }
}

export default DatabaseService;
