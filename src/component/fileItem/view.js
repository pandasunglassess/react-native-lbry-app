import React from 'react';
import { normalizeURI } from 'lbry-redux';
import { NavigationActions } from 'react-navigation';
import { NativeModules, Text, View, TouchableOpacity } from 'react-native';
import { navigateToUri } from 'utils/helper';
import Colors from 'styles/colors';
import DateTime from 'component/dateTime';
import FileItemMedia from 'component/fileItemMedia';
import FilePrice from 'component/filePrice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Link from 'component/link';
import NsfwOverlay from 'component/nsfwOverlay';
import discoverStyle from 'styles/discover';

class FileItem extends React.PureComponent {
  componentWillMount() {
    this.resolve(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.resolve(nextProps);
  }

  resolve(props) {
    const { isResolvingUri, resolveUri, claim, uri } = props;

    if (!isResolvingUri && claim === undefined && uri) {
      resolveUri(uri);
    }
  }

  navigateToFileUri = () => {
    const { navigation, uri, shortUrl } = this.props;
    const normalizedUri = normalizeURI(uri);
    if (NativeModules.Firebase) {
      NativeModules.Firebase.track('explore_click', { uri: normalizedUri, short_url: shortUrl });
    }
    navigateToUri(navigation, shortUrl || uri);
  };

  render() {
    const {
      blackListedOutpoints,
      claim,
      title,
      thumbnail,
      fileInfo,
      filteredOutpoints,
      metadata,
      isResolvingUri,
      rewardedContentClaimIds,
      style,
      mediaStyle,
      navigation,
      nsfw,
      obscureNsfw,
      showDetails,
      compactView,
      titleBeforeThumbnail,
    } = this.props;

    if (claim && claim.value_type === 'channel') {
      // don't display channels in the lists on the Your tags page
      return null;
    }

    let shouldHide = false;
    if (blackListedOutpoints || filteredOutpoints) {
      const outpointsToHide = blackListedOutpoints.concat(filteredOutpoints);
      shouldHide = outpointsToHide.some(outpoint => outpoint.txid === claim.txid && outpoint.nout === claim.nout);
    }
    if (shouldHide) {
      // don't display blacklisted or filtered outpoints on the Your tags page
      return null;
    }

    const uri = normalizeURI(this.props.uri);
    const obscure = obscureNsfw && nsfw;
    const isRewardContent = claim && rewardedContentClaimIds.includes(claim.claim_id);
    const signingChannel = claim ? claim.signing_channel : null;
    const channelName = signingChannel ? signingChannel.name : null;
    const channelClaimId = signingChannel ? signingChannel.claim_id : null;
    const fullChannelUri = channelClaimId ? `${channelName}#${channelClaimId}` : channelName;
    const shortChannelUri = signingChannel ? signingChannel.short_url : null;
    const height = claim ? claim.height : null;
    const duration = claim && claim.value && claim.value.video ? claim.value.video.duration : null;

    return (
      <View style={style}>
        <TouchableOpacity style={discoverStyle.container} onPress={this.navigateToFileUri}>
          {!compactView && titleBeforeThumbnail && (
            <Text numberOfLines={1} style={[discoverStyle.fileItemName, discoverStyle.rewardTitle]}>
              {title}
            </Text>
          )}
          <FileItemMedia
            duration={duration}
            title={title}
            thumbnail={thumbnail}
            resizeMode="cover"
            isResolvingUri={isResolvingUri}
            style={mediaStyle}
          />
          {!compactView && fileInfo && fileInfo.completed && fileInfo.download_path && (
            <Icon style={discoverStyle.downloadedIcon} solid color={Colors.NextLbryGreen} name={'folder'} size={16} />
          )}
          {!compactView && (!fileInfo || !fileInfo.completed || !fileInfo.download_path) && (
            <FilePrice uri={uri} style={discoverStyle.filePriceContainer} textStyle={discoverStyle.filePriceText} />
          )}
          {!compactView && (
            <View style={isRewardContent ? discoverStyle.rewardTitleContainer : null}>
              <Text numberOfLines={1} style={[discoverStyle.fileItemName, discoverStyle.rewardTitle]}>
                {title}
              </Text>
              {isRewardContent && <Icon style={discoverStyle.rewardIcon} name="award" size={14} />}
            </View>
          )}
          {!compactView && showDetails && (
            <View style={discoverStyle.detailsRow}>
              {channelName && (
                <Link
                  style={discoverStyle.channelName}
                  text={channelName}
                  onPress={() => {
                    navigateToUri(navigation, normalizeURI(shortChannelUri || fullChannelUri));
                  }}
                />
              )}
              {!channelName && !isResolvingUri && <Text style={discoverStyle.anonChannelName}>Anonymous</Text>}
              <DateTime style={discoverStyle.dateTime} textStyle={discoverStyle.dateTimeText} timeAgo uri={uri} />
            </View>
          )}
        </TouchableOpacity>
        {obscure && <NsfwOverlay onPress={() => navigation.navigate({ routeName: 'Settings', key: 'settingsPage' })} />}
      </View>
    );
  }
}

export default FileItem;
