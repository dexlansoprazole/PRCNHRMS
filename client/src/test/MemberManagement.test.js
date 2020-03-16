import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import MemberManagement from '../components/MemberManagement';
import memberActions, { MemberFilters } from '../actions/member';
import $ from 'jquery';

$.fn.modal = jest.fn();
global.$ = global.jQuery = $;
configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

const initailState = {
  member: {
    loading: false,
    memberFilter: MemberFilters.ACTIVE,
    members: [],
  },
  signIn: {
    isGapiReady: true,
    isSignedIn: true
  },
  team: {
    _id: 'test',
    name: null
  }
};



describe('MemberManagement', () => {
  jest.spyOn(memberActions, "setMemberFilter");
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should show loading modal if is loading', () => {
    const store = mockStore({
      ...initailState,
      member: {loading: true}
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemberManagement />
      </Provider>
    )

    expect(wrapper.exists('LoadingModal')).toEqual(true);
  })

  it('should not show loading modal if is not loading', () => {
    const store = mockStore({
      ...initailState,
      member: { loading: false }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemberManagement />
      </Provider>
    )

    expect(wrapper.exists('LoadingModal')).toEqual(false);
  })

  it('should show member list if signed in and has team', () => {
    const store = mockStore({
      ...initailState,
      signIn: {
        isSignedIn: true
      },
      team: {
        _id: 'test'
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemberManagement />
      </Provider>
    )

    expect(wrapper.exists('#addMemberModal')).toEqual(true);
    expect(wrapper.find('#title').first().text()).toEqual(store.getState().team.name + " 成員清單");
    expect(wrapper.find('#btnAddMember').text()).toEqual("新增成員");
    wrapper.find('#btnFilterActive').simulate('click');
    wrapper.find('#btnFilterLeft').simulate('click');
    wrapper.find('#btnFilterAll').simulate('click');
    expect(memberActions.setMemberFilter).toHaveBeenCalledTimes(3);
    expect(wrapper.exists('MemberTable')).toEqual(true);
  })

  it('should show add team page if signed in and but no team', () => {
    const store = mockStore({
      ...initailState,
      signIn: {
        isSignedIn: true
      },
      team: {
        _id: null
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemberManagement />
      </Provider>
    )

    expect(wrapper.find('#addTeamModal').hasClass('show')).toEqual(false);
    expect(wrapper.find('#btnAddTeam').text()).toEqual("建立戰隊");
  })

  it('should show noghting if not signed in and no team', () => {
    const store = mockStore({
      ...initailState,
      signIn: {
        isSignedIn: false
      },
      team: {
        _id: null
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemberManagement />
      </Provider>
    )

    expect(wrapper.exists('.container')).toEqual(false);
  })
});