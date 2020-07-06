import React from 'react';
import {TextField} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/zh-tw";
moment.locale("zh-tw")

const TableEditField = props => {
  let isValid = null;
  let helperText = '';
  // TODO: Fix default error message
  switch (props.type) {
    case 'text':
      let isValids = props.reValidators.map(r => r.exec(props.value) ? true : false);
      isValid = !(props.required && !props.value) && Object.values(isValids).every((v) => v === true);
      props.validRef.current = {...props.validRef.current, [props.columnDef.field]: isValid}
      helperText = !isValid ? props.helperTexts[isValids.findIndex(v => v === false)] : '';
      if (props.required && !props.value) helperText = '必填';
      return (
        <TextField
          autoFocus={props.autoFocus}
          multiline={typeof props.multiline === 'undefined' ? true : props.multiline}
          value={props.value ? props.value : ''}
          onChange={(e) => props.onChange(e.target.value)}
          error={!isValid}
          helperText={helperText}
        />
      )
    case 'date':
      let required = props.required;
      if (props.requiredDependentOn)
        required = props.required || props.rowData[props.requiredDependentOn] ? true : false;
      isValid = (value) => !(required && !value) && (moment(value, "YYYY/MM/DD", true).isValid() || !value);
      let value = props.value ? props.value : required && props.value === undefined ? props.onChange(moment().format("YYYY/MM/DD")) : null;
      props.validRef.current = {...props.validRef.current, [props.columnDef.field]: isValid(value)}
      helperText = !isValid(value) ? '錯誤的日期格式' : '';
      if (required && !value) helperText = '必填';
      return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            fullWidth
            multiline={typeof props.multiline === 'undefined' ? true : props.multiline}
            autoOk
            variant="inline"
            format="YYYY/MM/DD"
            margin="normal"
            value={value}
            onChange={(date, value) => props.onChange(value)}
            error={!isValid(value)}
            helperText={helperText}
          />
        </MuiPickersUtilsProvider>
      )
    default:
      return null;
  }
}

export default TableEditField;
