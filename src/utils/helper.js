import { NavigationActions, StackActions } from 'react-navigation';
import { buildURI, isURIValid, normalizeURI } from 'lbry-redux';
import { Lbryio } from 'lbryinc';
import { doPopDrawerStack, doPushDrawerStack, doSetPlayerVisible } from 'redux/actions/drawer';
import Constants, { DrawerRoutes, InnerDrawerRoutes } from 'constants'; // eslint-disable-line node/no-deprecated-api

const tagNameLength = 10;

function getRouteForSpecialUri(uri) {
  let targetRoute;
  const page = uri.substring(8).trim(); // 'lbry://?'.length == 8

  switch (page) {
    case Constants.PAGE_REWARDS:
      targetRoute = Constants.DRAWER_ROUTE_REWARDS;
      break;
    case Constants.PAGE_SETTINGS:
      targetRoute = Constants.DRAWER_ROUTE_SETTINGS;
      break;
    case Constants.PAGE_TRENDING:
      targetRoute = Constants.DRAWER_ROUTE_TRENDING;
      break;
    case Constants.PAGE_WALLET:
      targetRoute = Constants.FULL_ROUTE_NAME_WALLET;
      break;
    default:
      targetRoute = Constants.FULL_ROUTE_NAME_DISCOVER;
      break;
  }

  return targetRoute;
}

export function dispatchNavigateToUri(dispatch, nav, uri, isNavigatingBack) {
  if (uri.startsWith('lbry://?')) {
    dispatch(NavigationActions.navigate({ routeName: getRouteForSpecialUri(uri) }));
    return;
  }

  let uriVars = {},
    uriVarsStr;
  if (uri.indexOf('?') > -1) {
    uriVarsStr = uri.substring(uri.indexOf('?') + 1);
    uri = uri.substring(0, uri.indexOf('?'));
    uriVars = parseUriVars(uriVarsStr);
  }

  const params = { uri, uriVars };

  if (!isNavigatingBack) {
    dispatch(doPushDrawerStack(uri));
    dispatch(doSetPlayerVisible(true));
  }

  if (nav && nav.routes && nav.routes.length > 0 && nav.routes[0].routeName === 'Main') {
    const mainRoute = nav.routes[0];
    const discoverRoute = mainRoute.routes[0];
    if (discoverRoute.index > 0 && discoverRoute.routes[discoverRoute.index].routeName === 'File') {
      const fileRoute = discoverRoute.routes[discoverRoute.index];
      // Currently on a file page, so we can ignore (if the URI is the same) or replace (different URIs)
      if (uri !== fileRoute.params.uri) {
        const stackAction = StackActions.replace({ routeName: 'File', newKey: uri, params });
        dispatch(stackAction);
        return;
      }
    }
  }

  const navigateAction = NavigationActions.navigate({ routeName: 'File', key: uri, params });
  dispatch(navigateAction);
}

export function formatBytes(bytes, decimalPoints = 0) {
  if (!bytes) {
    return '0 KB';
  }

  if (bytes < 1048576) {
    // < 1MB
    const value = (bytes / 1024.0).toFixed(decimalPoints);
    return `${value} KB`;
  }

  if (bytes < 1073741824) {
    // < 1GB
    const value = (bytes / (1024.0 * 1024.0)).toFixed(decimalPoints);
    return `${value} MB`;
  }

  const value = (bytes / (1024.0 * 1024.0 * 1024.0)).toFixed(decimalPoints);
  return `${value} GB`;
}

function parseUriVars(vars) {
  const uriVars = {};
  const parts = vars.split('&');
  for (let i = 0; i < parts.length; i++) {
    const str = parts[i];
    if (str.indexOf('=') > -1) {
      const key = str.substring(0, str.indexOf('='));
      const value = str.substring(str.indexOf('=') + 1);
      uriVars[key] = value;
    } else {
      uriVars[str] = null;
    }
  }

  return uriVars;
}

export function navigateToUri(navigation, uri, additionalParams, isNavigatingBack) {
  if (!navigation) {
    return;
  }

  if (uri === navigation.state.key) {
    return;
  }

  if (uri.startsWith('lbry://?')) {
    navigation.navigate({ routeName: getRouteForSpecialUri(uri) });
    return;
  }

  let uriVars = {},
    uriVarsStr;
  if (uri.indexOf('?') > -1) {
    uriVarsStr = uri.substring(uri.indexOf('?') + 1);
    uri = uri.substring(0, uri.indexOf('?'));
    uriVars = parseUriVars(uriVarsStr);
  }

  const { store } = window;
  const params = Object.assign({ uri, uriVars }, additionalParams);
  if (navigation.state.routeName === 'File') {
    const stackAction = StackActions.replace({ routeName: 'File', newKey: uri, params });
    navigation.dispatch(stackAction);
    if (store && store.dispatch && !isNavigatingBack) {
      store.dispatch(doPushDrawerStack(uri));
      store.dispatch(doSetPlayerVisible(true));
    }
    return;
  }

  navigation.navigate({ routeName: 'File', key: uri, params });
  if (store && store.dispatch && !isNavigatingBack) {
    store.dispatch(doPushDrawerStack(uri));
    store.dispatch(doSetPlayerVisible(true));
  }
}

