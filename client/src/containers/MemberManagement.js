import {connect} from 'react-redux';
import MemberManagementPage from '../components/MemberManagement';
import {MemberFilters, memberManagementActions} from '../actions/memberManagement';

const getVisibleMembers = (members, filter) => {
  switch (filter) {
    case MemberFilters.ALL:
      return members;
    case MemberFilters.ACTIVE:
      return members.filter(m => m.leave_date == null);
    case MemberFilters.LEFT:
      return members.filter(m => m.leave_date != null);
    default:
      return members;
  }
}

const mapStateToProps = (state) => {
  return {
    members: getVisibleMembers(state.memberManagement.members, state.memberManagement.memberFilter),
    memberFilter: state.memberManagement.memberFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterClick: (filter) => {
      dispatch(memberManagementActions.setMemberFilter(filter));
    },
    addMember: (newMember) => {
      dispatch(memberManagementActions.addMember(newMember));
    },
    patchMember: (id, data) => {
      dispatch(memberManagementActions.patchMember(id, data));
    }
  }
}

const MemberManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberManagementPage)

export default MemberManagement;