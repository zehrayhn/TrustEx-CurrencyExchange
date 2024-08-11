import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../App.css'; 
import '../GirisYapBireyCss/TableBirey.css';
import Flag from 'react-world-flags';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#031a55',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(icon, name, alış, satış, günlük, saat) {
  return { icon, name, alış, satış, günlük, saat };
}

const rows = [
  createData('US', 'ABD Doları', 159, 6.0, 24, 4.0),
  createData('EU', 'Euro', 237, 9.0, 37, 4.3),
  createData('GB', 'Sterlin', 262, 16.0, 24, 6.0),
  createData('CH', 'İsviçre Frangı', 305, 3.7, 67, 4.3),
  createData('CA', 'Kanada Doları', 356, 16.0, 49, 3.9),
  createData('RU', 'Rus Rublesi', 356, 16.0, 49, 3.9),
  createData('AE', 'Birleşik Arap Emirlikleri Dirhemi', 356, 16.0, 49, 3.9),
  createData('AU', 'Avustralya Doları', 356, 16.0, 49, 3.9),
  createData('DK', 'Danimarka Kronu', 356, 16.0, 49, 3.9),
  createData('SE', 'İsveç Kronu', 356, 16.0, 49, 3.9),
  createData('NO', 'Norveç Kronu', 356, 16.0, 49, 3.9),
  createData('CN', 'Çin Yuanı', 356, 16.0, 49, 3.9),
  createData('JP', 'Japon Yeni', 356, 16.0, 49, 3.9),
  createData('KW', 'Kuveyt Dinarı', 356, 16.0, 49, 3.9),
  createData('IN', 'Hindistan Rupisi', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table data">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell >Para Birimi</StyledTableCell>
            <StyledTableCell align="right">Alış</StyledTableCell>
            <StyledTableCell align="right">Satış</StyledTableCell>
            <StyledTableCell align="right">Günlük Değişim</StyledTableCell>
            <StyledTableCell align="right">Saat</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <Flag
                  code={row.icon} 
                  style={{ marginRight: 8 }}
                />
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.alış}</StyledTableCell>
              <StyledTableCell align="right">{row.satış}</StyledTableCell>
              <StyledTableCell align="right">{row.günlük}</StyledTableCell>
              <StyledTableCell align="right">{row.saat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
