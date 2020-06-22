import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableHead, TableRow, Box} from '@material-ui/core';
import TeamTableItem from './TeamTableItem';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import LoadingOverlay from '../LoadingOverlay';

const TeamTable = props => {
  const divRef = React.useRef(null);
  const colCount = 4 +
    (props.showPosition ? 1 : 0) +
    (props.showFuncs ? 1 : 0 )

  React.useEffect(() => {
    let $div = window.$(divRef.current);
    let height = $div.parent().parent().parent().parent().parent().parent().height();
    $div.css('max-height', height);
    $div.css('height', height);
    window.$(window).resize(() => {
      let height = $div.parent().parent().parent().parent().parent().parent().height();
      $div.css('max-height', height);
      $div.css('height', height);
    });
  }, [props]);

  return (
    <Box height='100%' overflow='hidden'>
      <Box height='100%'>
        <OverlayScrollbarsComponent
          className='os-theme-custom'
          options={{scrollbars: {autoHide: 'move'}}}
        >
          <LoadingOverlay loading={props.loading}></LoadingOverlay>
          <div ref={divRef}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>名稱</TableCell>
                  <TableCell>隊長</TableCell>
                  <TableCell>成員數</TableCell>
                  {props.showPosition ? <TableCell>職位</TableCell> : null}
                  {props.showFuncs ? <TableCell></TableCell> : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {(props.teams && props.teams.length > 0) ? (
                  props.teams.map((team, index) =>
                    <TeamTableItem
                      key={index}
                      team={team}
                      index={index + 1}
                      link={props.link}
                      setTeamSelected={props.setTeamSelected}
                      selected={props.teamSelected ? (team._id === props.teamSelected._id) : false}
                      showPosition={props.showPosition}
                      showFuncs={props.showFuncs}
                    />
                  )
                ) : (
                    <TableRow>
                      <TableCell colSpan={colCount}>查無戰隊</TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
        </OverlayScrollbarsComponent>
      </Box>
    </Box>
  );
}

TeamTable.propTypes = {
  teams: PropTypes.array.isRequired,
  link: PropTypes.bool,
  showPosition: PropTypes.bool,
  showFuncs: PropTypes.bool,
  setTeamSelected: PropTypes.func,
  loading: PropTypes.bool
};

export default TeamTable;