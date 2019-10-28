import React, {ChangeEvent, useState} from "react";
import OneOnOneMinutes from "../OneOnOneMinutes/OneOnOneMinutes";
import AddSessionButton from "./AddSessionButton/AddSessionButton";
import MoreSessionTail from "./MoreSessionsTail/MoreSessionsTail";

import { format } from "date-fns";

import styles from "./OneOnOneBrowser.module.css";

interface ISession {
  id: number;
  date: string;
  followUps: string;
  nextTime: string;
  newBusiness: string;
}

const OneOnOneBrowser = () => {
  // TODO: Just for prototype to know what id new sessions should have; this would be handled by the data-store in
  // future
  const [maxId, setMaxId] = useState<number>(3);

  // TODO: In the future, the list of sessions would come from the back-end
  const [sessions, setSessions] = useState<Array<ISession>>([
    {
      id: 2,
      date: "18 October 2019",
      followUps: "" +
        "- Be a cutie pie\n" +
        "- Be a tiny sheen\n" +
        "- Be a sweetie pie",
      newBusiness: "Sheen returned from Seattle",
      nextTime: "" +
        "- Receive one wholest kiss\n" +
        "- Receive two kisses"
    },
    {
      id: 1,
      date: "11 October 2019",
      followUps: "Follow-ups go here",
      newBusiness: "New business goes here",
      nextTime: "Next time goes here"
    }
  ]);

  // Whether all sessions should be shown or just the current session
  const [showAllSessions, setShowAllSessions] = useState(false);

  const followUpsChanged = (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, followUps: event.target.value };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const newBusinessChanged = (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, newBusiness: event.target.value };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const nextTimeChanged = (
    id: number,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSessions = sessions.map(s => {
      if (s.id === id) {
        return { ...s, nextTime: event.target.value };
      } else {
        return s;
      }
    });

    setSessions(newSessions);
  };

  const sessionAdded = React.useCallback(() => {
    const date = format(new Date(), "dd LLLL yyyy");

    // Don't add a session if there already is one for today
    if (sessions.find(s => s.date === date)) {
      alert("There already is a session for today");
      return;
    }

    // Follow-ups are the 'next time' of the previous session
    let followUps = '';
    if (sessions.length) {
      followUps = sessions[0].nextTime;
    }

    setSessions([
      {
        date: date,
        id: maxId,
        followUps: followUps,
        nextTime: '',
        newBusiness: ''
      },
      ...sessions
    ]);
    setMaxId(maxId + 1);
  }, [sessions, maxId]);

  const toggleShowMoreSessions = () => {
    setShowAllSessions(!showAllSessions);
  };

  // TODO: Don't compute this whole thing if showing only first element
  let oneOnOneMinutes = sessions.map(s => (
    <OneOnOneMinutes
      id={s.id}
      key={s.id}
      date={s.date}
      followUps={s.followUps}
      followUpsChanged={followUpsChanged}
      nextTime={s.nextTime}
      nextTimeChanged={nextTimeChanged}
      newBusiness={s.newBusiness}
      newBusinessChanged={newBusinessChanged}
    />
  ));

  if (!showAllSessions) {
    oneOnOneMinutes = [oneOnOneMinutes[0]];
  }

  return (
    <div className={styles.OneOnOneBrowser}>
      <AddSessionButton onSessionAdded={sessionAdded} />
      {oneOnOneMinutes}
      <MoreSessionTail clicked={toggleShowMoreSessions} activated={showAllSessions}/>
    </div>
  );
};

export default OneOnOneBrowser;
