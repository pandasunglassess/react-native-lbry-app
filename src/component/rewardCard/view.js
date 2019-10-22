// @flow
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Link from '../link';
import rewardStyle from '../../styles/reward';

type Props = {
  canClaim: boolean,
  onClaimPress: object,
  reward: {
    id: string,
    reward_title: string,
    reward_amount: number,
    reward_range?: string,
    transaction_id: string,
    created_at: string,
    reward_description: string,
    reward_type: string,
  },
};

class RewardCard extends React.PureComponent<Props> {
  state = {
    claimStarted: false,
  };

  componentWillReceiveProps(nextProps) {
    const { errorMessage, isPending } = nextProps;
    const { clearError, notify, reward } = this.props;
    if (this.state.claimStarted && !isPending) {
      if (errorMessage && errorMessage.trim().length > 0) {
        notify({ message: errorMessage });
        clearError(reward);
      } else {
        notify({ message: 'Reward successfully claimed!' });
      }
      this.setState({ claimStarted: false });
    }
  }

  onClaimPress = () => {
    const { canClaim, claimReward, notify, reward, showVerification } = this.props;

    if (!canClaim) {
      if (showVerification) {
        showVerification();
      }
      notify({ message: 'Unfortunately, you are not eligible to claim this reward at this time.' });
      return;
    }

    this.setState({ claimStarted: true }, () => {
      claimReward(reward);
    });
  };

  getDisplayAmount = () => {
    const { reward } = this.props;
    if (reward) {
      const claimed = !!reward.transaction_id;
      if (!claimed && reward.reward_range && reward.reward_range.includes('-')) {
        return reward.reward_range.split('-')[0] + '+'; // ex: 5+
      } else if (reward.reward_amount > 0) {
        return reward.reward_amount;
      }
    }

    // unknown amount which normally shouldn't happen
    return '?';
  };

  render() {
    const { canClaim, isPending, onClaimPress, reward } = this.props;
    const claimed = !!reward.transaction_id;

    return (
      <TouchableOpacity
        style={[rewardStyle.rewardCard, rewardStyle.row]}
        onPress={() => {
          if (!isPending && !claimed) {
            this.onClaimPress();
          }
        }}
      >
        <View style={rewardStyle.leftCol}>
          {!isPending && (
            <TouchableOpacity
              onPress={() => {
                if (!claimed) {
                  this.onClaimPress();
                }
              }}
            >
              {claimed && (
                <Icon
                  name={claimed ? 'check-circle' : 'circle'}
                  style={claimed ? rewardStyle.claimed : canClaim ? rewardStyle.unclaimed : rewardStyle.disabled}
                  size={20}
                />
              )}
            </TouchableOpacity>
          )}
          {isPending && <ActivityIndicator size="small" color={Colors.NextLbryGreen} />}
        </View>
        <View style={rewardStyle.midCol}>
          <Text style={rewardStyle.rewardTitle}>{reward.reward_title}</Text>
          <Text style={rewardStyle.rewardDescription}>{reward.reward_description}</Text>
          {claimed && (
            <Link
              style={rewardStyle.link}
              href={`https://explorer.lbry.com/tx/${reward.transaction_id}`}
              text={reward.transaction_id.substring(0, 7)}
              error={'The transaction URL could not be opened'}
            />
          )}
        </View>
        <View style={rewardStyle.rightCol}>
          <Text style={rewardStyle.rewardAmount}>{this.getDisplayAmount()}</Text>
          <Text style={rewardStyle.rewardCurrency}>LBC</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default RewardCard;
