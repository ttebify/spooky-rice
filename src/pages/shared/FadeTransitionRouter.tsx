import React from "react";
import { Router, Location } from "@reach/router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import OnRouteChange from "reach-router-scroll-top";

export default function FadeTransitionRouter(props: {
  children: React.ReactNode;
}) {
  return (
    <Location>
      {({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500}>
            {/* the only difference between a router animation and
                any other animation is that you have to pass the
                location to the router so the old screen renders
                the "old location" */}
            <Router location={location}>{props.children}</Router>
          </CSSTransition>
          <OnRouteChange />
        </TransitionGroup>
      )}
    </Location>
  );
}
