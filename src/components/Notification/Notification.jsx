import React from "react";
import { notify,notifyText } from "./Notification.module.css";

const Notification = () => {
  return (
    <div className={notify}>
      <p className={notifyText}>Contact already exists !</p>
    </div>
  );
};

export default Notification;
