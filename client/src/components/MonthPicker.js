import React from 'react';
import PropTypes from 'prop-types';
import {Button, Typography, Grid} from "@material-ui/core";
import {ArrowDropDown} from "@material-ui/icons";
import {MuiPickersUtilsProvider, DatePicker} from "@material-ui/pickers";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/zh-tw";
moment.locale("zh-tw")


const MonthPicker = (props) => {
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
      <DatePicker
        autoOk
        variant="inline"
        openTo="month"
        views={["year", "month"]}
        format="yyyy MMM"
        value={props.value}
        onChange={props.onChange}
        TextFieldComponent={(TextFieldProps) => {
          const {inputRef, value, onClick} = TextFieldProps;
          return (
            <Button ref={inputRef} onClick={onClick} style={{padding: 0}}>
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
        }}
      />
    </MuiPickersUtilsProvider>
  );
}


MonthPicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};


export default MonthPicker;
