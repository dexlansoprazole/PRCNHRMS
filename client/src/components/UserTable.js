import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useTheme} from '@material-ui/core';
import {useWindowResize} from './useWindowResize';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import tableIcons from './tableIcons';

const UserTable = props => {
  const loading = useSelector(state => props.loadingOn.some(a => state.loading[a]));
  const {height} = useWindowResize();
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
        title='權限管理'
        icons={{
          ...tableIcons,
          Delete: tableIcons.Clear
        }}
        columns={props.columns}
        data={props.data}
        isLoading={loading}
        actions={props.actions}
        editable={props.editable}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: {position: 'sticky', top: 0, whiteSpace: 'nowrap'},
          addRowPosition: 'first',
          toolbar: props.toolbar,
          padding: props.padding
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
            emptyDataSourceMessage: '查無使用者',
            deleteTooltip: props.deleteTooltip,
            editRow: {
              deleteText: props.deleteText,
              cancelTooltip: '取消',
              saveTooltip: '確定'
            }
          }
        }}
      />
    </MuiThemeProvider>
  );
}

UserTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loadingOn: PropTypes.array,
  actions: PropTypes.array,
  editable: PropTypes.object,
  toolbar: PropTypes.bool,
  padding: PropTypes.string,
  deleteTooltip: PropTypes.string,
  deleteText: PropTypes.string
};

UserTable.defaultProps = {
  loadingOn: [],
  toolbar: true,
  padding: 'default',
  deleteTooltip: '刪除',
  deleteText: '確定要刪除此使用者?'
}

export default UserTable;