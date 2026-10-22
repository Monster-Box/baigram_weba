import {
  Fragment, memo, useMemo,
} from '../../../lib/teact/teact';
import { getActions } from '../../../global';

import type { ApiUser } from '../../../api/types';
import type { AccountInfo, CustomPeer } from '../../../types';

import { temporarilySuspendCacheUpdate } from '../../../global/cache';
import { getCurrentMaxAccountCount, getCurrentProdAccountCount } from '../../../global/helpers';
import { IS_SAFARI } from '../../../util/browser/windowEnvironment';
import { getAccountSlotUrl } from '../../../util/multiaccount';
import { readServerConfig } from '../../../util/serverConfig';
import { REM } from '../../common/helpers/mediaDimensions';

import useLang from '../../../hooks/useLang';
import useLastCallback from '../../../hooks/useLastCallback';
import useMultiaccountInfo from '../../../hooks/useMultiaccountInfo';

import Avatar from '../../common/Avatar';
import FullNameTitle from '../../common/FullNameTitle';
import MenuItem from '../../ui/MenuItem';

import styles from './AccountMenuItems.module.scss';

type OwnProps = {
  currentUser: ApiUser;
  totalLimit: number;
  onSelectCurrent?: VoidFunction;
};

type AccountEntry = [string, AccountInfo];

type AccountGroup = {
  key: string;
  name?: string;
  accounts: AccountEntry[];
};

const NOTIFICATION_DURATION = 7000;

const AccountMenuItems = ({
  currentUser,
  totalLimit,
  onSelectCurrent,
}: OwnProps) => {
  const { showNotification } = getActions();
  const lang = useLang();
  const accounts = useMultiaccountInfo(currentUser);

  const currentCount = getCurrentProdAccountCount();
  const maxCount = getCurrentMaxAccountCount();

  const currentAccountInfo = useMemo(() => {
    return Object.values(accounts).find((account) => account.userId === currentUser.id);
  }, [accounts, currentUser.id]);

  const accountGroups = useMemo(() => {
    const groups = new Map<string, AccountGroup>();
    const sortedAccounts = Object.entries(accounts || {}).sort(([, first], [, second]) => {
      if (first.userId === currentUser.id) return -1;
      if (second.userId === currentUser.id) return 1;
      return 0;
    });

    for (const entry of sortedAccounts) {
      const config = readServerConfig(Number(entry[0]));
      const key = config?.id || '';
      let group = groups.get(key);
      if (!group) {
        group = { key, name: config?.name || config?.id, accounts: [] };
        groups.set(key, group);
      }
      group.accounts.push(entry);
    }

    return [...groups.values()];
  }, [accounts, currentUser.id]);

  const shouldShowLimit = currentCount >= maxCount;

  const handleAccountClick = useLastCallback((account: AccountInfo) => {
    if (account.userId === currentUser.id) {
      onSelectCurrent?.();
      return;
    }

    // IDB locks up if we write large payload on navigation
    if (IS_SAFARI) temporarilySuspendCacheUpdate();
  });

  const handleNewAccountClick = useLastCallback(() => {
    if (shouldShowLimit) {
      showNotification({
        title: lang('PremiumLimitAccountsTitle'),
        message: currentUser.isPremium ? lang('PremiumLimitAccounts') : lang('PremiumLimitAccountsNoPremium'),
        duration: NOTIFICATION_DURATION,
      });
      return;
    }

    if (IS_SAFARI) temporarilySuspendCacheUpdate();
  });

  const newAccountUrl = useMemo(() => {
    if (!Object.values(accounts).length) {
      return undefined;
    }

    if (currentCount === totalLimit) {
      return undefined;
    }

    let freeIndex = 1;
    while (accounts[freeIndex]) {
      freeIndex += 1;
    }

    return getAccountSlotUrl(freeIndex, true);
  }, [accounts, currentCount, totalLimit]);

  return (
    <>
      {accountGroups.map((group) => (
        <Fragment key={group.key || 'unknown'}>
          {group.name && (
            <div className={styles.serverName} title={group.name}>{group.name}</div>
          )}
          {group.accounts.map(([slot, account]) => {
            const isSameServer = account.isTest === currentAccountInfo?.isTest;
            const mockUser: CustomPeer = {
              title: [account.firstName, account.lastName].filter(Boolean).join(' '),
              isCustomPeer: true,
              peerColorId: account.color,
              emojiStatusId: isSameServer ? account.emojiStatusId : undefined,
              isPremium: account.isPremium,
            };

            return (
              <MenuItem
                key={slot}
                className="account-menu-item"
                customIcon={(
                  <Avatar
                    size="mini"
                    className="account-avatar"
                    peer={mockUser}
                    previewUrl={account.avatarUri}
                  />
                )}
                onClick={() => handleAccountClick(account)}
                href={account.userId !== currentUser.id ? getAccountSlotUrl(Number(slot)) : undefined}
              >
                {account.isTest && <span className="account-menu-item-test">T</span>}
                <FullNameTitle peer={mockUser} withEmojiStatus emojiStatusSize={REM} />
              </MenuItem>
            );
          })}
        </Fragment>
      ))}
      {newAccountUrl && (
        <MenuItem
          icon="add"
          rel="noopener" // Allow referrer to be passed
          href={!shouldShowLimit ? newAccountUrl : undefined}
          onClick={handleNewAccountClick}
        >
          {lang('MenuAddAccount')}
        </MenuItem>
      )}
    </>
  );
};

export default memo(AccountMenuItems);
