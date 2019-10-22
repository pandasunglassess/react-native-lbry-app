import { connect } from 'react-redux';
import { doToast } from 'lbry-redux';
import {
  doCheckSync,
  doGetSync,
  doSyncApply,
  doUserEmailNew,
  doUserEmailToVerify,
  doUserResendVerificationEmail,
  doUserPhoneNew,
  doUserPhoneVerify,
  selectPhoneNewErrorMessage,
  selectPhoneNewIsPending,
  selectPhoneToVerify,
  selectPhoneVerifyIsPending,
  selectPhoneVerifyErrorMessage,
  selectEmailNewErrorMessage,
  selectEmailNewIsPending,
  selectEmailToVerify,
  selectHasSyncedWallet,
  selectGetSyncIsPending,
  selectSetSyncIsPending,
  selectSyncApplyIsPending,
  selectSyncApplyErrorMessage,
  selectSyncData,
  selectSyncHash,
  selectUser,
} from 'lbryinc';
import { doSetClientSetting } from 'redux/actions/settings';
import { makeSelectClientSetting } from 'redux/selectors/settings';
import Constants from 'constants'; // eslint-disable-line node/no-deprecated-api
import Verification from './view';

const select = state => ({
  emailToVerify: selectEmailToVerify(state),
  emailNewErrorMessage: selectEmailNewErrorMessage(state),
  emailNewPending: selectEmailNewIsPending(state),
  user: selectUser(state),
  phoneVerifyErrorMessage: selectPhoneVerifyErrorMessage(state),
  phoneVerifyIsPending: selectPhoneVerifyIsPending(state),
  phone: selectPhoneToVerify(state),
  phoneNewErrorMessage: selectPhoneNewErrorMessage(state),
  phoneNewIsPending: selectPhoneNewIsPending(state),
  deviceWalletSynced: makeSelectClientSetting(Constants.SETTING_DEVICE_WALLET_SYNCED)(state),
  hasSyncedWallet: selectHasSyncedWallet(state),
  getSyncIsPending: selectGetSyncIsPending(state),
  setSyncIsPending: selectSetSyncIsPending(state),
  syncApplyIsPending: selectSyncApplyIsPending(state),
  syncApplyErrorMessage: selectSyncApplyErrorMessage(state),
  syncData: selectSyncData(state),
  syncHash: selectSyncHash(state),
});

const perform = dispatch => ({
  addUserEmail: email => dispatch(doUserEmailNew(email)),
  addUserPhone: (phone, countryCode) => dispatch(doUserPhoneNew(phone, countryCode)),
  getSync: (password, callback) => dispatch(doGetSync(password, callback)),
  checkSync: () => dispatch(doCheckSync()),
  verifyPhone: verificationCode => dispatch(doUserPhoneVerify(verificationCode)),
  notify: data => dispatch(doToast(data)),
  setClientSetting: (key, value) => dispatch(doSetClientSetting(key, value)),
  setEmailToVerify: email => dispatch(doUserEmailToVerify(email)),
  syncApply: (hash, data, password) => dispatch(doSyncApply(hash, data, password)),
  resendVerificationEmail: email => dispatch(doUserResendVerificationEmail(email)),
});

export default connect(
  select,
  perform
)(Verification);
