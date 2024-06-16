import * as React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone1: string;
  phone2: string;
  gender: string;
  heartBeat:any;
}

const TablePage: React.FC = () => {
  const [formDataList, setFormDataList] = React.useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    const storedData = localStorage.getItem('formDataList');
    if (storedData) {
      setFormDataList(JSON.parse(storedData));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedList = formDataList.filter(item => item.id !== id);
    setFormDataList(updatedList);
    localStorage.setItem('formDataList', JSON.stringify(updatedList));
  };

  const filteredData = formDataList.filter(data =>
    data.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatAddress = (address: string): string => {
    if (address.length > 8) {
      return address.slice(0, 8) + '...';
    }
    return address;
  };
  return (
    <Paper sx={{ padding: 2, marginTop: 4 }}>
      {formDataList.length === 0 ? (
     <></>
    ) : (
 <TextField
        fullWidth
        label="İsme göre ara"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

    )}
      {formDataList.length === 0 ? (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Henüz kayıt yapılmamıştır.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>İsim</TableCell>
                <TableCell>Soyisim</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell>Telefon 1</TableCell>
                <TableCell>Telefon 2</TableCell>
                <TableCell>Kalp Atışı</TableCell>
                <TableCell>Cinsiyet</TableCell>
                <TableCell align="center">Sil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.firstName}</TableCell>
                  <TableCell>{data.lastName}</TableCell>
                  <TableCell>{formatAddress(data.address)}</TableCell>
                  <TableCell>{data.phone1}</TableCell>
                  <TableCell>{data.phone2}</TableCell>
                  <TableCell>{data?.heartBeat}</TableCell>
                  <TableCell>{data.gender === 'erkek' ? 'Erkek' : 'Kadın'}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(data.id)}
                    >
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TablePage;
