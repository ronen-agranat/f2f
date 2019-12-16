import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { AxiosError, AxiosResponse } from 'axios';

import FaceToFace from '../../../services/FaceToFace';

import MinutesEditor from '../MinutesEditor/MinutesEditor';
import NewMinutesButton from './NewMinutesButton/NewMinutesButton';
import MoreSessionTail from './ShowMoreButton/ShowMoreButton';
import { MinutesInterface } from '../../../interfaces/minutes.interface';

import styles from './MinutesBrowser.module.css';

interface IOneOnOneBrowserProps {
  personId: number;
}

const MinutesBrowser = (props: IOneOnOneBrowserProps) => {
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [sessions, setSessions] = useState<Array<MinutesInterface>>([]);

  // Whether all sessions should be shown or just the current session
  const [showAllSessions, setShowAllSessions] = useState(false);

  useEffect(() => {
    if (!sessionsLoaded) {
      FaceToFace.get(`/persons/${props.personId}/minutes`)
        .then((response: AxiosResponse<Array<MinutesInterface>>) => {
          setSessions(response.data);
          setSessionsLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error('Something went wrong retrieving minutes', error);
        });
    }
  }, [sessionsLoaded, props.personId]);

  const updateMinutes = (
    minutesId: number,
    session: MinutesInterface | undefined,
  ): void => {
    if (!session) {
      return;
    }
    // TODO: set some kind of dirty flag
    // TODO: batch up changes
    // TODO: serialise so that create requests complete before updates
    FaceToFace.put(`/persons/${props.personId}/minutes/${minutesId}`, session)
      .then(() => {
        // TODO update some kind of dirty flag / 'saved' indicator
      })
      .catch((error: AxiosError) => {
        console.error('Something went wrong with updating the minutes', error);
      });
  };

  const notesChanged = (
    minutesId: number,
    text: string,
    textAreaName: string,
  ) => {
    let newSession: MinutesInterface | undefined;
    const newSessions = sessions.map(s => {
      if (s.id === minutesId) {
        newSession = { ...s, [textAreaName]: text };
        return newSession;
      } else {
        return s;
      }
    });

    setSessions(newSessions);
    if (newSession) {
      updateMinutes(minutesId, newSession);
    }
  };

  const sessionAdded = React.useCallback(() => {
    const date = format(new Date(), 'dd LLLL yyyy HH:mm:ss');

    // Follow-ups are the 'next time' of the previous session
    let followUps = '';
    if (sessions.length) {
      followUps = sessions[0].nextTime;
    }

    FaceToFace.post(`/persons/${props.personId}/minutes`, {
      date: date,
      followUps: followUps,
      nextTime: '',
      newBusiness: '',
    })
      .then((response: AxiosResponse<MinutesInterface>) => {
        setSessions([response.data, ...sessions]);
      })
      .catch((error: AxiosError) => {
        console.error('Something went wrong posting new minutes', error);
      });
  }, [sessions, props.personId]);

  const toggleShowMoreSessions = () => {
    setShowAllSessions(!showAllSessions);
  };

  // TODO: Don't compute this whole thing if showing only first element
  let oneOnOneMinutes = sessions.map(s => {
    const valuesMap = new Map<string, string>();
    valuesMap.set('followUps', s.followUps);
    valuesMap.set('newBusiness', s.newBusiness);
    valuesMap.set('nextTime', s.nextTime);

    return <MinutesEditor
      id={s.id}
      key={s.id}
      date={s.date}
      values={valuesMap}
      notesChanged={notesChanged}
    />
  });

  if (!showAllSessions) {
    oneOnOneMinutes = [oneOnOneMinutes[0]];
  }

  return (
    <>
      <div className={styles.OneOnOneBrowser}>
        {oneOnOneMinutes}
        <MoreSessionTail
          clicked={toggleShowMoreSessions}
          activated={showAllSessions}
        />
      </div>
      <NewMinutesButton onSessionAdded={sessionAdded}/>
    </>
  );
};

MinutesBrowser.propTypes = {
  personId: PropTypes.number.isRequired,
};

export default MinutesBrowser;
