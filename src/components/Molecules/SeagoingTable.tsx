import React, { useState, useEffect } from 'react';
import { DataTable, TextLink } from '@sdir/sds';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { sortObjects } from '../../helpers';
import { SeagoingDetails, SortingOption, SelectOption } from '../../types';

interface TableProps {
  data: SeagoingDetails[];
  columns: any;
  rowDataChange: (i: number, newData: any) => void;
  optionsForSelect: SelectOption;
  deleteSeagoingDetail: (vesselName: string) => void;
}

const TableCard: React.FC<TableProps> = ({
  columns,
  data,
  rowDataChange,
  optionsForSelect,
  deleteSeagoingDetail
}) => {
  const intl = useIntl();
  const editableElement = ['select', 'date', 'date', 'text'];
  const [sortedBy, setSortedBy] = useState<SortingOption>();
  const [tableData, setTableData] = useState({
    columns,
    data
  });
  useEffect(() => {
    if (sortedBy) {
      const sortedData = sortObjects(tableData.data, sortedBy);
      setTableData({ columns: tableData.columns, data: sortedData });
    } else {
      setTableData(() => ({ columns, data }));
    }
  }, [sortedBy, tableData.columns, tableData.data, data, columns]);
  const vesselName = tableData.data[0]?.vessel?.name;
  return (
    <>
      <VesselDetails>
        {vesselName}
        <TextLink
          strong
          textColor="red"
          text={intl.formatMessage({ id: 'general.delete' })}
          click={() => deleteSeagoingDetail(vesselName)}
          size="1.5rem"
        />
      </VesselDetails>
      <TableView>
        <DataTable
          columns={tableData.columns}
          data={tableData.data}
          onHeaderClick={setSortedBy}
          sortableKeys="*"
          editable
          onRowDataEdited={(i, newData) => rowDataChange(i, newData)}
          editableElement={editableElement}
          optionsForSelect={optionsForSelect}
        />
      </TableView>
    </>
  );
};
export default TableCard;

const TableView = styled.div`
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.card.boxShadow};
  border-radius: ${({ theme }) => theme.card.borderRadius};
  margin-bottom: ${({ theme }) => theme.card.marginBottom};
  background: ${({ theme }) => theme.colors.background.secondary};
`;
const VesselDetails = styled.p`
  padding: 0 1rem;
  margin-bottom: 0;
  font-size: 20px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
`;
