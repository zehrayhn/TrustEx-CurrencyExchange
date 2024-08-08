import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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

const columns = [
  { id: 'icon', label: '', minWidth: 50 },
  { id: 'name', label: 'Para Birimi', minWidth: 170 },
  {
    id: 'calories',
    label: 'Alış',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'fat',
    label: 'Satış',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'carbs',
    label: 'Günlük Değişim',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'protein',
    label: 'Saat',
    minWidth: 100,
    align: 'right',
  },
];

function createData(icon, name, calories, fat, carbs, protein) {
  return { icon, name, calories, fat, carbs, protein };
}


  const rows = [
    createData('AE', 'BAE Dirhemi'),
    createData('AF', 'Afganistan Afganisi'),
    createData('AL', 'Arnavut Leki'),
    createData('AM', 'Ermeni Dramı'),
    createData('AN', 'Hollanda Antilleri Guldeni'),
    createData('AO', 'Angola Kvanzası'),
    createData('AR', 'Arjantin Pezosu'),
    createData('AU', 'Avustralya Doları'),
    createData('AW', 'Aruba Florini'),
    createData('AZ', 'Azerbaycan Manatı'),
    createData('BA', 'Bosna-Hersek Markı'),
    createData('BB', 'Barbados Doları'),
    createData('BD', 'Bangladeş Takası'),
    createData('BG', 'Bulgar Levası'),
    createData('BH', 'Bahreyn Dinarı'),
    createData('BI', 'Burundi Frangı'),
    createData('BM', 'Bermuda Doları'),
    createData('BN', 'Brunei Doları'),
    createData('BO', 'Bolivya Bolivyanosu'),
    createData('BR', 'Brezilya Reali'),
    createData('BS', 'Bahamalar Doları'),
    createData('BT', 'Butan Ngultrumu'),
    createData('BW', 'Botsvana Pulası'),
    createData('BY', 'Beyaz Rusya Rublesi'),
    createData('BZ', 'Belize Doları'),
    createData('CA', 'Kanada Doları'),
    createData('CD', 'Kongo Frangı'),
    createData('CH', 'İsviçre Frangı'),
    createData('CL', 'Şili Pezosu'),
    createData('CN', 'Çin Yuanı'),
    createData('CO', 'Kolombiya Pezosu'),
    createData('CR', 'Kosta Rika Kolonu'),
    createData('CU', 'Küba Pezosu'),
    createData('CV', 'Cape Verde Eskudosu'),
    createData('CZ', 'Çek Korunası'),
    createData('DJ', 'Cibuti Frangı'),
    createData('DK', 'Danimarka Kronu'),
    createData('DO', 'Dominik Pezosu'),
    createData('DZ', 'Cezayir Dinarı'),
    createData('EG', 'Mısır Poundu'),
    createData('ER', 'Eritre Nakfası'),
    createData('ET', 'Etiyopya Birri'),
    createData('EU', 'Euro'),
    createData('FJ', 'Fiji Doları'),
    createData('FK', 'Falkland Adaları Poundu'),
    createData('FO', 'Faroe Adaları Kronu'),
    createData('GB', 'İngiliz Sterlini'),
    createData('GE', 'Gürcistan Larisi'),
    createData('GG', 'Guernsey Poundu'),
    createData('GH', 'Gana Sedisi'),
    createData('GI', 'Cebelitarık Poundu'),
    createData('GM', 'Gambiya Dalasisi'),
    createData('GN', 'Gine Frangı'),
    createData('GT', 'Guatemala Quetzalı'),
    createData('GY', 'Guyana Doları'),
    createData('HK', 'Hong Kong Doları'),
    createData('HN', 'Honduras Lempirası'),
    createData('HR', 'Hırvat Kunası'),
    createData('HT', 'Haiti Gourdesi'),
    createData('HU', 'Macar Forinti'),
    createData('ID', 'Endonezya Rupisi'),
    createData('IL', 'İsrail Şekeli'),
    createData('IM', 'Man Adası Poundu'),
    createData('IN', 'Hindistan Rupisi'),
    createData('IQ', 'Irak Dinarı'),
    createData('IR', 'İran Riyali'),
    createData('IS', 'İzlanda Kronu'),
    createData('JE', 'Jersey Poundu'),
    createData('JM', 'Jamaika Doları'),
    createData('JO', 'Ürdün Dinarı'),
    createData('JP', 'Japon Yeni'),
    createData('KE', 'Kenya Şilini'),
    createData('KG', 'Kırgız Somu'),
    createData('KH', 'Kamboçya Rieli'),
    createData('KI', 'Kiribati Doları'),
    createData('KM', 'Komor Frangı'),
    createData('KR', 'Güney Kore Wonu'),
    createData('KW', 'Kuveyt Dinarı'),
    createData('KY', 'Cayman Adaları Doları'),
    createData('KZ', 'Kazak Tengesi'),
    createData('LA', 'Laos Kipi'),
    createData('LB', 'Lübnan Poundu'),
    createData('LK', 'Sri Lanka Rupisi'),
    createData('LR', 'Liberya Doları'),
    createData('LS', 'Lesotho Lotisi'),
    createData('LY', 'Libya Dinarı'),
    createData('MA', 'Fas Dirhemi'),
    createData('MD', 'Moldova Leyi'),
    createData('MG', 'Madagaskar Ariary'),
    createData('MK', 'Makedonya Denarı'),
    createData('MK', 'Myanmar Kyatı'),
    createData('MN', 'Moğolistan Tugriki'),
    createData('MO', 'Makao Patakası'),
    createData('MR', 'Moritanya Ugiyası'),
    createData('MU', 'Mauritius Rupisi'),
    createData('MV', 'Maldiv Rufiyası'),
    createData('MW', 'Malavi Kvaçası'),
    createData('MX', 'Meksika Pezosu'),
    createData('MY', 'Malezya Ringgiti'),
    createData('MZ', 'Mozambik Metikali'),
    createData('NA', 'Namibya Doları'),
    createData('NG', 'Nijerya Nairası'),
    createData('NI', 'Nikaragua Kordobası'),
    createData('NO', 'Norveç Kronu'),
    createData('NP', 'Nepal Rupisi'),
    createData('NZ', 'Yeni Zelanda Doları'),
    createData('OM', 'Umman Riyali'),
    createData('PA', 'Panama Balboası'),
    createData('PE', 'Peru Solü'),
    createData('PG', 'Papua Yeni Gine Kinası'),
    createData('PH', 'Filipin Pezosu'),
    createData('PK', 'Pakistan Rupisi'),
    createData('PL', 'Polonya Zlotisi'),
    createData('PY', 'Paraguay Guaranisi'),
    createData('QA', 'Katar Riyali'),
    createData('RO', 'Romanya Leyi'),
    createData('RS', 'Sırbistan Dinarı'),
    createData('RU', 'Rus Rublesi'),
    createData('RW', 'Ruanda Frangı'),
    createData('SA', 'Suudi Arabistan Riyali'),
    createData('SB', 'Solomon Adaları Doları'),
    createData('SC', 'Seyşeller Rupisi'),
    createData('SD', 'Sudan Poundu'),
    createData('SE', 'İsveç Kronu'),
    createData('SG', 'Singapur Doları'),
    createData('SH', 'Saint Helena Poundu'),
    createData('SL', 'Sierra Leone Leonesi'),
    createData('SO', 'Somali Şilini'),
    createData('SR', 'Surinam Doları'),
    createData('SS', 'Güney Sudan Poundu'),
    createData('ST', 'São Tomé ve Príncipe Dobrası'),
    createData('SY', 'Suriye Poundu'),
    createData('SZ', 'Eswatini Lilangeni'),
    createData('TH', 'Tayland Bahtı'),
    createData('TJ', 'Tacik Somonisi'),
    createData('TM', 'Türkmenistan Manatı'),
    createData('TN', 'Tunus Dinarı'),
    createData('TO', 'Tonga Paʻangası'),
    createData('TR', 'Türk Lirası'),
    createData('TT', 'Trinidad ve Tobago Doları'),
    createData('TV', 'Tuvalu Doları'),
    createData('TW', 'Yeni Tayvan Doları'),
    createData('TZ', 'Tanzanya Şilini'),
    createData('UA', 'Ukrayna Grivnası'),
    createData('UG', 'Uganda Şilini'),
    createData('US', 'Amerikan Doları'),
    createData('UY', 'Uruguay Pezosu'),
    createData('UZ', 'Özbekistan Somu'),
    createData('VE', 'Venezuela Bolivarı'),
    createData('VN', 'Vietnam Dongu'),
    createData('VU', 'Vanuatu Vatu'),
    createData('WS', 'Samoa Tala'),
    createData('ZA', 'CFA Frangı (Batı Afrika)'),
    createData('ZA', 'Doğu Karayip Doları'),
    createData('ZA', 'IMF Özel Çekme Hakları'),
    createData('ZA', 'CFA Frangı (Orta Afrika)'),
    createData('ZA', 'CFP Frangı'),
    createData('YE', 'Yemen Riyali'),
    createData('ZA', 'Güney Afrika Randı'),
    createData('ZM', 'Zambiya Kvaçası'),
    createData('ZW', 'Zimbabve Doları'),
  ];
  


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '750px', overflow: 'hidden', position: 'absolute', top: '-1320px', left: '450px', height: 'auto' }}>
  <TableContainer sx={{ maxHeight: 'none',  overflow: 'hidden' }}> 
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.id === 'icon' ? (
                          <Flag code={value} style={{ marginRight: 8 }} />
                        ) : (
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                        )}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
