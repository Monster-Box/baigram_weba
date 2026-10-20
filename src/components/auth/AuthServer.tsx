import {
  memo, useEffect, useRef, useState,
} from '../../lib/teact/teact';
import { getActions } from '../../global';

import { readServerConfig, requestServerConfig, saveServerConfig } from '../../util/serverConfig';
import { navigateBack } from './helpers/backNavigation';

import useLastCallback from '../../hooks/useLastCallback';
import useMultiaccountInfo from '../../hooks/useMultiaccountInfo';

import Button from '../ui/Button';
import InputText from '../ui/InputText';

const AuthServer = () => {
  const { closeServerSelection } = getActions();
  const accountsInfo = useMultiaccountInfo();
  const hasActiveAccount = Object.values(accountsInfo).length > 0;
  const inputRef = useRef<HTMLInputElement>();
  const [existingConfig] = useState(() => readServerConfig());
  const [value, setValue] = useState(existingConfig?.id || '');
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useLastCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) {
      setError(undefined);
    }
  });

  const handleSubmit = useLastCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    const id = value.trim();
    if (!id) {
      setError('Please enter a server ID');
      inputRef.current?.focus();
      return;
    }

    setError(undefined);
    setIsLoading(true);
    void requestServerConfig(id).then((config) => {
      if (!saveServerConfig(config)) {
        setError('Cannot save the server settings in this browser');
        setIsLoading(false);
        return;
      }
      window.location.reload();
    }).catch((err: Error) => {
      setError(err?.message || 'Connection failed');
      setIsLoading(false);
      inputRef.current?.focus();
    });
  });

  const handleBack = useLastCallback(() => {
    closeServerSelection();
  });

  const handleCloseAccount = useLastCallback(() => {
    navigateBack();
  });

  return (
    <div id="auth-server-form" className="custom-scroll">
      {hasActiveAccount && (
        <Button
          size="smaller"
          round
          color="translucent"
          className="auth-close"
          iconName="close"
          onClick={handleCloseAccount}
        />
      )}
      <div className="auth-form">
        <div id="logo" />
        <h1>BaiGram</h1>
        <p className="note">
          {existingConfig?.name ? `Currently connected to ${existingConfig.name}.` : ''}
          {' '}
          Enter the ID of the server you want to connect to.
        </p>
        <form className="form" action="" onSubmit={handleSubmit}>
          <InputText
            ref={inputRef}
            id="sign-in-server-id"
            label="Server ID"
            value={value}
            error={error}
            autoComplete="off"
            disabled={isLoading}
            onChange={handleChange}
          />
          <Button
            className="auth-button"
            type="submit"
            ripple
            isLoading={isLoading}
            disabled={!value.trim()}
          >
            Connect
          </Button>
          {existingConfig && (
            <Button className="auth-button" isText ripple onClick={handleBack}>
              Back
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default memo(AuthServer);
