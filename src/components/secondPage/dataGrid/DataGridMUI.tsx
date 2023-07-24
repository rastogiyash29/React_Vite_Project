import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Post } from '../../../interfaces/Post';
import { Card, CardHeader } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'userId', headerName: 'User ID', width: 130 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const ComponentOne = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <Card elevation={6}>
      <CardHeader title="Data Grid" />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  );
};

export default ComponentOne;
