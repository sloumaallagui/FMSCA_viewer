// DataFetcher.tsx
import React, { useEffect, useState } from 'react';
import DatabaseService from '../../services/database-service.service';
import DataTableComponent from '../../components/datatable-component.component';

const FmscaListPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await DatabaseService.initializeDatabase();
        const records = await DatabaseService.getRecords();
        setData(records);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <DataTableComponent data={data} />;
};

export default FmscaListPage;
