import React, { useEffect, useState } from "react";
import { SupportWrap } from "./Support.styles";
import Tickets from "./Ticket";
import Issues from "./Issue";
import TicketRaised from "./TicketRaised";
import axios from "axios";
import { serverDomain } from "../../Constant/serverDomain";

const SupportSec = ({ formData }) => {
  const [ticket, setTicket] = useState(false);
  const [activeTickets, setActiveTickets] = useState([]);
  const clickHandler = () => {
    setTicket(true);
  };
  const backPage = () => {
    setTicket(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${serverDomain}/coachTicket/${formData?.id}/get`
        );

        setActiveTickets(response.data.data.activeTicket);
        console.log(response);
      } catch (error) {

        console.log(error);
      }
    })();
  }, []);

  return (
    <SupportWrap>
      {!ticket ? (
        <div className="wrapper">
          <div className="activeTicket support">
            <Tickets
              width="186px"
              name="Close Ticket"
              title="Active Tickets"
              click={clickHandler}
              activeTickets={activeTickets}
            />
          </div>
          <div className="issuesHolder support">
            <Issues />
          </div>
          <div className="resolveTicke supportt">
            <Tickets
              type="transparent"
              name="Resolved"
              title="Resolved Tickets "
            />
          </div>
        </div>
      ) : (
        <div className="raised">
          <TicketRaised backPage={backPage} />
        </div>
      )}
    </SupportWrap>
  );
};

export default SupportSec;
