import React, {ChangeEvent} from 'react';
import OneOnOneMinutes from '../OneOnOneMinutes/OneOnOneMinutes';
import AddSessionButton from './AddSessionButton/AddSessionButton';
import MoreSessionTail from './MoreSessionsTail/MoreSessionsTail';

import { format } from 'date-fns';

import styles from './OneOnOneBrowser.module.css';

interface Session {
  id: number;
  date: string;
  followUps: string;
  nextTime: string;
  newBusiness: string;
}

const OneOnOneBrowser = () => {
  const [maxId, setMaxId] = React.useState<number>(3);

  const [sessions, setSessions] = React.useState<Array<Session>>([
    {
      id: 2,
      date: '18 October 2019',
      followUps: 'Follow-ups go here',
      newBusiness: 'New business goes here',
      nextTime: 'Next time goes here'
    },
    {
      id: 1,
      date: '11 October 2019',
      followUps: 'Follow-ups go here',
      newBusiness: 'New business goes here',
      nextTime: 'Next time goes here'
    },
  ]);

  const followUpsChanged = (id: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, followUps: event.target.value };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const newBusinessChanged = (id: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, newBusiness: event.target.value };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const nextTimeChanged = (id: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, nextTime: event.target.value};
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const sessionAdded = React.useCallback(() => {
    const date = format(new Date(), 'dd LLLL yyyy');

    // Don't add a session if there already is one for today
    if (sessions.find(s => s.date === date)) {
      alert('There already is a session for today');
      return;
    }

    setSessions([{
      date: date,
      id: maxId,
      followUps: 'Follow-ups',
      nextTime: 'Next time',
      newBusiness: 'New business'},
      ...sessions]
    );
    setMaxId(maxId + 1);
  }, [sessions, maxId]);

  const oneOnOneMinutes = sessions.map(s =>
    <OneOnOneMinutes id={s.id} key={s.id} date={s.date}
                     followUps={s.followUps} followUpsChanged={followUpsChanged}
                     nextTime={s.nextTime} nextTimeChanged={nextTimeChanged}
                     newBusiness={s.newBusiness} newBusinessChanged={newBusinessChanged}/>
  );

  return (
    <div className={styles.OneOnOneBrowser}>
      <AddSessionButton onSessionAdded={sessionAdded}/>
      {oneOnOneMinutes}
      <MoreSessionTail/>
    </div>
  );
}

export default OneOnOneBrowser;