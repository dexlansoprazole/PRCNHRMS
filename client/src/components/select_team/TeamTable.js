import React from 'react';
import PropTypes from 'prop-types';
import {Box, useTheme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import tableIcons from '../tableIcons';
import deepEqual from 'deep-equal';

const TeamTable = props => {
  const loading = useSelector(state => state.loading || state.team.search.loading);
  const selectable = Object.keys(props).find(k => k === 'teamSelected') ? true : false;
  const globalTheme = useTheme();
  const tableTheme = createMuiTheme(
    {
      overrides: {
        MuiTableRow: {
          root: {
            transition: 'all 0s !important',
            "&:hover": {
              backgroundColor: "#f8f8f8",
            }
          }
        }
      }
    },
    globalTheme
  );

  return (
    <MuiThemeProvider theme={tableTheme}>
      <MaterialTable
        icons={tableIcons}
        isLoading={loading}
        components={{
          Container: Box
        }}
        columns={props.columns}
        data={props.data}
        onRowClick={selectable ? (e, rowData) => props.setTeamSelected(rowData.teamData) : null}
        actions={props.actions}
        editable={props.editable}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: props.maxBodyHeight,
          headerStyle: {position: 'sticky', top: 0, whiteSpace: 'nowrap'},
          addRowPosition: 'first',
          rowStyle: rowData => {
            const hexToRgb = hex =>
              hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
            const rgb = hexToRgb(tableTheme.palette.secondary.main);
            return {
              cursor: selectable ? 'pointer' : 'auto',
              height: '48px',
              ...(selectable && props.teamSelected._id === rowData.teamData._id && {
                backgroundColor: 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 0.1)'
              })
            }
          },
          showTitle: false,
          toolbar: props.toolbar
        }}
        localization={{
          header: {
            actions: ''
          },
          toolbar: {
            searchTooltip: '搜尋',
            searchPlaceholder: '搜尋',
          },
          body: {
            emptyDataSourceMessage: '查無戰隊',
            addTooltip: '建立戰隊',
            deleteTooltip: '刪除',
            editTooltip: '編輯',
            editRow: {
              deleteText: '確定要刪除此戰隊?',
              cancelTooltip: '取消',
              saveTooltip: '完成'
            }
          }
        }}
      />
    </MuiThemeProvider>
  );
}

TeamTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  actions: PropTypes.array,
  editable: PropTypes.object,
  teamSelected: PropTypes.object,
  setTeamSelected: PropTypes.func,
  toolbar: PropTypes.bool,
  maxBodyHeight: PropTypes.any
};

TeamTable.defaultProps = {
  toolbar: true,
  maxBodyHeight: 'calc(50vh - 48px)'
}

export default React.memo(TeamTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));