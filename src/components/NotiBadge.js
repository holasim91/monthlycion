import React, { useEffect, useState } from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {
  const [isRead, setIsRead] = useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.on("value", (snapshot) => {
      if(snapshot.val()===null){
        setIsRead(true)
      }else{
      setIsRead(snapshot.val().read)};
    });
    return () => notiDB.off();
  });

  return (
    <>
      <Badge
        color="secondary"
        variant="dot"
        invisible={isRead}
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
