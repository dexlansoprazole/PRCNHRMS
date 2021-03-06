import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Box, useTheme} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import tableIcons from './tableIcons';
import deepEqual from 'deep-equal';

const TeamTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const selectable = props.teamSelected ? true : false;
  const globalTheme = useTheme();
  const tableTheme = createMuiTheme(
    {
      overrides: {
        MuiTableRow: {
          root: {
            transition: 'all 0s !important',
            "&:hover": {
              backgroundColor: globalTheme.palette.action.hover,
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
            return {
              cursor: selectable ? 'pointer' : 'auto',
              ...(selectable && props.teamSelected._id === rowData.teamData._id && {
                backgroundColor: tableTheme.palette.secondary.lighter
              })
            }
          },
          showTitle: false,
          toolbar: props.toolbar,
          padding: props.padding
        }}
        localization={{
          header: {
            actions: ''
          },
          toolbar: {
            searchTooltip: '??????',
            searchPlaceholder: '??????',
          },
          body: {
            emptyDataSourceMessage: '????????????',
            addTooltip: '????????????',
            deleteTooltip: props.deleteTooltip,
            editTooltip: '??????',
            editRow: {
              deleteText: props.deleteText,
              cancelTooltip: '??????',
              saveTooltip: '??????'
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
  loadingOn: PropTypes.array,
  actions: PropTypes.array,
  editable: PropTypes.object,
  teamSelected: PropTypes.object,
  setTeamSelected: PropTypes.func,
  toolbar: PropTypes.bool,
  maxBodyHeight: PropTypes.any,
  padding: PropTypes.string,
  deleteTooltip: PropTypes.string,
  deleteText: PropTypes.string
};

TeamTable.defaultProps = {
  loadingOn: [],
  toolbar: true,
  maxBodyHeight: 'calc(50vh - 48px)',
  padding: 'default',
  deleteTooltip: '??????',
  deleteText: '?????????????????????????'
}

export default React.memo(TeamTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));