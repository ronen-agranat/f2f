import React, {ChangeEvent, useEffect, useState} from "react";
import PropTypes from "prop-types";
import OneOnOneMinutes from "../OneOnOneMinutes/OneOnOneMinutes";
import AddSessionButton from "./AddSessionButton/AddSessionButton";
import MoreSessionTail from "./MoreSessionsTail/MoreSessionsTail";

import { format } from "date-fns";

import styles from "./OneOnOneBrowser.module.css";
import ISession from "../../types/ISession";
import FaceToFace from "../../services/FaceToFace";
import {AxiosError, AxiosResponse} from "axios";

interface IOneOnOneBrowserProps {
  personId: number;
}

const OneOnOneBrowser = (props: IOneOnOneBrowserProps) => {
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [sessions, setSessions] = useState<Array<ISession>>([]);

  // Whether all sessions should be shown or just the current session
  const [showAllSessions, setShowAllSessions] = useState(false);

  useEffect(() => {
    if (!sessionsLoaded) {
      FaceToFace.get(`/people/${props.personId}/minutes`)
        .then((response: AxiosResponse<Array<ISession>>) => {
          setSessions(response.data);
          setSessionsLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error("Something went wrong retrieving minutes", error);
        });
    }
  }, [sessionsLoaded, props.personId]);

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
    let followUps = "";
    if (sessions.length) {
      followUps = sessions[0].nextTime;
    }

    FaceToFace.post(`/people/${props.personId}/minutes`, {
      date: date,
      followUps: followUps,
      nextTime: "",
      newBusiness: ""
    })
      .then((response: AxiosResponse<ISession>) => {
        setSessions([response.data, ...sessions]);
        console.log(response);
      })
      .catch((error: AxiosError) => {
        console.error("Something went wrong posting new minutes", error);
      });
  }, [sessions, props.personId]);

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
      <MoreSessionTail
        clicked={toggleShowMoreSessions}
        activated={showAllSessions}
      />
    </div>
  );
};

OneOnOneBrowser.propTypes = {
  personId: PropTypes.number.isRequired
};

export default OneOnOneBrowser;
