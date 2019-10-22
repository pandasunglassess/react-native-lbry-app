import { connect } from 'react-redux';
import { doToast } from 'lbry-redux';
import {
  doAuthenticate,
  doCheckSync,
  doGetSync,
  doSyncApply,
  doUserEmailNew,
  doUserResendVerificationEmail,
  selectAuthToken,
  selectEmailNewErrorMessage,
  selectEmailNewIsPending,
  selectEmailToVerify,
  selectAuthenticationIsPending,
  selectHasSyncedWallet,
  selectGetSyncIsPending,
  selectSyncApplyIsPending,
  selectSyncApplyErrorMessage,
  selectSyncData,
  selectSyncHash,
  selectUser,
} from 'lbryinc';
import { doSetClientSetting } from 'redux/actions/settings';
import FirstRun from './view';

const select = state => ({
  authenticating: selectAuthenticationIsPending(state),
  authToken: selectAuthToken(state),
  emailToVerify: selectEmailToVerify(state),
  emailNewErrorMessage: selectEmailNewErrorMessage(state),
  emailNewPending: selectEmailNewIsPending(state),
  hasSyncedWallet: selectHasSyncedWallet(state),
  getSyncIsPending: selectGetSyncIsPending(state),
  syncApplyErrorMessage: selectSyncApplyErrorMessage(state),
  syncApplyIsPending: selectSyncApplyIsPending(state),
  syncHash: selectSyncHash(state),
  syncData: selectSyncData(state),
  user: selectUser(state),
});

const perform = dispatch => ({
  addUserEmail: email => dispatch(doUserEmailNew(email)),
  authenticate: (appVersion, os, firebaseToken) => dispatch(doAuthenticate(appVersion, os, firebaseToken)),
  setClientSetting: (key, value) => dispatch(doSetClientSetting(key, value)),
  syncApply: (hash, data, password) => dispatch(doSyncApply(hash, data, password)),
  getSync: (password, callback) => dispatch(doGetSync(password, callback)),
  checkSync: () => dispatch(doCheckSync()),
  notify: data => dispatch(doToast(data)),
  resendVerificationEmail: email => dispatch(doUserResendVerificationEmail(email)),
});

export default connect(
  select,
  perform
)(FirstRun);
