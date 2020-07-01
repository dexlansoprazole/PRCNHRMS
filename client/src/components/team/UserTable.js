import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core';
import {useWindowResize} from '../useWindowResize';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MaterialTable from "material-table";
import tableIcons from '../tableIcons';
import deepEqual from 'deep-equal';

const UserTable = props => {
  const {height} = useWindowResize();
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
        icons={{
          ...tableIcons,
          Delete: tableIcons.Clear
        }}
        columns={props.columns}
        data={props.data}
        actions={props.actions}
        editable={props.editable}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          maxBodyHeight: height - 300,
          headerStyle: {position: 'sticky', top: 0, whiteSpace: 'nowrap'},
          addRowPosition: 'first',
          showTitle: false,
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
  actions: PropTypes.array,
  editable: PropTypes.object,
  toolbar: PropTypes.bool,
  padding: PropTypes.string,
  deleteTooltip: PropTypes.string,
  deleteText: PropTypes.string
};

UserTable.defaultProps = {
  toolbar: true,
  padding: 'default',
  deleteTooltip: '刪除',
  deleteText: '確定要刪除此使用者?'
}

export default React.memo(UserTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));