export function navigateBack(navigation, drawerStack, popDrawerStack) {
  if (popDrawerStack) {
    popDrawerStack();
  }

  const target = drawerStack[drawerStack.length > 1 ? drawerStack.length - 2 : 0];
  const { route, params } = target;
  navigation.goBack(navigation.state.key);
  if (!DrawerRoutes.includes(route) && !InnerDrawerRoutes.includes(route) && isURIValid(route)) {
    navigateToUri(navigation, route, null, true);
  } else {
    let targetRoute = route;
    let targetParams = params;
    if (InnerDrawerRoutes.includes(route)) {
      if (Constants.DRAWER_ROUTE_CHANNEL_CREATOR_FORM === route) {
        targetRoute = Constants.DRAWER_ROUTE_CHANNEL_CREATOR;
      } else if (Constants.DRAWER_ROUTE_PUBLISH_FORM === route) {
        targetRoute = Constants.DRAWER_ROUTE_PUBLISH_FORM;
      }

      if (targetParams) {
        targetParams.displayForm = true;
      } else {
        targetParams = { displayForm: true };
      }
    }

    navigation.navigate({ routeName: targetRoute, targetParams });
  }
}

export function dispatchNavigateBack(dispatch, nav, drawerStack) {
  dispatch(doPopDrawerStack());

  const target = drawerStack[drawerStack.length > 1 ? drawerStack.length - 2 : 0];
  const { route } = target;
  dispatch(NavigationActions.back());
  if (!DrawerRoutes.includes(route) && !InnerDrawerRoutes.includes(route) && isURIValid(route)) {
    dispatchNavigateToUri(dispatch, nav, route, true);
  } else {
    const newTarget = drawerStack[drawerStack.length > 1 ? drawerStack.length - 2 : 0];
    let targetRoute = newTarget.route;
    let targetParams = newTarget.params;
    if (InnerDrawerRoutes.includes(targetRoute)) {
      if (Constants.DRAWER_ROUTE_CHANNEL_CREATOR_FORM === route) {
        targetRoute = Constants.DRAWER_ROUTE_CHANNEL_CREATOR;
      } else if (Constants.DRAWER_ROUTE_PUBLISH_FORM === route) {
        targetRoute = Constants.DRAWER_ROUTE_PUBLISH_FORM;
      }

      if (targetParams) {
        targetParams.displayForm = true;
      } else {
        targetParams = { displayForm: true };
      }
    }

    const navigateAction = NavigationActions.navigate({
      routeName: targetRoute,
      params: targetParams,
    });

    dispatch(navigateAction);
  }
}

export function uriFromFileInfo(fileInfo) {
  const { name: claimName, claim_name: claimNameDownloaded, claim_id: claimId } = fileInfo;
  const uriParams = {};
  uriParams.claimName = claimName || claimNameDownloaded;
  uriParams.claimId = claimId;
  return buildURI(uriParams);
}

export function formatTagTitle(title) {
  if (!title) {
    return null;
  }
  return title.charAt(0).toUpperCase() + title.substring(1);
}

export function formatTagName(name) {
  if (!name) {
    return null;
  }
  if (name.length <= tagNameLength) {
    return name;
  }

  return name.substring(0, 7) + '...';
}

export function getSortByItemForName(name) {
  for (let i = 0; i < Constants.CLAIM_SEARCH_SORT_BY_ITEMS.length; i++) {
    if (name === Constants.CLAIM_SEARCH_SORT_BY_ITEMS[i].name) {
      return Constants.CLAIM_SEARCH_SORT_BY_ITEMS[i];
    }
  }

  return null;
}

export function getTimeItemForName(name) {
  for (let i = 0; i < Constants.CLAIM_SEARCH_TIME_ITEMS.length; i++) {
    if (name === Constants.CLAIM_SEARCH_TIME_ITEMS[i].name) {
      return Constants.CLAIM_SEARCH_TIME_ITEMS[i];
    }
  }

  return null;
}

export function getOrderBy(item) {
  let orderBy = [];
  switch (item.name) {
    case Constants.SORT_BY_HOT:
      orderBy = Constants.DEFAULT_ORDER_BY;
      break;

    case Constants.SORT_BY_NEW:
      orderBy = ['release_time'];
      break;

    case Constants.SORT_BY_TOP:
      orderBy = [Constants.ORDER_BY_EFFECTIVE_AMOUNT];
      break;
  }

  return orderBy;
}

// replace occurrences of ':' with '#' in a url (entered in the URI bar)
export function transformUrl(url) {
  const start = 'lbry://'.length;
  return normalizeURI(url.substring(start).replace(/:/g, '#'));
}

// i18n placeholder until we find a good react-native i18n module
export function __(str) {
  return str;
}

export function logPublish(claimResult) {
  // eslint-disable-next-line no-undef
  if (!__DEV__) {
    const { permanent_url: uri, claim_id: claimId, txid, nout, signing_channel: signingChannel } = claimResult;
    let channelClaimId;
    if (signingChannel) {
      channelClaimId = signingChannel.claim_id;
    }
    const outpoint = `${txid}:${nout}`;
    const params = { uri, claim_id: claimId, outpoint };
    if (channelClaimId) {
      params['channel_claim_id'] = channelClaimId;
    }
    Lbryio.call('event', 'publish', params);
  }
}

export function uploadImageAsset(filePath, success, failure) {
  const makeid = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 24; i += 1) text += possible.charAt(Math.floor(Math.random() * 62));
    return text;
  };

  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
  let fileExt = fileName.indexOf('.') > -1 ? fileName.substring(fileName.lastIndexOf('.') + 1).trim() : 0;
  if (!fileExt) {
    fileExt = 'jpg'; // default to jpg
  }
  const fileType = `image/${fileExt}`;

  const data = new FormData();
  const name = makeid();
  data.append('name', name);
  data.append('file', { uri: 'file://' + filePath, type: fileType, name: fileName });

  return fetch('https://spee.ch/api/claim/publish', {
    method: 'POST',
    body: data,
  })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        if (success) {
          success({ url: `${json.data.url}.${fileExt}` });
        }
      }
    })
    .catch(err => {
      if (failure) {
        failure(err.message ? err.message : 'The image failed to upload.');
      }
    });
}
