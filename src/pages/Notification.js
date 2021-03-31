import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Grid } from "../elements";
import { realtime } from "../shared/firebase";

const Notification = (props) => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild("insert_dt");
    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();
        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <>
      <Grid padding="16px" background="#EFF6FF">
        {noti.map((n, i) => (
          <Card {...n} key={`noti_${i}`} />
        ))}
      </Grid>
    </>
  );
};

export default Notification;
