import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, Checkbox} from '@material-ui/core';
import {ThumbUpOutlined, ThumbDownOutlined} from '@material-ui/icons';
import memberActions from '../actions/member';
import moment from 'moment';
import "moment/locale/zh-tw";
moment.locale("zh-tw");

const BtnVote = (props) => {
  const {Icon, voted, setVoted, onChange} = props;
  const theme = useTheme();

  return (
    <Checkbox
      checked={voted}
      onClick={() => setVoted(!voted)}
      onChange={onChange}
      style={{padding: 5}}
      size='small'
      icon={<Icon htmlColor={theme.palette.common.white} />}
      checkedIcon={<Icon htmlColor={theme.palette.primary.main} />}
    >
    </Checkbox>
  );
}

const AttendanceVote = (props) => {
  const {member, role, date, members, setMembers, prevMembers, setPrevMembers} = props;
  const user = useSelector(state => state.user);
  const [upvoted, setUpvoted] = React.useState(member.upvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null);
  const [downvoted, setDownvoted] = React.useState(member.downvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null);
  const dispatch = useDispatch();
  const voteMember = (id, data) => dispatch(memberActions.patch_vote_attendance(id, data));

  React.useEffect(() => {
    setUpvoted(member.upvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null);
    setDownvoted(member.downvote_attendance.find(v => v.user_id === user._id && moment(v.date).isSame(date)) != null);
  }, [member]);

  return (
    <Grid container direction='row' spacing={2} wrap='nowrap' alignItems='center' justify='center'>
      <Grid>
        <BtnVote
          Icon={ThumbUpOutlined}
          voted={upvoted}
          setVoted={setUpvoted}
          onChange={(event) => {
            if (role === 'leader' || role === 'manager' || role === 'member') {
              setPrevMembers(prevMembers);
              setMembers(
                members.map(m => {
                  if (m._id === member._id) {
                    if (event.target.checked) {
                      m = {...m, vote_attendance: m.vote_attendance.map(v => v.user_id === user._id && user._id && moment(v.date).isSame(date) ? {...v, vote: 1} : v)}
                      if (m.vote_attendance.find(v => v.user_id === user._id && user._id && moment(v.date).isSame(date)) == null)
                        m.vote_attendance.push({user_id: user._id, date, vote: 1});
                    }
                    else
                      m = {...m, vote_attendance: m.vote_attendance.map(v => v.user_id === user._id && user._id && moment(v.date).isSame(date) ? {...v, vote: 0} : v)}
                  }
                  return m
                })
              );
              voteMember(member._id, {date, vote: event.target.checked ? 1 : 0});
            }
          }}
        />
      </Grid>
      <Grid>
        <BtnVote
          Icon={ThumbDownOutlined}
          voted={downvoted}
          setVoted={setDownvoted}
          onChange={(event) => {
            if (role === 'leader' || role === 'manager' || role === 'member') {
              setPrevMembers(prevMembers);
              setMembers(
                members.map(m => {
                  if (m._id === member._id) {
                    if (event.target.checked) {
                      m = {...m, vote_attendance: m.vote_attendance.map(v => v.user_id === user._id && user._id && moment(v.date).isSame(date) ? {...v, vote: -1} : v)}
                      if (m.vote_attendance.find(v => v.user_id === user._id && user._id && moment(v.date).isSame(date)) == null)
                        m.vote_attendance.push({user_id: user._id, date, vote: -1});
                    }
                    else
                      m = {...m, vote_attendance: m.vote_attendance.map(v => v.user_id === user._id && user._id && moment(v.date).isSame(date) ? {...v, vote: 0} : v)}
                  }
                  return m
                })
              );
              voteMember(member._id, {date, vote: event.target.checked ? -1 : 0});
            }
          }}
        />
      </Grid>
    </Grid>
  );
};


AttendanceVote.propTypes = {
  member: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  setMembers: PropTypes.func.isRequired,
  prevMembers: PropTypes.array.isRequired,
  setPrevMembers: PropTypes.func.isRequired,
};


export default AttendanceVote;
