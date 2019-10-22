import { Dimensions, StyleSheet } from 'react-native';
import Colors from './colors';

const screenDimension = Dimensions.get('window');
const screenWidth = screenDimension.width;

const publishStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PageBackground,
  },
  gallerySelector: {
    flex: 1,
    marginTop: 62,
    paddingTop: 2,
    backgroundColor: Colors.DarkGrey,
  },
  galleryGrid: {
    flex: 1,
  },
  galleryGridImage: {
    width: '100%',
    height: 90,
  },
  inputText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.White,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
  },
  actionButtons: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeLink: {
    color: Colors.LbryGreen,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  publishButton: {
    backgroundColor: Colors.LbryGreen,
    alignSelf: 'flex-end',
  },
  cardTitle: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 20,
    marginBottom: 8,
  },
  actionsView: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
  },
  record: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBackground: {
    backgroundColor: Colors.Black,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  subActions: {
    flex: 0.5,
    borderLeftWidth: 2,
    borderLeftColor: Colors.DarkGrey,
  },
  actionText: {
    color: Colors.White,
    fontFamily: 'Inter-UI-Regular',
    fontSize: 14,
    marginTop: 8,
  },
  photo: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload: {
    backgroundColor: Colors.Black,
    height: 120,
    borderTopWidth: 2,
    borderTopColor: Colors.DarkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishDetails: {
    marginTop: 60,
  },
  mainThumbnailContainer: {
    backgroundColor: Colors.Black,
    width: '100%',
    height: 240,
  },
  mainThumbnail: {
    height: 240,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    width: 80,
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
    textAlign: 'right',
  },
  currency: {
    fontFamily: 'Inter-UI-Regular',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  switchRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
  },
  switchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginTop: -10,
  },
  switchText: {
    marginRight: 4,
    fontSize: 16,
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    color: Colors.White,
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
    marginLeft: 8,
  },
  listEmptyText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 14,
  },
  cameraPreview: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 240,
  },
  actionsSubView: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  successContainer: {
    padding: 16,
  },
  successTitle: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 28,
    marginBottom: 16,
  },
  successText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 20,
  },
  successRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  successUrl: {
    flex: 0.9,
    fontSize: 32,
    fontFamily: 'Inter-UI-Regular',
    color: Colors.NextLbryGreen,
    marginRight: 16,
  },
  cameraOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.Black,
    elevation: 24,
  },
  fullCamera: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 200,
    alignItems: 'center',
  },
  controlsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonControl: {
    flex: 0.1,
  },
  mainControlsRow: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchCameraToggle: {
    marginRight: 48,
    color: Colors.White,
  },
  cameraAction: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraActionIcon: {
    position: 'absolute',
  },
  recordingIcon: {
    position: 'absolute',
  },
  transparentControls: {
    backgroundColor: '#00000022',
  },
  opaqueControls: {
    backgroundColor: Colors.Black,
  },
  progress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  toggleContainer: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  warning: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
  },
  rewardDriverCard: {
    alignItems: 'center',
    backgroundColor: Colors.RewardDriverBlue,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  rewardDriverText: {
    fontFamily: 'Inter-UI-Regular',
    color: Colors.White,
    fontSize: 14,
  },
  rewardIcon: {
    color: Colors.White,
    marginRight: 8,
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInputLayout: {
    marginBottom: 4,
  },
  textInputTitle: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 12,
    marginBottom: -10,
    marginLeft: 4,
  },
  thumbnailUploadContainer: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00000077',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    justifyContent: 'center',
  },
  thumbnailUploadText: {
    color: Colors.White,
    fontFamily: 'Inter-UI-SemiBold',
    fontSize: 12,
    marginLeft: 4,
  },
  toggleField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  toggleText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  relativeCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  centered: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyPicker: {
    width: 100,
  },
  fullCentered: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPublishes: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  noPublishText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
  },
  publishNowButton: {
    alignSelf: 'center',
    backgroundColor: Colors.LbryGreen,
    marginTop: 16,
  },
  publishesList: {
    flex: 1,
    marginTop: 60,
  },
  publishesScrollPadding: {
    paddingBottom: 16,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  noVideos: {
    color: Colors.White,
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
  },
  cameraInfo: {
    color: Colors.White,
    fontFamily: 'Inter-UI-Regular',
    fontSize: 16,
  },
  warningText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 14,
    color: Colors.DescriptionGrey,
  },
  helpText: {
    fontFamily: 'Inter-UI-Regular',
    fontSize: 12,
    color: Colors.DescriptionGrey,
  },
  publishesFooter: {
    marginTop: 2,
    marginLeft: 16,
    marginRight: 16,
  },
  publishesFooterButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.LbryGreen,
    marginTop: 16,
  },
  thumbnailEditOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    position: 'absolute',
    padding: 8,
    left: screenWidth / 2 - 32 / 2,
    bottom: 8,
    backgroundColor: '#00000077',
  },
  editIcon: {
    color: Colors.White,
    fontFamily: 'Inter-UI-SemiBold',
    fontSize: 12,
  },
});

export default publishStyle;
