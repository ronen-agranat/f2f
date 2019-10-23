import React from 'react';
import OneOnOneMinutes from "../OneOnOneMinutes/OneOnOneMinutes";
import AddSessionButton from "./AddSessionButton/AddSessionButton";
import MoreSessionTail from "./MoreSessionsTail/MoreSessionsTail";

import { format } from 'date-fns';

import styles from './OneOnOneBrowser.module.css';

const OneOnOneBrowser = (props) => {
  const [maxId, setMaxId] = React.useState(3);

  const [sessions, setSessions] = React.useState([
    {
      id: 1,
      date: "18 October 2019",
      notes: "Some notes go here"
    },
    {
      id: 2,
      date: "11 October 2019",
      notes: "Other notes go here"
    },
  ]);

  const minutesChanged = React.useCallback((id, date, text) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { id: id, date: date, notes: text };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  }, [sessions]);

  const sessionAdded = React.useCallback(() => {
    const date = format(new Date(), 'dd LLLL yyyy');
    setSessions([{date: date, id: maxId, notes: "New note"}, ...sessions]);
    setMaxId(maxId + 1);
  }, [sessions, maxId]);

  const oneOnOneMinutes = React.useMemo(() => sessions.map(s =>
    <OneOnOneMinutes id={s.id} key={s.id} date={s.date} notes={s.notes} notesChanged={minutesChanged}/>
  ), [sessions, minutesChanged]);


  return (
    <div className={styles.OneOnOneBrowser}>
      <AddSessionButton onSessionAdded={sessionAdded}/>
      {oneOnOneMinutes}
      <MoreSessionTail/>
    </div>
  );
}

export default OneOnOneBrowser;