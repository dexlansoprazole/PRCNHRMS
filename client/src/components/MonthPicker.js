import React from 'react';
import PropTypes from 'prop-types';
import {Button, Typography, Grid} from "@material-ui/core";
import {ArrowDropDown} from "@material-ui/icons";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/zh-tw";
moment.locale("zh-tw")

const customTextFieldComponent = (props) => {
  const {inputRef, value, onClick} = props;
  return (
    <Button ref={inputRef} onClick={onClick} style={{padding: 0, whiteSpace: 'nowrap'}}>
      <Typography variant="h5">
        <Grid container spacing={1} alignItems='center' wrap='nowrap'>
          <Grid item>
            {value}
          </Grid>
          <Grid item>
            <ArrowDropDown display='block' />
          </Grid>
        </Grid>
      </Typography>
    </Button>
  );
}

const MonthPicker = (props) => {
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <DatePicker
        autoOk
        variant="inline"
        openTo="month"
        views={["year", "month"]}
        format="yyyy年 MMM"
        value={props.value}
        onChange={props.onChange}
        TextFieldComponent={customTextFieldComponent}
      />
    </MuiPickersUtilsProvider>
  );
}

MonthPicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};


export default MonthPicker;
